<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ year }} {{ t('site.name') }} — {{ t('footer.rights') }}
      </p>
    </template>

    <template #right>
      <LanguageSwitcher />
    </template>
  </UFooter>
</template>
