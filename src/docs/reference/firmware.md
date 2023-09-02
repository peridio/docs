---
title: Firmware
---

:::info Legacy
This functionality has been superceded by [artifacts](artifacts), [artifact versions](artifact-versions), and [binaries](binaries).
:::

Firmware are the data you wish to distribute to devices.

Peridio requires the use of [fwup](https://github.com/fwup-home/fwup) archives as the packaging format for firmware. This means the binaries you upload to Peridio and the binaries your devices will download from Peridio are fwup archives. The contents of an archive are up to you; ranging from no files, to 1 file, to `n` files. They are capable of packaging an arbitrary stringy metadata payload. Note that fwup archives themselves are ZIP archives and can be interacted with as such.

To learn more about how to use firmware, see the [creating firmware](/guides/creating-firmware) guide.

## Firmware Installation

It is possible to perform firmware installation with Peridio in a self-managed or Peridio-managed fashion.

### Self-Managed

This approach means you are responsible for all device-side interactions with Peridio as well as executing any device-side operation thereafter. This buys absolute flexibility at the cost of owning the complexity yourself.

### Peridio Managed

The [Peridio Agent](/agent) can be used to check for updates, stream their download (including automated delta updates), verify their signature, and install their contents. This buys efficient simplicity at the cost of flexibility.

## Firmware File Requirements

- Firmware files are signed fwup archives.
- The following [global scope](https://github.com/fwup-home/fwup#global-scope) options must be specified:
  - `meta-architecture` must have a value. Informational.
  - `meta-platform` must have a value. Informational.
  - `meta-product` must exactly match the name of a [product](/reference/products) in your [organization](/reference/organizations). Defines the product within which the firmware will be scoped.
  - `meta-version` must be a valid [semantic version](https://semver.org/spec/v2.0.0.html). Defines the version of the firmware.

## Time to Live (TTL)

Firmware can be configured on a per-firmware basis to be deleted automatically after a set amount of seconds by configuring their `ttl` field. Firmware associated with a deployment will never be automatically deleted. Dissassociating a firmware with a configured TTL from all deployments will cause the TTL to begin counting down again from its maximum value.

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

## Delta Updates

It is possible to ship delta updates with Peridio in a self-managed or Peridio-managed fashion.

### Self-Managed

This approach yields the greatest flexibility, but comes at the cost of complexity. It would mean you would be responsible for:

1. Generating patch files yourself before submitting them as firmware to Peridio.
2. Ensuring you orchestrate your deployments in such a manner as to serve patch files to the correct devices.
3. Write the device code to apply the patch files.

Note that with this approach you would not actually enable delta updates features in Peridio (check boxes in the Web Console nor fields in the API/CLI), as that is used only in the Peridio-Managed case.

### Peridio-Managed

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
