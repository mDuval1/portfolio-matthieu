<script setup lang="ts">
// Reusable bound-portfolio PDF block: download / open / inline reader.
// Section copy (eyebrow/title/description) is passed in so the home page and the
// projects page can frame it differently; the action labels live here.
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()

const { t, locale } = useI18n()

const pdf = computed(() => portfolioPdf[locale.value === 'fr' ? 'fr' : 'en'])
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

    <div class="mt-6 flex flex-wrap gap-3">
      <UButton
        :to="pdf"
        external
        :download="`portfolio-matthieu-duval-${locale}.pdf`"
        icon="i-lucide-download"
        :label="t('download')"
      />
      <UButton
        :to="pdf"
        target="_blank"
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
        :label="showReader ? t('hide') : t('read')"
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
          {{ t('fallback') }}
          <ULink
            :to="pdf"
            target="_blank"
            external
          >{{ t('open') }}</ULink>
        </p>
      </object>
    </ClientOnly>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "note": "Large file (~50 MB) — best opened on desktop or downloaded.",
    "download": "Download PDF",
    "open": "Open in new tab",
    "read": "Read here",
    "hide": "Hide reader",
    "fallback": "Your browser can't display the PDF inline."
  },
  "fr": {
    "note": "Fichier volumineux (~50 Mo) — à ouvrir sur ordinateur ou à télécharger.",
    "download": "Télécharger le PDF",
    "open": "Ouvrir dans un nouvel onglet",
    "read": "Lire ici",
    "hide": "Masquer le lecteur",
    "fallback": "Votre navigateur ne peut pas afficher le PDF en ligne."
  }
}
</i18n>
