# SSH Tunnels

SSH tunnels provide secure shell access to your devices through Peridio's infrastructure. This guide covers SSH-specific configuration and best practices.

## Prerequisites

- SSH server running on your device (e.g., OpenSSH)
- Device configured to accept SSH connections
- SSH client on your local machine

## Creating an SSH Tunnel

### Basic SSH Tunnel

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 22
```

### Connect with SSH

Once the tunnel is open:

```bash
ssh username@server_ip -p server_port
```

## Advanced SSH Configuration

### Using SSH Config File

Add tunnel configuration to `~/.ssh/config`:

```
Host my-device-tunnel
    HostName 3.82.23.99
    Port 47532
    User root
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
```

Then connect with:
```bash
ssh my-device-tunnel
```

### SSH Key Authentication

Copy your public key to the device before creating the tunnel:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@device
```

Then connect through the tunnel without password:
```bash
ssh -i ~/.ssh/id_rsa user@server_ip -p server_port
```

### Port Forwarding Through SSH

Forward local ports through the SSH tunnel:

```bash
# Forward local port 8080 to device port 80
ssh -L 8080:localhost:80 user@server_ip -p server_port

# Forward multiple ports
ssh -L 8080:localhost:80 \
    -L 3306:localhost:3306 \
    user@server_ip -p server_port
```

### SOCKS Proxy

Create a SOCKS proxy through the tunnel:

```bash
ssh -D 1080 user@server_ip -p server_port
```

Configure applications to use `localhost:1080` as SOCKS proxy.

## SCP and SFTP

### Copy Files with SCP

Upload files to device:
```bash
scp -P server_port file.txt user@server_ip:/path/to/destination
```

Download files from device:
```bash
scp -P server_port user@server_ip:/path/to/file.txt ./
```

### SFTP Connection

```bash
sftp -P server_port user@server_ip
```

## SSH Tunnel Automation

### Shell Script Example

```bash
#!/bin/bash

DEVICE_PRN="prn:1:device:..."
MAX_WAIT=30
WAIT_INTERVAL=2

# Create tunnel
TUNNEL_RESPONSE=$(peridio tunnels create \
  --device-prn $DEVICE_PRN \
  --device-tunnel-port 22 \
  --output json)

TUNNEL_PRN=$(echo $TUNNEL_RESPONSE | jq -r '.prn')

# Poll for tunnel to open
elapsed=0
while [ $elapsed -lt $MAX_WAIT ]; do
  sleep $WAIT_INTERVAL
  
  STATUS=$(peridio tunnels get --prn $TUNNEL_PRN --output json)
  STATE=$(echo $STATUS | jq -r '.state')
  
  if [ "$STATE" = "open" ]; then
    IP=$(echo $STATUS | jq -r '.server_tunnel_ip_address')
    PORT=$(echo $STATUS | jq -r '.server_tunnel_port')
    
    echo "Connecting to $IP:$PORT"
    ssh root@$IP -p $PORT
    exit 0
  fi
  
  elapsed=$((elapsed + WAIT_INTERVAL))
  WAIT_INTERVAL=$((WAIT_INTERVAL * 2))
done

echo "Tunnel failed to open within $MAX_WAIT seconds"
exit 1
```

## Security Considerations

### SSH Hardening

On your devices, configure `/etc/ssh/sshd_config`:

```
# Disable root login
PermitRootLogin no

# Use key authentication only
PasswordAuthentication no
PubkeyAuthentication yes

# Limit users
AllowUsers myuser

# Change default port (update tunnel creation accordingly)
Port 2222
```

### Host Key Verification

For production use, maintain known hosts:

```bash
# Add device host key to known hosts
ssh-keyscan -p server_port server_ip >> ~/.ssh/known_hosts
```

### Session Recording

Record SSH sessions for audit:

```bash
ssh user@server_ip -p server_port | tee session-$(date +%Y%m%d-%H%M%S).log
```

## Troubleshooting SSH Tunnels

### Connection Timeout

```bash
# Increase connection timeout
ssh -o ConnectTimeout=30 user@server_ip -p server_port

# Keep connection alive
ssh -o ServerAliveInterval=60 user@server_ip -p server_port
```

### Permission Denied

- Verify SSH service is running: `systemctl status sshd`
- Check SSH logs: `journalctl -u sshd`
- Verify user exists and has shell access
- Check `/etc/ssh/sshd_config` for restrictions

### Host Key Changed

If you get "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED":

```bash
# Remove old host key
ssh-keygen -R "[server_ip]:server_port"

# Connect and accept new key
ssh user@server_ip -p server_port
```

## Best Practices

1. **Use Key Authentication**: Always prefer SSH keys over passwords
2. **Limit Tunnel Duration**: Request only the time needed
3. **Restrict User Access**: Use dedicated accounts with limited privileges
4. **Monitor Sessions**: Log and audit SSH access
5. **Regular Key Rotation**: Rotate SSH keys periodically
6. **Disable Unused Services**: Only run SSH when needed

## Integration with CI/CD

Example GitHub Actions workflow:

```yaml
- name: Create SSH Tunnel
  run: |
    TUNNEL_PRN=$(peridio tunnels create \
      --device-prn ${{ secrets.DEVICE_PRN }} \
      --device-tunnel-port 22 \
      --output json | jq -r '.prn')
    echo "TUNNEL_PRN=$TUNNEL_PRN" >> $GITHUB_ENV

- name: Wait for Tunnel
  run: |
    # Wait for tunnel to open
    ./scripts/wait-for-tunnel.sh $TUNNEL_PRN

- name: Deploy via SSH
  run: |
    ssh -o StrictHostKeyChecking=no \
        user@$TUNNEL_IP -p $TUNNEL_PORT \
        "cd /app && git pull && systemctl restart app"
```

## Next Steps

- [HTTP Tunnels](http-tunnels.md) - Web interface access
- [Security Best Practices](security.md) - Secure your SSH tunnels
- [Troubleshooting](troubleshooting.md) - Common issues and solutions