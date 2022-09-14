---
title: create
---

# peridio firmwares create

Create a firmware.

## Usage

```
peridio \
  firmwares \
  create \
  [OPTIONS] \
  --api-key <api-key> \
  --firmware <firmware> \
  --organization-name <organization-name> \
  --product-name <product-name> \
  --ttl <ttl> \
```

## Flags

`-h`, `--help`

Prints help information

`-V`, `--version`

Prints version information

## Options

`--firmware <firmware>`

The path to the firmware.

`--ttl <ttl>`

The expiration time for the given firmware.

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
