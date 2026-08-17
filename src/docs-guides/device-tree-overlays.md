---
sidebar_position: 6.5
title: 'Device-tree overlays'
copy_markdown: true
draft: true
description: 'Declare a device-tree overlay in an extension and let avocado build compile it in the SDK and deliver it to the boot medium - no manual dtc, no boot-partition surgery, no BSP fork.'
---

:::danger draft - Jetson only, and not yet reproducible by a reader

**NVIDIA Jetson (Tegra) is the one target where this is finished and proven on hardware.** Every other target is work in progress and is marked as such throughout this page - the Raspberry Pi path builds but has never been confirmed on a board, and `qemuarm64` delivers the overlay but does not apply it at boot. Read the [target support](#target-support) table before following anything here for a non-Jetson board.

The guide also documents behavior that is **not in a released Avocado CLI or SDK image**. Every command below has been run, but only against from-source builds of unmerged branches. Following it with released artifacts will fail at `avocado install`.

See [Release status](#release-status) at the bottom for the exact list of what must merge and publish before this page can drop `draft: true`.

:::

A device-tree overlay is a small patch to your board's hardware description: enable a SPI bus, wire up a GPIO, add a sensor the base device tree does not know about. Traditionally that means compiling a `.dtbo` by hand with `dtc` and finding somewhere on the boot partition to put it - a per-board manual step that has to be repeated on every image.

Avocado makes the overlay a declared part of the image. An extension names the overlays it ships, and `avocado build` compiles each one in the SDK and hands it to a per-board delivery step that knows where the blob belongs on that board's boot medium.

This guide covers:

- Declaring overlays in `avocado.yaml`
- Writing an overlay source the compiler will accept
- Building and flashing on a Jetson, the worked example throughout
- Confirming on a booted board that the overlay actually applied
- What is still work in progress on the other targets

## Target support

The declaration is portable; the delivery mechanism is not. Each BSP layer installs its own delivery hook, so what happens to the compiled blob differs by board - including how you ship a _change_ to an overlay later, and how far along each target is.

| Target                                      | Status                             | Delivery mechanism                                             | Updating an overlay                                       |
| ------------------------------------------- | ---------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| `jetson-orin-nano-devkit` (and other Tegra) | **Working** - verified on hardware | Merged into the base DTB at build time with `fdtoverlay`       | **Reflash** - see [Jetson](#jetson-tegra)                 |
| `raspberrypi5`, `raspberrypi4`              | **WIP** - builds, never booted     | Loose `.dtbo` on the boot FAT, selected by a `dtoverlay=` line | Ordinary image update                                     |
| `qemuarm64`                                 | **WIP** - delivered, never applied | Loose `.dtbo` on the boot FAT                                  | n/a until the boot chain applies it                       |
| `qemux86-64`                                | Not applicable                     | None - x86 boots via ACPI and has no device tree               | n/a                                                       |
| Any other target                            | Not supported                      | None                                                           | Build fails by design - see [below](#unsupported-targets) |

Only the Jetson row has been confirmed by reading the device tree of a running kernel. The other two rows describe what the build produces, which is a weaker claim than it looks - see [Confirming the overlay applied](#confirming-the-overlay-applied) for why a green build proves nothing about a board, and [Targets still in progress](#targets-still-in-progress) for what each one is waiting on.

:::info the declaration is the portable part
The same `device_tree_overlays` block and the same `.dtso` move between a Jetson and a Pi unchanged. Only the hook underneath differs. That is the point of the hook being per-BSP - and it is why the WIP targets are held up by delivery and boot wiring rather than by anything you write.
:::

## Declaring an overlay

Overlays are declared on the **extension** that ships them, not on the runtime and not on a package:

```yaml
runtimes:
  dev:
    target: jetson-orin-nano-devkit
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
| `name`   | yes      | Authoritative. It is the compiled blob's basename (`<name>.dtbo`) and, on the targets that select overlays at boot, the selection argument. Must be a safe basename: no `/`, no whitespace, not `.` or `..`. Names must be unique across the whole runtime - a duplicate is a hard error, not last-one-wins. |
| `src`    | yes      | Path to the overlay source, relative to the project root.                                                                                                                                                                                                                                                    |
| `params` | no       | A mapping of per-overlay parameters. Consumed **only** by the Raspberry Pi hook, which is itself WIP - see [Parameters](#parameters-raspberry-pi-only).                                                                                                                                                      |

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
avocado build --target jetson-orin-nano-devkit
```

The build logs three ordered markers. All three must appear:

```text
avocado-dtc-overlay: built .../device-tree-overlays/hello-overlay.dtbo from hello-overlay
device-tree-overlay-deliver: delivered 1 overlay(s) merged into tegra234-p3768-0000+p3767-0005-nv-super.dtb for avocado-jetson-orin-nano-devkit: hello-overlay
[SUCCESS] OS bundle created: .../os-bundle.aos
```

The middle line is the one that differs per target: on Jetson it names the base DTB the overlays were merged into, and on the loose-`.dtbo` targets it names the boot directory they were copied to instead.

To inspect what was produced, `avocado save` exports the build state; the archive holds both the compiled `device-tree-overlays/<name>.dtbo` and the finalized `os-bundle.aos`.

Then flash the board. **Do this host-side, not through `avocado runtime provision`** - container-mode provisioning cannot currently reach a Jetson in recovery mode, which is item 6 of [Release status](#release-status). Every result on this page was obtained from a host-side flash.

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

:::caution you need a shell first, and a stock image will not give you one
A stock Avocado image ships no SSH server and leaves root's password field in `/etc/shadow` as `*`, which no password can match. Flash one and you get a console prompt nothing satisfies - and this check is only readable from a shell on the board.

Two declarations fix that, and they only work together:

```yaml
runtimes:
  dev:
    extensions:
      - avocado-ext-sshd-dev # brings sshd and a permissive dev policy
    var_files:
      - source: 'files/authorized_keys' # your own public key
        dest: 'lib/ssh/' # -> /var/lib/ssh/authorized_keys

extensions:
  avocado-ext-sshd-dev:
    source:
      type: package
      version: '*'
```

`avocado init` already puts `avocado-ext-sshd-dev` in the `dev` runtime it generates, so a project started that way has the first half. The `var_files` entry is the half people miss: the extension configures sshd to read `/var/lib/ssh/authorized_keys`, but nothing puts a key there for you. Without it the board boots, runs sshd, listens - and refuses every credential, which looks identical to the feature being broken.

Copy your public key to `files/authorized_keys` in the project, then `avocado build` and provision as usual.

Both the extension and the key are **dev-only and must never ship**. That means the image you verify is not byte-for-byte the image you ship. Acceptable here, because neither touches the device tree - but it is the reason to keep the difference to exactly these two declarations and to rebuild without them before shipping.
:::

### Run the negative control

One positive reading is not enough on its own: a node that was in the base tree all along looks identical to one an overlay added. Build the same project a second time with the `device_tree_overlays` block removed and nothing else changed, boot it on the same board, and confirm the node is **absent**:

```console
# tr -d '\0' < /proc/device-tree/hello-overlay/compatible
sh: can't open /proc/device-tree/hello-overlay/compatible: no such file
```

With both halves, the declaration is the only variable that can explain the difference. Do this once per platform you ship on - the delivery mechanism differs per board, so a pass on one proves nothing about another.

## Per-target details

### Jetson (Tegra)

Tegra has nowhere to put a loose `.dtbo`. The flashed partition set has no DTBO partition, the ESP carries only the bootloader, and the overlay lists that do exist in the Tegra flash variables are read by the classic `flash.sh` path - not by the `initrd-flash` flow Avocado uses, which consumes binaries already signed at build time. Anything written to those lists is inert.

So the hook merges the declared overlays into the board's base DTB at build time with `fdtoverlay` and publishes the merged tree as the stone manifest's `storage_devices.rootdisk.images.dtb`. That merged DTB is what gets flashed.

Two consequences:

**Changing an overlay requires a reflash, not an image update.** The overlay is baked into a signed DTB living in a flash partition, so it only moves through the provisioning path. This is the one place the platforms genuinely diverge for a user, and it belongs in your own deployment planning.

**Declaration order is load-bearing.** `fdtoverlay` applies overlays in the order declared, so an overlay targeting a node that an earlier overlay created must come after it.

The base DTB is selected by the `DTBFILE` the BSP records, because a real Tegra BSP ships one base DTB per module SKU - five on an Orin Nano dev kit. You do not choose it; the board's own flash configuration does.

## Targets still in progress

Everything below builds. None of it has been confirmed on a running kernel, which per [Confirming the overlay applied](#confirming-the-overlay-applied) is the only evidence that counts. Treat these sections as a description of the intended mechanism rather than of observed behavior.

### Raspberry Pi - WIP, builds but never booted

The hook writes the `.dtbo` to `overlays/<name>.dtbo` on the boot FAT and emits an `avocado-overlays.txt` alongside it holding one `dtoverlay=<name>` line per overlay. The stock `config.txt` carries a static `include avocado-overlays.txt`, so the firmware should pick these up at boot. `config.txt` itself is never rewritten, which keeps your own overrides and the generated overlay list from fighting over the same file.

The build path is green end to end - compile, deliver, finalized `os-bundle.aos` - and is re-run as a regression gate whenever the Jetson path changes. **That is the whole of the evidence.** No Pi has been booted with a declared overlay and had its device tree read, so whether the firmware actually applies the generated list is currently an assumption. The Jetson experience is the reason to say so plainly: there, every build marker passed for two full rounds while the board applied nothing.

What it is waiting on: a paired positive/negative run on a Pi 5, item 5 of [Release status](#release-status).

### QEMU - WIP, delivered but not applied

`qemuarm64` compiles and delivers the overlay to the boot FAT, and then nothing applies it. The shipped `qemu_arm64_defconfig` does not set `CONFIG_OF_LIBFDT_OVERLAY` at u-boot 2026.01, so its u-boot carries every `fdt` subcommand except the one that applies an overlay - `fdt apply` prints its usage dump instead of running.

This one is understood rather than merely unverified: the mechanism has been proven on a u-boot built from the same tree with the flag set, and the negative control on the shipped binary fails exactly where predicted. It needs three pieces (the config flag, an overlay list written next to the kernel, and an env block that applies them), tracked in meta-avocado#273, plus a full-image build and boot that has not happened.

`qemux86-64` is a different case and will not be supported: x86 boots via ACPI and has no device tree anywhere in the chain, so no hook is installed and declaring an overlay there fails the build.

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

:::warning `params` is silently ignored off Raspberry Pi - including on Jetson
Only the Raspberry Pi hook consumes `params`, because it maps onto the Pi firmware's own overlay-parameter mechanism and nothing else has an equivalent. The Jetson and QEMU hooks accept a declaration carrying `params` and deliver the overlay without them, with no warning.

**On Jetson - the one working target - encode the values in the `.dtso` itself.** A `params` block there is silently inert, and since the Pi hook that would honor it is itself unverified on hardware, this key has no confirmed consumer on any board today.
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

This page is `draft: true` for two reasons: the feature is not reachable from released artifacts, and only one target is finished. Items 1-4 and 6-7 gate publication; item 5 is what promotes the Raspberry Pi out of WIP, and meta-avocado#273 does the same for `qemuarm64`.

### Pull requests

| PR                                                             | Repo         | Status                            | What it provides                                                                 | Required for                                     |
| -------------------------------------------------------------- | ------------ | --------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
| [#28](https://github.com/avocado-linux/stone/pull/28)          | stone        | **Merged** 2026-08-12             | `files_append` FAT primitive                                                     | All targets                                      |
| [#245](https://github.com/avocado-linux/meta-avocado/pull/245) | meta-avocado | **Merged** 2026-08-12 (`563d462`) | SDK compile wrapper + RPi and QEMU delivery hooks                                | All targets                                      |
| [#183](https://github.com/avocado-linux/avocado-cli/pull/183)  | avocado-cli  | Open, ready                       | The `device_tree_overlays` config surface and build orchestration                | All targets                                      |
| [#292](https://github.com/avocado-linux/meta-avocado/pull/292) | meta-avocado | Open, ready                       | Jetson delivery hook (`fdtoverlay` merge) **and** the Tegra BSP staging it reads | Jetson                                           |
| [#291](https://github.com/avocado-linux/meta-avocado/pull/291) | meta-avocado | Open, ready                       | Makes five silent Jetson provisioning failures report their own cause            | Jetson walkthrough being followable              |
| [#273](https://github.com/avocado-linux/meta-avocado/pull/273) | meta-avocado | Open, **draft**                   | Applies delivered overlays at boot on qemuarm64                                  | qemuarm64 only - **not** a blocker for this page |

Merge order is constrained only by #28 before #245 (SRCREV re-pin); both are merged. [#293](https://github.com/avocado-linux/meta-avocado/pull/293) is closed - its Tegra BSP staging is now the first commit of #292, because a hook that cannot find its input and a staging step with no consumer were never separately mergeable.

### Beyond the PRs

| #   | Item                                                                                                                                 | Why it blocks                                                                                                                                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Publish the SDK image `avocadolinux/sdk:2024-edge` carrying `nativesdk-avocado-dtc-overlay` and the `files_append` `nativesdk-stone` | `avocado install` cannot resolve the overlay compiler without it                                                                                                                                                      |
| 2   | Publish the `2024/edge` feed carrying `avocado-dtc-overlay-deliver`                                                                  | The delivery hook is a target package; without it the build hard-errors on a missing hook                                                                                                                             |
| 3   | Cut an avocado-cli release and name it in this guide                                                                                 | The released `1.0.0-rc.1` does **not** carry the overlay work, despite the from-source build reporting the same version                                                                                               |
| 4   | Resolve KOS-68, or keep the [brand-new SDK](#on-a-brand-new-sdk) block                                                               | A clean SDK cannot finalize a runtime image without it                                                                                                                                                                |
| 5   | Raspberry Pi 5 paired positive/negative hardware run                                                                                 | The Pi path is proven only at build level; per [Confirming the overlay applied](#confirming-the-overlay-applied), that is not evidence                                                                                |
| 6   | Fix container-mode provisioning on Jetson (part of avocado-cli#183)                                                                  | `avocado runtime provision` cannot flash a Jetson from its container today. Every Jetson flash behind this page was run host-side, so the documented CLI path is not the path that was verified                       |
| 7   | Add this page to the Advanced category in `sidebars-guides.js`                                                                       | Deliberately omitted while `draft: true` - a sidebar entry pointing at a draft doc breaks the production build                                                                                                        |
| 8   | Confirm the `var_files` key actually authenticates on a booted board                                                                 | The pairing above is verified at build time only: the key is confirmed landing at `/var/lib/ssh/authorized_keys`. sshd accepting it is unobserved, and `StrictModes` could still reject the file on mode or ownership |

### Evidence, per target

| Target      | Build path | On hardware                    | Verdict     |
| ----------- | ---------- | ------------------------------ | ----------- |
| Jetson Orin | Green      | **Paired positive + negative** | **Working** |
| rpi5        | Green      | Not run                        | WIP         |
| qemuarm64   | Green      | Applies nothing at boot        | WIP         |

**Jetson Orin Nano dev kit (P3767-0005), 2026-08-15.** On-device, paired positive and negative: `/proc/device-tree/hello-overlay/avocado,marker` reads the declared value on the running board, and the node is absent on a build with the declaration removed and nothing else changed. This is the only row where the middle column is filled in, and it is the reason Jetson is the worked example throughout this page rather than the Pi it started as.

## What's next

- [Custom kernel](./custom-kernel) - bring your own kernel tree, including the vendor trees that ship board device trees
- [Provisioning](./provisioning) - writing a built image to a board
- [Hardware-in-the-loop development](./hardware-in-the-loop) - iterating against a live device
