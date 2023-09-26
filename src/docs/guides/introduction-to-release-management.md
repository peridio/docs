# Introduction to Release Management

This guide serves as a comprehensive introduction to release management that will cover bundles and releases.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Release Management Resources

Release management comprises the following resources:

- [Bundles](/reference/bundles) - define ordered sets of [binaries](/reference/binaries) that can be distributed to [devices](/reference/devices) via [releases](/reference/releases).
- [Releases](/reference/releases) - publish bundles to devices and form the [release graph](/reference/releases#graph-traversal).

## Getting Started

The goal of this guide is to create a release for a signed binary.

Creating a signed binary is outside the scope of this guide, see [Introduction to Binary Management](introduction-to-binary-management).

## Creating a Bundle

[Create a bundle](creating-bundles) so that we have something to distribute.

```
peridio bundles create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --artifact-version-prns $PERIDIO_ARTIFACT_VERSION_PRNS
```

## Creating a Release

[Create a release](creating-releases) to distribute the bundle to devices.

```
peridio releases create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --bundle-prn $PERIDIO_BUNDLE_PRN
```

By not controlling the exact placement of the release with the `--next-release-prn` and `--prev-release-prn` options, the release is automatically created as the head of the release graph.

Similarly, because we did not specify a `--phase-value` nor a `--schedule-date`, the release is immediately available.
