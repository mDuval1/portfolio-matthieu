<script setup lang="ts">
const { t, locale, tm, rt } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('title'),
  description: () => t('description')
})

// Bio paragraphs as an i18n array (resolved with rt in the template).
const bio = computed(() => tm('bio') as string[])
const cv = computed(() => cvPdf[locale.value === 'fr' ? 'fr' : 'en'])
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="t('title')"
        :description="t('description')"
      />
      <UPageBody>
        <div class="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <!-- Bio -->
          <div class="max-w-2xl space-y-5 text-pretty text-muted">
            <p
              v-for="(p, i) in bio"
              :key="i"
            >
              {{ rt(p) }}
            </p>
            <UButton
              class="mt-2"
              :to="localePath('resume')"
              :label="t('viewCv')"
              trailing-icon="i-lucide-arrow-right"
              color="neutral"
              variant="subtle"
            />
          </div>

          <!-- Contact -->
          <aside class="space-y-4">
            <h2 class="font-mono text-xs uppercase tracking-wider text-muted">
              {{ t('contact') }}
            </h2>
            <div class="flex flex-col gap-3 text-sm">
              <UButton
                :to="`mailto:${contact.email}`"
                icon="i-lucide-mail"
                :label="contact.email"
                color="neutral"
                variant="link"
                class="justify-start p-0"
              />
              <UButton
                :to="contact.phoneHref"
                icon="i-lucide-phone"
                :label="contact.phone"
                color="neutral"
                variant="link"
                class="justify-start p-0"
              />
              <UButton
                :to="contact.linkedin"
                target="_blank"
                external
                icon="i-simple-icons-linkedin"
                :label="contact.linkedinHandle"
                color="neutral"
                variant="link"
                class="justify-start p-0"
              />
              <UButton
                :to="cv"
                external
                :download="`cv-matthieu-duval-${locale}.pdf`"
                icon="i-lucide-download"
                :label="t('downloadCv')"
                color="neutral"
                variant="link"
                class="justify-start p-0"
              />
            </div>
            <p class="text-sm text-dimmed">
              {{ t('basedIn') }}
            </p>
          </aside>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "About",
    "description": "A young architect and civil engineer working at the intersection of craft, context and care.",
    "bio": [
      "A graduate in architecture (ENSA Lyon — June 2026) and civil engineering (INSA Lyon — August 2024), with a year at the Politecnico di Milano, I work at the interface between the creativity of architectural design and the reality of engineering studies. I see my practice as a bridge between these two worlds, refusing any compromise between the poetry of a space and the demands of its feasibility.",
      "A proponent of critical neo-regionalism and bioclimatic architecture, my design process always begins with a will to understand the environment in which — and for which — I build. The first ideas then take shape on tracing paper or on paper, giving form to the chosen approach. My strength lies in moving freely from one design medium to another: I work fluidly with drawing, the graphics tablet, digital modelling (Revit, Rhino), parametric modelling (Dynamo, Grasshopper), through to the use of the latest technologies (AI) in my workflows.",
      "With 18 months of cumulative agency experience in South-East Asia across varied programmes, I have developed an autonomy and a versatility that translate into a strong capacity to adapt. My prior experience in project management and business development (Junior Enterprise) also lets me approach each project with a strategic, business-oriented vision.",
      "Today I am preparing my return to South-East Asia, with a privileged anchor in HCMC, Vietnam. I am reaching out to international agencies seeking a cross-disciplinary profile — able to carry architectural design, the resolution of complex details and technical coordination — where architecture and engineering speak to one another in the service of exceptional projects."
    ],
    "contact": "Contact",
    "viewCv": "Read the full CV",
    "downloadCv": "Download CV",
    "basedIn": "Based in South-East Asia — targeting Ho Chi Minh City, Vietnam."
  },
  "fr": {
    "title": "À propos",
    "description": "Un jeune architecte et ingénieur en génie civil à la croisée du métier, du contexte et de l'attention.",
    "bio": [
      "Diplômé en architecture (ENSA Lyon - juin 2026) et en génie civil (INSA Lyon août 2024), avec un parcours enrichi par une année à l'école Politecnico di Milano, j'évolue à l'interface entre la créativité de la conception architecturale et la réalité des études d'ingénierie. Je conçois ma pratique comme un pont entre ces deux mondes, refusant tout compromis entre la poésie d'un espace et l'exigence de sa faisabilité.",
      "Adepte du néo-régionalisme critique et de l'architecture bioclimatique, mon processus de conception commence systématiquement par une volonté de comprendre l'environnement dans lequel et pour lequel je construis. Les premières idées naissent ensuite sur le calque ou le papier, matérialisation du parti pris et des idées retenus. Ma force réside dans la capacité de passer d'un support de conception à l'autre. Je manie librement le dessin, la tablette graphique, la modélisation numérique (Revit, Rhino), la modélisation paramétrique (Dynamo, Grasshopper) jusqu'à l'emploi des dernières technologies (IA) dans mes flux de travail.",
      "Fort de 18 mois d'expérience cumulée en agence en Asie du Sud-Est, sur des programmes variés, j'ai développé une autonomie et une transversalité qui s'incarnent dans une grande capacité d'adaptation. Mon expérience préalable en management de projet et développement commercial (Junior-Entreprise) me permet en outre d'aborder chaque projet avec une vision stratégique et « business-oriented ».",
      "Aujourd'hui, je prépare mon retour en Asie du Sud-Est, avec un ancrage privilégié à HCMC au Vietnam. Je m'adresse aux agences internationales à la recherche d'un profil transversal — capable d'assurer la conception architecturale, la résolution de détails complexes et la coordination technique — là où l'architecture et l'ingénierie dialoguent au service de projets d'exception."
    ],
    "contact": "Contact",
    "viewCv": "Lire le CV complet",
    "downloadCv": "Télécharger le CV",
    "basedIn": "Basé en Asie du Sud-Est — cible Hô Chi Minh-Ville, Vietnam."
  }
}
</i18n>
