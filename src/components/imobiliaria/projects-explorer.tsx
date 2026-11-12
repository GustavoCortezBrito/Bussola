"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { MODALIDADES } from "@/content/projects";
import { ProjectCard, type ProjectWithMedia } from "./project-card";

/**
 * Lista de empreendimentos filtrável. O estado vive na URL (?bairro=&modalidade=&dorms=),
 * então a busca da capa e os filtros daqui são a mesma coisa e o link é compartilhável.
 * Precisa estar dentro de <Suspense> (usa useSearchParams).
 */
export function ProjectsExplorer({
  projects,
  bairros,
}: {
  projects: ProjectWithMedia[];
  bairros: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const bairro = sp.get("bairro") ?? "";
  const modalidade = sp.get("modalidade") ?? "";
  const dorms = sp.get("dorms") ?? "";

  const list = useMemo(
    () =>
      projects.filter((p) => {
        if (bairro && p.bairro !== bairro) return false;
        if (modalidade && p.modalidade !== modalidade) return false;
        if (dorms) {
          const d = Number(dorms);
          if (d >= 4 ? p.dormMax < 4 : d < p.dormMin || d > p.dormMax) return false;
        }
        return true;
      }),
    [projects, bairro, modalidade, dorms],
  );

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const hasFilter = Boolean(bairro || modalidade || dorms);
  const selectCls =
    "cursor-pointer rounded-full border border-ink/20 bg-transparent px-4 py-2.5 text-sm font-medium outline-none transition-colors hover:border-ink focus:border-brass";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select aria-label="Bairro" className={selectCls} value={bairro} onChange={(e) => setParam("bairro", e.target.value)}>
          <option value="">Todos os bairros</option>
          {bairros.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select aria-label="Modalidade" className={selectCls} value={modalidade} onChange={(e) => setParam("modalidade", e.target.value)}>
          <option value="">Qualquer modalidade</option>
          {Object.entries(MODALIDADES).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select aria-label="Dormitórios" className={selectCls} value={dorms} onChange={(e) => setParam("dorms", e.target.value)}>
          <option value="">Qualquer nº de dormitórios</option>
          <option value="1">1 dormitório</option>
          <option value="2">2 dormitórios</option>
          <option value="3">3 dormitórios</option>
          <option value="4">4 ou mais</option>
        </select>
        {hasFilter && (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Limpar filtros
          </button>
        )}
        <p className="ml-auto text-sm text-ink/60" aria-live="polite">
          {list.length} {list.length === 1 ? "empreendimento" : "empreendimentos"}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={`${bairro}|${modalidade}|${dorms}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {list.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <ProjectCard key={p.slug} p={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-ink/25 px-6 py-16 text-center">
              <p className="h-display text-2xl">Nenhum empreendimento com esses filtros.</p>
              <p className="mt-2 text-ink/60">
                Fale com a gente: novos lançamentos chegam com frequência.
              </p>
            </div>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
