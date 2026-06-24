// Travel sketches under /media/sketches (.webp from scripts/import-sketches.py),
// rendered as a captioned masonry grid on /sketches, newest first.
//
// Source filenames (Drive "CROQUIS") encode "Country _ City _ DD.MM.YY _ Title".
// That data is materialised here as a bilingual manifest so captions stay
// decoupled from the (French, accent-folded) filenames. `city` is null for
// city-states (Singapore). `date` is ISO and drives the descending sort.
//
// Normalised from the raw filenames: Malaiseie -> Malaisie, Thailand -> Thaïlande,
// USA -> États-Unis (fr), Saone -> Saône, Barcelonetal -> Barceloneta.

export interface Localized {
  fr: string
  en: string
}

export interface Sketch {
  file: string
  date: string // ISO yyyy-mm-dd
  country: Localized
  city: Localized | null
  title: Localized
}

const FR = {
  france: { fr: 'France', en: 'France' },
  italie: { fr: 'Italie', en: 'Italy' },
  espagne: { fr: 'Espagne', en: 'Spain' },
  vietnam: { fr: 'Vietnam', en: 'Vietnam' },
  usa: { fr: 'États-Unis', en: 'United States' },
  cambodge: { fr: 'Cambodge', en: 'Cambodia' },
  malaisie: { fr: 'Malaisie', en: 'Malaysia' },
  thailande: { fr: 'Thaïlande', en: 'Thailand' },
  singapour: { fr: 'Singapour', en: 'Singapore' }
} as const

// Pre-sorted newest first (see scripts/import-sketches.py).
export const sketches: Sketch[] = [
  {
    file: '2026-05-24-lyon-bords-de-saone.webp',
    date: '2026-05-24',
    country: FR.france,
    city: { fr: 'Lyon', en: 'Lyon' },
    title: { fr: 'Bords de Saône', en: 'Banks of the Saône' }
  },
  {
    file: '2026-05-02-kuala-lumpur-petronas-towers.webp',
    date: '2026-05-02',
    country: FR.malaisie,
    city: { fr: 'Kuala Lumpur', en: 'Kuala Lumpur' },
    title: { fr: 'Petronas Towers', en: 'Petronas Towers' }
  },
  {
    file: '2026-05-01-kuala-lumpur-thean-hou-temple.webp',
    date: '2026-05-01',
    country: FR.malaisie,
    city: { fr: 'Kuala Lumpur', en: 'Kuala Lumpur' },
    title: { fr: 'Thean Hou Temple', en: 'Thean Hou Temple' }
  },
  {
    file: '2026-04-26-phuket-plage-de-kata-au-crepuscule.webp',
    date: '2026-04-26',
    country: FR.thailande,
    city: { fr: 'Phuket', en: 'Phuket' },
    title: { fr: 'Plage de Kata au crépuscule', en: 'Kata Beach at dusk' }
  },
  {
    file: '2026-04-19-quiberon-extremite-sud-de-la-presqu-ile.webp',
    date: '2026-04-19',
    country: FR.france,
    city: { fr: 'Quiberon', en: 'Quiberon' },
    title: { fr: 'Extrémité sud de la presqu\'île', en: 'Southern tip of the peninsula' }
  },
  {
    file: '2026-04-04-saint-affrique-chateau-de-laumiere.webp',
    date: '2026-04-04',
    country: FR.france,
    city: { fr: 'Saint-Affrique', en: 'Saint-Affrique' },
    title: { fr: 'Château de Laumière', en: 'Château de Laumière' }
  },
  {
    file: '2026-02-21-dinard-vue-de-saint-malo.webp',
    date: '2026-02-21',
    country: FR.france,
    city: { fr: 'Dinard', en: 'Dinard' },
    title: { fr: 'Vue de Saint-Malo', en: 'View of Saint-Malo' }
  },
  {
    file: '2025-12-24-hoi-an-la-ville-et-ses-canaux-a-la-tombee-du-jour.webp',
    date: '2025-12-24',
    country: FR.vietnam,
    city: { fr: 'Hoi An', en: 'Hoi An' },
    title: { fr: 'La ville et ses canaux à la tombée du jour', en: 'The town and its canals at nightfall' }
  },
  {
    file: '2025-11-12-philadelphie-fairmount-water-works.webp',
    date: '2025-11-12',
    country: FR.usa,
    city: { fr: 'Philadelphie', en: 'Philadelphia' },
    title: { fr: 'Fairmount Water Works', en: 'Fairmount Water Works' }
  },
  {
    file: '2025-11-08-new-york-skyline-depuis-central-park.webp',
    date: '2025-11-08',
    country: FR.usa,
    city: { fr: 'New York', en: 'New York' },
    title: { fr: 'Skyline depuis Central Park', en: 'Skyline from Central Park' }
  },
  {
    file: '2025-11-07-philadelphie-2nd-bank-of-the-u-s.webp',
    date: '2025-11-07',
    country: FR.usa,
    city: { fr: 'Philadelphie', en: 'Philadelphia' },
    title: { fr: '2nd Bank of the U.S.', en: 'Second Bank of the U.S.' }
  },
  {
    file: '2025-11-07-philadelphie-city-hall.webp',
    date: '2025-11-07',
    country: FR.usa,
    city: { fr: 'Philadelphie', en: 'Philadelphia' },
    title: { fr: 'City Hall', en: 'City Hall' }
  },
  {
    file: '2025-11-07-philadelphie-merchant-s-exchange.webp',
    date: '2025-11-07',
    country: FR.usa,
    city: { fr: 'Philadelphie', en: 'Philadelphia' },
    title: { fr: 'Merchant\'s Exchange', en: 'Merchant\'s Exchange' }
  },
  {
    file: '2025-10-23-lyon-colline-de-fourvieres.webp',
    date: '2025-10-23',
    country: FR.france,
    city: { fr: 'Lyon', en: 'Lyon' },
    title: { fr: 'Colline de Fourvière', en: 'Fourvière hill' }
  },
  {
    file: '2025-09-20-lyon-cathedrale-saint-jean.webp',
    date: '2025-09-20',
    country: FR.france,
    city: { fr: 'Lyon', en: 'Lyon' },
    title: { fr: 'Cathédrale Saint-Jean', en: 'Saint-Jean Cathedral' }
  },
  {
    file: '2025-09-01-da-nang-linh-ung-pagoda.webp',
    date: '2025-09-01',
    country: FR.vietnam,
    city: { fr: 'Da Nang', en: 'Da Nang' },
    title: { fr: 'Linh Ung Pagoda', en: 'Linh Ung Pagoda' }
  },
  {
    file: '2025-08-30-hoi-an-la-ville-de-nuit.webp',
    date: '2025-08-30',
    country: FR.vietnam,
    city: { fr: 'Hoi An', en: 'Hoi An' },
    title: { fr: 'La ville de nuit', en: 'The town at night' }
  },
  {
    file: '2025-08-17-hcmc-l-eglise-rose-de-tan-dinh.webp',
    date: '2025-08-17',
    country: FR.vietnam,
    city: { fr: 'Hô Chi Minh-Ville', en: 'Ho Chi Minh City' },
    title: { fr: 'L\'église rose de Tan Dinh', en: 'The pink church of Tan Dinh' }
  },
  {
    file: '2025-07-15-clisson-vue-du-chateau-et-de-la-riviere.webp',
    date: '2025-07-15',
    country: FR.france,
    city: { fr: 'Clisson', en: 'Clisson' },
    title: { fr: 'Vue du château et de la rivière', en: 'View of the castle and the river' }
  },
  {
    file: '2025-06-14-lac-de-come-vue-du-lac-depuis-abbadia-lariana.webp',
    date: '2025-06-14',
    country: FR.italie,
    city: { fr: 'Lac de Côme', en: 'Lake Como' },
    title: { fr: 'Vue du lac depuis Abbadia Lariana', en: 'View of the lake from Abbadia Lariana' }
  },
  {
    file: '2025-06-02-portofino-marina.webp',
    date: '2025-06-02',
    country: FR.italie,
    city: { fr: 'Portofino', en: 'Portofino' },
    title: { fr: 'Marina', en: 'Marina' }
  },
  {
    file: '2025-05-25-venise-murano.webp',
    date: '2025-05-25',
    country: FR.italie,
    city: { fr: 'Venise', en: 'Venice' },
    title: { fr: 'Murano', en: 'Murano' }
  },
  {
    file: '2025-05-24-venise-grand-canal-depuis-le-rialto-bridge.webp',
    date: '2025-05-24',
    country: FR.italie,
    city: { fr: 'Venise', en: 'Venice' },
    title: { fr: 'Grand Canal depuis le pont du Rialto', en: 'Grand Canal from the Rialto Bridge' }
  },
  {
    file: '2025-05-03-nice-promenade-des-anglais.webp',
    date: '2025-05-03',
    country: FR.france,
    city: { fr: 'Nice', en: 'Nice' },
    title: { fr: 'Promenade des Anglais', en: 'Promenade des Anglais' }
  },
  {
    file: '2025-04-28-barcelone-playa-de-la-barcelonetal.webp',
    date: '2025-04-28',
    country: FR.espagne,
    city: { fr: 'Barcelone', en: 'Barcelona' },
    title: { fr: 'Playa de la Barceloneta', en: 'Barceloneta beach' }
  },
  {
    file: '2025-02-01-guadeloupe-vue-depuis-la-plage-de-terre-de-haut.webp',
    date: '2025-02-01',
    country: FR.france,
    city: { fr: 'Guadeloupe', en: 'Guadeloupe' },
    title: { fr: 'Vue depuis la plage de Terre-de-Haut', en: 'View from Terre-de-Haut beach' }
  },
  {
    file: '2025-01-22-guadeloupe-la-plage-de-petit-havre.webp',
    date: '2025-01-22',
    country: FR.france,
    city: { fr: 'Guadeloupe', en: 'Guadeloupe' },
    title: { fr: 'La plage de Petit-Havre', en: 'Petit-Havre beach' }
  },
  {
    file: '2025-01-07-florence-piazza-della-signoria.webp',
    date: '2025-01-07',
    country: FR.italie,
    city: { fr: 'Florence', en: 'Florence' },
    title: { fr: 'Piazza della Signoria', en: 'Piazza della Signoria' }
  },
  {
    file: '2024-11-15-milan-museo-civico-di-storia-naturale.webp',
    date: '2024-11-15',
    country: FR.italie,
    city: { fr: 'Milan', en: 'Milan' },
    title: { fr: 'Museo Civico di Storia Naturale', en: 'Museo Civico di Storia Naturale' }
  },
  {
    file: '2024-11-11-milan-basilica-di-san-lorenzo-vue-depuis-les-colonnes.webp',
    date: '2024-11-11',
    country: FR.italie,
    city: { fr: 'Milan', en: 'Milan' },
    title: { fr: 'Basilica di San Lorenzo vue depuis les colonnes', en: 'Basilica di San Lorenzo from the colonnade' }
  },
  {
    file: '2024-11-09-milan-castello-sforzesco.webp',
    date: '2024-11-09',
    country: FR.italie,
    city: { fr: 'Milan', en: 'Milan' },
    title: { fr: 'Castello Sforzesco', en: 'Castello Sforzesco' }
  },
  {
    file: '2024-11-02-bergame-vue-de-la-vieille-ville-depuis-les-remparts.webp',
    date: '2024-11-02',
    country: FR.italie,
    city: { fr: 'Bergame', en: 'Bergamo' },
    title: { fr: 'Vue de la vieille ville depuis les remparts', en: 'View of the old town from the ramparts' }
  },
  {
    file: '2024-10-28-milan-basilica-di-san-lorenzo.webp',
    date: '2024-10-28',
    country: FR.italie,
    city: { fr: 'Milan', en: 'Milan' },
    title: { fr: 'Basilica di San Lorenzo', en: 'Basilica di San Lorenzo' }
  },
  {
    file: '2024-10-11-turin-palazzo-reale-di-torino.webp',
    date: '2024-10-11',
    country: FR.italie,
    city: { fr: 'Turin', en: 'Turin' },
    title: { fr: 'Palazzo Reale di Torino', en: 'Palazzo Reale di Torino' }
  },
  {
    file: '2024-10-11-turin-vue-depuis-les-marches-de-la-chiesa-della-gran-madre-di-dio.webp',
    date: '2024-10-11',
    country: FR.italie,
    city: { fr: 'Turin', en: 'Turin' },
    title: { fr: 'Vue depuis les marches de la Chiesa della Gran Madre di Dio', en: 'View from the steps of the Chiesa della Gran Madre di Dio' }
  },
  {
    file: '2024-09-22-varenna-la-ville-depuis-le-lac.webp',
    date: '2024-09-22',
    country: FR.italie,
    city: { fr: 'Varenna', en: 'Varenna' },
    title: { fr: 'La ville depuis le lac', en: 'The town from the lake' }
  },
  {
    file: '2024-09-09-singapour-victoria-theater.webp',
    date: '2024-09-09',
    country: FR.singapour,
    city: null,
    title: { fr: 'Victoria Theatre', en: 'Victoria Theatre' }
  },
  {
    file: '2024-09-09-singapour-vue-de-marina-bay-sands-depuis-la-national-gallery.webp',
    date: '2024-09-09',
    country: FR.singapour,
    city: null,
    title: { fr: 'Marina Bay Sands depuis la National Gallery', en: 'Marina Bay Sands from the National Gallery' }
  },
  {
    file: '2024-09-08-singapour-marina-bay-sands.webp',
    date: '2024-09-08',
    country: FR.singapour,
    city: null,
    title: { fr: 'Marina Bay Sands', en: 'Marina Bay Sands' }
  },
  {
    file: '2024-07-14-hanoi-la-fameuse-train-street.webp',
    date: '2024-07-14',
    country: FR.vietnam,
    city: { fr: 'Hanoï', en: 'Hanoi' },
    title: { fr: 'La fameuse Train Street', en: 'The famous Train Street' }
  },
  {
    file: '2024-06-22-phnom-penh-pavillon-sur-le-site-de-wat-phnom.webp',
    date: '2024-06-22',
    country: FR.cambodge,
    city: { fr: 'Phnom Penh', en: 'Phnom Penh' },
    title: { fr: 'Pavillon sur le site de Wat Phnom', en: 'Pavilion at the Wat Phnom site' }
  },
  {
    file: '2024-06-15-hcmc-ville-depuis-la-terrasse-d-un-cafe.webp',
    date: '2024-06-15',
    country: FR.vietnam,
    city: { fr: 'Hô Chi Minh-Ville', en: 'Ho Chi Minh City' },
    title: { fr: 'Ville depuis la terrasse d\'un café', en: 'The city from a café terrace' }
  },
  {
    file: '2024-06-09-nha-trang-champa-temple.webp',
    date: '2024-06-09',
    country: FR.vietnam,
    city: { fr: 'Nha Trang', en: 'Nha Trang' },
    title: { fr: 'Champa Temple', en: 'Champa Temple' }
  },
  {
    file: '2024-05-04-hcmc-palais-de-l-independance.webp',
    date: '2024-05-04',
    country: FR.vietnam,
    city: { fr: 'Hô Chi Minh-Ville', en: 'Ho Chi Minh City' },
    title: { fr: 'Palais de l\'Indépendance', en: 'Independence Palace' }
  },
  {
    file: '2024-02-12-goury-phare-de-goury.webp',
    date: '2024-02-12',
    country: FR.france,
    city: { fr: 'Goury', en: 'Goury' },
    title: { fr: 'Phare de Goury', en: 'Goury lighthouse' }
  },
  {
    file: '2022-10-28-lyon-tissu-residentiel-autour-des-rails-a-perrache.webp',
    date: '2022-10-28',
    country: FR.france,
    city: { fr: 'Lyon', en: 'Lyon' },
    title: { fr: 'Tissu résidentiel autour des rails à Perrache', en: 'Residential fabric around the Perrache tracks' }
  },
  {
    file: '2022-10-28-lyon-tour-d-aiguillage-de-perrache-cote-saone.webp',
    date: '2022-10-28',
    country: FR.france,
    city: { fr: 'Lyon', en: 'Lyon' },
    title: { fr: 'Tour d\'aiguillage de Perrache côté Saône', en: 'Perrache signal tower, Saône side' }
  },
  {
    file: '2022-10-28-lyon-vue-d-un-pont-ferroviaire-vers-perrache.webp',
    date: '2022-10-28',
    country: FR.france,
    city: { fr: 'Lyon', en: 'Lyon' },
    title: { fr: 'Vue d\'un pont ferroviaire vers Perrache', en: 'View of a railway bridge toward Perrache' }
  }
]
