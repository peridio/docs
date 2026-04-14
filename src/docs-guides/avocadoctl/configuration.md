---
title: Configuration
sidebar_position: 2
description: 'Configuration reference for avocadoctl including config file format, extension mutability modes, and environment variable overrides.'
---

avocadoctl is configured via a TOML file at `/etc/avocado/avocadoctl.conf`. All settings have sensible defaults and the config file is optional.

## Configuration File

```toml
[avocado.ext]
dir = "/var/lib/avocado/images"
sysext_mutable = "ephemeral"
confext_mutable = "ephemeral"

[avocado]
runtimes_dir = "/var/lib/avocado"
socket = "unix:/run/avocado/avocadoctl.sock"

[avocado.update]
stream_os_to_partition = false
```

## Extension Settings

The `[avocado.ext]` section controls how extensions are stored and merged.

| Key               | Type   | Default                   | Description                                                                                                    |
| ----------------- | ------ | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `dir`             | string | `/var/lib/avocado/images` | Directory where extension images are stored                                                                    |
| `sysext_mutable`  | string | `ephemeral`               | Mutability mode for system extensions (sysext) overlaying `/usr` and `/opt`                                    |
| `confext_mutable` | string | `ephemeral`               | Mutability mode for configuration extensions (confext) overlaying `/etc`                                       |
| `mutable`         | string | -                         | **Deprecated.** Legacy option that applies to both sysext and confext. Use the specific options above instead. |

### Mutability Modes

These values control how systemd-sysext and systemd-confext handle writes to the overlaid directories.

| Value              | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| `no`               | Overlaid directories are read-only                                     |
| `auto`             | Let systemd decide based on the underlying filesystem                  |
| `yes`              | Overlaid directories are writable (persistent)                         |
| `import`           | Import the upper directory contents into the base on unmerge           |
| `ephemeral`        | Overlaid directories are writable but changes are discarded on unmerge |
| `ephemeral-import` | Like `ephemeral`, but imports upper contents on unmerge                |

## General Settings

The `[avocado]` section controls base paths and daemon communication.

| Key            | Type   | Default                             | Description                                                 |
| -------------- | ------ | ----------------------------------- | ----------------------------------------------------------- |
| `runtimes_dir` | string | `/var/lib/avocado`                  | Base directory for runtimes, images, and the active symlink |
| `socket`       | string | `unix:/run/avocado/avocadoctl.sock` | Varlink daemon socket address                               |

## Update Settings

The `[avocado.update]` section controls OS update behavior.

| Key                      | Type | Default | Description                                                                                                                                                                     |
| ------------------------ | ---- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stream_os_to_partition` | bool | `false` | Stream OS bundle artifacts directly from HTTP to partitions without staging to disk. Reduces disk I/O and temporary storage but disables resumable downloads for the OS bundle. |

## Environment Variable Overrides

Environment variables take precedence over config file values.

| Variable                  | Overrides              | Description                                      |
| ------------------------- | ---------------------- | ------------------------------------------------ |
| `AVOCADO_BASE_DIR`        | `avocado.runtimes_dir` | Override the base directory for all avocado data |
| `AVOCADO_EXTENSIONS_PATH` | `avocado.ext.dir`      | Override the extensions image directory          |

## Precedence Order

Settings are resolved in this order (highest priority first):

1. CLI flags (e.g., `--socket`, `--config`)
2. Environment variables
3. Config file (`/etc/avocado/avocadoctl.conf`)
4. Built-in defaults
