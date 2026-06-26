// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@nuxt/image'],

  devtools: {
    enabled: true
  },

  // Native page transitions: fade + slight slide-up between routes (CSS in
  // main.css under `.page-*`). out-in so the old page leaves before the new
  // enters — no overlap, no layout shift.
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  // Light-only site: disable Nuxt UI's color mode entirely. This skips the
  // @nuxtjs/color-mode install (no inline <head> theme script, no `.dark`
  // toggling) and registers stub `useColorMode` composables instead.
  ui: {
    colorMode: false
  },

  compatibilityDate: '2025-01-15',

  // Static Site Generation: `nuxt generate` prerenders every route.
  // crawlLinks follows <NuxtLink>s so all locale + content pages are captured.
  nitro: {
    prerender: {
      crawlLinks: true,
      // crawlLinks discovers most routes from in-page links; these are listed
      // explicitly as a safety net for both locales (incl. project detail pages).
      routes: [
        '/', '/fr',
        '/portfolio', '/fr/portfolio',
        '/sketches', '/fr/sketches',
        '/resume', '/fr/resume',
        '/about', '/fr/about',
        '/portfolio/philopolis', '/fr/portfolio/philopolis',
        '/portfolio/bahanaaue', '/fr/portfolio/bahanaaue',
        '/portfolio/palimpseste', '/fr/portfolio/palimpseste',
        '/portfolio/pesanteur-grace', '/fr/portfolio/pesanteur-grace',
        '/portfolio/revelation', '/fr/portfolio/revelation'
      ],
      failOnError: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    // Production URL — used for hreflang/canonical SEO tags. Override via env.
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'fr', name: 'Français', language: 'fr-FR', file: 'fr.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // Responsive WebP variants. For SSG the provider MUST be `ipxStatic`: it bakes
  // the /_ipx/ variants into .output/public at `nuxt generate` (sharp, build-time),
  // because a static host has no runtime IPX server to transform on the fly.
  // In `dev` there is no build step, so `ipxStatic` serves nothing and every
  // <NuxtImg> 404s — use the runtime `ipx` provider there instead so images show.
  image: {
    provider: process.env.NODE_ENV === 'production' ? 'ipxStatic' : 'ipx',
    format: ['webp'],
    quality: 70
  }
})
