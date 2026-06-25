<script setup lang="ts">
// Project tile used by the projects grid and the homepage carousel. Image fitting
// is per-surface: the portfolio index grid uses object-cover (carousel covers fill
// the 4:3 frame edge to edge, no letterboxing) while the carousel keeps
// object-contain (zero crop). Project detail pages and the lightbox are separate
// components and remain object-contain. The hover scale is applied to the image
// only, inside an overflow-hidden frame, so the grid never shifts.
withDefaults(defineProps<{
  slug: string
  src: string
  title: string
  typology?: string
  location?: string
  dates?: string
  layout?: 'grid' | 'carousel'
}>(), {
  layout: 'grid'
})

const localePath = useLocalePath()
</script>

<template>
  <NuxtLinkLocale
    :to="localePath({ name: 'portfolio-slug', params: { slug } })"
    class="group block"
  >
    <div class="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[--ui-radius] border border-default bg-elevated">
      <NuxtImg
        :src="src"
        :alt="title"
        width="600"
        height="450"
        :fit="layout === 'grid' ? 'cover' : 'contain'"
        format="webp"
        loading="lazy"
        sizes="90vw sm:45vw lg:30vw"
        :class="[
          layout === 'grid' ? 'object-cover' : 'object-contain',
          'h-full w-full transition-transform duration-500 group-hover:scale-[1.02]'
        ]"
      />
    </div>

    <!-- Grid: stacked column — title, then metadata, then typology — each on its
         own line, wrapping within the card (image) width. -->
    <div
      v-if="layout === 'grid'"
      class="mt-3 flex flex-col gap-1"
    >
      <p class="text-balance font-serif text-lg leading-snug text-highlighted">
        {{ title }}
      </p>
      <p
        v-if="location || dates"
        class="font-sans text-xs uppercase tracking-wider text-muted"
      >
        {{ [location, dates].filter(Boolean).join(' · ') }}
      </p>
      <p
        v-if="typology"
        class="text-pretty font-sans text-sm text-muted"
      >
        {{ typology }}
      </p>
    </div>

    <!-- Carousel: title, then location (smaller), then timeframe (smaller still). -->
    <div
      v-else
      class="mt-3"
    >
      <p class="font-serif text-lg text-highlighted">
        {{ title }}
      </p>
      <p
        v-if="location"
        class="mt-0.5 font-sans text-sm text-muted"
      >
        {{ location }}
      </p>
      <p
        v-if="dates"
        class="font-sans text-xs text-dimmed"
      >
        {{ dates }}
      </p>
    </div>
  </NuxtLinkLocale>
</template>
