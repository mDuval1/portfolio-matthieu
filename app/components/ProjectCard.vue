<script setup lang="ts">
// Project tile used by the projects grid and the homepage carousel. The image is
// object-contain (zero crop / zero distortion — the architect's hard rule); the
// hover scale is applied to the image only, inside an overflow-hidden frame, so
// the grid never shifts. Metadata layout differs per surface (see `layout`).
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
        fit="contain"
        format="webp"
        loading="lazy"
        sizes="90vw sm:45vw lg:30vw"
        class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>

    <!-- Grid: title left, location+date right; typology below the title. -->
    <div
      v-if="layout === 'grid'"
      class="mt-3"
    >
      <div class="flex items-baseline justify-between gap-3">
        <p class="font-serif text-lg text-highlighted">
          {{ title }}
        </p>
        <p
          v-if="location || dates"
          class="shrink-0 text-right font-sans text-xs uppercase tracking-wider text-muted"
        >
          {{ [location, dates].filter(Boolean).join(' · ') }}
        </p>
      </div>
      <p
        v-if="typology"
        class="mt-0.5 font-sans text-sm text-muted"
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
