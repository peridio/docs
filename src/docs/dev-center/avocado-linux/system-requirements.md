---
title: System Requirements
description: Hardware and software requirements for running Avocado OS and the SDK.
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

Ensure your system meets these requirements before installing Avocado OS or the SDK.

## Prerequisites

- Linux development machine (Ubuntu 22.04+, Fedora 39+)
- Podman installed
- 20GB+ available disk space

## Installing and running the SDK

1. Pull the SDK container:

```bash
podman pull avocadolinux/sdk:apollo-edge
```

2. Create your workspace:

```bash
mkdir avocado-qemu
cd avocado-qemu
```

3. Start the SDK environment:

```bash
podman run -it --rm -e AVOCADO_SDK_TARGET=qemux86-64 -v $(pwd):/opt:z --entrypoint entrypoint.sh avocadolinux/sdk:apollo-edge /bin/bash
```

For a list of supported Avocado SDK targets besides `qemux86-64`, return to the [Development Environment page](./development-environment).

Perform all remaining exercises from inside the SDK container.

## Building a system extension

Let's build a system extension that adds peridiod to the runtime.

1. Install package contents for the peridiod package to the sysext sysroot:

```bash
avocado-repo sysext install peridiod -y
```

2. Build system extension:

```bash
avocado-build sysext peridiod
```

3. Verify that a peridiod system extension raw file was output:

```bash
ls -l /opt/_avocado/extensions/sysext/peridiod.raw
```

## Building a bootable image

1. Download the necessary images for the bootchain and the core rootfs to use when building a complete system image.

```bash
avocado-repo images
```

2. Build var partition containing extension contents:

```bash
avocado-build var
```

3. Build complete system image.

```bash
avocado-build image
```

4. Verify that a complete system image file was output:

```bash
ls -l /opt/_avocado/output/avocado-image-qemu*.img
```

## Booting an image with QEMU

1. Extend the toolchain with QEMU:

```bash
avocado-repo sdk install nativesdk-qemu
```

2. Run the emulator:

```bash
avocado-run-qemu
```

3. Start the peridiod service from inside the target VM:

```bash
systemctl start peridiod
```
