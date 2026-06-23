// Non-translatable site constants: contact details + downloadable documents.
// Email / phone / handle are identical in both locales, so they live here as data
// rather than in i18n (only their labels are translated).

export const contact = {
  email: 'matthieuduval-50@outlook.fr',
  phone: '+33 6 51 88 91 29',
  phoneHref: 'tel:+33651889129',
  linkedin: 'https://www.linkedin.com/in/matthieu-duval',
  linkedinHandle: 'matthieu-duval'
}

// Locale-keyed document paths under /media (see scripts/import-visuals.sh).
export const cvPdf = { en: '/media/cv/cv-matthieu-duval-en.pdf', fr: '/media/cv/cv-matthieu-duval-fr.pdf' }
export const portfolioPdf = { en: '/media/pdf/portfolio-2026-en.pdf', fr: '/media/pdf/portfolio-2026-fr.pdf' }
