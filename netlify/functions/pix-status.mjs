// GET ?id=123: consulta o status de um PIX no Mercado Pago. Se aprovado, registra o acesso.
import { json, fetchPayment, isApprovedOrivie, recordApproved, configured } from "../lib/mp.mjs";

export default async (req) => {
  if (!configured()) return json({ error: "config" }, 503);
  const id = new URL(req.url).searchParams.get("id");
  const p = await fetchPayment(id);
  if (!p) return json({ error: "not_found" }, 404);
  if (!p.metadata || p.metadata.app !== "orivie") return json({ error: "not_found" }, 404);
  if (isApprovedOrivie(p)) {
    try { await recordApproved(p); } catch (e) { console.error("Falha ao registrar acesso", e); }
    return json({ status: "approved", paid: true });
  }
  return json({ status: p.status, paid: false });
};
