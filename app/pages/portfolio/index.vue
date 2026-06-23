<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('title'),
  description: () => t('description')
})

const cards = computed(() =>
  projectsByDate().map((p) => {
    const text = projectText(p.slug, locale.value)
    return {
      slug: p.slug,
      src: projectImg(p.folder, p.hero),
      title: text.title,
      meta: text.location || p.year
    }
  })
)

const pdf = computed(() => portfolioPdf[locale.value === 'fr' ? 'fr' : 'en'])
const showReader = ref(false)
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="t('title')"
        :description="t('description')"
      />
      <UPageBody>
        <UPageGrid>
          <ProjectCard
            v-for="card in cards"
            :key="card.slug"
            :slug="card.slug"
            :src="card.src"
            :title="card.title"
            :meta="card.meta"
          />
        </UPageGrid>

        <USeparator class="my-12" />

        <!-- Bound PDF edition -->
        <section>
          <h2 class="font-serif text-2xl text-highlighted sm:text-3xl">
            {{ t('edition.title') }}
          </h2>
          <p class="mt-3 max-w-2xl text-muted">
            {{ t('edition.description') }}
          </p>
          <p class="mt-1 text-sm text-dimmed">
            {{ t('edition.note') }}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              :to="pdf"
              external
              :download="`portfolio-matthieu-duval-${locale}.pdf`"
              icon="i-lucide-download"
              :label="t('edition.download')"
            />
            <UButton
              :to="pdf"
              target="_blank"
              external
              icon="i-lucide-external-link"
              color="neutral"
              variant="subtle"
              :label="t('edition.open')"
            />
            <UButton
              icon="i-lucide-book-open"
              color="neutral"
              variant="ghost"
              :label="showReader ? t('edition.hide') : t('edition.read')"
              @click="showReader = !showReader"
            />
          </div>

          <ClientOnly>
            <object
              v-if="showReader"
              :data="pdf"
              type="application/pdf"
              class="mt-6 h-[80vh] w-full rounded-[--ui-radius] border border-default"
            >
              <p class="p-4 text-muted">
                {{ t('edition.fallback') }}
                <ULink
                  :to="pdf"
                  target="_blank"
                  external
                >{{ t('edition.open') }}</ULink>
              </p>
            </object>
          </ClientOnly>
        </section>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Portfolio",
    "description": "Built and conceptual work, from private homes to public space.",
    "edition": {
      "title": "The bound edition",
      "description": "The complete portfolio, laid out as a single document with full project sets.",
      "note": "Large file (~50 MB) — best opened on desktop or downloaded.",
      "download": "Download PDF",
      "open": "Open in new tab",
      "read": "Read here",
      "hide": "Hide reader",
      "fallback": "Your browser can't display the PDF inline."
    }
  },
  "fr": {
    "title": "Portfolio",
    "description": "Travaux construits et conceptuels, de la maison privée à l'espace public.",
    "edition": {
      "title": "L'édition reliée",
      "description": "Le portfolio complet, mis en page comme un document unique avec les dossiers de projet détaillés.",
      "note": "Fichier volumineux (~50 Mo) — à ouvrir sur ordinateur ou à télécharger.",
      "download": "Télécharger le PDF",
      "open": "Ouvrir dans un onglet",
      "read": "Lire ici",
      "hide": "Masquer le lecteur",
      "fallback": "Votre navigateur ne peut pas afficher le PDF en ligne."
    }
  }
}
</i18n>
