<script setup lang="ts">
const { t, locale } = useI18n()

// One card per curated carousel select, preserving project order (the wireframe's
// "project 1 / subproject 1 …" row).
const cards = computed(() =>
  projectsByOrder().flatMap(p =>
    p.carousel.map(file => ({
      slug: p.slug,
      src: carouselImg(file),
      title: projectText(p.slug, locale.value).title,
      meta: p.year
    }))
  )
)
</script>

<template>
  <UPageSection
    :title="t('title')"
    :description="t('description')"
    :ui="{ container: 'py-12 sm:py-16' }"
  >
    <UCarousel
      v-slot="{ item }"
      :items="cards"
      arrows
      drag-free
      align="start"
      :ui="{ item: 'basis-4/5 sm:basis-1/2 lg:basis-1/3' }"
    >
      <ProjectCard
        :slug="item.slug"
        :src="item.src"
        :title="item.title"
        :meta="item.meta"
      />
    </UCarousel>
  </UPageSection>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Selected work",
    "description": "A few projects that capture how I think about form, function and place."
  },
  "fr": {
    "title": "Projets sélectionnés",
    "description": "Quelques projets qui révèlent ma façon de penser la forme, l'usage et le lieu."
  }
}
</i18n>
