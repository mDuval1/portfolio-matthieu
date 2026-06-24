// Path builders for the self-hosted media in /public/media (kebab .webp from
// scripts/import-visuals.sh). Keeps raw paths out of templates.

export const carouselImg = (file: string) => `/media/carousel/${file}`
export const projectImg = (folder: string, file: string) => `/media/projects/${folder}/${file}`
export const sketchImg = (file: string) => `/media/sketches/${file}`

// Turn a media filename into a readable caption: drop the extension + any leading
// sort number, replace separators with spaces, capitalize. Used for gallery and
// lightbox captions when no explicit override is supplied.
export const humanizeFilename = (file: string) => {
  const base = file.replace(/\.[^.]+$/, '').replace(/^\d+[-_]?/, '')
  const words = base.replace(/[-_]+/g, ' ').trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}
