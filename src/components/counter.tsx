"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const fmt = new Intl.NumberFormat("pt-BR");

/**
 * Contador animado. O HTML do servidor já traz o valor final (bom para SEO e
 * sem JS); ao hidratar, zera e anima quando entra na tela. A animação escreve
 * direto no DOM (sem re-render do React a cada frame).
 */
export function Counter({
  to,
  duration = 1800,
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const reduce = useRef(false);
  const inView = useInView(wrap, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce.current && num.current) num.current.textContent = fmt.format(0);
  }, []);

  useEffect(() => {
    const el = num.current;
    if (!inView || !el || reduce.current) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = fmt.format(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={wrap} className="tabular-nums">
      {prefix}
      <span ref={num}>{fmt.format(to)}</span>
      {suffix && <span className="text-[0.55em]">{suffix}</span>}
    </span>
  );
}
