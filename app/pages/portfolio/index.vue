<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('description')
})

const cards = computed(() =>
  projectsByDate().map((p) => {
    const text = projectText(p.slug, locale.value)
    return {
      slug: p.slug,
      src: projectImg(p.folder, p.hero),
      title: text.title,
      typology: text.typology,
      location: text.location,
      dates: text.dates
    }
  })
)
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="t('title')"
        :description="t('description')"
      />
      <UPageBody>
        <UPageGrid>
          <ProjectCard
            v-for="card in cards"
            :key="card.slug"
            :slug="card.slug"
            :src="card.src"
            :title="card.title"
            :typology="card.typology"
            :location="card.location"
            :dates="card.dates"
          />
        </UPageGrid>

        <USeparator class="my-12" />

        <PdfEdition
          :title="t('edition.title')"
          :description="t('edition.description')"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "My projects",
    "description": "A selection of work pairing architectural sensibility with technical rigour.",
    "edition": {
      "title": "The bound edition",
      "description": "Browse my complete portfolio in editorial format. A concise compendium of every project."
    }
  },
  "fr": {
    "title": "Mes projets",
    "description": "Une sélection de travaux alliant sensibilité architecturale et rigueur technique.",
    "edition": {
      "title": "L'Édition Reliée",
      "description": "Parcourez l'intégralité de mon portfolio au format éditorial. Un recueil synthétique de chaque projet."
    }
  }
}
</i18n>
