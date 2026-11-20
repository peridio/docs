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

You don't need Docker Desktop or the `docker` command either. The bundled CLI, 1.2.0 or later, talks to the build engine inside the VM itself. If Desktop uses an older CLI, for example an older copy on your `PATH`, Install and Build stop and ask you to update the CLI or install the Docker CLI with `brew install docker`. The [first-run](/avocado-desktop/first-run) CLI check warns about an older CLI on your `PATH`.

## Linux

Avocado Desktop builds in containers on the host's Docker Engine, so install Docker Engine from your distribution's packages first. Make sure the daemon is running and your user can reach it, for example by adding it to the `docker` group. The build VM is optional on Linux.

The bundled Avocado CLI, 1.2.0 or later, talks to the Docker daemon itself, so the `docker` command isn't required. With an older CLI, Install and Build ask you to install the Docker CLI as well.

Packages:

- **Debian and Ubuntu:** `.deb`, for x86_64 and arm64. The arm64 package is tested on a Raspberry Pi 5 running Raspberry Pi OS.
- **Fedora:** `.rpm`, for x86_64.
- **Arch:** a pacman package, for x86_64, installed with `pacman -U`.
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
