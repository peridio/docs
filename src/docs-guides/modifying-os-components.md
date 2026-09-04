---
sidebar_position: 4.5
title: 'Modifying OS components'
copy_markdown: true
description: 'Where the Avocado CLI ends and Yocto begins: what to rebuild when you change a component that ships in the Avocado base OS.'
---

Most development on Avocado never touches Yocto. You declare packages, build extensions, and cross-compile your own applications entirely through the CLI. But when you need to change a component that ships *inside* the base OS, such as `avocadoctl` or a BSP package, you cross a boundary and the workflow changes.

This guide explains where that boundary is and what each kind of change costs.

## The boundary

**The Avocado CLI consumes RPMs from a package feed. It does not produce them.** Producing an RPM is a Yocto/BitBake function.

Everything the CLI installs, into the SDK sysroot, the rootfs and initramfs sysroots, or an extension, was built by BitBake upstream and published to the package feed. The SDK container is itself a Yocto artifact.

This is why "can I just build it as an RPM?" is usually the wrong question. Every BitBake recipe already produces an RPM, so the answer is always yes, and it still does not help. The constraint is *which source* the published RPM was built from: the recipe's pinned `SRCREV`, not your working tree.

## What to rebuild

| You changed | Yocto needed | How |
| ----------- | ------------ | --- |
| An extension's declared packages | No | [`avocado ext dnf`](/developer-reference/avocado-cli/commands#avocado-ext-dnf), `avocado build` |
| Your own application source | No | [Cross-compilation](/developer-reference/cross-compilation) in the SDK |
| The rootfs or initramfs package list | No | [Customizing the rootfs and initramfs](/developer-reference/customizing-rootfs-initramfs) |
| A published package, to a different published version | No | Pin the version in `avocado.yaml` |
| The **source** of a packaged component | **Yes** | `bitbake <recipe>` |
| A recipe, bbappend, packagegroup, or machine config | **Yes** | `bitbake` |
| Kernel configuration or an in-tree driver | **Yes** | [Custom kernel](/developer-reference/custom-kernel) |

The first four rows are the common case. The CLI covers them, and nothing in this guide applies.

## When you do need Yocto

Changing a component's source means rebuilding its recipe so a new RPM carries your change. That requires a `meta-avocado` checkout and a BitBake environment.

You rarely need a full image build. Building the single recipe is enough to produce an updated RPM:

```bash
bitbake avocadoctl
```

The result lands in the build's `tmp/deploy/rpm/<arch>/` directory alongside the rest of the feed packages.

:::note

Building one recipe is much cheaper than building an image, but it still requires a configured BitBake environment. If you only need to run your own code on a device, cross-compiling it in the SDK is the faster path and needs no Yocto at all. See [Cross-compilation](/developer-reference/cross-compilation).

:::

## Components that ship in more than one place

Some components are installed into both the rootfs and the initramfs. When that happens a device carries two copies of the same binary, and they are not interchangeable:

- The **rootfs** copy is what runs once the system is up. It backs the CLI and any long-running service.
- The **initramfs** copy runs during early boot, before the root filesystem is mounted. It is built into the boot image.

This distinction decides your rebuild cost. A change that only affects runtime behaviour needs the rootfs copy. A change that affects early boot needs a new initramfs, which means rebuilding and reprovisioning the boot image.

Check which packagegroups pull a component in before assuming which copy you need. For `avocadoctl` specifically, see [avocadoctl development](/developer-reference/avocadoctl/development).

## What's next

- [Cross-compilation](/developer-reference/cross-compilation) for building your own applications against the SDK
- [Customizing the rootfs and initramfs](/developer-reference/customizing-rootfs-initramfs) for changing what ships in the base sysroots
- [Package feeds](/developer-reference/package-feeds) for browsing what is already published
