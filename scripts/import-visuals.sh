#!/usr/bin/env bash
# One-shot importer: raw "VISUELS SITE PERSO" (now under repo _raw_assets/) -> web assets.
# Images -> webp (long edge <=2400, q82). Fonts/CVs/PDFs copied as-is.
# Originals are git-ignored (_raw_assets/) and never committed.
#
# Encoder: uses ImageMagick (`magick`) when present, otherwise falls back to the
# bundled sharp helper (scripts/encode-webp.mjs) so the script runs anywhere.
#
# Usage:
#   scripts/import-visuals.sh            # everything (projects, sketches, carousel, fonts, pdfs…)
#   scripts/import-visuals.sh projects   # project galleries only
set -uo pipefail   # NOT -e: one encode failure must not abort the whole import

MODE="${1:-all}"
REPO="$(cd "$(dirname "$0")/.." && pwd)"   # repo root, derived from this script
SRC="$REPO/_raw_assets"                    # raw Drive folder lives here now
MAXEDGE=2400
Q=82

slug() {                       # slugify a basename (no ext) -> kebab ascii, KEEPING the leading sort number
  python3 - "$1" <<'PY'
import sys, unicodedata, re
raw = sys.argv[1]
# decompose accents then drop non-ascii (é->e, ’/œ dropped) — matches prior behaviour
s = unicodedata.normalize('NFKD', raw).encode('ascii', 'ignore').decode().lower()
s = s.replace('copie de ', '')                 # drop Drive "Copie de" duplication marker
s = re.sub(r'_?plan de travail \d+', '', s)    # drop Illustrator artboard suffix
# Split the leading sort number (e.g. "1 - ", " 01 - ", "090- ") from the rest, and KEEP it.
m = re.match(r'\s*(\d+)\s*[-_]*\s*(.*)$', s)
num, rest = (m.group(1), m.group(2)) if m else ('', s)
if num == '090':            # owner's "9 bis" plate — normalise so it sorts right after 09
    num = '09b'
rest = re.sub(r'[^a-z0-9]+', '-', rest).strip('-')
if len(rest) > 40:          # keep filenames tidy; full captions live in projects.ts
    rest = rest[:40].rsplit('-', 1)[0]
name = (num + '-' + rest) if num else rest
print(name.strip('-') or 'img')
PY
}

encode() {                     # $1 = source image, $2 = dest .webp
  if command -v magick >/dev/null 2>&1; then
    magick "$1" -resize "${MAXEDGE}x${MAXEDGE}>" -quality "$Q" "$2" 2>/dev/null
  else
    node "$REPO/scripts/encode-webp.mjs" "$1" "$2" "$MAXEDGE" "$Q" 2>/dev/null
  fi
}

convert_dir() {                # $1 = source subfolder, $2 = dest dir (repo-relative)
  local sdir="$SRC/$1" ddir="$REPO/$2"
  mkdir -p "$ddir"
  rm -f "$ddir"/*.webp           # clean for idempotent re-runs (no -2 dupes)
  find "$sdir" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0 \
  | while IFS= read -r -d '' f; do
      base="$(basename "$f")"; base="${base%.*}"
      name="$(slug "$base")"; [ -z "$name" ] && name="img"
      out="$ddir/$name.webp"; n=1
      while [ -e "$out" ]; do n=$((n+1)); out="$ddir/$name-$n.webp"; done
      if encode "$f" "$out"; then
        printf '  %-44s -> %s\n' "$base" "$(basename "$out")"
      else
        printf '  !! FAILED: %s\n' "$base"
      fi
    done
}

echo "### PROJECT IMAGES ###"
convert_dir "01_PHILOPOLIS"               "public/media/projects/01-philopolis"
convert_dir "02_BAHANAAUE"                "public/media/projects/02-bahanaaue"
convert_dir "03_PALIMPSESTE"              "public/media/projects/03-palimpseste"
convert_dir "04_LA PESANTEUR ET LA GRACE" "public/media/projects/04-pesanteur-grace"
convert_dir "05_REVELATION"               "public/media/projects/05-revelation"

if [ "$MODE" = "projects" ]; then
  echo "### DONE (projects only) ###"; exit 0
fi

echo "### SKETCHES ###";  convert_dir "CROQUIS"          "public/media/sketches"
echo "### CAROUSEL ###";  convert_dir "VISUELS CAROUSEL" "public/media/carousel"

echo "### COVER (homepage hero) ###"
COVER_SRC="$SRC/COUVERTURE/Couverture Portfolio.png"
COVER_OUT="$REPO/public/media/cover/couverture-portfolio.webp"
if [ -f "$COVER_SRC" ]; then
  mkdir -p "$REPO/public/media/cover"; rm -f "$COVER_OUT"
  encode "$COVER_SRC" "$COVER_OUT" && printf '  cover -> %s\n' "$(basename "$COVER_OUT")" || printf '  !! FAILED: cover\n'
else
  printf '  (cover source not found — skipped)\n'
fi

echo "### FONTS (copy ttf as-is) ###"
mkdir -p "$REPO/app/assets/fonts"
[ -d "$SRC/FONTS" ] && cp "$SRC/FONTS/"*.ttf "$REPO/app/assets/fonts/" 2>/dev/null && echo "  copied ttf" || echo "  (no fonts)"

echo "### CVs + BIG PDFs (if present) ###"
mkdir -p "$REPO/public/media/cv" "$REPO/public/media/pdf"
cp "$SRC/CV_Matthieu_DUVAL_ENG.pdf" "$REPO/public/media/cv/cv-matthieu-duval-en.pdf" 2>/dev/null || true
cp "$SRC/CV_Matthieu_DUVAL_FR.pdf"  "$REPO/public/media/cv/cv-matthieu-duval-fr.pdf" 2>/dev/null || true
cp "$SRC/Portfolio Architecture Matthieu 2026 ENG.pdf" "$REPO/public/media/pdf/portfolio-2026-en.pdf" 2>/dev/null || true
cp "$SRC/Portfolio Architecture Matthieu 2026 FR.pdf"  "$REPO/public/media/pdf/portfolio-2026-fr.pdf" 2>/dev/null || true
cp "$SRC/PDF A EMBED/memoire_Amazon FINAL.pdf"         "$REPO/public/media/pdf/DUVAL_Matthieu_MIR.pdf" 2>/dev/null || true

echo "### DONE ###"
