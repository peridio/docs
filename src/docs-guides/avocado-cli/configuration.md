---
title: Configuration
sidebar_position: 3
description: 'Avocado CLI configuration guide - precedence of CLI arguments, environment variables, and configuration files for project setup and board support.'
---

The Avocado config defines your project from board support to provisioning, and everything in between.

## Precedence of supplied values

The Avocado CLI can be configured three ways, from highest to lowest precedence:

1. CLI arguments
2. Environment variables
3. Configuration files

## Configuration files

The Avocado CLI uses a single configuration file to define your project settings, build configurations, dependencies, and provisioning profiles.

By default, the CLI looks for a configuration file named `avocado.yaml` in the current working directory. This can be configured to use a different file name or location.

For detailed information about all available configuration options, see the [config schema](./config-schema.mdx).

## Environment variables

Environment variables take precedence over configuration file values. When set, they override the corresponding config field.

| Environment variable     | Config equivalent        | Description                                                                                  |
| ------------------------ | ------------------------ | -------------------------------------------------------------------------------------------- |
| `AVOCADO_TARGET`         | `default_target`         | Target architecture for builds and deployments.                                              |
| `AVOCADO_RUNTIME`        | `default_runtime`        | Default runtime for commands that scope by runtime. Overrides `default_runtime` from config. |
| `AVOCADO_REPO_URL`       | `distro.repo.url`        | Package repository URL.                                                                      |
| `AVOCADO_RELEASEVER`     | `distro.repo.releasever` | DNF releasever override (e.g., `2024/edge`).                                                 |
| `AVOCADO_DISTRO_RELEASE` | `distro.release`         | Distribution feed year (e.g., `2024`).                                                       |
| `AVOCADO_DISTRO_CHANNEL` | `distro.channel`         | Distribution stability channel (e.g., `edge`, `stable`).                                     |

### Legacy environment variables

The following environment variables are deprecated but still supported as fallbacks:

| Legacy variable            | Replacement          |
| -------------------------- | -------------------- |
| `AVOCADO_SDK_REPO_URL`     | `AVOCADO_REPO_URL`   |
| `AVOCADO_SDK_REPO_RELEASE` | `AVOCADO_RELEASEVER` |

## Default runtime

Set `default_runtime` to avoid passing `--runtime` on every invocation. Resolution order from highest to lowest precedence:

1. CLI `-r`/`--runtime` argument
2. `AVOCADO_RUNTIME` environment variable
3. `default_runtime` config value
4. Auto-resolved sole runtime (when exactly one runtime is defined)

```yaml
default_runtime: dev

runtimes:
  dev:
    # ...
  prod:
    # ...
```

When `default_runtime` is set, the CLI validates at startup that it references a runtime defined in `runtimes:`.

## Connect configuration

The `connect` section stores defaults for Avocado Connect platform commands, so you don't need to pass `--org` and `--project` on every invocation. This section is typically populated by running `avocado connect init`.

```yaml
connect:
  org: my-org-id
  project: my-project-id
  server_key: <hex-encoded TUF public key>
```

| Field        | Description                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `org`        | Default organization ID for `avocado connect` commands                                         |
| `project`    | Default project ID for `avocado connect` commands                                              |
| `server_key` | Connect server's TUF signing public key (hex). Per-runtime `signing.server_key` overrides this |

## Rootfs configuration

The `rootfs` section configures the shared rootfs sysroot used by runtime builds.

```yaml
rootfs:
  filesystem: erofs-lz4 # default
  overlay: overlays/rootfs # optional: merged into sysroot after package install
  packages:
    avocado-pkg-rootfs: '*'
```

| Field        | Default     | Description                                    |
| ------------ | ----------- | ---------------------------------------------- |
| `filesystem` | `erofs-lz4` | Image format: `erofs-lz4` or `erofs-zst`       |
| `overlay`    |             | Path or object — see [Overlay](#overlay) below |
| `packages`   |             | Map of package names to version constraints    |

## Initramfs configuration

The `initramfs` section configures the initramfs sysroot used for the early boot environment.

```yaml
initramfs:
  filesystem: cpio.zst # default
  overlay: overlays/initramfs # optional: merged into sysroot after package install
  packages:
    avocado-pkg-initramfs: '*'
```

| Field        | Default    | Description                                                |
| ------------ | ---------- | ---------------------------------------------------------- |
| `filesystem` | `cpio.zst` | Image format: `cpio`, `cpio.zst`, `cpio.lz4`, or `cpio.gz` |
| `overlay`    |            | Path or object — see [Overlay](#overlay) below             |
| `packages`   |            | Map of package names to version constraints                |

## Overlay

The `overlay` field on `rootfs` and `initramfs` merges a source directory from your project into the sysroot after package installation. Two forms are supported:

```yaml
# Short form — merge mode (rsync -a: adds/replaces files, leaves unrelated files alone)
rootfs:
  overlay: overlays/rootfs

# Long form — explicit mode
initramfs:
  overlay:
    dir: overlays/initramfs
    mode: opaque # cp -r: fully replaces directory contents
```

| Field  | Default    | Description                                               |
| ------ | ---------- | --------------------------------------------------------- |
| `dir`  | (required) | Path relative to project root (`src_dir`)                 |
| `mode` | `merge`    | `merge` (rsync -a) or `opaque` (cp -r, replaces contents) |

The string short form is equivalent to `{ dir: "...", mode: "merge" }`. The overlay path is resolved as `/opt/src/<path>` inside the SDK container. Overlay config participates in the sysroot stamp, so changes trigger a reinstall.

## Kernel configuration

The top-level `kernel:` block defines one or more kernel configurations that runtimes can reference. Two forms are accepted:

```yaml
# Singleton form — synthesized as the implicit "default" kernel
kernel:
  package: kernel-image
  version: '*'

# Named map form — multiple kernels for different runtimes
kernel:
  yocto-6-6:
    package: kernel-image-6.6
    version: '*'
  yocto-5-15:
    package: kernel-image-5.15
    version: '*'
```

### Kernel config fields

Two mutually exclusive modes:

**Package mode** — kernel installed from an RPM during `runtime install`:

| Field     | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `package` | Package name (e.g. `kernel-image`). Mutually exclusive with `compile` |
| `version` | Version constraint (e.g. `*`, `6.6.*`). Used with `package`           |

**Compile mode** — kernel cross-compiled via `sdk.compile.<section>` during `runtime build`:

| Field     | Description                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------- |
| `compile` | SDK compile section name (references `sdk.compile.<section>`). Mutually exclusive with `package`   |
| `install` | Install script path — copies kernel artifacts to runtime build dir. Required when `compile` is set |

### Runtime kernel references

A runtime can reference a named top-level kernel entry or provide an inline override:

```yaml
runtimes:
  dev:
    kernel: yocto-6-6 # named reference (string)

  prod:
    kernel: # inline override (object)
      package: kernel-image
      version: '6.6.*'
```

When `kernel:` is omitted on a runtime, the CLI falls back to the top-level `default` kernel entry, or — when no top-level kernel is configured — to the `avocado-runtime` meta-package's legacy bootfiles behavior.

## Var partition configuration

The runtime `var` section configures the btrfs-formatted `/var` partition: a default compression algorithm and a map of subvolumes keyed by path (relative to the var root). Subvolumes can also be declared at the extension level, in which case they travel with the extension; runtime-level entries deep-merge on top and win on conflict.

```yaml
extensions:
  my-ext:
    subvolumes:
      lib/docker:
        nodatacow: true
        quota: '10G'
      lib/myapp/cache: true # shorthand: writable with defaults

runtimes:
  dev:
    extensions: [my-ext]
    var:
      compression: 'zstd:3'
      subvolumes:
        lib/logs:
          writable: true
          compression: 'zstd:9' # per-subvolume override
        lib/docker:
          writable: false # override extension: make read-only
```

A built-in `lib/avocado` subvolume is always present (writable). Declaring it explicitly in runtime `var.subvolumes` suppresses the nested-path warning for extensions that live under it.

### `var` fields

| Field         | Default | Description                                                                                                        |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `compression` | none    | Partition-wide default compression (e.g. `zstd`, `zstd:3`, `lzo`, `zlib:6`, `no`). Overridden by per-subvolume set |
| `subvolumes`  |         | Map of path → subvolume entry. Paths are relative to the var root                                                  |

### Subvolume entry forms

Each map value can be a shorthand or a full object:

| Form               | Meaning                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `true`             | Enabled, writable, inherits partition defaults                       |
| `false`            | Disabled — suppresses an extension-declared subvolume from a runtime |
| `"ro"`             | Enabled, read-only, inherits partition defaults                      |
| object (see below) | Full configuration                                                   |

### Subvolume object fields

| Field         | Default   | Description                                                                                                      |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `writable`    | `true`    | `false` makes the subvolume read-only (applied post-mkfs via `btrfs property set ro true`)                       |
| `compression` | inherited | Per-subvolume compression. Ignored (and skipped) when `nodatacow: true` — NOCOW disables COW                     |
| `nodatacow`   | `false`   | Set the NOCOW inode flag via `chattr +C`. Useful for databases, VM images, and other random-write workloads      |
| `quota`       | none      | Qgroup size limit (e.g. `500M`, `5G`, `none`). Enables btrfs quotas on the partition when any subvolume sets one |
| `enabled`     | `true`    | Set to `false` to suppress an extension-declared subvolume from a runtime                                        |

### Resolution order

1. Built-in `lib/avocado` (writable).
2. Extensions from the runtime's extension list, in order — first-listed wins on path conflicts (a warning is emitted for collisions).
3. Runtime `var.subvolumes` deep-merges on top, always winning.
4. Partition-level `var.compression` applied as the default for subvolumes that don't set their own.
5. Entries with `enabled: false` are filtered out.

Subvolume config is included in the runtime input hash, so changes trigger a proper var-image rebuild.

## Examples

Example configuration files are available in the [Avocado OS repository](https://github.com/avocado-linux/avocado-os/tree/main/references). These examples demonstrate common configuration patterns for different use cases and target platforms.
