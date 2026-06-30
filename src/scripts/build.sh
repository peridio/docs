#!/bin/bash

set -e

npm run sync-references
npm run sync-targets

mkdir -p static/schemas
cp schemas/avocado-config.json static/schemas/

docusaurus build
