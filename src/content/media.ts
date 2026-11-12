/**
 * Manifesto de mídia — a ponte entre o site e o Higgsfield.
 *
 * Como funciona:
 *  1. Cada "slot" abaixo é um lugar do site que recebe imagem ou vídeo.
 *  2. Rode `npm run media` para ver quais slots ainda estão vazios e copiar o
 *     prompt de cada um para o Higgsfield.
 *  3. Salve o resultado em `public/media/<file>.<jpg|webp|png|avif>` (ou .mp4
 *     para vídeo). Nada mais a configurar: o site detecta o arquivo sozinho e
 *     troca o placeholder ilustrado pela mídia real.
 *
 * Este arquivo é lido pelo Next.js e também pelo script `scripts/media.mjs`
 * (por isso não pode importar nada com alias `@/`).
 */

export type Tone = "dawn" | "day" | "sunset" | "night";
export type View = "wide" | "facade" | "close" | "corner" | "garden" | "rooftop";

export type MediaSlot = {
  id: string;
  kind: "image" | "video";
  /** nome do arquivo em public/media, sem extensão */
  file: string;
  /** legenda curta usada nos indicadores do carrossel */
  label: string;
  alt: string;
  /** aparência do placeholder enquanto não há mídia real */
  tone: Tone;
  view: View;
  /** proporção ideal para gerar no Higgsfield */
  ratio: string;
  /** prompt pronto para colar no Higgsfield */
  prompt: string;
  /** só vídeo: prompt de movimento usado no image-to-video (API) */
  motion?: string;
};

const BUILDING =
  "a contemporary 6-storey residential building in Florianópolis, Brazil, " +
  "board-formed concrete slabs, deep balconies with frameless glass guardrails, " +
  "warm terracotta-toned perforated timber brise-soleil screens, lush tropical " +
  "landscaping with native palms, hills and ocean in the background";

const STYLE =
  "architectural visualization, photorealistic, 35mm lens, natural light, " +
  "high-end real estate marketing, no text, no watermark, no people";

export const mediaSlots: MediaSlot[] = [
  /* ----------------------------- Capas / carrossel ------------------------ */
  {
    id: "hero-manha",
    kind: "image",
    file: "hero-manha",
    label: "Fachada · manhã",
    alt: "Fachada do Residencial Aurora ao amanhecer",
    tone: "day",
    view: "wide",
    ratio: "16:9",
    prompt:
      `Exterior hero shot of ${BUILDING}, soft early-morning light, clear sky, ` +
      `street-level three-quarter view. ${STYLE}. ` +
      `(Gere esta primeira e use como imagem de referência nas demais para manter o mesmo prédio.)`,
  },
  {
    id: "hero-por-do-sol",
    kind: "image",
    file: "hero-por-do-sol",
    label: "Fachada · fim de tarde",
    alt: "Residencial Aurora no fim da tarde com as varandas iluminadas",
    tone: "sunset",
    view: "corner",
    ratio: "16:9",
    prompt:
      `Same building as the reference image: ${BUILDING}. Golden-hour sunset, ` +
      `warm interior lights glowing in the balconies, orange and rose sky. ${STYLE}.`,
  },
  {
    id: "hero-noite",
    kind: "image",
    file: "hero-noite",
    label: "Fachada · noite",
    alt: "Residencial Aurora à noite com iluminação das áreas comuns",
    tone: "night",
    view: "wide",
    ratio: "16:9",
    prompt:
      `Same building as the reference image: ${BUILDING}. Blue-hour night scene, ` +
      `warm glowing windows, softly lit landscaping and timber screens, deep blue sky. ${STYLE}.`,
  },
  {
    id: "hero-aerea",
    kind: "image",
    file: "hero-aerea",
    label: "Vista do bairro",
    alt: "Vista aérea do Residencial Aurora e da praia",
    tone: "dawn",
    view: "garden",
    ratio: "16:9",
    prompt:
      `Elevated drone view of the same building as the reference image, surrounded by ` +
      `green trees, the beach and ocean in the distance, soft dawn light. ${STYLE}.`,
  },
  {
    id: "hero-video",
    kind: "video",
    file: "hero-video",
    label: "Vídeo de capa",
    alt: "Vídeo de capa do Residencial Aurora",
    tone: "day",
    view: "wide",
    ratio: "16:9",
    motion:
      "Slow cinematic push-in toward the building, gentle palm leaves movement, clouds drifting, light slowly warming, no camera shake, no text, seamless loop feel.",
    prompt:
      `IMAGE-TO-VIDEO a partir de "hero-manha": slow cinematic push-in, subtle palm leaves ` +
      `movement, clouds drifting, light slowly warming. 8–10 seconds, seamless loop, ` +
      `no camera shake, no text. Exportar em MP4 H.264, 1080p, até ~4 MB.`,
  },

  /* ------------------------------ Projeto --------------------------------- */
  {
    id: "projeto-luz",
    kind: "image",
    file: "projeto-luz",
    label: "Luz e ventilação",
    alt: "Varandas amplas com ventilação cruzada e muita luz natural",
    tone: "day",
    view: "close",
    ratio: "4:5",
    prompt:
      `Close architectural detail of the same building: deep balcony, glass guardrail, ` +
      `perforated timber screen casting filtered light patterns, view of the ocean. ${STYLE}.`,
  },
  {
    id: "projeto-verde",
    kind: "image",
    file: "projeto-verde",
    label: "Área verde integrada",
    alt: "Área verde que atravessa o térreo do empreendimento",
    tone: "day",
    view: "garden",
    ratio: "4:5",
    prompt:
      `Ground floor of the same building: a shaded tropical garden with native trees, ` +
      `stone path, wooden benches, open pilotis, dappled sunlight. ${STYLE}.`,
  },
  {
    id: "projeto-rooftop",
    kind: "image",
    file: "projeto-rooftop",
    label: "Rooftop",
    alt: "Rooftop com piscina e vista para o mar",
    tone: "sunset",
    view: "rooftop",
    ratio: "4:5",
    prompt:
      `Rooftop terrace of the same building: infinity pool, timber deck, lounge chairs, ` +
      `glass guardrail, ocean and hills at sunset. ${STYLE}.`,
  },

  /* --------------------------- Cards da imobiliária ----------------------- */
  {
    id: "card-aurora",
    kind: "image",
    file: "card-aurora",
    label: "Residencial Aurora",
    alt: "Residencial Aurora",
    tone: "day",
    view: "facade",
    ratio: "4:3",
    prompt: `Facade of ${BUILDING}, daylight, centered composition. ${STYLE}.`,
  },
  {
    id: "card-2",
    kind: "image",
    file: "card-2",
    label: "Card 2",
    alt: "Empreendimento 2",
    tone: "sunset",
    view: "corner",
    ratio: "4:3",
    prompt:
      `Modern 4-storey studio apartment building near a lagoon in Florianópolis, white ` +
      `rendered walls, wooden details, tropical plants. ${STYLE}.`,
  },
  {
    id: "card-3",
    kind: "image",
    file: "card-3",
    label: "Card 3",
    alt: "Empreendimento 3",
    tone: "dawn",
    view: "garden",
    ratio: "4:3",
    prompt:
      `Garden-style low-rise residential complex in Florianópolis with large trees, ` +
      `pergolas and a communal pool. ${STYLE}.`,
  },
  {
    id: "card-4",
    kind: "image",
    file: "card-4",
    label: "Card 4",
    alt: "Empreendimento 4",
    tone: "day",
    view: "close",
    ratio: "4:3",
    prompt:
      `Beachfront mid-rise apartment building with large glass balconies, light stone ` +
      `facade, ocean view, Florianópolis. ${STYLE}.`,
  },
  {
    id: "card-5",
    kind: "image",
    file: "card-5",
    label: "Card 5",
    alt: "Empreendimento 5",
    tone: "dawn",
    view: "facade",
    ratio: "4:3",
    prompt:
      `Low-rise beach residential complex in Florianópolis with timber balconies, palms and a pool, soft morning light. ${STYLE}.`,
  },
];

export type MediaId = (typeof mediaSlots)[number]["id"];
