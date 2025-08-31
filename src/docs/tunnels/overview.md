# Overview

Tunnels provide secure remote access to your devices through Peridio's infrastructure. This section covers everything you need to know about establishing and managing remote connections to your fleet.

## What are Tunnels?

Tunnels expose your device via a public IP address and port, allowing you to securely connect to devices in the field without complex VPN setups or firewall configurations. They support various protocols including SSH, HTTP, and custom TCP connections.

## Key Features

- **Secure Connections**: All tunnel traffic is encrypted end-to-end
- **Asynchronous Creation**: Tunnels are created asynchronously and may take a few seconds to become available
- **Flexible Protocol Support**: SSH, HTTP, and custom TCP protocols
- **Time-Limited Access**: Tunnels automatically expire after a configured duration
- **Audit Trail**: All tunnel creation and access is logged for security compliance

## Common Use Cases

- Remote debugging and troubleshooting
- Device configuration and maintenance
- Log collection and diagnostics
- Development and testing
- Emergency access to production devices

## Architecture

Tunnels work by establishing a reverse connection from your device to Peridio's tunnel servers. When a tunnel is requested:

1. Peridio notifies the device through the existing connection
2. The device initiates an outbound connection to the tunnel server
3. The tunnel server assigns a public IP and port
4. Users can connect to the device through this public endpoint

This architecture works even when devices are behind NAT, firewalls, or cellular networks.

## Next Steps

- [Getting Started with Tunnels](getting-started.md) - Create your first tunnel
- [SSH Tunnels](ssh-tunnels.md) - Set up SSH access to your devices
- [HTTP Tunnels](http-tunnels.md) - Access web interfaces on your devices
- [Security Best Practices](security.md) - Secure your tunnel configurations
- [API Reference](/admin-api#tunnels) - Detailed API documentation
