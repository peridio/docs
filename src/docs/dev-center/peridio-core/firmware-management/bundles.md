---
title: Bundles
---

# Bundles

Bundles are immutable ordered sets of [binaries](binaries) and [custom metadata](#custom-metadata) that can be distributed to devices. They provide a reliable way to package and distribute firmware updates, ensuring that the exact same set of assets tested in one environment can be deployed to another.

## Overview

Bundles serve as the fundamental distribution unit in Peridio's firmware management system. By creating immutable packages of binaries and metadata, bundles ensure consistency and reliability across your entire device fleet.

### Key Benefits

- **Immutability**: Once created, bundles cannot be modified, ensuring consistency across all deployments
- **Reusability**: The same bundle can be distributed through multiple releases and overrides
- **Traceability**: Cryptographically identical assets across development, staging, and production
- **Flexibility**: Support for custom metadata at multiple inheritance levels

## Distribution Methods

Bundles may be distributed to devices via:

### [Releases](releases)
Distribute bundles to cohorts with versioning, ordering, and phased rollout capabilities.

### [Bundle Overrides](/platform/reference/bundle-overrides)
Force specific devices to receive a bundle, overriding normal release channels.

:::tip Bundle Re-distribution
A single bundle can be configured into zero to many releases and bundle overrides, enabling the same tested assets to be distributed across multiple channels.
:::

## Typical Workflow

Bundles enable distributing the exact same set of binaries and custom metadata across multiple devices and cohorts, allowing the cryptographically identical set of assets tested in one place to be deployed in another.

### Example Distribution Pipeline

1. **Development Testing**: Deploy a bundle to development devices via a bundle override
2. **Staging Validation**: Test the same bundle against staging and nightly cohorts
3. **Production Rollout**: Distribute the validated bundle to production cohorts

This approach reduces the opportunity for human error that can occur when requiring an asset be rebuilt or redefined when crossing distribution boundaries.

## Custom Metadata

Each binary in a bundle can optionally have an arbitrary, user-defined JSON object associated with it. This metadata system provides flexibility in how you organize and configure your firmware distributions.

### Metadata Inheritance

Custom metadata can be specified at multiple levels with inheritance flowing downward:

1. **Artifact Level**: Base metadata defined on the artifact
2. **Artifact Version Level**: Version-specific metadata overrides
3. **Binary Level**: Binary-specific metadata overrides
4. **Bundle Creation**: Final override during bundle creation

More specific definitions override broader ones in the inheritance chain.

### Inheritance Examples

#### Example 1: Basic Inheritance from Artifact

**Setup:**
- Artifact **(A1)** has custom metadata: `{"platform": "arm64", "region": "global"}`
- Artifact Version **(AV1)** for **(A1)** has no custom metadata
- Binary **(B1)** for **(AV1)** has no custom metadata
- Creating a bundle with **(B1)**, supplying no additional metadata

**Result in Bundle:**
- **(B1)** inherits metadata from **(A1)**: `{"platform": "arm64", "region": "global"}`

#### Example 2: Binary Override

**Setup:**
- Artifact **(A1)** has custom metadata: `{"platform": "arm64"}`
- Artifact Version **(AV1)** for **(A1)** has no custom metadata
- Binary **(B1)** for **(AV1)** has no custom metadata
- Binary **(B2)** for **(AV1)** has metadata: `{"platform": "arm64", "variant": "debug"}`
- Creating a bundle with **(B1)** and **(B2)**, supplying no additional metadata

**Result in Bundle:**
- **(B1)** inherits from **(A1)**: `{"platform": "arm64"}`
- **(B2)** uses its own metadata: `{"platform": "arm64", "variant": "debug"}`

#### Example 3: Bundle Creation Override

**Setup:**
- Artifact **(A1)** has custom metadata: `{"version": "1.0"}`
- Artifact Version **(AV1)** for **(A1)** has no custom metadata
- Binary **(B1)** for **(AV1)** has no custom metadata
- Binary **(B2)** for **(AV1)** has metadata: `{"version": "1.0", "type": "firmware"}`
- Creating a bundle with **(B1)** and **(B2)**, supplying metadata for **(B2)**: `{"version": "1.1", "type": "firmware", "priority": "high"}`

**Result in Bundle:**
- **(B1)** inherits from **(A1)**: `{"version": "1.0"}`
- **(B2)** uses bundle creation metadata: `{"version": "1.1", "type": "firmware", "priority": "high"}`

## Creating Bundles

### Prerequisites

- One or more binaries uploaded to Peridio
- Appropriate permissions in your organization
- Understanding of your deployment strategy

### Via Web Console

1. Navigate to Firmware > Bundles
2. Click "Create Bundle"
3. Select binaries to include
4. Configure custom metadata (optional)
5. Review and create

### Via CLI

```bash
peridio bundles create \
  --binaries binary-uuid-1,binary-uuid-2 \
  --metadata '{"version": "2.0.0", "release_notes": "Bug fixes"}' \
  --name "Production Bundle v2.0.0"
```

### Via API

```bash
curl -X POST https://api.peridio.com/v2/bundles \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "binaries": ["binary-uuid-1", "binary-uuid-2"],
    "metadata": {
      "version": "2.0.0",
      "release_notes": "Bug fixes"
    },
    "name": "Production Bundle v2.0.0"
  }'
```

## Bundle Composition

### Binary Selection

When creating a bundle, consider:

- **Compatibility**: Ensure all binaries are compatible with target devices
- **Dependencies**: Include all required binaries for a complete update
- **Size**: Balance comprehensive updates with download constraints
- **Atomicity**: Group related changes that should be deployed together

### Metadata Strategy

Effective use of custom metadata can enhance your deployment process:

```json
{
  "version": "2.1.0",
  "release_date": "2024-01-15",
  "release_notes": "Performance improvements and bug fixes",
  "min_hardware_version": "3.0",
  "rollback_version": "2.0.5",
  "features": {
    "bluetooth": true,
    "wifi": true,
    "cellular": false
  },
  "deployment_config": {
    "reboot_required": true,
    "installation_time": 300,
    "priority": "normal"
  }
}
```

## Best Practices

### Bundle Naming

Use descriptive, consistent naming conventions:
- Include version information
- Indicate target environment (dev, staging, prod)
- Add date or build number for tracking

Examples:
- `firmware-v2.1.0-prod-20240115`
- `app-bundle-staging-build-4523`
- `critical-security-patch-v1.0.1`

### Testing Strategy

1. **Create Once**: Build your bundle once for all environments
2. **Test Progressively**: Move through environments without rebuilding
3. **Validate Checksums**: Verify binary integrity at each stage
4. **Document Changes**: Maintain clear release notes in metadata

### Version Management

- Use semantic versioning consistently
- Track dependencies between bundles
- Maintain rollback paths
- Document minimum device requirements

### Security Considerations

- Sign all binaries before bundle creation
- Verify signatures during deployment
- Use secure channels for distribution
- Implement access controls for bundle creation
- Audit bundle creation and distribution events

## Troubleshooting

### Common Issues

#### Bundle Creation Fails
- Verify all binary UUIDs are valid
- Check permissions for referenced binaries
- Ensure metadata is valid JSON
- Confirm organization quotas aren't exceeded

#### Metadata Not Appearing
- Check inheritance chain for overrides
- Verify JSON syntax in metadata
- Confirm metadata size limits aren't exceeded

#### Distribution Problems
- Verify bundle is associated with a release or override
- Check device eligibility for the distribution method
- Review cohort membership for releases
- Confirm scheduling for bundle overrides

## API Reference

For detailed API documentation, see:
- [Bundles API Reference](/admin-api#bundles)
- [Bundle Distribution Reference](/platform/reference/bundle-distribution)
- [Release Channels Reference](/platform/reference/release-channels)