import Link from "next/link";
import { brl, type Project } from "@/content/projects";
import type { ResolvedMedia } from "@/lib/media";
import { Media } from "../media";
import { HoverLift } from "../motion";
import { Reveal } from "../reveal";
import { ArrowUpRight } from "../icons";

export type ProjectWithMedia = Project & { media: ResolvedMedia };

const STATUS_STYLE: Record<Project["status"], string> = {
  "Pré-lançamento": "bg-brass text-white",
  "Em obras": "bg-white text-ink",
  "Últimas unidades": "bg-ink text-white",
  Entregue: "bg-white/90 text-ink/70",
};

export function ProjectCard({ p, index = 0 }: { p: ProjectWithMedia; index?: number }) {
  const dorm =
    p.dormMin === p.dormMax ? `${p.dormMin} dorm.` : `${p.dormMin}–${p.dormMax} dorm.`;
  const feat = Boolean(p.featured);

  return (
    <Reveal delay={(index % 3) * 0.1} className={feat ? "lg:col-span-2" : ""}>
    <HoverLift className="h-full">
    <Link
      href={p.href}
      className={`group flex h-full flex-col overflow-hidden bg-white ring-1 ring-ink/10 transition-[box-shadow,ring-color] duration-500 hover:shadow-[0_40px_70px_-30px_rgb(14_27_25/0.45)] hover:ring-brass/60 ${
        feat ? "lg:flex-row" : ""
      }`}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-sand after:pointer-events-none after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:transition-transform after:duration-[1100ms] group-hover:after:translate-x-full ${
          feat ? "lg:aspect-auto lg:min-h-[26rem] lg:w-[58%]" : ""
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]">
          <Media
            item={p.media}
            sizes={feat ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 28vw, (min-width:768px) 45vw, 100vw"}
          />
        </div>
        <span
          className={`eyebrow absolute left-4 top-4 rounded-full px-3 py-1.5 !text-[0.62rem] ${STATUS_STYLE[p.status]}`}
        >
          {p.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="eyebrow text-brass-deep">{p.bairro} · Florianópolis</p>
        <h3 className="h-display mt-3 text-[1.9rem] md:text-4xl">{p.name}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink/70">{p.teaser}</p>

        <dl className="mt-auto grid grid-cols-3 gap-4 border-t hairline pt-6 text-sm">
          <div>
            <dt className="eyebrow !text-[0.6rem] text-ink/50">Tipologia</dt>
            <dd className="mt-1 font-semibold">{dorm}</dd>
          </div>
          <div>
            <dt className="eyebrow !text-[0.6rem] text-ink/50">Área</dt>
            <dd className="mt-1 font-semibold">{p.area}</dd>
          </div>
          <div>
            <dt className="eyebrow !text-[0.6rem] text-ink/50">{p.from ? "A partir de" : "Situação"}</dt>
            <dd className="mt-1 font-semibold">{p.from ? brl(p.from) : "Consulte"}</dd>
          </div>
        </dl>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          {feat ? "Conhecer o empreendimento" : p.status === "Entregue" ? "Ver o case" : "Ver detalhes"}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
    </HoverLift>
    </Reveal>
  );
}

export function ProjectGrid({ projects }: { projects: ProjectWithMedia[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} p={p} index={i} />
      ))}
    </div>
  );
}
