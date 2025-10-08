---
title: 'Hardware in the loop'
description: 'Hardware-in-the-loop (HITL) development for Avocado Linux - mount code directly into running devices via NFS for instant iteration and debugging.'
---

Hardware-in-the-loop (HITL) development enables rapid iteration on embedded systems by mounting code and configurations directly into running devices over NFS. This approach eliminates the traditional edit-compile-flash-boot cycle, allowing developers to achieve web development-like iteration speeds on embedded hardware.

## Overview

HITL leverages Avocado's extension system to mount development artifacts directly into a running target device (physical or virtual) via NFS. Changes made on the host development machine are immediately reflected on the target without requiring system rebuilds, reflashing, or reboots.

This development model provides:

- **Instant feedback loops** - Code changes appear immediately on the target
- **Interactive debugging** - Attach debuggers to live processes
- **Stateful iteration** - Modify running services without losing application state
- **Hardware-agnostic workflow** - Same process works on QEMU and physical devices

## Architecture

The HITL system consists of three main components:

### HITL server

Runs on the host development machine and serves extensions over NFS. Started with:

```bash
avocado hitl server -e my-extension
```

### Extension mount

Target device mounts the NFS share and overlays it onto the filesystem. Activated with:

```bash
avocadoctl hitl mount -e my-extension -s <host-ip>
```

### Live overlay

Extensions are mounted as overlay filesystems, allowing the immutable base system to remain unchanged while development artifacts are dynamically added.

## Supported targets

HITL works with any Avocado target that includes the `avocado-hitl` package:

- **QEMU virtual machines** - Fastest setup for initial development
- **Physical hardware** - All supported Avocado hardware platforms
- **Remote devices** - Any networked device with NFS client support

## Development workflow

1. **Create extension** - Define your application as a system or configuration extension
2. **Start HITL server** - Begin serving the extension over NFS from your host
3. **Mount on target** - Connect the running device to your development environment
4. **Iterate** - Make changes on host, test immediately on target
5. **Deploy** - Build final images using the same extension definitions

## Integration with extensions

HITL seamlessly integrates with Avocado's extension system:

- **System extensions (sysext)** - Mount application binaries and libraries to `/usr` and `/opt`
- **Configuration extensions (confext)** - Mount configuration files to `/etc`
- **Multiple extensions** - Mount several extensions simultaneously
- **Version management** - Switch between extension versions without device reboot

## Security considerations

HITL is designed for development environments and includes several security implications:

- **Network exposure** - NFS traffic is unencrypted and should be used on trusted networks
- **Filesystem permissions** - Mounted extensions run with host filesystem permissions
- **Development-only** - HITL should not be used in production environments
- **Firewall configuration** - Ensure appropriate network access controls

## Debugging capabilities

HITL enables advanced debugging workflows:

- **GDB integration** - Attach debuggers to running processes with live code updates
- **Log streaming** - Real-time log analysis with immediate code correlation
- **Performance profiling** - Profile running applications while iterating on code
- **Memory analysis** - Debug memory issues in live applications

## Best practices

### Project organization

- Structure extensions with clear separation of concerns
- Use consistent naming conventions for extensions and artifacts
- Maintain separate extensions for different application components

### Development environment

- Use dedicated development networks for HITL traffic
- Configure proper hostname resolution between host and target
- Set up automated testing pipelines that validate HITL changes

### Version control

- Track extension configurations in version control
- Use semantic versioning for extension releases
- Maintain separate branches for HITL development and production releases

## Common patterns

### Multi-Extension Development

```toml
# avocado.toml
[runtime.dev.dependencies]
frontend-app = { ext = "frontend-app" }
backend-api = { ext = "backend-api" }
database = { ext = "database" }
```

### Service hot reloading

```bash
# On target, restart specific services after code changes
systemctl restart my-application.service
```

### Configuration testing

```bash
# Mount configuration extension and test different settings
avocadoctl hitl mount -e config-testing -s 192.168.1.100
```

## Troubleshooting

### Common issues

**NFS Mount Failures**

- Verify network connectivity between host and target
- Check firewall rules for NFS ports (2049, 111, others)
- Ensure HITL server is running and serving the correct extension

**Permission Errors**

- Verify host filesystem permissions match target requirements
- Check that NFS export configuration allows appropriate access
- Ensure extension files have correct ownership and permissions

**Extension Not Visible**

- Confirm extension is properly built before starting HITL server
- Verify mount command uses correct extension name and host IP
- Check that systemd-sysext or systemd-confext services are running

### Debugging commands

```bash
# Check HITL server status
avocado hitl server --help

# Verify NFS exports on host
showmount -e localhost

# Check mounted filesystems on target
mount | grep nfs

# View extension status on target
systemctl status systemd-sysext
```

### Related documentation

- [Hardware-in-the-loop Guide](../guides/hardware-in-the-loop) - Step-by-step tutorial
- [Extensions Reference](./extensions) - Understanding system and configuration extensions
- [Avocado CLI HITL Commands](../tools/avocado-cli/commands/hitl/server) - Command-line reference
- [Development Workflow](../guides/getting-started) - Complete development process
