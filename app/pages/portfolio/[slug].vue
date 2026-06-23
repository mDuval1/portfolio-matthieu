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
          <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
            <span>{{ project.year }}</span>
            <span v-if="text.location">·</span>
            <span v-if="text.location">{{ text.location }}</span>
          </div>
        </template>
      </UPageHeader>

      <UPageBody>
        <p
          v-if="text.description"
          class="max-w-2xl text-pretty text-muted"
        >
          {{ text.description }}
        </p>

        <UPageColumns class="mt-10">
          <div
            v-for="(file, i) in project.gallery"
            :key="file"
            class="overflow-hidden rounded-[--ui-radius] border border-default"
          >
            <NuxtImg
              :src="projectImg(project.folder, file)"
              :alt="`${text.title} — ${i + 1}`"
              width="900"
              format="webp"
              loading="lazy"
              sizes="100vw sm:50vw lg:33vw"
              class="w-full"
            />
          </div>
        </UPageColumns>

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
