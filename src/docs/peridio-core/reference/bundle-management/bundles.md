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

Custom metadata is used to provide additional information to an agent, like Peridio Daemon, that it can use to inform the download and installation of binaries.

### Optional per binary

There is no single bundle-level custom metdata. Each binary in a bundle can optionally have its own custom metadata.

### Immutability

Custom metadata is immutable as defined during bundle creation.

If an artifact, artifact version, or binary have their custom metadata changed after a bundle has been created, the bundle's custom metadata is not retroactively updated and will remain unchanged. You may create a new bundle to inherit the new information.

### Inheritance

Custom metadata is sourced in an overriding fashion from four levels, from highest to lowest precedence:

1. From bundle creation parameters
2. Inherited from the binary
3. Inherited from the artifact version
4. Inherited from the artifact

This inheritance is considered a single time during bundle creation. Note that once a bundle is
created it is immutable, including its custom metadata.
