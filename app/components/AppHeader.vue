<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('home'), to: localePath('index') },
  { label: t('projects'), to: localePath('projects') },
  { label: t('about'), to: localePath('about') },
  { label: t('contact'), to: localePath('contact') }
])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLinkLocale to="index">
        <AppLogo />
      </NuxtLinkLocale>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <LanguageSwitcher />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>

<i18n lang="json">
{
  "en": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "contact": "Contact"
  },
  "fr": {
    "home": "Accueil",
    "projects": "Projets",
    "about": "À propos",
    "contact": "Contact"
  }
}
</i18n>
