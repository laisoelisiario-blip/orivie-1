// Painel da dona do Orivie: lista de clientes e códigos usados.
// Protegido pela variável de ambiente ADMIN_PASSWORD (configure no painel da Netlify; mínimo de 10 caracteres).
// POST /.netlify/functions/admin
//   {action:"login", password}         -> {token}           (token vale 12 horas)
//   {action:"list"} + Bearer token     -> {stats, clients, codes}
import { getStore } from "@netlify/blobs";
import { createHmac, timingSafeEqual } from "node:crypto";
import { CODE_NUMBERS } from "../lib/codes.mjs";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const store = () => globalThis.__orivieTestStore || getStore({ name: "orivie-contas", consistency: "strong" });
const PRICE = Math.round(Number(process.env.ORIVIE_PRICE || "12.90") * 100) / 100;
const secret = () => String(process.env.ADMIN_PASSWORD || "");
const configured = () => secret().length >= 10;
const TOKEN_HOURS = 12;

const sign = (exp) => createHmac("sha256", secret()).update("orivie-admin:" + exp).digest("hex");
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y); };
function validToken(req) {
  const m = /^Bearer\s+(\d{13})\.([a-f0-9]{64})$/i.exec(req.headers.get("authorization") || "");
  if (!m) return false;
  const exp = Number(m[1]);
  return exp > Date.now() && safeEq(sign(exp), m[2]);
}

async function listKeys(prefix) {
  const st = store();
  const res = await st.list({ prefix });
  return (res && res.blobs ? res.blobs : []).map((b) => b.key);
}

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!configured()) return json({ error: "config", message: "Painel ainda não configurado: crie a variável ADMIN_PASSWORD na Netlify (mínimo de 10 caracteres) e faça um novo deploy." }, 503);
  let b = {};
  try { b = await req.json(); } catch {}
  const st = store();

  if (b.action === "login") {
    const lock = (await st.get("adminfail", { type: "json" })) || { n: 0 };
    if (lock.until && lock.until > Date.now()) return json({ error: "locked", message: `Muitas tentativas. Tente de novo em ${Math.ceil((lock.until - Date.now()) / 60000)} min.` }, 429);
    if (!safeEq(String(b.password || ""), secret())) {
      lock.n = (lock.n || 0) + 1;
      if (lock.n >= 5) { lock.until = Date.now() + 15 * 60000; lock.n = 0; }
      await st.setJSON("adminfail", lock);
      return json({ error: "wrong", message: "Senha incorreta." }, 401);
    }
    await st.setJSON("adminfail", { n: 0 });
    const exp = Date.now() + TOKEN_HOURS * 3600e3;
    return json({ token: `${exp}.${sign(exp)}` });
  }

  if (!validToken(req)) return json({ error: "auth", message: "Entre de novo com a senha do painel." }, 401);

  if (b.action === "list") {
    const userKeys = await listKeys("user:");
    const users = (await Promise.all(userKeys.map((k) => st.get(k, { type: "json" })))).filter(Boolean);
    const clients = users.map((u) => {
      const d = u.data || {};
      return {
        email: u.email, name: u.name || "", birth: u.birth || "", created: u.created || "",
        paid: !!u.paid, payDate: u.payDate || "", payMethod: u.payMethod || "",
        code: u.accessCode ? CODE_NUMBERS[u.accessCode] || null : null,
        profile: d.profile || "", testDone: !!d.testDone, xp: Number(d.xp) || 0,
        read: Array.isArray(d.read) ? d.read.length : 0, goals: Array.isArray(d.goals) ? d.goals.length : 0,
        boards: Array.isArray(d.boards) ? d.boards.length : 0, days: Array.isArray(d.days) ? d.days.length : 0,
        lastActive: u.updatedAt || 0,
      };
    }).sort((a, b) => String(b.created).localeCompare(String(a.created)));
    const codeKeys = await listKeys("code:");
    const codes = (await Promise.all(codeKeys.map(async (k) => {
      const c = await st.get(k, { type: "json" });
      const h = k.slice(5);
      return c ? { n: CODE_NUMBERS[h.slice(0, 10)] || null, email: c.email, at: c.at } : null;
    }))).filter(Boolean).sort((a, b) => (a.n || 0) - (b.n || 0));
    const paid = clients.filter((c) => c.paid).length;
    return json({
      stats: { total: clients.length, paid, waiting: clients.length - paid, codesUsed: codes.length, codesTotal: Object.keys(CODE_NUMBERS).length, revenue: Math.round(paid * PRICE * 100) / 100, price: PRICE },
      clients, codes, generatedAt: new Date().toISOString(),
    });
  }
  return json({ error: "action" }, 400);
};
