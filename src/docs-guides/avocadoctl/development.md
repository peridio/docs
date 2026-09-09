---
title: Development
sidebar_position: 3
copy_markdown: true
description: 'Build and test a modified avocadoctl: which of its two on-device copies your change affects, and what that means for your rebuild.'
---

avocadoctl ships in the Avocado base OS as an RPM, installed into the rootfs and initramfs sysroots. It is the tool that manages systemd-sysext and confext extensions, but it is not delivered as one itself, so changing it is not the same as iterating on your own application or on extension contents. This page covers what a change to avocadoctl costs to test.

Read [Modifying OS components](/developer-reference/modifying-os-components) first for the general rule. The short version: the Avocado CLI consumes RPMs from the feed and does not produce them, so producing a _shippable_ avocadoctl means rebuilding its recipe with BitBake.

Producing an RPM and testing a binary are separate questions, though, and only the first one needs BitBake. If you just want to see your change run on a device, see [Testing a binary without an RPM](#testing-a-binary-without-an-rpm) below.

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

## Testing a binary without an RPM

The base OS is built with `read-only-rootfs`, so it is reasonable to assume `/usr/bin` cannot be written and that an RPM is the only way in. That holds for the rootfs itself, but not for a running device.

Once extensions are merged, `/usr` is no longer the rootfs directly: it is an overlay. avocadoctl merges with `systemd-sysext merge --mutable=ephemeral`, and `ephemeral` gives that overlay a writable tmpfs upper layer. Writes to `/usr` land there and shadow the read-only base rather than failing, so copying a binary over `/usr/bin/avocadoctl` works:

```bash
scp target/<triple>/release/avocadoctl root@<device-ip>:/usr/bin/avocadoctl
ssh root@<device-ip> systemctl restart avocadoctl.socket avocadoctl.service
```

The restart matters because the running daemon holds the previous binary's inode; replacing the file on disk does not change the process already serving Varlink.

:::caution

The change is ephemeral in the precise sense: it lives in a tmpfs upper layer, so a reboot discards it, and so does any `avocadoctl refresh`. Refresh is unmerge-then-merge, and every runtime mutation calls it, which means an unrelated `runtime` operation can silently put the packaged binary back while you are still testing. If a behaviour you were just observing disappears, check whether something refreshed.

:::

This is a development loop, not a delivery mechanism. Nothing about it survives a reboot, and it leaves no record on the device of what is actually running, so a change that is going anywhere near a fleet still needs the RPM.

The mutability mode is configurable, and `ephemeral` is avocadoctl's own default rather than systemd's. An image that sets `ext.sysext_mutable = "no"` in `/etc/avocado/avocadoctl.conf` gets a read-only merged `/usr`, where the copy above fails with `EROFS` instead. If that is your image, the RPM route is the only one.

## Iterating on extensions instead

If what you are actually iterating on is _extension contents_ rather than avocadoctl itself, you do not need any of the above. avocadoctl supports mounting extensions live over NFS from a development host, so you can change an extension and re-merge it without rebuilding or reflashing. See [Hardware-in-the-loop](/developer-reference/hardware-in-the-loop) and the [org.avocado.Hitl interface](/developer-reference/avocadoctl/varlink-api/org-avocado-hitl).

That path covers extensions only. avocadoctl is not an extension, so HITL does not reach it; the overlay write above is its equivalent inner loop.

## What's next

- [Modifying OS components](/developer-reference/modifying-os-components) for the general Avocado-CLI-versus-Yocto boundary
- [Commands](/developer-reference/avocadoctl/commands) for the full `avocadoctl` command surface
- [Varlink API](/developer-reference/avocadoctl/varlink-api/overview) for the IPC interfaces
