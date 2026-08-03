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
# Diagrams render in the reader's browser, so `npm run build` below passes even
# with a malformed one. Check them before the build rather than after deploy.
npm run check-mermaid
npm run build
