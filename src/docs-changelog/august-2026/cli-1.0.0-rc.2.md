---
title: 'CLI: 1.0.0-rc.2'
description: 'Avocado CLI 1.0.0-rc.2: Container Dev Mode, dm-verity and encrypted /var, inter-extension dependencies, device-tree overlays, reproducible images, and OTA build-id correctness.'
---

The second 1.0 release candidate. The format contract from rc.1 holds; rc.2 is
where the security, reproducibility, and iteration-loop work lands on top of it.

## Container Dev Mode

`avocado dev` gains a fast inner loop for container work: the host CLI drives an
embedded registry and pushes updated container images straight to a running VM,
so you edit, rebuild, and see the change on the device without a full provision
cycle.

## Extension and runtime security

- **`image.verity`** — extension images can build a dm-verity hash tree and root
  hash, so a runtime can verify an extension's integrity before mounting it.
- **`var.encrypt`** — a runtime can opt into an encrypted `/var`.
- **Signing fixes** — signing keys resolve by registry name across `provision`,
  `sign`, and `sdk run`, and a signature's length is now taken from the
  algorithm rather than assumed to be 64 bytes.

## Composition and hardware

- **`depends_on`** declares inter-extension dependencies, so a shared dependency
  is built and shipped once instead of bundled into every extension that needs
  it — the extensions install in the right order and stop duplicating each
  other's dependencies.
- **Device-tree overlays** — declared overlays are provisioned and built, and an
  overlay's contents are hashed into the build stamp so a change actually
  rebuilds.
- **`--target-board`** interpolates a board into the config, letting one project
  target several boards.

## Reproducible, OTA-correct images

- **Deterministic builds** — `source_date_epoch` feeds the rootfs and initramfs
  image builds, cpio archives are reproducible, and package-manager state is
  purged from rootfs and initramfs images.
- **Build id correctness** — `AVOCADO_OS_BUILD_ID` is derived from the assembled
  work tree and now covers permissions, shipped `var/cache` and `var/log`
  content, and initramfs file ownership, so those changes produce a new build id
  and OTA correctly. Stale rootfs/initramfs install stamps are rejected instead
  of silently reused.

## Also in rc.2

- **`avocado sbom`** emits an SPDX 3.0 SBOM of the installed packages.
- **`avocado --version`** reports the build commit.
- Abandoned build volumes are reaped and stale-volume errors are clearer.
- `deploy` surfaces container-script stderr instead of a generic failure.
- `ext fetch --locked` fails on an unpinned extension instead of writing a
  half-formed lock.

Install and upgrade via the Homebrew tap.
