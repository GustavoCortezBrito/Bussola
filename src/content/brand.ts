/**
 * ⚠️  CONTEÚDO DE EXEMPLO
 * Nomes, números e textos deste arquivo e de `empreendimento.ts` / `projects.ts`
 * são FICTÍCIOS. Troque pelos dados reais do cliente antes de publicar.
 */

export const brand = {
  imobiliaria: {
    name: "Bússola Imóveis",
    short: "Bússola",
    descriptor: "Imóveis",
    city: "Florianópolis · Santa Catarina",
    // TODO: CRECI real da imobiliária
    creci: "CRECI-SC 00000-J",
    blurb:
      "Curadoria de empreendimentos em Florianópolis para morar e investir, incluindo obras a preço de custo.",
  },
  empreendimento: {
    name: "Aurora",
    full: "Residencial Aurora",
    bairro: "Campeche",
    city: "Florianópolis",
    state: "SC",
    tagline: "Luz, verde e mar. Construído a preço de custo.",
  },
  contact: {
    // Defina NEXT_PUBLIC_WHATSAPP (somente dígitos, com DDI+DDD) no .env
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5548900000000",
    whatsappDisplay: "(48) 90000-0000",
    instagram: "https://www.instagram.com/",
    instagramHandle: "@bussola.imoveis",
    email: "contato@exemplo.com.br",
  },
} as const;

/**
 * URLs de cada site. Em desenvolvimento ficam na mesma origem; em produção,
 * com um domínio para cada site, defina as variáveis de ambiente.
 */
export const siteUrls = {
  imobiliaria: process.env.NEXT_PUBLIC_IMOBILIARIA_URL ?? "/",
  empreendimento: process.env.NEXT_PUBLIC_EMPREENDIMENTO_URL ?? "/empreendimento",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
