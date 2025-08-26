---
title: Device Certificates
---

# Device Certificates

A [device](/dev-center/peridio-core/device-management/devices) certificate is an X.509 certificate that is signed by a [CA certificate](/dev-center/peridio-core/device-management/ca-certificates). Devices use their certificates to authenticate with the [Peridio Device API](/device-api) as well as during [just-in-time provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning).

## Purpose

Device certificates provide cryptographically secure identity for each device in your fleet. They enable:

- Mutual TLS authentication with Peridio
- Secure, encrypted communication channels
- Non-repudiation of device actions
- Protection against device spoofing

## Certificate Lifecycle

### Generation

Device certificates can be generated:

- **During manufacturing** - Certificates created and injected at the factory
- **On first boot** - Devices generate their own certificates using embedded CA
- **Via provisioning tool** - Bulk generation for pre-provisioning

### Storage

Device certificates and their private keys should be stored securely on the device:

- Hardware security modules (HSM) or Trusted Platform Modules (TPM)
- Encrypted filesystem partitions
- Secure enclaves where available

## Expiration Management

### Pre-Creation Validation

You cannot create a device certificate in Peridio with an expired X.509 certificate. The platform validates the certificate before accepting it.

### Post-Expiration Behavior

If a device certificate expires after being configured in Peridio, the associated device will be unaffected in their ability to connect successfully. This design choice prevents devices from being locked out due to certificate expiration.

:::warning Plan for rotation
While expired certificates continue to work, you should implement a certificate rotation strategy for security best practices.
:::

## Certificate Requirements

### Technical Specifications

- **Format**: X.509 v3
- **Signature Algorithm**: RSA or ECDSA
- **Key Size**: Minimum 2048 bits for RSA, 256 bits for ECDSA
- **Extensions**: Subject Alternative Name (SAN) supported

### Common Name (CN)

The certificate's CN typically contains the device identifier and should be:

- Unique across your fleet
- Meaningful for debugging and auditing
- Consistent with your naming conventions

## Security Best Practices

1. **Protect private keys** - Never transmit private keys over the network
2. **Use unique certificates** - Each device should have its own certificate
3. **Implement rotation** - Plan for certificate updates before expiration
4. **Monitor expiration** - Set up alerts for upcoming expirations
5. **Secure generation** - Use cryptographically secure random number generators

## Integration

Device certificates integrate with:

- [CA Certificates](/dev-center/peridio-core/device-management/ca-certificates) for chain of trust
- [Just-in-Time Provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning) for automatic registration
- [Verification Certificates](/dev-center/peridio-core/device-management/verification-certificates) for additional validation

## Troubleshooting

### Common Issues

- **Certificate not trusted**: Ensure the signing CA is registered in Peridio
- **Connection failures**: Verify certificate chain and validity dates
- **JITP not working**: Check CA certificate JITP configuration

## Related Topics

- [CA Certificates](/dev-center/peridio-core/device-management/ca-certificates)
- [X.509 Certificates](/dev-center/peridio-core/device-management/x509)
- [Just-in-Time Provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning)
- [Devices](/dev-center/peridio-core/device-management/devices)
