<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('description')
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
          <div
            v-for="(file, i) in sketches"
            :key="file"
            class="overflow-hidden rounded-[--ui-radius] border border-default bg-elevated"
          >
            <NuxtImg
              :src="sketchImg(file)"
              :alt="`${t('alt')} ${i + 1}`"
              width="700"
              format="webp"
              loading="lazy"
              sizes="100vw sm:50vw lg:33vw"
              class="w-full"
            />
          </div>
        </UPageColumns>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Sketches",
    "description": "Hand drawings and studies — a running notebook of observation.",
    "alt": "Sketch"
  },
  "fr": {
    "title": "Croquis",
    "description": "Dessins à la main et études — un carnet d'observation au fil de l'eau.",
    "alt": "Croquis"
  }
}
</i18n>
