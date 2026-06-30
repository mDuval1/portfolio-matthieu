<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => `${t('titleA')} — ${t('titleB')}`,
  description: () => t('subtitle')
})

// Abstract paragraphs as an i18n array (resolved with rt in the template).
const abstract = computed(() => tm('abstract') as string[])

// Integrated double-page spread reader, opened on demand.
const showReader = ref(false)
</script>

<template>
  <UContainer>
    <UPage>
      <UPageBody>
        <article>
          <!-- A. Hero — serif title (two lines) + lighter sans subtitle -->
          <header class="space-y-5">
            <h1 class="text-balance font-serif leading-tight text-highlighted">
              <span class="block text-3xl sm:text-4xl lg:text-5xl">{{ t('titleA') }}</span>
              <span class="mt-2 block text-2xl font-medium sm:text-3xl lg:text-4xl">{{ t('titleB') }}</span>
            </h1>
            <p class="max-w-3xl text-pretty font-serif text-lg font-light leading-relaxed text-toned sm:text-xl">
              {{ t('subtitle') }}
            </p>
          </header>

          <USeparator class="my-12 sm:my-16" />

          <!-- B. Body — full-width, justified, generously spaced.
               First paragraph is the introduction; the rest is the abstract. -->
          <div class="prose-justify space-y-8 font-sans leading-loose text-muted sm:space-y-10">
            <p>{{ t('lead') }}</p>
            <p
              v-for="(p, i) in abstract"
              :key="i"
            >
              {{ rt(p) }}
            </p>
          </div>

          <!-- C. Action buttons — terracotta download + open + view + printed edition -->
          <div class="mt-14 flex flex-wrap gap-3 sm:mt-16">
            <UButton
              :to="thesisPdf.download"
              external
              download="Duval_Matthieu_MIR.pdf"
              icon="i-lucide-download"
              :label="t('download')"
            />
            <UButton
              :to="thesisPdf.download"
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
            <UButton
              :to="thesisPrintUrl"
              target="_blank"
              rel="noopener noreferrer"
              external
              icon="i-lucide-book"
              :label="t('print')"
            />
          </div>

          <!-- Integrated double-page spread reader -->
          <ClientOnly>
            <div
              v-if="showReader"
              class="mt-10"
            >
              <PdfSpreadViewer
                :src="thesisPdf.view"
                :title="t('titleA')"
              />
            </div>
          </ClientOnly>
        </article>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "titleA": "From one world to another",
    "titleB": "Trajectories and permanences of the Greek Revival in Philadelphia.",
    "subtitle": "Echoes of classical and Hellenic influences in architecture, in the Athens of America.",
    "lead": "This introductory research thesis is the culmination of 9 months of research and writing, completed during my Master 2 year at the École Nationale Supérieure d'Architecture de Lyon, within the “History, Theory, and Creation” study domain — focusing on the city of Philadelphia.",
    "abstract": [
      "How did a young nation, newly freed from colonial rule, forge its identity amidst the vestiges of an ancient civilization? The answers lie in Philadelphia, the cradle and epicenter of the Greek Revival. Emerging from a European synthesis of Classicism and Romanticism, the movement reached America, where it was enriched by unprecedented formal innovations. From bank temples to civic institutions, this architectural language became the mirror of post-revolutionary American society's ambitions. Yet, this style experienced a decline as rapid as its ascent—bearing witness to a major civilizational shift: humanity's entry into modernity.",
      "Blending architectural analysis, archival research, and philosophical reflection, this thesis questions the very ontology of the act of building. By studying a foundational moment of American identity, we glimpse the deep dynamics that currently fuel the controversial resurgence of classical forms in architecture. This return of Classicism as an active reality raises questions about the underlying political and symbolic motivations. As a mirror of American society, the study of the Greek Revival informs us about the ideological trajectories and formal continuities that have shaped the history of the United States for two centuries. Ultimately, to understand the present and anticipate the future, one cannot bypass an in-depth study of the past."
    ],
    "download": "Download PDF",
    "open": "Open in a new tab",
    "view": "View here",
    "hide": "Close reader",
    "print": "Get the printed edition"
  },
  "fr": {
    "titleA": "D’un monde à l’autre",
    "titleB": "Trajectoires et permanences du Greek Revival à Philadelphie.",
    "subtitle": "Résonances des influences classiques et helléniques en architecture dans l’Athènes de l’Amérique.",
    "lead": "Ce travail de mémoire d'initiation à la recherche est le fruit de 9 mois de recherche et d'écriture, réalisé durant mon année de Master 2 à l'École Nationale Supérieure d'Architecture de Lyon, dans le Domaine d'Étude « Histoire, Théorie et Création » — avec une ville d'étude : Philadelphie.",
    "abstract": [
      "Comment une jeune nation, tout juste affranchie de sa tutelle coloniale, a-t-elle pu forger son identité dans les vestiges d’une civilisation antique ? C’est à Philadelphie, berceau et épicentre du Greek Revival que se trouvent les réponses. Issu d’une synthèse européenne entre Classicisme et Romantisme, le mouvement gagne l’Amérique où il s’enrichit d’innovations formelles inédites. Des temples bancaires aux institutions civiques, ce langage devient le miroir des ambitions de la société américaine post-révolutionnaire. Pourtant, ce style connaît un déclin aussi fulgurant que son ascension — témoin d’un basculement civilisationnel majeur : l’entrée de l’humanité dans la modernité.",
      "Mêlant analyse architecturale, exploitation d’archives et réflexion philosophique, ce mémoire interroge l’ontologie même de l’acte de bâtir. En étudiant un moment fondateur de l’identité américaine, on entrevoit les dynamiques profondes qui favorisent aujourd’hui la résurgence polémique des formes classiques en architecture. Ce retour du Classicisme comme réalité active pose la question des motivations politiques et symboliques sous-jacentes. En tant que miroir de la société américaine, l’étude du Greek Revival nous renseigne sur les trajectoires idéologiques et les permanences formelles qui, depuis deux siècles, façonnent l’histoire des États-Unis. En définitive, pour comprendre le présent, et anticiper l’avenir, nul ne peut faire l’économie d’une étude approfondie du passé."
    ],
    "download": "Télécharger le PDF",
    "open": "Ouvrir dans un nouvel onglet",
    "view": "Lire ici",
    "hide": "Fermer le lecteur",
    "print": "Obtenir la version papier"
  }
}
</i18n>
