// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@nuxt/image'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

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

  // Responsive WebP variants generated at `nuxt generate` (IPX provider, sharp).
  // Source images are already WebP from scripts/import-visuals.sh.
  image: {
    format: ['webp'],
    quality: 70
  }
})
