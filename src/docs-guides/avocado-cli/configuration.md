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

### Checking your config

The CLI warns about any key it ignores, whether it's misspelled, in the wrong place, or an old name that was renamed. It suggests the closest valid key when one is near:

```text
[WARNING] avocado.yaml: unknown key 'runtimes.dev.extentions' is ignored; did you mean 'extensions'?
```

These are warnings, not errors, so a file that built before still builds. `avocado config show --output json` includes them in a `warnings` array.

The same schema powers editor support. Projects created with `avocado init` start with this line, which gives VS Code (with the Red Hat YAML extension) and other YAML-language-server editors autocomplete, hover docs and validation. Add it to the top of an existing `avocado.yaml` to get the same:

```yaml
# yaml-language-server: $schema=https://docs.peridio.com/schemas/avocado-config.json
```

## Environment variables

Environment variables take precedence over configuration file values. When set, they override the corresponding config field.

| Environment variable     | Config equivalent        | Description                                                                                                                                   |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `AVOCADO_TARGET`         | `default_target`         | Target architecture for builds and deployments.                                                                                               |
| `AVOCADO_TARGET_BOARD`   | `default_target_board`   | Board variant within the target, feeding `{{ avocado.target.board }}` interpolation.                                                          |
| `AVOCADO_RUNTIME`        | `default_runtime`        | Default runtime for commands that scope by runtime. Overrides `default_runtime` from config.                                                  |
| `AVOCADO_REPO_URL`       | `distro.repo.url`        | Package repository URL.                                                                                                                       |
| `AVOCADO_RELEASEVER`     | `distro.repo.releasever` | DNF releasever override (e.g., `2024/edge`).                                                                                                  |
| `AVOCADO_DISTRO_RELEASE` | `distro.release`         | Distribution feed year (e.g., `2024`).                                                                                                        |
| `AVOCADO_DISTRO_CHANNEL` | `distro.channel`         | Distribution stability channel (e.g., `edge`, `stable`).                                                                                      |
| `AVOCADO_PARALLEL_TASKS` | none                     | How many tasks run at once across the install DAG, the build DAG and the SDK phase. Defaults to `min(cpus, 4)`, and to `1` under `--runs-on`. |

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

## Default target and board

Set `default_target` to avoid passing `--target` (`-t`) on every invocation. `avocado init --target <target>` writes it for you:

```yaml
default_target: qemux86-64
```

Some targets are a System-on-Module (SoM) that ships on more than one carrier board. For those, the target alone is not enough — you must also set a board so the build knows which board's device tree and provisioning to use. The board feeds the `{{ avocado.target.board }}` interpolation and resolves from highest to lowest precedence:

1. `--target-board` CLI flag
2. `AVOCADO_TARGET_BOARD` environment variable
3. The resolved runtime's `target_board` (when set on that runtime)
4. Top-level `default_target_board`
5. Falls back to the resolved target when none of the above are set

The `--target-board` flag is available on the same subcommands as `--target` (`build`, `provision`, `runtime provision`, `install`, and the `rootfs` / `initramfs` / `sdk` / `ext` build steps).

Set both keys at the top of your `avocado.yaml`:

```yaml
default_target: 'imx8mp-var-dart'
default_target_board: 'variscite-sonata'
```

Or scope the board to a single runtime, which wins over the top-level default when that runtime is selected:

```yaml
default_target: 'imx8mp-var-dart'

runtimes:
  dev:
    target_board: 'variscite-sonata'
```

To override per command without editing config:

```bash
avocado build --target imx8mp-var-dart --target-board variscite-sonata
```

The per-target [Getting Started](/developer-reference/getting-started/any-target) page and the target's [hardware page](/hardware/support-matrix) call out when a board is required and which value to use.

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

## One entry or named entries

`rootfs`, `initramfs`, `kernel` and `permissions` each take either one configuration or a map of named ones. The CLI decides by the keys it finds:

- If any key is one of that section's fields (such as `packages` in `rootfs`, or `users` in `permissions`), the whole section is one configuration, named `default`.
- Otherwise every key is an entry name, and each entry is a configuration.

`target-<name>:` override keys don't count either way, and mixing field keys with entry names is an error.

```yaml
# One configuration: `users` is a permissions field
permissions:
  users:
    root:
      password: ''

# Named entries: `dev` and `prod` are not permissions fields
permissions:
  dev:
    users:
      root:
        password: ''
  prod:
    users:
      admin:
        password: '$6$...'
```

Watch for misspellings here. `permissions: { user: ... }` has no permissions field, so it is read as an entry named `user`, not as users. The CLI warns about this: `'permissions.user' sets no permissions fields, so it is read as a named permissions entry; did you mean the field 'users'?`

Named entries are referenced by name, for example `permissions: prod` on a rootfs, or `kernel: yocto-6-6` on a runtime. For `rootfs` and `initramfs`, only the entry named `default` (or the only entry) is built, and `overlay`, `post_install` and `image` are read only in the one-configuration form, so use that form for images.

## Rootfs configuration

The `rootfs` section configures the shared rootfs sysroot used by runtime builds.

```yaml
rootfs:
  filesystem: erofs-lz4 # default
  overlay: overlays/rootfs # optional: copied into the sysroot after package install
  permissions: dev # a profile from the top-level permissions section
  packages:
    avocado-pkg-rootfs: '*'
```

| Field          | Default              | Description                                                                                                                                                                                             |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages`     | `avocado-pkg-rootfs` | Map of package names to version constraints. When no packages are set, the rootfs installs `avocado-pkg-rootfs`                                                                                         |
| `filesystem`   | `erofs-lz4`          | Image format: `erofs-lz4` or `erofs-zst`                                                                                                                                                                |
| `overlay`      |                      | Path or object — see [Overlay](#overlay) below                                                                                                                                                          |
| `permissions`  |                      | Users and groups for the image: the name of a [permissions](#permissions) profile, or an inline profile                                                                                                 |
| `post_install` |                      | Script, relative to `src_dir`, run on the image work directory just before the filesystem is created. It replaces the built-in steps (usrmerge symlinks, `/etc/machine-id`, systemd preset, `ldconfig`) |
| `image`        |                      | Image wrapper: `type` (`kab` wraps and signs with kabtool; anything else is raw), `args` (kabtool arguments) and `verity` (dm-verity protected)                                                         |
| `source`       |                      | `{ type: path, path: <dir> }` reads the whole section from `<dir>/avocado.yaml` instead, with `<dir>` relative to `src_dir`                                                                             |

A `target-<name>:` block inside `rootfs` overrides settings for that target, but only `post_install` and `image` are taken from it.

## Initramfs configuration

The `initramfs` section configures the initramfs sysroot used for the early boot environment. It takes the same fields as `rootfs`, with these differences:

```yaml
initramfs:
  filesystem: cpio.zst # default
  overlay: overlays/initramfs # optional: copied into the sysroot after package install
  permissions: dev
  packages:
    avocado-pkg-initramfs: '*'
```

| Field        | Default                 | Description                                                                                                           |
| ------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `packages`   | `avocado-pkg-initramfs` | Map of package names to version constraints. When no packages are set, the initramfs installs `avocado-pkg-initramfs` |
| `filesystem` | `cpio.zst`              | Image format: `cpio`, `cpio.zst`, `cpio.lz4`, or `cpio.gz`                                                            |
| `image`      |                         | As for `rootfs`, but `verity` has no effect                                                                           |

## Overlay

The `overlay` field on `rootfs` and `initramfs` copies a directory from your project into the sysroot after package installation. Extensions take the same field. Two forms are supported:

```yaml
# Short form — merge mode
rootfs:
  overlay: overlays/rootfs

# Long form — explicit mode
initramfs:
  overlay:
    dir: overlays/initramfs
    mode: opaque
```

| Field        | Default   | Description                                                                                                                                              |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dir`        | `overlay` | Path relative to the project root (`src_dir`)                                                                                                            |
| `mode`       | `merge`   | `merge` copies with `cp -a`, preserving timestamps and other attributes. `opaque` copies with `cp -r`, which doesn't preserve timestamps                 |
| `preprocess` |           | Run template interpolation over overlay files first: `true` for every file, or a list of globs matched against paths relative to the overlay. UTF-8 only |

Neither mode removes files that are already in the sysroot: files from the overlay are added or replace files at the same path, and for rootfs and initramfs everything copied is owned by root. The string short form is equivalent to `{ dir: "...", mode: "merge" }`. The overlay path is resolved as `/opt/src/<path>` inside the SDK container. Overlay config participates in the sysroot stamp, so changes trigger a reinstall.

## Permissions

The `permissions` section defines the users and groups baked into an image's `/etc/passwd`, `/etc/shadow` and `/etc/group` at build time. A rootfs or initramfs picks a profile through its `permissions` field, by name or inline. Projects created with `avocado init` start with a `dev` profile:

```yaml
rootfs:
  permissions: dev

initramfs:
  permissions: dev

permissions:
  dev: # NOT FOR PRODUCTION: empty root password
    users:
      root:
        password: ''
  prod:
    users:
      admin:
        password: '$6$...' # a crypt hash, as written to /etc/shadow
        shell: /bin/sh
        groups: [admin, wheel]
    groups:
      admin:
        gid: 1000
```

### User fields

| Field                                                                              | Description                                                                                                                                                      |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `password`                                                                         | Password hash written to `/etc/shadow`. An empty string means no password. Defaults to `*`, which disables password login                                        |
| `uid`                                                                              | User ID. When omitted, assigned from a counter starting at 1000 that doesn't skip IDs already in the base image                                                  |
| `gid`                                                                              | Primary group ID written to `/etc/passwd`. When omitted, it takes the auto-assigned UID value. No matching group is created                                      |
| `groups`                                                                           | The first entry is skipped (by convention the user's own group; the primary GID comes from `gid`). The user joins each remaining group, which must already exist |
| `home`, `shell`, `gecos`                                                           | Home directory, login shell and full-name field                                                                                                                  |
| `last_change`, `min_days`, `max_days`, `warn_days`, `inactive_days`, `expire_date` | Password aging fields for `/etc/shadow`, as integers                                                                                                             |

### Group fields

A group's value can be an object with these fields, or empty for a group with an automatically assigned GID.

| Field     | Description                                                                                  |
| --------- | -------------------------------------------------------------------------------------------- |
| `gid`     | Group ID. When omitted, assigned from a counter starting at 1000                             |
| `members` | Users in the group. For a group already in the base image, applied only when its GID matches |

A user's `disabled` and a group's `password` have no effect, and the CLI warns if you set them. `system` on a user or group only labels the build log; it doesn't change ID allocation.

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

**Command line** (either mode, or on its own):

| Field           | Description                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `cmdline`       | Complete kernel command line, replacing the platform's own. Mutually exclusive with `cmdline_extra`                    |
| `cmdline_extra` | Arguments appended to the platform's command line (e.g. `isolcpus=4-6`, `earlycon`). Mutually exclusive with `cmdline` |

A `kernel:` block that sets only `cmdline` or `cmdline_extra` is valid, and it does not change where the kernel comes from. The kernel is still selected by the runtime's named reference, the top-level entry, or the platform, exactly as if the block were absent; the project is only changing how that kernel boots. Precedence is per concern: a runtime's `cmdline` / `cmdline_extra` wins over the top-level one, while the kernel itself keeps resolving by its own rules. Both resolve per target, so a `target-<name>:` override at either level is honored. The command line reaches the build and provision hooks as `AVOCADO_KERNEL_CMDLINE` / `AVOCADO_KERNEL_CMDLINE_EXTRA`, and editing it alone invalidates the runtime build.

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

  rt:
    kernel: # command line only; the kernel itself resolves as if this block were absent
      cmdline_extra: 'isolcpus=4-6 nohz_full=4-6'
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
