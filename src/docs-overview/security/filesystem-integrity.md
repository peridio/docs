---
title: 'Filesystem Integrity'
sidebar_position: 1
description: 'dm-verity based block-level integrity verification in Avocado OS — every read verified against a Merkle hash tree.'
---

# Filesystem Integrity

Integrity verification on every startup — and every read after that.

Avocado OS uses dm-verity to provide continuous, block-level integrity verification of the root filesystem. Rather than checking integrity once at boot, dm-verity intercepts every filesystem read and verifies each block against a pre-computed Merkle hash tree. Any modification to the filesystem — whether from a malicious actor, a cosmic ray flipping bits in storage, or silent disk corruption — is detected at read time. If a block doesn't match its expected hash, the read fails rather than silently executing corrupted code.

## How it works

### Immutable root filesystem

The Avocado root filesystem is a read-only SquashFS image. Nothing at runtime can modify it — there is no writable root. This is the foundation that makes dm-verity practical: you can compute a complete hash tree at build time because the filesystem will never change.

```
Root filesystem (SquashFS)
├── Read-only mount
├── dm-verity hash tree computed at build time
└── Every block verified on read against Merkle tree
```

### Merkle hash tree

At build time, Avocado computes a cryptographic hash for every block in the root filesystem. These hashes form a Merkle tree — a binary tree where each parent node is the hash of its children. The root hash of this tree is a single value that represents the integrity of the entire filesystem.

This root hash is signed and embedded in the boot chain. When the kernel mounts the root filesystem with dm-verity enabled, it uses this root hash to verify every subsequent block read. Verifying any single block requires walking the tree from that block up to the root — a fast, constant-depth operation.

### Extension verification

Avocado's system extensions (sysext) and configuration extensions (confext) each carry their own independent hash trees. This means:

- Each extension is verified independently of the base system
- A corrupted extension doesn't require re-verifying the entire OS
- Extensions can be updated, added, or removed without affecting the integrity of other components
- Rollback to a previous extension version restores a known-good, verified state

### What happens on verification failure

When dm-verity detects a block that doesn't match its expected hash:

1. The read operation returns an I/O error
2. The system logs the failure with the specific block that failed verification
3. Depending on configuration, the system can continue in degraded mode or trigger a reboot into the recovery partition
4. On reboot, the A/B partition scheme allows falling back to the last known-good slot

## Relationship to secure boot

dm-verity and secure boot are complementary layers:

- **Secure boot** ensures that only authorized code starts executing — it validates the chain from silicon through bootloader through kernel.
- **dm-verity** ensures that the filesystem the kernel reads from hasn't been modified — it validates every block, every time it's read.

Together, they create a continuous verification chain: secure boot trusts the kernel, the kernel trusts the dm-verity root hash, and dm-verity verifies every block of the root filesystem and every extension overlay.

## No runtime overhead in practice

dm-verity verification is a hash comparison on each block read. On modern hardware with hardware-accelerated cryptography, this adds negligible latency. Blocks are verified on first read and cached — subsequent reads of the same block hit the page cache without re-verification. For embedded workloads, the performance impact is effectively zero.
