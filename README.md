# Bússola Imóveis + Residencial Aurora

Dois sites em um único projeto **Next.js 16 · React 19 · Tailwind 4 · Framer Motion**, com mídia gerada no **Higgsfield**:

| Site | Rota | Referências |
|---|---|---|
| **Imobiliária** (capa com as imagens do empreendimento alternando, busca/filtros, modelo a preço de custo, leads) | `/` | LuxuryEstate, Elisa Investimentos |
| **Empreendimento** (capa com vídeo/imagens, modelo a preço de custo, projeto, plantas, localização, governança, leads) | `/empreendimento` | OY / Origem Jurerê, Omega |

> ⚠️ **Todo o conteúdo é de exemplo** (nomes, números, textos, distâncias, governança). Troque pelos dados reais e valide o texto do modelo a preço de custo com o jurídico antes de publicar.

## Rodar

```bash
npm install
cp .env.example .env.local   # preencha WhatsApp e webhook
npm run dev                  # http://localhost:3000  e  /empreendimento
npm run build && npm start   # produção
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Nomes, WhatsApp, CRECI, Instagram | `src/content/brand.ts` |
| Vitrine de empreendimentos (site da imobiliária) | `src/content/projects.ts` |
| Textos, números, plantas, FAQ, governança (site do empreendimento) | `src/content/empreendimento.ts` |
| Cores e fontes | `src/app/globals.css` (tokens `--ink`, `--brass`…) e `src/app/layout.tsx` |
| Textos da home da imobiliária | `src/app/page.tsx` |

## Higgsfield: imagens e vídeo da capa

Cada lugar do site que recebe mídia é um *slot* em `src/content/media.ts`, já com o **prompt pronto para o Higgsfield**.

```bash
npm run media          # mostra o que falta + os prompts
npm run media -- --all # prompts de todos os slots
```

1. Gere a imagem `hero-manha` primeiro e use-a como **imagem de referência** nas demais, para manter o mesmo prédio.
2. Gere o vídeo `hero-video` com *image-to-video* a partir de `hero-manha` (8–10 s, loop, MP4 1080p, até ~4 MB).
3. Salve em `public/media/<slot>.jpg|webp|png|avif` (vídeo: `.mp4`/`.webm`).
4. Pronto: o site detecta o arquivo e troca o placeholder ilustrado. Sem configuração. (Em produção, rode `npm run build` de novo.)

Se existir `hero-video`, a capa do empreendimento usa o vídeo; senão, alterna as imagens.

## Leads (formulários)

Os dois formulários enviam para `POST /api/lead`, que valida e encaminha o JSON para `LEAD_WEBHOOK_URL` (Zapier, Make, n8n, Apps Script, CRM…). Em produção, **sem o webhook a API responde 503** e o formulário mostra o fallback do WhatsApp, para nenhum lead se perder em silêncio. Há honeypot anti-spam e consentimento LGPD obrigatório.

## Dois domínios, um deploy

Defina no ambiente de produção:

```
EMPREENDIMENTO_HOSTS=aurora.com.br,www.aurora.com.br   # nesses hosts "/" abre o site do empreendimento
NEXT_PUBLIC_IMOBILIARIA_URL=https://bussola.com.br
NEXT_PUBLIC_EMPREENDIMENTO_URL=https://aurora.com.br
```

A regra fica em `src/proxy.ts`. Sem as variáveis, tudo funciona na mesma origem (`/` e `/empreendimento`).

## Leveza

- Framer Motion em modo `LazyMotion` (`domAnimation`) + `m.*`: só o necessário vai para o navegador.
- Entrada da capa em CSS puro (não depende de JS para o texto aparecer).
- Páginas **estáticas** (pré-renderizadas), imagens via `next/image`, fontes via `next/font`.
- Sem bibliotecas de mapa/ícones/carrossel: mapa e plantas são SVG; ícones inline.
- `prefers-reduced-motion` respeitado.

## Pendências antes de publicar

- [ ] Dados reais (nome, números, CRECI, WhatsApp, Instagram, e-mail)
- [ ] Imagens/vídeo reais do Higgsfield em `public/media`
- [ ] `LEAD_WEBHOOK_URL` configurado
- [ ] Número do registro de incorporação/memorial no rodapé e revisão jurídica do texto do modelo
- [ ] Política de Privacidade (link no consentimento do formulário)
- [ ] Endereço final → trocar o mapa esquemático por Google Maps
- [ ] Analytics / pixel (se desejado)
