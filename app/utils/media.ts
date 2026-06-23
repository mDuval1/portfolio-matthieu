// Path builders for the self-hosted media in /public/media (kebab .webp from
// scripts/import-visuals.sh). Keeps raw paths out of templates.

export const carouselImg = (file: string) => `/media/carousel/${file}`
export const projectImg = (folder: string, file: string) => `/media/projects/${folder}/${file}`
export const sketchImg = (file: string) => `/media/sketches/${file}`
