---
title: 🚧 Using Containers
description: Container runtime and orchestration on Avocado OS
---

# 🚧 Using Containers

:::info Under Construction
This page is currently being developed. Check back soon for comprehensive documentation on using containers with Avocado OS.
:::

## Coming Soon

This guide will cover:

### Container Runtimes
- **Podman**: Rootless container management
- **Docker**: Traditional container runtime
- **containerd**: Lightweight runtime for embedded
- **crun**: OCI-compliant runtime optimized for embedded

### Getting Started with Containers
```bash
# Example commands (coming soon)
avocado-repo sysext install podman
systemctl enable --now podman.socket
podman run --rm hello-world
```

### Container Image Management
- Building images for embedded targets
- Multi-architecture image support
- Image optimization for constrained devices
- Local registry setup
- Air-gapped deployments

### Container Orchestration
- **Podman pods**: Multi-container applications
- **systemd integration**: Containers as services
- **K3s**: Lightweight Kubernetes for edge
- **Docker Compose**: Application stacks

### Embedded-Specific Considerations
- Resource constraints and limits
- Storage management on eMMC/SD cards
- Network configuration for embedded
- Hardware access from containers
- Real-time considerations

### Security
- Rootless containers
- SELinux/AppArmor integration
- Container signing and verification
- Network policies
- Secret management

### OTA Updates with Containers
- Container image updates via Peridio
- Application versioning strategies
- Rollback mechanisms
- Blue-green deployments
- Canary releases

### Use Cases
- **Edge AI**: Running ML models in containers
- **Industrial IoT**: Isolated application environments
- **Multi-tenancy**: Running customer workloads
- **Development**: Consistent dev/prod environments

### Performance Optimization
- Container startup optimization
- Memory and CPU tuning
- Storage driver selection
- Network performance tuning
- GPU acceleration in containers

## Example Workflows

### Running an Application Container
```bash
# Coming soon: Complete example
podman pull myapp:latest
podman run -d --name myapp \
  --restart=always \
  --memory=512m \
  --cpus=1 \
  myapp:latest
```

### Container as a systemd Service
```ini
# Coming soon: systemd unit file example
[Unit]
Description=My Container Application
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/podman run ...
Restart=always

[Install]
WantedBy=multi-user.target
```

## Prerequisites (Planned)

- Avocado OS with container runtime
- Understanding of container concepts
- Network connectivity for image pulls
- Sufficient storage for images

## Quick Links

While this page is under construction, you may find these resources helpful:

- [Getting Started with Avocado OS](./getting-started)
- [Building System Extensions](./building-system-extensions)
- [Development Environment](./development-environment)

## Get Notified

Want to be notified when this documentation is complete? [Contact our team](mailto:support@peridio.com) to express interest in container features.

## Contributing

Have experience with containers on embedded Linux? We welcome contributions to this documentation. Please [submit a pull request](https://github.com/peridio/peridio-docs) or [open an issue](https://github.com/peridio/peridio-docs/issues) with your suggestions.