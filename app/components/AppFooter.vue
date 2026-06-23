<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ year }} {{ t('name') }} — {{ t('rights') }}
      </p>
    </template>

    <template #right>
      <LanguageSwitcher />
    </template>
  </UFooter>
</template>

<i18n lang="json">
{
  "en": {
    "name": "Matthieu",
    "rights": "All rights reserved."
  },
  "fr": {
    "name": "Matthieu",
    "rights": "Tous droits réservés."
  }
}
</i18n>
