# Certificate Creation Methods

Different approaches for generating certificates in Peridio.

## OpenSSL Method

Manual certificate creation using the OpenSSL toolkit.

### Prerequisites

```bash
# Install OpenSSL
apt-get install openssl        # Debian/Ubuntu
yum install openssl            # RHEL/CentOS
brew install openssl           # macOS
```

### Basic Certificate Creation

#### 1. Generate Private Key

```bash
# RSA key
openssl genrsa -out device.key 4096

# EC key (recommended for embedded devices)
openssl ecparam -name prime256v1 -genkey -out device.key
```

#### 2. Create Certificate Signing Request

```bash
# Interactive CSR creation
openssl req -new -key device.key -out device.csr

# Non-interactive with subject
openssl req -new -key device.key -out device.csr \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=device-001"
```

#### 3. Self-Signed Certificate (Testing)

```bash
openssl req -x509 -new -nodes \
  -key device.key \
  -sha256 -days 365 \
  -out device.crt
```

### CA-Signed Certificates

#### Create CA Certificate

```bash
# Generate CA key
openssl genrsa -out ca.key 4096

# Create CA certificate
openssl req -x509 -new -nodes \
  -key ca.key -sha256 -days 3650 \
  -out ca.crt \
  -subj "/C=US/O=MyOrg/CN=My Root CA"
```

#### Sign Device Certificate

```bash
# Sign CSR with CA
openssl x509 -req -in device.csr \
  -CA ca.crt -CAkey ca.key \
  -CAcreateserial \
  -out device.crt -days 365 \
  -sha256
```

### Advanced Configuration

#### OpenSSL Configuration File

```ini
# openssl.cnf
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = US
ST = State
L = City
O = Organization
CN = device-001

[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = clientAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = device-001.local
IP.1 = 192.168.1.100
```

#### Using Configuration File

```bash
openssl req -new -key device.key \
  -out device.csr \
  -config openssl.cnf
```

## Peridio Platform Method

Platform-managed certificate generation and lifecycle.

### Web Console

#### Certificate Wizard

1. Navigate to **Certificates** → **Create**
2. Select certificate type:
   - CA Certificate
   - Device Certificate
   - Signing Key
3. Configure parameters:
   - Validity period
   - Key algorithm
   - Subject attributes
4. Generate and download

#### Bulk Generation

1. Go to **Certificates** → **Bulk Create**
2. Upload device list (CSV)
3. Select template configuration
4. Generate batch
5. Download certificate bundle

### CLI Method

#### Install Peridio CLI

```bash
# Download and install
curl -L https://github.com/peridio/cli/releases/latest/download/peridio-linux-amd64 -o peridio
chmod +x peridio
sudo mv peridio /usr/local/bin/
```

#### Generate Certificates

```bash
# Create CA certificate
peridio ca-certificates create \
  --name "Production CA" \
  --validity-years 10

# Create device certificate
peridio device-certificates create \
  --device-id device-001 \
  --ca-certificate-id $CA_ID \
  --validity-days 365

# Create signing key
peridio signing-keys create \
  --name "Release Signing Key" \
  --algorithm RSA-4096
```

### API Method

#### REST API

```bash
# Create device certificate via API
curl -X POST https://api.peridio.com/v1/device-certificates \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "device-001",
    "ca_certificate_id": "ca-abc123",
    "validity_days": 365,
    "subject": {
      "common_name": "device-001",
      "organization": "MyOrg"
    }
  }'
```

#### SDK Integration

```python
# Python SDK example
from peridio import PeridioClient

client = PeridioClient(api_key="your-api-key")

# Create device certificate
cert = client.device_certificates.create(
    device_id="device-001",
    ca_certificate_id="ca-abc123",
    validity_days=365,
    subject={
        "common_name": "device-001",
        "organization": "MyOrg"
    }
)

print(f"Certificate ID: {cert.id}")
print(f"Certificate PEM: {cert.pem}")
```

## Automated Generation

### Just-in-Time Provisioning

#### Device-Side Generation

```bash
#!/bin/bash
# Device provisioning script

DEVICE_ID=$(cat /proc/cpuinfo | grep Serial | awk '{print $3}')
KEY_FILE="/etc/peridio/device.key"
CSR_FILE="/tmp/device.csr"
CRT_FILE="/etc/peridio/device.crt"

# Generate key if not exists
if [ ! -f "$KEY_FILE" ]; then
    openssl ecparam -name prime256v1 -genkey -out "$KEY_FILE"
fi

# Create CSR
openssl req -new -key "$KEY_FILE" -out "$CSR_FILE" \
    -subj "/CN=$DEVICE_ID"

# Submit to Peridio for signing
curl -X POST https://api.peridio.com/v1/jit-provision \
    -H "X-Device-ID: $DEVICE_ID" \
    -F "csr=@$CSR_FILE" \
    -o "$CRT_FILE"
```

#### Manufacturing Integration

```python
# Factory provisioning system
import subprocess
import requests

class DeviceProvisioner:
    def __init__(self, api_key, ca_id):
        self.api_key = api_key
        self.ca_id = ca_id

    def provision_device(self, serial_number):
        # Generate key pair
        key = self.generate_key()

        # Create CSR
        csr = self.create_csr(key, serial_number)

        # Submit to Peridio
        cert = self.sign_certificate(csr)

        # Flash to device
        self.flash_credentials(serial_number, key, cert)

        return cert

    def generate_key(self):
        # Key generation logic
        pass

    def create_csr(self, key, serial):
        # CSR creation logic
        pass

    def sign_certificate(self, csr):
        # API call to Peridio
        pass

    def flash_credentials(self, serial, key, cert):
        # Device programming logic
        pass
```

## Comparison Matrix

| Method               | Pros                           | Cons                           | Best For                        |
| -------------------- | ------------------------------ | ------------------------------ | ------------------------------- |
| **OpenSSL Manual**   | Full control, No dependencies  | Manual process, Error-prone    | Development, Testing            |
| **Web Console**      | User-friendly, Visual feedback | Manual process, Not scriptable | Small deployments               |
| **CLI**              | Scriptable, Reproducible       | Requires CLI setup             | Automation, CI/CD               |
| **API**              | Fully automated, Integrable    | Requires development           | Production, Scale               |
| **JIT Provisioning** | Scalable, Secure               | Complex setup                  | Manufacturing, Field deployment |

## Security Considerations

### Key Protection

- Never commit private keys to version control
- Use hardware security modules when available
- Implement key encryption at rest
- Rotate keys regularly

### Certificate Validation

```bash
# Verify certificate chain
openssl verify -CAfile ca.crt device.crt

# Check certificate details
openssl x509 -in device.crt -text -noout

# Validate key pair match
openssl x509 -noout -modulus -in device.crt | openssl md5
openssl rsa -noout -modulus -in device.key | openssl md5
```

### Automation Security

- Use secure channels for CSR submission
- Implement rate limiting
- Validate device identity before signing
- Audit all certificate operations

## Troubleshooting

### Common Issues

#### "Unable to load private key"

```bash
# Check key format
file device.key
# Convert if needed
openssl rsa -in device.key -out device-rsa.key
```

#### "Certificate verify failed"

```bash
# Check certificate chain
openssl verify -CAfile ca.crt -untrusted intermediate.crt device.crt
```

#### "CSR signature did not match"

```bash
# Verify CSR
openssl req -in device.csr -verify -noout
```

## Related Documentation

- [Certificate Types](./certificate-types)
- [X.509 with OpenSSL](/platform/guides/creating-x509-certificates-with-openssl)
- [X.509 with Peridio](/platform/guides/creating-x509-certificates-with-peridio)
- [CA Certificates Guide](/platform/guides/creating-ca-certificates)
