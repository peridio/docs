# Tunnel Troubleshooting Guide

This guide helps diagnose and resolve common issues with Peridio tunnels.

## Common Issues

### Tunnel Stuck in "Created" State

**Symptoms:**
- Tunnel remains in "created" state after several minutes
- Never transitions to "open" state

**Possible Causes:**
1. Device is offline
2. Peridiod agent not running
3. Network connectivity issues
4. Firewall blocking outbound connections

**Solutions:**

Check device status:
```bash
peridio devices get --prn $DEVICE_PRN
```

Verify peridiod is running on device:
```bash
systemctl status peridiod
journalctl -u peridiod -n 50
```

Test outbound connectivity from device:
```bash
# On device
curl -v https://api.peridio.com
nc -zv tunnel.peridio.com 443
```

### Connection Refused

**Symptoms:**
- `ssh: connect to host x.x.x.x port xxxxx: Connection refused`
- Browser shows "Unable to connect"

**Possible Causes:**
1. Service not running on device
2. Wrong port specified
3. Firewall blocking connection

**Solutions:**

Verify service is running:
```bash
# For SSH
systemctl status sshd
netstat -tlnp | grep :22

# For HTTP service
netstat -tlnp | grep :80
curl http://localhost:80
```

Check firewall rules:
```bash
iptables -L -n
ufw status
```

### Authentication Failures

**Symptoms:**
- `Permission denied (publickey,password)`
- HTTP 401 Unauthorized errors

**Solutions:**

For SSH authentication:
```bash
# Check SSH configuration
grep -E "PasswordAuthentication|PubkeyAuthentication" /etc/ssh/sshd_config

# Verify user exists
id username

# Check authorized_keys permissions
ls -la ~/.ssh/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Tunnel Expires Too Quickly

**Symptoms:**
- Tunnel closes before work is complete
- Frequent reconnection needed

**Solutions:**

Request longer duration:
```bash
peridio tunnels create \
  --device-prn $DEVICE_PRN \
  --device-tunnel-port 22 \
  --expires-in 7200  # 2 hours
```

Keep connection alive:
```bash
# SSH keep-alive
ssh -o ServerAliveInterval=60 \
    -o ServerAliveCountMax=10 \
    user@server_ip -p server_port
```

### Slow Connection Performance

**Symptoms:**
- High latency
- Slow file transfers
- Timeouts

**Solutions:**

Check network metrics:
```bash
# Ping test
ping -c 10 server_ip

# Bandwidth test
iperf3 -c server_ip -p server_port

# MTU issues
ping -M do -s 1472 server_ip
```

Optimize SSH for slow connections:
```bash
ssh -C -o Compression=yes \
    -o CompressionLevel=9 \
    user@server_ip -p server_port
```

## Diagnostic Commands

### Device-Side Diagnostics

```bash
#!/bin/bash
# device-diagnostics.sh

echo "=== System Information ==="
uname -a
uptime

echo "=== Network Configuration ==="
ip addr show
ip route show
cat /etc/resolv.conf

echo "=== Peridiod Status ==="
systemctl status peridiod
journalctl -u peridiod -n 20

echo "=== Connection Test ==="
curl -v https://api.peridio.com/health
ping -c 3 8.8.8.8

echo "=== Firewall Status ==="
iptables -L -n
```

### Client-Side Diagnostics

```bash
#!/bin/bash
# client-diagnostics.sh

TUNNEL_PRN=$1

echo "=== Tunnel Information ==="
peridio tunnels get --prn $TUNNEL_PRN

echo "=== Network Path ==="
traceroute server_ip

echo "=== Port Connectivity ==="
nc -zv server_ip server_port

echo "=== DNS Resolution ==="
nslookup server_ip
```

## Error Messages

### "Device not found"

```bash
Error: Device with PRN prn:1:device:xxx not found
```

**Solution:**
- Verify device PRN is correct
- Check device exists: `peridio devices list`
- Ensure you have permissions for the device

### "Tunnel creation failed"

```bash
Error: Failed to create tunnel: Maximum tunnels exceeded
```

**Solution:**
- Close existing tunnels: `peridio tunnels delete --prn $TUNNEL_PRN`
- Check tunnel quota limits
- Wait for expired tunnels to close automatically

### "Network unreachable"

```bash
ssh: connect to host x.x.x.x port xxxxx: Network is unreachable
```

**Solution:**
- Check local network connectivity
- Verify DNS resolution
- Try using IP address directly

## Performance Optimization

### SSH Multiplexing

Reuse SSH connections:

```bash
# ~/.ssh/config
Host tunnel-*
    ControlMaster auto
    ControlPath ~/.ssh/cm-%r@%h:%p
    ControlPersist 10m
```

### Compression Settings

For slow connections:
```bash
# SSH compression
ssh -C user@server_ip -p server_port

# SCP with compression
scp -C -P server_port file.txt user@server_ip:/tmp/
```

### Buffer Tuning

Optimize TCP buffers:
```bash
# On device
echo 'net.core.rmem_max = 134217728' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 134217728' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_rmem = 4096 87380 134217728' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_wmem = 4096 65536 134217728' >> /etc/sysctl.conf
sysctl -p
```

## Debugging Tools

### Verbose SSH Connection

```bash
ssh -vvv user@server_ip -p server_port
```

### Network Packet Capture

```bash
# Capture tunnel traffic
tcpdump -i any -w tunnel.pcap host server_ip

# Analyze with Wireshark
wireshark tunnel.pcap
```

### Connection State Monitoring

```bash
# Monitor connection states
watch -n 1 'netstat -an | grep server_port'

# Track bandwidth usage
iftop -P -n -f "host server_ip"
```

## Recovery Procedures

### Stuck Tunnel Cleanup

```bash
#!/bin/bash
# cleanup-stuck-tunnels.sh

# Find tunnels older than 1 hour in created state
STUCK_TUNNELS=$(peridio tunnels list \
  --state created \
  --output json | \
  jq -r '.tunnels[] | 
    select(.created_at < (now - 3600)) | 
    .prn')

for tunnel in $STUCK_TUNNELS; do
    echo "Cleaning up stuck tunnel: $tunnel"
    peridio tunnels delete --prn $tunnel
done
```

### Device Recovery

If device becomes unresponsive:

1. Restart peridiod service:
```bash
systemctl restart peridiod
```

2. Clear peridiod cache:
```bash
rm -rf /var/cache/peridiod/*
systemctl restart peridiod
```

3. Re-register device if necessary:
```bash
peridiod --register --key device.key
```

## Getting Help

### Collecting Debug Information

When reporting issues, include:

```bash
# Create debug bundle
#!/bin/bash
DEBUG_DIR="tunnel-debug-$(date +%Y%m%d-%H%M%S)"
mkdir $DEBUG_DIR

# Collect tunnel info
peridio tunnels get --prn $TUNNEL_PRN > $DEBUG_DIR/tunnel.json

# Device info
peridio devices get --prn $DEVICE_PRN > $DEBUG_DIR/device.json

# Network diagnostics
traceroute server_ip > $DEBUG_DIR/traceroute.txt
ping -c 10 server_ip > $DEBUG_DIR/ping.txt

# Create archive
tar -czf $DEBUG_DIR.tar.gz $DEBUG_DIR/
echo "Debug bundle created: $DEBUG_DIR.tar.gz"
```

### Support Channels

- GitHub Issues: [Report bugs](https://github.com/peridio/support)
- Documentation: [Peridio Docs](https://docs.peridio.com)
- Community Forum: [Get help from the community](https://forum.peridio.com)

## Next Steps

- [Security Best Practices](security.md) - Prevent security issues
- [Getting Started](getting-started.md) - Basic setup guide
- [API Reference](/admin-api#Tunnels) - Complete API documentation