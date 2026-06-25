#!/usr/bin/env node
// Single-file webp encoder used by import-visuals.sh when ImageMagick (`magick`)
// is not on PATH. Resizes so the long edge is <= MAXEDGE (no enlargement) and
// encodes webp at the given quality — matching the magick invocation.
// Usage: node scripts/encode-webp.mjs <in> <out> <maxEdge> <quality>
import sharp from 'sharp'

const [, , input, output, maxEdge = '2400', quality = '82'] = process.argv

if (!input || !output) {
  console.error('usage: encode-webp.mjs <in> <out> [maxEdge] [quality]')
  process.exit(2)
}

sharp(input, { limitInputPixels: false }) // some plans are >16k×16k
  .rotate() // respect EXIF orientation
  .resize(Number(maxEdge), Number(maxEdge), { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: Number(quality) })
  .toFile(output)
  .catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
