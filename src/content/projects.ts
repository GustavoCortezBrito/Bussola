import { siteUrls } from "./brand";

/**
 * ⚠️ DADOS FICTÍCIOS — vitrine de exemplo do site da imobiliária.
 * O primeiro item (Residencial Aurora) aponta para o site do empreendimento.
 */

export type Status = "Pré-lançamento" | "Em obras" | "Últimas unidades" | "Entregue";
export type Modalidade = "preco-de-custo" | "incorporacao";

export type Project = {
  slug: string;
  name: string;
  bairro: string;
  status: Status;
  modalidade: Modalidade;
  dormMin: number;
  dormMax: number;
  area: string;
  /** valor "a partir de", em reais (opcional) */
  from?: number;
  teaser: string;
  href: string;
  mediaId: string;
  featured?: boolean;
};

export const MODALIDADES: Record<Modalidade, string> = {
  "preco-de-custo": "Obra a preço de custo",
  incorporacao: "Incorporação tradicional",
};

export const projects: Project[] = [
  {
    slug: "aurora",
    name: "Residencial Aurora",
    bairro: "Campeche",
    status: "Pré-lançamento",
    modalidade: "preco-de-custo",
    dormMin: 1,
    dormMax: 4,
    area: "38–168 m²",
    from: 520000,
    teaser:
      "Apartamentos de 1 a 4 dormitórios a poucos minutos da praia, com rooftop, área verde integrada e obra a preço de custo.",
    href: siteUrls.empreendimento,
    mediaId: "card-aurora",
    featured: true,
  },
  {
    slug: "mare-alta",
    name: "Maré Alta Studios",
    bairro: "Lagoa da Conceição",
    status: "Em obras",
    modalidade: "incorporacao",
    dormMin: 1,
    dormMax: 2,
    area: "28–64 m²",
    from: 389000,
    teaser: "Studios e 2 dormitórios para renda de temporada, perto da Lagoa.",
    href: "#contato",
    mediaId: "card-2",
  },
  {
    slug: "figueiras",
    name: "Jardim das Figueiras",
    bairro: "Trindade",
    status: "Últimas unidades",
    modalidade: "incorporacao",
    dormMin: 2,
    dormMax: 3,
    area: "62–98 m²",
    from: 710000,
    teaser: "Residencial com áreas verdes e lazer completo, ao lado da UFSC.",
    href: "#contato",
    mediaId: "card-3",
  },
  {
    slug: "beira-mar",
    name: "Bossa Beira-Mar",
    bairro: "Agronômica",
    status: "Entregue",
    modalidade: "preco-de-custo",
    dormMin: 3,
    dormMax: 4,
    area: "110–190 m²",
    teaser: "Projeto entregue: obra concluída a preço de custo, com prestação de contas aos adquirentes.",
    href: "#contato",
    mediaId: "card-4",
  },
  {
    slug: "vila-costeira",
    name: "Vila Costeira",
    bairro: "Ingleses",
    status: "Pré-lançamento",
    modalidade: "preco-de-custo",
    dormMin: 2,
    dormMax: 3,
    area: "58–104 m²",
    from: 465000,
    teaser: "Residencial de baixa altura a poucos passos da praia, em obra a preço de custo.",
    href: "#contato",
    mediaId: "card-5",
  },
];

export const bairros = Array.from(new Set(projects.map((p) => p.bairro))).sort();

export const brl = (v: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(v);
