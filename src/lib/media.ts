import fs from "node:fs";
import path from "node:path";
import { mediaSlots, type Tone, type View } from "@/content/media";

/**
 * Resolve um slot do manifesto para um arquivo real em `public/media`.
 * Roda só no servidor (leitura síncrona de disco => entra no HTML pré-renderizado).
 * Se o arquivo não existe, `src` fica `null` e o componente <Media> desenha o
 * placeholder ilustrado.
 */

const IMAGE_EXT = [".webp", ".avif", ".jpg", ".jpeg", ".png"];
const VIDEO_EXT = [".mp4", ".webm"];
const MEDIA_DIR = path.join(process.cwd(), "public", "media");

export type ResolvedMedia = {
  id: string;
  src: string | null;
  label: string;
  alt: string;
  tone: Tone;
  view: View;
};

function findFile(file: string, exts: string[]): string | null {
  for (const ext of exts) {
    if (fs.existsSync(path.join(MEDIA_DIR, file + ext))) {
      return `/media/${file}${ext}`;
    }
  }
  return null;
}

export function media(id: string): ResolvedMedia {
  const slot = mediaSlots.find((s) => s.id === id);
  if (!slot) throw new Error(`Slot de mídia desconhecido: "${id}"`);
  return {
    id: slot.id,
    src: findFile(slot.file, slot.kind === "video" ? VIDEO_EXT : IMAGE_EXT),
    label: slot.label,
    alt: slot.alt,
    tone: slot.tone,
    view: slot.view,
  };
}

export function mediaMany(ids: string[]): ResolvedMedia[] {
  return ids.map(media);
}
