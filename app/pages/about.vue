<script setup lang="ts">
const { t, locale, tm } = useI18n()
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
            <!-- i18n-t per paragraph so bio[0]'s {loci} slot can italicise the
                 school name without HTML in the message (rejected by the compiler);
                 paragraphs without {loci} just ignore the unused slot. -->
            <i18n-t
              v-for="(p, i) in bio"
              :key="i"
              :keypath="`bio[${i}]`"
              tag="p"
              class="prose-justify"
            >
              <template #loci>
                <em>Politecnico di Milano</em>
              </template>
            </i18n-t>
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
    "description": "Architect & Civil Engineer — A Cross-Disciplinary Profile",
    "bio": [
      "Holding degrees in Architecture (ENSA Lyon, 2026) and Civil Engineering (INSA Lyon, 2024), my academic background was further enriched by a year of immersion at the {loci}. Today, I thus operate at the intersection of spatial creativity and constructive reality. I view my practice as a bridge between these two disciplines, refusing any compromise between the poetry of a space and the demands of its feasibility.",
      "Committed to critical neo-regionalism and bioclimatic design, my creative process always begins with a deep reading of the environment for which I build. Initial concepts consistently emerge on tracing paper or in a sketchbook, capturing the pure essence of the design intent. My core strength lies in a seamless transition across mediums: from the sensitivity of a pencil stroke to parametric modeling (Dynamo, Grasshopper), encompassing rigorous BIM workflows (Revit, Rhino) and the intelligent integration of AI into my design and rendering processes.",
      "Building on 18 months of cumulative agency experience across Southeast Asia on diverse programs, I have developed a cross-disciplinary approach that translates into strong operational autonomy. Furthermore, my background in project management and business development allows me to approach every project with a strategic, overarching vision that is highly attuned to the economic realities of the industry.",
      "Today, I am preparing for my definitive relocation to Southeast Asia, firmly anchoring myself in Ho Chi Minh City. I am looking to connect with international agencies seeking a hybrid professional—someone capable of driving architectural design, resolving complex detailing, and ensuring advanced technical coordination—where architecture and engineering converse to deliver exceptional projects."
    ],
    "contact": "Contact",
    "viewCv": "Read the full CV",
    "downloadCv": "Download CV",
    "basedIn": "Based in South-East Asia — targeting Ho Chi Minh City, Vietnam."
  },
  "fr": {
    "title": "À propos",
    "description": "Architecte & Ingénieur Civil — Un profil hybride et transversal",
    "bio": [
      "Diplômé en architecture (ENSA Lyon, 2026) et en génie civil (INSA Lyon, 2024), mon parcours a notamment été enrichi par une année d'immersion à l'école polytechnique de Milan ({loci}). J'évolue aujourd'hui à l'intersection entre la créativité de la conception architecturale et la réalité concrète des études constructives. Je conçois ma pratique comme un pont entre ces deux disciplines, refusant le moindre compromis entre la poésie d'un espace et l'exigence de sa faisabilité.",
      "Adepte d'un néo-régionalisme critique et d'une conception bioclimatique, mon processus de création s'ancre d'abord dans une lecture intime de l'environnement pour lequel je construis. Les premières intuitions naissent systématiquement sur le calque ou le papier, matérialisant l'essence du parti pris. Ma véritable force réside ensuite dans ma capacité à transiter avec fluidité d'un support à l'autre : de la sensibilité du trait de crayon à la modélisation paramétrique (Dynamo, Grasshopper), en passant par la rigueur du BIM (Revit, Rhino) et l'intégration intelligente de l'intelligence artificielle au sein de mes flux de travail.",
      "Fort de 18 mois d'expérience cumulée en agence en Asie du Sud-Est sur des programmes variés, j'ai développé une transversalité qui s'incarne dans une grande autonomie opérationnelle. Par ailleurs, mon expérience en management de projet et développement commercial m'amène à aborder chaque projet avec une vision stratégique et globale, résolument orientée vers les réalités économiques du métier.",
      "Aujourd'hui, je planifie mon installation définitive en Asie du Sud-Est, avec un ancrage fort à Hô Chi Minh-Ville. Je m'adresse aux agences internationales à la recherche d'un collaborateur hybride, capable de piloter la conception architecturale, de résoudre des détails complexes et d'assurer une coordination technique de pointe — là où l'architecture et l'ingénierie dialoguent au service de projets d'exception."
    ],
    "contact": "Contact",
    "viewCv": "Lire le CV complet",
    "downloadCv": "Télécharger le CV",
    "basedIn": "Basé en Asie du Sud-Est — cible Hô Chi Minh-Ville, Vietnam."
  }
}
</i18n>
