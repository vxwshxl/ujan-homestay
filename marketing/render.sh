#!/usr/bin/env bash
# Renders every raster brand asset from its source. Run from anywhere after
# editing marketing/og/og.html or marketing/icon/icon.svg:
#
#   bash marketing/render.sh
#
#   og/og.html     -> src/app/opengraph-image.png, src/app/twitter-image.png (1200x630)
#   icon/icon.svg  -> src/app/icon.svg, src/app/favicon.ico (16/32/48),
#                     public/icon-192.png, public/icon-512.png
#   (full-bleed)   -> src/app/apple-icon.png (180), public/icon-maskable-512.png
#
# Headless Chrome rather than next/og: Satori cannot read the woff2 fonts the
# site ships, and a real browser renders the exact brand type and tokens.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

shot() { # source-file  WxH  out.png
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --default-background-color=00000000 \
    --window-size="$2" --virtual-time-budget=20000 \
    --screenshot="$3" "file://$1" 2>/dev/null
}

# Share banner
shot "$ROOT/marketing/og/og.html" 1200,630 "$ROOT/src/app/opengraph-image.png"
cp "$ROOT/src/app/opengraph-image.png" "$ROOT/src/app/twitter-image.png"

# Rounded mark (transparent corners) for browsers and PWA
cp "$ROOT/marketing/icon/icon.svg" "$ROOT/src/app/icon.svg"
shot "$ROOT/marketing/icon/icon.svg" 512,512 "$TMP/icon-512.png"
cp "$TMP/icon-512.png" "$ROOT/public/icon-512.png"
sips -z 192 192 "$TMP/icon-512.png" --out "$ROOT/public/icon-192.png" >/dev/null
for s in 16 32 48; do sips -z "$s" "$s" "$TMP/icon-512.png" --out "$TMP/fav-$s.png" >/dev/null; done
node "$ROOT/marketing/pack-ico.mjs" "$ROOT/src/app/favicon.ico" "$TMP/fav-16.png" "$TMP/fav-32.png" "$TMP/fav-48.png"

# Full-bleed square for iOS (which rounds it itself and fills transparency
# with black) and the maskable PWA icon.
sed 's/rx="15" //' "$ROOT/marketing/icon/icon.svg" > "$TMP/icon-full.svg"
shot "$TMP/icon-full.svg" 512,512 "$TMP/full-512.png"
cp "$TMP/full-512.png" "$ROOT/public/icon-maskable-512.png"
sips -z 180 180 "$TMP/full-512.png" --out "$ROOT/src/app/apple-icon.png" >/dev/null

echo "rendered brand assets"
