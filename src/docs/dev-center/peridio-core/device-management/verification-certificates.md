---
title: Verification Certificates
---

# Verification Certificates

A verification certificate is an X.509 certificate that is consumed during the process of [creating a CA certificate](/platform/guides/creating-ca-certificates) in Peridio to prove ownership of the associated private key. This mechanism prevents unauthorized parties from claiming ownership of CA certificates they don't control.

## Purpose

Verification certificates serve as proof of private key ownership. Without this verification step, anyone possessing a public CA certificate could potentially:

- Associate it with their organization
- Configure JITP settings
- Claim devices signed by that CA

The verification process ensures only the legitimate owner of the CA's private key can register it in Peridio.

## Verification Process

### Step 1: Generate Verification Code

Request a verification code from Peridio for your organization.

### Step 2: Create Verification Certificate

Generate a certificate with:

- **Common Name (CN)**: The verification code from Step 1
- **Signed by**: The CA certificate you want to register
- **Validity**: Can be short-lived (minutes to hours)

### Step 3: Upload Both Certificates

Submit both the CA certificate and verification certificate together.

### Step 4: Validation

Peridio validates:

- Verification certificate is signed by the CA certificate
- Common name matches the verification code
- Verification code is valid and unused

## Technical Requirements

### Certificate Format

- Standard X.509 v3 certificate
- PEM or DER encoding accepted
- Must be signed by the target CA certificate

### Common Name

- Must exactly match the verification code
- Case-sensitive
- No additional fields required

### Validity Period

- Can be very short (even minutes)
- Only needs to be valid during upload
- Not used after verification complete

## Security Benefits

### Proof of Ownership

Demonstrates control of the CA's private key, not just possession of the public certificate.

### One-Time Use

Verification codes are single-use, preventing replay attacks.

### Time-Limited

Codes expire if not used promptly, reducing window for compromise.

### Audit Trail

Creates verifiable record of CA certificate registration.

## Implementation Example

### Generate Verification Certificate

```bash
# Assuming you have:
# - ca-key.pem (CA private key)
# - ca-cert.pem (CA certificate)
# - verification-code.txt (contains code from Peridio)

# Create certificate signing request
openssl req -new \
  -key temp-key.pem \
  -out verification.csr \
  -subj "/CN=$(cat verification-code.txt)"

# Sign with CA certificate
openssl x509 -req \
  -in verification.csr \
  -CA ca-cert.pem \
  -CAkey ca-key.pem \
  -CAcreateserial \
  -out verification-cert.pem \
  -days 1
```

## Common Issues

### Verification Failures

- **Wrong CN**: Ensure exact match with verification code
- **Not signed by CA**: Verify signature chain
- **Expired code**: Request new verification code
- **Already used**: Each code is single-use only

### Certificate Problems

- **Invalid signature**: Check CA key corresponds to certificate
- **Malformed certificate**: Validate X.509 structure
- **Encoding issues**: Use standard PEM or DER format

## Best Practices

1. **Generate fresh codes** - Don't reuse old verification codes
2. **Use short validity** - Minimize certificate lifetime
3. **Secure transmission** - Protect certificates during upload
4. **Clean up** - Delete verification certificates after use
5. **Document process** - Maintain procedures for team members

## Workflow Integration

### Manufacturing Setup

1. Generate CA certificate for production line
2. Create verification certificate
3. Register CA with JITP configuration
4. Begin device provisioning

### Development Environment

1. Create development CA
2. Generate verification certificate
3. Register for development product
4. Enable rapid iteration

## Related Topics

- [CA Certificates](/dev-center/peridio-core/device-management/ca-certificates)
- [Verification Codes](/dev-center/peridio-core/device-management/verification-codes)
- [X.509 Certificates](/dev-center/peridio-core/device-management/x509)
- [Just-in-Time Provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning)
