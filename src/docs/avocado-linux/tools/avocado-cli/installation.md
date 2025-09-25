---
title: Installation
sidebar_position: 2
description: 'Install Avocado CLI for Avocado Linux development - download, extract, and verify installation with upgrade instructions.'
---

1. Download an Avocado CLI tarball from the [releases page](https://github.com/avocado-linux/avocado-cli/releases).
2. Extract the tarball using the following command:
   ```bash
   tar -xzvf archive.tar.gz
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
