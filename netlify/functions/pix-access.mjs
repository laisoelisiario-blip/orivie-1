// GET ?email=: diz se este e-mail já tem um pagamento aprovado (para entrar em outro aparelho).
import { json, normEmail, validEmail, store, configured } from "../lib/mp.mjs";

export default async (req) => {
  if (!configured()) return json({ paid: false });
  const email = normEmail(new URL(req.url).searchParams.get("email"));
  if (!validEmail(email)) return json({ paid: false });
  let rec = null;
  try { rec = await store().get("email:" + email, { type: "json" }); } catch (e) { console.error("Falha ao ler acesso", e); }
  return json({ paid: Boolean(rec && rec.paid) });
};
