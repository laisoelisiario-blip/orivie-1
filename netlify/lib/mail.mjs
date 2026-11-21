// E-mails automáticos do Orivie via Resend (https://resend.com).
// Variáveis de ambiente (painel da Netlify):
//   RESEND_API_KEY       -> chave da API do Resend (sem ela, nenhum e-mail é enviado)
//   ORIVIE_NOTIFY_EMAIL  -> seu e-mail, que recebe o aviso de cada venda
//   ORIVIE_EMAIL_FROM    -> remetente, ex.: "Orivie <ola@orivie.com.br>" (exige domínio verificado no Resend).
//                           Sem ele usa "Orivie <onboarding@resend.dev>", que o Resend só entrega ao dono da conta.

const FROM_DEFAULT = "Orivie <onboarding@resend.dev>";
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const brl = (v) => "R$" + Number(v || 0).toFixed(2).replace(".", ",");

export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);
const fromAddr = () => process.env.ORIVIE_EMAIL_FROM || FROM_DEFAULT;
const usingTestSender = () => !process.env.ORIVIE_EMAIL_FROM;

export async function sendEmail({ to, subject, html, text, replyTo, key }) {
  if (!mailConfigured() || !to) return { ok: false, skipped: true };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
      "Content-Type": "application/json",
      ...(key ? { "Idempotency-Key": key } : {}),
    },
    body: JSON.stringify({ from: fromAddr(), to: [to], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) console.error("Resend recusou o e-mail", res.status, body && (body.message || body.name));
  return { ok: res.ok, status: res.status, body };
}

const shell = (title, inner) => `<!doctype html><html lang="pt-BR"><body style="margin:0;background:#F7F3EE;font-family:Arial,Helvetica,sans-serif;color:#3A2E28">
<div style="max-width:520px;margin:0 auto;padding:28px 18px">
 <p style="margin:0 0 18px;font-family:Georgia,serif;font-size:24px;font-weight:bold">Orivie <span style="font-family:Arial,sans-serif;font-size:14px;color:#94553F">- Sua Personalidade</span></p>
 <div style="background:#fff;border:2px solid #EAE2D9;border-radius:16px;padding:24px">
  <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:24px;line-height:1.25">${title}</h1>
  ${inner}
 </div>
 <p style="margin:18px 0 0;font-size:12px;color:#75655B">Você recebeu este e-mail por causa de uma compra no Orivie - Sua Personalidade.</p>
</div></body></html>`;

export function customerEmail({ email, amount, siteUrl }) {
  const url = siteUrl || "";
  const html = shell("Seu acesso está liberado! 🌱", `
  <p style="font-size:16px;line-height:1.55;margin:0 0 12px">Recebemos seu pagamento de <b>${brl(amount)}</b>. Seu acesso ao Orivie - Sua Personalidade é <b>vitalício</b>, sem mensalidade.</p>
  <p style="font-size:16px;line-height:1.55;margin:0 0 18px">Se trocar de celular ou de navegador, é só criar a conta de novo com este mesmo e-mail (<b>${esc(email)}</b>) que o acesso é reconhecido automaticamente.</p>
  ${url ? `<p style="margin:0 0 6px"><a href="${esc(url)}" style="display:inline-block;background:#D9A08B;color:#3A2E28;text-decoration:none;font-weight:bold;letter-spacing:.5px;padding:14px 22px;border-radius:12px;border-bottom:4px solid #B97F6A">ABRIR O ORIVIE</a></p>` : ""}
  <p style="font-size:14px;color:#75655B;margin:18px 0 0">Com carinho, Ori 🌱</p>`);
  const text = `Seu acesso está liberado!\n\nRecebemos seu pagamento de ${brl(amount)}. Seu acesso ao Orivie - Sua Personalidade é vitalício.\nSe trocar de celular, crie a conta com este mesmo e-mail (${email}) que o acesso é reconhecido.\n${url}`;
  return { subject: "Seu acesso ao Orivie está liberado 🌱", html, text };
}

export function ownerEmail({ email, amount, paymentId, when }) {
  const html = shell("Nova venda! 🎉", `
  <table style="font-size:15px;line-height:1.6;border-collapse:collapse">
   <tr><td style="color:#75655B;padding-right:14px">Cliente</td><td><b>${esc(email)}</b></td></tr>
   <tr><td style="color:#75655B;padding-right:14px">Valor</td><td><b>${brl(amount)}</b></td></tr>
   <tr><td style="color:#75655B;padding-right:14px">Pagamento</td><td>PIX nº ${esc(paymentId)}</td></tr>
   <tr><td style="color:#75655B;padding-right:14px">Data</td><td>${esc(when)}</td></tr>
  </table>
  <p style="font-size:14px;color:#75655B;margin:16px 0 0">O acesso da cliente já foi liberado automaticamente.</p>`);
  const text = `Nova venda!\nCliente: ${email}\nValor: ${brl(amount)}\nPagamento: PIX nº ${paymentId}\nData: ${when}\nO acesso já foi liberado automaticamente.`;
  return { subject: `Nova venda Orivie: ${brl(amount)}`, html, text };
}

// Envia os dois e-mails de uma venda aprovada. Nunca lança erro: e-mail não pode travar a liberação.
export async function sendSaleEmails({ email, amount, paymentId, approvedAt, siteUrl }) {
  const out = { customer: null, owner: null };
  if (!mailConfigured()) return out;
  const when = new Date(approvedAt || Date.now()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const notify = process.env.ORIVIE_NOTIFY_EMAIL;
  try {
    // Com o remetente de teste do Resend, só o dono da conta recebe; então não tenta enviar para a cliente.
    if (!usingTestSender()) {
      const c = customerEmail({ email, amount, siteUrl });
      out.customer = await sendEmail({ to: email, ...c, replyTo: notify, key: `orivie-cliente/${paymentId}` });
    }
  } catch (e) { console.error("Falha no e-mail da cliente", e); }
  try {
    if (notify) {
      const o = ownerEmail({ email, amount, paymentId, when });
      out.owner = await sendEmail({ to: notify, ...o, replyTo: email, key: `orivie-venda/${paymentId}` });
    }
  } catch (e) { console.error("Falha no aviso de venda", e); }
  return out;
}
