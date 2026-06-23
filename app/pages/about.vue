<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('title')
})
</script>

<template>
  <UPage>
    <UPageHeader
      :title="t('title')"
      :description="t('description')"
    />
    <UPageBody>
      <!-- TODO: bio, education, approach -->
    </UPageBody>
  </UPage>
</template>

<i18n lang="json">
{
  "en": {
    "title": "About",
    "description": "A young architect working at the intersection of craft, context and care."
  },
  "fr": {
    "title": "À propos",
    "description": "Un jeune architecte à la croisée du métier, du contexte et de l'attention."
  }
}
</i18n>
