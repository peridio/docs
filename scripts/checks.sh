#!/bin/bash

set -e

# Cheap and dependency-free, so it runs before the install and reports a missing
# changelog registration in seconds rather than after a full build.
"$(dirname "$0")/check-changelog-registration.sh"

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
