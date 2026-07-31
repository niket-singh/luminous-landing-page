# AdzzatLabs - Frontier AI Data (Landing)

Landing page for **AdzzatLabs**'s AI data vertical: expert-curated datasets for foundation models, agentic workflows, RLHF, and simulation environments. Built for enterprise ML teams and YC-backed labs.

**Live:** `NEXT_PUBLIC_SITE_URL` should point to your AdzzatLabs production domain, for example `https://adzzatlabs.com`.

---

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (scroll reveals, hover, consent banner)
- **Lenis** (smooth scroll)
- **Fonts:** Geist Sans, Geist Mono, Inter

---

## What’s Included

- **Hero** — Full-viewport video (intro + loop), overlay with headline and CTAs
- **Loader** — Asset preload + iris-style exit before main content
- **Trust & Ecosystem** — Marquee + ecosystem logos (OpenAI, Meta, Hugging Face, LangChain, Databricks, Ollama)
- **Data Gap** — “Synthetic Wall” scroll-driven copy reveal
- **Core Capabilities** — Asymmetric Bento grid (Agentic Traces, RLHF, SFT, Simulation) with glassmorphism and hover glow
- **Proprietary Methodology** — 50/50 layout + interactive node-network visual
- **Technical Integration** — Terminal-style code snippet (pipeline-ready demo)
- **Final CTA** — Conversion block with primary/secondary buttons
- **DPDP Consent Banner** — India DPDP Act 2023–compliant cookie/data consent (slide-up after hero, localStorage)
- **SEO & OG** — Metadata, Open Graph, Twitter cards, favicons (recommended subdomain: `adzzatlabs.com`)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment (optional)

- `NEXT_PUBLIC_SITE_URL` — Canonical base URL (default: `https://adzzatlabs.com`). Set this in production to your final AdzzatLabs URL.

### Assets

- **Hero videos:** `public/bg.mp4` (intro), `public/loop.mp4` (loop)
- **OG image:** `public/og.png` (1200×630) for social previews
- **Favicons:** `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`

---

## Deploy

Deploy via Azure App Service. Set `NEXT_PUBLIC_SITE_URL` to your production URL if it differs from `https://adzzatlabs.com`.

---

## Compliance

- **DPDP Act 2023:** Consent banner with "Accept all" / "Essential only" and link to Itemized Privacy Notice (`/privacy`). Consent stored in `localStorage` under `adzzatlabs-dpdp-consent`.

Ensure you have a live **Privacy / Itemized Notice** at `/privacy` (or update the consent banner link in `components/ConsentBanner.tsx`).
