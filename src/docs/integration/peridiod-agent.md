# Peridio Daemon (peridiod)

The Peridio daemon (peridiod) is the on-device agent that handles OTA updates, remote access, and device communication with Peridio Core.

## Overview

Peridiod runs as a system service on Linux devices, providing:

- Secure communication with Peridio Cloud
- Atomic A/B update management
- Remote access tunnel establishment
- Device health reporting

## Getting Started

The fastest way to experience peridiod is through containerized devices:

```bash
pip install peridio-evk
peridio-evk devices-start --tag latest
```

## Installation

### Package Installation

```bash
# Debian/Ubuntu
wget -qO- https://packages.peridio.com/install.sh | bash
apt install peridiod

# RPM-based distributions
wget -qO- https://packages.peridio.com/install.sh | bash
yum install peridiod
```

### Container Deployment

```bash
docker run -d --name peridiod \
  --privileged \
  -v /boot:/boot \
  -v /data:/data \
  peridio/peridiod:latest
```

## Configuration

Peridiod uses a configuration file typically located at `/etc/peridiod/peridio.conf`:

```toml
[device]
identifier = "device-001"
product_name = "my-product"

[authentication]
certificate_path = "/etc/peridiod/cert.pem"
private_key_path = "/etc/peridiod/private_key.pem"

[server]
url = "https://api.peridio.com"
```

## Update Process

1. **Check** - Periodic polling for available updates
2. **Download** - Secure retrieval of update bundles
3. **Verify** - Cryptographic signature validation
4. **Apply** - Atomic installation to inactive partition
5. **Activate** - Reboot to new system image
6. **Confirm** - Health check and rollback protection

## Remote Access

Peridiod enables remote device access through:

- **Web Console** - Browser-based terminal access
- **SSH Tunnels** - Secure shell connections via WireGuard
- **Custom Services** - Application-specific remote access

## Reference Documentation

- [Peridiod Getting Started](/integration/guides/peridio-core-custom-integration/linux/peridiod/getting-started)
- [Configuration Reference](/integration/guides/peridio-core-custom-integration/linux/peridiod/configuration)
- [Update Process](/integration/guides/peridio-core-custom-integration/linux/peridiod/updates)
- [Container Deployment](/integration/guides/peridio-core-custom-integration/linux/peridiod/containers)
