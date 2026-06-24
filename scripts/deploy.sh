#!/usr/bin/env bash
# Deploy via LOCAL static build — NOT `vercel build`.
# `vercel build` (and Vercel's cloud build) run @nuxt/image in an env where it
# abandons ipxStatic, so the /_ipx variants never get baked and every <NuxtImg>
# 404s. A plain `nuxt generate` bakes them correctly; we wrap that output in the
# Build Output API and upload it prebuilt (no cloud rebuild, no LFS refetch).
set -euo pipefail
cd "$(dirname "$0")/.."

TARGET="${1:-preview}"   # preview | prod

echo "▶ nuxt generate (static; ipxStatic bakes /_ipx)…"
pnpm generate

echo "▶ assembling .vercel/output (Build Output API v3)…"
rm -rf .vercel/output
mkdir -p .vercel/output/static
cp -R .output/public/. .vercel/output/static/
printf '{"version":3}' > .vercel/output/config.json
ipx=$(find .vercel/output/static/_ipx -type f 2>/dev/null | wc -l | tr -d ' ')
echo "  baked _ipx variants: ${ipx}"
[ "$ipx" -gt 0 ] || { echo "✗ no /_ipx baked — aborting"; exit 1; }

if [ "$TARGET" = "prod" ]; then
  echo "▶ deploying to PRODUCTION…"
  pnpm exec vercel deploy --prebuilt --prod
else
  echo "▶ deploying preview…"
  pnpm exec vercel deploy --prebuilt
fi
