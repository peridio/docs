# Creating Releases

This guide describes how to create releases.

To learn more about Peridio releases in general, see the [releases](/reference/releases)
reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.4.0.

## Create Release

### CLI

```console
peridio releases create \
  --bundle-id uuid \
  --cohort-id uuid
```

### API

Use the Peridio Admin API
[Create a release](/admin-api#tag/artifacts/operations/create-a-release) endpoint.

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).
