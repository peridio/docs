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

| Environment variable     | Config equivalent        | Description                                              |
| ------------------------ | ------------------------ | -------------------------------------------------------- |
| `AVOCADO_TARGET`         | `default_target`         | Target architecture for builds and deployments.          |
| `AVOCADO_REPO_URL`       | `distro.repo.url`        | Package repository URL.                                  |
| `AVOCADO_RELEASEVER`     | `distro.repo.releasever` | DNF releasever override (e.g., `2024/edge`).             |
| `AVOCADO_DISTRO_RELEASE` | `distro.release`         | Distribution feed year (e.g., `2024`).                   |
| `AVOCADO_DISTRO_CHANNEL` | `distro.channel`         | Distribution stability channel (e.g., `edge`, `stable`). |

### Legacy environment variables

The following environment variables are deprecated but still supported as fallbacks:

| Legacy variable            | Replacement          |
| -------------------------- | -------------------- |
| `AVOCADO_SDK_REPO_URL`     | `AVOCADO_REPO_URL`   |
| `AVOCADO_SDK_REPO_RELEASE` | `AVOCADO_RELEASEVER` |

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
  packages:
    avocado-pkg-rootfs: '*'
```

| Field        | Default     | Description                                 |
| ------------ | ----------- | ------------------------------------------- |
| `filesystem` | `erofs-lz4` | Image format: `erofs-lz4` or `erofs-zst`    |
| `packages`   |             | Map of package names to version constraints |

## Initramfs configuration

The `initramfs` section configures the initramfs sysroot used for the early boot environment.

```yaml
initramfs:
  filesystem: cpio.zst # default
  packages:
    avocado-pkg-initramfs: '*'
```

| Field        | Default    | Description                                                |
| ------------ | ---------- | ---------------------------------------------------------- |
| `filesystem` | `cpio.zst` | Image format: `cpio`, `cpio.zst`, `cpio.lz4`, or `cpio.gz` |
| `packages`   |            | Map of package names to version constraints                |

## Examples

Example configuration files are available in the [Avocado OS repository](https://github.com/avocado-linux/avocado-os/tree/main/references). These examples demonstrate common configuration patterns for different use cases and target platforms.
