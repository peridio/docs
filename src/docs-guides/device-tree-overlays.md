---
sidebar_position: 6.5
title: 'Device-tree overlays'
copy_markdown: true
draft: false
description: 'Declare a device-tree overlay in an extension and let avocado build compile it in the SDK and deliver it to the boot medium - no manual dtc, no boot-partition surgery, no BSP fork.'
---

:::info Jetson only

**NVIDIA Jetson (Tegra) is the one target this page documents, and the only one proven on hardware.** Other targets are not covered here: their delivery paths have not been confirmed on a board, and this page does not describe a mechanism nobody has watched work.

:::

A device-tree overlay is a small patch to your board's hardware description: enable a SPI bus, wire up a GPIO, add a sensor the base device tree does not know about. Traditionally that means compiling a `.dtbo` by hand with `dtc` and finding somewhere on the boot partition to put it - a per-board manual step that has to be repeated on every image.

Avocado makes the overlay a declared part of the image. An extension names the overlays it ships, and `avocado build` compiles each one in the SDK and hands it to a per-board delivery step that knows where the blob belongs on that board's boot medium.

This guide covers:

- Declaring overlays in `avocado.yaml`
- Writing an overlay source the compiler will accept
- Building and flashing on a Jetson, the worked example throughout
- Confirming on a booted board that the overlay actually applied

## Target support

The declaration is portable; the delivery mechanism is not. Each BSP layer installs its own delivery hook, so what happens to the compiled blob differs by board - including how you ship a _change_ to an overlay later.

| Target                                      | Status                             | Delivery mechanism                                       | Updating an overlay                                       |
| ------------------------------------------- | ---------------------------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| `jetson-orin-nano-devkit` (and other Tegra) | **Working** - verified on hardware | Merged into the base DTB at build time with `fdtoverlay` | **Reflash** - see [Jetson](#jetson-tegra)                 |
| `qemux86-64`                                | Not applicable                     | None - x86 boots via ACPI and has no device tree         | n/a                                                       |
| Any other target                            | Not documented yet                 | Varies by BSP                                            | Build fails by design - see [below](#unsupported-targets) |

The Jetson row has been confirmed by reading the device tree of a running kernel on the board. Other boards will be documented as each one is verified the same way - see [Confirming the overlay applied](#confirming-the-overlay-applied) for why a green build is not evidence that an overlay reached a kernel.

:::info the declaration is the portable part
The same `device_tree_overlays` block and the same `.dtso` move between boards unchanged. Only the hook underneath differs, which is the point of the hook being per-BSP.
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
| `params` | no       | A mapping of per-overlay parameters. Accepted by the schema, but no hook on a documented target consumes it - the Jetson hook ignores it silently. Encode the values in the `.dtso` instead.                                                                                                                 |

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
`&spi0` resolves through the base device tree's `__symbols__` node, which only exists if the BSP compiled its DTB with `dtc -@`. Most vendor BSPs do. If the label cannot resolve, a Jetson **fails the build** - `fdtoverlay` errors and the hook treats that as fatal rather than flashing an unmerged tree. On a board whose overlays are selected at boot instead, the same unresolved label is silent, and you get a board that boots without the overlay. Use `target-path` when you are unsure.
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

To inspect what was produced, `avocado save` exports the build state - the archive holds both the compiled `device-tree-overlays/<name>.dtbo` and the finalized `os-bundle.aos`:

```bash
avocado save -o build-state.tar.zst
```

Then flash the board. Provisioning is not specific to overlays, so follow [Getting started: Jetson](./getting-started/jetson) for the procedure - put the board in recovery mode and run `avocado provision -r dev --profile tegraflash`.

:::note how these results were produced
Every result on this page came from running the board's `stone-provision-tegraflash.sh` directly on the host, driving it with `AVOCADO_STONE_MANIFEST`, `AVOCADO_STONE_DATA_DIR` and `AVOCADO_PROVISION_PROFILE`, rather than through `avocado provision`. Both paths flash the same artifacts, and the overlay is merged into the DTB at build time either way, so nothing on this page depends on which one you use. It is recorded because it is the difference between what was verified and what is documented.
:::

## Confirming the overlay applied

**A green build is not evidence that an overlay is applied.** This is the single most important thing on this page. Every build-path marker above can pass - the source compiles, the right blob is delivered, the bundle finalizes, the flash reports success - while the running kernel uses a device tree your overlay never touched. That exact failure happened on Jetson and went undetected for two full build rounds.

The only evidence that counts is the tree the kernel is actually running. On the booted board:

```console
# ls /proc/device-tree/
# tr -d '\0' < /proc/device-tree/hello-overlay/compatible
acme,widget
```

`/proc/device-tree` is the live tree after every stage the bootloader applied, so a node present there is a node in effect.

:::caution you need a shell first
A raw image leaves root's password field in `/etc/shadow` as `*`, which no password can match, and this check is only readable from a shell on the board.

`avocado init` already solves it. The project it generates carries a `permissions` profile that gives root an empty password, and points the rootfs at it:

```yaml
rootfs:
  permissions: dev

permissions:
  dev:
    users:
      root:
        password: ''
```

That is enough to log in on the serial console. If you started from `avocado init` you have it already; if you hand-wrote your `avocado.yaml`, this is the piece to add. **Verified on a Jetson Orin Nano**: with this profile the flashed rootfs carries `root::` and the console gives a root prompt.

For a shell over the network instead, add the SSH extension and your own public key. The extension configures sshd to read `/var/lib/ssh/authorized_keys`; `var_files` is what puts a key there, and neither half is useful alone:

```yaml
runtimes:
  dev:
    extensions:
      - avocado-ext-sshd-dev
      - avocado-bsp-{{ avocado.target.board }} # NIC driver lives here
    var_files:
      - source: 'files/authorized_keys'
        dest: 'lib/ssh/'
```

Do not drop the BSP extension to slim a test project. On a Jetson Orin Nano it carries `kernel-module-realtek`, and without it the board boots with no ethernet interface at all - so there is nothing to SSH to, and the cause looks nothing like a missing extension.

**Verified on a Jetson Orin Nano**: the key lands root-owned at `/var/lib/ssh/authorized_keys` mode `0644`, which is what `StrictModes` requires, and `ssh -o BatchMode=yes root@<board>` connects. `BatchMode` refuses password and keyboard-interactive auth, so a connection under it is proof the key itself was accepted rather than a password prompt quietly succeeding behind it.

Expect the host key to change on every reflash. Host keys are generated on first boot rather than shipped, so the entry your client recorded for that address is stale the moment you reflash, and SSH reports it as a possible man-in-the-middle rather than as a new board. Replace the recorded entry instead of adding to it - an append leaves the old key in place and the failure persists.

The permissions profile, the SSH extension and the key are all **dev-only and must never ship**. That means the image you verify is not byte-for-byte the image you ship. Acceptable here, because none of them touches the device tree - but it is the reason to keep the difference to exactly these declarations and rebuild without them before shipping.
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
| Build fully green, node absent from `/proc/device-tree`              | Overlay was delivered but not applied at boot                            | Run the negative control and report it                                                                   |

## What's next

- [Custom kernel](./custom-kernel) - bring your own kernel tree, including the vendor trees that ship board device trees
- [Provisioning](./provisioning) - writing a built image to a board
- [Hardware-in-the-loop development](./hardware-in-the-loop) - iterating against a live device
