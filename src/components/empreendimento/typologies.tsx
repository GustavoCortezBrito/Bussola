"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "../icons";

type Typology = {
  key: string;
  name: string;
  area: string;
  suites: string;
  text: string;
};

type Room = { x: number; y: number; w: number; h: number; label: string };

/** Plantas esquemáticas ilustrativas — substituir pelas plantas reais do projeto. */
const PLANS: Record<string, Room[]> = {
  "1": [
    { x: 20, y: 20, w: 360, h: 50, label: "Varanda" },
    { x: 20, y: 70, w: 220, h: 170, label: "Sala + cozinha" },
    { x: 240, y: 70, w: 140, h: 110, label: "Suíte" },
    { x: 240, y: 180, w: 140, h: 60, label: "Banho" },
  ],
  "2": [
    { x: 20, y: 20, w: 360, h: 50, label: "Varanda" },
    { x: 20, y: 70, w: 200, h: 170, label: "Sala + cozinha" },
    { x: 220, y: 70, w: 160, h: 90, label: "Suíte" },
    { x: 220, y: 160, w: 90, h: 80, label: "Dorm. 2" },
    { x: 310, y: 160, w: 70, h: 80, label: "Banho" },
  ],
  "3": [
    { x: 20, y: 20, w: 360, h: 55, label: "Varanda gourmet" },
    { x: 20, y: 75, w: 190, h: 165, label: "Sala + cozinha" },
    { x: 210, y: 75, w: 170, h: 80, label: "Suíte master" },
    { x: 210, y: 155, w: 85, h: 85, label: "Suíte 2" },
    { x: 295, y: 155, w: 85, h: 85, label: "Suíte 3" },
  ],
  "4": [
    { x: 20, y: 20, w: 360, h: 60, label: "Terraço privativo" },
    { x: 20, y: 80, w: 170, h: 160, label: "Sala + cozinha" },
    { x: 190, y: 80, w: 190, h: 70, label: "Suíte master" },
    { x: 190, y: 150, w: 63, h: 90, label: "Suíte 2" },
    { x: 253, y: 150, w: 63, h: 90, label: "Suíte 3" },
    { x: 316, y: 150, w: 64, h: 90, label: "Suíte 4" },
  ],
};

function Plan({ rooms }: { rooms: Room[] }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className="h-auto w-full"
      role="img"
      aria-label="Planta ilustrativa do apartamento"
    >
      <rect x="14" y="14" width="372" height="232" fill="#fff" stroke="#0e1b19" strokeWidth="5" />
      {rooms.map((r) => (
        <g key={r.label}>
          <rect
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={r.label.includes("Varanda") || r.label.includes("Terraço") ? "#efe8dc" : "#faf7f2"}
            stroke="#0e1b19"
            strokeWidth="1.5"
          />
          <text
            x={r.x + r.w / 2}
            y={r.y + r.h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontFamily="var(--font-manrope), sans-serif"
            fontWeight="600"
            fill="#0e1b19"
          >
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Typologies({ items }: { items: Typology[] }) {
  const [i, setI] = useState(0);
  const t = items[i];

  return (
    <div>
      <div role="tablist" aria-label="Tipologias" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
        {items.map((it, idx) => (
          <button
            key={it.key}
            role="tab"
            type="button"
            aria-selected={idx === i}
            aria-controls="tipologia-panel"
            id={`tab-${it.key}`}
            onClick={() => setI(idx)}
            className={`shrink-0 cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              idx === i
                ? "border-ink bg-ink text-paper"
                : "border-ink/20 hover:border-ink"
            }`}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div
        id="tipologia-panel"
        role="tabpanel"
        aria-labelledby={`tab-${t.key}`}
        className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={t.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="eyebrow text-brass-deep">{t.suites}</p>
            <p className="h-display mt-3 text-[clamp(3.2rem,8vw,6rem)]">{t.area}</p>
            <p className="mt-2 text-lg font-semibold">{t.name}</p>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{t.text}</p>
            <a href="#contato" className="btn btn-ink mt-8">
              Solicitar planta e valores <ArrowRight />
            </a>
          </m.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={t.key}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white p-5 ring-1 ring-ink/10 md:p-8"
          >
            <Plan rooms={PLANS[t.key]} />
            <figcaption className="mt-4 text-xs text-ink/50">
              Planta ilustrativa. Medidas, layout e mobiliário sujeitos a alteração.
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}
