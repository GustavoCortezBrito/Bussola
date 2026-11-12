import { COMPASS, VIEW, bars, compassTicks, needleNorth, needleSouth, sunPath } from "@/content/logo-geometry";

type MarkProps = {
  className?: string;
  /** cor do sol (padrão: latão da marca) */
  sun?: string;
  /** cor das ripas (padrão: herda a cor do texto) */
  slats?: string;
  title?: string;
};

/** Marca principal do Residencial Aurora: meio-sol sobre ripas de brise. */
export function SunMark({
  className = "size-8",
  sun = "var(--brass)",
  slats = "currentColor",
  title,
}: MarkProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={sunPath} fill={sun} />
      {bars().map((b) => (
        <rect key={b.x} x={b.x} y={b.y} width={b.w} height={b.h} rx={1.2} fill={slats} />
      ))}
    </svg>
  );
}

/** Marca da imobiliária: bússola (anel, graduação e agulha). */
export function CompassMark({
  className = "size-8",
  sun = "var(--brass)",
  slats = "currentColor",
  title,
}: MarkProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx={32} cy={32} r={COMPASS.ring} fill="none" stroke={slats} strokeWidth={2} />
      {compassTicks().map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={slats}
          strokeWidth={t.major ? 1.7 : 0.9}
          strokeLinecap="round"
        />
      ))}
      <g transform={`rotate(${COMPASS.needleRot} 32 32)`}>
        <path d={needleNorth} fill={sun} />
        <path d={needleSouth} fill={slats} />
      </g>
      <circle cx={32} cy={32} r={2.6} fill={slats} />
      <circle cx={32} cy={32} r={1} fill={sun} />
    </svg>
  );
}
