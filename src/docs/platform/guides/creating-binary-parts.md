# Creating Binary Parts

This guide describes how to create binary parts.

To learn more about Peridio binary parts in general, see the [binary parts](/platform/reference/binary-parts) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create Binary Part

### CLI

```console
peridio binary-parts create \
  --binary-prn $PERIDIO_BINARY_PRN \
  --binary-content-path $PERIDIO_BINARY_CONTENT_PATH \
  --size $PERIDIO_SIZE \
  --hash $PERIDIO_HASH
```

### API

Use the Peridio Admin API [create-a-binary-part](/admin-api#binaries/operation/create-a-binary-part) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
