# Certificate Lifecycle

Managing certificates throughout their operational lifetime.

## Lifecycle Phases

### 1. Generation

The initial creation of certificates and keys.

#### Planning

- Define certificate hierarchy
- Determine validity periods
- Choose key algorithms
- Plan naming conventions

#### Key Generation

```bash
# Generate private key
openssl genrsa -out private.key 4096

# Generate EC private key
openssl ecparam -name prime256v1 -genkey -out ec-private.key
```

#### CSR Creation

```bash
# Create certificate signing request
openssl req -new -key private.key -out device.csr \
  -subj "/C=US/O=MyOrg/CN=device-001"
```

### 2. Signing

Issuing certificates from certificate authorities.

#### CA Signing

```bash
# Sign certificate with CA
openssl x509 -req -in device.csr \
  -CA intermediate-ca.crt \
  -CAkey intermediate-ca.key \
  -CAcreateserial \
  -out device.crt \
  -days 365
```

#### Validation

- Verify certificate chain
- Check certificate attributes
- Validate extensions
- Test authentication

### 3. Deployment

Installing certificates on target devices.

#### Deployment Methods

- **Pre-provisioning** - Install during manufacturing
- **Just-in-Time** - Generate during first boot
- **Field Update** - Deploy via OTA update
- **Manual Installation** - Direct file transfer

#### Storage Locations

```bash
# Common certificate locations
/etc/ssl/certs/          # System certificates
/etc/peridio/certs/      # Peridio certificates
/data/certs/             # Application certificates
```

#### Permissions

```bash
# Secure certificate files
chmod 644 device.crt     # Certificate readable
chmod 600 device.key     # Private key protected
chown root:root *.crt *.key
```

### 4. Monitoring

Tracking certificate status and health.

#### Expiration Monitoring

```bash
# Check certificate expiration
openssl x509 -in device.crt -noout -enddate

# Days until expiration
openssl x509 -in device.crt -noout -checkend 2592000
```

#### Health Checks

- Certificate expiration warnings
- Revocation list updates
- Chain validation status
- Usage statistics

#### Alerting

Set up alerts for:

- Certificates expiring in 30/60/90 days
- Revocation list updates
- Failed authentication attempts
- Certificate errors

### 5. Rotation

Replacing certificates before expiration.

#### Rotation Strategy

- **Scheduled** - Regular rotation intervals
- **Triggered** - Based on events or policies
- **Emergency** - Immediate replacement

#### Rotation Process

1. Generate new certificate
2. Deploy to device
3. Verify new certificate works
4. Switch to new certificate
5. Remove old certificate

#### Zero-Downtime Rotation

```bash
# Deploy new certificate alongside old
cp new-device.crt /etc/peridio/certs/device-new.crt

# Update configuration to use new cert
sed -i 's/device.crt/device-new.crt/' /etc/peridio/config

# Restart service
systemctl reload peridiod

# Remove old certificate
rm /etc/peridio/certs/device.crt
```

### 6. Revocation

Handling compromised or invalid certificates.

#### Revocation Triggers

- Private key compromise
- Device decommissioning
- Security policy violation
- Certificate misuse

#### Revocation Methods

- **Certificate Revocation List (CRL)**
  - Periodic list updates
  - Cached locally on devices
  - Batch revocation support

- **Online Certificate Status Protocol (OCSP)**
  - Real-time status checks
  - Lower bandwidth usage
  - Individual certificate queries

#### Revocation Process

```bash
# Add certificate to revocation list
openssl ca -revoke device.crt -config ca.conf

# Generate new CRL
openssl ca -gencrl -out crl.pem -config ca.conf

# Distribute CRL to devices
peridio deployments create --crl crl.pem
```

## Lifecycle Automation

### Platform Features

Peridio provides automated lifecycle management:

- Automatic expiration monitoring
- Scheduled rotation workflows
- Integrated revocation management
- Audit logging and compliance

### API Integration

```bash
# Check certificate status
peridio device-certificates get $CERT_ID

# Rotate certificate
peridio device-certificates rotate $DEVICE_ID

# Revoke certificate
peridio device-certificates revoke $CERT_ID
```

## Best Practices

### Planning

- Design for rotation from the start
- Use shorter validity periods for higher security
- Implement monitoring before deployment
- Document procedures and policies

### Operations

- Automate routine tasks
- Test rotation procedures regularly
- Maintain revocation capability
- Keep audit logs

### Security

- Protect private keys at all stages
- Use secure communication for deployment
- Implement defense in depth
- Regular security reviews

## Common Challenges

### Challenge: Mass Rotation

**Solution**: Implement staged rollout with canary deployments

### Challenge: Offline Devices

**Solution**: Use longer validity periods with CRL caching

### Challenge: Emergency Revocation

**Solution**: Maintain hot-standby replacement certificates

### Challenge: Chain Updates

**Solution**: Deploy new chains before old ones expire

## Related Documentation

- [Certificate Types](./certificate-types)
- [Security Best Practices](./security-best-practices)
- [X.509 with OpenSSL](/platform/guides/creating-x509-certificates-with-openssl)
