---
title: 'Repositories'
description: 'Avocado OS repository architecture for rapid development with production-grade security - build-time composition using vendor Yocto meta-layers and deterministic images.'
---

Avocado OS leverages a sophisticated repository architecture that enables rapid development while maintaining production-grade security and reliability. Unlike traditional package management systems that operate at runtime, Avocado's repositories are used exclusively during the build phase to create deterministic, verifiable system images.

## Binary distribution model

Avocado takes vendor Yocto meta-layers and builds packages, SDK containers, and images for popular targets from vendors like NXP, NVIDIA, STMicro, and MediaTek. Rather than installing all development tools by default, developers declaratively specify which packages to install into their system extension build environment.

The key difference from traditional approaches is **build-time composition**: packages are composed into extensions during development, not at runtime. This eliminates the resource-intensive compilation typically required for embedded Linux while ensuring deterministic, identical builds across environments.

## Repository types

**Core system repositories** contain base OS packages (kernel, systemd, essential utilities), security components, and hardware-specific drivers and firmware.

**SDK repositories** provide cross-compilation toolchains, development libraries, and build tools, all available through the same declarative package selection system.

**Extension repositories** offer runtime environments (container engines, language runtimes), application libraries, and hardware abstraction layers.

## Custom package integration

Developers can override upstream packages with custom versions through a priority system. Custom packages from Yocto builds or other cross-compilation environments take priority over upstream Avocado packages, allowing teams to use modified versions while maintaining integration with the build system.

## Repository configuration

Repository settings are configured in the `distro` section of your `avocado.yaml`:

```yaml
distro:
  release: 2024
  channel: edge
  repo:
    url: https://repo.avocadolinux.org # optional, this is the default
    releasever: 2024/edge # optional, derived from release/channel when omitted
```

The `release` field specifies the feed year and `channel` specifies the stability tier (`edge` or `stable`). The entire `repo` section is optional. When omitted, `url` defaults to `https://repo.avocadolinux.org` and `releasever` is derived automatically as `{release}/{channel}` (e.g., `2024/edge`).

The `repo.url` and `repo.releasever` fields replace the deprecated `sdk.repo_url` and `sdk.repo_release` fields, which still function as fallbacks.

All repository settings can be overridden with environment variables:

| Environment variable     | Config field             | Description                        |
| ------------------------ | ------------------------ | ---------------------------------- |
| `AVOCADO_REPO_URL`       | `distro.repo.url`        | Package repository URL             |
| `AVOCADO_RELEASEVER`     | `distro.repo.releasever` | DNF releasever (e.g., `2024/edge`) |
| `AVOCADO_DISTRO_RELEASE` | `distro.release`         | Feed year (e.g., `2024`)           |
| `AVOCADO_DISTRO_CHANNEL` | `distro.channel`         | Stability channel (e.g., `edge`)   |

## Security and verification

All packages are cryptographically signed with developer-controlled keys, establishing a chain of trust from repository to deployed system. Package contents are verified for integrity, and dependency verification ensures all components are properly signed. This enables both public community repositories and private organizational repositories with appropriate access controls.

The repository architecture maximizes developer productivity through incremental updates, parallel development, shared dependencies, and intelligent caching, while integrating seamlessly with CI/CD pipelines for automated building, testing, and staged deployment.
