---
title: 'Filesystem Integrity'
slug: /avocado-os/security/filesystem-integrity
sidebar_position: 1
description: 'How Avocado OS protects root filesystem integrity: an immutable read-only erofs root, signature-verified updates, and A/B rollback.'
---

# Filesystem Integrity

An immutable root that nothing on the device can rewrite, and updates that are verified before they are installed.

:::caution dm-verity is not enabled yet

Avocado OS does not currently verify filesystem blocks at read time. The kernel is built with dm-verity support on `secureboot` builds, but nothing generates a hash tree at build time and nothing activates a verity device at boot. Root filesystem integrity today comes from immutability and from signature verification at update time, both described below.

An earlier version of this page described per-block dm-verity verification and per-extension hash trees as shipped features. They were not implemented. Runtime block verification is planned, and [What dm-verity will add](#what-dm-verity-will-add) below describes what changes when it lands.

:::

## What protects the root filesystem today

### Immutable read-only root

The Avocado root filesystem is a read-only [erofs](https://docs.kernel.org/filesystems/erofs.html) image, mounted `ro`. Nothing at runtime can modify it: there is no writable root, and no path by which a compromised process, a failed update, or an operator with a shell rewrites a system binary in place.

```
Root filesystem
├── Read-only erofs image (erofs-lz4 by default)
├── Mounted ro, with no writable root at runtime
└── Replaced whole on update, never patched in place
```

All mutable state lives on a separate BTRFS `/var` partition. On targets that declare the `encrypted-var` capability, that partition is LUKS2-encrypted (see [Hardware-Backed Encryption](/avocado-os/security/encryption)).

Immutability is a real integrity property, and it is the one an attack on a running system meets first. What it does not cover is offline tampering: someone who can write to the storage medium directly, with the device powered off, can modify the image, and nothing on the device detects that at read time. Closing that gap is what dm-verity is for.

### Signature-verified updates

A root filesystem image is not trusted because of where it came from. Every update is verified before it is installed:

- Update metadata is signed, and the signature chain is validated on the device before any payload is applied.
- Each image is checked against the hash and length recorded in that signed metadata, so a payload altered or truncated in transit is rejected rather than written.
- A payload failing either check is not installed, and the active slot is untouched.

This is integrity at install time over the whole image, rather than per-block integrity at read time. The distinction matters: a verified install proves the image was authentic when it landed, and immutability means the running system cannot rewrite it, but neither one detects a later offline modification of the storage.

### A/B slots and rollback

Avocado keeps two complete boot slots. Updates are written to the inactive slot while the active system keeps running, and the switch is a single atomic flag flip. A slot that fails to boot rolls back to the last known-good slot automatically. [Atomic Update Architecture](/avocado-os/security/update-architecture) covers the full flow.

For integrity specifically, this means a corrupted or rejected update cannot leave the device running a half-written root filesystem. The update either lands whole in the inactive slot or does not land at all.

## Extensions

System extensions (sysext) and configuration extensions (confext) ship as read-only erofs or squashfs `.raw` images, overlaid at boot. Like the root filesystem, an extension image is replaced whole rather than patched, and its contents cannot be modified in place at runtime.

Extension images can also be wrapped and signed as KAB packages at build time, which authenticates who produced the package. That is a different property from block-level integrity: it answers "did the holder of the signing keyset produce this image", not "does every block still match what was signed". Per-extension dm-verity hash trees are not implemented today.

## Relationship to secure boot

[Secure boot](secure-boot) and filesystem integrity are separate layers, and today they cover different ranges of the boot chain:

- **Secure boot**, once its enforcement ships, validates code before it executes: from the silicon root of trust through the bootloader and into the kernel. That enforcement is in development rather than shipped; see [Secure Boot](secure-boot) for where each target stands.
- **Filesystem integrity**, as it stands, rests on the root being immutable and having been signature-verified when it was installed.

Neither layer reaches full enforcement today. Boot-chain verification does not yet extend into the kernel, and filesystem integrity depends on install-time verification rather than read-time verification. dm-verity is the piece that will extend cryptographic verification past the kernel into every block the kernel reads, once both land.

## What dm-verity will add

When dm-verity lands, three things change:

1. A Merkle hash tree is computed over the root filesystem image at build time, and its root hash is signed.
2. The kernel verifies that root hash against a trusted key, then verifies every block against the tree as it is read. A block that does not match returns an I/O error instead of being executed.
3. Offline tampering becomes detectable. Modifying the image on the storage medium, with the device powered off, is caught on the first read of a modified block rather than not at all.

That closes the offline-modification gap described above. Until it ships, treat the root filesystem's integrity guarantee as verified at install and immutable at runtime, not verified on every read.
