---
title: 'Atomic Update Architecture'
slug: /avocado-os/security/update-architecture
sidebar_position: 3
description: 'A/B partitions, how an OS update is verified and rolled back, and what each board and update path does and does not check.'
---

# Atomic Update Architecture

Avocado OS writes an OS update to the inactive A/B slot while the active system keeps running. This page describes what the update code checks, what rolls back and when, and where behavior depends on the board or on how you configure updates, so you can decide what to rely on.

## How it works

### A/B partition layout

Avocado maintains two boot slots and two root filesystem slots:

```
Disk layout
├── Boot A        (kernel and the other boot files the board's update manifest lists)
├── Boot B
├── RootFS A      (immutable erofs + dm-verity)
├── RootFS B      (immutable erofs + dm-verity)
└── var partition  (BTRFS — extensions, data, state)
    ├── /var/lib/extensions
    └── /var/lib/overlays
```

At any given time, one slot is active and one is inactive. An OS update writes only to the inactive slot.

What an OS update writes is defined per board by the `update.os_artifacts` list in that board's stone manifest, not by this page. The `var` partition is not in any shipped manifest's list.

| Board family                                                | Artifacts an OS update writes                                                                                              |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| NVIDIA Jetson (AGX Orin, AGX Thor, Orin Nano, Orin NX)      | `rootfs` and `boot` only (on AGX Orin: `APP`/`APP_b` and `A_kernel`/`B_kernel`). No device tree, QSPI or bootloader image. |
| Other boards                                                | `rootfs` plus the boot artifacts the board needs (`boot`, or `uki_a` and `uki_b` on Qualcomm); some also `rootfs_hash`.    |
| A few NXP boards (i.MX 8M Plus EVK, i.MX 95 Variscite DART) | The above plus an `imx_boot` bootloader image.                                                                             |

The bootloader and device tree are therefore not part of an A/B slot on every board. Check your board's manifest before assuming either way.

### Update flow

1. **Download** - The update payload is fetched while the active system continues running. Metadata and per-file hashes are checked as described in [What is verified](#what-is-verified).
2. **Write** - The OS artifacts are written to the inactive slot. The active slot is not modified.
3. **Activate** - The board's `activate` actions point the bootloader at the new slot for the next boot. The actions are specific to the board: `nvbootctrl set-active-boot-slot` on Jetson, U-Boot environment variables on U-Boot boards, EFI boot entries on UEFI boards.
4. **Reboot** - The device boots into the new slot.
5. **Post-boot check** - On boot, `avocadoctl` compares the running system's `AVOCADO_OS_BUILD_ID` (and, in the initramfs, `AVOCADO_INITRAMFS_BUILD_ID`) with the value the update recorded. A match runs the board's `commit` actions, if the manifest defines any, and activates the pending runtime. A mismatch runs the board's `rollback` actions.

dm-verity is separate from this flow. When the rootfs opts in with `rootfs.image.verity`, each block is verified as it is read after boot (see [Filesystem verity](/developer-reference/security/verity)).

### What is verified

How much is verified depends on how the OS bundle reaches the device.

| Check                                                                                       | Extensions and OS bundles (default)             | OS bundle with `stream_os_to_partition = true` |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| `timestamp`, `snapshot` and `targets` metadata signatures against the on-device `root.json` | Yes, before any download                        | Yes, before any download                       |
| SHA-256 and length of each downloaded file against the signed `targets` metadata            | Yes, before the file is used                    | Not for the OS bundle                          |
| SHA-256 of each artifact against the bundle's own `bundle.json`                             | Yes, before the artifact is written to the slot | Yes, computed as the artifact is written       |

Details that apply to both columns:

- The trust anchor is `/var/lib/avocado/metadata/root.json`. An update is refused when the file is missing. Only ed25519 keys in `root.json` are used; other key types are skipped.
- `bundle.json` is inside the OS bundle and carries no signature of its own. Its artifact hashes protect against corruption in transit. They do not authenticate the bundle.
- The code never reads the `expires` field of any metadata file. An expired `timestamp`, `snapshot`, `targets` or `root` file is accepted.
- The code does not compare the remote metadata version numbers with the versions it saw before. A validly signed older release is accepted if the server offers it.

`stream_os_to_partition` is a setting under `[avocado.update]` in the `avocadoctl` configuration and defaults to `false`. With it enabled, the OS bundle is piped from the HTTP response to the partitions without being staged, and the signed `targets` hash for the bundle is not compared. Signed metadata still determines which bundle URL is fetched. If you enable streaming, the artifacts written to the slot are authenticated only by the hashes in the unsigned `bundle.json`. Extension images are always verified against the signed `targets` hashes.

### Rollback

Rollback is a post-boot check run by `avocadoctl`. It is not a property of the bootloader alone.

- **What triggers it.** The new slot has to boot far enough for `avocadoctl` to run. `avocadoctl` then compares `AVOCADO_OS_BUILD_ID` with the expected value. On a mismatch it runs the board's `rollback` actions, clears the pending-update marker and reboots into the previous slot. The previous runtime stays active.
- **What does not trigger it.** The check does not look at application health, service state, or any condition you define. A new slot that boots with the expected build ID passes.
- **If the new slot does not boot.** `avocadoctl` never runs, so its check cannot fire. Recovery then depends on the board's bootloader. Boot-attempt counting exists only on boards whose bootloader environment implements it, for example the NanoPi R5S and the SolidRun RZ/V2N SOM, where the manifest sets `avocado_boot_tries` on activate and clears it on commit. The Jetson manifests define no `commit` action and no attempt counter. What the Jetson boot firmware does when a new slot fails to boot is defined by NVIDIA's firmware, not by Avocado code.
- **Boards without rollback actions.** Several shipped board manifests have no `rollback` list. On those boards a failed post-boot check does not switch slots.

Verify the behavior on your board with the update manifest and a test update before you depend on it in the field.

### Composable updates

Avocado's extension architecture means you don't always need to update the entire system. Because the OS is composed of independent layers — core OS, system extensions, configuration extensions — you can update just the components that changed:

- **OS update** — New root filesystem written to inactive A/B slot
- **Extension update** — New extension version written to BTRFS var partition, overlaid on next boot
- **Configuration update** — New confext written to var partition, applied on next boot
- **Model update** — AI model extension updated independently of the OS

This modularity is critical for bandwidth-constrained deployments. Updating a 50MB application extension over cellular is very different from pushing a 500MB monolithic firmware image.

### Delta updates

Avocado does not implement delta updates. An OS update transfers the complete OS bundle, and an extension update transfers the complete extension image. Images that are already present on the device by content hash are not downloaded again.

### Power loss

The code gives these guarantees:

- **During download** - Downloads are written to a temporary file and checked before use. The active system is untouched.
- **During write to the inactive slot** - The active slot is not written. A pending-update marker is recorded before the artifacts are written, and the board's `activate` actions run after the artifacts are written. On some UEFI boards the artifact write itself changes the boot order.

`avocadoctl` has no power-loss detection and does not detect or repair an incomplete slot write on its own. The behavior of a device that loses power after activation but before the first successful boot depends on the board's bootloader, as described under [Rollback](#rollback).
