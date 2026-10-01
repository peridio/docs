#!/bin/bash

set -e

npm run sync-references
npm run sync-targets
npm run sync-schema

mkdir -p static/schemas
cp schemas/avocado-config.json static/schemas/

docusaurus build
