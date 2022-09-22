---
title: update
---

# peridio deployments update

Update a deployment.

## Usage

```
peridio \
  deployments \
  update \
  [OPTIONS] \
  --api-key <api-key> \
  --deployment-name <deployment-name> \
  --firmware-uuid <firmware-uuid> \
  --is-active <is-active>
  --name <name> \
  --organization-name <organization-name> \
  --product-name <product-name>
  --tags <tags> \
  --version <version>
```

## Flags

`-h`, `--help`

Prints help information

`-V`, `--version`

Prints version information

## Options

`--tags <tags>`

The device tags list.

`--version <version>`

The version of the deployment. Must respect this format: https://hexdocs.pm/elixir/Version.html#module-requirements

`--name <name>`

The name of the deployment.

`--firmware-uuid <firmware-uuid>`

The firmare uuid.

`--is-active <is-active>`

Whether or not the deployment is active.

### Required

`--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize the request.

`--deployment-name <deployment-name>`

The name of the deployment.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
