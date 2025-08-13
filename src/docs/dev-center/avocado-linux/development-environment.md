---
title: Development Environment
description: Set up and configure your Avocado OS development environment for building, testing, and deploying embedded Linux systems
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

The Avocado OS development environment provides everything you need to build, test, and deploy embedded Linux systems. From SDK installation to live development workflows, this guide covers the complete development setup.

## SDK Installation & Setup

### Prerequisites

Before installing the Avocado SDK, ensure your development machine meets these requirements:

**System Requirements:**
- Linux development machine (Ubuntu 22.04+, Fedora 39+, or compatible distribution)
- Podman or Docker installed and configured
- Minimum 20GB available disk space (50GB recommended for full builds)
- 8GB RAM minimum (16GB recommended)
- Internet connection for downloading images and packages

**Software Dependencies:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y podman git curl build-essential

# Fedora/RHEL
sudo dnf install -y podman git curl make gcc gcc-c++

# Arch Linux
sudo pacman -S podman git curl base-devel
```

### Quick Start Installation

Get started with Avocado OS development in minutes:

```bash
# Pull the latest SDK container
podman pull avocadolinux/sdk:apollo-edge

# Create workspace directory
mkdir -p ~/avocado-workspace/<target>
cd ~/avocado-workspace/<target>

# Start the development environment
podman run -it --rm \
  -e AVOCADO_SDK_TARGET=<target> \
  -v $(pwd):/opt:z \
  --entrypoint entrypoint.sh \
  avocadolinux/sdk:apollo-edge /bin/bash
```

Replace `<target>` with your target platform from the supported list below.

### Supported Target Platforms

Avocado OS supports a wide range of hardware platforms. Set the `AVOCADO_SDK_TARGET` environment variable to one of these targets:

**ARM-based Platforms:**
- `imx91-frdm` - NXP FRDM i.MX 91 Development Board
- `imx93-evk` - NXP i.MX 93 Evaluation Kit
- `imx93-frdm` - NXP FRDM i.MX 93 Development Board
- `jetson-orin-nano-devkit-nvme` - NVIDIA Jetson Orin Nano Super
- `raspberrypi4` - Raspberry Pi 4 Model B
- `reterminal` - Seeed reTerminal

**x86-based Platforms:**
- `qemux86-64` - QEMU x86-64 Virtual Machine (ideal for testing)

## Cross-compilation Toolchain

### Toolchain Components

The Avocado SDK includes a complete cross-compilation toolchain optimized for your target platform:

**Included Tools:**
- GCC cross-compiler with C/C++ support
- GNU binutils for target architecture
- Yocto SDK with sysroot
- CMake and autotools support
- pkg-config for dependency management
- Debugging tools (GDB, strace, perf)

### Environment Configuration

The SDK automatically configures your build environment when you enter the container:

```bash
# Inside the SDK container, verify toolchain setup
echo $CC                    # Shows cross-compiler
echo $SDKTARGETSYSROOT      # Shows target sysroot path
$CC --version               # Verify compiler version
```

### Building Applications

Example of cross-compiling a simple application:

```bash
# Create a test application
cat > hello.c << 'EOF'
#include <stdio.h>
int main() {
    printf("Hello from Avocado OS!\n");
    return 0;
}
EOF

# Compile for target
$CC hello.c -o hello

# Verify binary architecture
file hello
```

## Live Development Workflow

### Development Modes

Avocado OS supports multiple development workflows to match your needs:

**1. Container-based Development**
- Develop and test in isolated containers
- Fast iteration without affecting system
- Ideal for application development

**2. Extension Development**
- Build and test system extensions
- Hot-reload capabilities for rapid testing
- Direct hardware access when needed

**3. Full System Development**
- Complete system image builds
- Kernel and bootloader modifications
- Production-ready image creation

### Live Reload Setup

Enable live development with automatic reload on changes:

```bash
# Mount your development directory
podman run -it --rm \
  -v ~/my-project:/workspace:z \
  -v /dev:/dev \
  --privileged \
  avocadolinux/sdk:apollo-edge

# Inside container, use inotify for auto-reload
avocado-dev watch /workspace/src
```

### Remote Development

Connect to devices running Avocado OS for remote development:

```bash
# SSH into your Avocado device
ssh root@<device-ip>

# Mount development folder over SSHFS
sshfs user@dev-machine:/path/to/project /mnt/dev

# Or use VS Code Remote Development
code --remote ssh-remote+<device-ip> /path/to/project
```

## Container Environment Configuration

### SDK Container Customization

Extend the base SDK container with your tools and dependencies:

```dockerfile
# Create custom SDK Dockerfile
FROM avocadolinux/sdk:apollo-edge

# Add custom tools
RUN apt-get update && apt-get install -y \
    vim \
    tmux \
    python3-pip

# Add project dependencies
COPY requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt

# Set custom environment
ENV MY_PROJECT_ROOT=/workspace
WORKDIR /workspace
```

Build and use your custom SDK:

```bash
podman build -t my-avocado-sdk .
podman run -it --rm -v $(pwd):/workspace:z my-avocado-sdk
```

### Persistent Development Environment

Create a persistent development environment that maintains state between sessions:

```bash
# Create named volume for persistent data
podman volume create avocado-dev-data

# Run with persistent volume
podman run -it --rm \
  -v avocado-dev-data:/home/developer \
  -v $(pwd):/workspace:z \
  avocadolinux/sdk:apollo-edge

# Your tools, configs, and build cache persist between sessions
```

### Resource Configuration

Optimize container resources for your development needs:

```bash
# Run with specific resource limits
podman run -it --rm \
  --memory="4g" \
  --cpus="2" \
  --shm-size="2g" \
  -v $(pwd):/opt:z \
  avocadolinux/sdk:apollo-edge
```

## Extension Image Build Pipeline

The SDK streamlines the process of building system extensions:

![Extension Image Build Pipeline](/img/dev-center/avocado-linux/sdk-container.png)

**Build Pipeline Stages:**
1. Source preparation and dependency resolution
2. Cross-compilation for target architecture
3. Package creation with metadata
4. Signature generation for secure boot
5. Integration testing in container
6. Deployment to target device

## Next Steps

- [System Extensions →](./system-extensions) - Build your first extension
