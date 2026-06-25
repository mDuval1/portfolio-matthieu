// Path builders for the self-hosted media in /public/media (kebab .webp from
// scripts/import-visuals.sh). Keeps raw paths out of templates.

export const carouselImg = (file: string) => `/media/carousel/${file}`
export const projectImg = (folder: string, file: string) => `/media/projects/${folder}/${file}`
export const sketchImg = (file: string) => `/media/sketches/${file}`

// Turn a media filename into a readable caption: drop the extension and any
// leading sort prefix ("1 - ", "02_", "15-", "3 "), replace separators with
// spaces, capitalize the first letter (preserving the rest of the casing).
// e.g. "1 - Plan du R0 avec distinguo.png" → "Plan du R0 avec distinguo".
// Used for gallery and lightbox captions when no explicit override is supplied.
export const humanizeFilename = (file: string) => {
  const noExt = file.replace(/\.[^.]+$/, '')
  const base = noExt.replace(/^\s*\d+\s*[-_–—]?\s*/, '')
  const words = base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

// Parse the leading sort number from a filename like "1 - Foo.png" or "02_bar".
// Returns null when the name doesn't start with a number.
export const leadingNumber = (file: string): number | null => {
  const m = file.match(/^\s*(\d+)/)
  return m ? Number(m[1]) : null
}

// Order files ascending by their leading number (sketch → final render). Files
// without a leading number keep their original relative order, so a hand-curated
// array passes through untouched while numbered source files sort correctly.
export const byLeadingNumber = <T>(items: T[], key: (item: T) => string): T[] =>
  items
    .map((item, i) => ({ item, i, n: leadingNumber(key(item)) }))
    .sort((a, b) => {
      if (a.n === null && b.n === null) return a.i - b.i
      if (a.n === null) return 1
      if (b.n === null) return -1
      return a.n - b.n || a.i - b.i
    })
    .map(x => x.item)
