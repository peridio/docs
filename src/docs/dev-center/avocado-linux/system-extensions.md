---
title: System Extensions
description: Build, deploy, and manage modular system extensions in Avocado OS
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

System extensions are the cornerstone of Avocado OS's composable architecture. They allow you to add functionality to the base system without modifying the core image, enabling rapid development and clean separation of concerns.

## Understanding Extensions

### What Are System Extensions?

System extensions are self-contained packages that extend the functionality of Avocado OS. Each extension is:

**Characteristics:**
- **Modular** - Can be added or removed without affecting other components
- **Versioned** - Each extension has its own version lifecycle
- **Isolated** - Runs in a controlled environment with defined boundaries
- **Portable** - Works across different hardware platforms running Avocado OS

**Common Extension Types:**
- Device drivers and kernel modules
- System services and daemons
- Application frameworks and runtimes
- Hardware abstraction layers
- Network protocols and stacks
- Security modules and policies

### Extension Architecture

Every Avocado OS extension follows a standardized structure:

```
my-extension/
├── manifest.yaml          # Extension metadata and dependencies
├── bin/                   # Executable binaries
├── lib/                   # Shared libraries
├── etc/                   # Configuration files
├── hooks/                 # Lifecycle scripts
│   ├── pre-install.sh
│   ├── post-install.sh
│   ├── pre-remove.sh
│   └── post-remove.sh
└── docs/                  # Extension documentation
```

### Extension Manifest

The manifest defines your extension's metadata, dependencies, and requirements:

```yaml
# manifest.yaml
name: my-custom-extension
version: 1.2.0
description: Custom hardware support extension
author: Your Name
license: MIT

dependencies:
  - name: base-system
    version: ">=2.0.0"
  - name: networking-core
    version: ">=1.5.0"

provides:
  - capability: hardware.gpio
  - capability: hardware.i2c

requires:
  kernel: ">=5.15"
  arch: ["arm64", "armhf"]
  
resources:
  memory: 128M
  storage: 50M
```

## Creating Custom Extensions

### Development Setup

Start building your first extension:

```bash
# Create extension structure
avocado-ext create my-extension

# Navigate to extension directory
cd my-extension

# Initialize development environment
avocado-ext init
```

### Building a Simple Extension

Example: GPIO control extension for hardware interaction

```c
// src/gpio-control.c
#include <stdio.h>
#include <avocado/extension.h>
#include <avocado/gpio.h>

int extension_init(void) {
    printf("GPIO Control Extension v1.0 initializing...\n");
    
    // Register GPIO capabilities
    avocado_register_capability("hardware.gpio");
    
    // Initialize GPIO subsystem
    gpio_init();
    
    return 0;
}

int extension_cleanup(void) {
    gpio_cleanup();
    return 0;
}

AVOCADO_EXTENSION(gpio_control, "1.0.0", extension_init, extension_cleanup);
```

### Building and Packaging

Compile and package your extension:

```bash
# Build the extension
avocado-ext build

# Run tests
avocado-ext test

# Package for distribution
avocado-ext package --sign

# Output: my-extension-1.0.0.avx
```

### Testing Extensions Locally

Test your extension in a containerized environment:

```bash
# Start test environment
avocado-ext test-env

# Install extension in test environment
avocado-ext install my-extension-1.0.0.avx

# Verify installation
avocado-ext list
avocado-ext status my-extension

# Run integration tests
avocado-ext test --integration
```

## Extension Lifecycle Management

### Installation Process

Extensions go through a controlled installation process:

**Installation Steps:**
1. **Verification** - Signature and integrity checks
2. **Dependency Resolution** - Ensure all dependencies are met
3. **Pre-install Hooks** - Run preparation scripts
4. **File Deployment** - Copy files to appropriate locations
5. **Registration** - Register with system extension manager
6. **Post-install Hooks** - Run configuration scripts
7. **Activation** - Start services and load modules

```bash
# Install an extension
avocado-ext install my-extension.avx

# Install with specific options
avocado-ext install my-extension.avx \
  --verify-signature \
  --activate-now
```

### Runtime Management

Control extensions at runtime:

```bash
# Start/stop extension services
avocado-ext start my-extension
avocado-ext stop my-extension
avocado-ext restart my-extension

# Enable/disable auto-start
avocado-ext enable my-extension
avocado-ext disable my-extension

# View extension status
avocado-ext status my-extension
```

### Update and Rollback

Safely update extensions with automatic rollback on failure:

```bash
# Update to latest version
avocado-ext update my-extension

# Update to specific version
avocado-ext update my-extension --version 1.2.0

# Rollback to previous version
avocado-ext rollback my-extension

# View update history
avocado-ext history my-extension
```

### Removal Process

Clean removal with dependency checking:

```bash
# Remove extension
avocado-ext remove my-extension

# Force removal (bypass dependency checks)
avocado-ext remove my-extension --force

# Remove with data cleanup
avocado-ext remove my-extension --purge
```

## Debugging Extensions

### Debug Tools

Avocado OS provides comprehensive debugging tools for extension development:

**Available Tools:**
- `avocado-ext debug` - Interactive debugging session
- `avocado-ext trace` - System call tracing
- `avocado-ext profile` - Performance profiling
- `avocado-ext logs` - Centralized log viewing

### Common Debugging Workflows

**1. Interactive Debugging:**
```bash
# Start debug session
avocado-ext debug my-extension

# Attach to running extension
avocado-ext debug --attach my-extension

# Set breakpoints and watch variables
(gdb) break extension_init
(gdb) watch gpio_state
(gdb) continue
```

**2. Log Analysis:**
```bash
# View extension logs
avocado-ext logs my-extension

# Follow logs in real-time
avocado-ext logs -f my-extension

# Filter by log level
avocado-ext logs my-extension --level=error
```

**3. Performance Analysis:**
```bash
# Profile CPU usage
avocado-ext profile my-extension --cpu

# Analyze memory usage
avocado-ext profile my-extension --memory

# Generate flame graph
avocado-ext profile my-extension --flame-graph
```

### Troubleshooting Guide

**Common Issues and Solutions:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Extension fails to load | Missing dependencies | Run `avocado-ext deps my-extension` to check |
| Service crashes on start | Resource limits | Increase limits in manifest.yaml |
| Cannot access hardware | Missing capabilities | Add required capabilities to manifest |
| Performance degradation | Resource contention | Use profiling tools to identify bottlenecks |

### Debug Mode Features

Enable debug mode for detailed diagnostics:

```bash
# Enable debug mode globally
echo "DEBUG_MODE=1" >> /etc/avocado/config

# Enable for specific extension
avocado-ext set my-extension debug=true

# View debug information
avocado-ext info my-extension --debug
```

## Best Practices

**Development Guidelines:**
- Keep extensions focused on a single responsibility
- Document all public APIs and configuration options
- Include comprehensive error handling
- Write unit and integration tests
- Follow semantic versioning for releases

**Security Considerations:**
- Never hardcode credentials or secrets
- Validate all input data
- Use capability-based security model
- Sign extensions for production deployment
- Regular security audits and updates

## Next Steps

- [Build & Provisioning →](./build-provisioning) - Package and deploy your extensions