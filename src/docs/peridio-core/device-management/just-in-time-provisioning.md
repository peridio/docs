---
title: Just-in-Time Provisioning
---

# Just-in-Time Provisioning (JITP)

Configuring just-in-time provisioning for a [CA certificate](/peridio-core/device-management/ca-certificates) enables [devices](/peridio-core/device-management/devices) to be automatically provisioned the moment of their first connection to the [Peridio Device API](/device-api). This alleviates the burden of having to take any per-device onboarding action.

## Overview

JITP streamlines device onboarding by automatically creating device records when new devices connect with valid certificates. This approach is ideal for:

- Manufacturing lines producing thousands of devices
- Field deployments where manual provisioning is impractical
- Development environments requiring rapid iteration
- Scaling operations without manual overhead

## Provisioning Flow

1. **Device connects** - An unprovisioned device connects to the Peridio Device API for the first time
2. **Certificate validation** - Peridio validates that the device's certificate is signed by a configured and unexpired CA Certificate
3. **Automatic provisioning** - Peridio provisions the device by:
   - Creating a device record
   - Storing the device's public certificate
   - Assigning configured attributes (product, cohort, tags, description)
4. **Ready for management** - Device is immediately ready for updates and monitoring

## Configuration

### Prerequisites

- CA certificate uploaded to Peridio
- CA certificate configured with JITP settings
- Devices with certificates signed by the CA

### JITP Settings

When enabling JITP on a CA certificate, configure:

#### Product Assignment

The product that devices will be assigned to upon provisioning.

#### Cohort Placement

The initial cohort for newly provisioned devices.

#### Default Tags

Tags automatically applied to help with organization and targeting.

#### Description Template

Pattern for generating device descriptions, can include certificate fields.

## Use Cases

### Manufacturing Integration

```
1. Factory CA signs device certificates during production
2. Devices ship with embedded certificates
3. End users power on devices
4. Devices automatically provision and receive updates
```

### Development Workflow

```
1. Development CA configured with JITP to dev cohort
2. Engineers flash new devices with signed certificates
3. Devices auto-provision for immediate testing
4. No manual device creation needed
```

### Multi-Tenant Deployment

```
1. Separate CAs per customer/tenant
2. Each CA configured with customer-specific settings
3. Devices auto-provision to correct tenant
4. Automatic segregation maintained
```

## Best Practices

### Security

- **Protect CA private keys** - Compromise allows unauthorized device creation
- **Set appropriate CA validity** - Balance security with operational needs
- **Monitor provisioning rates** - Detect unusual patterns
- **Use separate CAs** - Different CAs for production vs development

### Operations

- **Plan cohort strategy** - New devices should land in appropriate cohorts
- **Configure meaningful tags** - Automate organization from the start
- **Set descriptive patterns** - Help identify devices later
- **Monitor CA expiration** - Plan rotation before expiry

### Scale

- **Test at small scale first** - Verify configuration before mass deployment
- **Implement rate limiting** - Protect against provisioning storms
- **Plan for growth** - Ensure cohort and tag strategies scale
- **Monitor metrics** - Track provisioning success rates

## Limitations

- Devices must have valid certificates signed by registered CA
- CA certificate must not be expired
- Product and cohort must exist before JITP configuration
- Certificate CN must be unique across organization

## Troubleshooting

### Device Not Provisioning

- Verify CA certificate is registered and not expired
- Check JITP is enabled on the CA certificate
- Confirm device certificate is properly signed
- Ensure certificate chain is complete

### Wrong Configuration Applied

- Review JITP settings on CA certificate
- Verify product and cohort assignments
- Check tag configuration

### Certificate Validation Failures

- Validate certificate chain integrity
- Ensure proper certificate formatting
- Check CA certificate validity period

## Migration Strategies

### From Manual to JITP

1. Upload CA certificate
2. Configure JITP settings
3. Test with single device
4. Enable for production

### Between CAs

1. Configure new CA with JITP
2. Start signing new devices with new CA
3. Maintain both CAs during transition
4. Deprecate old CA after migration

## Related Topics

- [CA Certificates](/peridio-core/device-management/ca-certificates)
- [Device Certificates](/peridio-core/device-management/device-certificates)
- [Devices](/peridio-core/device-management/devices)
- [Products](/peridio-core/device-management/products)
- [Cohorts](/peridio-core/device-management/cohorts)
