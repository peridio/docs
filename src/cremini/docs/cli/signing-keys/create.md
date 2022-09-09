---
title: create
---

# peridio signing-keys create

Create a signing key.

## Usage

```
peridio \
  signing-keys \
  create \
  [OPTIONS] \
  --api-key <api-key> \
  --key <key> \
  --name <name> \
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

`--key <key>`

The base64 encoding of the raw 32 byte public key.

`--name <name>`

The name of the key.

`--organization-name <organization-name>`

The organization to interact with.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
