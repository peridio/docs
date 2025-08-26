---
title: CA Certificates
---

# CA Certificates

In the context of Peridio, a CA certificate is an X.509 [intermediate CA](/dev-center/peridio-core/device-management/x509#intermediate-certificate-authority) that signs other [end-entity certificates](/dev-center/peridio-core/device-management/x509#end-entity-certificate). They are optionally used to control the registration of [device certificates](/dev-center/peridio-core/device-management/device-certificates) during [just-in-time provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning).

## Purpose

CA certificates serve as the trust anchor for device authentication in Peridio. When you upload a CA certificate to Peridio, any device with a certificate signed by that CA can:

- Authenticate with the Peridio platform
- Automatically provision via JITP if configured
- Establish secure communication channels

## Configuration

### Creating CA Certificates

To learn more about how to create and use CA certificates, see the [creating CA certificates](/platform/guides/creating-ca-certificates) guide.

### JITP Configuration

When configuring a CA certificate for JITP, you can specify:

- Default product assignment
- Default cohort placement
- Initial tags
- Description template

## Expiration Management

### Pre-Upload Validation

You cannot create a CA certificate in Peridio with an expired X.509 certificate. The platform validates the certificate's validity period before accepting it.

### Post-Expiration Behavior

If a CA certificate expires after being configured in Peridio:

- **New devices** cannot JITP using that expired CA certificate
- **Existing devices** that were previously provisioned remain unaffected and can still connect
- **Certificate renewal** should be planned well before expiration

## Security Considerations

- Store CA private keys securely, preferably in HSMs
- Use intermediate CAs rather than root CAs for signing device certificates
- Implement certificate rotation strategies before expiration
- Monitor CA certificate expiration dates proactively

## Best Practices

1. **Use separate CAs** for different device types or manufacturing batches
2. **Set appropriate validity periods** - balance security with operational overhead
3. **Maintain certificate chains** properly from root to intermediate to device
4. **Document your PKI structure** for team understanding and compliance

## Related Topics

- [Device Certificates](/dev-center/peridio-core/device-management/device-certificates)
- [Just-in-Time Provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning)
- [X.509 Certificates](/dev-center/peridio-core/device-management/x509)
