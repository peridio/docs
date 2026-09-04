---
title: Overview
sidebar_position: 1
description: 'stone is a CLI for turning a manifest and build artifacts into Avocado disk images, OTA bundles (.aos), and provisioned devices.'
---

<a href="https://github.com/avocado-linux/stone" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Source_Code-GitHub-7b6ff0?logo=github&logoColor=white&style=for-the-badge" alt="Source Code on GitHub" /></a>

stone is a CLI for managing Avocado stones. It takes a JSON manifest that describes an OS image — its storage device, partition layout, per-partition images, provisioning profiles, and OTA update strategy — plus a set of build artifacts, and turns them into the concrete outputs that provision and update a device: raw disk images, FAT images, and OS bundles.

## Capabilities

- **Manifest-driven builds** — a single `manifest.json` is the source of truth for the storage device, partitions, images, provisioning, and update layout.
- **Image assembly** — builds FAT images (FAT12/16/32) from file lists and full disk images from [fwup](https://github.com/fwup-home/fwup) templates, resolving partition offsets and sizes into the environment fwup expects.
- **OS bundles** — packages boot/OS artifacts and a generated `bundle.json` into a compressed `.aos` archive for OTA and provisioning. The `.aos` format is consumed on-device by [avocadoctl](/developer-reference/avocadoctl/os-bundles/overview).
- **Provisioning** — builds the artifacts and runs a per-target provision profile script to flash or image a device, passing partition geometry and device metadata through as environment variables.
- **Manifest overlays** — deep-merges overlay files onto a base manifest (last wins) so one base can be specialized per target or per environment.

## The manifest

Every command operates on a manifest — a JSON document with these top-level sections:

| Section           | Required | Purpose                                                                    |
| ----------------- | -------- | -------------------------------------------------------------------------- |
| `runtime`         | yes      | Platform, architecture, update strategy, and the provisioning entry point. |
| `storage_devices` | yes      | Devices, their partition layout, and the images that fill each partition.  |
| `provision`       | no       | Provisioning profiles, their scripts, and the environment they receive.    |
| `update`          | no       | How OS artifacts map to A/B slots for OTA, and how a slot is activated.    |

See [Usage](/developer-reference/stone/usage) for the full manifest field reference and [Commands](/developer-reference/stone/commands) for the command reference.

## The pipeline

The commands form a pipeline from manifest to device. Each is independently runnable:

```
describe-manifest   inspect a manifest (human-readable summary)
validate            check every file the manifest references is present
create              stage all referenced inputs into an output directory
bundle              build images + bundle.json, package into an .aos
provision           build images and run the provision profile against a target
```

## Related tools

- [avocadoctl](/developer-reference/avocadoctl/os-bundles/overview) applies the `.aos` bundles stone produces, using A/B partition switching on-device.
- [Provisioning field contract](/developer-reference/stone/provision-fields) describes the optional `provision.fields` metadata that lets tooling such as avocado-desktop render input controls for provisioning variables.
