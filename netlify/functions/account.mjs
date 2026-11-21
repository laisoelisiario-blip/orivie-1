// Contas do Orivie na nuvem (Netlify Blobs): cadastro, login, dados do app e resgate de código.
// POST /.netlify/functions/account  {action, ...}
//   ping                                  -> {ok:true}
//   register {name,email,pass,birth,data} -> {token, profile, data, updatedAt}
//   login    {email,pass}                 -> {token, profile, data, updatedAt}
//   me       (Authorization: Bearer)      -> {profile, data, updatedAt}
//   save     (Bearer) {data, name, birth} -> {ok, updatedAt}
//   redeem   (Bearer) {code}              -> {profile}
//   password (Bearer) {cur, nw}           -> {ok}
//   logout   (Bearer)                     -> {ok}
import { getStore } from "@netlify/blobs";
import { scryptSync, randomBytes, timingSafeEqual, createHash } from "node:crypto";
import { CODE_HASHES } from "../lib/codes.mjs";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
// Consistência forte: o que acabou de ser gravado (ex.: sessão nova) aparece na hora para a próxima chamada.
const store = () => globalThis.__orivieTestStore || getStore({ name: "orivie-contas", consistency: "strong" });
const normEmail = (e) => String(e || "").trim().toLowerCase();
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const sha = (s) => createHash("sha256").update(s).digest("hex");
const now = () => new Date().toISOString();
const SESSION_DAYS = 180;
const MAX_DATA = 4_500_000; // limite do corpo das funções da Netlify (~6 MB) com folga

// Campos que só o servidor controla: o navegador nunca consegue alterá-los.
const PROTECTED = ["email", "pass", "paid", "payMethod", "payDate", "accessCode", "pix"];

function hashPass(pass, salt = randomBytes(16).toString("hex")) {
  return { salt, hash: scryptSync(String(pass), salt, 64).toString("hex") };
}
function checkPass(pass, rec) {
  if (!rec || !rec.salt || !rec.hash) return false;
  const h = scryptSync(String(pass), rec.salt, 64);
  const ok = Buffer.from(rec.hash, "hex");
  return ok.length === h.length && timingSafeEqual(ok, h);
}
const profileOf = (u) => ({ email: u.email, name: u.name, birth: u.birth, paid: !!u.paid, payMethod: u.payMethod || "", payDate: u.payDate || "", created: u.created });
function cleanData(d) {
  const out = d && typeof d === "object" && !Array.isArray(d) ? { ...d } : {};
  for (const k of PROTECTED) delete out[k];
  if (Array.isArray(out.boards) && out.boards.length > 6) out.boards = out.boards.slice(0, 6); // nuvem guarda os 6 boards mais recentes
  return out;
}
async function newSession(email) {
  const token = randomBytes(32).toString("hex");
  const exp = Date.now() + SESSION_DAYS * 864e5;
  await store().setJSON("session:" + sha(token), { email, exp });
  return token;
}
async function auth(req) {
  const m = /^Bearer\s+([a-f0-9]{64})$/i.exec(req.headers.get("authorization") || "");
  if (!m) return null;
  const s = await store().get("session:" + sha(m[1]), { type: "json" });
  if (!s || s.exp < Date.now()) return null;
  const u = await store().get("user:" + s.email, { type: "json" });
  return u ? { u, tokenKey: "session:" + sha(m[1]) } : null;
}
// Proteção contra tentativas em série (senha e código).
async function locked(key) {
  const f = await store().get("fail:" + key, { type: "json" });
  return f && f.until && f.until > Date.now() ? Math.ceil((f.until - Date.now()) / 60000) : 0;
}
async function fail(key, max = 8) {
  const st = store();
  const f = (await st.get("fail:" + key, { type: "json" })) || { n: 0 };
  f.n = (f.n || 0) + 1;
  if (f.n >= max) { f.until = Date.now() + 10 * 60000; f.n = 0; }
  await st.setJSON("fail:" + key, f);
}
const clearFail = (key) => store().setJSON("fail:" + key, { n: 0 });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const raw = await req.text();
  if (raw.length > MAX_DATA + 200_000) return json({ error: "too_big", message: "Seus dados ficaram grandes demais para salvar. Apague boards antigos." }, 413);
  let b = {};
  try { b = JSON.parse(raw || "{}"); } catch { return json({ error: "json" }, 400); }
  const st = store();

  try {
    switch (b.action) {
      case "ping":
        return json({ ok: true });

      case "register": {
        const email = normEmail(b.email), name = String(b.name || "").trim().slice(0, 80), birth = String(b.birth || "").slice(0, 10);
        if (!validEmail(email)) return json({ error: "email", message: "Esse e-mail parece incompleto." }, 400);
        if (name.length < 2) return json({ error: "name", message: "Conta pra gente o seu nome." }, 400);
        if (String(b.pass || "").length < 6) return json({ error: "pass", message: "Use pelo menos 6 caracteres." }, 400);
        if (await st.get("user:" + email)) return json({ error: "exists", message: "Esse e-mail já tem conta. Que tal entrar?" }, 409);
        const u = { email, name, birth, pass: hashPass(b.pass), paid: false, created: now(), data: cleanData(b.data), updatedAt: Date.now() };
        await st.setJSON("user:" + email, u);
        const token = await newSession(email);
        return json({ token, profile: profileOf(u), data: u.data, updatedAt: u.updatedAt });
      }

      case "login": {
        const email = normEmail(b.email);
        const wait = await locked("login:" + email);
        if (wait) return json({ error: "locked", message: `Muitas tentativas. Tente de novo em ${wait} min.` }, 429);
        const u = validEmail(email) ? await st.get("user:" + email, { type: "json" }) : null;
        if (!u) return json({ error: "not_found", message: "E-mail ou senha incorretos." }, 404);
        if (!checkPass(b.pass, u.pass)) { await fail("login:" + email); return json({ error: "wrong", message: "E-mail ou senha incorretos." }, 401); }
        await clearFail("login:" + email);
        const token = await newSession(email);
        return json({ token, profile: profileOf(u), data: u.data || {}, updatedAt: u.updatedAt || 0 });
      }

      case "me": case "save": case "redeem": case "password": case "logout": {
        const a = await auth(req);
        if (!a) return json({ error: "auth", message: "Sua sessão expirou. Entre de novo." }, 401);
        const u = a.u;

        if (b.action === "me") return json({ profile: profileOf(u), data: u.data || {}, updatedAt: u.updatedAt || 0 });

        if (b.action === "logout") { await st.delete(a.tokenKey); return json({ ok: true }); }

        if (b.action === "save") {
          u.data = cleanData(b.data);
          if (typeof b.name === "string" && b.name.trim().length >= 2) u.name = b.name.trim().slice(0, 80);
          if (typeof b.birth === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.birth)) u.birth = b.birth;
          u.updatedAt = Date.now();
          await st.setJSON("user:" + u.email, u);
          return json({ ok: true, updatedAt: u.updatedAt, profile: profileOf(u) });
        }

        if (b.action === "password") {
          if (!checkPass(b.cur, u.pass)) return json({ error: "wrong", message: "Senha atual incorreta." }, 401);
          if (String(b.nw || "").length < 6) return json({ error: "pass", message: "Use pelo menos 6 caracteres." }, 400);
          u.pass = hashPass(b.nw); u.updatedAt = Date.now();
          await st.setJSON("user:" + u.email, u);
          return json({ ok: true });
        }

        if (b.action === "redeem") {
          if (u.paid) return json({ profile: profileOf(u) });
          const wait = await locked("code:" + u.email);
          if (wait) return json({ error: "locked", message: `Muitas tentativas. Aguarde ${wait} min e tente de novo.` }, 429);
          const c = String(b.code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
          if (c.length !== 15 || !c.startsWith("ORV")) return json({ error: "format", message: "O código tem o formato ORV-XXXX-XXXX-XXXX." }, 400);
          const h = sha("orivie-code::" + c).slice(0, 32);
          if (!CODE_HASHES.has(h)) { await fail("code:" + u.email, 5); return json({ error: "invalid", message: "Código não encontrado. Confira se digitou igual ao que recebeu." }, 404); }
          const used = await st.get("code:" + h, { type: "json" });
          if (used && used.email !== u.email) return json({ error: "used", message: "Esse código já foi usado em outra conta. Fale com a gente pelo WhatsApp." }, 409);
          await st.setJSON("code:" + h, { email: u.email, at: now() });
          u.paid = true; u.payMethod = "codigo"; u.payDate = now().slice(0, 10); u.accessCode = h.slice(0, 10); u.updatedAt = Date.now();
          await st.setJSON("user:" + u.email, u);
          await clearFail("code:" + u.email);
          return json({ profile: profileOf(u) });
        }
      }
    }
    return json({ error: "action" }, 400);
  } catch (e) {
    console.error("Erro na conta", e);
    return json({ error: "server", message: "Tivemos um problema agora. Tente de novo em instantes." }, 500);
  }
};
