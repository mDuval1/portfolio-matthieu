<script setup lang="ts">
const { t, locale } = useI18n()
const head = useLocaleHead()

useHead({
  htmlAttrs: { lang: () => locale.value },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', sizes: '32x32', href: '/favicon.ico' },
    ...(head.value.link ?? [])
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(head.value.meta ?? [])
  ]
})

useSeoMeta({
  titleTemplate: title => title ? `${title} — ${t('name')}` : `${t('name')} · ${t('role')}`,
  description: () => t('description'),
  ogType: 'website'
})
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>

<i18n lang="json">
{
  "en": {
    "name": "Matthieu",
    "role": "Architect",
    "description": "Architecture that pairs light, material and restraint — selected built and conceptual work by Matthieu, architect."
  },
  "fr": {
    "name": "Matthieu",
    "role": "Architecte",
    "description": "Une architecture qui associe lumière, matière et sobriété — sélection de projets construits et conceptuels de Matthieu, architecte."
  }
}
</i18n>
