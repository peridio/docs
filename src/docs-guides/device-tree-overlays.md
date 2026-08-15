---
sidebar_position: 6.5
title: 'Device-tree overlays'
copy_markdown: true
draft: true
description: 'Declare a device-tree overlay in an extension and let avocado build compile it in the SDK and deliver it to the boot medium - no manual dtc, no boot-partition surgery, no BSP fork.'
---

:::danger draft - not yet reproducible by a reader

This guide documents behavior that is **not in a released Avocado CLI or SDK image**. Every command below has been run, but only against from-source builds of unmerged branches. Following it with released artifacts will fail at `avocado install`.

See [Release status](#release-status) at the bottom for the exact list of what must merge and publish before this page can drop `draft: true`.

:::

A device-tree overlay is a small patch to your board's hardware description: enable a SPI bus, wire up a GPIO, add a sensor the base device tree does not know about. Traditionally that means compiling a `.dtbo` by hand with `dtc` and finding somewhere on the boot partition to put it - a per-board manual step that has to be repeated on every image.

Avocado makes the overlay a declared part of the image. An extension names the overlays it ships, and `avocado build` compiles each one in the SDK and hands it to a per-board delivery step that knows where the blob belongs on that board's boot medium.

This guide covers:

- Declaring overlays in `avocado.yaml`
- Writing an overlay source the compiler will accept
- Which targets are supported, and what each one does with the blob
- Confirming on a booted board that the overlay actually applied
- Per-target update consequences (one target needs a reflash)

## Target support

The declaration is portable; the delivery mechanism is not. Each BSP layer installs its own delivery hook, so what happens to the compiled blob differs by board - including how you ship a _change_ to an overlay later.

| Target                                      | Delivery mechanism                                             | Where the blob lands                               | Updating an overlay                                                      |
| ------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| `raspberrypi5`, `raspberrypi4`              | Loose `.dtbo` on the boot FAT, selected by a `dtoverlay=` line | `overlays/<name>.dtbo` plus `avocado-overlays.txt` | Ordinary image update                                                    |
| `jetson-orin-nano-devkit` (and other Tegra) | Merged into the base DTB at build time with `fdtoverlay`       | Replaces the flashed kernel DTB                    | **Reflash** - see [Jetson](#jetson-tegra)                                |
| `qemuarm64`                                 | Loose `.dtbo` on the boot FAT                                  | `overlays/<name>.dtbo`                             | Delivered but **not applied at boot** yet                                |
| `qemux86-64`                                | None                                                           | -                                                  | Not applicable - x86 boots via ACPI and has no device tree               |
| Any other target                            | None                                                           | -                                                  | Build fails, by design - see [Unsupported targets](#unsupported-targets) |

:::info the declaration is the portable part
The same `device_tree_overlays` block and the same `.dtso` move between a Pi and a Jetson unchanged. Only the hook underneath differs. That is the point of the hook being per-BSP.
:::

## Declaring an overlay

Overlays are declared on the **extension** that ships them, not on the runtime and not on a package:

```yaml
runtimes:
  dev:
    target: raspberrypi5
    extensions:
      - my-board
    packages:
      avocado-runtime: '*' # required - see the note below

extensions:
  my-board:
    types:
      - sysext
    device_tree_overlays:
      - name: hello-overlay
        src: overlays/hello-overlay.dtso
```

| Key      | Required | Meaning                                                                                                                                                                                                                                                                                                      |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`   | yes      | Authoritative. It is the output basename (`overlays/<name>.dtbo`), the `dtoverlay=` argument on Raspberry Pi, and the u-boot overlay entry. Must be a safe basename: no `/`, no whitespace, not `.` or `..`. Names must be unique across the whole runtime - a duplicate is a hard error, not last-one-wins. |
| `src`    | yes      | Path to the overlay source, relative to the project root.                                                                                                                                                                                                                                                    |
| `params` | no       | A mapping of per-overlay parameters. **Raspberry Pi only** - see [Parameters](#parameters-raspberry-pi-only).                                                                                                                                                                                                |

:::warning declare `avocado-runtime`
The runtime must pull `avocado-runtime`, which is what installs `avocado-img-bootfiles` - the package shipping `u-boot.bin` and the `bootfiles/*` entries the bundler needs to build a boot image. A project that omits it fails late, at bundling, with `File 'u-boot.bin' not found in any input directory for FAT image`, which reads like a broken BSP rather than a missing declaration. It cost us two weeks of chasing a product bug that was a project-config omission.
:::

The feature is inert unless an overlay is declared. A project with no `device_tree_overlays` anywhere builds exactly as before.

## Writing the overlay source

The source must be a real overlay, not a full device tree. Two rules the compiler enforces:

**It must declare `/plugin/;`.** Without it, `dtc` happily compiles a complete device tree instead and you get a blob nothing will apply. The build rejects this up front.

**It must materialize at least one fragment** - a top-level node with an `__overlay__` child. Both the `&label { }` shorthand and the explicit `fragment@N` form produce this.

A path-targeted overlay, which works on any board:

```dts
/dts-v1/;
/plugin/;

/ {
    fragment@0 {
        target-path = "/";
        __overlay__ {
            hello-overlay {
                compatible = "acme,widget";
                status = "okay";
            };
        };
    };
};
```

A label-targeted overlay, which is what you usually want on real hardware:

```dts
/dts-v1/;
/plugin/;

&spi0 {
    status = "okay";

    sensor@0 {
        compatible = "acme,sensor";
        reg = <0>;
        spi-max-frequency = <12000000>;
    };
};
```

:::caution label targets need `__symbols__` in the base tree
`&spi0` resolves through the base device tree's `__symbols__` node, which only exists if the BSP compiled its DTB with `dtc -@`. Most vendor BSPs do; QEMU's `virt` machine does not. If the label cannot resolve, a Raspberry Pi silently boots without the overlay, while a Jetson **fails the build** - `fdtoverlay` errors and the hook treats that as fatal rather than flashing an unmerged tree. Use `target-path` when you are unsure.
:::

### Using `dt-bindings` macros

If your source `#include`s kernel headers, the wrapper preprocesses it with `cpp` exactly as the kernel build does (`-nostdinc -undef -x assembler-with-cpp -D__DTS__`) against the kernel's `dt-bindings` tree:

```dts
#include <dt-bindings/gpio/gpio.h>

/dts-v1/;
/plugin/;

&gpio {
    my-pin {
        gpios = <&gpio 17 GPIO_ACTIVE_HIGH>;
    };
};
```

This requires `kernel-devsrc` in the target sysroot. It is installed automatically when the SDK is provisioned for a project declaring overlays. An overlay with no `#include` skips the preprocessor entirely and needs no kernel sources.

A `/include/ "shared.dtsi"` (the native DTS include, not a cpp one) resolves relative to your source file and does **not** pull in the preprocessor.

## Building

```bash
avocado install
avocado build --target raspberrypi5
```

The build logs three ordered markers. All three must appear:

```text
avocado-dtc-overlay: built .../device-tree-overlays/hello-overlay.dtbo from hello-overlay
device-tree-overlay-deliver: delivered 1 overlay(s) to rootdisk/boot for avocado-raspberrypi5: hello-overlay
[SUCCESS] OS bundle created: .../os-bundle.aos
```

To inspect what was produced, `avocado save` exports the build state; the archive holds both the compiled `device-tree-overlays/<name>.dtbo` and the finalized `os-bundle.aos`.

### On a brand-new SDK

Until SDK auto-provisioning lands (tracked as KOS-68), a clean SDK needs the image-build toolchain declared explicitly:

```yaml
sdk:
  packages:
    nativesdk-erofs-utils: '*'
    nativesdk-btrfs-tools: '*'
    nativesdk-zstd: '*'
    nativesdk-stone: '*'
    avocado-sdk-target: '*'
```

## Confirming the overlay applied

**A green build is not evidence that an overlay is applied.** This is the single most important thing on this page. Every build-path marker above can pass - the source compiles, the right blob is delivered, the bundle finalizes, the flash reports success - while the running kernel uses a device tree your overlay never touched. That exact failure happened on Jetson and went undetected for two full build rounds.

The only evidence that counts is the tree the kernel is actually running. On the booted board:

```console
# ls /proc/device-tree/
# tr -d '\0' < /proc/device-tree/hello-overlay/compatible
acme,widget
```

`/proc/device-tree` is the live tree after every stage the bootloader applied, so a node present there is a node in effect.

### Run the negative control

One positive reading is not enough on its own: a node that was in the base tree all along looks identical to one an overlay added. Build the same project a second time with the `device_tree_overlays` block removed and nothing else changed, boot it on the same board, and confirm the node is **absent**:

```console
# tr -d '\0' < /proc/device-tree/hello-overlay/compatible
sh: can't open /proc/device-tree/hello-overlay/compatible: no such file
```

With both halves, the declaration is the only variable that can explain the difference. Do this once per platform you ship on - the delivery mechanism differs per board, so a pass on one proves nothing about another.

## Per-target details

### Raspberry Pi

The hook writes the `.dtbo` to `overlays/<name>.dtbo` on the boot FAT and emits an `avocado-overlays.txt` alongside it holding one `dtoverlay=<name>` line per overlay. The stock `config.txt` carries a static `include avocado-overlays.txt`, so the firmware picks these up at boot.

`config.txt` itself is never rewritten. That keeps your own `config.txt` overrides and the generated overlay list from fighting over the same file.

### Jetson (Tegra)

Tegra has nowhere to put a loose `.dtbo`. The flashed partition set has no DTBO partition, the ESP carries only the bootloader, and the overlay lists that do exist in the Tegra flash variables are read by the classic `flash.sh` path - not by the `initrd-flash` flow Avocado uses, which consumes binaries already signed at build time. Anything written to those lists is inert.

So the hook merges the declared overlays into the board's base DTB at build time with `fdtoverlay` and publishes the merged tree as the stone manifest's `storage_devices.rootdisk.images.dtb`. That merged DTB is what gets flashed.

Two consequences:

**Changing an overlay requires a reflash, not an image update.** The overlay is baked into a signed DTB living in a flash partition, so it only moves through the provisioning path. This is the one place the platforms genuinely diverge for a user, and it belongs in your own deployment planning.

**Declaration order is load-bearing.** `fdtoverlay` applies overlays in the order declared, so an overlay targeting a node that an earlier overlay created must come after it.

The base DTB is selected by the `DTBFILE` the BSP records, because a real Tegra BSP ships one base DTB per module SKU - five on an Orin Nano dev kit. You do not choose it; the board's own flash configuration does.

### QEMU

`qemuarm64` compiles and delivers the overlay to the boot FAT, but u-boot does not yet apply it at boot: the shipped `qemu_arm64_defconfig` does not set `CONFIG_OF_LIBFDT_OVERLAY`, so its u-boot carries every `fdt` subcommand except the one that applies an overlay. Wiring that up is tracked in meta-avocado#273. Until it merges, treat qemuarm64 as delivery-only.

`qemux86-64` has no device tree at all - x86 boots via ACPI - so no hook is installed and declaring an overlay there fails the build.

## Parameters (Raspberry Pi only)

`params` renders into the `dtoverlay=` line as comma-separated `key=value` pairs:

```yaml
device_tree_overlays:
  - name: my-spi
    src: overlays/my-spi.dtso
    params:
      speed: '12000000'
      cs: '0'
```

produces `dtoverlay=my-spi,cs=0,speed=12000000` (keys are sorted, so the output is stable across builds).

:::warning `params` is silently ignored off Raspberry Pi
Only the Raspberry Pi hook consumes `params` - it maps onto the Pi firmware's own overlay-parameter mechanism, which has no equivalent elsewhere. The Jetson and QEMU hooks accept a declaration carrying `params` and deliver the overlay without them, with no warning. On those targets, encode the values in the `.dtso` itself.
:::

## Unsupported targets

Declaring an overlay on a target whose BSP ships no delivery hook is a **hard error**, not a silent skip:

```text
[ERROR] device-tree overlays are declared but this target provides no delivery hook.
        Expected an executable at .../usr/libexec/avocado/device-tree-overlay-deliver
```

The same applies one level deeper: if the hook runs but does not claim an overlay, the build fails naming it. A declared overlay either reaches the boot medium or fails the build - it never quietly disappears into an image that looks fine.

## Troubleshooting

| Symptom                                                              | Cause                                                                    | Fix                                                                                                      |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `source is not a device-tree overlay (missing '/plugin/;')`          | Source is a full device tree                                             | Add `/plugin/;` after `/dts-v1/;`                                                                        |
| `device-tree overlay name '<n>' is not a valid basename`             | `name` has a `/`, whitespace, or is `.`/`..`                             | Use a plain basename; it becomes a filename and a boot-loader argument                                   |
| `device-tree overlay name '<n>' is declared by both '<a>' and '<b>'` | Two extensions on one runtime used the same name                         | Rename one; names are runtime-global                                                                     |
| `this target provides no delivery hook`                              | Target's BSP has no hook (see the support matrix)                        | Remove the declaration for that target, or add a hook to the BSP layer                                   |
| `device-tree overlays staged but not delivered by the BSP hook`      | Hook ran but did not claim the overlay                                   | A BSP bug - report it with the build log; the build correctly refused to ship a silently-dropped overlay |
| `no dt-bindings under <dir>`                                         | Source `#include`s kernel headers, `kernel-devsrc` missing or incomplete | Confirm the SDK was provisioned for a project declaring overlays; a no-`#include` overlay needs neither  |
| `fdtoverlay failed to merge` (Jetson)                                | Overlay targets a label or path absent from the base DTB                 | Check the target resolves in that board's base tree; prefer `target-path` when unsure                    |
| `File 'u-boot.bin' not found in any input directory for FAT image`   | Runtime does not declare `avocado-runtime`                               | Add `packages: avocado-runtime: '*'` to the runtime                                                      |
| Build fully green, node absent from `/proc/device-tree`              | Overlay was delivered but not applied at boot                            | On qemuarm64 this is expected (#273). Elsewhere, run the negative control and report it                  |

## Release status

This page is `draft: true` because the feature is not reachable from released artifacts. Everything below must land before it publishes.

### Pull requests

| PR                                                             | Repo         | Status                            | What it provides                                                      | Required for                                     |
| -------------------------------------------------------------- | ------------ | --------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| [#28](https://github.com/avocado-linux/stone/pull/28)          | stone        | **Merged** 2026-08-12             | `files_append` FAT primitive                                          | All targets                                      |
| [#245](https://github.com/avocado-linux/meta-avocado/pull/245) | meta-avocado | **Merged** 2026-08-12 (`563d462`) | SDK compile wrapper + RPi and QEMU delivery hooks                     | All targets                                      |
| [#183](https://github.com/avocado-linux/avocado-cli/pull/183)  | avocado-cli  | Open, **draft**                   | The `device_tree_overlays` config surface and build orchestration     | All targets                                      |
| [#292](https://github.com/avocado-linux/meta-avocado/pull/292) | meta-avocado | Open, ready                       | Jetson delivery hook (`fdtoverlay` merge)                             | Jetson                                           |
| [#293](https://github.com/avocado-linux/meta-avocado/pull/293) | meta-avocado | Open, ready                       | Stages the Tegra BSP into the SDK stone dir                           | Jetson - **#292 does not function without it**   |
| [#291](https://github.com/avocado-linux/meta-avocado/pull/291) | meta-avocado | Open, ready                       | Makes four silent Jetson provisioning failures report their own cause | Jetson walkthrough being followable              |
| [#273](https://github.com/avocado-linux/meta-avocado/pull/273) | meta-avocado | Open, **draft**                   | Applies delivered overlays at boot on qemuarm64                       | qemuarm64 only - **not** a blocker for this page |

Merge order is constrained: #28 before #245 (SRCREV re-pin), and #293 before or with #292.

### Beyond the PRs

| #   | Item                                                                                                                                 | Why it blocks                                                                                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Publish the SDK image `avocadolinux/sdk:2024-edge` carrying `nativesdk-avocado-dtc-overlay` and the `files_append` `nativesdk-stone` | `avocado install` cannot resolve the overlay compiler without it                                                                                                                                |
| 2   | Publish the `2024/edge` feed carrying `avocado-dtc-overlay-deliver`                                                                  | The delivery hook is a target package; without it the build hard-errors on a missing hook                                                                                                       |
| 3   | Cut an avocado-cli release and name it in this guide                                                                                 | The released `1.0.0-rc.1` does **not** carry the overlay work, despite the from-source build reporting the same version                                                                         |
| 4   | Resolve KOS-68, or keep the [brand-new SDK](#on-a-brand-new-sdk) block                                                               | A clean SDK cannot finalize a runtime image without it                                                                                                                                          |
| 5   | Raspberry Pi 5 paired positive/negative hardware run                                                                                 | The Pi path is proven only at build level; per [Confirming the overlay applied](#confirming-the-overlay-applied), that is not evidence                                                          |
| 6   | Fix container-mode provisioning on Jetson (part of avocado-cli#183)                                                                  | `avocado runtime provision` cannot flash a Jetson from its container today. Every Jetson flash behind this page was run host-side, so the documented CLI path is not the path that was verified |
| 7   | Add this page to the Advanced category in `sidebars-guides.js`                                                                       | Deliberately omitted while `draft: true` - a sidebar entry pointing at a draft doc breaks the production build                                                                                  |

### What is already proven

- **Jetson Orin Nano dev kit (P3767-0005), 2026-08-15**: on-device, paired positive and negative. `/proc/device-tree/hello-overlay/avocado,marker` reads the declared value on the running board and the node is absent with the declaration removed.
- **raspberrypi5**: build path green end to end - compile, deliver, finalized `os-bundle.aos`. No hardware run yet (item 5 above).
- **qemuarm64**: compile and deliver green; boot-time application pending #273.

## What's next

- [Custom kernel](./custom-kernel) - bring your own kernel tree, including the vendor trees that ship board device trees
- [Provisioning](./provisioning) - writing a built image to a board
- [Hardware-in-the-loop development](./hardware-in-the-loop) - iterating against a live device
