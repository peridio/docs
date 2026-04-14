#!/bin/bash

set -e

npm run sync-references

mkdir -p static/schemas
cp schemas/avocado-config.json static/schemas/

docusaurus build
