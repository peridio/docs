#!/bin/bash

set -e

cd src

npm ci

# Regenerate the Connect API reference from the committed OpenAPI spec and fail
# on drift: catches a stale/incomplete regeneration and a spec the generator
# can't process (e.g. a broken $ref).
npm run build-connect-api
if [ -n "$(git status --porcelain docs-guides/avocado-connect-api)" ]; then
  echo "error: generated Connect API docs are out of sync with the spec." >&2
  echo "Run 'npm run build-connect-api' in src/ and commit the result:" >&2
  git status --porcelain docs-guides/avocado-connect-api >&2
  exit 1
fi

npm run lint
npm exec -- prettier --check .
npm run build
# Diagrams render in the reader's browser, so `npm run build` above passes even
# with a malformed one - check them here rather than finding out after deploy.
# After the build, because the build's own sync-references populates the
# generated reference pages this needs to scan; running it first meant either
# skipping those pages or cloning avocado-linux/references twice.
npm run check-mermaid
