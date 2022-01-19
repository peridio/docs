# Build and Deploy

Yarn commands are executed in the `src` directory

## Build

```
yarn build
```

Builds and outputs static content into the `build` directory ready to be served.

## Deployment

Manual deployment should only be leveraged for break-the-glass exceptional events. The normal process of deploying changes should leverage automatic deployment.

## Manual

```
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

Builds the website and pushes to the `gh-pages` branch.

## Automatic

Upon merging into the `main` branch, CI/CD will build the website and push to the `gh-pages` branch.
