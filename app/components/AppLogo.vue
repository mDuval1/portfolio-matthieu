<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <span class="inline-flex items-baseline gap-1.5 font-semibold tracking-tight">
    <span class="text-highlighted">{{ t('name') }}</span>
    <span class="text-dimmed text-sm font-normal">{{ t('role') }}</span>
  </span>
</template>

<i18n lang="json">
{
  "en": {
    "name": "Matthieu",
    "role": "Architect"
  },
  "fr": {
    "name": "Matthieu",
    "role": "Architecte"
  }
}
</i18n>
