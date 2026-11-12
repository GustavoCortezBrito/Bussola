/**
 * Geometria única do logotipo "sol sobre o brise".
 * Lida pelos componentes React (src/components/logo.tsx) e pelo script
 * scripts/brand.mjs (que gera os SVGs em public/brand e o favicon).
 * Sem imports com alias `@/` para o Node conseguir carregar.
 */

export const VIEW = 64;
export const CX = 32;
export const CY = 34; // linha do horizonte
export const R = 20; // raio do sol
export const GAP = 3.4; // vão entre o sol e as ripas
export const BAR_W = 3.4;
export const PITCH = 5.6;
export const BARS = 7;

const r1 = (v: number) => Math.round(v * 10) / 10;

/** Meio-sol (parte de cima). */
export const sunPath = `M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY} Z`;

/** Ripas verticais: o reflexo do sol, recortado pelo mesmo círculo. */
export function bars() {
  return Array.from({ length: BARS }, (_, i) => {
    const x = CX - ((BARS - 1) / 2) * PITCH - BAR_W / 2 + i * PITCH;
    const cx = x + BAR_W / 2;
    const edge = Math.abs(cx - CX) + BAR_W / 2;
    const bottom = CY + Math.sqrt(Math.max(0, R * R - edge * edge));
    const y = CY + GAP;
    return { x: r1(x), y: r1(y), w: BAR_W, h: r1(bottom - y) };
  });
}

/* ------------------------------ Bússola ------------------------------ */
export const COMPASS = {
  ring: 29,
  tickOuter: 25.6,
  tickMajor: 21.4,
  tickMinor: 23.4,
  needleRot: 38, // agulha apontando para o nordeste
};

/** 24 marcas de graduação (a cada 15°), maiores nos pontos cardeais. */
export function compassTicks() {
  return Array.from({ length: 24 }, (_, i) => {
    const a = ((i * 15 - 90) * Math.PI) / 180;
    const major = i % 6 === 0;
    const inner = major ? COMPASS.tickMajor : COMPASS.tickMinor;
    return {
      x1: r1(CX + Math.cos(a) * inner),
      y1: r1(CX + Math.sin(a) * inner),
      x2: r1(CX + Math.cos(a) * COMPASS.tickOuter),
      y2: r1(CX + Math.sin(a) * COMPASS.tickOuter),
      major,
    };
  });
}

/** Agulha em losango: metade norte (cor de destaque) e metade sul. */
export const needleNorth = "M32 13 L35.2 32 L28.8 32 Z";
export const needleSouth = "M32 51 L35.2 32 L28.8 32 Z";

/** Paleta da marca (fonte da verdade dos tokens de cor). */
export const palette = {
  ink: "#0e1b19",
  inkSoft: "#1b2e2b",
  sea: "#2c5b58",
  brass: "#b3865a",
  brassDeep: "#8a6139",
  dawn: "#e9a58a",
  sand: "#efe8dc",
  sandDeep: "#e0d4c0",
  paper: "#faf7f2",
  mist: "#c9d6d2",
} as const;
