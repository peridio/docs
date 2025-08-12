# Getting Started with Tunnels

This guide will walk you through creating and connecting to your first tunnel.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases) (v0.22.1 or later)
- A device registered with Peridio
- Device running peridiod agent with tunnel support enabled

## Creating Your First Tunnel

### Step 1: Create a Tunnel

Use the Peridio CLI to create a tunnel to your device:

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 22
```

This creates a tunnel that will forward connections to port 22 (SSH) on your device.

### Step 2: Check Tunnel Status

Tunnels are created asynchronously. Check if your tunnel is ready:

```bash
peridio tunnels get \
  --prn $PERIDIO_TUNNEL_PRN
```

Look for the `state` field in the response:

```json
{
  "prn": "prn:1:tunnel:...",
  "state": "open",
  "server_tunnel_ip_address": "3.82.23.99",
  "server_tunnel_port": 47532,
  "device_tunnel_port": 22,
  "expires_at": "2024-01-15T10:30:00Z"
}
```

The tunnel is ready when `state` is `"open"`.

### Step 3: Connect to Your Device

Once the tunnel is open, connect using the provided IP address and port:

```bash
ssh user@3.82.23.99 -p 47532
```

Replace `user` with the appropriate username for your device.

## Polling for Tunnel Status

Since tunnel creation is asynchronous, you may need to poll for status. Here's a recommended approach:

1. Wait 2-3 seconds after creation before first check
2. Use exponential backoff for subsequent checks
3. Stop after 30 seconds total elapsed time

Example polling strategy:

- First check: 2 seconds after creation
- Second check: 4 seconds after first check
- Third check: 9 seconds after second check
- Continue with formula: `(attempt + 2)²` seconds

## Common Connection Types

### SSH Access

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 22
```

### HTTP/Web Interface

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 80
```

Then access via browser: `http://[server_tunnel_ip_address]:[server_tunnel_port]`

### Custom Application

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 8080
```

## Tunnel Lifecycle

1. **Created**: Initial state, tunnel is being established
2. **Opening**: Device is connecting to tunnel server
3. **Open**: Tunnel is ready for connections
4. **Closing**: Tunnel is being terminated
5. **Closed**: Tunnel has been terminated

Tunnels automatically close after:

- The configured expiration time (default: 1 hour)
- Manual termination via API
- Device disconnection

## Troubleshooting

### Tunnel Stays in "Created" State

- Verify the device is online and connected to Peridio
- Check that peridiod has tunnel support enabled
- Ensure the device can make outbound connections

### Connection Refused

- Verify the service is running on the specified port on the device
- Check device firewall rules
- Ensure the tunnel is in "open" state

### Tunnel Expires Too Quickly

- Request longer duration when creating tunnel
- Keep activity on the connection to prevent idle timeout

## Next Steps

- [SSH Tunnels](ssh-tunnels.md) - Advanced SSH configuration
- [Security Best Practices](security.md) - Secure your tunnels
- [API Reference](/admin-api#Tunnels) - Full API documentation
