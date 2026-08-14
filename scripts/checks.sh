#!/bin/bash

set -e

cd src

npm ci
npm run lint
npm exec -- prettier --check .
npm run build
