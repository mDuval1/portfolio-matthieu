<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

// Project order follows the 01–05 numbering of the source folders.
const projects = ['philopolis', 'bahanaaue', 'palimpseste', 'pesanteur-grace', 'revelation']

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('portfolio'),
    to: localePath('portfolio'),
    children: projects.map(slug => ({
      label: t(`projects.${slug}`),
      to: localePath(`/portfolio/${slug}`)
    }))
  },
  { label: t('cv'), to: localePath('resume') },
  { label: t('sketches'), to: localePath('sketches') },
  { label: t('about'), to: localePath('about') }
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
    "portfolio": "Portfolio",
    "cv": "CV",
    "sketches": "Sketches",
    "about": "About",
    "projects": {
      "philopolis": "Philopolis",
      "bahanaaue": "Bahanaaue",
      "palimpseste": "Palimpseste",
      "pesanteur-grace": "Weight and Grace",
      "revelation": "Revelation"
    }
  },
  "fr": {
    "portfolio": "Portfolio",
    "cv": "CV",
    "sketches": "Croquis",
    "about": "À propos",
    "projects": {
      "philopolis": "Philopolis",
      "bahanaaue": "Bahanaaue",
      "palimpseste": "Palimpseste",
      "pesanteur-grace": "La Pesanteur et la Grâce",
      "revelation": "Révélation"
    }
  }
}
</i18n>
