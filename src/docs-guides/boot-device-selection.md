---
sidebar_position: 1.5
title: 'Boot device selection'
copy_markdown: true
draft: true
description: 'Choose which storage device a board boots from. Provisioning decides where an image is written; firmware decides which disk boots, and on a board with two bootable disks those are separate choices.'
---

:::caution Jetson only, and newer than your image

NVIDIA Jetson (Tegra) is the only target this page covers, and `avocado-set-boot-device` ships in the `avocado-boot-device` package. An image built before that package existed does not have the tool at all, so `avocado-set-boot-device --list` returns a plain `command not found` rather than any message from the tool itself. Add `avocado-boot-device` under `rootfs.packages` (see below) and rebuild before running anything on this page.

Checked end to end on an Orin Nano carrying both an NVMe and a bootable SD card: the boot entries and device paths this page describes, `--list` classifying every entry on the board, `--dry-run` writing nothing, and `--once` writing `BootNext`, reading it back, being honoured by firmware on the next boot, and reverting on its own the boot after that.

:::

Provisioning decides **where an image is written**. Firmware decides **which disk boots**. On a board carrying only one bootable disk those are the same thing, and nobody notices the difference. On a board carrying two, they are separate choices, and only the first one is yours by default.

This bites in a specific, confusing way. You run:

```bash
avocado provision -r dev --profile tegraflash-nvme
```

It writes a complete, bootable NVMe and reports success. You reboot, and the board comes up on the SD card that was already in the slot. Nothing failed. The NVMe is fine. The firmware simply never chose it - a Jetson's UEFI creates a `UEFI SD Device` entry on its own and places it at the front of its boot order.

`avocado-set-boot-device` is how you make that choice. It moves no data. It tells the firmware which of the disks already present to prefer.

This guide covers:

- adding the tool to a runtime
- listing what the firmware can currently boot
- switching the boot device, permanently or for one boot
- what the tool refuses to do, and why

## Add it to the rootfs

The tool ships as the `avocado-boot-device` package. Name it under `rootfs.packages`:

```yaml title="avocado.yaml"
rootfs:
  packages:
    avocado-pkg-rootfs: '*'
    avocado-boot-device: '*'
```

`avocado-pkg-rootfs` is repeated deliberately. Naming this map replaces the default package set rather than adding to it, so dropping it gives you an image missing everything else - see [Customizing the rootfs and initramfs](/developer-reference/customizing-rootfs-initramfs).

`efibootmgr` and `efivar` arrive with it through the package's own dependencies; you do not name them.

Then build and provision as usual. The tool lands at `/usr/sbin/avocado-set-boot-device`.

:::caution Do not add it through your own extension's `packages:`

On avocado-cli 1.0.0-rc.4, naming a package under `packages:` in an extension **you declare in your own `avocado.yaml`** does not put it in the image. `avocado install` resolves the package, installs it, and reports success, and the built extension image still comes out empty - 4096 bytes, holding only its own `extension-release` marker - so the tool is absent at runtime. Reproduced with a `sysext`-only extension and with one combining `sysext` and `confext`.

This is narrower than it may sound, and the distinction matters if you are reading it to decide how to ship something else. An extension fetched as a package, the way a BSP extension is, installs its `packages:` correctly on the same CLI version - so the defect is in the inline path rather than in extensions generally. Tracked as [avocado-cli#283](https://github.com/avocado-linux/avocado-cli/issues/283).

An extension's `overlay:` is also unaffected: files you place there do reach the image.

:::

## See what the firmware can boot

Start here, always. The tool can only choose among entries the firmware has already created, so the first question is what those are:

```console
# avocado-set-boot-device --list
Current boot order, first entry wins:

  Boot0003* UEFI Samsung SSD 960 EVO 250GB S3ESNX0JA13241W 1  PciRoot(0x0)/.../NVMe(0x1,...)
  Boot0001* UEFI SD Device  VenHw(...)/SD(0)
  Boot0002* UEFI USB Device  VenHw(...)/USB(0,0)
  Boot0004* UEFI PXEv4 (MAC:4CBB47C8C25B)  MAC(...)/IPv4(0.0.0.0)
  Boot0000* Enter Setup  FvVol(...)/FvFile(...)

Recognised device classes on this board:
  nvme  0003
  sd    0001
  emmc  -
  usb   0002
```

The first block is the boot order as the firmware holds it, first entry winning. The second maps the device classes you can ask for onto the entries that match. A dash means no entry on this board refers to a device of that class - an Orin Nano has no eMMC, so `emmc` is empty there and always will be.

:::note Why the class is read off the device path, not the name

Look at the NVMe entry above: `UEFI Samsung SSD 960 EVO 250GB S3ESNX0JA13241W 1`. Vendor, model, capacity and serial, and the word NVMe nowhere in it. Boot entry descriptions are vendor text and cannot be relied on.

What the tool actually matches is the EFI device path. That entry carries a Messaging/NVMe-Namespace node, which is why it maps to `nvme`; the SD entry carries a Messaging/SD node. Both were read off an Orin Nano's firmware. The description is consulted only as a fallback, for firmware that omits the node.

:::

## Switch the boot device

Pass a device class - `nvme`, `sd`, `emmc` or `usb`:

```console
# avocado-set-boot-device nvme
Boot device: nvme (entry 0003)
  before: 0001,0003,0000,0002
  after:  0003,0001,0000,0002
BootOrder=0003,0001,0000,0002
```

The selected entry moves to the front and everything else keeps its existing order. The other entries are deliberately not dropped: if the disk you chose later fails to boot, the firmware still has somewhere to fall back to.

The change is permanent until something rewrites `BootOrder`.

## Try it for one boot first

`--once` writes `BootNext` instead, which the firmware consumes on the next boot and then forgets:

```console
# avocado-set-boot-device --once nvme
Next boot only: 0003 (nvme)
BootNext=0003
```

Prefer this while you are still finding out whether a disk boots at all. The asymmetry is worth internalising: a permanent boot order aimed at a disk that turns out not to boot needs somebody physically at the board with a serial console, whereas a `BootNext` that fails is undone by the power cycle that follows it.

`--dry-run` prints the order that would be written and changes nothing.

## What it refuses to do

Three refusals are deliberate, and each one is a case where guessing would be worse than stopping.

**It will not invent a boot entry.** The firmware creates an entry for a disk it has actually seen and booted. A disk you provisioned but have never booted from may have no entry yet, and the tool cannot manufacture one:

```console
# avocado-set-boot-device emmc
avocado-set-boot-device: no UEFI boot entry refers to a emmc device.

The firmware only creates an entry for a disk it can see and boot.
If the disk was provisioned but never booted, reboot once so the
firmware enumerates it, then run this again. Current entries:
...
```

Reboot once so the firmware enumerates the disk, then run it again.

**It will not pick between ambiguous matches silently.** If two entries match the class you asked for, it says so and names both before using the first.

**It will not report a write it cannot confirm.** Both paths read the variable back after writing and fail if it does not hold the expected value. efivarfs will accept a write that the firmware then discards, and a boot selection that silently did not take is the precise failure this tool exists to prevent.

## Other messages you may see

| Message                                                | What it means                                                                                                                                                                                        |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Already first in the boot order; nothing to do.`      | The device you asked for is already the firmware's first choice. Nothing was written.                                                                                                                |
| `BootOrder is unset; refusing to invent one`           | The firmware has no boot order at all. Writing one from scratch would be guessing at entries the board may not boot, so the tool stops. Use `--once` instead, which does not need an existing order. |
| `efivarfs is not mounted at /sys/firmware/efi/efivars` | This system did not boot via UEFI, so there is no boot order to change.                                                                                                                              |
| `efibootmgr is not installed`                          | `avocado-boot-device` is installed - that's what printed this message - but `efibootmgr` did not land with it. Rebuild with the package declared under `rootfs.packages`, not an extension.          |
| `unknown device class '<x>'`                           | Only `nvme`, `sd`, `emmc` and `usb` are recognised. `--help` lists them.                                                                                                                             |

The tool writes UEFI variables, so it needs root.

## The other half: where the rootfs comes from

Choosing the boot device settles which **kernel** the firmware loads. Which **rootfs** that kernel then mounts is a separate decision, and both have to agree or a board can run one disk's kernel against another disk's rootfs.

Avocado resolves this by writing the rootfs PARTUUID into the kernel command line at provision time, so the rootfs is a property of the disk that was provisioned rather than of which disk the kernel happened to enumerate first.

On an image built before that, the initrd locates its rootfs by partition label instead. A board with two provisioned disks carries a partition labelled `APP` on each, so it takes whichever the kernel enumerated first - and on a Jetson that is the SD card, because the SD controller is ready roughly two seconds before PCIe enumeration finishes. Reordering the boot order alone will not fix that: you get the kernel you asked for and the rootfs of whichever disk won the race.

This is not hypothetical. On an Orin Nano with both an SD card and an NVMe provisioned, and the boot order already pointing at the NVMe, the firmware reported `BootCurrent: 0003` - the NVMe entry - while the running system reported:

```console
# findmnt -no SOURCE /
/dev/mmcblk0p1
```

The kernel came from the NVMe and the rootfs came from the SD card. Nothing logged a warning, and the only outward sign was the hostname belonging to the wrong image.

So if you are switching boot devices on a board with more than one provisioned disk, check `findmnt -no SOURCE /` after the reboot. The boot order tells you what the firmware chose; only that tells you what you are actually running.

## Related

- [Provisioning](/developer-reference/provisioning) - how images get written to hardware in the first place
- [Sideloading](/developer-reference/sideloading) - getting artifacts onto a running board
