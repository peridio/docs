---
title: Installation
sidebar_position: 2
description: 'Install Avocado CLI for Avocado Linux development - download, extract, and verify installation with upgrade instructions.'
---

## Supported platforms

Avocado CLI ships prebuilt binaries for the following OS / architecture combinations on every release:

| Operating system | Architecture     | Target triple                |
| ---------------- | ---------------- | ---------------------------- |
| macOS            | Apple Silicon    | `aarch64-apple-darwin`       |
| macOS            | Intel            | `x86_64-apple-darwin`        |
| Linux            | aarch64 (static) | `aarch64-unknown-linux-musl` |
| Linux            | x86_64 (glibc)   | `x86_64-unknown-linux-gnu`   |
| Linux            | x86_64 (static)  | `x86_64-unknown-linux-musl`  |
| Windows          | x86_64           | `x86_64-pc-windows-msvc`     |

The Linux `*-musl` builds are statically linked, so they do not depend on the host glibc version, but they still require a compatible Linux kernel and matching architecture. The `*-gnu` build is dynamically linked against glibc and is suitable for mainstream Linux distributions with glibc 2.31 or newer (Debian 11+, Ubuntu 20.04+, Fedora 33+, RHEL 9+).

The install script picks the appropriate binary automatically. For manual installs, download the matching artifact from the [releases page](https://github.com/avocado-linux/avocado-cli/releases), or use [Downloads](https://www.peridio.com/downloads#cli-artifacts), which lists every shipping build with its size and SHA-256.

Prefer a native app? [Avocado Desktop](https://www.peridio.com/downloads#desktop) ships for macOS and Linux, carrying the CLI and the cross-compilation toolchain in one install, plus the build VM on macOS. The Arch Linux package (`pacman`) is the exception: it links a CLI you install separately rather than bundling one.

## Install

On macOS or Linux:

```bash
curl -fsSL https://connect.peridio.com/install.sh | sh
```

On Windows, or to install manually, use the GitHub releases:

1. Download an Avocado CLI tarball from the [releases page](https://github.com/avocado-linux/avocado-cli/releases).
2. Extract the tarball using the following command:
   ```bash
   tar -xzvf <tarball>
   ```
3. Move the extracted binary to a directory in your PATH:
   ```bash
   mv avocado /usr/local/bin/
   ```
4. Verify the installation:
   ```bash
   avocado --version
   ```
   If successful, you should see the version number displayed.

## Upgrade

To upgrade to the latest version:

```bash
avocado upgrade
```

To upgrade to a specific version:

```bash
avocado upgrade --version <version>
```
