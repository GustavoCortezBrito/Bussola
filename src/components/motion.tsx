"use client";

import { Fragment, useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { BAR_W, VIEW, bars, sunPath } from "@/content/logo-geometry";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Barra fina no topo que acompanha o progresso de rolagem da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brass via-dawn to-brass"
    />
  );
}

/** Título que entra palavra por palavra (máscara com subida), uma vez. */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className = "",
  id,
  delay = 0,
}: {
  children: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  delay?: number;
}) {
  const words = children.split(" ");
  return (
    <Tag id={id} className={className} aria-label={children}>
      {words.map((w, i) => (
        <Fragment key={i}>
        {/* o gatilho fica no wrapper (que não é recortado); o IntersectionObserver
        // ignora elementos totalmente escondidos por overflow, então não pode ficar na palavra */}
        <m.span
          aria-hidden
          className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <m.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              visible: { y: 0, transition: { duration: 0.85, delay: delay + i * 0.05, ease: EASE } },
            }}
          >
            {w}
          </m.span>
        </m.span>
        {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}


/** Mídia que se move mais devagar que a página (parallax). O pai precisa ser `relative` com tamanho. */
export function Parallax({
  children,
  amount = 36,
  className = "",
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <m.div style={{ y, scale: 1.14 }} className="absolute inset-0">
        {children}
      </m.div>
    </div>
  );
}

/**
 * Bússola grande e animada: o anel gira devagar conforme a página rola, a agulha
 * balança sozinha e também acompanha o scroll (com inércia). Decorativa.
 */
export function AnimatedCompass({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ringRot = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 50]), { stiffness: 50, damping: 18 });
  const needleRot = useSpring(useTransform(scrollYProgress, [0, 1], [-70, 110]), { stiffness: 60, damping: 10, mass: 0.8 });

  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = ((i * 5 - 90) * Math.PI) / 180;
    const len = i % 18 === 0 ? 14 : i % 6 === 0 ? 9 : 5;
    const r2 = 92;
    return {
      x1: Math.round((100 + Math.cos(a) * (r2 - len)) * 10) / 10,
      y1: Math.round((100 + Math.sin(a) * (r2 - len)) * 10) / 10,
      x2: Math.round((100 + Math.cos(a) * r2) * 10) / 10,
      y2: Math.round((100 + Math.sin(a) * r2) * 10) / 10,
      big: i % 18 === 0,
    };
  });
  const letters = [
    { t: "N", x: 100, y: 62 },
    { t: "L", x: 138, y: 104 },
    { t: "S", x: 100, y: 146 },
    { t: "O", x: 62, y: 104 },
  ];

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute text-brass ${className}`}>
    <svg viewBox="0 0 200 200" className="h-auto w-full" fill="none">
      <m.circle
        cx={100}
        cy={100}
        r={97}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.5}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: EASE }}
      />
      <m.g style={{ rotate: ringRot, originX: "100px", originY: "100px" }} opacity={0.55}>
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="currentColor"
            strokeWidth={t.big ? 1.6 : 0.8}
            strokeLinecap="round"
          />
        ))}
      </m.g>
      <circle cx={100} cy={100} r={70} stroke="currentColor" strokeWidth={0.8} opacity={0.3} />
      <circle cx={100} cy={100} r={44} stroke="currentColor" strokeWidth={0.8} opacity={0.25} strokeDasharray="2 5" />
      {letters.map((l) => (
        <text
          key={l.t}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={9}
          letterSpacing={1}
          fill="currentColor"
          opacity={0.6}
          fontFamily="var(--font-manrope), sans-serif"
          fontWeight={600}
        >
          {l.t}
        </text>
      ))}
      <m.g style={{ rotate: needleRot, originX: "100px", originY: "100px" }} opacity={0.9}>
        <m.g
          style={{ originX: "100px", originY: "100px" }}
          animate={{ rotate: [0, 5, -4, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M100 38 L108 100 L92 100 Z" fill="currentColor" />
          <path d="M100 162 L108 100 L92 100 Z" fill="currentColor" opacity={0.3} />
        </m.g>
      </m.g>
      <circle cx={100} cy={100} r={6} fill="var(--ink)" stroke="currentColor" strokeWidth={1.5} />
      <circle cx={100} cy={100} r={2} fill="currentColor" />
    </svg>
    </div>
  );
}

/** Sobe levemente ao passar o mouse, com mola. Para cards. */
export function HoverLift({
  children,
  className = "",
  y = -8,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <m.div
      className={className}
      whileHover={{ y }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </m.div>
  );
}

/** Régua de ripas cuja altura desenha o arco do sol. Usada como divisor. */
export function SlatRule({ count = 28, className = "" }: { count?: number; className?: string }) {
  const mid = (count - 1) / 2;
  return (
    <div aria-hidden className={`flex h-14 items-end justify-between gap-[3px] ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const t = (i - mid) / (count / 2);
        const h = Math.round(Math.sqrt(Math.max(0, 1 - t * t)) * 100);
        return (
          <m.span
            key={i}
            className="w-full max-w-[6px] origin-bottom rounded-[2px] bg-current"
            style={{ height: `${Math.max(h, 8)}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.025, ease: EASE }}
          />
        );
      })}
    </div>
  );
}

/** A marca se "monta": o sol sobe e as ripas descem em cascata. */
export function AnimatedSunMark({ className = "size-16" }: { className?: string }) {
  const bs = bars();
  return (
    <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className={className} aria-hidden>
      <m.path
        d={sunPath}
        fill="var(--brass)"
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      />
      {bs.map((b, i) => (
        <m.rect
          key={b.x}
          x={b.x}
          y={b.y}
          width={BAR_W}
          height={b.h}
          rx={1.2}
          fill="currentColor"
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, delay: 0.8 + i * 0.08, ease: EASE }}
        />
      ))}
      <title>Aurora</title>
    </svg>
  );
}
