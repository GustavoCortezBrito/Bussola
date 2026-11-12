#!/usr/bin/env node
/**
 * npm run brand
 * Gera os arquivos de marca a partir da geometria única (src/content/logo-geometry.ts):
 *   public/brand/aurora-mark.svg · aurora-mark-light.svg · bussola-mark.svg · bussola-mark-light.svg
 *   src/app/icon.svg (favicon)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COMPASS, VIEW, bars, compassTicks, needleNorth, needleSouth, palette, sunPath } from "../src/content/logo-geometry.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "brand");
fs.mkdirSync(out, { recursive: true });

const rects = (fill) =>
  bars().map((b) => `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="1.2" fill="${fill}"/>`).join("");

const sun = (fill) => `<path d="${sunPath}" fill="${fill}"/>`;

const aurora = (slats, sunFill = palette.brass) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}" width="256" height="256">${sun(sunFill)}${rects(slats)}</svg>\n`;

function bussola(slats, sunFill = palette.brass) {
  const ticks = compassTicks()
    .map((t) => `<line x1="${t.x1}" y1="${t.y1}" x2="${t.x2}" y2="${t.y2}" stroke="${slats}" stroke-width="${t.major ? 1.7 : 0.9}" stroke-linecap="round"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}" width="256" height="256"><circle cx="32" cy="32" r="${COMPASS.ring}" fill="none" stroke="${slats}" stroke-width="2"/>${ticks}<g transform="rotate(${COMPASS.needleRot} 32 32)"><path d="${needleNorth}" fill="${sunFill}"/><path d="${needleSouth}" fill="${slats}"/></g><circle cx="32" cy="32" r="2.6" fill="${slats}"/><circle cx="32" cy="32" r="1" fill="${sunFill}"/></svg>
`;
}

const files = {
  "aurora-mark.svg": aurora(palette.ink),
  "aurora-mark-light.svg": aurora(palette.sand),
  "bussola-mark.svg": bussola(palette.ink),
  "bussola-mark-light.svg": bussola(palette.sand),
};
for (const [name, svg] of Object.entries(files)) fs.writeFileSync(path.join(out, name), svg);

// favicon: marca clara sobre quadrado verde-escuro
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}"><rect width="${VIEW}" height="${VIEW}" rx="14" fill="${palette.ink}"/><g transform="translate(32 32) scale(.86) translate(-32 -34)">${sun(palette.brass)}${rects(palette.sand)}</g></svg>\n`;
fs.writeFileSync(path.join(root, "src", "app", "icon.svg"), icon);

console.log(`Gerado: ${Object.keys(files).length} SVGs em public/brand + src/app/icon.svg`);
