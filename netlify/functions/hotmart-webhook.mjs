// Webhook da Hotmart: registra quem comprou (e quem foi reembolsado) pelo e-mail da compra.
// Configure na Hotmart (Ferramentas → Webhook) a URL:
//   https://SEU-SITE/.netlify/functions/hotmart-webhook   (versão 2.0)
// e coloque o "Hottok" da Hotmart na variável de ambiente HOTMART_HOTTOK da Netlify.
import { getStore } from "@netlify/blobs";
import { timingSafeEqual } from "node:crypto";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const store = () => globalThis.__orivieTestStore || getStore({ name: "orivie-contas", consistency: "strong" });
const normEmail = (e) => String(e || "").trim().toLowerCase();
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length > 0 && x.length === y.length && timingSafeEqual(x, y); };

const APPROVED = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE", "APPROVED", "COMPLETE", "COMPLETED"]);
const REVOKED = new Set(["PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK", "PURCHASE_CANCELED", "PURCHASE_CANCELLED", "PURCHASE_EXPIRED", "REFUNDED", "CHARGEBACK", "CANCELED", "CANCELLED", "EXPIRED"]);

export default async (req) => {
  if (req.method !== "POST") return json({ ok: true });
  const secret = String(process.env.HOTMART_HOTTOK || "").trim();
  if (!secret) return json({ error: "config", message: "Configure a variável HOTMART_HOTTOK na Netlify." }, 503);

  // Aceita o formato 2.0 (JSON) e o antigo 1.0 (formulário).
  const raw = await req.text();
  let body = {};
  try { body = JSON.parse(raw); } catch { body = Object.fromEntries(new URLSearchParams(raw)); }
  const token = req.headers.get("x-hotmart-hottok") || body.hottok || "";
  if (!safeEq(token, secret)) return json({ error: "token" }, 401);

  const d = body.data || {};
  const email = normEmail((d.buyer && d.buyer.email) || body.email);
  const event = String(body.event || (d.purchase && d.purchase.status) || body.status || "").toUpperCase();
  const transaction = String((d.purchase && d.purchase.transaction) || body.transaction || "");
  const product = (d.product && (d.product.ucode || d.product.id)) || body.prod || "";

  const st = store();
  await st.setJSON("hotmart:last", { at: new Date().toISOString(), event, email, transaction, product }); // ajuda a conferir o formato recebido
  if (!email) return json({ ok: true, ignorado: "sem e-mail" });

  if (APPROVED.has(event)) {
    await st.setJSON("hotmart:" + email, { status: "approved", event, transaction, product, at: new Date().toISOString() });
    return json({ ok: true, status: "approved" });
  }
  if (REVOKED.has(event)) {
    await st.setJSON("hotmart:" + email, { status: "revoked", event, transaction, product, at: new Date().toISOString() });
    const u = await st.get("user:" + email, { type: "json" });
    if (u && u.payMethod === "hotmart" && u.paid) { u.paid = false; u.updatedAt = Date.now(); await st.setJSON("user:" + email, u); }
    return json({ ok: true, status: "revoked" });
  }
  return json({ ok: true, ignorado: event || "evento desconhecido" });
};
