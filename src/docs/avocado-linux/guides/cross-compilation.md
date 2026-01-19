---
sidebar_position: 5
title: 'Cross-compilation'
description: 'Cross-compile applications and kernel modules for Avocado Linux using the SDK - from Rust applications to out-of-tree kernel modules.'
---

Avocado's SDK provides a complete cross-compilation environment for building code that runs on your target hardware. Whether you're compiling a Rust application, a C library, or an out-of-tree kernel module, the SDK handles toolchain setup, sysroot management, and dependency resolution so you can focus on your code.

This guide walks through the SDK compilation system, covering:

- How SDK packages and target sysroot packages work together
- Compiling application code (using Rust as an example)
- Building out-of-tree kernel modules

## SDK architecture

The SDK container contains two distinct package environments:

**SDK packages** (`sdk.packages` in extensions, `nativesdk-*` prefixed) run on the SDK host. These include compilers, build tools, and utilities that execute during the build process. They're installed into `$OECORE_NATIVE_SYSROOT`.

**Target sysroot packages** (`sdk.compile.*.packages`) provide headers, libraries, and development files for the target architecture. These are the files your code links against. They're installed into `$OECORE_TARGET_SYSROOT` (also available as `$SDKTARGETSYSROOT`).

```
SDK Container
├── Host tools ($OECORE_NATIVE_SYSROOT)
│   ├── Cross-compilers (aarch64-avocado-linux-gcc, etc.)
│   ├── Rust toolchain (cargo, rustc)
│   ├── Build utilities (make, cmake, meson)
│   └── Host libraries for build tools
│
└── Target sysroot ($OECORE_TARGET_SYSROOT)
    ├── Headers (/usr/include/)
    ├── Libraries (/usr/lib/)
    ├── Kernel sources (/usr/src/kernel/)
    └── Development files for linking
```

When you cross-compile, the compiler runs from the host tools but links against libraries in the target sysroot. This separation ensures binaries are built for the correct architecture.

## Extension configuration

Cross-compiled code is integrated into extensions through the `sdk.compile` section. Each compile section defines:

- A **compile script** that builds the code
- Optional **clean script** for cleaning build artifacts
- **Target sysroot packages** needed for compilation (headers, libraries, dev files)

Extensions reference compile sections from their package definitions and specify their own SDK packages (the host tools needed to build).

```yaml
extensions:
  my-app:
    version: '1.0.0'
    packages:
      my-app-binary:
        compile: my-app-build # Reference to sdk.compile section
        install: my-app-install.sh # Script to install built artifacts

    sdk:
      packages:
        # Host tools - run on SDK host during build
        nativesdk-gcc: '*'
        nativesdk-make: '*'
        packagegroup-cross-canadian-avocado-{{ avocado.target }}: '*'

sdk:
  compile:
    my-app-build:
      compile: my-app-compile.sh
      clean: my-app-clean.sh
      packages:
        # Target sysroot packages - headers/libs to link against
        openssl-dev: '*'
        zlib-dev: '*'
```

### Key package groups

| Package                                                         | Purpose                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------- |
| `packagegroup-cross-canadian-avocado-{{ avocado.target }}`      | Cross-compiler toolchain for the target (GCC, binutils) |
| `packagegroup-rust-cross-canadian-avocado-{{ avocado.target }}` | Rust cross-compiler for the target                      |
| `nativesdk-gcc`                                                 | GCC compiler that runs on SDK host                      |
| `nativesdk-make`                                                | Make build tool                                         |
| `nativesdk-cargo`                                               | Cargo package manager                                   |
| `kernel-devsrc`                                                 | Kernel source and build infrastructure (target sysroot) |

## Example: Cross-compiling a Rust application

The Avocado CLI itself is a Rust application that's cross-compiled for each target architecture. Here's how it's configured:

### Extension configuration

```yaml
extensions:
  avocado-ext-cli:
    version: '{{ avocado.distro.version }}'
    packages:
      bash: '*'
      avocado-cli-bin:
        compile: avocado-cli-compile
        install: avocado-cli-install.sh

    sdk:
      packages:
        # Host tools for building
        nativesdk-binutils: '*'
        nativesdk-cargo: '*'
        nativesdk-gcc: '*'
        nativesdk-glibc-dev: '*'
        nativesdk-libgcc-dev: '*'
        nativesdk-rust: '*'
        nativesdk-git: '*'
        # Cross-compilation toolchain for target
        packagegroup-rust-cross-canadian-avocado-{{ avocado.target }}: '*'

sdk:
  compile:
    avocado-cli-compile:
      compile: avocado-cli-compile.sh
      clean: avocado-cli-clean.sh
      packages:
        # Target sysroot: Rust standard library for linking
        libstd-rs: '*'
        libstd-rs-dev: '*'
```

The extension declares:

- **Host SDK packages**: Rust toolchain (`nativesdk-rust`, `nativesdk-cargo`) and the cross-compilation package group
- **Target sysroot packages**: Rust standard library (`libstd-rs`, `libstd-rs-dev`) for linking

### Compile script

The compile script runs inside the SDK container with the cross-compilation environment already configured:

```bash
#!/bin/bash
set -e

# Find the Rust target from RUST_TARGET_PATH
# The SDK provides target specifications for each architecture
for json_file in "$RUST_TARGET_PATH"/*.json; do
    if [ -f "$json_file" ]; then
        json_name=$(basename "$json_file" .json)
        if [[ "$json_name" == "${OECORE_TARGET_ARCH}-"* ]]; then
            RUST_TARGET="$json_name"
            break
        fi
    fi
done

if [ -z "$RUST_TARGET" ]; then
    echo "Error: Could not find Rust target for $OECORE_TARGET_ARCH"
    exit 1
fi

echo "Building avocado-cli for target: $RUST_TARGET"

cd avocado-cli

# Clear any rustflags that might cause conflicts
unset RUSTFLAGS
unset CARGO_TARGET_AARCH64_AVOCADO_LINUX_GNU_RUSTFLAGS
unset CARGO_BUILD_RUSTFLAGS

# Remove any existing config that might conflict
rm -rf .cargo

# Create config.toml with cross-compilation settings
mkdir -p .cargo
cat > .cargo/config.toml << EOF
[target.$RUST_TARGET]
rustflags = ["--sysroot=$SDKTARGETSYSROOT/usr", "-C", "link-arg=--sysroot=$SDKTARGETSYSROOT"]
EOF

cargo build --release --target "$RUST_TARGET"
```

Key points:

- `$RUST_TARGET_PATH` contains target specification JSON files for each supported architecture
- `$OECORE_TARGET_ARCH` identifies the target architecture (e.g., `aarch64`, `x86_64`)
- `$SDKTARGETSYSROOT` points to the target sysroot containing libraries to link against
- The script configures Cargo to use the correct sysroot for linking

### Install script

The install script copies built artifacts into the extension sysroot:

```bash
#!/bin/bash
set -e

# Find the Rust target (same logic as compile script)
for json_file in "$RUST_TARGET_PATH"/*.json; do
    if [ -f "$json_file" ]; then
        json_name=$(basename "$json_file" .json)
        if [[ "$json_name" == "${OECORE_TARGET_ARCH}-"* ]]; then
            RUST_TARGET="$json_name"
            break
        fi
    fi
done

BINARY_PATH="avocado-cli/target/$RUST_TARGET/release/avocado"

if [ ! -f "$BINARY_PATH" ]; then
    echo "Error: Binary not found at $BINARY_PATH"
    exit 1
fi

# Install into the extension sysroot
install -D -m 755 "$BINARY_PATH" "$AVOCADO_BUILD_EXT_SYSROOT/usr/bin/avocado"
echo "Installed: $(file "$AVOCADO_BUILD_EXT_SYSROOT/usr/bin/avocado")"
```

The `$AVOCADO_BUILD_EXT_SYSROOT` variable points to the extension's build directory. Files installed here become part of the final extension image.

## Example: Building out-of-tree kernel modules

Kernel modules require special handling because they must be compiled against the exact kernel version running on the target. The v4l2loopback virtual video device module demonstrates this workflow.

### Extension configuration

```yaml
extensions:
  avocado-ext-kmod-v4l2loopback:
    version: '{{ avocado.distro.version }}'
    modprobe:
      - videodev
      - v4l2loopback

    packages:
      kernel-module-videodev: '*'
      v4l2loopback-module:
        compile: v4l2loopback-build
        install: v4l2loopback-install.sh

    sdk:
      packages:
        # Host tools for building
        nativesdk-binutils: '*'
        nativesdk-gcc: '*'
        nativesdk-glibc-dev: '*'
        nativesdk-libgcc-dev: '*'
        nativesdk-kmod: '*'
        nativesdk-make: '*'
        nativesdk-git: '*'
        # Required for kernel scripts (make modules_prepare)
        nativesdk-flex: '*'
        nativesdk-bison: '*'
        nativesdk-bc: '*'
        nativesdk-openssl-dev: '*'
        nativesdk-elfutils-dev: '*'
        # Cross-compiler toolchain
        packagegroup-cross-canadian-avocado-{{ avocado.target }}: '*'

sdk:
  compile:
    v4l2loopback-build:
      compile: v4l2loopback-compile.sh
      packages:
        # Kernel development sources for module compilation
        kernel-devsrc: '*'
```

Notable differences from application compilation:

- The `modprobe` section lists kernel modules to load when the extension is merged
- Additional host tools are needed for kernel build scripts (`flex`, `bison`, `bc`, `openssl-dev`, `elfutils-dev`)
- The `kernel-devsrc` package in the compile section provides kernel headers and build infrastructure

### Compile script

Building kernel modules requires preparing the kernel build system and using the kernel's Makefile:

```bash
#!/usr/bin/env bash
set -e

echo "Building v4l2loopback kernel module"

# Clone the module source if needed
if [ ! -d "v4l2loopback" ]; then
    git clone https://github.com/v4l2loopback/v4l2loopback.git
    cd v4l2loopback
    git checkout v0.13.2
else
    cd v4l2loopback
fi

# Determine kernel version from the target sysroot
KERNEL_VERSION=""
if [ -f "${OECORE_TARGET_SYSROOT}/usr/src/kernel/include/config/kernel.release" ]; then
    KERNEL_VERSION=$(cat "${OECORE_TARGET_SYSROOT}/usr/src/kernel/include/config/kernel.release")
fi

if [ -z "$KERNEL_VERSION" ]; then
    KERNEL_VERSION=$(ls "${OECORE_TARGET_SYSROOT}/lib/modules/" 2>/dev/null | head -n1)
fi

if [ -z "$KERNEL_VERSION" ]; then
    echo "ERROR: Could not determine kernel version"
    exit 1
fi

echo "Kernel version: $KERNEL_VERSION"

# Locate the kernel build directory
KDIR="${OECORE_TARGET_SYSROOT}/usr/lib/modules/${KERNEL_VERSION}/build"
if [ ! -d "$KDIR" ]; then
    KDIR="${OECORE_TARGET_SYSROOT}/usr/src/kernel"
fi

echo "Kernel build dir: $KDIR"

# Prepare kernel scripts if not already done
# The kernel-devsrc package includes sources but not compiled host binaries
if [ ! -x "$KDIR/scripts/mod/modpost" ]; then
    echo "Preparing kernel for module compilation..."

    # Find the SDK host compiler
    SDK_HOST_PREFIX="${AVOCADO_SDK_ARCH:-x86_64}-avocadosdk-linux"
    if [ -x "$OECORE_NATIVE_SYSROOT/usr/bin/${SDK_HOST_PREFIX}-gcc" ]; then
        HOST_GCC="$OECORE_NATIVE_SYSROOT/usr/bin/${SDK_HOST_PREFIX}-gcc"
    else
        HOST_GCC="gcc"
    fi

    # Build kernel host tools needed for module compilation
    make -C ${KDIR} \
        ARCH=${ARCH} \
        CROSS_COMPILE=${CROSS_COMPILE} \
        HOSTCC="${HOST_GCC}" \
        modules_prepare
fi

# Build the kernel module
echo "Building module..."
make -C ${KDIR} \
    M=$(pwd) \
    ARCH=${ARCH} \
    CROSS_COMPILE=${CROSS_COMPILE} \
    modules

echo "Build complete: $(pwd)/v4l2loopback.ko"
```

Key concepts for kernel module compilation:

- `$ARCH` and `$CROSS_COMPILE` are set by the SDK environment for the target architecture
- `kernel-devsrc` provides kernel sources but requires running `modules_prepare` to build host tools
- The `M=` parameter tells the kernel build system to build an out-of-tree module
- Host tools (`modpost`, etc.) must be built with the host compiler, not the cross-compiler

### Install script

Kernel modules must be installed to the correct path based on kernel version:

```bash
#!/usr/bin/env bash
set -e

# Determine kernel version
KDIR="${OECORE_TARGET_SYSROOT}/usr/src/kernel"
if [ -f "$KDIR/include/config/kernel.release" ]; then
    KERNEL_VERSION=$(cat "$KDIR/include/config/kernel.release")
elif [ -f "$KDIR/include/generated/utsrelease.h" ]; then
    KERNEL_VERSION=$(grep UTS_RELEASE "$KDIR/include/generated/utsrelease.h" | cut -d'"' -f2)
else
    echo "ERROR: Could not determine kernel version"
    exit 1
fi

# Install module to extension sysroot
MODULE_DIR="${AVOCADO_BUILD_EXT_SYSROOT}/usr/lib/modules/${KERNEL_VERSION}/extra"
install -d "$MODULE_DIR"
install -m 0644 v4l2loopback/v4l2loopback.ko "$MODULE_DIR/"

echo "Installed: $MODULE_DIR/v4l2loopback.ko"
```

When the extension is merged, Avocado automatically runs `depmod` to update module dependencies.

## Environment variables reference

The SDK environment provides these variables for cross-compilation scripts:

| Variable                     | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| `$OECORE_TARGET_SYSROOT`     | Target sysroot with headers and libraries              |
| `$SDKTARGETSYSROOT`          | Alias for `$OECORE_TARGET_SYSROOT`                     |
| `$OECORE_NATIVE_SYSROOT`     | SDK host sysroot with build tools                      |
| `$OECORE_TARGET_ARCH`        | Target architecture (e.g., `aarch64`, `x86_64`)        |
| `$ARCH`                      | Kernel architecture name                               |
| `$CROSS_COMPILE`             | Cross-compiler prefix (e.g., `aarch64-avocado-linux-`) |
| `$CC`, `$CXX`, `$LD`         | Cross-compiler binaries                                |
| `$RUST_TARGET_PATH`          | Directory containing Rust target specifications        |
| `$AVOCADO_BUILD_EXT_SYSROOT` | Extension sysroot for installing built artifacts       |
| `$AVOCADO_SDK_ARCH`          | SDK host architecture                                  |

## Workflow summary

1. **Define SDK packages** in `extensions.*.sdk.packages` for host build tools
2. **Define target sysroot packages** in `sdk.compile.*.packages` for headers and libraries
3. **Write a compile script** that uses SDK environment variables for cross-compilation
4. **Write an install script** that copies artifacts to `$AVOCADO_BUILD_EXT_SYSROOT`
5. **Build the extension** with `avocado build` or `avocado ext build --ext <name>`

The SDK handles container orchestration, package installation, and environment setup. Your scripts focus on the actual build logic for your specific codebase.

## What's next

- [Extensions reference](../references/extensions) for complete configuration options
- [Hardware-in-the-loop development](./hardware-in-the-loop) for testing compiled code on live devices
- [Sideloading updates](./sideloading) for deploying extensions to devices
