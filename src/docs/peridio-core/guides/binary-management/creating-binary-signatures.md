---
title: 'Creating binary signatures'
description: 'Step-by-step guide to creating binary signatures in Peridio Core for cryptographic verification and secure device deployment with CLI instructions.'
---

This guide describes how to create binary signatures.

To learn more about Peridio binary signatures in general, see the [binary signatures](/peridio-core/reference/binary-management/binary-signatures) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create binary signature

### CLI

```console
peridio binary-signatures create \
  --binary-prn $PERIDIO_BINARY_PRN \
  --signing-key-pair-name $PERIDIO_SIGNING_KEY_PAIR_NAME
```

### API

Use the Peridio Admin API [create-a-binary-signature](/peridio-core/tools/admin-api#binary-signatures/operation/create-a-binary-signature) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
