---
title: list
---

# peridio deployments list

List deployments information.

## Usage

```
peridio \
  deployments \
  list \
  [OPTIONS] \
  --api-key <api-key> \
  --organization-name <organization-name> \
  --product-name <product-name>
```

## Flags

`-h`, `--help`

Prints help information

`-V`, `--version`

Prints version information

## Options

### Required

`--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize the request.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
