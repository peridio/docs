---
title: create
---

# peridio products create

Create a product.

## Usage

```
peridio \
  products \
  create \
  [OPTIONS] \
  --api-key <api-key> \
  --delta-updatable <delta-updatable> \
  --name <name> \
  --organization-name <organization-name>
```

## Flags

`-h`, `--help`

Prints help information

`-V`, `--version`

Prints version information

## Options

`--delta-updatable <delta-updatable>`

Is the product delta updatable.

### Required

`--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize the request.

`--name <name>`

The name of the product.

`--organization-name <organization-name>`

The organization to interact with.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
