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
    <UPageSection :ui="{ container: 'pt-16 pb-2 sm:pt-24 sm:pb-4' }">
      <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div class="reveal max-w-xl">
          <h1 class="font-serif text-5xl tracking-tight text-highlighted sm:text-6xl lg:text-7xl">
            {{ t('hero.title') }}
          </h1>
          <p class="mt-4 font-serif text-lg text-toned">
            {{ t('hero.subtitle') }}
          </p>
          <!-- {loci} slot italicises the Latin term without putting HTML in the
               translation message (unplugin-vue-i18n rejects HTML in messages). -->
          <i18n-t
            keypath="hero.body"
            tag="p"
            class="prose-justify mt-6 text-pretty text-muted"
          >
            <template #loci>
              <em>genius loci</em>
            </template>
          </i18n-t>
        </div>
        <div class="flex justify-center lg:justify-end">
          <NuxtImg
            :src="coverImg"
            :alt="t('hero.imageAlt')"
            width="900"
            format="webp"
            sizes="100vw lg:45vw"
            data-parallax="0.06"
            class="shadow-magazine max-h-[78vh] w-auto rounded-[--ui-radius] border border-default object-contain"
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
      "body": "At the intersection of architecture and engineering, my approach refuses to compromise between spatial ambition and structural rigor. Committed to bioclimatic design and critical neo-regionalism, I envision each project as a framework in direct dialogue with its environment. It is a sensitive and measured architecture, deeply attuned to the {loci}, where rich materiality intimately engages with the lines of its volumes.",
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
      "body": "À la croisée entre l'architecture et l'ingénierie, mon approche de la conception architecturale refuse le compromis entre l'ambition spatiale et la rigueur constructive. Engagé en faveur d'une conception bioclimatique et d'un néo-régionalisme critique, j'envisage chaque projet comme une matrice en dialogue direct avec son environnement. Une architecture sensible et mesurée, à l'écoute du {loci}, dont la riche matérialité dialogue intimement avec les lignes de ses volumes.",
      "imageAlt": "Couverture du portfolio"
    },
    "portfolio": {
      "title": "Portfolio",
      "description": "Une version synthétique de mon travail - sous la forme d'un livret téléchargeable."
    }
  }
}
</i18n>
