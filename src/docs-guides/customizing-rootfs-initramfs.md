---
sidebar_position: 8
title: 'Customizing the rootfs and initramfs'
description: 'Add packages to the Avocado rootfs and initramfs sysroots to customize the base root filesystem and early boot environment.'
---

Avocado builds runtime images from two base sysroots: the **rootfs** (the read-only root filesystem) and the **initramfs** (the early boot environment that runs before the rootfs is mounted). By default each sysroot installs a single meta-package that pulls in everything needed for a standard Avocado system. You can add extra packages to either sysroot to customize what ships on your device.

## Default behavior

When no `rootfs` or `initramfs` section is present in your `avocado.yaml`, the CLI installs the default meta-packages automatically:

| Sysroot   | Default package         |
| --------- | ----------------------- |
| rootfs    | `avocado-pkg-rootfs`    |
| initramfs | `avocado-pkg-initramfs` |

These meta-packages depend on the core set of packages needed for a functional Avocado system. You do not need to add anything to your config if the defaults are sufficient.

## Adding packages to the rootfs

To add packages to the rootfs, add a `rootfs` section with a `packages` map to your `avocado.yaml`:

```yaml
rootfs:
  packages:
    avocado-pkg-rootfs: '*'
    strace: '*'
    tcpdump: '>=4.0'
```

:::caution

When you specify `rootfs.packages`, the CLI installs **only** the packages you list — it does **not** automatically include `avocado-pkg-rootfs`. You must always include `avocado-pkg-rootfs` in the package list. Omitting it will produce a rootfs that is missing core Avocado system components.

:::

### Version constraints

Package values are version constraints passed to DNF:

| Value     | Meaning                        |
| --------- | ------------------------------ |
| `'*'`     | Any version (latest available) |
| `'1.2'`   | Exact version `1.2`            |
| `'>=4.0'` | Version 4.0 or newer           |

## Adding packages to the initramfs

The initramfs works the same way. Add an `initramfs` section:

```yaml
initramfs:
  packages:
    avocado-pkg-initramfs: '*'
    e2fsprogs: '*'
```

:::caution

As with the rootfs, when you specify `initramfs.packages` you must always include `avocado-pkg-initramfs`. The CLI installs only the packages you list.

:::

## Choosing a filesystem format

Both sysroots support configuring the output image filesystem:

```yaml
rootfs:
  filesystem: erofs-lz4 # default
  packages:
    avocado-pkg-rootfs: '*'

initramfs:
  filesystem: cpio.zst # default
  packages:
    avocado-pkg-initramfs: '*'
```

### Rootfs filesystem options

| Value       | Description                           |
| ----------- | ------------------------------------- |
| `erofs-lz4` | Default. EROFS with LZ4HC compression |
| `erofs-zst` | EROFS with Zstandard compression      |

### Initramfs filesystem options

| Value      | Description                                      |
| ---------- | ------------------------------------------------ |
| `cpio.zst` | Default. cpio archive with Zstandard compression |
| `cpio`     | Uncompressed cpio archive                        |
| `cpio.lz4` | cpio archive with LZ4 compression                |
| `cpio.gz`  | cpio archive with gzip compression               |

## Complete example

```yaml
sdk:
  image: docker.io/avocadolinux/sdk:2024-edge

rootfs:
  filesystem: erofs-lz4
  packages:
    avocado-pkg-rootfs: '*'
    strace: '*'
    vim-minimal: '*'

initramfs:
  filesystem: cpio.zst
  packages:
    avocado-pkg-initramfs: '*'
    e2fsprogs: '*'

extensions:
  my-app:
    version: '1.0.0'
    types: [sysext]

runtimes:
  dev:
    extensions: [my-app]
    packages:
      avocado-runtime: '*'
```

## Build workflow

```bash
# Install all sysroots (SDK, rootfs, initramfs, extensions, runtimes)
avocado install

# Or install sysroots individually
avocado rootfs install
avocado initramfs install

# Build images
avocado rootfs image
avocado initramfs image

# Or build everything at once
avocado build
```

The `avocado install` and `avocado build` commands handle the rootfs and initramfs automatically as part of the full build pipeline. The individual `avocado rootfs` and `avocado initramfs` commands are useful for iterating on just the sysroot without rebuilding everything.

## Package removal

If you remove a package from the `packages` map, the CLI detects the removal on the next `install` and automatically cleans the sysroot before reinstalling. This is because DNF's installroot mode is additive-only — it cannot remove individual packages from an existing sysroot.

## Lock file

Installed package versions are recorded in `avocado.lock` after each successful install. This ensures reproducible builds — subsequent installs will pin to the same versions unless you run `avocado unlock` to allow updates.
