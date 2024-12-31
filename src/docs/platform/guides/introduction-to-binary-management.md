# Introduction to binary management

This guide serves as a comprehensive introduction to binary management that will cover artifacts, artifact versions, binaries, binary parts, binary signatures, and signing keys.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Binary management resources

Binary management comprises the following resources:

- [Artifacts](/platform/reference/artifacts) - define a type for your binaries.
- [Artifact Versions](/platform/reference/artifact-versions) - define a version for your binaries.
- [Binaries](/platform/reference/binaries) - record the content you wish to disitribute to devices.
- [Binary Parts](/platform/reference/binary-parts) - multipart uploads for binaries.
- [Binary Signatures](/platform/reference/binary-signatures) - represent signatures.
- [Signing Keys](/platform/reference/signing-keys) - verify signatures.

## Getting started

We need to create an artifact so that our binary can have a type and be reasoned about categorically. We need to create artifact versions so that the binaries we create can be versioned. Artifacts and artifact versions are seperate resources so that versions can be tracked across artifacts. Binaries record the content you wish to disitribute to devices. Binary parts, binary signatures, and signing keys will help us upload and sign our binary so that Peridio and downstream consumers of the binary can verify that you created it.

### Create an artifact

[Create an artifact](creating-artifacts) so that we have a type for our binary.

```
peridio artifacts create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --name "ML-Model"
```

### Create an artifact version

[Create an artifact version](creating-artifact-versions) for that artifact.

```
peridio artifact-versions create \
  --artifact-prn $PERIDIO_ARTIFACT_PRN \
  --version "1.0.0"
```

### Create signing keys

[Create a signing key](creating-signing-keys) if you don't have one already.

Create a private signing key. We will use this key to sign hashes of our binaries.

```
openssl genpkey -algorithm Ed25519 -out private.pem
```

Derive a public signing key. We will register this key with Peridio so that it can verify that only binaries you specify are allowed in your organization.

```
openssl pkey -in private.pem -pubout -out public.pem
```

Convert the public key from PEM to RAW.

```
openssl pkey -outform DER -pubin -in public.pem -pubout \
  | tail -c +13 \
  | base64 > public.raw
```

:::info signing-keys-create pem via --path
This conversion will not be necessary for long. It is planned for the Peridio CLI's [create-signing-key](/cli/signing-keys/create) command to support a `--path` option soon that would work with PEM files.
:::

Register the public key with Peridio.

```
peridio signing-keys create \
  --value $(cat public.raw) \
  --name prod
```

### Create a binary

Create a binary for that version.

```
peridio binaries create \
  --artifact-version-prn $PERIDIO_ARTIFACT_VERSION \
  --content-path binary-content.dat \
  --signing-key-pair prod \
  --target aarch64-unknonw-linux
```

:::tip test file generation
One way to quickly generate files of a particular byte size with random content (in this case 100 bytes) is: `cat /dev/urandom | head -c 100 > binary-content.dat`. On modern systems this is fast even for multi-GB files.
:::

The above command will:

1. Ensure a binary with the provided target exists for the given artifact version.
2. Perform a resumable multipart upload of the binary content.
3. Sign the binary using the given signing key pair.

At this point you will have a signed binary that is ready to be included in [bundles](/platform/reference/bundles) and distributed via [releases](/platform/reference/releases).

To get started on that, checkout the [Introduction to Release
Management](introduction-to-release-management) guide.
