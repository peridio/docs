---
title: create
---

# peridio organization create-user

Create an organization user.

## Usage

```
peridio \
  organization \
  create-user \
  [OPTIONS] \
  --api-key <api-key> \
  --organization-name <organization-name> \
  --role <role> \
  --username <username>
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

`--role <role>`

The organization user role.

`--username <username>`

The organization user username.

### Defaulted

`--base-url <base-url>`, `$PERIDIO_BASE_URL`

The base URL of the API to interact with.
