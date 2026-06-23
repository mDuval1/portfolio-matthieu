<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale, locales, setLocale, t } = useI18n()

// setLocale() writes the i18n_redirected cookie *then* navigates, so the
// default-locale redirect guard on "/" no longer bounces back. A plain
// switchLocalePath link changed the URL but left the cookie stale.
const items = computed<DropdownMenuItem[]>(() =>
  locales.value.map(l => ({
    label: l.name ?? l.code,
    trailingIcon: l.code === locale.value ? 'i-lucide-check' : undefined,
    onSelect: () => setLocale(l.code)
  }))
)
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end' }"
  >
    <UButton
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      :aria-label="t('switch')"
    />
  </UDropdownMenu>
</template>

<i18n lang="json">
{
  "en": {
    "switch": "Change language"
  },
  "fr": {
    "switch": "Changer de langue"
  }
}
</i18n>
