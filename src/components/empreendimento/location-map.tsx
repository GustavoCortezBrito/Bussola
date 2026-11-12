/**
 * Mapa esquemático (SVG leve, sem biblioteca de mapas).
 * TODO: quando o endereço final estiver definido, trocar por um iframe do
 * Google Maps (loading="lazy") ou imagem estática do mapa.
 */
export function LocationMap({ name }: { name: string }) {
  return (
    <figure className="relative aspect-[5/4] w-full overflow-hidden bg-[#e9e3d6] ring-1 ring-ink/10">
      <svg
        viewBox="0 0 600 480"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Mapa esquemático da localização do ${name}`}
      >
        {/* mar */}
        <path d="M430 0 C 470 90, 410 170, 450 260 S 500 400, 470 480 L600 480 L600 0Z" fill="#a9cdd6" />
        <path d="M455 0 C 495 90, 435 170, 475 260 S 525 400, 495 480" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="6 8" />
        {/* areia */}
        <path d="M410 0 C 450 90, 390 170, 430 260 S 480 400, 450 480 L470 480 C 500 400, 450 300, 450 260 C 410 170, 470 90, 430 0Z" fill="#efe1c0" />
        {/* quadras */}
        {[
          [30, 30, 120, 90], [170, 30, 90, 90], [280, 30, 110, 90],
          [30, 140, 70, 110], [120, 140, 140, 110], [280, 140, 100, 110],
          [30, 270, 140, 80], [190, 270, 80, 80], [290, 270, 90, 80],
          [30, 370, 100, 80], [150, 370, 120, 80], [290, 370, 90, 80],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={i === 5 ? "#c7d6c0" : "#f6f1e6"} stroke="#d8cdb6" />
        ))}
        {/* áreas verdes */}
        <rect x="120" y="140" width="140" height="110" fill="#c7d6c0" stroke="#d8cdb6" />
        {/* ciclovia */}
        <path d="M0 255 H410" stroke="#b3865a" strokeWidth="4" strokeDasharray="10 7" />
      </svg>

      <span className="eyebrow absolute left-[62%] top-[40%] text-[0.6rem] text-sea">Praia</span>
      <span className="eyebrow absolute bottom-[40%] left-[8%] text-[0.58rem] text-brass-deep">Ciclovia</span>

      {/* marcador do empreendimento */}
      <span className="absolute left-[44%] top-[40%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="relative flex size-5 items-center justify-center">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brass opacity-60" />
          <span className="relative size-4 rounded-full border-2 border-white bg-brass shadow" />
        </span>
        <span className="mt-2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-[0.7rem] font-semibold text-white">
          {name}
        </span>
      </span>

      <figcaption className="absolute bottom-3 left-4 text-[0.65rem] text-ink/50">
        Mapa esquemático, sem escala.
      </figcaption>
    </figure>
  );
}
