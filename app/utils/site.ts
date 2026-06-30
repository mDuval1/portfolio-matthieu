// Non-translatable site constants: contact details + downloadable documents.
// Email / phone / handle are identical in both locales, so they live here as data
// rather than in i18n (only their labels are translated).

export const contact = {
  email: 'matthieuduval-50@outlook.fr',
  phone: '+33 6 51 88 91 29',
  phoneHref: 'tel:+33651889129',
  linkedin: 'https://www.linkedin.com/in/matthieu-duval-44264323a/',
  linkedinHandle: 'matthieu-duval'
}

// Locale-keyed document paths under /media (see scripts/import-visuals.sh).
export const cvPdf = { en: '/media/cv/cv-matthieu-duval-en.pdf', fr: '/media/cv/cv-matthieu-duval-fr.pdf' }

// Portfolio PDFs per locale: `download` is the print "spreads" export (download /
// open in new tab); `view` is the single-page export optimised for the embedded
// reader. Language follows the global app locale.
export const portfolioPdf = {
  en: { download: '/media/pdf/PORTFOLIO_ENG_Spreads.pdf', view: '/media/pdf/PORTFOLIO_ENG.pdf' },
  fr: { download: '/media/pdf/PORTFOLIO_FR_Spreads.pdf', view: '/media/pdf/PORTFOLIO_FR.pdf' }
} as const

// Research thesis (mémoire). Same download document in both locales; a dedicated
// single-page export feeds the embedded reader. Served from Git LFS (see CLAUDE.md).
export const thesisPdf = {
  download: '/media/pdf/Duval_Matthieu_MIR.pdf',
  view: '/media/pdf/MEMOIRE_VIEWER.pdf'
} as const

// External Amazon listing for the printed/bound edition.
export const thesisPrintUrl = 'https://www.amazon.fr/dp/B0H58QHC1K'

// Portfolio cover render, used as the homepage hero image (see import-visuals.sh).
export const coverImg = '/media/cover/couverture-portfolio.webp'
