// POST: recebe as notificações do Mercado Pago. Valida a assinatura (se MP_WEBHOOK_SECRET
// estiver configurada), consulta o pagamento direto na API e registra o acesso se aprovado.
import { createHmac, timingSafeEqual } from "node:crypto";
import { json, fetchPayment, isApprovedOrivie, recordApproved, configured } from "../lib/mp.mjs";

function signatureOk(req, dataId) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true; // sem segredo configurado: segue, mas o pagamento é sempre conferido na API
  const sig = req.headers.get("x-signature") || "";
  const requestId = req.headers.get("x-request-id") || "";
  const parts = Object.fromEntries(sig.split(",").map((s) => s.trim().split("=")));
  if (!parts.ts || !parts.v1) return false;
  let manifest = "";
  if (dataId) manifest += `id:${String(dataId).toLowerCase()};`;
  if (requestId) manifest += `request-id:${requestId};`;
  manifest += `ts:${parts.ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");
  try { return timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1)); } catch { return false; }
}

export default async (req) => {
  if (req.method !== "POST") return json({ ok: true });
  if (!configured()) return json({ error: "config" }, 503);
  const url = new URL(req.url);
  let body = {};
  try { body = await req.json(); } catch {}
  const type = url.searchParams.get("type") || url.searchParams.get("topic") || body.type || body.topic;
  const dataId = url.searchParams.get("data.id") || url.searchParams.get("id") || (body.data && body.data.id);
  if (!signatureOk(req, url.searchParams.get("data.id") || (body.data && body.data.id))) return json({ error: "assinatura" }, 401);
  if (type && type !== "payment") return json({ ok: true, ignorado: type });
  const p = await fetchPayment(dataId);
  if (p && isApprovedOrivie(p)) {
    try { await recordApproved(p); } catch (e) { console.error("Falha ao registrar acesso", e); return json({ error: "store" }, 500); }
  }
  return json({ ok: true });
};
