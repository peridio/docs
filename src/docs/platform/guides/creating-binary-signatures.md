# Creating Binary Signatures

This guide describes how to create binary signatures.

To learn more about Peridio binary signatures in general, see the [binary signatures](/platform/reference/binary-signatures) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create Binary Signature

### CLI

```console
peridio binary-signatures create \
  --binary-prn $PERIDIO_BINARY_PRN \
  --signing-key-pair-name $PERIDIO_SIGNING_KEY_PAIR_NAME
```

### API

Use the Peridio Admin API [create-a-binary-signature](/admin-api#binaries/operation/create-a-binary-signature) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
