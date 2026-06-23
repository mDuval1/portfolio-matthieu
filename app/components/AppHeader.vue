<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('nav.home'), to: localePath('index') },
  { label: t('nav.projects'), to: localePath('projects') },
  { label: t('nav.about'), to: localePath('about') },
  { label: t('nav.contact'), to: localePath('contact') }
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
