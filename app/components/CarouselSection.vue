<script setup lang="ts">
const { t, locale } = useI18n()

// Every curated carousel select becomes its own slide, tagged with its project's
// title / location / timeframe. Latest project first.
const slides = computed(() =>
  projectsByDate().flatMap((p) => {
    const text = projectText(p.slug, locale.value)
    return p.carousel.map(file => ({
      slug: p.slug,
      src: carouselImg(file),
      title: text.title,
      location: text.location,
      dates: text.dates
    }))
  })
)
</script>

<template>
  <UPageSection :ui="{ container: 'pt-6 pb-12 sm:pt-8 sm:pb-16' }">
    <div class="reveal max-w-2xl">
      <h2 class="font-serif text-3xl text-highlighted sm:text-4xl">
        {{ t('title') }}
      </h2>
      <p class="mt-3 text-muted">
        {{ t('description') }}
      </p>
    </div>

    <UCarousel
      v-slot="{ item }"
      :items="slides"
      :autoplay="{ delay: 5000 }"
      loop
      arrows
      align="start"
      class="mt-8"
      :ui="{ item: 'basis-4/5 sm:basis-1/2 lg:basis-1/3' }"
    >
      <ProjectCard
        :slug="item.slug"
        :src="item.src"
        :title="item.title"
        :location="item.location"
        :dates="item.dates"
        layout="carousel"
      />
    </UCarousel>
  </UPageSection>
</template>

<i18n lang="json">
{
  "en": {
    "title": "My projects",
    "description": "A selection of projects that reflect how I think about form, material, use and place."
  },
  "fr": {
    "title": "Mes projets",
    "description": "Une sélection de projets qui témoignent de ma manière de penser la forme, la matière, les usages, le lieu."
  }
}
</i18n>
