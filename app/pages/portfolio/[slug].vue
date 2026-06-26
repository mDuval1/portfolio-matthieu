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
const tr = (l?: LocalizedText) => (l ? (locale.value === 'fr' ? l.fr : (l.en ?? l.fr)) : undefined)
const gallery = computed(() => {
  const p = project.value!
  // Ascending by leading number (sketch → final render); a hand-curated array
  // with no numbers passes through in its existing order.
  return byLeadingNumber(p.gallery, f => f).map((file) => {
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
      <UPageBody>
        <!-- Hero: H1 title → H2 subtitle → metadata → résumé, then the grid. -->
        <header class="mb-12 max-w-3xl sm:mb-16">
          <h1 class="font-serif text-3xl leading-tight text-highlighted sm:text-4xl lg:text-5xl">
            {{ text.title }}
          </h1>
          <h2
            v-if="text.subtitle"
            class="mt-3 font-serif text-lg font-light leading-relaxed text-toned sm:text-xl"
          >
            {{ text.subtitle }}
          </h2>
          <p
            v-if="metaLine"
            class="mt-5 font-serif text-sm uppercase tracking-wider text-muted"
          >
            {{ metaLine }}
          </p>
          <p
            v-if="text.summary"
            class="prose-justify mt-5 text-pretty leading-relaxed text-muted"
          >
            {{ text.summary }}
          </p>
        </header>

        <!-- Numbered ascending order, permanent captions, no obscuring hover. -->
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
            </button>
            <figcaption class="mt-2 text-left text-xs text-dimmed">
              {{ item.title }}
            </figcaption>
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
