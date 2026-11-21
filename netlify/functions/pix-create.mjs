// POST {email, name}: cria uma cobrança PIX no Mercado Pago e devolve o QR Code.
import { json, mp, PRICE, normEmail, validEmail, configured } from "../lib/mp.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!configured()) return json({ error: "config", message: "Pagamento ainda não configurado." }, 503);
  let b = {};
  try { b = await req.json(); } catch {}
  const email = normEmail(b.email);
  const name = String(b.name || "").trim().slice(0, 60);
  if (!validEmail(email)) return json({ error: "email", message: "E-mail inválido." }, 400);

  const site = process.env.URL || new URL(req.url).origin;
  const body = {
    transaction_amount: PRICE,
    description: "Orivie - Sua Personalidade (acesso vitalício)",
    payment_method_id: "pix",
    payer: { email, first_name: name.split(" ")[0] || "Cliente" },
    external_reference: email,
    notification_url: site + "/.netlify/functions/pix-webhook",
    metadata: { app: "orivie" },
  };
  const r = await mp("/v1/payments", {
    method: "POST",
    headers: { "X-Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    console.error("Mercado Pago recusou a criação do PIX", r.status, r.body && r.body.message);
    return json({ error: "mp", message: "Não foi possível gerar o PIX agora. Tente de novo em instantes." }, 502);
  }
  const td = (r.body.point_of_interaction && r.body.point_of_interaction.transaction_data) || {};
  return json({
    id: String(r.body.id),
    status: r.body.status,
    amount: r.body.transaction_amount,
    qr: td.qr_code || "",
    qrBase64: td.qr_code_base64 || "",
    ticketUrl: td.ticket_url || "",
  });
};
