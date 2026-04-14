---
sidebar_position: 6
title: 'Custom kernel'
copy_markdown: true
description: 'Bring your own Linux kernel to Avocado - cross-compile from source or install a pre-built kernel package with the required configuration for system extensions, systemd, and boot.'
---

Avocado runtimes ship with a default kernel provided by the `avocado-img-bootfiles` package (pulled in by the `avocado-runtime` meta-package). When your project requires a specific kernel version, vendor-supplied kernel sources, or custom driver support, the `kernel` configuration option lets you replace the default kernel with your own.

This guide covers:

- How to configure `avocado.yaml` for a custom kernel
- Required kernel configuration options Avocado depends on
- Writing compile and install scripts
- Adapting the workflow for different hardware targets

:::tip vendor kernels
For hardware like NVIDIA Jetson, NXP i.MX, or Qualcomm platforms, start with the kernel source tree provided by the silicon vendor. These trees include board-specific device tree files, peripheral drivers, and GPU support that upstream kernels may lack.
:::

## Configuration modes

The `kernel` section in a runtime supports two mutually exclusive modes:

### Compile from source

Cross-compile a kernel inside the SDK container:

```yaml
runtimes:
  dev:
    kernel:
      compile: kernel # References an sdk.compile section by name
      install: kernel-install.sh # Copies the built image into the runtime
```

- `compile` -- References an `sdk.compile` section that runs the build.
- `install` -- A script executed after compilation. It receives `AVOCADO_RUNTIME_BUILD_DIR` (pointing to `$AVOCADO_PREFIX/runtimes/<runtime>/`) and is responsible for copying the kernel image there.

### Install from package

Use a pre-built kernel RPM from your package feed:

```yaml
runtimes:
  dev:
    kernel:
      package: kernel-image
      version: '6.12.69'
```

`package` and `compile` are mutually exclusive. If the `kernel` section is omitted entirely, the default Avocado kernel is used.

## SDK compile section

When compiling from source, define the compile section that the runtime references:

```yaml
sdk:
  image: docker.io/avocadolinux/sdk:{{ avocado.distro.channel }}

  compile:
    kernel:
      compile: kernel-compile.sh
      packages: # Target sysroot packages installed before the script runs
        libelf1: '*'

  packages:
    avocado-sdk-toolchain: '{{ avocado.distro.version }}'
    nativesdk-bc: '*'
    nativesdk-libelf1: '*'
```

The `packages` field inside `sdk.compile.kernel` declares target sysroot dependencies. The `sdk.packages` field declares host-side SDK packages installed into the SDK sysroot. Common ones for kernel builds include `bc` (for `timeconst.h` generation) and `libelf` (for `objtool`). Check your SDK package feed for the correct package names.

## Writing the compile script

The compile script runs inside the SDK container where the OpenEmbedded cross-compilation environment is already sourced. Variables like `CROSS_COMPILE`, `ARCH`, and `OECORE_TARGET_SYSROOT` are set before your script executes.

### Handling SDK environment conflicts

The OE SDK sets `CC`, `CFLAGS`, `LDFLAGS`, and other variables with `--sysroot` flags and tuning options designed for userspace cross-compilation. The kernel build system manages its own flags and derives `CC` from `CROSS_COMPILE` internally, so these SDK variables **conflict** with it.

Save the variables you need, unset the rest, then restore:

```bash
# Save what the kernel build needs
_CROSS_COMPILE="${CROSS_COMPILE}"
_ARCH="${ARCH}"
_TARGET_SYSROOT="${OECORE_TARGET_SYSROOT}"

# Clear everything the SDK sets that conflicts with the kernel build system
unset CC CXX CPP LD AR AS NM STRIP OBJCOPY OBJDUMP READELF RANLIB
unset CFLAGS CXXFLAGS CPPFLAGS LDFLAGS
unset KCFLAGS

# Restore
export CROSS_COMPILE="${_CROSS_COMPILE}"
export ARCH="${_ARCH}"
```

### Setting up host tool compilation

The kernel builds host-side tools (`fixdep`, `objtool`, `genksyms`, etc.) that run on the build machine during compilation. Three issues arise in the SDK environment:

1. **No bare `gcc`/`ld`/`ar`.** The SDK container only ships cross-prefixed tools (e.g., `x86_64-avocado-linux-gcc`).

2. **Make assignment semantics.** The kernel Makefile uses `HOSTCC = gcc` (unconditional assignment). In GNU make, environment variables do **not** override unconditional assignments -- you must pass them on the **command line**.

3. **No default sysroot.** The bare cross-compiler has no built-in sysroot, so standard headers like `sys/types.h` are not found. Point it at the target sysroot with `--sysroot`.

```bash
HOSTCC="${CROSS_COMPILE}gcc --sysroot=${_TARGET_SYSROOT}"
HOSTCXX="${CROSS_COMPILE}g++ --sysroot=${_TARGET_SYSROOT}"
HOSTLD="${CROSS_COMPILE}ld"
HOSTAR="${CROSS_COMPILE}ar"

MAKE_ARGS=(
  HOSTCC="${HOSTCC}"
  HOSTCXX="${HOSTCXX}"
  HOSTLD="${HOSTLD}"
  HOSTAR="${HOSTAR}"
)

make "${MAKE_ARGS[@]}" defconfig       # or your vendor/board defconfig
make "${MAKE_ARGS[@]}" olddefconfig
make "${MAKE_ARGS[@]}" -j"$(nproc)" Image  # or bzImage, zImage, etc.
```

:::caution cross-architecture builds
Using the cross-compiler as `HOSTCC` only works when host and target share the same architecture (e.g., x86_64 SDK building an x86_64 kernel). For true cross-architecture builds (e.g., building an ARM64 kernel on an x86_64 SDK), the cross-compiler's output won't run on the host. In that case, install `nativesdk-gcc` in the SDK to get a native host compiler.
:::

## Required kernel configuration

Avocado depends on specific kernel options being enabled. These fall into three categories: filesystem support for the extension and update system, systemd init requirements, and boot infrastructure.

### Filesystem support

Avocado uses overlayfs and squashfs for system extensions, btrfs for the var partition, and loop devices for image mounting. These should be built-in (`=y`), not modules, unless your boot flow loads an initramfs that can insert them early enough.

| Option                                  | Purpose                                |
| --------------------------------------- | -------------------------------------- |
| `CONFIG_OVERLAY_FS=y`                   | Overlayfs for system extension merging |
| `CONFIG_SQUASHFS=y`                     | SquashFS for system extension images   |
| `CONFIG_SQUASHFS_FILE_CACHE=y`          | SquashFS file data caching             |
| `CONFIG_SQUASHFS_DECOMP_MULTI=y`        | Parallel SquashFS decompression        |
| `CONFIG_SQUASHFS_ZLIB=y`                | Zlib compression for SquashFS          |
| `CONFIG_SQUASHFS_ZSTD=y`                | Zstd compression for SquashFS          |
| `CONFIG_SQUASHFS_FRAGMENT_CACHE_SIZE=3` | Fragment cache size                    |
| `CONFIG_BTRFS_FS=y`                     | Btrfs for the var partition            |
| `CONFIG_BLK_DEV_LOOP=y`                 | Loop device for image mounting         |
| `CONFIG_PARTITION_ADVANCED=y`           | Advanced partition support             |
| `CONFIG_EFI_PARTITION=y`                | GPT partition table support            |
| `CONFIG_CRYPTO_LZ4=y`                   | LZ4 compression (used by zram)         |
| `CONFIG_ZRAM=y`                         | Compressed RAM block device            |

### Systemd requirements

Avocado uses systemd as the init system. The following options are required:

| Option                     | Purpose                          |
| -------------------------- | -------------------------------- |
| `CONFIG_CGROUPS=y`         | Control group support            |
| `CONFIG_CGROUP_FREEZER=y`  | Freezer cgroup                   |
| `CONFIG_CGROUP_DEVICE=y`   | Device cgroup                    |
| `CONFIG_CGROUP_SCHED=y`    | CPU scheduler cgroup             |
| `CONFIG_CGROUP_CPUACCT=y`  | CPU accounting cgroup            |
| `CONFIG_CGROUP_PIDS=y`     | PIDs cgroup                      |
| `CONFIG_CGROUP_PERF=y`     | Perf events cgroup               |
| `CONFIG_BLK_CGROUP=y`      | Block I/O cgroup                 |
| `CONFIG_NAMESPACES=y`      | Namespace support                |
| `CONFIG_USER_NS=y`         | User namespaces                  |
| `CONFIG_INOTIFY_USER=y`    | Inotify file change notification |
| `CONFIG_SIGNALFD=y`        | Signal file descriptors          |
| `CONFIG_TIMERFD=y`         | Timer file descriptors           |
| `CONFIG_EPOLL=y`           | Event polling                    |
| `CONFIG_TMPFS=y`           | Tmpfs filesystem                 |
| `CONFIG_TMPFS_POSIX_ACL=y` | POSIX ACL support on tmpfs       |
| `CONFIG_DEVTMPFS=y`        | Device tmpfs                     |
| `CONFIG_DEVTMPFS_MOUNT=y`  | Automount devtmpfs               |
| `CONFIG_FHANDLE=y`         | File handle syscalls             |
| `CONFIG_AUTOFS_FS=y`       | Automounter support              |

### Boot and EFI

| Option                    | Purpose                   |
| ------------------------- | ------------------------- |
| `CONFIG_EFI=y`            | EFI runtime support       |
| `CONFIG_EFI_STUB=y`       | EFI boot stub             |
| `CONFIG_BLK_DEV_INITRD=y` | Initial ramdisk support   |
| `CONFIG_RD_ZSTD=y`        | Zstd-compressed initramfs |

### Root device driver

Your kernel must include the driver for whatever storage controller presents the root filesystem. Without this, the kernel will hang at `Waiting for root device...`. Check what `/dev/` node the bootloader passes as `root=` and ensure the corresponding driver is built in (not as a module).

Common examples:

| Storage type   | Key options                                                        |
| -------------- | ------------------------------------------------------------------ |
| eMMC / SD card | `CONFIG_MMC`, `CONFIG_MMC_SDHCI`, plus your host controller driver |
| NVMe           | `CONFIG_BLK_DEV_NVME`                                              |
| SATA           | `CONFIG_ATA`, `CONFIG_SATA_AHCI`                                   |
| USB storage    | `CONFIG_USB_STORAGE`, `CONFIG_BLK_DEV_SD`                          |

### Applying configuration options

Use the kernel's `scripts/config` tool to enable options after running the base defconfig, then run `make olddefconfig` to resolve dependencies before building:

```bash
# Start with your base defconfig
make "${MAKE_ARGS[@]}" defconfig  # or vendor_defconfig

# Enable Avocado requirements
scripts/config --enable CONFIG_OVERLAY_FS
scripts/config --enable CONFIG_SQUASHFS
scripts/config --enable CONFIG_SQUASHFS_ZSTD
scripts/config --enable CONFIG_BTRFS_FS
scripts/config --enable CONFIG_BLK_DEV_LOOP
# ... (see full list above)

# Resolve dependencies
make "${MAKE_ARGS[@]}" olddefconfig
```

## Writing the install script

The install script runs inside the SDK container after compilation. Its job is to copy the kernel image to `$AVOCADO_RUNTIME_BUILD_DIR`:

```bash
#!/usr/bin/env bash
set -e

# Update this path based on your architecture and image type
KERNEL_IMAGE="path/to/arch/<arch>/boot/<Image>"

if [ -z "${AVOCADO_RUNTIME_BUILD_DIR}" ]; then
  echo "[ERROR] AVOCADO_RUNTIME_BUILD_DIR is not set." >&2
  exit 1
fi

mkdir -p "${AVOCADO_RUNTIME_BUILD_DIR}"
cp -f "${KERNEL_IMAGE}" "${AVOCADO_RUNTIME_BUILD_DIR}/<Image>"
```

`AVOCADO_RUNTIME_BUILD_DIR` is set automatically by `avocado-cli` and points to `$AVOCADO_PREFIX/runtimes/<runtime_name>/`. This is the same location where the package-based kernel would be placed, so the downstream build hook picks it up without changes.

The kernel image name depends on your architecture:

| Architecture | Image path              | Image name |
| ------------ | ----------------------- | ---------- |
| x86_64       | `arch/x86/boot/bzImage` | `bzImage`  |
| ARM64        | `arch/arm64/boot/Image` | `Image`    |
| ARM          | `arch/arm/boot/zImage`  | `zImage`   |
| RISC-V       | `arch/riscv/boot/Image` | `Image`    |

## Build workflow

```bash
# Install the SDK and toolchain
avocado sdk install

# Compile the kernel (optional -- avocado build does this automatically)
avocado sdk compile kernel

# Build everything (triggers compile + install + runtime assembly)
avocado build
```

When `avocado build` encounters a runtime with a `kernel.compile` section, it:

1. Executes the referenced `sdk.compile` section (runs your compile script).
2. Runs the `kernel.install` script with `AVOCADO_RUNTIME_BUILD_DIR` set.
3. Proceeds with normal runtime assembly (extension installation, var partition creation, image creation).

The build stamp system includes the `kernel` configuration in its hash, so changes to the `kernel` section automatically trigger a rebuild.

## Adapting for your target

When targeting different hardware, adjust the following based on your board:

| What                   | Why                                                                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kernel source tree     | Use the vendor-supplied kernel for your hardware (e.g., NVIDIA L4T kernel for Jetson, NXP linux-imx for i.MX). Upstream kernels may lack board-specific drivers, device trees, and GPU support. |
| `ARCH` and defconfig   | Each architecture has its own defconfig and `ARCH` value (`arm64`, `arm`, `x86`, `riscv`, etc.). Vendor kernels typically ship a board-specific defconfig.                                      |
| Kernel image name      | ARM64 produces `Image`, ARM produces `zImage`, x86 produces `bzImage`. Update both the compile and install scripts accordingly.                                                                 |
| Root device driver     | Match the storage controller on your hardware (eMMC, NVMe, SATA, etc.).                                                                                                                         |
| `HOSTCC` strategy      | For same-arch builds, the cross-compiler works as HOSTCC. For cross-arch builds, install `nativesdk-gcc`.                                                                                       |
| Board-specific options | Device tree, pinmux, clock, regulator, and peripheral drivers for your hardware.                                                                                                                |
| SDK packages           | The package names for `bc`, `libelf`, etc. may vary across SDK package feeds.                                                                                                                   |

## Troubleshooting

| Symptom                        | Cause                         | Fix                                                                                |
| ------------------------------ | ----------------------------- | ---------------------------------------------------------------------------------- |
| `gcc: command not found`       | SDK has no bare `gcc`         | Set `HOSTCC` to the cross-prefixed compiler and pass it on the `make` command line |
| `ld: command not found`        | SDK has no bare `ld`          | Set `HOSTLD` to `${CROSS_COMPILE}ld` and pass on the `make` command line           |
| `sys/types.h: No such file`    | Cross-compiler has no sysroot | Add `--sysroot=${OECORE_TARGET_SYSROOT}` to `HOSTCC`/`HOSTCXX`                     |
| `bc: command not found`        | Missing host utility          | Add `nativesdk-bc` (or equivalent) to SDK packages                                 |
| `libelf` errors from objtool   | Missing development library   | Add `nativesdk-libelf-dev` (or equivalent) to SDK packages                         |
| `Waiting for root device...`   | Missing storage driver        | Enable the driver for your root device (MMC, NVMe, etc.)                           |
| Config option silently ignored | Dependency not met            | Run `make olddefconfig` after `scripts/config` calls to resolve dependencies       |

## What's next

- [Cross-compilation guide](./cross-compilation) for compiling applications and kernel modules with the SDK
- [Extensions reference](/core-concepts#extensions) for complete configuration options
- [Hardware-in-the-loop development](./hardware-in-the-loop) for testing on live devices
