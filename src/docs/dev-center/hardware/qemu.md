# QEMU Virtual Machine

QEMU provides an excellent development and testing environment for Avocado OS without requiring physical hardware.

## Supported Architectures

- **ARM64** - Primary development target
- **x86_64** - Development and CI/CD testing

## Quick Setup

Use the EVK for the fastest QEMU experience:

```bash
pip install peridio-evk
peridio-evk devices-start --tag latest
```

This launches containerized devices that simulate the QEMU environment.

## Reference Implementation

For detailed QEMU setup instructions, see:

- [QEMU ARM64 Reference Design](/integration/linux/reference-designs/qemu-arm64/overview)

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
