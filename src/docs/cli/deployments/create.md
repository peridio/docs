---
title: create
---

# peridio deployments create

Create a deployment.

## Usage

```
peridio \
  deployments \
  create \
  [OPTIONS] \
  --api-key <api-key> \
  --firmware-uuid <firmware-uuid> \
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

`--version <version>`

The version of the deployment. Must respect this format: https://hexdocs.pm/elixir/Version.html#module-requirements

### Required

`--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize the request.

`--firmware-uuid <firmware-uuid>`

The firmare uuid.

`--name <name>`

The name of the deployment.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.

`--tags <tags>`

The device tags list.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
