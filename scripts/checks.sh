#!/bin/bash

set -e

cd src

npm ci
npm exec --no -- redocly lint --config redocly.yaml
npm run lint
npm exec -- prettier --check .
npm run build
