#!/usr/bin/env node
/**
 * Gera as mídias da capa (e opcionalmente as demais) direto na API do Higgsfield
 * e salva em public/media — o site troca os placeholders sozinho.
 *
 *   npm run higgsfield                  -> mostra o plano da capa (não gasta nada)
 *   npm run higgsfield -- --yes         -> gera as imagens da capa + o vídeo (gasta créditos)
 *   npm run higgsfield -- --all --yes   -> todos os slots do manifesto
 *   npm run higgsfield -- --only hero-noite,card-2 --yes
 *   flags: --force (refaz o que já existe) · --resolution 4K (padrão 2K)
 *
 * Credenciais (Console do Higgsfield → API keys), em .env.local:
 *   HF_API_KEY_ID=...    HF_API_KEY_SECRET=...
 *
 * Detalhes da API (docs.higgsfield.ai): base https://api.higgsfield.ai,
 * header `Authorization: Key <id>:<secret>`, fila assíncrona com polling em
 * /requests/{id}/status. Arquivos gerados ficam no CDN deles por 7 dias, por
 * isso baixamos na hora.
 *
 * Sobrescritas opcionais (env): HIGGSFIELD_BASE_URL, HIGGSFIELD_SOUL_PATH,
 * HIGGSFIELD_VIDEO_PATH, HIGGSFIELD_OUT_DIR.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { mediaSlots } from "../src/content/media.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const f of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(path.join(root, f));
  } catch {}
}

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const BASE = (process.env.HIGGSFIELD_BASE_URL ?? "https://api.higgsfield.ai").replace(/\/$/, "");
const SOUL_PATHS = process.env.HIGGSFIELD_SOUL_PATH
  ? [process.env.HIGGSFIELD_SOUL_PATH]
  : ["/higgsfield-ai/soul/standard", "/higgsfield-ai/soul/v2/standard"];
const VIDEO_PATH = process.env.HIGGSFIELD_VIDEO_PATH ?? "/kling-video/v2.5-turbo/standard/image-to-video";
const OUT = process.env.HIGGSFIELD_OUT_DIR ?? path.join(root, "public", "media");
const RESOLUTION = opt("resolution") ?? "2K";
const IMAGE_EXT = [".webp", ".avif", ".jpg", ".jpeg", ".png"];
const VIDEO_EXT = [".mp4", ".webm"];
const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// A API do Soul não aceita imagem de referência: a consistência do prédio vem da
// descrição repetida em cada prompt, então tiramos as menções à "referência".
const clean = (p) =>
  p
    .replace(/\([^)]*\)/g, "")
    .replace(/Same building as the reference image:\s*/gi, "")
    .replace(/of the same building as the reference image/gi, "of a building")
    .replace(/\s+/g, " ")
    .trim();
const existing = (slot) =>
  (slot.kind === "video" ? VIDEO_EXT : IMAGE_EXT)
    .map((e) => path.join(OUT, slot.file + e))
    .find((f) => fs.existsSync(f));

/* ------------------------------ seleção ------------------------------ */
let slots;
if (opt("only")) {
  const ids = opt("only").split(",").map((s) => s.trim());
  slots = ids.map((id) => {
    const s = mediaSlots.find((x) => x.id === id);
    if (!s) throw new Error(`Slot desconhecido: ${id}`);
    return s;
  });
} else if (flag("all")) {
  slots = mediaSlots;
} else {
  slots = mediaSlots.filter((s) => s.id.startsWith("hero-"));
}
// imagens primeiro: o vídeo parte de hero-manha
slots = [...slots.filter((s) => s.kind === "image"), ...slots.filter((s) => s.kind === "video")];
const todo = slots.filter((s) => flag("force") || !existing(s));

console.log(`\nDestino: ${path.relative(root, OUT) || OUT}`);
for (const s of slots) {
  const have = existing(s);
  console.log(
    `  ${have && !flag("force") ? "✔ já existe " : "→ gerar     "} ${s.id.padEnd(16)} ${s.kind.padEnd(5)} ${s.ratio}${
      s.kind === "image" ? ` @${RESOLUTION}` : "  (image-to-video a partir de hero-manha)"
    }`,
  );
}
if (!todo.length) {
  console.log("\nNada a gerar.\n");
  process.exit(0);
}
if (!flag("yes")) {
  console.log(
    `\nSimulação: ${todo.length} geração(ões) consumiriam créditos da sua conta Higgsfield.\nRode de novo com --yes para executar.\n`,
  );
  process.exit(0);
}

const KEY_ID = process.env.HF_API_KEY_ID;
const KEY_SECRET = process.env.HF_API_KEY_SECRET;
if (!KEY_ID || !KEY_SECRET) {
  console.error(
    "\nFaltam as credenciais. Crie uma API key no Console do Higgsfield e coloque em .env.local:\n  HF_API_KEY_ID=...\n  HF_API_KEY_SECRET=...\n",
  );
  process.exit(1);
}

/* ------------------------------- HTTP -------------------------------- */
const auth = { Authorization: `Key ${KEY_ID}:${KEY_SECRET}` };

async function api(method, p, body, { retries = 4 } = {}) {
  const url = p.startsWith("http") ? p : BASE + p;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, {
      method,
      headers: {
        ...auth,
        "Content-Type": "application/json",
        ...(method === "POST" ? { "Idempotency-Key": crypto.randomUUID() } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 || res.status >= 500) {
      if (attempt >= retries) throw new Error(`${method} ${p} → ${res.status} após ${retries} tentativas`);
      const wait = Number(res.headers.get("retry-after")) * 1000 || 2000 * 2 ** attempt;
      console.log(`    …${res.status}, tentando de novo em ${Math.round(wait / 1000)}s`);
      await sleep(wait);
      continue;
    }
    const text = await res.text();
    let json;
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { raw: text };
    }
    if (res.status === 401) throw new Error("401: credenciais inválidas (HF_API_KEY_ID / HF_API_KEY_SECRET).");
    return { status: res.status, json };
  }
}

async function wait(requestId, label) {
  let delay = 2000;
  const started = Date.now();
  while (Date.now() - started < 10 * 60 * 1000) {
    await sleep(delay + Math.random() * 400);
    delay = Math.min(delay * 1.5, 10000);
    const { status, json } = await api("GET", `/requests/${requestId}/status`);
    if (status === 404) throw new Error(`${label}: request ${requestId} não encontrado`);
    if (json.status === "completed") return json;
    if (["failed", "nsfw", "canceled"].includes(json.status)) {
      throw new Error(`${label}: terminou como "${json.status}"${json.error ? ` (${json.error})` : ""}`);
    }
    process.stdout.write(`    ${label}: ${json.status ?? "?"}…\r`);
  }
  throw new Error(`${label}: tempo esgotado (10 min)`);
}

async function download(url, base, fallbackExt) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}: ${url}`);
  const ext = path.extname(new URL(url).pathname).toLowerCase() || fallbackExt;
  fs.mkdirSync(OUT, { recursive: true });
  const dest = path.join(OUT, base + ext);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return dest;
}

/* ----------------------------- geradores ----------------------------- */
async function genImage(slot) {
  const body = {
    prompt: clean(slot.prompt),
    aspect_ratio: slot.ratio,
    resolution: RESOLUTION,
    num_images: 1,
  };
  let sub;
  for (const p of SOUL_PATHS) {
    sub = await api("POST", p, body);
    if (sub.status !== 404) break; // a doc oficial tem dois caminhos; testa o próximo
  }
  if (sub.status >= 400) throw new Error(`${slot.id}: submit → ${sub.status} ${JSON.stringify(sub.json).slice(0, 200)}`);
  const done = await wait(sub.json.request_id, slot.id);
  const url = done.images?.[0]?.url;
  if (!url) throw new Error(`${slot.id}: resposta sem images[0].url`);
  return download(url, slot.file, ".jpg");
}

async function upload(file) {
  const ext = path.extname(file).toLowerCase();
  const type = MIME[ext];
  if (!type) throw new Error(`Formato não suportado para upload: ${ext}`);
  const { status, json } = await api("POST", "/files/generate-upload-url", { content_type: type });
  if (status >= 400) throw new Error(`upload-url → ${status} ${JSON.stringify(json).slice(0, 200)}`);
  // PUT direto no storage: NÃO enviar as credenciais do Higgsfield para esta URL
  const put = await fetch(json.upload_url, {
    method: "PUT",
    headers: json.upload_headers ?? { "Content-Type": type },
    body: fs.readFileSync(file),
  });
  if (!put.ok) throw new Error(`PUT do arquivo → ${put.status}`);
  return json.public_url;
}

async function genVideo(slot) {
  const src = (() => {
    const s = mediaSlots.find((x) => x.id === "hero-manha");
    return s && existing(s);
  })();
  if (!src) throw new Error("hero-video precisa de hero-manha gerada antes (imagem de partida).");
  console.log(`    enviando ${path.basename(src)} como imagem de partida…`);
  const image_url = await upload(src);
  const sub = await api("POST", VIDEO_PATH, {
    prompt: slot.motion ?? clean(slot.prompt),
    image_url,
    duration: 5,
  });
  if (sub.status >= 400) throw new Error(`${slot.id}: submit → ${sub.status} ${JSON.stringify(sub.json).slice(0, 200)}`);
  const done = await wait(sub.json.request_id, slot.id);
  const url = done.video?.url;
  if (!url) throw new Error(`${slot.id}: resposta sem video.url`);
  return download(url, slot.file, ".mp4");
}

/* -------------------------------- main ------------------------------- */
let failed = 0;
for (const slot of todo) {
  console.log(`\n▶ ${slot.id}`);
  try {
    const dest = slot.kind === "video" ? await genVideo(slot) : await genImage(slot);
    console.log(`  ✔ salvo em ${path.relative(root, dest)}          `);
  } catch (err) {
    failed++;
    console.error(`  ✘ ${err.message}`);
    if (/401/.test(err.message)) break;
  }
}
console.log(`\n${todo.length - failed}/${todo.length} gerados.${failed ? " Veja os erros acima." : " Recarregue o site."}\n`);
process.exit(failed ? 1 : 0);
