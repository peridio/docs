---
title: list
---

# peridio firmwares list

List firmwares information.

## Usage

```
peridio \
  firmwares \
  list \
  [OPTIONS] \
  --api-key <api-key> \
  --product-name <product-name> \
  --organization-name <organization-name>
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

`--product-name <product-name>`

The name of the product.

`--organization-name <organization-name>`

The organization to interact with.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
