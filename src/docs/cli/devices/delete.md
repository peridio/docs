---
title: delete
---

# peridio devices delete

Delete a device.

## Usage

```
peridio \
  devices \
  delete \
  [OPTIONS] \
  --api-key <api-key> \
  --device-identifier <device-identifier> \
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

`--device-identifier <device-identifier>`

The unique identifier of the device.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
