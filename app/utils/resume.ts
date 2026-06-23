// Bilingual CV content for /resume. This is structured data (lists of entries),
// not UI chrome, so it lives here keyed by locale rather than in i18n; section
// headings + the download label are translated via `resume.*` i18n keys.
// Source of truth: public/media/cv/cv-matthieu-duval-{en,fr}.pdf.

export interface ResumeEntry {
  title: string
  org: string
  date: string
  location: string
  points: string[]
}

export interface SkillGroup {
  label: string
  items: string
}

export interface ResumeContent {
  headline: string
  education: ResumeEntry[]
  experience: ResumeEntry[]
  competitions: { title: string, date: string }[]
  skills: SkillGroup[]
  interests: string
}

export const resume: Record<'en' | 'fr', ResumeContent> = {
  en: {
    headline: 'Graduating Architect & Civil Engineer — aspiring Architectural Design Coordinator.',
    education: [
      {
        title: 'Master of Architecture (M.Arch)',
        org: 'National School of Architecture of Lyon (ENSAL)',
        date: 'Sep 2021 – Jun 2026',
        location: 'Lyon, France',
        points: [
          'Among the top 5 French architecture schools; selected for the elite "History, Theory & Creation" master programme.',
          'Architecture-regeneration year-long project in Philadelphia and a 300-page heritage-preservation research thesis.',
          '11 studio projects over three years — ranked in the top 10% of the studio.'
        ]
      },
      {
        title: 'Master in Civil Engineering & Urban Planning',
        org: 'INSA Lyon',
        date: 'Sep 2019 – Jun 2024',
        location: 'Lyon, France',
        points: [
          'Top-10 French engineering Grande École; master ranked #151–200 by the QS World University Rankings.',
          'Structural & environmental design, urban hydraulics & hydrology, BIM, mathematics & mechanics.'
        ]
      },
      {
        title: 'One-year Erasmus exchange',
        org: 'Politecnico di Milano',
        date: 'Sep 2024 – Jun 2025',
        location: 'Milan, Italy',
        points: [
          'Ranked #7 worldwide in Design & Architecture (QS 2024).',
          'Studio on the conservation of complex buildings (in Italian), environmental design, parametric architecture, urban planning & risk mitigation.'
        ]
      }
    ],
    experience: [
      {
        title: 'Architectural Lead Designer (Freelance & Internship)',
        org: 'Archetype Group',
        date: 'Apr 2025 – Present',
        location: 'HCMC, Vietnam & Remote',
        points: [
          'Lead concept designer for 4 international hospitality projects, including a luxury hotel complex (Tunisia) and high-end amenities (wedding hall, resort lounge) in Myanmar.',
          'Curated the pitch deck and capability statement for an Olympic equestrian stadium bid (Saudi Arabia).',
          'Ran a "smart home" systems benchmark for a 3,000 m² luxury villa (Myanmar) and benchmarked operational layouts for a large-scale Cash & Carry study (Carrefour).'
        ]
      },
      {
        title: 'R&D Engineer & QA/QC Analyst (Internship)',
        org: 'Archetype Group',
        date: 'Apr 2024 – Aug 2024',
        location: 'HCMC, Vietnam',
        points: [
          'Led research on AI in construction; hosted a webinar for 100+ internal stakeholders to drive adoption.',
          'Built Microsoft 365 Power Platform tools to streamline QA/QC workflows.',
          'Architectural & engineering support for a 3,000+ m² villa (Myanmar) using BIM (Revit/Dynamo).'
        ]
      },
      {
        title: 'Head of Sales & Board Member',
        org: 'ETIC — Junior Enterprise of INSA Lyon',
        date: 'Apr 2023 – Apr 2024',
        location: 'Lyon, France',
        points: [
          'Grew the business unit to €450k annual revenue (+85% YoY); managed and trained a team of 10 account executives.',
          'Awarded "Best Salesperson of the Year" — personally closed 18 contracts worth €80k.'
        ]
      },
      {
        title: 'BIM Coordinator & Standardization Engineer (Internship)',
        org: 'ORANO',
        date: 'Jun 2023 – Aug 2023',
        location: 'Cherbourg, France',
        points: [
          'Drafted and revised corporate technical standards for model consistency across large engineering projects.',
          'Researched Revit–IFC interoperability and built parametric Revit families and Dynamo scripts.'
        ]
      },
      {
        title: 'Engineering Junior Consultant (Freelance)',
        org: 'Egis · Enedis · CETIM',
        date: 'Sep 2021 – Jul 2025',
        location: 'Lyon, France',
        points: [
          'Delivered 5 consulting missions (€40k total) for major industry players.',
          'Led a feasibility study (concept to detailed design) for a 430 m² public-facility renovation.'
        ]
      }
    ],
    competitions: [
      { title: 'TERRAVIVA — The Banaue\'s Lodge', date: '2024' },
      { title: 'Buildner — The Architect\'s Chair', date: '2023' }
    ],
    skills: [
      { label: 'Languages', items: 'French (native), English (C1), Italian (B2), Spanish (B2 — DELE), Vietnamese (A1)' },
      { label: 'Architecture & design', items: 'Revit, AutoCAD, Rhino, Grasshopper, Dynamo, Twinmotion, Adobe Suite, QGIS, Figma' },
      { label: 'Engineering & other', items: 'Python, MATLAB, Microsoft 365, Generative AI (ComfyUI), Robot, ENVI-met, SolidEdge, HubSpot' }
    ],
    interests: 'Sketching, architecture, literature, geopolitics, AI, calisthenics, rugby, running, Formula 1.'
  },
  fr: {
    headline: 'Architecte en M2 & Ingénieur en génie civil — futur coordinateur d\'études architecturales.',
    education: [
      {
        title: 'Master d\'Architecture',
        org: 'École Nationale Supérieure d\'Architecture de Lyon (ENSAL)',
        date: 'Sep 2021 – Juin 2026',
        location: 'Lyon, France',
        points: [
          'Master 2 dans le domaine le plus exigeant de l\'école : « Histoire, Théorie et Création ».',
          'Projet de fin d\'étude à Philadelphie sur site patrimonial occupé et mémoire d\'initiation à la recherche de 300 pages.',
          '11 projets en atelier sur trois ans — top 10% de la promotion.'
        ]
      },
      {
        title: 'Master en Génie Civil et Urbanisme',
        org: 'INSA Lyon',
        date: 'Sep 2019 – Juin 2024',
        location: 'Lyon, France',
        points: [
          'Grande École d\'ingénieurs du top 10 français ; master classé #151–200 par le QS World University Ranking.',
          'Structure, analyse sismique, mécanique, physique du bâtiment, hydrologie urbaine et hydraulique, BIM.'
        ]
      },
      {
        title: 'Échange universitaire d\'un an',
        org: 'Politecnico di Milano',
        date: 'Sep 2024 – Juin 2025',
        location: 'Milan, Italie',
        points: [
          'Université classée #7 mondiale en Design / Architecture (QS 2024).',
          'Atelier sur la conservation des bâtiments complexes (en italien), design environnemental, architecture paramétrique, planification territoriale et gestion des risques.'
        ]
      }
    ],
    experience: [
      {
        title: 'Architecte Concepteur (Freelance & Stage)',
        org: 'Archetype Group',
        date: 'Avr 2025 – Aujourd\'hui',
        location: 'HCMC, Vietnam & distanciel',
        points: [
          'Pilotage de la conception de 4 projets hôteliers internationaux, dont un complexe de luxe (Tunisie) et des équipements haut de gamme (salle de mariage, lounge de resort) au Myanmar.',
          'Conception du support de présentation pour un projet de centre olympique équestre (Arabie Saoudite).',
          'État de l\'art sur les systèmes de maison intelligente pour une villa de 3 000 m² (Myanmar) et étude comparative des typologies de Cash & Carry (Carrefour).'
        ]
      },
      {
        title: 'Ingénieur R&D (Stage)',
        org: 'Archetype Group',
        date: 'Avr 2024 – Août 2024',
        location: 'HCMC, Vietnam',
        points: [
          'État de l\'art sur l\'IA pour la construction ; animation d\'un webinaire pour plus de 100 collaborateurs internes.',
          'Développement d\'outils Microsoft 365 Power Platform pour fluidifier les processus QA/QC.',
          'Support architectural et ingénierie pour une villa de plus de 3 000 m² (Myanmar) en BIM (Revit/Dynamo).'
        ]
      },
      {
        title: 'Responsable Commercial & Membre du CA',
        org: 'ETIC — Junior Entreprise de l\'INSA Lyon',
        date: 'Avr 2023 – Avr 2024',
        location: 'Lyon, France',
        points: [
          'Pilotage du pôle commercial jusqu\'à 450 k€ de CA annuel (+85% vs N-1) ; management et formation d\'une équipe de 10 chargés d\'affaires.',
          'Meilleur commercial de l\'année — 18 contrats signés pour 80 k€.'
        ]
      },
      {
        title: 'Coordinateur BIM & Ingénieur Méthodes-Qualité (Stage)',
        org: 'ORANO',
        date: 'Juin 2023 – Août 2023',
        location: 'Cherbourg, France',
        points: [
          'Rédaction et révision de standards techniques pour la cohérence des modèles sur de grands projets.',
          'Recherche sur l\'interopérabilité Revit–IFC ; création de familles Revit paramétriques et de scripts Dynamo.'
        ]
      },
      {
        title: 'Consultant Junior en Ingénierie (Freelance)',
        org: 'Egis · Enedis · CETIM',
        date: 'Sep 2021 – Juil 2025',
        location: 'Lyon, France',
        points: [
          'Réalisation de 5 missions de conseil (40 k€ au total) pour des acteurs majeurs de l\'industrie.',
          'Étude de faisabilité (de l\'esquisse à la phase PRO) pour la rénovation d\'un ERP de 430 m².'
        ]
      }
    ],
    competitions: [
      { title: 'TERRAVIVA — The Banaue\'s Lodge', date: '2024' },
      { title: 'Buildner — The Architect\'s Chair', date: '2023' }
    ],
    skills: [
      { label: 'Langues', items: 'Français (natif), Anglais (C1), Italien (B2), Espagnol (B2 — DELE), Vietnamien (A1)' },
      { label: 'Architecture & design', items: 'Revit, AutoCAD, Rhino, Grasshopper, Dynamo, Twinmotion, Adobe Suite, QGIS, Figma' },
      { label: 'Ingénierie & autres', items: 'Python, MATLAB, Microsoft 365, IA générative (ComfyUI), Robot, ENVI-met, SolidEdge' }
    ],
    interests: 'Dessin & croquis, architecture, littérature, géopolitique, IA, calisthénie, rugby, course à pied, Formule 1.'
  }
}
