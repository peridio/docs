# Certificate Types

Understanding the different types of certificates used in the Peridio platform.

## CA Certificates

Certificate Authorities (CAs) form the foundation of your PKI trust chain.

### Root CA

The primary trust anchor for your organization:

- Self-signed certificate at the top of the hierarchy
- Should be stored offline in secure storage
- Used only to sign intermediate CAs
- Typical validity: 10-20 years

### Intermediate CA

Operational signing certificates for day-to-day use:

- Signed by the root CA
- Used to issue device and signing certificates
- Can be revoked if compromised without affecting root
- Typical validity: 3-5 years

### Device CA

Specialized CAs for device certificate management:

- Dedicated to device identity certificates
- Enables granular revocation policies
- Supports fleet segmentation
- Typical validity: 2-3 years

## Device Certificates

Individual certificates that provide unique device identity.

### Purpose

- **Unique Identification** - Cryptographically unique device ID
- **Authentication** - Proves device identity to platform
- **Authorization** - Determines device permissions
- **Secure Channel** - Establishes TLS connections

### Certificate Attributes

- **Common Name (CN)** - Device identifier
- **Organization (O)** - Your organization name
- **Serial Number** - Unique certificate ID
- **Validity Period** - Certificate lifetime

### Storage Options

- **File System** - Standard PEM/DER files
- **Hardware Security Module** - Tamper-resistant storage
- **Trusted Platform Module** - Built-in security chip
- **Secure Element** - Dedicated crypto processor

## Signing Keys

Certificates used for code signing and firmware validation.

### Release Signing Keys

Production firmware signing:

- Used for official firmware releases
- Should be highly protected
- Consider using HSM storage
- Implement strict access controls

### Development Keys

Testing and development signing:

- Used for development builds
- Separate from production keys
- Can have relaxed security
- Should not be accepted by production devices

### Key Algorithms

Supported signing algorithms:

- **RSA 2048/4096** - Wide compatibility
- **ECDSA P-256/P-384** - Smaller signatures
- **EdDSA** - Modern, fast signing

## Verification Certificates

Platform certificates for validating operations.

### Purpose

- Verify platform communications
- Validate update packages
- Authenticate cloud services
- Establish trust with devices

### Management

- Automatically managed by Peridio
- Rotated regularly for security
- Transparent to device operations
- No manual intervention required

## Certificate Selection Guide

| Use Case              | Certificate Type    | Recommended Validity |
| --------------------- | ------------------- | -------------------- |
| Organization PKI Root | Root CA             | 10-20 years          |
| Daily Operations      | Intermediate CA     | 3-5 years            |
| Device Identity       | Device Certificate  | 1-2 years            |
| Production Firmware   | Release Signing Key | 2-3 years            |
| Development Builds    | Development Key     | 6-12 months          |

## Related Documentation

- [CA Certificates Guide](/platform/guides/creating-ca-certificates)
- [Signing Keys Guide](/platform/guides/creating-signing-keys)
- [Device Certificates Reference](/platform/reference/device-certificates)
