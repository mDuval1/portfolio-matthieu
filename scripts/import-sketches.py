#!/usr/bin/env python3
"""Import renamed CROQUIS sketches -> repo webp + parsed manifest skeleton.

Source filenames follow the convention:
    Country _ City _ DD.MM.YY _ Title.jpeg      (City optional, e.g. Singapour)
Field separator is " _ " (space-underscore-space); a bare "_" inside the title
is a stand-in for an apostrophe (d_aiguillage -> d'aiguillage).

Each image is converted to webp (long edge <= 2400, q82 -- same as
import-visuals.sh) and named  YYYY-MM-DD-<place>-<title>.webp  (date-prefixed so
the slug is sort-stable and unique). A JSON manifest (French fields + ISO date +
file) is printed to stdout for hand-authoring app/utils/sketches.ts.

Usage:  python3 scripts/import-sketches.py [SRC_DIR]   (default: ~/Downloads/CROQUIS)
The English half of each label is filled in by hand in sketches.ts.
"""
import json
import os
import re
import subprocess
import sys
import unicodedata

SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Downloads/CROQUIS")
REPO = "/Users/mduval/personal/portfolio-matthieu"
DEST = os.path.join(REPO, "public/media/sketches")
MAXEDGE, Q = 2400, 82
DATE_RE = re.compile(r"^(\d{2})\.(\d{2})\.(\d{2})$")
EXT_RE = re.compile(r"(\.jpe?g)+$", re.I)


def slug(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "img"


def parse(fname: str):
    stem = EXT_RE.sub("", fname).strip()
    parts = [p.strip() for p in stem.split(" _ ")]
    country = parts[0]
    if len(parts) >= 2 and DATE_RE.match(parts[1]):          # no city (city-state)
        city, date_tok, title = None, parts[1], " _ ".join(parts[2:])
    else:
        city, date_tok, title = parts[1], parts[2], " _ ".join(parts[3:])
    title = title.replace("_", "'").strip()
    d, m, y = DATE_RE.match(date_tok).groups()
    iso = f"20{y}-{m}-{d}"
    return country, city, iso, title


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"NOT FOUND: {SRC}")
    os.makedirs(DEST, exist_ok=True)
    for f in os.listdir(DEST):                                # clean for idempotent re-runs
        if f.endswith(".webp"):
            os.remove(os.path.join(DEST, f))

    rows, used = [], set()
    files = sorted(f for f in os.listdir(SRC) if EXT_RE.search(f))
    for fname in files:
        country, city, iso, title = parse(fname)
        place = slug(city or country)
        base = f"{iso}-{place}-{slug(title)}"
        out = f"{base}.webp"
        n = 1
        while out in used:
            n += 1
            out = f"{base}-{n}.webp"
        used.add(out)
        src_path = os.path.join(SRC, fname)
        ok = subprocess.run(
            ["magick", src_path, "-resize", f"{MAXEDGE}x{MAXEDGE}>", "-quality", str(Q),
             os.path.join(DEST, out)],
            stderr=subprocess.DEVNULL,
        ).returncode == 0
        rows.append({"file": out, "date": iso, "country_fr": country,
                     "city_fr": city, "title_fr": title, "ok": ok})

    rows.sort(key=lambda r: r["date"], reverse=True)           # most recent first
    print(json.dumps(rows, ensure_ascii=False, indent=2))
    bad = [r["file"] for r in rows if not r["ok"]]
    print(f"\n# {len(rows)} sketches, {len(bad)} failed conversions: {bad}", file=sys.stderr)


if __name__ == "__main__":
    main()
