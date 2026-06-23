// Static project metadata — the single source of truth for the carousel, the
// /projects index and the /projects/[slug] detail pages. Image filenames are the
// .webp outputs of scripts/import-visuals.sh. Translatable prose (title, summary,
// description, location) lives in i18n under `projectsData.<slug>` — only the
// non-translatable structure (slug, folder, year, image files) lives here.
//
// NOTE: `year` values are best-effort and should be confirmed by the owner.

export interface Project {
  /** url segment + i18n key + folder discriminator */
  slug: string
  /** numeric sort order matching the 01–05 import folders */
  order: number
  /** folder under /public/media/projects */
  folder: string
  /** completion year (display + sort tiebreak) */
  year: string
  /** curated selects under /media/carousel (one card each on the homepage) */
  carousel: string[]
  /** hero image filename within the project folder */
  hero: string
  /** detail-page gallery image filenames within the project folder */
  gallery: string[]
}

export const projects: Project[] = [
  {
    slug: 'philopolis',
    order: 1,
    folder: '01-philopolis',
    year: '2026',
    carousel: ['01-a.webp', '01-b.webp', '01-c.webp'],
    hero: 'perse-musee.webp',
    gallery: [
      'perse-musee.webp',
      'perse-amphi.webp',
      'perse-foyer.webp',
      'perse-couronnement.webp',
      'perse-rampe.webp',
      'perse-salle-double-hauteur.webp',
      'final-coupe-perspective.webp',
      'coupe-axo-final.webp',
      'axono-choisy-juin.webp',
      'collage-market-st.webp',
      'jardins-pdc-collage.webp',
      'elevation-ouest.webp',
      'plan-rdc-juin.webp'
    ]
  },
  {
    slug: 'bahanaaue',
    order: 2,
    folder: '02-bahanaaue',
    year: '2024',
    carousel: ['02-a.webp', '02-b.webp'],
    hero: 'front-up-shot-002.webp',
    gallery: [
      'front-up-shot-002.webp',
      '001.webp',
      '003.webp',
      '005.webp',
      'coupe-perspective.webp',
      'plan-masse.webp',
      'planr0.webp',
      'planr1.webp'
    ]
  },
  {
    slug: 'palimpseste',
    order: 3,
    folder: '03-palimpseste',
    year: '2025',
    carousel: ['03-a.webp'],
    hero: 'collage-exterieur-01.webp',
    gallery: [
      'collage-exterieur-01.webp',
      'axo-constructive-01.webp',
      'axo-bow-wow-01.webp'
    ]
  },
  {
    slug: 'pesanteur-grace',
    order: 4,
    folder: '04-pesanteur-grace',
    year: '2023',
    carousel: ['04-a.webp'],
    hero: 'perspective-exterieure.webp',
    gallery: [
      'perspective-exterieure.webp',
      'perspective-interieure.webp',
      'vue-de-detail-ateliers-01.webp',
      'axo-constructive.webp',
      'coupe-transversale-ateliers-1-100-01.webp',
      'plan-masse-01.webp',
      'plan-rdc-et-abords-01.webp',
      'plan-r-1-circulations-01.webp'
    ]
  },
  {
    slug: 'revelation',
    order: 5,
    folder: '05-revelation',
    year: '2024',
    carousel: ['05-a.webp', '05-b.webp'],
    hero: 'atrium-000.webp',
    gallery: [
      'atrium-000.webp',
      'atrium2-000.webp',
      'atrium-depuis-ext-000.webp',
      'atrium-depuis-tm-000.webp',
      'temple-000.webp',
      'temple2-000.webp',
      'coworking-000.webp',
      'coworking2-000.webp',
      'coursive-ext-000.webp',
      'passerelle-000.webp',
      'cuisine3-000.webp',
      'sdr-2-000.webp',
      'aile-sud-et-sdr.webp',
      'coupe-perspective-gauche.webp',
      'coupe-longitudinale-droite.webp',
      'coupe-transversale-atrium.webp',
      'plan-r0.webp',
      'plan-r1.webp'
    ]
  }
]

export const projectsByOrder = () => [...projects].sort((a, b) => a.order - b.order)

// Latest year first; import order (01–05) breaks ties.
export const projectsByDate = () =>
  [...projects].sort((a, b) => Number(b.year) - Number(a.year) || a.order - b.order)

export const getProject = (slug: string) => projects.find(p => p.slug === slug)

export const adjacentProjects = (slug: string) => {
  const ordered = projectsByDate()
  const i = ordered.findIndex(p => p.slug === slug)
  if (i === -1) {
    return { prev: undefined, next: undefined }
  }
  return {
    prev: i > 0 ? ordered[i - 1] : ordered[ordered.length - 1],
    next: i < ordered.length - 1 ? ordered[i + 1] : ordered[0]
  }
}

// Translatable project copy. Titles are proper nouns; summaries/descriptions are
// best-effort editorial placeholders to be refined by the owner.
export type Locale = 'en' | 'fr'

export interface ProjectText {
  title: string
  location: string
  summary: string
  description: string
}

const projectContent: Record<string, Record<Locale, ProjectText>> = {
  'philopolis': {
    en: {
      title: 'Philopolis',
      location: 'Philadelphia, USA',
      summary: 'A regeneration of an occupied heritage site — archives, museum and assembly woven into the existing fabric.',
      description: 'Final-year thesis project. Philopolis treats the city as a living archive: a sequence of public rooms — consultation halls, a double-height reading room, a museum and a crowning amphitheatre — is grafted onto an occupied historic site, negotiating preservation and new construction.'
    },
    fr: {
      title: 'Philopolis',
      location: 'Philadelphie, USA',
      summary: 'Régénération d\'un site patrimonial occupé — archives, musée et assemblée tissés dans le bâti existant.',
      description: 'Projet de fin d\'étude. Philopolis traite la ville comme une archive vivante : une séquence de salles publiques — salles de consultation, salle de lecture double hauteur, musée et amphithéâtre de couronnement — se greffe sur un site historique occupé, négociant conservation et construction neuve.'
    }
  },
  'bahanaaue': {
    en: {
      title: 'Bahanaaue',
      location: 'Banaue, Philippines',
      summary: 'A lodge terraced into the rice fields of Banaue — a TERRAVIVA competition entry.',
      description: 'Competition proposal (TERRAVIVA) for a small lodge set into the Banaue rice terraces. The section steps with the land so that roofs become paths and the building all but disappears into the cultivated slope.'
    },
    fr: {
      title: 'Bahanaaue',
      location: 'Banaue, Philippines',
      summary: 'Un refuge en terrasses dans les rizières de Banaue — un projet de concours TERRAVIVA.',
      description: 'Proposition de concours (TERRAVIVA) pour un petit refuge inscrit dans les rizières en terrasses de Banaue. La coupe épouse le terrain : les toitures deviennent des cheminements et le bâtiment s\'efface dans la pente cultivée.'
    }
  },
  'palimpseste': {
    en: {
      title: 'Palimpseste',
      location: '',
      summary: 'An adaptive-reuse study read as a palimpsest — new structure written over the traces of the old.',
      description: 'A constructive study in adaptive reuse: the existing fabric is kept as a substrate onto which a light new structure is written, in the spirit of Atelier Bow-Wow\'s drawn investigations.'
    },
    fr: {
      title: 'Palimpseste',
      location: '',
      summary: 'Une étude de réemploi lue comme un palimpseste — une structure neuve écrite sur les traces de l\'ancien.',
      description: 'Étude constructive sur le réemploi : le bâti existant est conservé comme substrat sur lequel s\'écrit une structure neuve et légère, dans l\'esprit des investigations dessinées de l\'Atelier Bow-Wow.'
    }
  },
  'pesanteur-grace': {
    en: {
      title: 'Weight and Grace',
      location: '',
      summary: 'Workshop ateliers poised between mass and lightness, after Simone Weil.',
      description: 'Named after Simone Weil, the project sets a heavy load-bearing ground against a grafted, lighter structure above — ateliers and workshops organised around the tension between gravity and grace.'
    },
    fr: {
      title: 'La Pesanteur et la Grâce',
      location: '',
      summary: 'Des ateliers en équilibre entre masse et légèreté, d\'après Simone Weil.',
      description: 'D\'après Simone Weil, le projet oppose un socle porteur massif à une structure greffée plus légère — ateliers et workshops organisés autour de la tension entre pesanteur et grâce.'
    }
  },
  'revelation': {
    en: {
      title: 'Revelation',
      location: '',
      summary: 'An atrium-centred complex of temple, coworking and lodging, resolved to structure and services.',
      description: 'A large mixed-use complex organised around a top-lit atrium — temple, coworking, kitchens and lodging — developed from render to structure, HVAC and plumbing as a full technical set.'
    },
    fr: {
      title: 'Révélation',
      location: '',
      summary: 'Un complexe organisé autour d\'un atrium — temple, coworking et hébergement — résolu jusqu\'à la structure et les fluides.',
      description: 'Un grand programme mixte organisé autour d\'un atrium zénithal — temple, coworking, cuisines et hébergement — développé du rendu jusqu\'à la structure, la CVC et la plomberie, en un jeu technique complet.'
    }
  }
}

export const projectText = (slug: string, locale: string): ProjectText => {
  const entry = projectContent[slug]
  if (!entry) {
    return { title: slug, location: '', summary: '', description: '' }
  }
  return entry[locale === 'fr' ? 'fr' : 'en']
}
