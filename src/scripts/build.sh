#!/bin/bash

set -e

npm run sync-references
npm run sync-targets

mkdir -p static/schemas
cp schemas/avocado-config.json static/schemas/

docusaurus build

# Field Notes preview gate: drop the public feeds for the gated section.
# Companion to plugins/field-notes-preview-gate (noindex meta) and the
# clientModule + inline head script (URL/session flag redirect).
# Remove this block when Field Notes goes public.
rm -f build/field-notes/rss.xml build/field-notes/atom.xml build/field-notes/feed.json
