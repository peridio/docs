---
title: Releases
---

# Releases

Releases allow you to distribute [bundles](bundles) to [cohorts](/dev-center/peridio-core/device-management/cohorts) with support for versioning, ordering, required and disabled releases, and availability controls. They form the backbone of Peridio's progressive deployment capabilities.

## Overview

Each release is associated with exactly one cohort, but each cohort can have zero to many releases. Within a cohort, releases form a [release channel](/platform/reference/release-channels). Each release is associated with exactly one bundle, but each bundle can be associated with zero to many releases and [bundle overrides](/platform/reference/bundle-overrides).

### Key Capabilities

- **Version Management**: Semantic versioning with requirements
- **Flexible Ordering**: Static or dynamic release progression
- **Deployment Control**: Required and disabled release states
- **Phased Rollouts**: Gradual deployment with scheduling and phasing
- **Safety Mechanisms**: Automatic rollback and failure thresholds

## Versioning

Releases support optionally specifying a SemVer version and a SemVer version requirement. These fields are useful for your own informational purposes, but also impact dynamic [ordering](#ordering) during [bundle resolution](/platform/reference/bundle-distribution#bundle-resolution) via [release version resolution](/platform/reference/bundle-distribution#release-resolution-method).

:::tip Release Version Resolution
If you **ever** wish to rely on dynamic ordering, it is strongly recommended to **always** specify version and version requirements on releases. Only releases that specify both fields are considered when performing bundle resolution via release version resolution.
:::

### Version Examples

```javascript
{
  "version": "2.1.0",
  "version_requirement": ">= 2.0.0 and < 3.0.0"
}
```

Common version requirements:

- `">= 1.0.0"` - Minimum version
- `"~> 2.1"` - Compatible with 2.1.x
- `">= 1.0.0 and < 2.0.0"` - Range constraint
- `"!= 1.2.3"` - Exclude specific version

## Ordering

Releases support two ordering mechanisms that determine how devices progress through updates:

### Static Ordering

Releases have a next release field that specifies an explicit path to be walked through a [release channel](/platform/reference/release-channels) during bundle resolution via release PRN resolution.

```javascript
{
  "prn": "prn:1:org-uuid:releases:release-1",
  "next_release_prn": "prn:1:org-uuid:releases:release-2"
}
```

**Use Cases:**

- Mandatory update sequences
- Complex dependency chains
- Controlled migration paths

### Dynamic Ordering

Releases use version and version requirement fields to specify an implicit path through a release channel during bundle resolution via release version resolution.

```javascript
{
  "version": "2.0.0",
  "version_requirement": ">= 1.0.0"
}
```

**Use Cases:**

- Flexible update paths
- Skip intermediate versions
- Automatic compatibility resolution

## Release States

### Required Releases

A required release cannot be skipped during the update process. Devices must install required releases even if newer versions are available.

```javascript
{
  "required": true,
  "description": "Critical security update - mandatory for all devices"
}
```

**Common Use Cases:**

- Security patches
- Breaking changes requiring migration
- License compliance updates

### Disabled Releases

A disabled release cannot have its bundle selected during bundle resolution, but can be skipped so long as it is not required.

```javascript
{
  "disabled": true,
  "description": "Known issue - disabled pending fix"
}
```

**Common Use Cases:**

- Problematic releases
- Temporary rollback scenarios
- Testing specific update paths

## Availability Controls

The latest release in a release channel can optionally constrain its availability via scheduling and phasing for more precise and gradual rollouts.

### Scheduling

Schedule releases for immediate or future deployment:

```javascript
{
  "schedule_date": "2024-02-01T00:00:00Z",
  "description": "Scheduled for February maintenance window"
}
```

**Scheduling States:**

- **Scheduled**: Release date is in the future
- **Available**: Schedule date has passed
- **Immediate**: No schedule date specified

### Phasing

Control gradual rollout to limit risk and monitor deployment health:

#### Tag-Based Phasing

Only devices with specific tags can receive the release:

```javascript
{
  "phase_mode": "tags",
  "phase_tags": ["beta", "early-adopter"],
  "description": "Beta testing phase"
}
```

#### Numeric Phasing

Limit the number or percentage of devices:

```javascript
// Percentage-based (20% of cohort)
{
  "phase_mode": "numeric",
  "phase_value": 0.2,
  "description": "20% canary deployment"
}

// Count-based (first 100 devices)
{
  "phase_mode": "numeric",
  "phase_value": 100,
  "description": "Limited to 100 devices"
}
```

**Phasing Rules:**

- Decimal values `[0.0, 1.0]` are treated as percentages
- Integer values `>= 2` are treated as device counts
- Phase value of `1.0` or `100%` means fully deployed

:::tip Availability and Release Channels
For details about how release availability can impact your ability to create new latest releases, see the [only-sinks-constrain-availability](/platform/reference/release-channels#only-sinks-constrain-availability) release channel rule.
:::

## Creating Releases

### Prerequisites

- Existing cohort with devices
- Bundle ready for deployment
- Appropriate permissions

### Via Web Console

1. Navigate to Cohorts > Select Cohort > Releases
2. Click "Create Release"
3. Select bundle to deploy
4. Configure version and requirements
5. Set availability options
6. Review and create

### Via CLI

```bash
# Basic release
peridio releases create \
  --cohort-prn "prn:1:org-uuid:cohorts:cohort-123" \
  --bundle-prn "prn:1:org-uuid:bundles:bundle-456" \
  --version "2.1.0" \
  --version-requirement ">= 2.0.0"

# Phased release
peridio releases create \
  --cohort-prn "prn:1:org-uuid:cohorts:cohort-123" \
  --bundle-prn "prn:1:org-uuid:bundles:bundle-456" \
  --version "2.1.0" \
  --phase-mode numeric \
  --phase-value 0.1
```

### Via API

```bash
curl -X POST https://api.peridio.com/v2/releases \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "cohort_prn": "prn:1:org-uuid:cohorts:cohort-123",
    "bundle_prn": "prn:1:org-uuid:bundles:bundle-456",
    "version": "2.1.0",
    "version_requirement": ">= 2.0.0",
    "phase_mode": "numeric",
    "phase_value": 0.2,
    "schedule_date": "2024-02-01T00:00:00Z"
  }'
```

## Deployment Strategies

### Canary Deployment

1. Create release with small phase value (5-10%)
2. Monitor metrics and logs
3. Gradually increase phase value
4. Complete rollout at 100%

```bash
# Initial canary
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 0.05

# Expand if successful
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 0.25

# Continue expansion
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 0.50

# Complete rollout
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 1.0
```

### Blue-Green Deployment

1. Create "blue" cohort with current release
2. Create "green" cohort with new release
3. Move devices between cohorts
4. Rollback by moving devices back if needed

### Rolling Updates

1. Use tag-based phasing for device groups
2. Update tags progressively
3. Monitor each group before proceeding

```javascript
// Phase 1: Development devices
{
  "phase_tags": ["dev"]
}

// Phase 2: Add staging
{
  "phase_tags": ["dev", "staging"]
}

// Phase 3: Add production
{
  "phase_tags": ["dev", "staging", "prod"]
}
```

## Monitoring and Rollback

### Health Monitoring

Track key metrics during deployment:

- Device check-in rates
- Update success/failure ratios
- Error logs and crash reports
- Performance metrics
- User feedback

### Automatic Rollback

Configure failure thresholds:

```javascript
{
  "failure_threshold": 0.05,  // 5% failure rate
  "failure_count": 10,        // Or 10 absolute failures
  "auto_rollback": true
}
```

### Manual Rollback

Options for reverting deployments:

1. Disable the problematic release
2. Create new release with previous bundle
3. Use bundle override for affected devices
4. Move devices to different cohort

## Best Practices

### Version Management

1. **Use Semantic Versioning**: Follow SemVer principles consistently
2. **Document Requirements**: Clear version requirements prevent conflicts
3. **Plan Upgrade Paths**: Design clear progression through versions
4. **Test Compatibility**: Verify version requirements work as expected

### Phasing Strategy

1. **Start Small**: Begin with 1-5% for critical updates
2. **Monitor Actively**: Watch metrics before expanding
3. **Use Tags Wisely**: Leverage tags for logical device groups
4. **Document Phases**: Track what each phase represents

### Release Planning

1. **Schedule Appropriately**: Consider timezone and usage patterns
2. **Communicate Changes**: Notify users of scheduled updates
3. **Maintain Rollback Plans**: Always have a reversal strategy
4. **Track Dependencies**: Document inter-release dependencies

### Safety Measures

1. **Required Releases**: Use sparingly for critical updates
2. **Gradual Rollouts**: Default to phased deployments
3. **Health Checks**: Implement device health reporting
4. **Audit Trails**: Log all release operations

## Troubleshooting

### Common Issues

#### Devices Not Receiving Updates

- Verify device cohort membership
- Check release availability constraints
- Review version requirements
- Confirm bundle resolution path

#### Phasing Not Working

- Ensure phase mode is correctly set
- Verify phase value is valid
- Check device count in cohort
- Review device tags for tag-based phasing

#### Version Conflicts

- Validate version requirement syntax
- Check for circular dependencies
- Review release channel ordering
- Verify bundle compatibility

#### Rollback Issues

- Confirm previous release is not disabled
- Check version requirements allow rollback
- Verify devices can reach previous version
- Review required release constraints

## Advanced Topics

### Complex Version Requirements

```javascript
// Multiple constraints
{
  "version_requirement": ">= 2.0.0 and < 3.0.0 and != 2.5.0"
}

// Pre-release versions
{
  "version": "3.0.0-beta.1",
  "version_requirement": ">= 3.0.0-alpha"
}
```

### Multi-Stage Deployments

Coordinate releases across multiple cohorts:

1. Deploy to development cohort
2. Promote to staging after validation
3. Phase into production cohorts
4. Maintain version synchronization

### Release Automation

Integrate with CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Create Peridio Release
  run: |
    peridio releases create \
      --cohort-prn ${{ secrets.COHORT_PRN }} \
      --bundle-prn ${{ env.BUNDLE_PRN }} \
      --version ${{ github.ref_name }} \
      --phase-value 0.1
```

## API Reference

For detailed API documentation, see:

- [Releases API Reference](/admin-api#releases)
- [Bundle Distribution Reference](/platform/reference/bundle-distribution)
- [Release Channels Reference](/platform/reference/release-channels)
- [Bundle Resolution Reference](/platform/reference/bundle-distribution#bundle-resolution)
