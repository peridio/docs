---
title: update
---

# peridio devices update

Update a device.

## Usage

```
peridio \
  devices \
  update \
  [OPTIONS] \
  --api-key <api-key> \
  --description <description> \
  --healthy <healthy> \
  --device-identifier <device-identifier> \
  --last-communication  <last-communication> \
  --organization-name <organization-name> \
  --product-name <product-name> \
  --tags <tags>
```

## Flags

`-h`, `--help`

Prints help information

`-V`, `--version`

Prints version information

## Options

`--description <description>`

The device description.

`--healthy <healthy>`

Is the device healthy.

`--last-communication <last-communication>`

The last time there was communication with the device.

`--tags <tags>`

The tags of the device.

### Required

`--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize the request.

`--device-identifier <device-identifier>`

The device unique identifier.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
