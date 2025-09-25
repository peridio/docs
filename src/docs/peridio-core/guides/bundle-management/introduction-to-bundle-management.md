---
title: 'Introduction to bundle management'
description: 'Comprehensive introduction to Peridio Core bundle management covering bundles, releases, and deployment strategies for organized device fleet updates.'
---

This guide serves as a comprehensive introduction to bundle management that will cover bundles and releases.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Bundle management resources

Bundle management comprises the following resources:

- [Bundles](/peridio-core/reference/bundle-management/bundles) - define ordered sets of [binaries](/peridio-core/reference/binary-management/binaries) that can be distributed to [devices](/peridio-core/reference/device-management/devices) via [releases](/peridio-core/reference/bundle-management/releases).
- [Releases](/peridio-core/reference/bundle-management/releases) - publish bundles to devices and form the [release graph](/peridio-core/reference/bundle-management/releases).

## Getting started

The goal of this guide is to create a release for a signed binary.

Creating a signed binary is outside the scope of this guide, see [Introduction to Binary Management](../binary-management/introduction-to-binary-management).

## Creating a bundle

[Create a bundle](creating-bundles) so that we have something to distribute.

```
peridio bundles create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --artifact-version-prns $PERIDIO_ARTIFACT_VERSION_PRNS
```

## Creating a release

[Create a release](creating-releases) to distribute the bundle to devices.

```
peridio releases create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --bundle-prn $PERIDIO_BUNDLE_PRN
```

By not controlling the exact placement of the release with the `--next-release-prn` and `--prev-release-prn` options, the release is automatically created as the head of the release graph.

Similarly, because we did not specify a `--phase-value` nor a `--schedule-date`, the release is immediately available.
