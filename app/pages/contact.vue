<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('contact.title')
})
</script>

<template>
  <UPage>
    <UPageHeader
      :title="t('contact.title')"
      :description="t('contact.description')"
    />
    <UPageBody>
      <UButton
        to="mailto:hello@example.com"
        icon="i-lucide-mail"
        :label="t('contact.email')"
        size="lg"
      />
    </UPageBody>
  </UPage>
</template>
