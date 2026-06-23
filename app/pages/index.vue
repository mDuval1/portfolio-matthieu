<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('title')
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('hero.title')"
      :description="t('hero.description')"
      :links="[
        {
          label: t('cta.projects'),
          to: localePath('projects'),
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl'
        },
        {
          label: t('cta.contact'),
          to: localePath('contact'),
          size: 'xl',
          color: 'neutral',
          variant: 'subtle'
        }
      ]"
    />

    <UPageSection
      :title="t('selected.title')"
      :description="t('selected.description')"
    />
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Home",
    "hero": {
      "title": "Designing spaces that breathe",
      "description": "Architecture that pairs light, material and restraint. A selection of built and conceptual work."
    },
    "cta": {
      "projects": "View projects",
      "contact": "Get in touch"
    },
    "selected": {
      "title": "Selected work",
      "description": "A few projects that capture how I think about form, function and place."
    }
  },
  "fr": {
    "title": "Accueil",
    "hero": {
      "title": "Concevoir des espaces qui respirent",
      "description": "Une architecture qui associe lumière, matière et sobriété. Une sélection de projets construits et conceptuels."
    },
    "cta": {
      "projects": "Voir les projets",
      "contact": "Me contacter"
    },
    "selected": {
      "title": "Projets sélectionnés",
      "description": "Quelques projets qui révèlent ma façon de penser la forme, l'usage et le lieu."
    }
  }
}
</i18n>
