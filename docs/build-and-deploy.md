# Build and Deploy

## Build

```
npm --prefix src run build
```

Builds and outputs static content into the `build` directory ready to be served.

## Generate Peridio CLI Docs

```
npm --prefix src run gen-cli
```

This command uses your local Peridio CLI. The script itself hardcodes a particular version requirement of the CLI to help protect against documentation regression.

## Deploy

## Production

Use the deploy command to deploy to production:

```
GIT_USER=<Your GitHub username> USE_SSH=true npm --prefix src run deploy
```

Builds the website and pushes to the `gh-pages` branch.
