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
