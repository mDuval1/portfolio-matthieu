<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <span class="inline-flex items-baseline gap-1.5 font-semibold tracking-tight">
    <span class="text-highlighted">{{ t('site.name') }}</span>
    <span class="text-dimmed text-sm font-normal">{{ t('site.role') }}</span>
  </span>
</template>
