---
title: 'Creating binary parts'
description: 'Step-by-step guide to creating binary parts in Peridio Core for multipart upload management with CLI and web console instructions.'
---

This guide describes how to create binary parts.

To learn more about Peridio binary parts in general, see the [binary parts](/peridio-core/reference/binary-management/binary-parts) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create binary part

### CLI

```console
peridio binary-parts create \
  --binary-prn $PERIDIO_BINARY_PRN \
  --binary-content-path $PERIDIO_BINARY_CONTENT_PATH \
  --size $PERIDIO_SIZE \
  --hash $PERIDIO_HASH
```

### API

Use the Peridio Admin API [create-a-binary-part](/peridio-core/tools/admin-api#binary-parts/operation/create-a-binary-part) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
