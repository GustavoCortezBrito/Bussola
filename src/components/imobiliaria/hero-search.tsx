"use client";

import { useRouter } from "next/navigation";
import { MODALIDADES } from "@/content/projects";
import { ArrowRight } from "../icons";

/** Barra de busca da capa (estilo portais de imóveis). Leva aos filtros da vitrine via URL. */
export function HeroSearch({ bairros }: { bairros: string[] }) {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const qs = new URLSearchParams();
    for (const key of ["bairro", "modalidade", "dorms"]) {
      const v = String(f.get(key) ?? "");
      if (v) qs.set(key, v);
    }
    const q = qs.toString();
    router.push(`/${q ? `?${q}` : ""}#empreendimentos`);
  }

  const cell =
    "flex flex-col gap-1 px-5 py-3 text-left md:border-r md:border-ink/10 md:last:border-r-0";
  const label = "eyebrow !text-[0.6rem] text-ink/50";
  const select =
    "w-full cursor-pointer appearance-none bg-transparent text-[0.95rem] font-semibold outline-none";

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Buscar empreendimentos"
      className="grid w-full max-w-4xl grid-cols-2 gap-x-1 gap-y-1 rounded-3xl bg-white/95 p-2 text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.55)] backdrop-blur md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:gap-2 md:rounded-full md:pl-3"
    >
      <label className={`${cell} col-span-2 border-b border-ink/10 md:col-span-1 md:border-b-0`}>
        <span className={label}>Bairro</span>
        <select name="bairro" className={select} defaultValue="">
          <option value="">Todos</option>
          {bairros.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </label>
      <label className={cell}>
        <span className={label}>Modalidade</span>
        <select name="modalidade" className={select} defaultValue="">
          <option value="">Qualquer</option>
          {Object.entries(MODALIDADES).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </label>
      <label className={cell}>
        <span className={label}>Dormitórios</span>
        <select name="dorms" className={select} defaultValue="">
          <option value="">Qualquer</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4 ou mais</option>
        </select>
      </label>
      <button type="submit" className="btn btn-ink col-span-2 md:col-span-1 md:!px-8 md:!py-4">
        Buscar <ArrowRight />
      </button>
    </form>
  );
}
