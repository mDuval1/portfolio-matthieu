<script setup lang="ts">
const { t, locale } = useI18n()
const head = useLocaleHead()

useHead({
  htmlAttrs: { lang: () => locale.value },
  link: [{ rel: 'icon', href: '/favicon.ico' }, ...(head.value.link ?? [])],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(head.value.meta ?? [])
  ]
})

useSeoMeta({
  titleTemplate: title => title ? `${title} — ${t('site.name')}` : `${t('site.name')} · ${t('site.role')}`,
  description: () => t('home.hero.description'),
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
