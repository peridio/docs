---
title: Installation
sidebar_position: 2
description: 'Install Peridio CLI for device and fleet management - download, extract, and verify installation with upgrade instructions.'
---

1. Download a Peridio CLI tarball from the [releases page](https://github.com/peridio/peridio-cli/releases).
2. Extract the tarball using the following command:
   ```bash
   tar -xzvf <tarball>
   ```
3. Move the extracted binary to a directory in your PATH:
   ```bash
   mv peridio /usr/local/bin/
   ```
4. Verify the installation:
   ```bash
   peridio --version
   ```
   If successful, you should see the version number displayed.

## Upgrade

To upgrade to the latest version:

```bash
peridio upgrade
```

To upgrade to a specific version:

```bash
peridio upgrade --version <version>
```
