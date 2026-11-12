import type { Metadata } from "next";
import Link from "next/link";
import { brand, siteUrls, whatsappLink } from "@/content/brand";
import {
  amenities,
  chapters,
  distances,
  faq,
  partners,
  pillars,
  stats,
  steps,
  typologies,
} from "@/content/empreendimento";
import { media, mediaMany } from "@/lib/media";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroCarousel } from "@/components/hero-carousel";
import { EmpreendimentoMark, ImobiliariaMark } from "@/components/brand-marks";
import { Reveal } from "@/components/reveal";
import { AnimatedSunMark, AnimatedCompass, ScrollProgress, SplitHeading } from "@/components/motion";
import { Counter } from "@/components/counter";
import { Faq } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollChapters } from "@/components/empreendimento/scroll-chapters";
import { Typologies } from "@/components/empreendimento/typologies";
import { LocationMap } from "@/components/empreendimento/location-map";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "@/components/icons";

const e = brand.empreendimento;

export const metadata: Metadata = {
  title: `${e.full} | Apartamentos de 1 a 4 dormitórios no ${e.bairro}, ${e.city}`,
  description: `${e.full}: apartamentos de 1 a 4 dormitórios no ${e.bairro}, ${e.city}. Obra a preço de custo, com governança transparente, rooftop e área verde integrada.`,
  openGraph: {
    title: `${e.full} · ${e.bairro}, ${e.city}`,
    description: e.tagline,
    locale: "pt_BR",
    type: "website",
  },
};

const NAV = [
  { label: "Modelo", href: "#modelo" },
  { label: "Projeto", href: "#projeto" },
  { label: "Plantas", href: "#plantas" },
  { label: "Localização", href: "#localizacao" },
  { label: "Governança", href: "#governanca" },
];

const WA_MSG = `Olá! Tenho interesse no ${e.full} e gostaria de mais informações.`;

export default function EmpreendimentoPage() {
  const heroSlides = mediaMany(["hero-manha", "hero-por-do-sol", "hero-noite", "hero-aerea"]);
  const heroVideo = media("hero-video").src;
  const chapterData = chapters.map((c) => ({
    id: c.mediaId,
    kicker: c.kicker,
    title: c.title,
    text: c.text,
    media: media(c.mediaId),
  }));

  return (
    <>
      <ScrollProgress />
      <SiteHeader
        brand={<EmpreendimentoMark />}
        brandHref={siteUrls.empreendimento}
        links={NAV}
        cta={{ label: "Quero saber mais", href: "#contato" }}
      />

      <main>
        {/* ------------------------------ CAPA ------------------------------ */}
        <HeroCarousel slides={heroSlides} video={heroVideo} className="min-h-[100svh]">
          <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-40 pt-32 md:pb-28">
            <p
              className="eyebrow rise flex flex-wrap items-center gap-x-3 gap-y-2 text-white/80"
              style={{ "--d": "0.1s" } as React.CSSProperties}
            >
              <span className="rounded-full bg-brass px-3 py-1.5 !text-[0.6rem] text-white">Pré-lançamento</span>
              <span>
                {e.bairro} · {e.city} · {e.state}
              </span>
            </p>
            <AnimatedSunMark className="mt-6 size-12 text-white md:size-20" />
            <h1 className="rise mt-4" style={{ "--d": "0.2s" } as React.CSSProperties}>
              <span className="eyebrow block text-white/70">Residencial</span>
              <span className="h-display -ml-1 block text-[clamp(5.5rem,22vw,17rem)] leading-[0.82] tracking-[-0.04em]">
                {e.name}
              </span>
            </h1>
            <p
              className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl"
              style={{ "--d": "0.4s" } as React.CSSProperties}
            >
              {e.tagline}
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--d": "0.55s" } as React.CSSProperties}>
              <a href="#contato" className="btn btn-brass">
                Quero receber informações <ArrowRight />
              </a>
              <a href="#modelo" className="btn btn-ghost-light">
                Conheça o modelo <ArrowDown />
              </a>
            </div>
          </div>
        </HeroCarousel>

        {/* ------------------------- MANIFESTO + NÚMEROS -------------------- */}
        <section className="py-24 md:py-32" aria-labelledby="manifesto">
          <div className="container-x">
            <Reveal className="max-w-5xl">
              <h2 id="manifesto" className="h-display text-[clamp(2.4rem,5.6vw,5rem)]">
                Construir a preço de custo é construir{" "}
                <span className="italic text-brass-deep">com transparência</span>.
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl">
                O {e.full} nasce a poucos passos da praia, cercado de verde, e de um
                modelo que aproxima quem compra de quem constrói: você acompanha o
                orçamento, a obra e as contas do começo ao fim.
              </p>
            </Reveal>

            <dl className="mt-20 grid grid-cols-2 border-y hairline lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 0.08}
                  className={`px-1 py-9 md:px-8 ${i % 2 === 1 ? "border-l hairline" : ""} ${
                    i > 1 ? "border-t hairline lg:border-t-0" : ""
                  } ${i === 2 ? "lg:border-l hairline" : ""} lg:first:pl-0`}
                >
                  <dd className="h-display whitespace-nowrap text-[clamp(2.4rem,4.4vw,4rem)] leading-none">
                    {s.to !== undefined ? (
                      <Counter to={s.to} suffix={s.suffix} />
                    ) : (
                      <>
                        {s.text}
                        <span className="text-[0.55em]">{s.suffix}</span>
                      </>
                    )}
                  </dd>
                  <dt className="eyebrow mt-3 !text-[0.64rem] text-ink/55">{s.label}</dt>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------- MODELO ----------------------------- */}
        <section id="modelo" className="bg-sand py-24 md:py-32" aria-labelledby="modelo-h">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-brass-deep">Modelo de obra a preço de custo</p>
              <SplitHeading id="modelo-h" className="h-display mt-5 text-4xl md:text-6xl">Mais clareza sobre o que você paga e como a obra evolui.</SplitHeading>
            </Reveal>

            <div className="mt-16 grid gap-px bg-ink/15 lg:grid-cols-3">
              {pillars.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.08} className="bg-sand">
                  <div className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-white/70 md:p-10">
                    <span className="h-display text-5xl text-brass transition-transform duration-500 group-hover:translate-x-2">{p.n}</span>
                    <h3 className="h-display mt-6 text-3xl">{p.title}</h3>
                    <p className="mt-2 font-semibold">{p.lead}</p>
                    <ul className="mt-6 space-y-4 text-ink/70">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3 leading-relaxed">
                          <Check className="mt-1 size-4 shrink-0 text-brass-deep" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-24">
              <Reveal>
                <h3 className="h-display text-3xl md:text-4xl">Como funciona, em 4 passos</h3>
              </Reveal>
              <ol className="mt-10 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((s, i) => (
                  <li key={s.n} className="bg-sand">
                    <Reveal delay={i * 0.07} className="group flex h-full flex-col gap-4 p-7 transition-colors duration-500 hover:bg-white/70 md:p-8">
                      <span className="h-display text-4xl text-brass transition-transform duration-500 group-hover:translate-x-2">{s.n}</span>
                      <h4 className="h-display text-xl">{s.title}</h4>
                      <p className="text-sm leading-relaxed text-ink/65">{s.text}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink/50">
                No modelo a preço de custo o valor final depende dos custos reais da obra e
                não há garantia de valorização ou rentabilidade. Leia o regulamento e o
                memorial do empreendimento antes de decidir.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------- PROJETO ---------------------------- */}
        <section id="projeto" className="pt-24 md:pt-32" aria-labelledby="projeto-h">
          <div className="container-x mb-6 max-w-3xl md:mb-10">
            <Reveal>
              <p className="eyebrow text-brass-deep">
                {e.bairro} · {e.city} · {e.state}
              </p>
              <SplitHeading id="projeto-h" className="h-display mt-5 text-4xl md:text-6xl">Um projeto aberto para o bairro e para a paisagem.</SplitHeading>
            </Reveal>
          </div>

          <ScrollChapters chapters={chapterData} />

          {/* diferenciais */}
          <div id="diferenciais" className="on-dark relative mt-24 overflow-hidden bg-ink py-24 text-white md:mt-32 md:py-28">
            <AnimatedCompass className="-right-24 top-6 w-[34rem] max-w-none opacity-70 md:-right-16 md:w-[40rem]" />
            <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
              <Reveal>
                <p className="eyebrow text-brass">Diferenciais</p>
                <h2 className="h-display mt-5 text-4xl md:text-5xl">
                  Áreas comuns entregues mobiliadas e com paisagismo.
                </h2>
              </Reveal>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {amenities.map((a, i) => (
                  <li key={a} className="border-b hairline">
                    <Reveal delay={(i % 4) * 0.06} className="flex items-baseline gap-4 py-5">
                      <span className="h-display text-sm text-brass">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-lg">{a}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------- PLANTAS ---------------------------- */}
        <section id="plantas" className="bg-sand py-24 md:py-32" aria-labelledby="plantas-h">
          <div className="container-x">
            <Reveal className="mb-12 max-w-3xl">
              <p className="eyebrow text-brass-deep">Plantas</p>
              <SplitHeading id="plantas-h" className="h-display mt-5 text-4xl md:text-6xl">De 1 dormitório à cobertura.</SplitHeading>
            </Reveal>
            <Typologies items={typologies} />
          </div>
        </section>

        {/* --------------------------- LOCALIZAÇÃO -------------------------- */}
        <section id="localizacao" className="py-24 md:py-32" aria-labelledby="loc-h">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow text-brass-deep">Localização</p>
                <SplitHeading id="loc-h" className="h-display mt-5 text-4xl md:text-6xl">O bairro ao seu alcance.</SplitHeading>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
                  Mercado, padaria, café e praia a poucos minutos. O dia a dia se resolve
                  a pé ou de bicicleta.
                </p>
              </Reveal>
              <dl className="mt-10 border-t hairline">
                {distances.map((d, i) => (
                  <Reveal key={d.label} delay={i * 0.05}>
                    <div className="flex items-baseline justify-between gap-6 border-b hairline py-4">
                      <dt className="text-ink/70">{d.label}</dt>
                      <dd className="font-semibold">{d.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <p className="mt-4 text-xs text-ink/45">Tempos aproximados, sujeitos a variação.</p>
            </div>
            <Reveal delay={0.1}>
              <LocationMap name={e.full} />
            </Reveal>
          </div>
        </section>

        {/* --------------------------- GOVERNANÇA --------------------------- */}
        <section id="governanca" className="on-dark relative overflow-hidden bg-ink py-24 text-white md:py-32" aria-labelledby="gov-h">
          <AnimatedCompass className="-right-24 top-6 w-[34rem] max-w-none opacity-70 md:-right-16 md:w-[40rem]" />
          <div className="container-x relative z-10">
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-brass">Governança do projeto</p>
              <SplitHeading id="gov-h" className="h-display mt-5 text-4xl md:text-6xl">Quem estrutura, constrói e fiscaliza.</SplitHeading>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                Cada etapa tem um responsável e uma camada independente de verificação.
              </p>
            </Reveal>
            <ul className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((p, i) => (
                <li key={p.role} className="bg-ink">
                  <Reveal delay={i * 0.07} className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-white/[0.06] md:p-8">
                    <span className="mb-8 flex size-14 items-center justify-center rounded-full border border-white/25 h-display text-xl text-brass transition-all duration-500 group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                      {p.name.charAt(0)}
                    </span>
                    <p className="eyebrow !text-[0.62rem] text-white/50">{p.role}</p>
                    <h3 className="h-display mt-2 text-2xl">{p.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/65">{p.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------- FAQ ----------------------------- */}
        <section id="faq" className="bg-sand py-24 md:py-32" aria-labelledby="faq-h">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow text-brass-deep">Dúvidas frequentes</p>
              <SplitHeading id="faq-h" className="h-display mt-5 text-4xl md:text-5xl">O que você precisa saber antes de decidir.</SplitHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <Faq items={faq} />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------ CONTATO --------------------------- */}
        <section id="contato" className="on-dark relative overflow-hidden bg-ink py-24 text-white md:py-32" aria-labelledby="contato-h">
          <AnimatedCompass className="-left-44 -bottom-40 w-[30rem] max-w-none opacity-50 md:w-[34rem]" />
          <div className="container-x relative z-10 grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow text-brass">Faça parte do {e.name}</p>
              <SplitHeading id="contato-h" className="h-display mt-5 text-4xl md:text-6xl">Receber plantas, valores e condições.</SplitHeading>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                Preencha o formulário e um consultor apresenta os detalhes do
                empreendimento.
              </p>
              <a
                href={whatsappLink(WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-lg font-semibold underline-offset-4 hover:underline"
              >
                {brand.contact.whatsappDisplay} <ArrowUpRight />
              </a>
              <p className="mt-10 text-sm text-white/50">Comercializado por</p>
              <Link
                href={siteUrls.imobiliaria}
                className="mt-2 inline-flex items-center gap-2 hover:opacity-80"
              >
                <ImobiliariaMark />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="border-t-2 border-brass bg-white/[0.05] p-7 ring-1 ring-white/10 md:p-12">
              <LeadForm source="empreendimento" project={e.full} submitLabel="Quero ser contatado" />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter
        mark={<EmpreendimentoMark />}
        blurb={`${e.full} · ${e.bairro} · ${e.city} · ${e.state}`}
        columns={[
          { title: "Projeto", links: NAV.map((n) => ({ label: n.label, href: n.href })) },
          {
            title: "Imobiliária",
            links: [
              { label: brand.imobiliaria.name, href: siteUrls.imobiliaria },
              { label: "Outros empreendimentos", href: `${siteUrls.imobiliaria}#empreendimentos` },
            ],
          },
        ]}
        legal={[
          `${e.full} · Comercialização: ${brand.imobiliaria.name} · ${brand.imobiliaria.creci}`,
          "Imagens meramente ilustrativas, sujeitas a alterações. Informações sujeitas à confirmação no memorial descritivo e no regulamento do empreendimento. Este material não constitui oferta pública.",
        ]}
      />

      <WhatsAppFloat message={WA_MSG} />
    </>
  );
}
