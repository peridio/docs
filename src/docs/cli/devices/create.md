---
title: create
---

# peridio devices create

Create a device.

## Usage

```
peridio \
  devices \
  create \
  [OPTIONS] \
  --api-key <api-key> \
  --description <description> \
  --healthy <healthy> \
  --identifier <identifier> \
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

`--tags <tags>`

The device tags list.

`--version <version>`

The version of the deployment. Must respect this format: https://hexdocs.pm/elixir/Version.html#module-requirements

### Required

`--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize the request.

`--description <description>`

The device description.

`--healthy <healthy>`

Is the device healthy.

`--identifier <identifier>`

The device unique identifier.

`--last-communication <last-communication>`

The last time there was communication with the device.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.

`--tags <tags>`

The tags of the device.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
