<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('projects.title')
})
</script>

<template>
  <UPage>
    <UPageHeader
      :title="t('projects.title')"
      :description="t('projects.description')"
    />
    <UPageBody>
      <!-- TODO: project grid -->
    </UPageBody>
  </UPage>
</template>
