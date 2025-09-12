#!/bin/bash

set -e

npm run build-peridio-cli
npm run build-avocado-cli
mkdir -p static/schemas
cp schemas/avocado-config.json static/schemas/

docusaurus build
