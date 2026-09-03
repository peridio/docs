---
title: Usage
sidebar_position: 2
description: 'The stone manifest schema that every command operates on, plus overlays.'
---

# Usage

stone reads a JSON manifest (conventionally `manifest.json`) and produces disk images, OS bundles, or a provisioned device. This page covers the manifest schema and overlays; for the commands that consume it, see [Commands](/developer-reference/stone/commands).

## Manifest schema

A minimal manifest:

```json
{
  "runtime": {
    "platform": "avocado-portable",
    "architecture": "noarch"
  },
  "storage_devices": {
    "rootdisk": {
      "out": "rootdisk.img",
      "build_args": { "type": "fwup", "template": "rootdisk.conf" },
      "devpath": "/dev/mmcblk0",
      "block_size": 512,
      "images": {
        "boot": {
          "out": "boot.img",
          "size": 128,
          "size_unit": "mebibytes",
          "build_args": {
            "type": "fat",
            "variant": "FAT32",
            "files": ["bzImage", { "in": "cfg/grub.cfg", "out": "grub/grub.cfg" }]
          }
        },
        "rootfs": "rootfs.img"
      },
      "partitions": [
        {
          "name": "boot",
          "image": "boot",
          "offset": 2048,
          "offset_unit": "bytes",
          "size": 128,
          "size_unit": "mebibytes"
        },
        { "name": "rootfs", "image": "rootfs", "expand": "true" }
      ]
    }
  }
}
```

### `runtime`

| Field               | Required | Description                                                                                           |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `platform`          | yes      | Platform identifier (e.g. `jetson-orin-nano`), surfaced to fwup and written into `bundle.json`.       |
| `architecture`      | yes      | Target architecture (e.g. `aarch64`).                                                                 |
| `provision`         | no       | Legacy single provision script path (use `provision.profiles` instead for new manifests).             |
| `provision_default` | no       | Name of the default profile in `provision.profiles`.                                                  |
| `update_strategy`   | no       | Slot strategy for bundles: `uboot-ab` (default) or `tegra-ab`. Selects slot ids (`a`/`b` vs `0`/`1`). |

### `storage_devices`

A map of device name → device. Each device:

| Field        | Required | Description                                                                      |
| ------------ | -------- | -------------------------------------------------------------------------------- |
| `out`        | yes      | Output filename for the built device image.                                      |
| `devpath`    | yes      | Device node the image targets (e.g. `/dev/mmcblk0`), written to bundle `layout`. |
| `build_args` | no       | How to build the whole-device image. Only `fwup` is valid at the device level.   |
| `block_size` | no       | Block size in bytes (default `512`); drives partition-offset math.               |
| `uuid`       | no       | Disk UUID passed to fwup as `AVOCADO_DISK_UUID`.                                 |
| `images`     | yes      | Map of image name → image (see below).                                           |
| `partitions` | yes      | Ordered partition list (see below).                                              |

### Images

An image is either a **string** (a direct file reference copied as-is) or an **object** that is built:

| Field        | Required | Description                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| `out`        | yes      | Output filename.                                                                       |
| `size`       | yes\*    | Numeric size (\* required for object images).                                          |
| `size_unit`  | yes\*    | `bytes`, `kibibytes`, `mebibytes`, `gibibytes`, `kilobytes`, `megabytes`, `gigabytes`. |
| `build_args` | no       | `fat` (build a FAT image from `files`) or `fwup` (build from a template).              |
| `block_size` | no       | Passed to fwup as `AVOCADO_DISK_BLOCK_SIZE`.                                           |
| `uuid`       | no       | Passed to fwup as `AVOCADO_DISK_UUID`.                                                 |

`build_args` for a FAT image lists `files`, each either a filename string (placed at the same path in the image) or `{ "in": <source>, "out": <path-in-image> }`.

### Partitions

Ordered list; offsets default to sequential when omitted.

| Field                                        | Required | Description                                                                     |
| -------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| `name`                                       | see note | Partition name; uppercased into `AVOCADO_PARTITION_<NAME>_*` env vars for fwup. |
| `image`                                      | no       | Image key that fills this partition.                                            |
| `partition_type`                             | no       | GPT/MBR partition type.                                                         |
| `partition_uuid`                             | no       | Partition UUID.                                                                 |
| `offset` / `offset_unit`                     | no       | Start offset (`bytes` or `blocks`); sequential if omitted.                      |
| `offset_redundant` / `offset_redundant_unit` | no       | Redundant copy offset (e.g. for a U-Boot env).                                  |
| `size` / `size_unit`                         | see note | Partition size. Both must be present or both absent.                            |
| `expand`                                     | no       | `"true"` marks the partition as expandable to fill remaining space.             |
| `size_alignment` / `size_alignment_unit`     | no       | Alignment applied to an externally-supplied size. Default 4 mebibytes.          |

:::note Omitting size
`size`/`size_unit` may be omitted **only** on the last partition of a device when it has `expand: "true"` and a `name`. The concrete size is then supplied at bundle/provision time via `--partition-size <name>=<bytes>` (rounded up to `size_alignment`), or derived from the partition's image file during `provision`.
:::

### `provision`

| Field      | Required | Description                                                                         |
| ---------- | -------- | ----------------------------------------------------------------------------------- |
| `profiles` | yes      | Map of profile name → `{ script, envs?, requires? }`.                               |
| `envs`     | no       | Named environment blocks (`name → { VAR: value }`) that profiles reference by name. |
| `files`    | no       | Extra files staged alongside profile scripts (shared helper libraries, etc.).       |

A profile's `envs` is a list mixing named-block references (strings) and inline `{ VAR: value }` maps; inline entries override named blocks. Values support `${VAR}` expansion from the caller's environment (missing vars expand to empty and warn). `requires` declares host capabilities — currently only `usb`.

See the [Provisioning Map](/developer-reference/stone/provision-fields) for `provision.fields`, the optional UI-hint metadata consumed by external tooling.

### `update`

Declares how OS artifacts map to A/B slots for OTA. stone copies this into the generated `bundle.json`.

| Field            | Required | Description                                                                       |
| ---------------- | -------- | --------------------------------------------------------------------------------- |
| `slot_detection` | yes      | How to detect the active slot: `uboot-env`, `command`, or `sdboot-efi`.           |
| `os_artifacts`   | yes      | Map of artifact name → `{ image_key, slot_partitions }`.                          |
| `activate`       | yes      | Action(s) to switch slots: `uboot-env`, `command`, `mbr-switch`, or `efibootmgr`. |
| `rollback`       | no       | Action(s) to revert a slot switch.                                                |

## Manifest overlays

`--overlay` deep-merges JSON files onto the base manifest, applied left-to-right (last wins). Objects merge recursively; arrays of named objects (elements with a `name` field, such as partitions) merge by name and append new entries; all other arrays and scalars replace. This lets one base manifest be specialized per target or environment without duplication.

```
stone bundle -m base.json --overlay target-jetson.json --overlay prod.json --os-release ./os-release
```
