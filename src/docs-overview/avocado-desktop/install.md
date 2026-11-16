---
title: 'Install and update'
description: 'Install Avocado Desktop on macOS or Linux, what each platform needs, and how the app, the Avocado CLI and the build VM stay up to date.'
---

# Install and update

Avocado Desktop runs on macOS and Linux. Every build is listed on [Downloads](https://www.peridio.com/downloads#desktop).

## macOS

Requires macOS 13 (Ventura) or later on Apple Silicon.

Download the disk image and drag **Avocado** to Applications, or install it with Homebrew:

```bash
brew install --cask avocado-linux/tap/avocado-desktop
```

Avocado Desktop builds inside a small Linux VM, which runs on QEMU. QEMU doesn't come with the app; the first-run wizard checks for it and shows the command if it's missing:

```bash
brew install qemu
```

The app includes its own Avocado CLI, so you don't need to install one.

## Linux

Avocado Desktop builds in containers on the host's Docker, so install Docker first. The build VM is optional on Linux.

Packages:

- **Debian and Ubuntu:** `.deb`, for x86_64 and arm64. The arm64 package is tested on a Raspberry Pi 5 running Raspberry Pi OS.
- **Fedora:** `.rpm`, for x86_64 and arm64.
- **Any distribution:** AppImage, for x86_64.

Every package needs WebKitGTK 4.1. Ubuntu 22.04 and later, Debian 12 and later, and current Fedora ship it.

USB passthrough on Linux needs `pkexec` and your distribution's `usbip` tools. Installing the `.deb` with `apt` installs both, unless you add `--no-install-recommends`. On Ubuntu, the `usbip` tools come in `linux-tools-$(uname -r)`. Run `usbip version` to check they work for your running kernel.

## Updates

Avocado Desktop checks for updates once a day. **Settings → Updates** shows the state of each component and has a **Check now** button. **Check for updates** in the account menu does the same.

| Component       | How it updates                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Avocado Desktop | On macOS, the app installs the update and relaunches. On Linux, download the new package and upgrade it through your package manager.          |
| Avocado CLI     | Updated from **Settings → Updates**. If you installed the CLI with Homebrew, **Show command** gives the `brew upgrade` command to run instead. |
| Avocado VM      | Updated from **Settings → Updates**, on macOS only.                                                                                            |

## Next

- [First run](/avocado-desktop/first-run)
