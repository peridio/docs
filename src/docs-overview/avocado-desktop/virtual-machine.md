---
title: 'Build VM'
description: 'The Linux VM Avocado Desktop builds in on macOS: starting, hibernating and sizing it, live metrics, and the Docker build path on Linux.'
---

# Build VM

On macOS, Avocado Desktop builds inside a small Linux VM, which runs on QEMU. Every `avocado install`, `build` and `provision` runs in SDK containers inside that VM. The VM also holds USB devices passed through for flashing.

On Linux, Desktop builds in containers on the host's Docker instead, and you don't need the VM.

## The Overview pane

**Overview** shows the VM and what's running in it:

- **Virtual machine**: its state, process ID and start time, with controls.
- **Live metrics**: CPU, memory and disk use of `/var` while the VM runs.
- **Guest**: details of the running VM.
- **SDK Containers**: the build containers running now.

The bottom of the sidebar also shows the VM's state, with the same controls. So do the menu bar icon's **Start VM**, **Stop VM**, **Restart VM**, **Wake VM** and **Pause VM (hibernate)**.

## Controls

| Control       | What it does                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------- |
| **Start**     | Boots the VM.                                                                                |
| **Hibernate** | Pauses the VM to save power. It keeps its state, and wakes on its own when a build needs it. |
| **Wake**      | Resumes a hibernated VM now.                                                                 |
| **Restart**   | Reboots the VM.                                                                              |
| **Terminal**  | Opens a terminal with an SSH session into the VM.                                            |
| **Stop**      | Shuts the VM down.                                                                           |

**Settings → Virtual machine → Hibernate after** sets how many idle seconds pass before the VM hibernates on its own. `0` turns automatic hibernation off.

## Size the VM

**Settings → Virtual machine** sets the VM's **CPU cores**, **Memory** and **Disk**. The sliders turn amber past half of your computer's resources and red past three quarters. Leave your computer enough to run everything else.

- **Save & restart VM** applies a new CPU or memory size.
- **Grow disk & restart VM** enlarges the disk. Grow it when builds run out of space. The disk holds every project's SDK, packages and build output.

The disk can only grow, never shrink. To start over with an empty disk, use **Reset /var…** under **Danger Zone**. It deletes everything stored in the VM, and you type `RESET` to confirm.

## Related

- [Settings](/avocado-desktop/settings#virtual-machine)
- [USB devices](/avocado-desktop/usb-devices)
