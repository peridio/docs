---
title: 'Desktop: 1.0.0-rc.7'
description: 'Avocado Desktop 1.0.0-rc.7 release notes: native Linux support with installable packages, and a tabbed terminal.'
---

rc.7 is the Linux release. Avocado Desktop now runs natively on Linux, and every
release publishes installable Linux packages alongside the macOS disk image.

## Linux support

The app runs natively on Linux with direct USB passthrough, so provisioning real
hardware needs no VM. Releases publish three packages, all x86_64:

- **`.deb`** — Ubuntu and Debian.
- **`.rpm`** — the Fedora family.
- **A pacman-installable package** — Arch, installed with `pacman -U`.

Every build needs WebKitGTK 4.1, which ships on Ubuntu 22.04+, Debian 12+, and
current Fedora and Arch. Builds run on the host's Docker rather than in the
bundled VM that macOS uses, so Docker has to be installed. USB passthrough also
needs your distribution's usbip tools.

Two differences from macOS worth knowing before you install:

- **Updates** — the macOS app replaces itself in place; the Linux packages do
  not, so a new release is installed as a new package.
- **The Arch package links the Avocado CLI rather than bundling one** — install
  `avocado-cli` first. The `.deb` and `.rpm` carry the toolchain themselves.

Every artifact, with its size and publish date, is listed on
[Downloads](https://www.peridio.com/downloads#desktop).

## Tabbed terminal

UART, SSH, QEMU, and local shell sessions now open as tabs in a single pane
instead of replacing one another, so a serial console and a shell can stay open
side by side while a build runs.
