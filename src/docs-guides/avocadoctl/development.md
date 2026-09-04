---
title: Development
sidebar_position: 3
copy_markdown: true
description: 'Build and test a modified avocadoctl: which of its two on-device copies your change affects, and what that means for your rebuild.'
---

avocadoctl ships inside the Avocado base OS rather than as an extension, so changing it is not the same as iterating on your own application or on extension contents. This page covers what a change to avocadoctl costs to test.

Read [Modifying OS components](/developer-reference/modifying-os-components) first for the general rule. The short version: the CLI consumes RPMs from the feed and does not produce them, so getting *your* avocadoctl onto a device means rebuilding its recipe with BitBake.

## avocadoctl ships twice

avocadoctl is installed into two sysroots, so a device carries two copies:

| Copy | Pulled in by | Runs |
| ---- | ------------ | ----- |
| rootfs | `packagegroup-avocado-rootfs` | `avocadoctl.service` and `avocadoctl.socket`, plus every CLI invocation |
| initramfs | `packagegroup-avocado-initramfs` | `avocado-extension-initrd.service` only |

They are separate binaries built from the same recipe. Which one your change affects decides how expensive it is to test.

### What the initramfs copy does

Exactly one thing: merge extensions during early boot. Its unit runs `avocadoctl refresh` and is gated on `ConditionPathExists=/etc/initrd-release`, so it is inert once the system has switched root.

### What the rootfs copy does

Everything else, including the entire OS update path. The update code is reached only from the CLI command handlers, the Varlink service handlers, and the update orchestrator, all of which run after boot.

:::tip

A change to update, runtime, or extension-management behaviour affects only the rootfs copy. You do not need a new initramfs for it, which means no boot-image rebuild and no reprovisioning.

:::

A change to early-boot merge behaviour is the expensive case: the initramfs is part of the boot image, so testing it requires rebuilding that image and reprovisioning the device.

## Rebuilding

Build the single recipe rather than a full image:

```bash
bitbake avocadoctl
```

This produces an updated RPM in the build's `tmp/deploy/rpm/<arch>/` directory. Because the recipe pins `SRCREV`, point it at your commit before building, otherwise you rebuild the same published source.

## Iterating on extensions instead

If what you are actually iterating on is *extension contents* rather than avocadoctl itself, you do not need any of the above. avocadoctl supports mounting extensions live over NFS from a development host, so you can change an extension and re-merge it without rebuilding or reflashing. See [Hardware-in-the-loop](/developer-reference/hardware-in-the-loop) and the [org.avocado.Hitl interface](/developer-reference/avocadoctl/varlink-api/org-avocado-hitl).

That path covers extensions only. It does not apply to avocadoctl, which is not an extension.

## What's next

- [Modifying OS components](/developer-reference/modifying-os-components) for the general CLI-versus-Yocto boundary
- [Commands](/developer-reference/avocadoctl/commands) for the full CLI surface
- [Varlink API](/developer-reference/avocadoctl/varlink-api/overview) for the IPC interfaces
