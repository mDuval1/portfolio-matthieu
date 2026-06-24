<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('description')
})

const data = computed(() => resume[locale.value === 'fr' ? 'fr' : 'en'])
const cv = computed(() => cvPdf[locale.value === 'fr' ? 'fr' : 'en'])
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="t('title')"
        :description="t('headline')"
      >
        <template #links>
          <UButton
            :to="cv"
            external
            :download="`cv-matthieu-duval-${locale}.pdf`"
            icon="i-lucide-download"
            :label="t('download')"
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <div class="space-y-12">
          <!-- Experience -->
          <section>
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('experience') }}
            </h2>
            <div class="mt-5 space-y-8">
              <article
                v-for="(e, i) in data.experience"
                :key="i"
              >
                <div class="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 class="text-lg font-medium text-highlighted">
                    {{ e.title }}
                  </h3>
                  <span class="text-xs text-dimmed">{{ e.date }}</span>
                </div>
                <p class="text-sm text-toned">
                  {{ e.org }} — {{ e.location }}
                </p>
                <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  <li
                    v-for="(pt, j) in e.points"
                    :key="j"
                  >
                    {{ pt }}
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <!-- Education -->
          <section>
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('education') }}
            </h2>
            <div class="mt-5 space-y-8">
              <article
                v-for="(e, i) in data.education"
                :key="i"
              >
                <div class="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 class="text-lg font-medium text-highlighted">
                    {{ e.title }}
                  </h3>
                  <span class="text-xs text-dimmed">{{ e.date }}</span>
                </div>
                <p class="text-sm text-toned">
                  {{ e.org }} — {{ e.location }}
                </p>
                <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  <li
                    v-for="(pt, j) in e.points"
                    :key="j"
                  >
                    {{ pt }}
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <!-- Skills -->
          <section>
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('skills') }}
            </h2>
            <dl class="mt-5 space-y-3">
              <div
                v-for="(g, i) in data.skills"
                :key="i"
                class="grid gap-1 sm:grid-cols-[12rem_1fr]"
              >
                <dt class="text-sm font-medium text-highlighted">
                  {{ g.label }}
                </dt>
                <dd class="text-sm text-muted">
                  {{ g.items }}
                </dd>
              </div>
            </dl>
          </section>

          <!-- Competitions -->
          <section>
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('competitions') }}
            </h2>
            <ul class="mt-5 space-y-2">
              <li
                v-for="(c, i) in data.competitions"
                :key="i"
                class="flex items-baseline justify-between gap-4 text-sm"
              >
                <span class="text-highlighted">{{ c.title }}</span>
                <span class="text-xs text-dimmed">{{ c.date }}</span>
              </li>
            </ul>
          </section>

          <!-- Interests -->
          <section>
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('interests') }}
            </h2>
            <p class="mt-3 text-sm text-muted">
              {{ data.interests }}
            </p>
          </section>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "CV",
    "description": "Education, experience and references.",
    "headline": "Architect (graduate of ENSA Lyon) and Civil Engineer (graduate of INSA Lyon).",
    "download": "Download CV",
    "experience": "Experience",
    "education": "Education",
    "skills": "Skills",
    "competitions": "Competitions",
    "interests": "Interests"
  },
  "fr": {
    "title": "CV",
    "description": "Formation, expérience et références.",
    "headline": "Architecte diplômé de l'ENSA Lyon, et Ingénieur en Génie Civil diplômé de l'INSA Lyon.",
    "download": "Télécharger le CV",
    "experience": "Expérience",
    "education": "Formation",
    "skills": "Compétences",
    "competitions": "Concours",
    "interests": "Centres d'intérêt"
  }
}
</i18n>
