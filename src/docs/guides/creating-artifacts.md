# Creating Artifact Versions

This guide describes how to create artifact versions.

To learn more about Peridio artifact versions in general, see the
[artifact versions](/reference/artifact-versions) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.4.0.

## Create Artifact Version

### CLI

```
peridio artifact-versions create \
  --artifact-id uuid \
  --version 0.1.0
```

### API

Use the Peridio Admin API
[Create an artifact version](/admin-api#tag/artifacts/operations/create-an-artifact) endpoint.

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).
