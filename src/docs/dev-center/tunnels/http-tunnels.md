# HTTP Tunnels

HTTP tunnels allow you to access web interfaces and HTTP services running on your devices through Peridio's infrastructure.

## Use Cases

- Access device web dashboards
- Debug REST APIs
- View device-hosted documentation
- Access local development servers
- Monitor web-based services

## Creating HTTP Tunnels

### Basic HTTP Tunnel (Port 80)

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 80
```

### HTTPS Tunnel (Port 443)

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 443
```

### Custom Web Application Port

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 8080
```

## Accessing HTTP Services

Once the tunnel is open, access the service via browser:

```
http://[server_tunnel_ip_address]:[server_tunnel_port]
```

Example:

```
http://3.82.23.99:47532
```

## Common Web Services

### Node-RED Dashboard

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 1880
```

Access: `http://server_ip:server_port/ui`

### Grafana Monitoring

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 3000
```

### Jupyter Notebook

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 8888
```

### Custom API Server

```bash
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 3001
```

## Using cURL with Tunnels

### Basic GET Request

```bash
curl http://server_ip:server_port/api/status
```

### POST Request with Data

```bash
curl -X POST http://server_ip:server_port/api/data \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

### Download Files

```bash
curl -O http://server_ip:server_port/logs/system.log
```

## Browser Configuration

### Proxy Configuration

Set up browser to use tunnel as proxy:

1. Create SSH tunnel with SOCKS proxy:

```bash
ssh -D 1080 user@server_ip -p server_port
```

2. Configure browser proxy:
   - Proxy Type: SOCKS5
   - Host: localhost
   - Port: 1080

### SSL/TLS Considerations

For HTTPS services with self-signed certificates:

```bash
# Accept self-signed certificate with curl
curl -k https://server_ip:server_port

# Download certificate
openssl s_client -connect server_ip:server_port \
  -servername hostname </dev/null | \
  openssl x509 > cert.pem
```

## Port Forwarding for Development

### Local Port Forward

Forward local port to access through localhost:

```bash
# Using SSH tunnel
ssh -L 8080:localhost:80 user@server_ip -p server_port

# Access via
# http://localhost:8080
```

### Multiple Service Access

Forward multiple web services:

```bash
ssh -L 8080:localhost:80 \
    -L 3000:localhost:3000 \
    -L 9090:localhost:9090 \
    user@server_ip -p server_port
```

## API Testing Through Tunnels

### Using Postman

1. Create tunnel to API port
2. Set base URL to `http://server_ip:server_port`
3. Configure authentication headers
4. Test API endpoints

### Automated Testing

```python
import requests
import time
import subprocess
import json

# Create tunnel
result = subprocess.run([
    'peridio', 'tunnels', 'create',
    '--device-prn', device_prn,
    '--device-tunnel-port', '8080',
    '--output', 'json'
], capture_output=True, text=True)

tunnel = json.loads(result.stdout)
tunnel_prn = tunnel['prn']

# Wait for tunnel to open
for _ in range(10):
    result = subprocess.run([
        'peridio', 'tunnels', 'get',
        '--prn', tunnel_prn,
        '--output', 'json'
    ], capture_output=True, text=True)

    status = json.loads(result.stdout)
    if status['state'] == 'open':
        base_url = f"http://{status['server_tunnel_ip_address']}:{status['server_tunnel_port']}"
        break
    time.sleep(3)

# Run tests
response = requests.get(f"{base_url}/api/health")
assert response.status_code == 200
```

## WebSocket Connections

WebSocket connections work through HTTP tunnels:

```javascript
const ws = new WebSocket(`ws://server_ip:server_port/ws`)

ws.onopen = () => {
  console.log('Connected to device WebSocket')
  ws.send('Hello Device')
}

ws.onmessage = (event) => {
  console.log('Received:', event.data)
}
```

## Security Best Practices

### Authentication

Always implement authentication for web services:

```nginx
# Nginx basic auth configuration
location / {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://localhost:8080;
}
```

### IP Restrictions

Limit access to specific IP ranges:

```nginx
location / {
    allow 10.0.0.0/8;
    deny all;
    proxy_pass http://localhost:8080;
}
```

### HTTPS with Let's Encrypt

For production devices, use proper SSL:

```bash
# On device
certbot certonly --standalone -d device.example.com
```

## Troubleshooting

### Connection Refused

- Verify web service is running: `curl http://localhost:port` on device
- Check service logs: `journalctl -u your-web-service`
- Verify firewall rules: `iptables -L`

### Slow Response Times

- Check device network connectivity
- Monitor device CPU/memory usage
- Consider caching static assets
- Enable compression in web server

### CORS Issues

Configure CORS headers on device web service:

```javascript
// Express.js example
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
```

## Performance Optimization

### Enable Compression

Nginx configuration:

```nginx
gzip on;
gzip_types text/plain application/json application/javascript text/css;
gzip_min_length 1000;
```

### Cache Static Assets

```nginx
location /static/ {
    expires 1h;
    add_header Cache-Control "public";
}
```

### Bandwidth Monitoring

Monitor tunnel bandwidth usage:

```bash
# On device
iftop -i tun0
vnstat -i tun0
```

## Next Steps

- [Security Best Practices](security.md) - Secure your HTTP tunnels
- [Troubleshooting](troubleshooting.md) - Common issues and solutions
- [API Reference](/admin-api#Tunnels) - Full API documentation
