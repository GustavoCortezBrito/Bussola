import type { ReactNode } from "react";
import type { Tone, View } from "@/content/media";
import { bars as markBars, sunPath as markSun } from "@/content/logo-geometry";

/**
 * Placeholder ilustrado (SVG) de um prédio com brise de madeira, usado no lugar
 * de imagens/vídeos enquanto os arquivos do Higgsfield não são colocados em
 * `public/media`. Determinístico (mesmo `seed` => mesmo desenho), sem hooks,
 * funciona em Server e Client Components e pesa ~poucos KB.
 */

type Pal = {
  sky: [string, string, string];
  sea: [string, string];
  hillFar: string;
  hillNear: string;
  wall: string;
  wallShade: string;
  slab: string;
  glass: string;
  glassLit: string;
  wood: string;
  woodDark: string;
  ground: string;
  groundLine: string;
  tree: [string, string, string];
  trunk: string;
  pool: string;
  lit: number;
  stars: boolean;
  orb: { x: number; y: number; r: number; color: string };
};

const PALETTES: Record<Tone, Pal> = {
  day: {
    sky: ["#6fb0d6", "#a9d3e6", "#e9f4f4"],
    sea: ["#4e97ad", "#7fbac6"],
    hillFar: "#8fb3a2",
    hillNear: "#5d8a70",
    wall: "#efe7da",
    wallShade: "#d9cdb9",
    slab: "#c8bba5",
    glass: "#4f6d78",
    glassLit: "#cfe6ee",
    wood: "#bf8b5e",
    woodDark: "#8f6239",
    ground: "#8b9784",
    groundLine: "#a7b1a0",
    tree: ["#2f5a3f", "#3f7350", "#265039"],
    trunk: "#5b4632",
    pool: "#5fc3d0",
    lit: 0,
    stars: false,
    orb: { x: 1190, y: 150, r: 58, color: "#fffbe8" },
  },
  dawn: {
    sky: ["#e9a58a", "#f6cfb2", "#fdeede"],
    sea: ["#9bb6bd", "#c4d3d2"],
    hillFar: "#a9a79a",
    hillNear: "#7c8f78",
    wall: "#ecdcc8",
    wallShade: "#d4c1aa",
    slab: "#bba68c",
    glass: "#6a7f89",
    glassLit: "#ffe2ae",
    wood: "#bf8456",
    woodDark: "#8f5f36",
    ground: "#8f9382",
    groundLine: "#a9ab99",
    tree: ["#40604a", "#557a5c", "#34503d"],
    trunk: "#5b4632",
    pool: "#8ccbd2",
    lit: 0.12,
    stars: false,
    orb: { x: 330, y: 500, r: 78, color: "#fff1d0" },
  },
  sunset: {
    sky: ["#27345f", "#d9774f", "#ffc88f"],
    sea: ["#44527a", "#c47a6a"],
    hillFar: "#5a5470",
    hillNear: "#2f3a4b",
    wall: "#e3bf9f",
    wallShade: "#c49b7c",
    slab: "#a8805f",
    glass: "#5a4f5f",
    glassLit: "#ffcb7c",
    wood: "#c4824f",
    woodDark: "#8a5530",
    ground: "#4c4a52",
    groundLine: "#6a6068",
    tree: ["#233a33", "#2d4a3e", "#1b2e29"],
    trunk: "#2d2420",
    pool: "#7fb4c9",
    lit: 0.55,
    stars: false,
    orb: { x: 1010, y: 520, r: 90, color: "#ffe3a8" },
  },
  night: {
    sky: ["#070f1f", "#12253f", "#27405f"],
    sea: ["#0e2237", "#1c3a55"],
    hillFar: "#122635",
    hillNear: "#0a1a22",
    wall: "#59626a",
    wallShade: "#444c53",
    slab: "#2f363b",
    glass: "#1c2a35",
    glassLit: "#ffd592",
    wood: "#7a5232",
    woodDark: "#4d3220",
    ground: "#161d22",
    groundLine: "#27323a",
    tree: ["#0d2219", "#12301f", "#0a1a13"],
    trunk: "#1b1410",
    pool: "#2d9ab5",
    lit: 0.78,
    stars: true,
    orb: { x: 1230, y: 135, r: 32, color: "#f4f1e4" },
  },
};

/* ---------------------------- utilidades ---------------------------- */
function seedRng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v: number) => Math.round(v * 10) / 10;

const VIEW_TRANSFORM: Record<View, string | undefined> = {
  wide: undefined,
  facade: undefined,
  corner: "translate(-400 -130) scale(1.38)",
  close: "translate(-1404 -557) scale(1.9)",
  garden: "translate(90 70) scale(0.9)",
  rooftop: undefined,
};

/* ----------------------------- peças ------------------------------- */
function Tree({
  x,
  y,
  r,
  pal,
}: {
  x: number;
  y: number;
  r: number;
  pal: Pal;
}) {
  return (
    <g>
      <rect
        x={n(x - r * 0.05)}
        y={n(y - r * 0.9)}
        width={n(r * 0.1)}
        height={n(r * 0.9)}
        fill={pal.trunk}
      />
      <circle cx={n(x - r * 0.38)} cy={n(y - r * 1.0)} r={n(r * 0.55)} fill={pal.tree[2]} />
      <circle cx={n(x + r * 0.4)} cy={n(y - r * 1.05)} r={n(r * 0.52)} fill={pal.tree[0]} />
      <circle cx={n(x)} cy={n(y - r * 1.4)} r={n(r * 0.62)} fill={pal.tree[1]} />
      <circle cx={n(x - r * 0.1)} cy={n(y - r * 1.5)} r={n(r * 0.3)} fill={pal.tree[1]} opacity={0.55} />
    </g>
  );
}

const FRONDS: [number, number][] = [
  [-1.0, 0.35],
  [-0.78, 0.05],
  [-0.42, -0.3],
  [0, -0.45],
  [0.42, -0.3],
  [0.78, 0.05],
  [1.0, 0.35],
];

function Palm({
  x,
  y,
  h,
  pal,
}: {
  x: number;
  y: number;
  h: number;
  pal: Pal;
}) {
  const tx = x + h * 0.06;
  const ty = y - h;
  const len = h * 0.5;
  return (
    <g>
      <path
        d={`M${n(x)} ${n(y)} Q${n(x + h * 0.14)} ${n(y - h * 0.5)} ${n(tx)} ${n(ty)}`}
        stroke={pal.trunk}
        strokeWidth={n(h * 0.035)}
        fill="none"
        strokeLinecap="round"
      />
      {FRONDS.map(([dx, dy], i) => (
        <path
          key={i}
          d={`M${n(tx)} ${n(ty)} Q${n(tx + dx * len * 0.55)} ${n(ty - len * 0.55)} ${n(tx + dx * len)} ${n(ty + dy * len)}`}
          stroke={pal.tree[i % 2 === 0 ? 1 : 0]}
          strokeWidth={n(h * 0.028)}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </g>
  );
}

function Building({
  x,
  baseY,
  cols,
  floors,
  cw,
  fh,
  pal,
  rnd,
  uid,
  detail = true,
}: {
  x: number;
  baseY: number;
  cols: number;
  floors: number;
  cw: number;
  fh: number;
  pal: Pal;
  rnd: () => number;
  uid: string;
  detail?: boolean;
}) {
  const w = cols * cw;
  const h = floors * fh;
  const top = baseY - h;
  const cells: ReactNode[] = [];

  for (let f = 0; f < floors; f++) {
    const cy = top + f * fh;
    const isLobby = f === floors - 1;

    if (isLobby) {
      cells.push(
        <g key={`lobby`}>
          <rect x={x + 10} y={cy + 10} width={w - 20} height={fh - 10} fill={pal.lit > 0.3 ? pal.glassLit : pal.glass} opacity={pal.lit > 0.3 ? 0.9 : 1} />
          {Array.from({ length: cols * 2 - 1 }).map((_, i) => (
            <rect key={i} x={n(x + 10 + ((i + 1) * (w - 20)) / (cols * 2))} y={cy + 10} width={3} height={fh - 10} fill={pal.wallShade} />
          ))}
          <rect x={n(x + w / 2 - 38)} y={cy + 8} width={76} height={fh - 8} fill={pal.wood} />
          <rect x={n(x + w / 2 - 38)} y={cy + 8} width={76} height={fh - 8} fill={`url(#slats-${uid})`} />
        </g>,
      );
      continue;
    }

    for (let c = 0; c < cols; c++) {
      const cx = x + c * cw;
      const r = rnd();
      const lit = rnd() < pal.lit;
      if (r < 0.4 && detail) {
        // painel de madeira ripada (brise)
        cells.push(
          <g key={`${f}-${c}`}>
            <rect x={cx + 9} y={cy + 10} width={cw - 18} height={fh - 24} fill={pal.woodDark} />
            <rect x={cx + 9} y={cy + 10} width={cw - 18} height={fh - 24} fill={`url(#slats-${uid})`} />
            {lit && (
              <rect x={cx + 9} y={cy + 10} width={cw - 18} height={fh - 24} fill={pal.glassLit} opacity={0.22} />
            )}
          </g>,
        );
      } else {
        // abertura de vidro com guarda-corpo
        cells.push(
          <g key={`${f}-${c}`}>
            <rect x={cx + 9} y={cy + 9} width={cw - 18} height={fh - 22} fill={lit ? pal.glassLit : pal.glass} opacity={lit ? 0.95 : 1} />
            {detail && (
              <>
                <rect x={n(cx + cw / 2 - 1)} y={cy + 9} width={2} height={fh - 22} fill={pal.wallShade} opacity={0.7} />
                <rect x={cx + 9} y={cy + fh - 34} width={cw - 18} height={14} fill="#fff" opacity={0.16} />
              </>
            )}
          </g>,
        );
      }
    }
    // laje / balcão
    cells.push(
      <rect key={`slab-${f}`} x={x - 7} y={cy + fh - 8} width={w + 14} height={8} fill={pal.slab} />,
    );
  }

  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={pal.wall} />
      <rect x={n(x + w - 16)} y={top} width={16} height={h} fill={pal.wallShade} opacity={0.55} />
      {cells}
      {/* cobertura: laje + pergolado */}
      <rect x={x - 14} y={top - 10} width={w + 28} height={12} fill={pal.slab} />
      {detail && (
        <g>
          {Array.from({ length: cols + 1 }).map((_, i) => (
            <rect key={i} x={n(x + 6 + (i * (w - 18)) / cols)} y={top - 36} width={5} height={26} fill={pal.woodDark} />
          ))}
          <rect x={x} y={top - 40} width={w} height={6} fill={pal.wood} />
        </g>
      )}
    </g>
  );
}

function Scene({
  pal,
  rnd,
  uid,
  horizon,
  children,
}: {
  pal: Pal;
  rnd: () => number;
  uid: string;
  horizon: number;
  children: ReactNode;
}) {
  const sparkles: ReactNode[] = [];
  for (let i = 0; i < 22; i++) {
    const sx = rnd() * 1600;
    const sy = horizon + 8 + rnd() * 70;
    sparkles.push(
      <rect key={i} x={n(sx)} y={n(sy)} width={n(30 + rnd() * 90)} height={2} fill="#fff" opacity={n(0.12 + rnd() * 0.25)} />,
    );
  }
  return (
    <g>
      {/* mar */}
      <rect x={0} y={horizon} width={1600} height={90} fill={`url(#sea-${uid})`} />
      {sparkles}
      {pal.orb.y > 400 &&
        [0, 1, 2, 3, 4, 5, 6].map((i) => {
          const t = (i - 3) / 3.5;
          const h = n(Math.sqrt(1 - t * t) * 84);
          return (
            <rect key={i} x={n(pal.orb.x - 31 + i * 10)} y={horizon} width={5} height={h} rx={1.5} fill={pal.orb.color} opacity={0.4} />
          );
        })}
      {/* morros */}
      <path
        d={`M0 ${horizon} C 180 ${horizon - 100}, 360 ${horizon - 70}, 540 ${horizon - 20} S 900 ${horizon - 90}, 1100 ${horizon - 40} S 1450 ${horizon - 100}, 1600 ${horizon - 30} L1600 ${horizon + 6} L0 ${horizon + 6}Z`}
        fill={pal.hillFar}
        opacity={0.85}
      />
      <path
        d={`M0 ${horizon + 30} C 140 ${horizon - 30}, 300 ${horizon - 10}, 420 ${horizon + 20} L420 ${horizon + 90} L0 ${horizon + 90}Z`}
        fill={pal.hillNear}
      />
      <path
        d={`M1180 ${horizon + 40} C 1300 ${horizon - 40}, 1480 ${horizon - 30}, 1600 ${horizon + 10} L1600 ${horizon + 90} L1180 ${horizon + 90}Z`}
        fill={pal.hillNear}
      />
      {children}
    </g>
  );
}

function Rooftop({ pal, uid }: { pal: Pal; uid: string }) {
  const planks: ReactNode[] = [];
  for (let i = 0; i < 9; i++) {
    const y = 650 + i * i * 3.2 + i * 10;
    planks.push(<rect key={i} x={0} y={n(y)} width={1600} height={2} fill={pal.woodDark} opacity={0.45} />);
  }
  const posts: ReactNode[] = [];
  for (let i = 0; i <= 13; i++) {
    posts.push(<rect key={i} x={i * 123 - 2} y={612} width={4} height={36} fill="#fff" opacity={0.35} />);
  }
  return (
    <g>
      {/* guarda-corpo de vidro */}
      <rect x={0} y={612} width={1600} height={38} fill="#fff" opacity={0.13} />
      <rect x={0} y={608} width={1600} height={6} fill={pal.slab} />
      {posts}
      {/* deck */}
      <path d="M0 650 H1600 V900 H0Z" fill={pal.wood} />
      <path d="M0 650 H1600 V900 H0Z" fill={pal.woodDark} opacity={0.25} />
      {planks}
      {/* piscina */}
      <path d="M330 700 H1270 L1390 850 H210Z" fill={pal.slab} />
      <path d="M350 712 H1250 L1360 838 H240Z" fill={`url(#pool-${uid})`} />
      <path d="M350 712 H1250 L1360 838 H240Z" fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={2} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={n(420 + i * 190)} y={n(730 + i * 4)} width={120} height={2} fill="#fff" opacity={0.35} />
      ))}
      {/* espreguiçadeiras */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={1300 + i * 70 - 30} y={n(760 + i * 26)} width={96} height={14} rx={3} fill={pal.wall} />
          <rect x={1300 + i * 70 + 52} y={n(748 + i * 26)} width={14} height={20} rx={3} fill={pal.wall} />
        </g>
      ))}
      <Palm x={110} y={760} h={230} pal={pal} />
      <Palm x={1530} y={640} h={170} pal={pal} />
    </g>
  );
}

/* ---------------------------- componente --------------------------- */
export function FacadeArt({
  tone = "day",
  view = "wide",
  seed = "facade",
  className = "",
  label,
}: {
  tone?: Tone;
  view?: View;
  seed?: string;
  className?: string;
  label?: string;
}) {
  const pal = PALETTES[tone];
  const rnd = seedRng(`${seed}-${tone}-${view}`);
  const uid = `${seed}-${tone}-${view}`.replace(/[^a-z0-9]/gi, "");
  const horizon = view === "rooftop" ? 500 : 560;
  const bx = view === "facade" ? 600 : 860; // posição do prédio principal
  const groundY = 770;

  const stars: ReactNode[] = [];
  if (pal.stars) {
    for (let i = 0; i < 70; i++) {
      stars.push(
        <circle key={i} cx={n(rnd() * 1600)} cy={n(rnd() * 380)} r={n(0.6 + rnd() * 1.3)} fill="#fff" opacity={n(0.35 + rnd() * 0.6)} />,
      );
    }
  }

  const transform = VIEW_TRANSFORM[view];

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.sky[0]} />
          <stop offset="0.55" stopColor={pal.sky[1]} />
          <stop offset="1" stopColor={pal.sky[2]} />
        </linearGradient>
        <linearGradient id={`sea-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.sea[0]} />
          <stop offset="1" stopColor={pal.sea[1]} />
        </linearGradient>
        <linearGradient id={`pool-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.pool} />
          <stop offset="1" stopColor={pal.sea[0]} />
        </linearGradient>
        <radialGradient id={`orb-${uid}`}>
          <stop offset="0" stopColor={pal.orb.color} stopOpacity="1" />
          <stop offset="0.35" stopColor={pal.orb.color} stopOpacity="0.55" />
          <stop offset="1" stopColor={pal.orb.color} stopOpacity="0" />
        </radialGradient>
        <pattern id={`slats-${uid}`} width="8" height="10" patternUnits="userSpaceOnUse">
          <rect width="5" height="10" fill={pal.wood} />
          <rect x="5" width="3" height="10" fill={pal.woodDark} />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill={`url(#sky-${uid})`} />
      {stars}
      <circle cx={pal.orb.x} cy={pal.orb.y} r={pal.orb.r * 3.2} fill={`url(#orb-${uid})`} />
      <circle cx={pal.orb.x} cy={pal.orb.y} r={pal.orb.r * (pal.stars ? 1 : 0.55)} fill={pal.orb.color} opacity={pal.stars ? 0.95 : 0.9} />

      <g transform={transform}>
        <Scene pal={pal} rnd={rnd} uid={uid} horizon={horizon}>
          {view !== "rooftop" && (
            <>
              {/* prédio vizinho, mais baixo */}
              <Building x={bx - 560} baseY={groundY} cols={2} floors={3} cw={140} fh={70} pal={pal} rnd={rnd} uid={uid} detail={false} />
              {/* terreno */}
              <rect x={-200} y={groundY} width={2000} height={400} fill={pal.ground} />
              <rect x={-200} y={groundY} width={2000} height={10} fill={pal.groundLine} />
              <rect x={-200} y={groundY + 70} width={2000} height={64} fill={pal.groundLine} opacity={0.55} />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <rect key={i} x={i * 240 - 60} y={groundY + 99} width={110} height={4} fill="#fff" opacity={0.5} />
              ))}
              {/* edifício principal */}
              <Building x={bx} baseY={groundY} cols={4} floors={7} cw={150} fh={72} pal={pal} rnd={rnd} uid={uid} />
              <Tree x={bx - 40} y={groundY + 6} r={60} pal={pal} />
              <Tree x={bx + 640} y={groundY + 8} r={78} pal={pal} />
              <Palm x={bx + 700} y={groundY + 14} h={250} pal={pal} />
              <Tree x={120} y={groundY + 16} r={100} pal={pal} />
              <Palm x={bx - 100} y={groundY + 14} h={190} pal={pal} />
            </>
          )}
          {view === "rooftop" && <Rooftop pal={pal} uid={uid} />}
        </Scene>
      </g>

      {/* marca d'água discreta: assinatura da identidade nos placeholders */}
      <g transform="translate(764 826) scale(1.1)" opacity={0.6}>
        <path d={markSun} fill="#b3865a" />
        {markBars().map((b) => (
          <rect key={b.x} x={b.x} y={b.y} width={b.w} height={b.h} rx={1.2} fill="#fff" opacity={0.85} />
        ))}
      </g>

      {view === "garden" && (
        <g>
          <path d="M880 900 L1085 765 L1185 765 L1420 900Z" fill={pal.groundLine} opacity={0.85} />
          <Tree x={180} y={930} r={190} pal={pal} />
          <Tree x={1460} y={940} r={210} pal={pal} />
          <Palm x={330} y={900} h={420} pal={pal} />
          <Palm x={1290} y={910} h={360} pal={pal} />
        </g>
      )}
    </svg>
  );
}
