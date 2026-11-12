"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Framer Motion em modo "lazy": só o conjunto domAnimation (~15kb) é carregado
 * e todos os componentes usam `m.*` em vez de `motion.*`. Isso mantém a página
 * leve, como o cliente pediu. `reducedMotion="user"` respeita a preferência de
 * acessibilidade do sistema operacional.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
