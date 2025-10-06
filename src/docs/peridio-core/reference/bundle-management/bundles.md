---
title: 'Bundles'
description: 'Immutable ordered sets of binaries and metadata in Peridio Core - distribute consistent updates across devices with cryptographic verification.'
---

Bundles are immutable ordered sets of [binaries](/peridio-core/reference/binary-management/binaries) and [custom metadata](#custom-metadata) that can be distributed to devices.

## Distribution

Bundles may be distributed to devices via [releases](/peridio-core/reference/bundle-management/releases) and [bundle overrides](bundle-overrides).

:::tip bundle re-distribution
A bundle can be configured into an zero to many releases and bundle overrides.
:::

Bundles enable distributing the exact same set of binaries and custom metadata across multiple devices and cohorts, allowing the cryptographically identical set of assets tested in one place to be tested in another.

For example:

1. Testing a bundle on a development device via a bundle override.
2. Testing the same bundle against staging and nightly cohorts.
3. Distributing the same bundle to production cohorts.

This reduces the opportunity for human error that can occur when requiring an asset be rebuilt / redefined when crossing these distribution boundaries.

For a detailed specification, see [bundle distribution](/peridio-core/reference/bundle-management/bundle-distribution).

## Custom metadata

Each binary in a bundle can optionally have an arbitrary, user-defined JSON object associated with it. Custom metadata can be specified during bundle creation or defined earlier at various levels: on binaries, artifact versions, or artifacts. Metadata is inherited down this chain, with more specific definitions overriding broader ones.

**Important Note**: Once a bundle is created, it's custom metadata is locked. Meaning if you change the custom metadata for the binary, artifact version, or artifact, the bundle's custom metadata will remain unchanged. Please create a new bundle to inherit the new information.

### Example 1: supplied only on artifact

- Artifact **(A1)** has custom metadata defined on it.
- Artifact Version **(AV1)** for **(A1)** has no custom metadata defined on it.
- Binary **(B1)** for **(AV1)** has no custom metadata defined on it.
- Creating a bundle with **(B1)**, but supplying no custom metadata.

In the bundle:

- **(B1)** will have the custom metadata from **(A1)**.

### Example 2: supplied on artifact and binary

- Artifact **(A1)** has custom metadata defined on it.
- Artifact Version **(AV1)** for **(A1)** has no custom metadata defined on it.
- Binary **(B1)** for **(AV1)** has no custom metadata defined on it.
- Binary **(B2)** for **(AV1)** has custom metadata defined on it.
- Creating a bundle with **(B1)** and **(B2)**, but supplying no custom metadata.

In the bundle:

- **(B1)** will have the custom metadata from **(A1)**.
- **(B2)** will have the custom metadata from **(B2)**.

### Example 3: supplied on artifact, binary, and bundle

- Artifact **(A1)** has custom metadata defined on it.
- Artifact Version **(AV1)** for **(A1)** has no custom metadata defined on it.
- Binary **(B1)** for **(AV1)** has no custom metadata defined on it.
- Binary **(B2)** for **(AV1)** has custom metadata defined on it.
- Creating a bundle with **(B1)** and **(B2)**, and supplying custom metadata for **(B2)**.

In the bundle:

- **(B1)** will have the custom metadata from **(A1)**.
- **(B2)** will have the custom metadata supplied for **(B2)** at the time of bundle creation.
