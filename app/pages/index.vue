<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('nav.home')
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('home.hero.title')"
      :description="t('home.hero.description')"
      :links="[
        {
          label: t('home.hero.ctaPrimary'),
          to: localePath('projects'),
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl'
        },
        {
          label: t('home.hero.ctaSecondary'),
          to: localePath('contact'),
          size: 'xl',
          color: 'neutral',
          variant: 'subtle'
        }
      ]"
    />

    <UPageSection
      :title="t('home.selected.title')"
      :description="t('home.selected.description')"
    />
  </div>
</template>
