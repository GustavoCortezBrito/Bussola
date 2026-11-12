"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import type { ResolvedMedia } from "@/lib/media";
import { Media } from "./media";

/**
 * Capa em tela cheia: imagens do empreendimento que se alternam com crossfade
 * + leve zoom (Ken Burns) e indicadores de progresso clicáveis.
 * Se `video` for informado, ele vira o fundo (autoplay/mudo/loop) no lugar
 * das imagens.
 */
export function HeroCarousel({
  slides,
  video,
  interval = 6500,
  className = "",
  children,
}: {
  slides: ResolvedMedia[];
  video?: string | null;
  interval?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const multiple = slides.length > 1 && !video;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!multiple || hidden) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    );
    return () => window.clearTimeout(id);
  }, [index, hidden, multiple, interval, slides.length]);

  const current = slides[index];

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden bg-ink text-white ${className}`}
    >
      {/* fundo */}
      <m.div className="absolute inset-0 -z-10" style={{ y: bgY, scale: 1.12 }}>
        {video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            poster={slides[0]?.src ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <AnimatePresence initial={false}>
            <m.div
              key={current.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  opacity: { duration: 1.3, ease: "easeOut" },
                  scale: { duration: interval / 1000 + 2, ease: "linear" },
                },
              }}
              exit={{ opacity: 0, transition: { duration: 1.3, ease: "easeOut" } }}
            >
              <Media item={current} priority={index === 0} sizes="100vw" />
            </m.div>
          </AnimatePresence>
        )}
        {/* legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
      </m.div>

      <m.div style={{ y: contentY, opacity: contentOpacity }}>{children}</m.div>

      {/* indicadores */}
      {multiple && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-x pb-6 pr-20 md:pb-9 md:pr-10">
            <div className="flex items-end justify-end gap-6">
              <div className="w-full max-w-sm">
                <div className="mb-3 flex items-center justify-between text-xs text-white/80">
                  <AnimatePresence mode="wait" initial={false}>
                    <m.span
                      key={current.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="eyebrow"
                    >
                      {current.label}
                    </m.span>
                  </AnimatePresence>
                  <span className="hidden tabular-nums text-white/60 sm:inline">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex gap-2" role="tablist" aria-label="Imagens do empreendimento">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Ver imagem: ${s.label}`}
                      onClick={() => setIndex(i)}
                      className="group relative h-6 flex-1 cursor-pointer"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/30 transition-[height] group-hover:h-0.5" />
                      {i === index && (
                        <m.span
                          key={`${index}-${hidden}`}
                          className="absolute inset-x-0 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-white"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: interval / 1000, ease: "linear" }}
                        />
                      )}
                      {i < index && (
                        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/70" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
