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
      <!-- TODO: project grid -->
    </UPageBody>
  </UPage>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Projects",
    "description": "Built and conceptual work, from private homes to public space."
  },
  "fr": {
    "title": "Projets",
    "description": "Travaux construits et conceptuels, de la maison privée à l'espace public."
  }
}
</i18n>
