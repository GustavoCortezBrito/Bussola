import { brand } from "@/content/brand";
import { CompassMark, SunMark } from "./logo";

/** Logotipo provisório da imobiliária (herda a cor do texto). */
export function ImobiliariaMark() {
  return (
    <span className="flex items-center gap-2.5" aria-label={brand.imobiliaria.name}>
      <CompassMark className="size-9" />
      <span className="flex flex-col leading-none">
        <span className="h-display text-[1.45rem]">{brand.imobiliaria.short}</span>
        <span className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.42em] opacity-70">
          {brand.imobiliaria.descriptor}
        </span>
      </span>
    </span>
  );
}

/** Logotipo provisório do empreendimento. */
export function EmpreendimentoMark() {
  return (
    <span className="flex items-center gap-2.5" aria-label={brand.empreendimento.full}>
      <SunMark className="size-9" />
      <span className="flex flex-col leading-none">
        <span className="h-display text-[1.7rem]">{brand.empreendimento.name}</span>
        <span className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.42em] opacity-70">
          {brand.empreendimento.bairro}
        </span>
      </span>
    </span>
  );
}
