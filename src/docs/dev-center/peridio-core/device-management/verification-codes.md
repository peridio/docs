---
title: Verification Codes
---

# Verification Codes

A verification code is a credential consumed during the process of [creating a CA certificate](/platform/guides/creating-ca-certificates) in Peridio to prove ownership of the associated private key. This code becomes the Common Name (CN) of a [verification certificate](/dev-center/peridio-core/device-management/verification-certificates) that must be signed by the CA being registered.

## Purpose

Verification codes are a critical security mechanism that:
- Prevents unauthorized CA certificate registration
- Proves possession of the CA's private key
- Creates an audit trail for CA onboarding
- Ensures organizational boundaries are maintained

## Lifecycle

### 1. Generation
- Request through Peridio console or API
- Unique code generated for your organization
- Time-limited validity (typically 24-48 hours)

### 2. Consumption
- Used as CN in verification certificate
- Single-use only
- Validated during CA upload

### 3. Expiration
- Automatically expires if unused
- Cannot be renewed or extended
- Must request new code if expired

## Code Format

Verification codes typically follow this pattern:
- Alphanumeric string
- Case-sensitive
- 32-64 characters long
- Cryptographically random

Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

## Security Properties

### Uniqueness
Each code is globally unique and tied to a specific organization.

### Single Use
Once consumed, a code cannot be reused, even if CA registration fails.

### Time-Bound
Codes expire to limit exposure window if compromised.

### Non-Guessable
Cryptographically random generation prevents prediction.

## Usage Process

### Step 1: Request Code
```bash
# Via CLI
peridio ca-certificates verification-codes create

# Via API
POST /api/v1/organizations/{org}/ca-certificates/verification-codes
```

### Step 2: Receive Code
```json
{
  "code": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "expires_at": "2024-01-15T12:00:00Z",
  "organization_id": "org_123"
}
```

### Step 3: Create Verification Certificate
Use code as Common Name in certificate signed by your CA.

### Step 4: Submit for Validation
Upload CA certificate with verification certificate.

## Best Practices

### Timing
- Request code immediately before use
- Don't request codes preemptively
- Complete process in single session

### Security
- Treat codes as sensitive credentials
- Don't share codes across teams
- Don't log or store codes unnecessarily
- Use secure channels for transmission

### Process
- Document code request procedures
- Assign responsibility for CA registration
- Maintain audit log of code usage
- Plan for code expiration scenarios

## Common Scenarios

### Production CA Registration
1. Security team requests verification code
2. HSM signs verification certificate with code as CN
3. CA certificate registered with production JITP settings
4. Manufacturing begins using CA for device certificates

### Development Environment
1. Developer requests verification code
2. Local CA signs verification certificate
3. CA registered for development product
4. Rapid development iteration enabled

### Multi-Region Deployment
1. Request separate codes per region
2. Register region-specific CAs
3. Configure appropriate JITP settings
4. Maintain regional separation

## Troubleshooting

### Code Expired
- Request new verification code
- Complete process more quickly
- Consider automation for faster execution

### Code Already Used
- Each code is single-use
- Request new code for retry
- Check if CA already registered

### Invalid Code Format
- Verify exact copy/paste
- Check for whitespace or special characters
- Ensure case-sensitive match

## API Integration

### Creating Codes
```http
POST /api/v1/organizations/{org_id}/ca-certificates/verification-codes
Authorization: Bearer {token}
```

### Listing Codes
```http
GET /api/v1/organizations/{org_id}/ca-certificates/verification-codes
Authorization: Bearer {token}
```

### Code Status
```http
GET /api/v1/organizations/{org_id}/ca-certificates/verification-codes/{code_id}
Authorization: Bearer {token}
```

## Audit Considerations

Verification code usage is logged for:
- Compliance requirements
- Security investigations
- Process improvement
- Access control verification

## Related Topics

- [CA Certificates](/dev-center/peridio-core/device-management/ca-certificates)
- [Verification Certificates](/dev-center/peridio-core/device-management/verification-certificates)
- [Just-in-Time Provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning)
- [X.509 Certificates](/dev-center/peridio-core/device-management/x509)
