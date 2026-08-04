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
# Generate the reference pages before validating diagrams. They are written into
# a gitignored directory by sync-references, which `npm run build` also runs - so
# checking before the build used to scan the tree while that whole set of live
# pages was still absent. The build re-runs it; it is cheap and idempotent.
npm run sync-references
# Diagrams render in the reader's browser, so `npm run build` below passes even
# with a malformed one. Check them before the build rather than after deploy.
npm run check-mermaid
npm run build
