---
title: Bundle Format
sidebar_position: 2
description: 'Specification of the OS bundle bundle.json format including update strategies, slot detection, artifacts, and verification.'
---

The `bundle.json` file inside an `.aos` archive describes how to apply the OS update. It is parsed by avocadoctl during the [update process](./update-process).

## Full Example

```json
{
  "format_version": 1,
  "platform": "jetson-orin-nano",
  "architecture": "aarch64",
  "os_build_id": "avocado-os-20260312",
  "initramfs_build_id": "initramfs-20260312",
  "update": {
    "strategy": "a-b",
    "slot_detection": {
      "type": "uboot-env",
      "var": "boot_slot"
    },
    "artifacts": [
      {
        "name": "rootfs",
        "file": "rootfs.img",
        "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "size": 1073741824,
        "slot_targets": {
          "a": { "partition": "APP" },
          "b": { "partition": "APP_b" }
        }
      }
    ],
    "activate": [
      {
        "type": "uboot-env",
        "set": { "boot_slot": "b" }
      }
    ],
    "rollback": [
      {
        "type": "uboot-env",
        "set": { "boot_slot": "a" }
      }
    ]
  },
  "verify": {
    "type": "os-release",
    "field": "AVOCADO_OS_BUILD_ID",
    "expected": "avocado-os-20260312"
  },
  "verify_initramfs": {
    "type": "os-release",
    "field": "AVOCADO_INITRAMFS_BUILD_ID",
    "expected": "initramfs-20260312"
  }
}
```

## Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `format_version` | integer | Yes | Bundle format version. |
| `platform` | string | Yes | Target hardware platform identifier. |
| `architecture` | string | Yes | Target CPU architecture (e.g., `aarch64`, `x86-64`). |
| `os_build_id` | string | Yes | Identifier for this rootfs build version. |
| `initramfs_build_id` | string | No | Identifier for this initramfs build version. |
| `update` | object | No | Update configuration. Omit if the bundle is metadata-only. |
| `verify` | object | No | Post-update verification for the rootfs. |
| `verify_initramfs` | object | No | Post-update verification for the initramfs. |
| `layout` | object | No | Partition layout for MBR-based targets. |

## Slot Detection Strategies

The `update.slot_detection` object determines how avocadoctl identifies the currently active boot slot.

### uboot-env

Reads a U-Boot environment variable to determine the active slot.

```json
{
  "type": "uboot-env",
  "var": "boot_slot"
}
```

| Field | Description |
|-------|-------------|
| `var` | U-Boot environment variable name containing the active slot identifier (e.g., "a" or "b"). |

### command

Runs a shell command whose stdout output is the active slot identifier.

```json
{
  "type": "command",
  "command": ["/usr/bin/detect-slot"]
}
```

| Field | Description |
|-------|-------------|
| `command` | Array of command and arguments to execute. The command's stdout is trimmed and used as the slot name. |

### sdboot-efi

Uses systemd-boot EFI partition mappings. Maps slot names to EFI partition device paths.

```json
{
  "type": "sdboot-efi",
  "partitions": {
    "a": "/dev/disk/by-partlabel/esp-a",
    "b": "/dev/disk/by-partlabel/esp-b"
  }
}
```

| Field | Description |
|-------|-------------|
| `partitions` | Map of slot names to EFI partition device paths. |

## Artifacts

Each entry in `update.artifacts` describes a file to write to a partition.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Artifact name (e.g., "rootfs", "initramfs"). |
| `file` | string | Yes | Filename within the `.aos` archive. |
| `sha256` | string | Yes | Expected SHA-256 hash of the artifact file. |
| `size` | integer | No | File size in bytes. |
| `slot_targets` | object | Yes | Map of slot names to target partitions. |
| `slot_targets.{slot}.partition` | string | Yes | Partition identifier (PARTLABEL for GPT, name for MBR layout). |

## Activation Actions

The `update.activate` array defines actions executed after artifacts are written to switch the boot target to the new slot. Actions are executed in order.

### uboot-env

Set U-Boot environment variables.

```json
{ "type": "uboot-env", "set": { "boot_slot": "b" } }
```

### command

Run a shell command.

```json
{ "type": "command", "command": ["/usr/bin/set-boot-slot", "b"] }
```

### mbr-switch

Switch MBR partition layout by rewriting the partition table.

```json
{
  "type": "mbr-switch",
  "devpath": "/dev/mmcblk0",
  "slot_layouts": {
    "a": ["layout-a.json"],
    "b": ["layout-b.json"]
  }
}
```

### efibootmgr

Set the EFI boot entry for the target slot.

```json
{
  "type": "efibootmgr",
  "slot_entries": {
    "a": "0001",
    "b": "0002"
  }
}
```

## Rollback Actions

The optional `update.rollback` array has the same format as `activate`. These actions are executed if verification fails after reboot to restore the previous boot slot.

## Verification

The `verify` and `verify_initramfs` objects define how to confirm the OS update was successful after reboot.

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Verification type (e.g., `os-release`). |
| `field` | string | Field name to check in `/etc/os-release`. |
| `expected` | string | Expected value. Update is considered successful when the field matches. |

## Partition Layout (MBR)

The optional `layout` object is used on MBR-based systems where partitions are identified by offset rather than label.

| Field | Type | Description |
|-------|------|-------------|
| `device` | string | Block device path (e.g., `/dev/mmcblk0`). |
| `block_size` | integer | Optional block size in bytes. |
| `partitions` | array | List of partition definitions. |
| `partitions[].name` | string | Partition name for referencing in `slot_targets`. |
| `partitions[].offset` | number | Partition start offset. |
| `partitions[].offset_unit` | string | Unit for offset (e.g., `MiB`, `sectors`). |
| `partitions[].size` | number | Partition size. |
| `partitions[].size_unit` | string | Unit for size (e.g., `MiB`, `GiB`). |
| `partitions[].expand` | string | Optional expand strategy. |
