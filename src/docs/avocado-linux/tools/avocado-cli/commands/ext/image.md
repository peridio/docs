```
Create a squashfs or erofs image from a system extension

Usage: avocado ext image [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -e, --extension <EXTENSION>           Extension name (alias for positional NAME)
  -t, --target <TARGET>                 Target architecture
      --out <OUT_DIR>                   Output directory on host to copy the resulting .raw image to
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                            Print help

```

## Overview

`avocado ext image` creates a read-only filesystem image (`.raw`) from a built extension sysroot. The image is stored in the SDK container volume and, if `--out` is specified, copied to the host.

## Filesystem types

The image format is controlled by the `filesystem` field in the extension config:

```yaml
extensions:
  my-app:
    version: '1.0.0'
    filesystem: erofs # or 'squashfs' (default)
```

| Value      | Tool         | Notes                                                             |
| ---------- | ------------ | ----------------------------------------------------------------- |
| `squashfs` | `mksquashfs` | Default; broad compatibility                                      |
| `erofs`    | `mkfs.erofs` | Better random-read performance; smaller images for many workloads |

## Reproducible builds

Set `source_date_epoch` at the top level of your `avocado.yaml` to produce bit-for-bit reproducible images:

```yaml
source_date_epoch: 1700000000
```

This value is passed as the filesystem timestamp to both `mksquashfs` and `mkfs.erofs`. When unset it defaults to `0`.

## `var_files` exclusion

Files matching `var_files` patterns in the extension config are **excluded** from the `.raw` image. They belong on the writable var partition, not the read-only extension image:

```yaml
extensions:
  my-app:
    version: '1.0.0'
    var_files:
      - var/lib/docker/**
      - var/lib/myapp/data/
```

See [Seeding the var partition](../../../../guides/seeding-var-partition) for how these files are seeded at build time.

## Copying the image to the host

Use `--out` to copy the resulting `.raw` file to a local directory:

```bash
avocado ext image my-app --out ./dist/
```

The file is named `<extension>-<version>.raw`.
