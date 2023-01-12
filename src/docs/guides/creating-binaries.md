# Creating Binaries

This guide describes how to create binaries.

To learn more about Peridio binaries in general, see the [binaries](/reference/binaries)
reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.4.0.

## Create Binary

### CLI

Create the binary's record.

```console
peridio binaries create \
  --artifact-version-id uuid \
  --version 0.1.0
```

Upload the binary's content.

```console
peridio binaries upload \
  --binary-id uuid \
  --path /tmp/my-binary
```

### API

Use the Peridio Admin API
[Create a binary](/admin-api#tag/artifacts/operations/create-a-binary) endpoint.

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).
