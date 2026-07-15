---
title: Linux Auto-Mounting
sidebar_position: 6
description: 'Disable Linux desktop auto-mounting before provisioning Avocado OS, so it does not interfere with writing removable media.'
---

# Linux Auto-Mounting

Some Linux desktop environments — such as GNOME on Ubuntu or Fedora Workstation — automatically mount mass storage devices as soon as they are attached. When you provision Avocado OS to removable media (an SD card, USB drive, or an NVMe/eMMC device exposed over USB), this auto-mount behavior can lock or access the device while Avocado is trying to write to it, and can interfere with Avocado's ability to finalize provisioning.

:::note When this applies
This only affects **Linux hosts** running a desktop environment that auto-mounts media. It does not apply when provisioning from macOS with Avocado Desktop, and it does not apply to headless Linux hosts that don't auto-mount.
:::

## Disable auto-mounting

Before provisioning, disable auto-mounting. The following commands are for Ubuntu (GNOME desktop); the same commands apply to other GNOME-based distributions such as Fedora Workstation:

```bash
gsettings set org.gnome.desktop.media-handling automount false
gsettings set org.gnome.desktop.media-handling automount-open false
```

Provision as usual once auto-mounting is disabled.

## Re-enable auto-mounting

If you want to restore the default behavior after provisioning:

```bash
gsettings set org.gnome.desktop.media-handling automount true
gsettings set org.gnome.desktop.media-handling automount-open true
```
