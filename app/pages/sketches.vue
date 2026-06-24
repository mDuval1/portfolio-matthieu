<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('description')
})

// City/country/title are localized; date is ISO and formatted per locale.
const tr = (l: { fr: string, en: string }) => (locale.value === 'fr' ? l.fr : l.en)
const place = (s: (typeof sketches)[number]) =>
  s.city ? `${tr(s.city)}, ${tr(s.country)}` : tr(s.country)
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="t('title')"
        :description="t('description')"
      />
      <UPageBody>
        <UPageColumns>
          <figure
            v-for="sketch in sketches"
            :key="sketch.file"
            class="break-inside-avoid"
          >
            <div class="overflow-hidden rounded-[--ui-radius] border border-default bg-elevated">
              <NuxtImg
                :src="sketchImg(sketch.file)"
                :alt="tr(sketch.title)"
                width="700"
                format="webp"
                loading="lazy"
                sizes="100vw sm:50vw lg:33vw"
                class="w-full"
              />
            </div>
            <figcaption class="px-1 pt-2 pb-1">
              <p class="text-xs uppercase tracking-wide text-muted">
                {{ place(sketch) }}
              </p>
              <p class="font-serif text-default">
                {{ tr(sketch.title) }}
              </p>
              <p class="text-xs text-dimmed">
                {{ longDate(sketch.date) }}
              </p>
            </figcaption>
          </figure>
        </UPageColumns>
      </UPageBody>
    </UPage>
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
