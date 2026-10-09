#!/bin/bash
# Local Lighthouse baseline against the production build in ./build.
#
#   npm --prefix src run build          # first
#   src/scripts/lighthouse-audit.sh     # writes src/.lighthouse/<slug>.<form>.report.{json,html}
#   src/scripts/lighthouse-audit.sh out # custom output dir (relative to src/)
#
# Uses `serve` WITHOUT -s: the SPA fallback would return index.html for every
# route. `serve` also sends brotli, which is close to what GitHub Pages does.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=${1:-.lighthouse}
PORT=${PORT:-4175}
PAGES=(/ /hardware/support-matrix /developer-reference/getting-started /field-notes /changelog/latest /avocado-os/about /hardware/qualcomm/rubik-pi-3 /field-notes/2026/07/28/ros2-foxglove-immutable-os)

[ -d build ] || { echo "build/ missing - run npm run build first" >&2; exit 1; }
npx --yes serve@14 build -l "$PORT" -n >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
sleep 3
mkdir -p "$OUT"

for p in "${PAGES[@]}"; do
  slug=$(echo "$p" | sed 's#^/##; s#/#_#g'); [ -z "$slug" ] && slug=home
  for form in mobile desktop; do
    extra=(); [ "$form" = desktop ] && extra=(--preset=desktop)
    npx --yes lighthouse@13 "http://localhost:$PORT$p" --quiet \
      --chrome-flags="--headless=new" \
      --output=json --output=html --output-path="$OUT/$slug.$form" \
      --only-categories=performance,accessibility,best-practices,seo ${extra[@]+"${extra[@]}"}
  done
done
node scripts/lighthouse-summary.js "$OUT"
