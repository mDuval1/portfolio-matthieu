<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('description')
})

// City/country/title are localized; date is ISO and formatted per locale.
const tr = (l: { fr: string, en: string }) => (locale.value === 'fr' ? l.fr : l.en)
const place = (s: Sketch) => (s.city ? `${tr(s.city)}, ${tr(s.country)}` : tr(s.country))
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

// Newest first (descending chronological order).
const ordered = computed(() => sketchesByDate())

// Lightbox: same index space as the grid, so prev/next walk the sorted array.
// eyebrow/title/text mirror the grid caption (location · title · date).
const lightboxItems = computed(() =>
  ordered.value.map(s => ({
    src: sketchImg(s.file),
    eyebrow: place(s),
    title: tr(s.title),
    text: longDate(s.date)
  }))
)
const lightboxIndex = ref(-1)
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="t('title')"
        :description="t('description')"
      />
      <UPageBody>
        <!-- Row-major CSS grid: items flow left→right then wrap to the next row, so
             the descending chronological order reads horizontally (column-based
             masonry filled top-to-bottom first, breaking that order). auto-fill +
             minmax keeps ~3 columns on desktop; items-start aligns each figure to
             the top of its row. -->
        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] items-start gap-8">
          <figure
            v-for="(sketch, i) in ordered"
            :key="sketch.file"
          >
            <!-- Clickable thumbnail: subtle hover zoom on the image only, clipped by
                 the overflow-hidden frame so the grid never shifts. -->
            <button
              type="button"
              class="group block w-full cursor-zoom-in overflow-hidden rounded-[--ui-radius] border border-default bg-elevated"
              @click="lightboxIndex = i"
            >
              <NuxtImg
                :src="sketchImg(sketch.file)"
                :alt="tr(sketch.title)"
                width="700"
                format="webp"
                loading="lazy"
                sizes="100vw sm:50vw lg:33vw"
                class="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
            <figcaption class="px-1 pt-2 pb-1">
              <p class="font-serif text-xs uppercase tracking-wide text-muted">
                {{ place(sketch) }}
              </p>
              <p class="font-serif text-default">
                {{ tr(sketch.title) }}
              </p>
              <p class="font-serif text-xs text-dimmed">
                {{ longDate(sketch.date) }}
              </p>
            </figcaption>
          </figure>
        </div>
      </UPageBody>
    </UPage>

    <GalleryLightbox
      v-model="lightboxIndex"
      :items="lightboxItems"
    />
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Sketches",
    "description": "Discovering the world through drawing — to each destination its keepsake."
  },
  "fr": {
    "title": "Croquis",
    "description": "Découvrir le monde par le dessin — à chaque destination son souvenir."
  }
}
</i18n>
