<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = computed(() => String(route.params.slug))
const project = computed(() => getProject(slug.value))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const text = computed(() => projectText(slug.value, locale.value))
const siblings = computed(() => adjacentProjects(slug.value))

// Meta line: location · typology · timeframe (omit blanks).
const metaLine = computed(() =>
  [text.value.location, text.value.typology, text.value.dates].filter(Boolean).join(' · ')
)

// Gallery items, in source order. Caption + lightbox text come from an optional
// bilingual per-image override, falling back to a humanized filename.
const tr = (l?: LocalizedText) => (l ? (locale.value === 'fr' ? l.fr : l.en) : undefined)
const gallery = computed(() => {
  const p = project.value!
  return p.gallery.map((file) => {
    const override = p.captions?.[file]
    return {
      file,
      src: projectImg(p.folder, file),
      title: tr(override?.title) ?? humanizeFilename(file),
      text: tr(override?.text)
    }
  })
})

const lightboxIndex = ref(-1)

useSeoMeta({
  title: () => text.value.title,
  description: () => text.value.summary
})
</script>

<template>
  <UContainer v-if="project">
    <UPage>
      <UPageHeader
        :title="text.title"
        :description="text.summary"
      >
        <template #headline>
          <p
            v-if="metaLine"
            class="font-sans text-sm uppercase tracking-wider text-muted"
          >
            {{ metaLine }}
          </p>
        </template>
      </UPageHeader>

      <UPageBody>
        <!-- Chaptered grid: strict source order, permanent captions, no obscuring hover. -->
        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <figure
            v-for="(item, i) in gallery"
            :key="item.file"
          >
            <button
              type="button"
              class="group block w-full cursor-zoom-in"
              @click="lightboxIndex = i"
            >
              <div class="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[--ui-radius] border border-default bg-elevated transition-colors group-hover:border-accented">
                <NuxtImg
                  :src="item.src"
                  :alt="item.title"
                  width="900"
                  fit="contain"
                  format="webp"
                  loading="lazy"
                  sizes="100vw sm:50vw lg:33vw"
                  class="h-full w-full object-contain"
                />
              </div>
              <figcaption class="mt-2 text-left text-xs text-dimmed">
                {{ item.title }}
              </figcaption>
            </button>
          </figure>
        </div>

        <USeparator class="my-12" />

        <div class="flex items-center justify-between gap-4">
          <UButton
            v-if="siblings.prev"
            :to="localePath({ name: 'portfolio-slug', params: { slug: siblings.prev.slug } })"
            :label="t('prev')"
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="ghost"
          />
          <UButton
            :to="localePath('portfolio')"
            :label="t('overview')"
            color="neutral"
            variant="subtle"
          />
          <UButton
            v-if="siblings.next"
            :to="localePath({ name: 'portfolio-slug', params: { slug: siblings.next.slug } })"
            :label="t('next')"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="ghost"
          />
        </div>
      </UPageBody>
    </UPage>

    <GalleryLightbox
      v-model="lightboxIndex"
      :items="gallery"
    />
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "prev": "Previous",
    "next": "Next",
    "overview": "All projects"
  },
  "fr": {
    "prev": "Précédent",
    "next": "Suivant",
    "overview": "Tous les projets"
  }
}
</i18n>
