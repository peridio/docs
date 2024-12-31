# Creating binaries

This guide describes how to create binaries.

To learn more about Peridio binaries in general, see the [binaries](/platform/reference/binaries)
reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create binary

### CLI

#### Create, upload, and sign

To create, upload, and sign a binary all at once:

```console
peridio binaries create \
  --artifact-version-prn $PERIDIO_ARTIFACT_VERSION_PRN \
  --content-path $PERIDIO_CONTENT_PATH \
  --signing-key-pair $PERIDIO_SIGNING_KEY_PAIR \
  --target $PERIDIO_TARGET
```

#### Create

If you wish to only create the binary record (and not upload nor sign content):

```console
peridio binaries create \
  --artifact-version-prn $PERIDIO_ARTIFACT_VERSION_PRN \
  --content-path $PERIDIO_CONTENT_PATH \
  --target $PERIDIO_TARGET \
  --skip-upload
```

At this point you could still run the first command to automatically upload and sign the binary.

Alternatively you could manually perform a [multipart upload with binary parts](multipart-uploads-with-binary-parts) and then manually attach a signature by [creating a binary signature](creating-binary-signatures).

### API

Use the Peridio Admin API [create-a-binary](/admin-api#binaries/operation/create-a-binary) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
