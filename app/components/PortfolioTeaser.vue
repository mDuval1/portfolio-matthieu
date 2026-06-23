<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// One strong render stands in for the bound portfolio edition.
const cover = projectImg('05-revelation', 'atrium-000.webp')
</script>

<template>
  <UPageSection :ui="{ container: 'py-12 sm:py-16 border-t border-default' }">
    <div class="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
      <div>
        <p class="font-mono text-xs uppercase tracking-wider text-muted">
          {{ t('eyebrow') }}
        </p>
        <h2 class="mt-3 font-serif text-3xl text-highlighted sm:text-4xl">
          {{ t('title') }}
        </h2>
        <p class="mt-4 max-w-md text-muted">
          {{ t('excerpt') }}
        </p>
        <UButton
          class="mt-6"
          :to="localePath('portfolio')"
          :label="t('cta')"
          trailing-icon="i-lucide-arrow-right"
          size="lg"
        />
      </div>

      <NuxtLinkLocale
        :to="localePath('portfolio')"
        class="block overflow-hidden rounded-[--ui-radius] border border-default"
      >
        <NuxtImg
          :src="cover"
          :alt="t('imageAlt')"
          width="800"
          height="600"
          fit="cover"
          format="webp"
          sizes="100vw md:50vw"
          class="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </NuxtLinkLocale>
    </div>
  </UPageSection>
</template>

<i18n lang="json">
{
  "en": {
    "eyebrow": "Portfolio",
    "title": "The full body of work",
    "excerpt": "A curated set of projects, drawings and competitions — read the complete portfolio as a bound PDF edition.",
    "cta": "Explore the portfolio",
    "imageAlt": "Portfolio cover"
  },
  "fr": {
    "eyebrow": "Portfolio",
    "title": "L'ensemble du travail",
    "excerpt": "Une sélection de projets, dessins et concours — feuilletez le portfolio complet sous forme d'édition PDF reliée.",
    "cta": "Découvrir le portfolio",
    "imageAlt": "Couverture du portfolio"
  }
}
</i18n>
