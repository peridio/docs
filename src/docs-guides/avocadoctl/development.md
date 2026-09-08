---
title: Development
sidebar_position: 3
copy_markdown: true
description: 'Build and test a modified avocadoctl: which of its two on-device copies your change affects, and what that means for your rebuild.'
---

avocadoctl ships inside the Avocado base OS rather than as an extension, so changing it is not the same as iterating on your own application or on extension contents. This page covers what a change to avocadoctl costs to test.

Read [Modifying OS components](/developer-reference/modifying-os-components) first for the general rule. The short version: the Avocado CLI consumes RPMs from the feed and does not produce them, so getting _your_ avocadoctl onto a device means rebuilding its recipe with BitBake.

## avocadoctl ships twice

avocadoctl is installed into two sysroots, so a device carries two copies:

| Copy      | Installed by            | Units enabled                                                                                               |
| --------- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| rootfs    | `avocado-pkg-rootfs`    | `avocadoctl.socket`, `avocadoctl.service`, `avocado-extension.service`, `avocado-ensure-extensions.service` |
| initramfs | `avocado-pkg-initramfs` | `avocadoctl.socket`, `avocado-extension-initrd.service`                                                     |

Those are the metapackages each sysroot installs by default, and the ones you list in `avocado.yaml` if you customize a sysroot's package set. See [Customizing the rootfs and initramfs](/developer-reference/customizing-rootfs-initramfs). In the Yocto layer each expands to a `packagegroup-avocado-*` packagegroup, which is where the dependency on `avocadoctl` is actually declared.

They are separate binaries built from the same recipe. Which one your change affects decides how expensive it is to test.

### What the initramfs copy does

The Varlink daemon is reachable in the initramfs, not only after switch-root. `avocadoctl.socket` is enabled there as well as in the system scope, so an `avocadoctl` invocation during early boot socket-activates `avocadoctl serve` the same way one after boot does. This is the "both the initramfs and system scopes" the [avocadoctl overview](/developer-reference/avocadoctl/overview) describes.

What is narrow in the initramfs is not what is reachable but what calls it. Exactly one unit does: `avocado-extension-initrd.service` runs `avocadoctl refresh` to merge extensions during early boot, and nothing else in the initramfs opens the socket. That unit is gated on `ConditionPathExists=/etc/initrd-release`, so it is inert once the system has switched root; its rootfs counterpart `avocado-extension.service` carries the complementary condition and covers the same job after switch-root.

### What the rootfs copy does

Everything else, including the entire OS update path. Both copies are built from the same source, so the update code is compiled into both; what differs is who calls it. It is reached from avocadoctl's own subcommand handlers, from the Varlink service handlers, and from the update orchestrator, and nothing in the initramfs invokes any of the three.

:::tip

A change to the update path, to runtime lifecycle, or to any extension operation other than the early-boot merge is only ever exercised after switch-root, so testing it needs the rootfs copy alone. You do not need a new initramfs for it, which means no boot-image rebuild and no reprovisioning.

:::

A change to early-boot merge behaviour is the expensive case: the initramfs is part of the boot image, so testing it requires rebuilding that image and reprovisioning the device.

## Rebuilding

Build the single recipe rather than a full image:

```bash
bitbake avocadoctl
```

This produces an updated RPM in the build's `tmp/deploy/rpm/<arch>/` directory. Because the recipe pins `SRCREV`, point it at your commit before building, otherwise you rebuild the same published source.

## Iterating on extensions instead

If what you are actually iterating on is _extension contents_ rather than avocadoctl itself, you do not need any of the above. avocadoctl supports mounting extensions live over NFS from a development host, so you can change an extension and re-merge it without rebuilding or reflashing. See [Hardware-in-the-loop](/developer-reference/hardware-in-the-loop) and the [org.avocado.Hitl interface](/developer-reference/avocadoctl/varlink-api/org-avocado-hitl).

That path covers extensions only. It does not apply to avocadoctl, which is not an extension.

## What's next

- [Modifying OS components](/developer-reference/modifying-os-components) for the general Avocado-CLI-versus-Yocto boundary
- [Commands](/developer-reference/avocadoctl/commands) for the full `avocadoctl` command surface
- [Varlink API](/developer-reference/avocadoctl/varlink-api/overview) for the IPC interfaces
