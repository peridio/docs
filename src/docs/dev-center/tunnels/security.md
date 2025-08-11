# Tunnel Security Best Practices

This guide covers security considerations and best practices for using Peridio tunnels in production environments.

## Authentication and Authorization

### Device-Side Authentication

Always implement proper authentication on your devices:

#### SSH Key-Only Authentication

```bash
# /etc/ssh/sshd_config
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

#### Web Service Authentication

Implement authentication for HTTP services:

```javascript
// Express.js middleware example
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!verifyToken(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

app.use('/api', authenticate);
```

### Role-Based Access Control

Implement RBAC for tunnel creation:

```javascript
// Check user permissions before creating tunnel
const canCreateTunnel = (user, device) => {
    return user.role === 'admin' || 
           user.devices.includes(device.id);
};
```

## Network Security

### Firewall Configuration

Configure device firewalls to limit exposed services:

```bash
# iptables rules
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT
iptables -A INPUT -j DROP
```

### VPN Integration

For additional security, combine tunnels with VPN:

```yaml
# WireGuard configuration
[Interface]
PrivateKey = device_private_key
Address = 10.0.0.2/24

[Peer]
PublicKey = server_public_key
Endpoint = vpn.peridio.com:51820
AllowedIPs = 10.0.0.0/24
```

## Encryption

### TLS/SSL for HTTP Services

Always use HTTPS for sensitive data:

```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/device.crt;
    ssl_certificate_key /etc/ssl/private/device.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}
```

### SSH Hardening

Use strong SSH configurations:

```bash
# /etc/ssh/sshd_config
Protocol 2
HostKey /etc/ssh/ssh_host_ed25519_key
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org
```

## Access Control

### Time-Limited Access

Always set appropriate expiration times:

```bash
# Create tunnel with 15-minute expiration
peridio tunnels create \
  --device-prn $DEVICE_PRN \
  --device-tunnel-port 22 \
  --expires-in 900
```

### IP Whitelisting

Restrict tunnel access to specific IP addresses:

```python
# Device-side IP filtering
ALLOWED_IPS = ['192.168.1.0/24', '10.0.0.0/8']

def is_ip_allowed(client_ip):
    for allowed_range in ALLOWED_IPS:
        if ipaddress.ip_address(client_ip) in ipaddress.ip_network(allowed_range):
            return True
    return False
```

### Session Management

Implement session timeouts and limits:

```bash
# SSH session limits
# /etc/ssh/sshd_config
ClientAliveInterval 300
ClientAliveCountMax 2
MaxSessions 2
MaxStartups 2:30:10
```

## Audit and Monitoring

### Logging

Enable comprehensive logging:

```bash
# SSH logging
# /etc/ssh/sshd_config
LogLevel VERBOSE
SyslogFacility AUTH

# Application logging
import logging
logging.basicConfig(
    filename='/var/log/tunnel-access.log',
    level=logging.INFO,
    format='%(asctime)s - %(message)s'
)
```

### Activity Monitoring

Monitor tunnel activity:

```python
import subprocess
import json
from datetime import datetime

def log_tunnel_access(tunnel_prn):
    result = subprocess.run([
        'peridio', 'tunnels', 'get',
        '--prn', tunnel_prn,
        '--output', 'json'
    ], capture_output=True, text=True)
    
    tunnel_info = json.loads(result.stdout)
    
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'tunnel_prn': tunnel_prn,
        'device': tunnel_info['device_prn'],
        'user': tunnel_info['created_by'],
        'ip_address': tunnel_info['server_tunnel_ip_address'],
        'port': tunnel_info['server_tunnel_port']
    }
    
    with open('/var/log/tunnel-audit.json', 'a') as f:
        f.write(json.dumps(log_entry) + '\n')
```

### Intrusion Detection

Implement basic intrusion detection:

```bash
# Monitor failed authentication attempts
#!/bin/bash
THRESHOLD=5
LOGFILE="/var/log/auth.log"

failed_attempts=$(grep "Failed password" $LOGFILE | \
    grep "$(date '+%b %d')" | \
    wc -l)

if [ $failed_attempts -gt $THRESHOLD ]; then
    echo "Alert: $failed_attempts failed login attempts detected"
    # Send alert to monitoring system
fi
```

## Secure Configuration

### Environment Variables

Never hardcode credentials:

```python
import os

# Good
api_key = os.environ.get('PERIDIO_API_KEY')

# Bad
api_key = 'sk_live_abcd1234'
```

### Configuration Management

Use secure configuration files:

```yaml
# config.yml
tunnel:
  max_duration: 3600
  allowed_ports: [22, 443]
  require_mfa: true
  audit_log: true
```

### Secrets Management

Use proper secrets management:

```bash
# Store secrets securely
echo "secret_value" | \
  openssl enc -aes-256-cbc -salt -out secret.enc

# Retrieve secrets
openssl enc -d -aes-256-cbc -in secret.enc
```

## Incident Response

### Emergency Tunnel Termination

Script for emergency tunnel closure:

```bash
#!/bin/bash
# emergency-close-tunnels.sh

# List all open tunnels
TUNNELS=$(peridio tunnels list --state open --output json | \
    jq -r '.tunnels[].prn')

# Close all tunnels
for tunnel in $TUNNELS; do
    echo "Closing tunnel: $tunnel"
    peridio tunnels delete --prn $tunnel
done
```

### Security Checklist

Before enabling tunnels in production:

- [ ] SSH key authentication configured
- [ ] Firewall rules in place
- [ ] TLS/SSL certificates installed
- [ ] Logging enabled
- [ ] Monitoring configured
- [ ] Incident response plan documented
- [ ] Regular security audits scheduled
- [ ] Access controls implemented
- [ ] Secrets properly managed
- [ ] Backup authentication methods available

## Compliance Considerations

### Data Protection

- Ensure tunnel usage complies with GDPR, CCPA, and other regulations
- Implement data retention policies for tunnel logs
- Encrypt sensitive data in transit and at rest

### Access Audit Trail

Maintain detailed audit logs for compliance:

```json
{
  "event": "tunnel_created",
  "timestamp": "2024-01-15T10:30:00Z",
  "user": "john.doe@company.com",
  "device": "prn:1:device:abc123",
  "purpose": "Debugging production issue #1234",
  "approved_by": "jane.smith@company.com",
  "duration": 900,
  "ip_address": "203.0.113.45"
}
```

## Security Tools Integration

### Integration with SIEM

Forward tunnel logs to your SIEM:

```bash
# rsyslog configuration
*.* @@siem.company.com:514
```

### Vulnerability Scanning

Regular security scanning:

```bash
# Scan exposed services
nmap -sV -p- server_ip

# Check for vulnerabilities
nikto -h http://server_ip:server_port
```

## Next Steps

- [Troubleshooting](troubleshooting.md) - Common security issues
- [API Reference](/admin-api#Tunnels) - API security features
- [Getting Started](getting-started.md) - Basic tunnel setup