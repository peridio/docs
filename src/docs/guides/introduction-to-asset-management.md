# Introduction to Asset Management

This guide serves as a comprehensive introduction to asset management that will cover artifacts, artifact versions, binaries, binary parts, binary signatures, and signing keys.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Asset Management Resources

Asset management comprises the following resources:

- [Artifacts](/reference/artifacts) - define types for your binaries.
- [Artifact Versions](/reference/artifact-versions) - define versions for your artifacts.
- [Binaries](/reference/binaries) - define target-specific binaries for your artifact versions.
- [Binary Parts](/reference/binary-parts) - facilitate multipart uploads.
- [Binary Signatures](/reference/binary-signatures) - associate binaries with signatures and the corresponding signing keys.
- [Signing Keys](/reference/signing-keys) - verify binary signatures.

## Getting Started

The goal of this guide is to register a signed binary with Peridio from scratch.

### Creating an Artifact

Create an artifact so that we have a type for our binary.

```
peridio artifacts create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --name "Toaster Firmware"
```

### Creating a Version

Create a version for that artifact.

```
peridio artifact-versions create \
  --artifact-prn $PERIDIO_ARTIFACT_PRN \
  --version "1.0.0"
```

### Creating Signing Keys

If you don't have one already, we will need to create a signing key pair.

Create a private signing key. We will use this key to sign hashes of our binaries.

```
openssl genpkey -algorithm Ed25519 -out private.pem
```

Derive a public signing key. We will provide this key to Peridio to verify the binaries we upload are signed by the private key.

```
openssl pkey -in private.pem -pubout -out public.pem
```

### Creating a Binary

Create a binary for that version.

```
peridio binaries create \
  --artifact-version-prn $PERIDIO_VERSION \
  --content-path $PERIDIO_CONTENT_PATH \
  --signing-key-pair $PERIDIO_SIGNING_KEY_PAIR \
  --target $PERIDIO_TARGET
```

The above command will:

1. ensure a binary with the provided target exists
2. perform a multipart upload of the binary
3. sign the binary

At this point you will have a signed binary that is ready to be included in [bundles](/reference/bundles) and ultimately distributed via [releases](/reference/releases).
