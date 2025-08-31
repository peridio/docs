# Overview

This guide serves as a comprehensive introduction to bundle management that covers the complete lifecycle of creating, managing, and distributing firmware bundles to your device fleet.

## Overview

Bundle management is the core of Peridio's firmware distribution system, providing the tools and workflows to package, version, and deploy firmware updates reliably and securely. This system ensures that tested firmware reaches the right devices at the right time.

## Bundle Management Resources

Bundle management comprises the following key resources:

- **[Bundles](/peridio-core/firmware-management/bundles)** - Define ordered sets of binaries that can be distributed to devices
- **[Releases](/peridio-core/firmware-management/releases)** - Publish bundles to devices through release channels
- **[Release Channels](/peridio-core/firmware-management/release-channels)** - Define update paths and progression strategies
- **[Bundle Overrides](/peridio-core/firmware-management/bundle-overrides)** - Force specific bundles to devices outside normal channels
- **[Bundle Distribution](/peridio-core/firmware-management/bundle-distribution)** - The resolution system that determines what updates devices receive

## Workflow Overview

The typical bundle management workflow follows these steps:

1. **Create Binaries** - Upload and sign your firmware binaries
2. **Create Bundle** - Package binaries with metadata into an immutable bundle
3. **Create Release** - Publish the bundle to a cohort through a release
4. **Monitor Deployment** - Track update progress and device health
5. **Manage Rollout** - Control phasing, handle issues, and complete deployment

## Prerequisites

Before working with bundle management, ensure you have:

- [Peridio CLI](https://github.com/peridio/morel/releases) installed
- Organization and product created in Peridio
- Devices enrolled in cohorts
- Binaries uploaded and signed

## Quick Start Example

Here's a simple example of creating and deploying a bundle:

### 1. Create a Bundle

Package your binaries into a bundle:

```bash
peridio bundles create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --binary-prns $BINARY_PRN_1,$BINARY_PRN_2 \
  --name "Firmware v2.0.0"
```

### 2. Create a Release

Deploy the bundle to devices in a cohort:

```bash
peridio releases create \
  --organization-prn $PERIDIO_ORGANIZATION_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --version "2.0.0"
```

### 3. Monitor Progress

Check deployment status:

```bash
peridio releases status \
  --release-prn $RELEASE_PRN
```

## Key Concepts

### Immutability

Bundles are immutable once created, ensuring consistency across all deployments. This guarantees that the exact same tested assets are deployed everywhere.

### Release Channels

Releases form channels that define how devices progress through updates. These channels can be linear or branching, supporting various deployment strategies.

### Resolution Priority

Bundle distribution follows a strict priority order:

1. Bundle Overrides (highest priority)
2. Release Channels
3. No Update

### Phased Rollouts

Control deployment risk by gradually rolling out updates to percentages of your fleet or specific device groups.

## Common Use Cases

### Progressive Deployment

Deploy updates gradually to minimize risk:

1. Deploy to 5% canary group
2. Monitor metrics and expand to 25%
3. Continue expanding to 50%, 75%
4. Complete rollout at 100%

### Emergency Patches

Use bundle overrides for critical fixes:

```bash
peridio bundle-overrides create \
  --device-tag "affected" \
  --bundle-prn $PATCH_BUNDLE \
  --start-datetime "now"
```

### A/B Testing

Deploy different versions to compare:

```bash
# Group A
peridio releases create \
  --cohort-prn $COHORT_A \
  --bundle-prn $VERSION_A

# Group B
peridio releases create \
  --cohort-prn $COHORT_B \
  --bundle-prn $VERSION_B
```

## Best Practices

### Bundle Creation

- **Version Consistently**: Use semantic versioning
- **Include Metadata**: Add release notes and configuration
- **Test First**: Validate bundles on test devices
- **Document Changes**: Maintain clear change logs

### Release Management

- **Start Small**: Begin with limited rollouts
- **Monitor Actively**: Track success rates and performance
- **Plan Rollback**: Always have a reversal strategy
- **Communicate**: Keep stakeholders informed

### Safety Measures

- **Use Required Releases Sparingly**: Only for critical updates
- **Set Failure Thresholds**: Configure automatic rollback triggers
- **Maintain Audit Trails**: Log all operations
- **Test Update Paths**: Validate progression in staging

## Troubleshooting

### Common Issues

**Devices Not Updating**

- Verify cohort membership
- Check release availability
- Review version requirements
- Validate bundle resolution

**Phasing Problems**

- Ensure phase configuration is correct
- Verify device counts
- Check scheduling constraints

**Resolution Conflicts**

- Review override status
- Check release channel structure
- Validate state reporting

## Next Steps

- **[Creating Bundles](creating-bundles)** - Learn to create and configure bundles
- **[Creating Releases](creating-releases)** - Deploy bundles to your fleet

## Related Documentation

- [Firmware Management Reference](/peridio-core/firmware-management/overview)
- [Device Management](/peridio-core/device-management/overview)
- [API Reference](/admin-api#bundles)
