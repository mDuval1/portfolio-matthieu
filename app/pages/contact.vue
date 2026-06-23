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
      <UButton
        to="mailto:hello@example.com"
        icon="i-lucide-mail"
        :label="t('email')"
        size="lg"
      />
    </UPageBody>
  </UPage>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Contact",
    "description": "For commissions, collaborations or a coffee — reach out.",
    "email": "Email"
  },
  "fr": {
    "title": "Contact",
    "description": "Pour une commande, une collaboration ou un café — écrivez-moi.",
    "email": "E-mail"
  }
}
</i18n>
