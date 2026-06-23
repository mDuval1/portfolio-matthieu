<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const items = computed<DropdownMenuItem[]>(() =>
  locales.value.map(l => ({
    label: l.name ?? l.code,
    to: switchLocalePath(l.code),
    checked: l.code === locale.value,
    type: 'checkbox' as const
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
