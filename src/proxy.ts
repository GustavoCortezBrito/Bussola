import { NextResponse, type NextRequest } from "next/server";

/**
 * Um projeto, dois domínios.
 * Em produção, defina EMPREENDIMENTO_HOSTS (ex.: "aurora.com.br,www.aurora.com.br").
 * Nesses hosts a raiz "/" mostra o site do empreendimento; em qualquer outro
 * host, "/" é o site da imobiliária. Sem a variável, nada muda (dev/local).
 */
const EMPREENDIMENTO_HOSTS = (process.env.EMPREENDIMENTO_HOSTS ?? "")
  .split(",")
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

export function proxy(request: NextRequest) {
  if (EMPREENDIMENTO_HOSTS.length === 0) return NextResponse.next();

  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (EMPREENDIMENTO_HOSTS.includes(host)) {
    const url = request.nextUrl.clone();
    url.pathname = "/empreendimento";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
