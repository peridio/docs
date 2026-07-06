---
title: Download & Install
sidebar_position: 1
description: 'Download Avocado Desktop for macOS and install the Avocado CLI - the two ways to get Avocado running on your machine.'
---

Avocado ships two pieces of software you install locally:

- **Avocado Desktop** - a native app that runs and manages Avocado on your own machine.
- **Avocado CLI** - the command-line tool for builds, automation, CI, and headless Linux.

Most people start with the desktop app. Reach for the CLI when you are scripting builds, running in CI, or working on a headless Linux host.

## Avocado Desktop

Avocado Desktop is available for macOS today. Windows and Linux are on the way.

### macOS

Avocado Desktop requires macOS 13.0 (Ventura) or later.

Download the latest release directly:

- [Download Avocado Desktop for macOS](https://repo.avocadolinux.org/releases/desktop/stable/Avocado-0.4.4.dmg)

Or install it with [Homebrew](https://brew.sh):

```bash
brew install --cask avocado-linux/tap/avocado-desktop
```

Once installed, the app updates itself in place, so you do not need to re-download it for new releases.

### Windows and Linux

Desktop builds for Windows and Linux are coming soon. Until then, use the Avocado CLI below - it already runs on both.

## Avocado CLI

On macOS or Linux, install the CLI with a single command:

```bash
curl -fsSL https://connect.peridio.com/install.sh | sh
```

The script detects your operating system and architecture and installs the matching prebuilt binary. To review it before running, open [connect.peridio.com/install.sh](https://connect.peridio.com/install.sh) in your browser.

For Windows, manual installation, the full platform and architecture matrix, and upgrade instructions, see the [Avocado CLI installation guide](/developer-reference/avocado-cli/installation).
