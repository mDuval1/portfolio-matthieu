# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## Project

Portfolio website for a young architect (working name: **Matthieu**). Minimal,
editorial, image-led. Bilingual (English default, French secondary). Shipped as
a **static site** (SSG) — no server runtime in production.

## Stack

- **Nuxt 4** (`app/` directory structure)
- **Nuxt UI 4** — component library; bundles **Tailwind CSS 4** (no separate Tailwind config — theme lives in `app/assets/css/main.css` via `@theme`)
- **Nuxt i18n** (`@nuxtjs/i18n` v10) — `prefix_except_default` strategy
- **TypeScript** throughout (`<script setup lang="ts">`)
- **ESLint** via `@nuxt/eslint` (stylistic: no comma-dangle, 1tbs braces)
- Package manager: **pnpm**

## Commands

```bash
pnpm dev        # dev server (HMR)
pnpm generate   # SSG build → output in .output/public/  (USE THIS to ship)
pnpm preview    # serve the generated build locally
pnpm lint       # eslint
pnpm typecheck  # vue-tsc
```

`pnpm build` produces a server build — for this project prefer `pnpm generate`.

## Layout

```
app/
  app.vue              # root: <UApp>, AppHeader, <NuxtPage>, AppFooter, SEO/head
  app.config.ts        # Nuxt UI theme (palette is monochrome by default)
  assets/css/main.css  # Tailwind + Nuxt UI imports, font / @theme tokens
  components/
    AppHeader.vue        # header + localized nav + color mode + language
    AppFooter.vue
    AppLogo.vue          # text wordmark (name + role, i18n)
    LanguageSwitcher.vue # locale dropdown via useSwitchLocalePath
  pages/                 # file-based routes: index, projects, about, contact
i18n/
  locales/en.json        # English strings (default)
  locales/fr.json        # French strings
nuxt.config.ts           # modules, i18n, nitro prerender (SSG)
```

## Conventions

- **No hard-coded UI text.** Every visible string goes through `t('...')` and
  must exist in **both** `i18n/locales/en.json` and `fr.json` with matching keys.
- **Links between pages** use `useLocalePath()` / `<NuxtLinkLocale>` so locale
  prefixes (`/fr/...`) stay correct. Never hard-code `to="/projects"`.
- Page `<title>` comes from `useSeoMeta({ title })`; the global template in
  `app.vue` appends the site name.
- Prefer Nuxt UI components (`UPage`, `UPageHero`, `UPageSection`, `UButton`,
  `UNavigationMenu`, …) over bespoke markup. Browse: https://ui.nuxt.com
- Icons: `i-lucide-*` (UI) and `i-simple-icons-*` (brands), already installed.

## i18n

- Default locale `en` is served at `/`; French at `/fr/...`.
- Add a locale: extend `i18n.locales` in `nuxt.config.ts`, add a JSON file under
  `i18n/locales/`, and add its root route to `nitro.prerender.routes`.
- Set the production URL via `NUXT_PUBLIC_SITE_URL` (used for canonical/hreflang
  tags); `i18n.baseUrl` falls back to a placeholder otherwise.

## SSG notes

- `nitro.prerender.crawlLinks: true` follows in-page `<NuxtLink>`s, so any page
  reachable from the nav is prerendered automatically. Pages **not** linked from
  anywhere must be added explicitly to `nitro.prerender.routes`.
- Output is fully static in `.output/public/` — deploy to any static host
  (Netlify, Vercel static, GitHub Pages, S3/CDN).

## Customising the look

- Palette: `app/app.config.ts` (`ui.colors.primary` / `neutral`). Currently
  monochrome (`primary: neutral`); set `primary` to an accent for colour.
- Font / design tokens: `app/assets/css/main.css` (`@theme`).

## Source assets (Google Drive)

Raw visuals live in a shared Drive folder **`VISUELS SITE PERSO`** (owner
`matthieu.duval.archi@gmail.com`, shared with the site owner). Root folder id:
`1O0v4kU0hTsxcJ_itvAzGVr_hVD76uigJ` (≈ 140 files / ≈ 618 MB).

**Import is automated**: `scripts/import-visuals.sh` reads the folder from
`~/Downloads/VISUELS SITE PERSO/` (download the Drive folder as a zip, extract
there) and produces the repo assets — images → `.webp` (long edge ≤ 2400, q82),
fonts/CVs copied as-is, big PDFs copied for Git LFS. Re-runnable (cleans dest
webp each run). The MCP Drive tools were only used to **map** the folder — do
**not** route the image/PDF bulk through `download_file_content` (base64 floods
the model context).

What lands in git:
- **Images** → `.webp`, committed normally (≈ 31 MB for 113 files).
- **Fonts / CVs** → committed normally.
- **Big PDFs** (`public/media/pdf/*.pdf`, ≈ 128 MB) → **Git LFS** (see
  `.gitattributes`) so the site can serve them as downloads. NB: GitHub free LFS
  is 1 GB storage + 1 GB/month bandwidth — each portfolio download (~55 MB) eats
  bandwidth. Vercel checks out LFS objects at build automatically.
- **618 MB of originals** stay in `~/Downloads` + Drive — never copied into git.

### Drive → local map

| Drive folder | id | Contents | Local destination |
|---|---|---|---|
| `01_PHILOPOLIS` | `1MTUIwZTwTHW1tWgon2CgLJJy9zdrJAXz` | 25 png — plans, coupes, perspectives, morpho, collages | `public/media/projects/01-philopolis/` |
| `02_BAHANAAUE` | `1AV1yWOUJR-CyO72Y0TzMZm3hoh0K2CZV` | 8 png — perse, plans R0/R1, coupe perspective, plan masse | `public/media/projects/02-bahanaaue/` |
| `03_PALIMPSESTE` | `14HSqXpTrVmdGqDdizFzusK5kMQi7vhVh` | 3 png — collage extérieur, axo constructive, axo bow-wow | `public/media/projects/03-palimpseste/` |
| `04_LA PESANTEUR ET LA GRACE` | `1tkfBqcywdM0fgNuhDV2nSrG4sPXtIdJx` | 8 png — perse int/ext, axo constructive, coupes, plans | `public/media/projects/04-pesanteur-grace/` |
| `05_REVELATION` | `1IdTb3Psm0tDXpyAby4tGjTliW537Q-u2` | 31 png — renders (atrium, temple, coworking…), plans, coupes, MEP/structure | `public/media/projects/05-revelation/` |
| `CROQUIS` | `1xX7Y_y9T0Ah8z60YfPtYiccVnM_SgB9D` | 32 jpeg — hand sketches (`image000NN.jpeg`) | `public/media/sketches/` |
| `VISUELS CAROUSEL` | `1bJDRwmkW2KgczH1G9dVQEynSub5oHfPo` | 9 png — curated hero/carousel selects (mostly dupes of project renders) | `public/media/carousel/` |
| `FONTS` | `1mEpJKQi0RdPHQs44-NzawGyW4R8H6V8q` | 14 ttf — Playfair Display, Abril Fatface, Futura Cyrillic | `app/assets/fonts/` |
| `PDF A EMBED` | `1srzGAZLxCqPXnXDmWSTcHM_asyp_0JXa` | Portfolio 2026 ENG (56 MB), `memoire_Amazon FINAL` (20 MB) | `public/media/pdf/` |
| _root_ | — | `CV_Matthieu_DUVAL_{ENG,FR}.pdf`, `Portfolio Architecture Matthieu 2026 {ENG,FR}.pdf` | `public/media/cv/`, `public/media/pdf/` |

Naming: source files are French and inconsistent (`Copie de …`, `Plan de
travail 1`, spaces, accents). `import-visuals.sh` slugifies to kebab-case ascii
(python3 accent-folding — macOS `iconv //TRANSLIT` truncates at accents, don't
use it). The five project folders are numbered `01`–`05` — preserve that order
as the project sort order on the site.

Fonts: the Drive `FONTS/` set is **Playfair Display**, **Abril Fatface**, and the
**Futura Cyrillic** family. The current type system in `main.css` is a separate,
deliberate three-voice choice — **Playfair Display / Roboto / Space Mono**,
self-hosted by `@nuxt/fonts` (no local `@font-face` needed). The imported ttf
sit in `app/assets/fonts/` as available brand assets; switching body→Futura or
display→Abril is a design decision, not yet wired.
