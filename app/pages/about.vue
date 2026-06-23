<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('about.title')
})
</script>

<template>
  <UPage>
    <UPageHeader
      :title="t('about.title')"
      :description="t('about.description')"
    />
    <UPageBody>
      <!-- TODO: bio, education, approach -->
    </UPageBody>
  </UPage>
</template>
