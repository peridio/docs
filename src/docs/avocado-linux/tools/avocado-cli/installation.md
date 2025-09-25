---
title: Installation
sidebar_position: 2
description: 'Install Peridio CLI for Avocado Linux development - download, extract, and verify installation with upgrade instructions.'
---

1. Download a Peridio CLI tarball from the [releases page](https://github.com/peridio/peridio-cli/releases).
2. Extract the tarball using the following command:
   ```bash
   tar -xzvf archive.tar.gz
   ```
3. Move the extracted binary to a directory in your PATH:
   ```bash
   sudo mv peridio /usr/local/bin/
   ```
4. Verify the installation:
   ```bash
   peridio --version
   ```
   If successful, you should see the version number displayed.

### Upgrade

To upgrade the CLI, run:

```bash
sudo peridio upgrade
```

:::tip privileged paths
Sudo is only required if necessary to write the binary back to its current location.
:::
