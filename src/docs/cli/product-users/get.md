---
title: get
---

# peridio product get-user

Get an product user.

## Usage

```
peridio \
  product \
  get-user \
  [OPTIONS] \
  --api-key <api-key> \
  --organization-name <organization-name> \
  --product-name <product-name> \
  --user-username <user-username>
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

`--user-username <user-username>`

The organization user username.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
