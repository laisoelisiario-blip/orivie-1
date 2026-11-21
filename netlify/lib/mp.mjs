// Utilidades compartilhadas pelas funções de pagamento do Orivie.
// Variáveis de ambiente (configure no painel da Netlify, nunca no código):
//   MP_ACCESS_TOKEN   -> Access Token de produção do Mercado Pago (obrigatória)
//   MP_WEBHOOK_SECRET -> Assinatura secreta dos webhooks (recomendada)
//   ORIVIE_PRICE      -> Preço em reais, ex.: 12.90 (opcional; padrão 12.90)
import { getStore } from "@netlify/blobs";
import { sendSaleEmails } from "./mail.mjs";

export const PRICE = Math.round(Number(process.env.ORIVIE_PRICE || "12.90") * 100) / 100;

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export const normEmail = (e) => String(e || "").trim().toLowerCase();
export const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
export const configured = () => Boolean(process.env.MP_ACCESS_TOKEN);

export async function mp(path, opt = {}) {
  const res = await fetch("https://api.mercadopago.com" + path, {
    ...opt,
    headers: {
      Authorization: "Bearer " + process.env.MP_ACCESS_TOKEN,
      "Content-Type": "application/json",
      ...(opt.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}

export const store = () => globalThis.__orivieTestStore || getStore("orivie-pagamentos");

// Um pagamento só libera acesso se for deste app, estiver aprovado e tiver o valor certo.
export function isApprovedOrivie(p) {
  return Boolean(
    p &&
      p.status === "approved" &&
      p.metadata && p.metadata.app === "orivie" &&
      Number(p.transaction_amount) >= PRICE - 0.001
  );
}

export async function recordApproved(p) {
  const email = normEmail(p.external_reference || (p.payer && p.payer.email));
  if (!validEmail(email)) return null;
  const rec = {
    paid: true,
    paymentId: String(p.id),
    amount: Number(p.transaction_amount),
    approvedAt: p.date_approved || new Date().toISOString(),
  };
  await store().setJSON("email:" + email, rec);
  return email;
}

// Pagamento aprovado: registra o acesso e envia os e-mails uma única vez por pagamento.
export async function onApproved(p, siteUrl) {
  const email = await recordApproved(p);
  if (!email) return null;
  const key = "mail:" + p.id;
  const st = store();
  if (await st.get(key)) return email;
  await st.setJSON(key, { at: new Date().toISOString() });
  await sendSaleEmails({ email, amount: p.transaction_amount, paymentId: String(p.id), approvedAt: p.date_approved, siteUrl: siteUrl || process.env.URL });
  return email;
}

// Busca o pagamento direto no Mercado Pago (nunca confia no que o navegador ou o webhook dizem).
export async function fetchPayment(id) {
  if (!/^\d{1,20}$/.test(String(id || ""))) return null;
  const r = await mp("/v1/payments/" + id);
  return r.ok ? r.body : null;
}
