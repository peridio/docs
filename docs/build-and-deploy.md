# Build and Deploy

## Build

```
yarn --cwd src build
```

Builds and outputs static content into the `build` directory ready to be served.

## Deploy

## Production

Use the deploy command to deploy to production:

```
GIT_USER=<Your GitHub username> USE_SSH=true yarn --cwd src deploy
```

Builds the website and pushes to the `gh-pages` branch.
