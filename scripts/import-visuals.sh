#!/usr/bin/env bash
# One-shot importer: Drive "VISUELS SITE PERSO" -> repo web assets.
# Images -> webp (long edge <=2400, q82). Fonts/CVs copied as-is.
# Big PDFs copied but git-ignored. Originals are NOT copied (stay in SRC).
set -uo pipefail   # NOT -e: one magick failure must not abort the whole import

SRC="$HOME/Downloads/VISUELS SITE PERSO"
REPO="/Users/mduval/personal/portfolio-matthieu"
MAXEDGE=2400
Q=82

slug() {                       # slugify a basename (no extension) -> kebab ascii
  python3 - "$1" <<'PY'
import sys, unicodedata, re
s = unicodedata.normalize('NFKD', sys.argv[1]).encode('ascii', 'ignore').decode().lower()
s = re.sub(r'copie de ', '', s)            # drop Drive "Copie de" duplication marker
s = re.sub(r'_?plan de travail \d+', '', s)  # drop Illustrator artboard suffix
s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
print(s or 'img')
PY
}

convert_dir() {                # $1 = source subfolder, $2 = dest dir
  local sdir="$SRC/$1" ddir="$REPO/$2"
  mkdir -p "$ddir"
  rm -f "$ddir"/*.webp           # clean for idempotent re-runs (no -2 dupes)
  find "$sdir" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0 \
  | while IFS= read -r -d '' f; do
      base="$(basename "$f")"; base="${base%.*}"
      name="$(slug "$base")"; [ -z "$name" ] && name="img"
      out="$ddir/$name.webp"; n=1
      while [ -e "$out" ]; do n=$((n+1)); out="$ddir/$name-$n.webp"; done
      if magick "$f" -resize "${MAXEDGE}x${MAXEDGE}>" -quality "$Q" "$out" 2>/dev/null; then
        printf '  %-44s -> %s (%s)\n' "$base" "$(basename "$out")" "$(du -h "$out" | cut -f1)"
      else
        printf '  !! FAILED: %s\n' "$base"
      fi
    done
}

echo "### PROJECT IMAGES ###"
convert_dir "01_PHILOPOLIS"              "public/media/projects/01-philopolis"
convert_dir "02_BAHANAAUE"               "public/media/projects/02-bahanaaue"
convert_dir "03_PALIMPSESTE"             "public/media/projects/03-palimpseste"
convert_dir "04_LA PESANTEUR ET LA GRACE" "public/media/projects/04-pesanteur-grace"
convert_dir "05_REVELATION"              "public/media/projects/05-revelation"
echo "### SKETCHES ###";  convert_dir "CROQUIS"         "public/media/sketches"
echo "### CAROUSEL ###";  convert_dir "VISUELS CAROUSEL" "public/media/carousel"

echo "### FONTS (copy ttf as-is) ###"
mkdir -p "$REPO/app/assets/fonts"
cp -v "$SRC/FONTS/"*.ttf "$REPO/app/assets/fonts/" | sed 's/^/  /'

echo "### CVs (small, committed) ###"
mkdir -p "$REPO/public/media/cv"
cp -v "$SRC/CV_Matthieu_DUVAL_ENG.pdf" "$REPO/public/media/cv/cv-matthieu-duval-en.pdf"
cp -v "$SRC/CV_Matthieu_DUVAL_FR.pdf"  "$REPO/public/media/cv/cv-matthieu-duval-fr.pdf"

echo "### BIG PDFs (copied locally, git-ignored) ###"
mkdir -p "$REPO/public/media/pdf"
cp -v "$SRC/Portfolio Architecture Matthieu 2026 ENG.pdf" "$REPO/public/media/pdf/portfolio-2026-en.pdf"
cp -v "$SRC/Portfolio Architecture Matthieu 2026 FR.pdf"  "$REPO/public/media/pdf/portfolio-2026-fr.pdf"
cp -v "$SRC/PDF A EMBED/memoire_Amazon FINAL.pdf"         "$REPO/public/media/pdf/memoire-amazon.pdf"

echo "### DONE ###"
