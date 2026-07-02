# Convenience wrapper around the npm/sync steps for the docs site.
#
# The reference and hardware-target docs (src/docs-guides/references/,
# the generated targets data) are generated, gitignored, and produced by
# the sync scripts. `docusaurus start` does NOT run those syncs, so a bare
# `npm start` fails on the missing sidebar ids. `make dev` runs the sync
# first, then starts the server, so it boots clean every time.

SRC := src
NPM := npm --prefix $(SRC)

.DEFAULT_GOAL := all

.PHONY: all help install sync dev start build serve clean

all: build serve ## Build, then serve it at http://localhost:3000 (bare `make`)

help: ## Show the available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	  awk 'BEGIN{FS = ":.*?## "}{printf "  make %-9s %s\n", $$1, $$2}'

install: ## Install dependencies (root + src via postinstall)
	npm install

sync: ## Generate the reference + hardware-target docs
	$(NPM) run sync-references
	$(NPM) run sync-targets

dev: sync start ## Sync generated docs, then start the dev server (http://localhost:3000)

start: ## Start the dev server without re-syncing (fast re-run once synced)
	$(NPM) run start

build: ## Full production build (runs the syncs, then docusaurus build)
	$(NPM) run build

serve: ## Serve the last production build
	$(NPM) run serve

clean: ## Clear the Docusaurus cache and the generated docs
	$(NPM) run clear
	rm -rf $(SRC)/docs-guides/references $(SRC)/.cache-references
