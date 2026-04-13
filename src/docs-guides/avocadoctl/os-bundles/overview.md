---
title: Overview
sidebar_position: 1
description: 'Introduction to Avocado Linux OS bundles for rootfs and initramfs updates with A/B partition switching.'
---

An OS bundle is a self-describing archive containing the base operating system image (rootfs and/or initramfs) along with metadata describing the update strategy, slot detection, verification, and partition layout.

## When OS Bundles Are Used

A [runtime manifest](../runtime-management/manifest-spec) may optionally include an `os_bundle` reference. When a runtime with a different `os_build_id` than the running system is activated, the OS bundle [update process](./update-process) is triggered automatically.

## Relationship to Runtimes

OS bundles are referenced by `image_id` in the runtime manifest and stored as `.raw` files in the shared image pool (`/var/lib/avocado/images/`) alongside extension images. A runtime may or may not include an OS bundle -- runtimes that only update extensions do not need one.

## OS Bundle Files

OS bundles are distributed as `.aos` files (tar.zst compressed archives) containing:

- **`bundle.json`** -- Update metadata and configuration. See [Bundle Format](./bundle-format) for the full specification.
- **Artifact files** -- The actual rootfs and/or initramfs images to be written to partitions.
