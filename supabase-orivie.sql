-- =========================================================
-- ORIVIE - SUA PERSONALIDADE · banco de dados no Supabase
-- Cole tudo no SQL Editor do Supabase e clique em RUN (uma vez só).
-- =========================================================
create extension if not exists pgcrypto with schema extensions;

-- Contas das clientes (uma linha por pessoa; ligada ao login do Supabase)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  birth text,
  data jsonb not null default '{}'::jsonb,
  paid boolean not null default false,
  pay_method text not null default '',
  pay_date date,
  code_n int,
  code_fails int not null default 0,
  code_lock timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Códigos de acesso (guardamos só a "impressão digital" de cada código)
create table if not exists public.access_codes (
  hash text primary key,
  n int,
  multi boolean not null default false,
  used_by uuid references auth.users(id) on delete set null,
  used_at timestamptz
);

-- Quem pode ver o painel de clientes
create table if not exists public.admins (email text primary key);

-- Segurança: ninguém lê nem altera essas tabelas direto pelo app; tudo passa pelas funções abaixo.
alter table public.profiles enable row level security;
alter table public.access_codes enable row level security;
alter table public.admins enable row level security;
revoke all on public.profiles, public.access_codes, public.admins from anon, authenticated;

-- Cria a conta da cliente assim que ela se cadastra
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, birth)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data->>'name',''), coalesce(new.raw_user_meta_data->>'birth',''))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Perfil em formato do app (acesso vale 1 ano a partir da liberação)
create or replace function public.orivie_profile(p public.profiles) returns jsonb
language sql stable set search_path = public as $$
  select jsonb_build_object(
    'email', p.email, 'name', p.name, 'birth', p.birth,
    'paid', p.paid and (p.pay_date is null or p.pay_date > current_date - 365),
    'payMethod', p.pay_method, 'payDate', coalesce(p.pay_date::text, ''),
    'created', p.created_at::text)
$$;

create or replace function public.get_me() returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles;
begin
  if auth.uid() is null then return jsonb_build_object('error','auth'); end if;
  select * into p from public.profiles where id = auth.uid();
  if not found then
    insert into public.profiles (id, email) values (auth.uid(), lower(auth.jwt()->>'email')) returning * into p;
  end if;
  return jsonb_build_object('profile', public.orivie_profile(p), 'data', p.data,
    'updatedAt', (extract(epoch from p.updated_at)*1000)::bigint);
end $$;

create or replace function public.save_me(p_data jsonb, p_name text default null, p_birth text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles;
begin
  if auth.uid() is null then return jsonb_build_object('error','auth'); end if;
  perform public.get_me();
  update public.profiles set
    data = coalesce(p_data,'{}'::jsonb) - array['email','pass','paid','payMethod','payDate','accessCode','pix'],
    name = coalesce(nullif(trim(p_name),''), name),
    birth = case when p_birth ~ '^\d{4}-\d{2}-\d{2}$' then p_birth else birth end,
    updated_at = now()
  where id = auth.uid() returning * into p;
  return jsonb_build_object('ok', true, 'profile', public.orivie_profile(p),
    'updatedAt', (extract(epoch from p.updated_at)*1000)::bigint);
end $$;

-- Libera o acesso com o código (confere no servidor; cada código vale para uma conta)
create or replace function public.redeem_code(p_code text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare p public.profiles; c text; h text; rec public.access_codes;
begin
  if auth.uid() is null then return jsonb_build_object('error','auth','message','Sua sessão expirou. Entre de novo.'); end if;
  perform public.get_me();
  select * into p from public.profiles where id = auth.uid() for update;
  if (public.orivie_profile(p)->>'paid')::boolean then return jsonb_build_object('profile', public.orivie_profile(p)); end if;
  if p.code_lock is not null and p.code_lock > now() then
    return jsonb_build_object('error','locked','message','Muitas tentativas. Aguarde alguns minutos e tente de novo.');
  end if;
  c := upper(regexp_replace(coalesce(p_code,''), '[^A-Za-z0-9]', '', 'g'));
  if length(c) <> 15 or left(c,3) <> 'ORV' then
    return jsonb_build_object('error','format','message','O código tem o formato ORV-XXXX-XXXX-XXXX.');
  end if;
  h := left(encode(digest('orivie-code::' || c, 'sha256'), 'hex'), 32);
  select * into rec from public.access_codes where hash = h for update;
  if not found then
    update public.profiles set
      code_lock = case when code_fails + 1 >= 5 then now() + interval '10 minutes' else code_lock end,
      code_fails = case when code_fails + 1 >= 5 then 0 else code_fails + 1 end
    where id = auth.uid();
    return jsonb_build_object('error','invalid','message','Código não encontrado. Confira se digitou igual ao que recebeu.');
  end if;
  if not rec.multi and rec.used_by is not null and rec.used_by <> auth.uid() then
    return jsonb_build_object('error','used','message','Esse código já foi usado em outra conta. Fale com a gente pelo WhatsApp.');
  end if;
  if not rec.multi then update public.access_codes set used_by = auth.uid(), used_at = now() where hash = h; end if;
  update public.profiles set paid = true, pay_method = case when rec.multi then 'hotmart' else 'codigo' end,
    pay_date = current_date, code_n = rec.n, code_fails = 0, code_lock = null, updated_at = now()
  where id = auth.uid() returning * into p;
  return jsonb_build_object('profile', public.orivie_profile(p));
end $$;

-- Painel de clientes (só para e-mails cadastrados em "admins")
create or replace function public.admin_list() returns jsonb
language plpgsql security definer set search_path = public as $$
declare res jsonb;
begin
  if not exists (select 1 from public.admins where email = lower(auth.jwt()->>'email')) then
    return jsonb_build_object('error','forbidden','message','Este e-mail não tem acesso ao painel.');
  end if;
  select jsonb_build_object(
    'generatedAt', (extract(epoch from now())*1000)::bigint,
    'stats', jsonb_build_object(
      'total', (select count(*) from public.profiles),
      'paid', (select count(*) from public.profiles where paid),
      'waiting', (select count(*) from public.profiles where not paid),
      'codesUsed', (select count(*) from public.access_codes where used_by is not null),
      'codesTotal', (select count(*) from public.access_codes where not multi),
      'revenue', (select count(*) from public.profiles where paid) * 12.90,
      'price', 12.90),
    'clients', coalesce((select jsonb_agg(jsonb_build_object(
        'name', p.name, 'email', p.email, 'birth', p.birth, 'created', p.created_at,
        'paid', p.paid, 'payDate', p.pay_date, 'payMethod', p.pay_method, 'code', p.code_n,
        'profile', p.data->>'profile', 'profile2', p.data->>'profile2', 'testDone', coalesce((p.data->>'testDone')::boolean,false),
        'xp', coalesce((p.data->>'xp')::int,0), 'read', coalesce(jsonb_array_length(p.data->'read'),0),
        'goals', coalesce(jsonb_array_length(p.data->'goals'),0), 'prayers', coalesce(jsonb_array_length(p.data->'prayers'),0),
        'days', coalesce(jsonb_array_length(p.data->'days'),0),
        'lastActive', (extract(epoch from p.updated_at)*1000)::bigint) order by p.created_at desc)
      from public.profiles p), '[]'::jsonb),
    'codes', coalesce((select jsonb_agg(jsonb_build_object('n', a.n, 'email', p.email, 'at', a.used_at) order by a.used_at desc)
      from public.access_codes a join public.profiles p on p.id = a.used_by), '[]'::jsonb)
  ) into res;
  return res;
end $$;

revoke all on function public.get_me(), public.save_me(jsonb,text,text), public.redeem_code(text), public.admin_list(), public.orivie_profile(public.profiles) from public, anon;
revoke all on function public.orivie_profile(public.profiles) from authenticated;
grant execute on function public.get_me(), public.save_me(jsonb,text,text), public.redeem_code(text), public.admin_list() to authenticated;

-- Dona do app (acesso ao painel). Troque o e-mail se for usar outro para entrar no painel.
insert into public.admins (email) values ('oriviesuapersonalidade@gmail.com') on conflict do nothing;

-- Os 300 códigos de acesso + o código da Hotmart
insert into public.access_codes(hash,n,multi) values
('0120f78c8bd127263961344702e76b3c',169,false),
('030d25acd2c3d46f8771c156dd372361',200,false),
('049131b65bb6a25b45870bcdb8c4d9d4',57,false),
('04a0c26d4528a476bcd0f30bfccb3351',228,false),
('052e7a16575c2655cc119d5f9beefe48',270,false),
('05be0fbbcbfca330afb6c3b58d7311b5',130,false),
('07a17d568e54ef06f9e28a8e30aae6e1',14,false),
('082cd31b41218dfbda1baf72fa5b2bf3',65,false),
('08f7eb9208cf51e9955f6a4bce89191c',174,false),
('090f29c63eb7378fa86b5db3b4dd671a',122,false),
('0965e897ccce718c9cd7b97c10a2cc92',21,false),
('098b3fab493bf5235d875523fda60961',29,false),
('0cb38d37b87429e802d939b5756a4790',188,false),
('0e11d5a73ca7b5ee2b2837fc82d940f7',12,false),
('1098960c920a96aa37d0507bc42b0882',195,false),
('10b8441ee06b4f838cb66a979a5c5282',162,false),
('1185f1625e88367b138f7d16a4b91a33',7,false),
('119d3c9a7e39a80c24ca27ab56e0a436',290,false),
('12570168485fda9ade95355a7e76b437',111,false),
('13751f5f0a9ea038f5c613efd79c8a16',67,false),
('1396ef1825e3cda17d9afb0a13914512',20,false),
('1458494f091c718ac68c140531ae1644',95,false),
('157340be831c8e51635d1006f7beb813',298,false),
('15ab02cb2bfb5bec9d50c7cdcc242e05',186,false),
('1a7309242cb94060c06fa44e41731860',98,false),
('1aefbd37fb85b4969558bc1e103ed6af',41,false),
('1ce43f7bb2a3a6f42389948dac3247d6',258,false),
('1ea4ad43877ef1a1267797b8ddd152de',234,false),
('1f1227362c10f9c428c240e3ba8c480c',153,false),
('1fcb6f44b639fe2a7f86f28adacd00c2',85,false),
('1fcde471f14b6b58d5e6279412963c91',107,false),
('216abf9e55d8515b54daa94af0c715a6',88,false),
('21d158073d32e3957b6aba334dbd3a10',90,false),
('21d35f54f8091a7d23c38d59164be510',257,false),
('231c05ca29aa00414d63b5d838aadabb',275,false),
('246bb50cc558bc915936a6d56aef90c4',163,false),
('24e950439ab6e11e30e3bf9c70c03020',238,false),
('25a830ca4158838d8de5d6517e61ca30',199,false),
('25eb8dac076bb4d3ac44bf7e149b282f',229,false),
('26ba465b8640a21f460f2c9f7af591d9',138,false),
('26d4d843a07d2fe81a19b3e45d7e00a9',31,false),
('275dd70e9f524deac98df832c2b8fe33',286,false),
('27c33bfc8382f3f754d794355dbc0b7d',157,false),
('281cfd2ad798ddde6428268d93c53f8b',63,false),
('2823020496b681a2949358a364ad3d1d',196,false),
('2912a97d7afec3639f806fad85935e31',225,false),
('29c62a1d4bd470ecdd1c9c387026adb6',177,false),
('2af8f4f1bd4a55fbd88e715550ec5c5c',69,false),
('2b9cb1cbe4add4a08f4c3d33bf0b132b',187,false),
('2bb5adbe5fea7576bb90fde87902ac1c',294,false),
('2c97f19598c279d69f1c264415fe006b',185,false),
('2cd4dfac7954b7a4b1f84e7b506ad0f4',233,false),
('2d5ef520e15692c50e60ca03c5ae3909',46,false),
('2d709fa86fed647fb569dbf6a2d46837',211,false),
('2da13c7abcc11ab4bee67728292342fe',182,false),
('2e0c6d4e89510fa41f7d3162c73b1e73',155,false),
('2eb5b936bb1558b809784c417721ac1a',120,false),
('2f2bac54924403fa156b1b675459084e',296,false),
('2fba5664d295b4eac4ff1f0ce0852070',18,false),
('303a6a32ca46c1b5c2024d4a02f82010',194,false),
('32562b791f169a9c91c9610c0d90e593',54,false),
('328fd624b43f5444fcf060323ee5683d',6,false),
('337f38fb27f0a0529cbc108dc4c6f8ae',115,false),
('3450cf3e5a47a1d63dce8371240a383f',17,false),
('346dddc0e8da59f018984f66967c8c5c',230,false),
('37da6b7c8a3eb26b4487606f971228c3',4,false),
('38066032d8086eb437d49dd7efe003b1',209,false),
('392d6486913da40d2136751540c460a3',51,false),
('3ba4f5ad11c721420acbbf086b3db71d',262,false),
('3bf423e000e338cf01db329e1d02f6f8',136,false),
('3d5058deac8871f25d11d832f1ceb2d4',171,false),
('3d84326060305d79877bad7fec721e95',8,false),
('3f13da5f8181dfaf3537843efc3be811',183,false),
('3fec32f1d80f4344ca3c24d1cdd55b4f',134,false),
('40d9e46bde8d98267a439a89964e2876',103,false),
('41633ae454a28ddeb94f879ad1a30aba',214,false),
('42911003e2034c0af5be1d7fdeb4b006',168,false),
('4319cd29e2b682025e9f1b7ef06b8ec9',161,false),
('4424c0d7b9dd5034844a78390d23942c',282,false),
('44a650eef28fff1bcbb7bfe2590c8b8e',291,false),
('469ce98557b1ba56da4887a8c8ff3048',208,false),
('478f482051f0730f1522f1e325e492e8',5,false),
('49997b20678466f2e21292298b6628a5',25,false),
('4a03033325931362e8af49750a4b4e09',285,false),
('4c70e5a7108b8b80cb05e4ab0cd878f1',284,false),
('4d2d5bd3c35620c4c16c23bf8f899760',105,false),
('4dec82d89f88adc36a9b4cfa64cfe355',70,false),
('4e0d7f1050850cf53d58fa082dd7f43c',181,false),
('4e3b6cf9c175cad78c764b09d79536ad',221,false),
('4e616b0e3fdae4dc83b27665b9a3c777',173,false),
('4ecac87ac0ed204e5c4ffbe9cb2be329',82,false),
('4f945ea424366bdb55a5f7b848248c5d',252,false),
('4fab2b2baf8ea2d52b131ee7ed1eee4f',207,false),
('4fcb9e044c9999cd0b98e35c63a6ae45',242,false),
('5037307823ffd806fa39a04e3ea9bec8',131,false),
('5158cdf2977bd415ceb436979a597950',113,false),
('515dc1c71811876c077fe2d5944060c6',121,false),
('518f4b1446007351d38708602882e803',118,false),
('52be32926600a23d79dd908506d85823',140,false),
('57a597d7a64f3f960191256829dfab0d',217,false),
('58a4de30832d3fbfbfff61f2126b0fd0',62,false),
('5edaeca1238f1738e3aba75171a97722',89,false),
('5f8ea181e143830f1a76864d9678283b',167,false),
('61b71cdba25dc3ba8cb0d67d5e4bf7a5',16,false),
('61c9d777b41dd27dd50cdb1d1e8cb618',58,false),
('626b0236afe039c5dbdb55760c0885cc',72,false),
('659ef47b846affd2b3608c4ac26edb1c',268,false),
('674a72b0ee6c6d777e2d13ef969918d0',96,false),
('67583d0cadff20078a4e3988e8b5c5e5',154,false),
('6770784231275af30abe50e84bf88fac',269,false),
('68306a585e0f3782880944cbc7909134',126,false),
('68433f96f80bebc72f0904d5e1a114ad',149,false),
('6870220b891dd2d84cfbe878a6c5f17c',108,false),
('68a4554296083e716384c31399336dd1',93,false),
('68c78b72907d99eb1953e0a375b5ad67',47,false),
('69373c13df1f8d4383897884db3bccb0',210,false),
('699717279f718d10186aff9269fc5ebf',150,false),
('69b33532b25ed7b73763f1ebca7ede0a',59,false),
('6a5b2665c1e489a4a372d3f841ef0cf0',220,false),
('6a7756f4f511e7cdab2f16f55fd0606b',11,false),
('6f10313924ee5c3261fc528120df7a64',222,false),
('6fd8f458b0d3a7f6a2ad6b9e12f5498e',34,false),
('70c93dee353a3761fd24761a5e9b19a7',201,false),
('74ee6b8582a1347b5499ff2a22070994',261,false),
('751ffa33f53a828f6a89be73d84cbe9a',38,false),
('752e4f6e56cc3be76e938c202c5093ba',30,false),
('754fe6b592326ac8f028471b3d45948f',170,false),
('7677aa4771c5c622f7362a774c24c7fe',213,false),
('76bef99e3e369da4e0c734ac25c3feac',79,false),
('76fec2dadd0473b2649f18408a2fbe4d',178,false),
('7752d173f93ba29ab9b03ae3ab5a96e2',145,false),
('7962f8ca707fb5a94074a94198f4e76a',132,false),
('7a09c1b48554cdfaca7d28d1eee86a92',143,false),
('7a4f47212aabab0297bc16b03a1b6a91',202,false),
('7a546c7d18ff0c570e422981bae9b95d',15,false),
('7bb69b86c7dec62243bfb65aab1bdf9a',68,false),
('7dd6f6896556ff833471603eb44a41b7',125,false),
('7f3af6fa161e3c72acdf0a9f3ef42a69',172,false),
('7f68877355838d6728e0980cfa62b6c9',33,false),
('7fc693a726af814adf2115a43e9c1f65',191,false),
('80889edbaa32ac597b8136ab477ed287',139,false),
('81c6e3199f549bbe66b354a280733f62',32,false),
('81ef6778c4b6b936037163e421dac0a9',224,false),
('828da022aeebbda1068eff4fde8140ba',2,false),
('83444f023c761738b0bf584b4d7f32db',44,false),
('868aa59047989c08ad5d768607edcc5e',23,false),
('869bae2d9d56f8101686debd34516f90',9,false),
('870b2e8048b75fe9253e6b3365c7e47a',297,false),
('888edb63feae8d85043c8da758bf9fa0',83,false),
('89277a9da1610d4510c88d9fa1ae3ca7',280,false),
('895609dbbf643eec78e41350c5c8fc40',3,false),
('8a871c6e78772b40710093d9c324f1b4',179,false),
('8b671398b7fa6c760e3e6a26ee9ad8e6',27,false),
('8e5f0d75f09984cb9fec849f9dd718ed',293,false),
('8ea6caf41f2c106c6e8ddc2f33f08b3f',156,false),
('8ee7882a422671c2d0de1ff4fab67875',50,false),
('8ef6aff7820b42f73f11e8dc30b0a2f1',144,false),
('90a6984c187287506063f446e837846b',148,false),
('90eb881e4135e8c7fd69ded907ec8331',175,false),
('90fcaa86663d20b14ee04f4ce639d8db',37,false),
('91187e744169fa076d5cd363d567d07b',281,false),
('91954409d082051bc54c4cad46b4129a',204,false),
('92305692c2712f08cb4bb7782e964faa',166,false),
('92f7bf945d29a1b0a54447799097543e',235,false),
('93e7d473dbc18c36e488db3c8c19ddde',165,false),
('960f64b4659ed6a6c37845061f4a45f4',197,false),
('9655299df2b461b61b47aebd8251ad34',164,false),
('967a558f0d07ab718f0ecd6081ccc12e',94,false),
('96e7987269e9471e1a12ca52a3c3932c',141,false),
('9712e6a742f13de4c28e402ffbb45f9d',45,false),
('99b5a3118bf8865b78ae6ab6c42287f0',247,false),
('9c2494680f5d09c8c8f422c325247bbe',283,false),
('9de6fe98b5b01aba3a1a8c910c667816',249,false),
('9f7f100f41cef2b9380d18c923d1cb4a',26,false),
('a24f2df902dc94eb925f4cb8b2fbab23',263,false),
('a36b8ca5e5fe434c6275ad55a416c38e',127,false),
('a4d43b0532662fe65bb9aedffe021b05',203,false),
('a53cd03a7ccd7fb8631ee0ef9ca3b52b',193,false),
('a61ddffba6453061febea7268c481b1b',241,false),
('a697aaded9f5fac0bb235e9adc899e93',80,false),
('a7f86cfaaf0d9c894c92f34fd210c1f2',39,false),
('a888bcee0f9e06935dae202b1073a977',64,false),
('a8b4b56f3eb4249f451faad9fd65fe0a',192,false),
('a90b1591fb5fd6a3668430ed33cb2d72',1,false),
('a90e2dd8aefa63e15ade48a5315ccb62',288,false),
('aa1094d821fe762fe89217cbf8022452',106,false),
('abbe10b23d0d6c4b42f2c2f21b0f0c5e',142,false),
('ad5d6ee8ccada63c909809a78e08885d',135,false),
('ad8809817a1f649170eb3481734d3bea',10,false),
('ae76e2dbfa53e132d3bbdf6384696e3b',123,false),
('aee415a3ef4be980afa8fc217bd2ddff',129,false),
('b0f12a768b7f45db7f6600e682e620f5',276,false),
('b1a057bf49c25c62725ac4c7bf10cbc8',24,false),
('b2814f9a0ee4f918d9fd242f475ea406',84,false),
('b2e9b5fd9d6fac0a8dace1c81ae0f12c',160,false),
('b5273e38e8edd79aaaa8ca02c7c6ac6b',36,false),
('b5299fc047cb69a7b4e8f0e878837f09',124,false),
('b5787658fbc6026a915da45db2633eee',219,false),
('b58232d5378905127bf5c29d607f79fb',277,false),
('b6abc089a868e8a97f5ca0295bd16491',110,false),
('b75b0ce2c604ae56db905a9b02394223',223,false),
('b78d97da359c127b19de0a767e023ce9',248,false),
('b7d8e1ea6109e529d7ef75c9ac29fa3c',104,false),
('b86781569a2feacdb7d7b8b7abbfc1a1',101,false),
('baa80dc1b81ad1ddfbcce290c4745931',231,false),
('bae2434b50289ea67b4fa5f97ad37562',267,false),
('bb18cb7ef9136a948a269f1da5e2e7d5',76,false),
('bbec5ff1542dbefd482ca003b46281dc',78,false),
('bca41fe66d28126030d17faf62d58eb4',151,false),
('bcd439e5953948d8846552fc96e33b7a',266,false),
('bcf0f54b561104a4b3a67ae0976f2a2d',91,false),
('beaad68cbad58e2de8fbd3c4bc314009',81,false),
('bfe43229e13a73b6873abc3e2cff25f8',176,false),
('c175d7bb20b14396494da2555847f675',99,false),
('c57d834bbc638b78e1c6aac22bd37c49',251,false),
('c5cb74fc4fc51b7e83ef5b3b55f265d5',271,false),
('c5db8b0f30163c6a0a11de97dfd70cda',226,false),
('c695dd4b135106f2014037fcb0df0b06',265,false),
('c6a0e294e0d8ab542c2bee3ded45ebbe',189,false),
('c827a54500d0c7fdfda88fc2bdc7d594',60,false),
('cab0de55b62d2a373c4c7157fcadcd11',232,false),
('cb1736593d0e29b94c84dd414cc031d7',244,false),
('cc2416ccc38f2ec83bf8c0c8a0ad16f0',218,false),
('cde7f2da2ec08f2ffc719b44c624aa27',48,false),
('ce2eb2b9c332ddaa5dfd0c509c8ffa3f',250,false),
('ce6935e7b244911ce435226b4aa30977',75,false),
('cfff3edbe05d4b75ac41a467eb48f31b',253,false),
('d0112cfb71f2284ec8caf0702f2dbb6d',259,false),
('d0647b794bdffe79f74c0c46bb496a03',260,false),
('d0bcafe0358239cd8a00ebcbf190024e',300,false),
('d0fe5a30bdb8df388a039dd90ba7a9e1',28,false),
('d149742c63a287cc1efc5f20807026b7',295,false),
('d16b01d8161ca4f3e0f8e9dd6ca2a4c1',43,false),
('d188b57a5f5cf54eff8d78f15e86ea93',147,false),
('d2d2b3353538ab2fae12a4a17a9e3d95',56,false),
('d3696c31896d2c4fc6fcad0b27cdcb37',206,false),
('d45c9fbd0e46f2231fc2accb310fe2fb',42,false),
('d4cb8b119d8249050a74d971e2e5041a',215,false),
('d4d922a82387706aada769fe14936c7d',243,false),
('d554a3a39bc7aa0abf3bed62ff630772',40,false),
('d695ffd9c59460ec87b427549a406226',74,false),
('d6ceb0c30af621828019ac0b91fa448e',272,false),
('d72f96b6eb975e34c448622b5e0cf04f',279,false),
('d7ab1f88edc08156cd6e223ec698b871',137,false),
('d7b1067333125e2bcfbf3cd237f3dbc9',61,false),
('d7cb5ac36209a2259a5786a84c385fd7',116,false),
('d935b905fd137ffcb8f35c1d7ca34c9a',246,false),
('dae5d1df099b6528711b975a8b89847e',227,false),
('dafb46ecbb6bc2317fdc643262da051e',278,false),
('db8919ec444d1e42b8d5a40f86deeb8a',133,false),
('db89a8d23f213fef1be4182625bd8062',239,false),
('dba2e0c366c0687419e10b50d4e081f7',299,false),
('dbb789a2b8518f6568f28e9d2599fce9',158,false),
('dc7f9b559146c1e6a8547f30df17d847',87,false),
('dcbaae1154e662ab9afe687b77cd883b',273,false),
('dd89e962e11b755a921dfd7d825ec164',13,false),
('dd9630821a1c93b2aa0adfd92da6b4c4',100,false),
('ddc83822647f08c8f557aea72e958633',66,false),
('dfe14fbc5a890a65d4bd2b5d1d0e8106',77,false),
('dfe921108ec155e11c0dcefb4c74e241',152,false),
('e0c575fe954d6ca6b507eec3828e9d51',159,false),
('e16670c1a76659f3e337055c1b753ee5',35,false),
('e1737b665da006f0b656f7eedae867d3',109,false),
('e1877a1cf2ac2a768d24119ec78ef8fa',287,false),
('e20219baef42471f1631bd7c719b30ad',240,false),
('e2783dab4cd2a46cfc4d578517c9fdcf',114,false),
('e28fbf5a9a1d5a577b3ad4f6ef070e9e',49,false),
('e296fa04e43e0d73b7396c09435dccb5',117,false),
('e307e30840f8d6dd54a8cffce04a8aa9',205,false),
('e6b6f5aa933e2f3a42097a28be96de07',119,false),
('e6c6d14165d833bbb2481afa06e367f8',102,false),
('e6cf7e0a37505077a4edda4182dd53d3',198,false),
('ebfae022dd2c6fc5aff96e775e1aae8f',180,false),
('ec5c104e53a28141926db75fe77e4f31',216,false),
('ef0aaa47cc9e1af40ad5e54a7ea60881',55,false),
('f012e28116d463234bd789383e19d335',73,false),
('f11aa70f8bf242fd038bd8f4e96dbd0b',97,false),
('f1e099b1318fad8dd93be11ec4b73dfb',53,false),
('f1e5bade10d840515a39d275a6d01070',86,false),
('f2432096a7b3400a8b48f7ad2027dc7e',190,false),
('f26a46a0be66693a1ac74652fbdb6692',22,false),
('f4d5d0aa98b42cbf58c7568ac8066b30',212,false),
('f5434c06aeebf3c27181e3343c239929',292,false),
('f5fea6cbfa74270f6b25b86d89ee95b8',264,false),
('f6317608e3e12deeb888bab25ae45bed',184,false),
('f6a132e7e64de79351efd6fade840ef8',112,false),
('f7ee91da5b6a335c39443856838ccb93',92,false),
('fa5dd1d63368e660a9bcb3ce7e4c2f62',71,false),
('fa5de37eb7bcb47fda0b29d9a0bd8954',146,false),
('fabcca3dfe865a9275c1f91c2e70fe37',237,false),
('fb6a175b4ffc1b191616d64782472566',255,false),
('fbea31f498af89f5140d1bc40621ff40',128,false),
('fc0065f7f79426e4e01479af9eb258d2',254,false),
('fc106fc0031b53461d6c8ff47afd4e26',52,false),
('fce3a73b7d789b4af784508dc039b8d1',289,false),
('fd042ce287b024cbc1faba8ad95122b3',236,false),
('fdc8258fc85098dba012d772404956bf',256,false),
('feb934f0458c555a5d5c1f92eea6861d',245,false),
('ff068a398e907210f823331ebe5699a8',274,false),
('ff938f52625f07c4c888a12ba7cd68f2',19,false),
('ea2a5b36f4b53b01d8246824d625af2b',null,true)
on conflict (hash) do nothing;
