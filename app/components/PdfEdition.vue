<script setup lang="ts">
// Bound-portfolio PDF block: pick a language (FR/EN), then three actions —
// Download / Open in new tab / View here (the integrated pdf.js spread reader).
// Section copy (eyebrow/title/description) is passed in so the home page and the
// portfolio page can frame it differently; the action labels live here.
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()

const { t, locale } = useI18n()

// Default the document language to the active site locale; the reader reloads
// when the choice changes (keyed below).
const lang = ref<'en' | 'fr'>(locale.value === 'fr' ? 'fr' : 'en')
const pdf = computed(() => portfolioPdf[lang.value])
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

    <!-- 1) Language selector -->
    <div class="mt-6 flex items-center gap-3">
      <span class="font-sans text-xs uppercase tracking-wider text-muted">
        {{ t('language') }}
      </span>
      <div class="inline-flex rounded-[--ui-radius] border border-default p-0.5">
        <button
          v-for="code in (['fr', 'en'] as const)"
          :key="code"
          type="button"
          class="rounded-[--ui-radius] px-3 py-1 font-sans text-xs uppercase tracking-wider transition-colors"
          :class="lang === code ? 'bg-elevated text-highlighted' : 'text-muted hover:text-highlighted'"
          :aria-pressed="lang === code"
          @click="lang = code"
        >
          {{ code }}
        </button>
      </div>
    </div>

    <!-- 2) Exactly three actions, operating on the selected language -->
    <div class="mt-4 flex flex-wrap gap-3">
      <UButton
        :to="pdf"
        external
        :download="`portfolio-matthieu-duval-${lang}.pdf`"
        icon="i-lucide-download"
        :label="t('download')"
      />
      <UButton
        :to="pdf"
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

    <!-- 3) Integrated reader (client-only; reloads when the language changes) -->
    <ClientOnly>
      <div
        v-if="showReader"
        class="mt-8"
      >
        <PdfSpreadViewer
          :key="lang"
          :src="pdf"
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
    "language": "Language",
    "download": "Download PDF",
    "open": "Open in new tab",
    "view": "View here",
    "hide": "Close reader"
  },
  "fr": {
    "note": "PDF optimisé pour le web (~7 Mo).",
    "language": "Langue",
    "download": "Télécharger le PDF",
    "open": "Ouvrir dans un nouvel onglet",
    "view": "Lire ici",
    "hide": "Fermer le lecteur"
  }
}
</i18n>
