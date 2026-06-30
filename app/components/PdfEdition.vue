<script setup lang="ts">
// Bound-portfolio PDF block. The document language follows the GLOBAL app locale
// (set in the header) — no local toggle. Three actions:
//   • Download PDF / Open in new tab → the print "spreads" export
//   • View here → the single-page export, in the embedded pdf.js spread reader
// Section copy (eyebrow/title/description) is passed in so the home and portfolio
// pages can frame it differently; the action labels live here.
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()

const { t, locale } = useI18n()

const loc = computed(() => (locale.value === 'fr' ? 'fr' : 'en'))
const docs = computed(() => portfolioPdf[loc.value])
const showReader = ref(false)
</script>

<template>
  <section>
    <p
      v-if="eyebrow"
      class="font-mono text-xs uppercase tracking-wider text-muted"
    >
      {{ eyebrow }}
    </p>
    <h2 class="mt-2 font-serif text-2xl text-highlighted sm:text-3xl">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-3 max-w-2xl text-muted"
    >
      {{ description }}
    </p>
    <p class="mt-1 text-sm text-dimmed">
      {{ t('note') }}
    </p>

    <!-- Three actions; language follows the global app locale. -->
    <div class="mt-6 flex flex-wrap gap-3">
      <UButton
        :to="docs.download"
        external
        :download="`portfolio-matthieu-duval-${loc}.pdf`"
        icon="i-lucide-download"
        :label="t('download')"
      />
      <UButton
        :to="docs.download"
        target="_blank"
        rel="noopener noreferrer"
        external
        icon="i-lucide-external-link"
        color="neutral"
        variant="subtle"
        :label="t('open')"
      />
      <UButton
        icon="i-lucide-book-open"
        color="neutral"
        variant="ghost"
        :aria-expanded="showReader"
        :label="showReader ? t('hide') : t('view')"
        @click="showReader = !showReader"
      />
    </div>

    <!-- Integrated reader (client-only; reloads when the app locale changes) -->
    <ClientOnly>
      <div
        v-if="showReader"
        class="mt-8"
      >
        <PdfSpreadViewer
          :key="loc"
          :src="docs.view"
          :title="title"
        />
      </div>
    </ClientOnly>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "note": "Web-optimised PDF (~7 MB).",
    "download": "Download PDF",
    "open": "Open in new tab",
    "view": "View here",
    "hide": "Close reader"
  },
  "fr": {
    "note": "PDF optimisé pour le web (~7 Mo).",
    "download": "Télécharger le PDF",
    "open": "Ouvrir dans un nouvel onglet",
    "view": "Lire ici",
    "hide": "Fermer le lecteur"
  }
}
</i18n>
