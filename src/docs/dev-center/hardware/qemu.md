# QEMU Virtual Machine

QEMU provides an excellent development and testing environment for Avocado OS without requiring physical hardware.

## Supported Architectures

- **ARM64** - Primary development target
- **x86_64** - Development and CI/CD testing

<!-- ## Reference Implementation

For detailed QEMU setup instructions, see:

- [QEMU ARM64 Reference Design](/integration/linux/reference-designs/qemu-arm64/overview) -->

## Use Cases

- **Development** - Code without physical hardware
- **CI/CD** - Automated testing pipelines
- **Demos** - Presentations and evaluations
- **Training** - Learning Peridio concepts

## Features

- Full Avocado OS compatibility
- OTA update simulation
- Network connectivity
- Remote access capabilities
- Container support

## Limitations

- No hardware-specific features (GPIO, etc.)
- Performance differs from real hardware
- Some drivers may not be available
- WireGuard tunnels require Linux host


## Getting Started

Get up and running with the Avocado Linux SDK in minutes.

### Prerequisites

- A Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine
- Docker installed
- 3GB+ available disk space

### Provisioning your device

1. Initialize your project

```bash
avocado init --target qemux86-64 avocado-qemu
cd avocado-qemu
```

2. Install all components (SDK, extensions, and runtime dependencies):

```bash
avocado install -f
```

3. Build all components

```bash
avocado build
```

4. Provision a runtime

```bash
avocado provision -r dev
```

5. Run virtual target

```bash
avocado sdk run -ie vm dev
```

You may log in using the username `root`, and will not be prompted for a password.