---
title: 'Firmware'
description: 'Firmware in Peridio Core LTS represents data for device distribution - deprecated feature superseded by artifacts, artifact versions, and binaries.'
---

Firmware are the data you wish to distribute to devices.

**Deprecated**

Superceded by [artifacts](/peridio-core/reference/binary-management/artifacts), [artifact versions](/peridio-core/reference/binary-management/artifact-versions), and [binaries](/peridio-core/reference/binary-management/binaries).

Find additional information in the Admin API [firmware section](/peridio-core/tools/admin-api#firmware) and the [creating firmware](/peridio-core/guides/long-term-support/creating-firmware) guide.

## Format

Firmware require the use of [fwup](https://github.com/fwup-home/fwup) archives as their packaging format. This means the data you upload to Peridio and the data your devices will download from Peridio are fwup archives. They are capable of packaging an arbitrary stringy metadata payload alongside the primary contents. Note that fwup archives themselves are ZIP archives and their contents can be extracted as such.

### Requirements

- Firmware files are signed fwup archives.
- The following [global scope](https://github.com/fwup-home/fwup#global-scope) options must be specified:
  - `meta-architecture` must have a value. Informational.
  - `meta-platform` must have a value. Informational.
  - `meta-product` must exactly match the name of a [product](/peridio-core/reference/device-management/products) in your [organization](/peridio-core/reference/account-management/organizations). Defines the product within which the firmware will be scoped.
  - `meta-version` must be a valid [semantic version](https://semver.org/spec/v2.0.0.html). Defines the version of the firmware.

## Installation

When a device downloads a firmware it may extract from it like a ZIP, or apply a fwup task, or do whatever it sees fit to install or process the firmware. The code responsible for this functionality is the [agent](/peridio-core/tools/peridio-daemon/overview).

## Time to live (TTL)

All firmware will be deleted automatically after a set amount of seconds by configuring their `ttl` field. Firmware associated with a deployment will never be automatically deleted. Dissassociating a firmware with a configured TTL from all deployments will cause the TTL to begin counting down again from its maximum value.

### Example

1. Firmware (A) is created with `ttl: 60` and is associated with zero deployments.
   - Firmware (A)'s TTL begins counting down and it will be automatically deleted once it runs out.
2. Firmware (A) is associated with deployment (B).
   - Firmware (A)'s TTL is ignored and it will not be automatically deleted.
3. Firmware (A) is associated with deployment (C).
   - Firmware (A) is now associated with two deployments, its TTL continues to be ignored and it still will not be automatically deleted.
4. Deployment (B) is deleted.
   - Firmware (A) is still associated with at least one deployment, its TTL continues to be ignored and it still will not be automatically deleted.
5. Deployment (C) is deleted.
   - Firmware (A) is associated with zero deployments, its TTL begins counting down from its maximum value of `60` and it will be automatically deleted once it runs out.

## Delta updates

It is possible to ship delta updates with Peridio in a self-managed or Peridio-managed fashion.

### Self-managed

This approach yields the greatest flexibility, but comes at the cost of complexity. It would mean you would be responsible for:

1. Generating patch files yourself before submitting them as firmware to Peridio.
2. Ensuring you orchestrate your deployments in such a manner as to serve patch files to the correct devices.
3. Write the device code to apply the patch files.

Note that with this approach you would not actually enable delta updates features in Peridio (check boxes in the Web Console nor fields in the API/CLI), as that is used only in the Peridio-Managed case.

### Peridio-managed

This approach has Peridio automatically generate, serve, and apply patch files for you, but comes at the cost of flexibility and customization. In particular, the following requirements are imposed:

- Delta updates are enabled on a per deployment basis.
- fwup must be used to apply updates, and it must be version 1.6.0 or greater.
- While your fwup conf and archives may include arbitrary contents, only a file-resource named `rootfs.img` will be diffed/patched.
- Your fwup conf's tasks to write the `rootfs.img` must use the `delta-source-raw-offset`, `delta-source-raw-count`, and `raw_write` settings.
  - If you wish to also use an A/B update scheme, the tasks may for example resemble the following:

    ```
    task upgrade.a {
        on-resource rootfs.img {
            delta-source-raw-offset=${ROOTFS_B_PART_OFFSET}
            delta-source-raw-count=${ROOTFS_B_PART_COUNT}
            raw_write(${ROOTFS_A_PART_OFFSET})
        }
    }
    task upgrade.b {
        on-resource rootfs.img {
            delta-source-raw-offset=${ROOTFS_A_PART_OFFSET}
            delta-source-raw-count=${ROOTFS_A_PART_COUNT}
            raw_write(${ROOTFS_B_PART_OFFSET})
        }
    }
    ```
