#!/bin/bash
#
# Generate the dithered Field Notes index thumbnails.
#
# Runnable from anywhere in the repo. Fetches the pinned didder binary if it is
# missing, then converts every note whose source image or preset has changed.
# Unchanged notes are skipped, so this is safe to run repeatedly.
#
# Usage:
#   ./scripts/thumbnails.sh                       # convert what changed
#   ./scripts/thumbnails.sh --only <note-slug>    # one note
#   ./scripts/thumbnails.sh --force               # ignore the lock, rebuild all
#   ./scripts/thumbnails.sh --check               # report drift, write nothing
#   ./scripts/thumbnails.sh --list-presets        # print each preset's didder argv
#
# A note opts in with one line of front matter:
#   image_source: local:my-capture.png   # or unsplash:<photo-id> / url:<link>
# The script fills in `image` itself, because the extension depends on whether
# the source turns out to be animated.
#
# Recipe and palette live in src/scripts/thumbnails/presets.json. Editing that
# file invalidates every note, so a plain run regenerates them all.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

bash "$REPO_ROOT/src/scripts/thumbnails/ensure-didder.sh"
npm --prefix "$REPO_ROOT/src" run --silent thumbs -- "$@"
