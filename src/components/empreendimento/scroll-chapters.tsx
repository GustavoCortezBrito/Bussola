"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView } from "framer-motion";
import type { ResolvedMedia } from "@/lib/media";
import { Media } from "../media";

export type Chapter = {
  id: string;
  kicker: string;
  title: string;
  text: string;
  media: ResolvedMedia;
};

function ChapterText({
  chapter,
  index,
  onActive,
}: {
  chapter: Chapter;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // quando o texto cruza o meio da tela, troca a imagem fixa ao lado
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article className="flex flex-col justify-center py-12 lg:min-h-[85svh] lg:py-0">
      {/* imagem (somente mobile) */}
      <div className="relative mb-8 aspect-[4/5] overflow-hidden bg-sand lg:hidden">
        <Media item={chapter.media} sizes="100vw" />
      </div>
      <div ref={ref}>
        <p className="eyebrow text-brass-deep">
          {String(index + 1).padStart(2, "0")} · {chapter.kicker}
        </p>
        <h3 className="h-display mt-4 text-4xl md:text-5xl">{chapter.title}</h3>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{chapter.text}</p>
      </div>
    </article>
  );
}

/** Imagem fixa à esquerda que troca conforme o texto da direita rola (desktop). */
export function ScrollChapters({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const current = chapters[active];

  return (
    <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <div className="relative hidden lg:block">
        <div className="sticky top-24 h-[calc(100svh-7rem)] overflow-hidden bg-sand">
          <AnimatePresence initial={false}>
            <m.div
              key={current.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.07 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Media item={current.media} sizes="45vw" />
            </m.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/60 to-transparent p-6 text-white">
            <span className="eyebrow">{current.media.label}</span>
            <span className="eyebrow tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div>
        {chapters.map((c, i) => (
          <ChapterText key={c.id} chapter={c} index={i} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}
