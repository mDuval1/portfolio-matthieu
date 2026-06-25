<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('hero.subtitle')
})
</script>

<template>
  <div>
    <!-- Hero — name + dual title + statement, with the portfolio cover alongside. -->
    <UPageSection :ui="{ container: 'pt-16 pb-8 sm:pt-24 sm:pb-12' }">
      <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div class="max-w-xl">
          <h1 class="font-serif text-5xl tracking-tight text-highlighted sm:text-6xl lg:text-7xl">
            {{ t('hero.title') }}
          </h1>
          <p class="mt-4 font-sans text-lg text-toned">
            {{ t('hero.subtitle') }}
          </p>
          <p class="prose-justify mt-6 text-pretty text-muted">
            {{ t('hero.body') }}
          </p>
        </div>
        <div class="flex justify-center lg:justify-end">
          <NuxtImg
            :src="coverImg"
            :alt="t('hero.imageAlt')"
            width="900"
            format="webp"
            sizes="100vw lg:45vw"
            class="max-h-[78vh] w-auto rounded-[--ui-radius] border border-default object-contain"
          />
        </div>
      </div>
    </UPageSection>

    <!-- Carousel of projects -->
    <CarouselSection />

    <!-- Downloadable portfolio booklet -->
    <UPageSection :ui="{ container: 'py-12 sm:py-16 border-t border-default' }">
      <PdfEdition
        :title="t('portfolio.title')"
        :description="t('portfolio.description')"
      />
    </UPageSection>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Home",
    "hero": {
      "title": "Matthieu Duval",
      "subtitle": "Architect (ENSA Lyon) & Engineer (INSA Lyon)",
      "body": "My dual training as architect and engineer lets me reconcile architectural ambition with the reality of engineering constraints. My personal stance is rooted in the pursuit of a critical neo-regionalism and bioclimatic design — a sensitive architecture, deeply respectful of the genius of place, where the poetry of material accompanies that of form.",
      "imageAlt": "Portfolio cover"
    },
    "portfolio": {
      "title": "Portfolio",
      "description": "A concise version of my work — as a downloadable booklet."
    }
  },
  "fr": {
    "title": "Accueil",
    "hero": {
      "title": "Matthieu Duval",
      "subtitle": "Architecte (ENSA Lyon) & Ingénieur (INSA Lyon)",
      "body": "Ma double formation d'architecte et d'ingénieur me permet de concilier l'ambition architecturale avec la réalité des contraintes d'ingénierie. Ma posture personnelle s'ancre dans la poursuite d'un néo-régionalisme critique et d'une conception bioclimatique. Une architecture sensible, profondément respectueuse du génie du lieu - dont la poésie de la matière accompagne celle de la forme.",
      "imageAlt": "Couverture du portfolio"
    },
    "portfolio": {
      "title": "Portfolio",
      "description": "Une version synthétique de mon travail - sous la forme d'un livret téléchargeable."
    }
  }
}
</i18n>
