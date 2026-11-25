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

The two release lines ship different manifests, so the answer depends on the release as well as the board:

| Board                                                                                                     | 2024 release                                    | 2026 release                                   |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| NVIDIA Jetson AGX Orin, Orin Nano, Orin NX                                                                | `rootfs` and `boot`                             | `rootfs` and `boot`                            |
| NVIDIA Jetson AGX Thor                                                                                    | Not available                                   | `rootfs` and `boot`                            |
| ICAM-540                                                                                                  | `rootfs` and `boot`                             | `rootfs` only                                  |
| NXP i.MX 8M Plus EVK                                                                                      | `boot` and `rootfs`                             | `boot`, `rootfs`, `rootfs_hash` and `imx_boot` |
| Variscite i.MX 95 DART                                                                                    | Not available                                   | `boot`, `rootfs`, `rootfs_hash` and `imx_boot` |
| Other NXP i.MX boards                                                                                     | `boot` and `rootfs`                             | `boot`, `rootfs` and `rootfs_hash`             |
| Qualcomm RB3 Gen 2 and RubikPi 3                                                                          | RB3 Gen 2 not available, RubikPi 3 no OS update | `rootfs`, `uki_a` and `uki_b`                  |
| Raspberry Pi, Orange Pi 5 Plus, Intel x86-64, QEMU                                                        | `boot` and `rootfs`                             | `boot` and `rootfs`                            |
| SolidRun RZ/V2N SOM                                                                                       | No OS update                                    | `boot` and `rootfs`                            |
| NanoPi R5S, AMD x86-64, arm64 UEFI                                                                        | Not available                                   | `boot` and `rootfs`                            |
| Alif E8, reComputer J301x and J401x, FR202, reTerminal, reTerminal DM, STM32MP25-DK, Grinn Astra 1680 SBC | No OS update                                    | No OS update                                   |

On AGX Orin the `rootfs` and `boot` artifacts go to `APP`/`APP_b` and `A_kernel`/`B_kernel`. No Jetson manifest writes a device tree, QSPI or bootloader image.

"No OS update" means the board's manifest has no `update` section. stone then builds the OS bundle without one, and `avocadoctl` refuses it with `Bundle has no update section`. Those boards take extension updates only.

The bootloader and device tree are therefore not part of an A/B slot on every board. Check your board's manifest on your release before assuming either way.

### Update flow

1. **Download** - The update payload is fetched while the active system continues running. Metadata and per-file hashes are checked as described in [What is verified](#what-is-verified).
2. **Write** - The OS artifacts are written to the inactive slot. The active slot is not modified.
3. **Activate** - The board's `activate` actions point the bootloader at the new slot for the next boot. The actions are specific to the board: `nvbootctrl set-active-boot-slot` on Jetson, U-Boot environment variables on U-Boot boards, EFI boot entries on UEFI boards.
4. **Reboot** - The device boots into the new slot.
5. **Post-boot check** - On boot, `avocadoctl` compares the running system's `AVOCADO_OS_BUILD_ID` with the value the update recorded. When it runs in the initramfs and the bundle carries an initramfs build ID, it also compares the `AVOCADO_OS_BUILD_ID` field of `/etc/initrd-release` (or `/usr/lib/initrd-release`) with that ID, and a missing file counts as a mismatch. Both checks passing runs the board's `commit` actions, if the manifest defines any, and activates the pending runtime. A failed check runs the board's `rollback` actions.

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

`stream_os_to_partition` is a setting under `[avocado.update]` in the `avocadoctl` configuration and defaults to `false`. With it enabled, the OS bundle is piped from the HTTP response to the partitions without being staged, and the signed `targets` hash for the bundle is not compared. Signed metadata still determines which bundle URL is fetched, but with streaming enabled the OS artifacts written to the slot are not authenticated by the signed metadata at all. The only hashes they are checked against come from `bundle.json` inside the same unsigned bundle, so anyone who can replace the bundle can replace the images and their hashes together. Those hashes are a corruption check, not an authenticity check. Extension images are always verified against the signed `targets` hashes.

### Rollback

Rollback is a post-boot check run by `avocadoctl`. It is not a property of the bootloader alone.

- **What triggers it.** The new slot has to boot far enough for `avocadoctl` to run. `avocadoctl` then compares `AVOCADO_OS_BUILD_ID` with the expected value and, in the initramfs, the initramfs build ID as described in step 5 above. If either check fails it runs the board's `rollback` actions, clears the pending-update marker and reboots into the previous slot. The previous runtime stays active.
- **What does not trigger it.** The check does not look at application health, service state, or any condition you define. A new slot that boots with the expected build IDs passes.
- **If the new slot does not boot.** `avocadoctl` never runs, so its check cannot fire. Recovery then depends on the board's bootloader, which falls back on its own through one of three mechanisms:
  - **U-Boot attempt counter.** The NanoPi R5S and the SolidRun RZ/V2N SOM on the 2026 release. The manifest sets `avocado_boot_tries` to 3 on activate and clears it on commit. No 2024 manifest sets it.
  - **systemd-boot boot counting.** The Qualcomm RB3 Gen 2 and RubikPi 3 on the 2026 release. The update writes the new kernel as `avocado-a+3.efi` or `avocado-b+3.efi`, which gives systemd-boot three tries at the entry. Commit runs `avocado-bls bless` to remove the counter, and rollback runs `avocado-bls demote`.
  - **One-shot UEFI `BootNext`.** Boards that activate with `efibootmgr`: Intel x86-64 on both releases, and QEMU x86-64, AMD x86-64 and arm64 UEFI on the 2026 release. Activate sets `BootNext`, which the firmware uses for one boot only, so a trial boot that resets before commit comes back up on the old slot through `BootOrder`. Commit moves the new slot to the head of `BootOrder`.

  The Jetson manifests define no `commit` action and no attempt counter. What the Jetson boot firmware does when a new slot fails to boot is defined by NVIDIA's firmware, not by Avocado code. The other boards' manifests set up none of the three mechanisms.

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

- **During download, default staged path** - Downloads are written to a temporary `.part` file and checked against the signed hash before use. The active system is untouched.
- **During download with `stream_os_to_partition = true`** - There is no temporary file for the OS bundle. It is written straight to the inactive slot as it arrives, so a power loss mid-download leaves a partly written inactive slot. The board's `activate` actions run only after every artifact is written, so the bootloader still points at the active slot.
- **During write to the inactive slot** - The active slot is not written. A pending-update marker is recorded before the artifacts are written, and the board's `activate` actions run after the artifacts are written. On some UEFI boards the artifact write itself changes the boot order.

`avocadoctl` has no power-loss detection and does not detect or repair an incomplete slot write on its own. The behavior of a device that loses power after activation but before the first successful boot depends on the board's bootloader fallback (attempt counter, boot counting or one-shot `BootNext`), or on NVIDIA firmware on Jetson, as described under [Rollback](#rollback).
