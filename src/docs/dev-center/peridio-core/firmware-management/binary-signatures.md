# Binary Signatures

Binary signatures provide cryptographic proof of authenticity and integrity for your firmware binaries. Every binary must be signed before it can be distributed to devices.

## Why Sign Binaries?

### Security Benefits

- **Authentication**: Proves the binary comes from a trusted source
- **Integrity**: Detects any tampering or corruption
- **Non-repudiation**: Creates audit trail of who signed what
- **Trust Chain**: Establishes secure update path

### Compliance Requirements

Many industries require code signing:

- Automotive (ISO 26262)
- Medical devices (FDA)
- IoT security standards
- Enterprise policies

## Signing Keys

### Key Types

Peridio supports multiple key algorithms:

#### RSA Keys

- 2048-bit (minimum)
- 4096-bit (recommended)
- Wide compatibility

#### Ed25519 Keys

- Modern elliptic curve
- Smaller signatures
- Faster verification
- Recommended for new deployments

### Creating Signing Keys

#### Generate RSA Key

```bash
# Generate private key
openssl genrsa -out private_key.pem 4096

# Extract public key
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

#### Generate Ed25519 Key

```bash
# Generate private key
openssl genpkey -algorithm ED25519 -out private_key.pem

# Extract public key
openssl pkey -in private_key.pem -pubout -out public_key.pem
```

#### Register with Peridio

```bash
peridio signing-keys create \
  --name "production-2024" \
  --public-key-file public_key.pem
```

## Signature Creation

### Manual Signing

#### Using OpenSSL

```bash
# RSA signature
openssl dgst -sha256 -sign private_key.pem \
  -out firmware.sig firmware.bin

# Ed25519 signature
openssl pkeyutl -sign -inkey private_key.pem \
  -in firmware.bin -out firmware.sig
```

#### Attach to Binary

```bash
SIGNATURE=$(base64 firmware.sig)

peridio binary-signatures create \
  --binary-prn $BINARY_PRN \
  --signing-key-prn $KEY_PRN \
  --signature "$SIGNATURE"
```

### Automated Signing

#### CI/CD Pipeline

```yaml
# GitHub Actions
- name: Sign Binary
  run: |
    # Sign the binary
    openssl dgst -sha256 -sign ${{ secrets.SIGNING_KEY }} \
      -out firmware.sig firmware.bin

    # Attach signature
    peridio binary-signatures create \
      --binary-prn ${{ env.BINARY_PRN }} \
      --signing-key-prn ${{ env.KEY_PRN }} \
      --signature $(base64 firmware.sig)
```

#### Signing Service

```python
import subprocess
import base64

def sign_binary(binary_path, key_path):
    # Generate signature
    result = subprocess.run([
        'openssl', 'dgst', '-sha256', '-sign', key_path,
        '-out', 'temp.sig', binary_path
    ])

    # Read and encode signature
    with open('temp.sig', 'rb') as f:
        signature = base64.b64encode(f.read()).decode()

    return signature
```

## Hardware Security Modules (HSM)

### Benefits

- Keys never leave HSM
- FIPS 140-2 compliance
- Audit logging
- Access control

### HSM Integration

#### AWS CloudHSM

```bash
# Configure PKCS#11
export PKCS11_MODULE=/opt/cloudhsm/lib/libcloudhsm_pkcs11.so

# Sign using HSM key
pkcs11-tool --sign --mechanism SHA256-RSA-PKCS \
  --input-file firmware.bin \
  --output-file firmware.sig
```

#### Azure Key Vault

```python
from azure.keyvault.keys.crypto import CryptographyClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
client = CryptographyClient(key_url, credential)

# Sign binary
with open('firmware.bin', 'rb') as f:
    digest = hashlib.sha256(f.read()).digest()

result = client.sign(SignatureAlgorithm.rs256, digest)
signature = base64.b64encode(result.signature)
```

## Signature Verification

### On-Device Verification

Devices automatically verify signatures during updates:

```c
// Example verification code
bool verify_signature(
    const uint8_t *binary_data,
    size_t binary_size,
    const uint8_t *signature,
    size_t sig_size,
    const uint8_t *public_key
) {
    // Calculate hash
    uint8_t hash[32];
    sha256(binary_data, binary_size, hash);

    // Verify signature
    return rsa_verify(hash, signature, sig_size, public_key);
}
```

### Manual Verification

```bash
# Verify RSA signature
openssl dgst -sha256 -verify public_key.pem \
  -signature firmware.sig firmware.bin

# Verify Ed25519 signature
openssl pkeyutl -verify -pubin -inkey public_key.pem \
  -in firmware.bin -sigfile firmware.sig
```

## Key Management

### Key Rotation

Regular key rotation improves security:

1. **Generate new key pair**
2. **Register new public key**
3. **Sign new binaries with new key**
4. **Deploy new public key to devices**
5. **Phase out old key**

### Key Storage Best Practices

#### Development Keys

- Store in secure key management system
- Use separate keys from production
- Rotate frequently

#### Production Keys

- Use HSM or secure enclave
- Implement access controls
- Audit all usage
- Have backup/recovery plan

### Key Hierarchy

```
Root CA Key (offline)
├── Intermediate CA Key (HSM)
│   ├── Production Signing Key
│   ├── Beta Signing Key
│   └── Development Signing Key
```

## Signature Metadata

Include additional context:

```json
{
  "algorithm": "RS256",
  "key_id": "prod-key-2024",
  "timestamp": "2024-01-15T10:30:00Z",
  "signer": "ci-pipeline",
  "build_id": "12345"
}
```

## Multi-Signature Support

For high-security scenarios, require multiple signatures:

```bash
# First signature (developer)
peridio binary-signatures create \
  --binary-prn $BINARY_PRN \
  --signing-key-prn $DEV_KEY_PRN \
  --signature "$DEV_SIGNATURE"

# Second signature (release manager)
peridio binary-signatures create \
  --binary-prn $BINARY_PRN \
  --signing-key-prn $RELEASE_KEY_PRN \
  --signature "$RELEASE_SIGNATURE"
```

## Compliance and Auditing

### Audit Log Requirements

Track all signing operations:

- Who signed what
- When it was signed
- Which key was used
- From which system

### Compliance Checklist

- [ ] Key generation follows standards
- [ ] Keys stored securely
- [ ] Access controls implemented
- [ ] Audit logging enabled
- [ ] Key rotation schedule defined
- [ ] Incident response plan ready

## Troubleshooting

### Signature Verification Failures

#### Invalid Signature

- Verify correct key pair used
- Check binary hasn't been modified
- Ensure signature properly encoded

#### Key Mismatch

- Confirm public key registered correctly
- Verify using matching private key
- Check key algorithm compatibility

#### Expired Keys

- Review key validity period
- Update device trust store
- Rotate to new keys

### Common Issues

#### Binary Won't Transition to Signed

- Verify signature attached successfully
- Check signing key is active
- Review error logs

#### Devices Reject Updates

- Ensure devices have correct public keys
- Verify signature algorithm supported
- Check certificate chain validity

## Best Practices

### Security

1. Never commit private keys to version control
2. Use strong key generation parameters
3. Implement key access controls
4. Regular security audits
5. Plan for key compromise

### Operations

1. Automate signing in CI/CD
2. Test signature verification
3. Monitor signing operations
4. Document key procedures
5. Train team on security

### Development

1. Use separate keys for dev/staging/prod
2. Implement signing early in pipeline
3. Validate signatures in tests
4. Handle key rotation gracefully
5. Plan for algorithm migration

## Next Steps

- [Signing Keys](/platform/reference/signing-keys) - Managing signing keys
- [Creating Binary Signatures Guide](/platform/guides/creating-binary-signatures) - Step-by-step tutorial
- [API Reference](/admin-api#binary-signatures) - Complete API documentation
