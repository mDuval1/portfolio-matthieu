<script setup lang="ts">
defineProps<{
  slug: string
  src: string
  title: string
  meta?: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLinkLocale
    :to="localePath({ name: 'portfolio-slug', params: { slug } })"
    class="group block"
  >
    <div class="aspect-[4/3] overflow-hidden rounded-[--ui-radius] border border-default bg-elevated">
      <NuxtImg
        :src="src"
        :alt="title"
        width="600"
        height="450"
        fit="cover"
        format="webp"
        loading="lazy"
        sizes="90vw sm:45vw lg:30vw"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <div class="mt-3 flex items-baseline justify-between gap-3">
      <p class="font-serif text-lg text-highlighted">
        {{ title }}
      </p>
      <p
        v-if="meta"
        class="font-mono text-xs uppercase tracking-wider text-muted"
      >
        {{ meta }}
      </p>
    </div>
  </NuxtLinkLocale>
</template>
