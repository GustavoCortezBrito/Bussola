import { NextResponse } from "next/server";

/**
 * Recebe os leads dos formulários dos dois sites.
 *
 * Defina LEAD_WEBHOOK_URL (Zapier, Make, n8n, Google Apps Script, CRM…) para
 * encaminhar cada lead como JSON. Em produção, sem o webhook, a rota responde
 * 503 para o formulário mostrar o fallback do WhatsApp — assim nenhum lead é
 * "engolido" em silêncio.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCES = new Set(["imobiliaria", "empreendimento"]);

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // honeypot: robôs preenchem, pessoas não. Responde "ok" sem encaminhar.
  if (str(body.empresa, 50)) return NextResponse.json({ ok: true });

  const lead = {
    nome: str(body.nome, 120),
    telefone: str(body.telefone, 20),
    email: str(body.email, 160),
    interesse: str(body.interesse, 20),
    faixa: str(body.faixa, 20),
    mensagem: str(body.mensagem, 500),
    corretor: body.corretor === true,
    consentimento: body.consentimento === true,
    source: str(body.source, 30),
    project: str(body.project, 80),
  };

  const phoneDigits = lead.telefone.replace(/\D/g, "");
  const valid =
    lead.nome.length >= 2 &&
    phoneDigits.length >= 10 &&
    phoneDigits.length <= 13 &&
    EMAIL.test(lead.email) &&
    lead.consentimento &&
    SOURCES.has(lead.source);

  if (!valid) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[lead] LEAD_WEBHOOK_URL não configurado: lead NÃO foi encaminhado.");
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    }
    console.warn("[lead] (dev) webhook não configurado; lead validado e descartado.");
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (err) {
    console.error("[lead] falha ao encaminhar para o webhook:", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
