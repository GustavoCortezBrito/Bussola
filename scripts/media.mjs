#!/usr/bin/env node
/**
 * npm run media          -> status de todos os slots + prompts dos que faltam
 * npm run media -- --all -> imprime o prompt de todos os slots
 *
 * Fluxo com o Higgsfield:
 *   1. rode `npm run media`
 *   2. cole o prompt de cada slot no Higgsfield (imagem -> vídeo para o hero-video)
 *   3. salve o arquivo em public/media/<file>.<ext>
 *   4. recarregue o site: o placeholder some sozinho
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mediaSlots } from "../src/content/media.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "media");
const IMAGE_EXT = [".webp", ".avif", ".jpg", ".jpeg", ".png"];
const VIDEO_EXT = [".mp4", ".webm"];
const showAll = process.argv.includes("--all");

const found = (slot) =>
  (slot.kind === "video" ? VIDEO_EXT : IMAGE_EXT).find((ext) =>
    fs.existsSync(path.join(dir, slot.file + ext)),
  );

let missing = 0;
console.log(`\nPasta de mídia: ${path.relative(root, dir)}${path.sep}\n`);

for (const slot of mediaSlots) {
  const ext = found(slot);
  const ok = Boolean(ext);
  if (!ok) missing++;
  console.log(
    `${ok ? "✔" : "✘"} ${slot.id.padEnd(16)} ${slot.kind.padEnd(5)} ${slot.ratio.padEnd(5)} ${
      ok ? `${slot.file}${ext}` : `falta -> ${slot.file}.${slot.kind === "video" ? "mp4" : "jpg"}`
    }`,
  );
}

console.log(`\n${mediaSlots.length - missing}/${mediaSlots.length} slots com mídia real.\n`);

for (const slot of mediaSlots) {
  if (!showAll && found(slot)) continue;
  console.log(`── ${slot.id} (${slot.kind}, ${slot.ratio}) ─────────────────────────`);
  console.log(slot.prompt + "\n");
}
