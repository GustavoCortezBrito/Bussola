import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { brand, siteUrls, whatsappLink } from "@/content/brand";
import { steps } from "@/content/empreendimento";
import { bairros, projects } from "@/content/projects";
import { media, mediaMany } from "@/lib/media";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroCarousel } from "@/components/hero-carousel";
import { ImobiliariaMark } from "@/components/brand-marks";
import { HeroSearch } from "@/components/imobiliaria/hero-search";
import { ProjectsExplorer } from "@/components/imobiliaria/projects-explorer";
import { ProjectGrid, type ProjectWithMedia } from "@/components/imobiliaria/project-card";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import { AnimatedCompass, Parallax, ScrollProgress, SplitHeading } from "@/components/motion";
import { Faq } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: `${brand.imobiliaria.name} | Imóveis para morar e investir em Florianópolis`,
  description:
    "Empreendimentos selecionados em Florianópolis, incluindo obras a preço de custo. Conheça o Residencial Aurora e fale com um consultor.",
  openGraph: {
    title: `${brand.imobiliaria.name} | Morar bem. Investir melhor.`,
    description:
      "Curadoria de empreendimentos em Florianópolis, com acompanhamento do primeiro contato à entrega das chaves.",
    locale: "pt_BR",
    type: "website",
  },
};

const NAV = [
  { label: "Empreendimentos", href: "#empreendimentos" },
  { label: "Como funciona", href: "#modelo" },
  { label: "Visualizações", href: "#visualizacao" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const PILLARS = [
  {
    n: "01",
    title: "Curadoria",
    text: "Só apresentamos projetos que analisamos: terreno, orçamento, equipe técnica e estrutura jurídica.",
  },
  {
    n: "02",
    title: "Clareza",
    text: "Você entende o que está comprando, como o preço é formado e quais são os riscos, antes de assinar.",
  },
  {
    n: "03",
    title: "Acompanhamento",
    text: "Do primeiro contato à entrega das chaves, um consultor fica ao seu lado em cada etapa.",
  },
];

const COMPARE = [
  {
    row: "Como o preço é formado",
    a: "Custo da obra somado à margem de lucro da incorporadora.",
    b: "Custo real da obra, mais as taxas de administração previstas em regulamento.",
  },
  {
    row: "Acompanhamento dos custos",
    a: "Definido pela incorporadora.",
    b: "Orçamento independente, boletins mensais e conselho fiscal eleito pelos adquirentes.",
  },
  {
    row: "Variação de valor",
    a: "Em geral, preço fechado em contrato, com reajuste por índice.",
    b: "Acompanha o custo real da obra, que pode variar e é informado a cada boletim.",
  },
];

const FAQ = [
  {
    q: "O que é obra a preço de custo?",
    a: "É um modelo em que a obra é executada pelo custo real orçado, sem a margem de lucro da incorporação tradicional embutida no preço. Os adquirentes acompanham a execução e as contas do projeto, e o custo final pode variar. Tudo é detalhado no regulamento do empreendimento.",
  },
  {
    q: "Como funciona o atendimento?",
    a: "Você conversa com um consultor da Bússola, que apresenta os empreendimentos que combinam com o seu objetivo, envia plantas e condições atualizadas e acompanha você até a assinatura e depois dela.",
  },
  {
    q: "Posso financiar a compra?",
    a: "Depende do empreendimento e do modelo de aquisição. Em projetos a preço de custo, o pagamento costuma seguir o fluxo da obra. Um consultor explica as condições de cada projeto e simula com você.",
  },
  {
    q: "Posso visitar o local?",
    a: "Sim. Agende uma visita ao terreno, ao stand ou à obra pelo WhatsApp ou pelo formulário desta página.",
  },
];

export default function ImobiliariaPage() {
  const heroSlides = mediaMany(["hero-manha", "hero-por-do-sol", "hero-noite", "hero-aerea"]);
  const withMedia: ProjectWithMedia[] = projects.map((p) => ({ ...p, media: media(p.mediaId) }));
  const tiles = mediaMany(["projeto-luz", "projeto-verde", "projeto-rooftop"]);
  const featured = projects[0];

  return (
    <>
      <ScrollProgress />
      <SiteHeader
        brand={<ImobiliariaMark />}
        links={NAV}
        cta={{ label: "Falar com consultor", href: "#contato" }}
      />

      <main>
        {/* ------------------------------ CAPA ------------------------------ */}
        <HeroCarousel slides={heroSlides} className="min-h-[100svh]">
          <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-40 pt-32 md:pb-36">
            <p className="eyebrow rise text-white/80" style={{ "--d": "0.1s" } as React.CSSProperties}>
              Florianópolis · Santa Catarina
            </p>
            <h1
              className="h-display rise mt-5 max-w-4xl text-[clamp(2.7rem,7.2vw,6.4rem)] leading-[0.98]"
              style={{ "--d": "0.2s" } as React.CSSProperties}
            >
              Morar bem.
              <br />
              Investir melhor.
              <br />
              <span className="italic text-white/80">Em Florianópolis.</span>
            </h1>
            <p
              className="rise mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
              style={{ "--d": "0.35s" } as React.CSSProperties}
            >
              Curadoria de empreendimentos, incluindo obras a preço de custo, com
              acompanhamento do primeiro contato à entrega das chaves.
            </p>

            <div className="rise mt-9" style={{ "--d": "0.5s" } as React.CSSProperties}>
              <HeroSearch bairros={bairros} />
            </div>

            <Link
              href={siteUrls.empreendimento}
              className="rise group mt-6 inline-flex w-fit items-center gap-3 text-sm text-white/85"
              style={{ "--d": "0.65s" } as React.CSSProperties}
            >
              <span className="eyebrow rounded-full bg-brass px-3 py-1.5 !text-[0.6rem] text-white">
                Em destaque
              </span>
              <span className="font-semibold underline-offset-4 group-hover:underline">
                {brand.empreendimento.full} · {brand.empreendimento.bairro}
              </span>
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </HeroCarousel>

        {/* ----------------------------- POR QUE ---------------------------- */}
        <section className="py-24 md:py-32" aria-labelledby="porque">
          <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow text-brass-deep">Sobre a {brand.imobiliaria.short}</p>
              <SplitHeading id="porque" className="h-display mt-5 text-4xl md:text-6xl">Todo projeto tem um norte. O nosso é a clareza de quem compra.</SplitHeading>
            </Reveal>
            <div className="divide-y hairline border-y hairline">
              {PILLARS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.08}>
                  <div className="grid gap-3 py-8 md:grid-cols-[4rem_12rem_1fr] md:items-baseline">
                    <span className="h-display text-2xl text-brass">{p.n}</span>
                    <h3 className="h-display text-2xl">{p.title}</h3>
                    <p className="leading-relaxed text-ink/70">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------- EMPREENDIMENTOS ------------------------ */}
        <section
          id="empreendimentos"
          className="bg-sand py-24 md:py-32"
          aria-labelledby="empreendimentos-h"
        >
          <div className="container-x">
            <Reveal className="mb-12 max-w-2xl">
              <p className="eyebrow text-brass-deep">Empreendimentos</p>
              <SplitHeading id="empreendimentos-h" className="h-display mt-5 text-4xl md:text-6xl">Escolha por onde começar.</SplitHeading>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                Lançamentos, obras em andamento e projetos entregues. Filtre por bairro,
                modalidade e número de dormitórios.
              </p>
            </Reveal>
            <Suspense
              fallback={
                <>
                  <div className="mb-8 h-11" />
                  <ProjectGrid projects={withMedia} />
                </>
              }
            >
              <ProjectsExplorer projects={withMedia} bairros={bairros} />
            </Suspense>
          </div>
        </section>

        {/* ------------------------ MODELO PREÇO DE CUSTO ------------------- */}
        <section id="modelo" className="on-dark relative overflow-hidden bg-ink py-24 text-white md:py-32" aria-labelledby="modelo-h">
          <AnimatedCompass className="-right-24 top-6 w-[34rem] max-w-none opacity-70 md:-right-16 md:w-[40rem]" />
          <div className="container-x relative z-10">
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-brass">Obra a preço de custo</p>
              <SplitHeading id="modelo-h" className="h-display mt-5 text-4xl md:text-6xl">O preço de custo muda a conta da compra.</SplitHeading>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                Em vez de pagar a margem da incorporação tradicional, você entra no
                projeto pelo custo da obra e acompanha cada etapa, com mais
                transparência e também com a responsabilidade de um modelo em que o custo
                final pode variar.
              </p>
            </Reveal>

            <Reveal className="mt-14 overflow-hidden border hairline">
              <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] border-b hairline bg-white/[0.04] text-sm md:grid">
                <div className="p-6" />
                <div className="eyebrow p-6 text-white/55">Incorporação tradicional</div>
                <div className="eyebrow border-l hairline p-6 text-brass">
                  Construção a preço de custo
                </div>
              </div>
              {COMPARE.map((c) => (
                <div
                  key={c.row}
                  className="grid gap-3 border-b hairline p-6 last:border-b-0 md:grid-cols-[1.1fr_1.4fr_1.4fr] md:gap-0 md:p-0"
                >
                  <h3 className="h-display text-xl md:p-6">{c.row}</h3>
                  <p className="leading-relaxed text-white/65 md:p-6">
                    <span className="eyebrow mb-1 block !text-[0.6rem] text-white/40 md:hidden">
                      Tradicional
                    </span>
                    {c.a}
                  </p>
                  <p className="leading-relaxed md:border-l md:hairline md:p-6">
                    <span className="eyebrow mb-1 block !text-[0.6rem] text-brass md:hidden">
                      Preço de custo
                    </span>
                    {c.b}
                  </p>
                </div>
              ))}
            </Reveal>

            <ol className="mt-16 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.n} className="bg-ink">
                  <Reveal delay={i * 0.07} className="group flex h-full flex-col gap-4 p-7 transition-colors duration-500 hover:bg-white/[0.06] md:p-8">
                    <span className="h-display text-4xl text-brass transition-transform duration-500 group-hover:translate-x-2">{s.n}</span>
                    <h3 className="h-display text-xl">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-white/65">{s.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link href={siteUrls.empreendimento} className="btn btn-brass">
                Ver o {brand.empreendimento.full} <ArrowRight />
              </Link>
              <p className="max-w-md text-xs leading-relaxed text-white/45">
                Não há garantia de valorização ou rentabilidade. Leia o regulamento e o
                memorial do empreendimento antes de decidir.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------- VISUALIZAÇÃO (Omega) ------------------- */}
        <section id="visualizacao" className="py-24 md:py-32" aria-labelledby="viz-h">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <Reveal>
                <p className="eyebrow text-brass-deep">Visualização</p>
                <SplitHeading id="viz-h" className="h-display mt-5 text-4xl md:text-6xl">Você vê o projeto antes de ele existir.</SplitHeading>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-ink/70">
                  Imagens e vídeos de alta qualidade mostram cada detalhe do
                  empreendimento, da fachada ao rooftop, para você decidir com
                  segurança.
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {tiles.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.08} className={i === 1 ? "md:mt-14" : ""}>
                  <Link href={`${siteUrls.empreendimento}#projeto`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                      <Parallax>
                        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105">
                          <Media item={t} sizes="(min-width:768px) 30vw, 100vw" />
                        </div>
                      </Parallax>
                    </div>
                    <p className="mt-4 flex items-center justify-between text-sm">
                      <span className="eyebrow">{t.label}</span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------- FAQ ----------------------------- */}
        <section id="faq" className="bg-sand py-24 md:py-32" aria-labelledby="faq-h">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow text-brass-deep">Dúvidas frequentes</p>
              <SplitHeading id="faq-h" className="h-display mt-5 text-4xl md:text-5xl">Perguntas que todo comprador faz.</SplitHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <Faq items={FAQ} />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------ CONTATO --------------------------- */}
        <section id="contato" className="on-dark relative overflow-hidden bg-ink py-24 text-white md:py-32" aria-labelledby="contato-h">
          <AnimatedCompass className="-left-44 -bottom-40 w-[30rem] max-w-none opacity-50 md:w-[34rem]" />
          <div className="container-x relative z-10 grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow text-brass">Contato</p>
              <SplitHeading id="contato-h" className="h-display mt-5 text-4xl md:text-6xl">Receber preços e unidades.</SplitHeading>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                Diga seu objetivo e o quanto pretende investir. Um consultor apresenta
                as opções que combinam com você.
              </p>
              <dl className="mt-10 space-y-5 text-sm">
                <div>
                  <dt className="eyebrow !text-[0.6rem] text-white/45">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      className="text-lg font-semibold underline-offset-4 hover:underline"
                      href={whatsappLink("Olá! Gostaria de conhecer os empreendimentos da Bússola.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {brand.contact.whatsappDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow !text-[0.6rem] text-white/45">E-mail</dt>
                  <dd className="mt-1 text-lg">{brand.contact.email}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-[0.6rem] text-white/45">Instagram</dt>
                  <dd className="mt-1 text-lg">{brand.contact.instagramHandle}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.1} className="border-t-2 border-brass bg-white/[0.05] p-7 ring-1 ring-white/10 md:p-12">
              <LeadForm source="imobiliaria" project={brand.imobiliaria.name} submitLabel="Receber preços e unidades" />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter
        mark={<ImobiliariaMark />}
        blurb={brand.imobiliaria.blurb}
        columns={[
          {
            title: "Empreendimentos",
            links: [
              { label: featured.name, href: featured.href },
              ...projects.slice(1).map((p) => ({ label: p.name, href: "#empreendimentos" })),
            ],
          },
          {
            title: "Navegue",
            links: NAV.map((n) => ({ label: n.label, href: n.href })),
          },
        ]}
        legal={[
          `${brand.imobiliaria.name} · ${brand.imobiliaria.creci} · ${brand.imobiliaria.city}`,
          "Imagens meramente ilustrativas, sujeitas a alterações. As informações dos empreendimentos dependem de confirmação no memorial descritivo e no regulamento de cada projeto.",
        ]}
      />

      <WhatsAppFloat message="Olá! Gostaria de conhecer os empreendimentos da Bússola." />
    </>
  );
}
