<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('hero.tagline')
})
</script>

<template>
  <div>
    <!-- Hero — left-aligned editorial wordmark -->
    <UPageSection :ui="{ container: 'pt-16 pb-8 sm:pt-24 sm:pb-12' }">
      <div class="max-w-3xl">
        <h1 class="font-serif text-5xl text-highlighted tracking-tight sm:text-6xl lg:text-7xl">
          {{ t('hero.title') }}
        </h1>
        <p class="mt-6 max-w-xl text-lg text-muted">
          {{ t('hero.tagline') }}
        </p>
      </div>
    </UPageSection>

    <!-- Carousel of projects -->
    <CarouselSection />

    <!-- Portfolio teaser (link / excerpts) -->
    <PortfolioTeaser />
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Home",
    "hero": {
      "title": "Matthieu Duval, architect",
      "tagline": "Architecture between craft, context and care — a selection of built and conceptual work."
    }
  },
  "fr": {
    "title": "Accueil",
    "hero": {
      "title": "Matthieu Duval, architecte",
      "tagline": "Une architecture entre métier, contexte et attention — une sélection de projets construits et conceptuels."
    }
  }
}
</i18n>
