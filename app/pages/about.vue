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
      "Matthieu Duval is a graduating architect (ENSAL, Lyon) and civil engineer (INSA Lyon), with a year at the Politecnico di Milano. His work moves between the drawn and the built — from heritage regeneration and adaptive reuse to international hospitality projects.",
      "Trained as both an architect and an engineer, he is as comfortable resolving a structural section or a BIM model as he is composing a perspective. He is currently based in South-East Asia, working as a lead concept designer.",
      "He is looking for a role as an architectural design coordinator / assistant design manager, where architecture, engineering and coordination meet."
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
      "Matthieu Duval est architecte en fin d'études (ENSAL, Lyon) et ingénieur en génie civil (INSA Lyon), après une année au Politecnico di Milano. Son travail se déploie entre le dessiné et le construit — de la régénération patrimoniale et du réemploi aux projets hôteliers internationaux.",
      "Formé à la fois comme architecte et comme ingénieur, il est aussi à l'aise pour résoudre une coupe de structure ou un modèle BIM que pour composer une perspective. Il est actuellement basé en Asie du Sud-Est, comme architecte concepteur principal.",
      "Il recherche un poste de coordinateur d'études architecturales / assistant design manager, là où architecture, ingénierie et coordination se rencontrent."
    ],
    "contact": "Contact",
    "viewCv": "Lire le CV complet",
    "downloadCv": "Télécharger le CV",
    "basedIn": "Basé en Asie du Sud-Est — cible Hô Chi Minh-Ville, Vietnam."
  }
}
</i18n>
