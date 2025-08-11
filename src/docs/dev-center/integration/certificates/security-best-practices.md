# Security Best Practices

Essential security guidelines for certificate management in Peridio.

## Private Key Security

### Storage Requirements

#### Hardware Security Modules (HSM)
Highest security for production environments:
```bash
# PKCS#11 HSM integration
openssl req -new -keyform engine -engine pkcs11 \
  -key "pkcs11:token=HSM;object=device-key" \
  -out device.csr
```

Benefits:
- Keys never exist in plaintext
- Tamper-resistant hardware
- Cryptographic operations in secure boundary
- Audit logging of all operations

#### Trusted Platform Module (TPM)
Built-in security for embedded devices:
```bash
# TPM 2.0 key generation
tpm2_createprimary -C e -g sha256 -G rsa -c primary.ctx
tpm2_create -C primary.ctx -g sha256 -G rsa \
  -r device.priv -u device.pub
```

#### Secure File Storage
When hardware security isn't available:
```bash
# Encrypt private key
openssl rsa -aes256 -in device.key -out device.key.enc

# Set restrictive permissions
chmod 600 device.key
chown root:root device.key

# Store in protected directory
mv device.key /etc/peridio/private/
```

### Key Generation Best Practices

#### Entropy Requirements
```bash
# Check available entropy
cat /proc/sys/kernel/random/entropy_avail

# Use hardware RNG if available
openssl rand -engine rdrand -out random.dat 256

# Generate key with sufficient entropy
openssl genrsa -rand random.dat -out device.key 4096
```

#### Algorithm Selection
Recommended algorithms by use case:

| Use Case | Algorithm | Key Size | Notes |
|----------|-----------|----------|-------|
| General Purpose | RSA | 4096 bits | Wide compatibility |
| Embedded Devices | ECDSA | P-256 | Smaller keys/signatures |
| High Security | EdDSA | Ed25519 | Modern, fast |
| Legacy Systems | RSA | 2048 bits | Minimum acceptable |

### Access Control

#### Linux Permissions
```bash
# Certificate files (public)
chmod 644 /etc/peridio/certs/*.crt
chmod 755 /etc/peridio/certs/

# Private keys (restricted)
chmod 600 /etc/peridio/private/*.key
chmod 700 /etc/peridio/private/

# Service account only
chown peridiod:peridiod /etc/peridio/private/
```

#### Process Isolation
```systemd
# systemd service hardening
[Service]
User=peridiod
Group=peridiod
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes
NoNewPrivileges=yes
ReadWritePaths=/etc/peridio/
```

## Certificate Validation

### Chain Verification

#### Complete Chain Validation
```bash
# Verify full certificate chain
openssl verify -CAfile root-ca.crt \
  -untrusted intermediate-ca.crt \
  device.crt

# Check with CRL
openssl verify -crl_check_all \
  -CAfile ca-bundle.crt \
  -CRLfile crl.pem \
  device.crt
```

#### Pinning Strategies
```c
// Certificate pinning in application
const char* expected_ca_fingerprint = "SHA256:abcd1234...";

int verify_certificate(X509* cert) {
    // Get certificate fingerprint
    unsigned char fingerprint[EVP_MAX_MD_SIZE];
    unsigned int fingerprint_size;
    
    if (!X509_digest(cert, EVP_sha256(), 
                     fingerprint, &fingerprint_size)) {
        return -1;
    }
    
    // Compare with expected
    return memcmp(fingerprint, expected_ca_fingerprint, 
                  fingerprint_size);
}
```

### Revocation Checking

#### CRL Implementation
```bash
# Download and cache CRL
curl -o /etc/peridio/crl.pem \
  https://crl.peridio.com/ca.crl

# Configure automatic updates
cat > /etc/cron.d/update-crl <<EOF
0 */6 * * * root curl -o /etc/peridio/crl.pem https://crl.peridio.com/ca.crl
EOF
```

#### OCSP Configuration
```nginx
# NGINX OCSP stapling
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/peridio/ca-bundle.crt;
resolver 8.8.8.8 8.8.4.4 valid=300s;
```

## Rotation Policies

### Automated Rotation

#### Rotation Schedule
```yaml
# rotation-policy.yml
certificates:
  root_ca:
    validity: 20 years
    rotation_warning: 2 years
    
  intermediate_ca:
    validity: 5 years
    rotation_warning: 6 months
    
  device_certificates:
    validity: 1 year
    rotation_warning: 30 days
    auto_rotate: true
    
  signing_keys:
    validity: 2 years
    rotation_warning: 60 days
```

#### Zero-Downtime Rotation
```bash
#!/bin/bash
# Certificate rotation script

NEW_CERT="/etc/peridio/certs/device-new.crt"
NEW_KEY="/etc/peridio/private/device-new.key"
OLD_CERT="/etc/peridio/certs/device.crt"
OLD_KEY="/etc/peridio/private/device.key"

# Deploy new certificate
cp $NEW_CERT.tmp $NEW_CERT
cp $NEW_KEY.tmp $NEW_KEY

# Test new certificate
if peridio-test-auth --cert $NEW_CERT --key $NEW_KEY; then
    # Atomic switch
    mv $NEW_CERT $OLD_CERT.backup
    mv $NEW_KEY $OLD_KEY.backup
    mv $NEW_CERT $OLD_CERT
    mv $NEW_KEY $OLD_KEY
    
    # Reload service
    systemctl reload peridiod
else
    # Rollback
    rm $NEW_CERT $NEW_KEY
    exit 1
fi
```

## Monitoring and Auditing

### Certificate Monitoring

#### Expiration Tracking
```bash
#!/bin/bash
# Certificate expiration monitor

CERT_DIR="/etc/peridio/certs"
WARNING_DAYS=30

for cert in $CERT_DIR/*.crt; do
    if openssl x509 -checkend $((WARNING_DAYS * 86400)) \
                    -noout -in "$cert"; then
        echo "OK: $cert"
    else
        echo "WARNING: $cert expires soon"
        # Send alert
        notify-admin "Certificate $cert expiring"
    fi
done
```

#### Health Metrics
```python
# Prometheus metrics exporter
from prometheus_client import Gauge
import OpenSSL
import glob
import time

cert_expiry = Gauge('certificate_expiry_seconds', 
                   'Certificate expiration time',
                   ['filename', 'cn'])

def check_certificates():
    for cert_file in glob.glob('/etc/peridio/certs/*.crt'):
        with open(cert_file, 'r') as f:
            cert = OpenSSL.crypto.load_certificate(
                OpenSSL.crypto.FILETYPE_PEM, f.read()
            )
            
        # Get expiration time
        expiry = cert.get_notAfter().decode('ascii')
        expiry_time = time.mktime(
            time.strptime(expiry, '%Y%m%d%H%M%SZ')
        )
        
        # Get common name
        cn = cert.get_subject().CN
        
        # Set metric
        cert_expiry.labels(
            filename=cert_file,
            cn=cn
        ).set(expiry_time)
```

### Audit Logging

#### Comprehensive Logging
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "event": "certificate_issued",
  "details": {
    "certificate_id": "cert-abc123",
    "device_id": "device-001",
    "issuer": "intermediate-ca-01",
    "validity_days": 365,
    "key_algorithm": "ECDSA-P256",
    "requested_by": "user@example.com",
    "ip_address": "192.168.1.100"
  }
}
```

#### Log Retention
```bash
# Configure log rotation
cat > /etc/logrotate.d/peridio-certs <<EOF
/var/log/peridio/certificates.log {
    daily
    rotate 90
    compress
    delaycompress
    notifempty
    create 640 peridiod peridiod
    sharedscripts
    postrotate
        systemctl reload rsyslog
    endscript
}
EOF
```

## Emergency Procedures

### Incident Response

#### Key Compromise
1. **Immediate Actions**
   ```bash
   # Revoke compromised certificate
   peridio ca-certificates revoke $CERT_ID --reason key-compromise
   
   # Generate new certificate
   peridio device-certificates create --device-id $DEVICE_ID
   
   # Deploy via emergency channel
   peridio deployments create --emergency --cert-update
   ```

2. **Investigation**
   - Review audit logs
   - Identify affected devices
   - Determine compromise scope
   - Document timeline

3. **Recovery**
   - Deploy new certificates
   - Update CRL/OCSP
   - Monitor for misuse
   - Post-incident review

### Backup and Recovery

#### Key Backup
```bash
# Encrypted backup of CA keys
tar czf - /etc/peridio/ca-keys/ | \
  openssl enc -aes-256-cbc -salt -out ca-backup.tar.gz.enc

# Split for distributed storage
split -b 1M ca-backup.tar.gz.enc ca-backup-part-

# Store parts in separate locations
```

#### Recovery Procedures
```bash
# Reconstruct backup
cat ca-backup-part-* > ca-backup.tar.gz.enc

# Decrypt and restore
openssl enc -d -aes-256-cbc -in ca-backup.tar.gz.enc | \
  tar xzf - -C /
```

## Compliance Requirements

### Industry Standards

#### NIST Guidelines
- Use NIST-approved algorithms
- Minimum 2048-bit RSA or P-256 ECDSA
- Regular security assessments
- Documented key management practices

#### Common Criteria
- Formal security evaluation
- Protection profiles compliance
- Vulnerability assessment
- Penetration testing

### Documentation Requirements

#### Required Documentation
- Certificate Policy (CP)
- Certification Practice Statement (CPS)
- Key Management Plan
- Incident Response Plan
- Audit Procedures

#### Record Keeping
- Certificate issuance logs: 7 years
- Revocation records: Permanent
- Audit logs: 3 years
- Incident reports: 5 years

## Related Documentation

- [Certificate Types](./certificate-types)
- [Certificate Lifecycle](./certificate-lifecycle)
- [Creation Methods](./creation-methods)
- [CA Certificates Guide](/platform/guides/creating-ca-certificates)