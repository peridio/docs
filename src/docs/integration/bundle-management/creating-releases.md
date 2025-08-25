---
title: Creating Releases
---

# Creating Releases

This guide describes how to create releases to distribute bundles to your device fleet through cohorts and release channels.

## Overview

Releases are the primary mechanism for deploying bundles to devices. They support versioning, phased rollouts, scheduling, and complex update paths through release channels.

To learn more about releases in general, see the [releases reference](/peridio-core/firmware-management/releases).

## Prerequisites

Before creating releases, ensure you have:

- [Peridio CLI](https://github.com/peridio/morel/releases) installed and configured
- A cohort with enrolled devices
- A bundle ready for deployment
- Appropriate permissions to create releases

## Creating a Release

### Via CLI

The CLI provides comprehensive options for creating releases:

#### Basic Release

Create a simple release as the latest in the channel:

```bash
peridio releases create \
  --organization-prn $ORGANIZATION_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --version "2.0.0"
```

#### With Version Requirements

Specify version requirements for update eligibility:

```bash
peridio releases create \
  --organization-prn $ORGANIZATION_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --version "2.1.0" \
  --version-requirement ">= 2.0.0 and < 3.0.0"
```

#### Phased Release

Create a release with gradual rollout:

```bash
# Start with 10% rollout
peridio releases create \
  --organization-prn $ORGANIZATION_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --version "2.0.0" \
  --phase-mode numeric \
  --phase-value 0.1
```

#### Scheduled Release

Schedule a release for future deployment:

```bash
peridio releases create \
  --organization-prn $ORGANIZATION_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --version "2.0.0" \
  --schedule-date "2024-02-15T00:00:00Z"
```

### Via API

Use the Peridio Admin API for programmatic release creation:

```bash
curl -X POST https://api.peridio.com/v2/releases \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "cohort_prn": "prn:1:org:cohorts:cohort-123",
    "bundle_prn": "prn:1:org:bundles:bundle-456",
    "version": "2.0.0",
    "version_requirement": ">= 1.0.0",
    "phase_mode": "numeric",
    "phase_value": 0.2,
    "schedule_date": "2024-02-01T00:00:00Z",
    "name": "February Security Update",
    "description": "Critical security patches"
  }'
```

### Via Web Console

1. Navigate to the [Peridio Web Console](https://console.peridio.com)
2. Go to Cohorts > Select Cohort > Releases
3. Click "Create Release"
4. Select bundle to deploy
5. Configure version and requirements
6. Set phasing and scheduling options
7. Review and create

## Release Positioning

### As Latest Release

By default, releases are created as the latest (sink node) in the channel:

```bash
# Automatically becomes latest
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN
```

### With Specific Positioning

Control exact placement in the release channel:

```bash
# Insert between existing releases
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --prev-release-prn $PREVIOUS_RELEASE \
  --next-release-prn $NEXT_RELEASE
```

## Phasing Strategies

### Percentage-Based Phasing

Roll out to a percentage of devices:

```bash
# Create with initial 5% rollout
RELEASE_PRN=$(peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --phase-mode numeric \
  --phase-value 0.05 \
  --output json | jq -r '.prn')

# Gradually increase rollout
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 0.25  # 25%

peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 0.50  # 50%

peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 1.0   # 100%
```

### Count-Based Phasing

Limit to specific number of devices:

```bash
# Roll out to first 100 devices
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --phase-mode numeric \
  --phase-value 100
```

### Tag-Based Phasing

Target specific device groups:

```bash
# Phase to beta testers first
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --phase-mode tags \
  --phase-tags "beta,early-adopter"

# Later expand to all
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-mode numeric \
  --phase-value 1.0
```

## Release States

### Required Releases

Mark critical updates that cannot be skipped:

```bash
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --required true \
  --description "Mandatory security update"
```

### Disabled Releases

Create disabled releases for testing:

```bash
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --disabled true \
  --description "Pre-release for validation"
```

## Advanced Scenarios

### Canary Deployment

Implement a canary deployment strategy:

```bash
#!/bin/bash
# Canary deployment script

# 1. Create canary release (5%)
RELEASE_PRN=$(peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $BUNDLE_PRN \
  --version "2.0.0" \
  --phase-value 0.05 \
  --output json | jq -r '.prn')

echo "Canary release created: $RELEASE_PRN"

# 2. Monitor for 24 hours
sleep 86400

# 3. Check metrics
SUCCESS_RATE=$(peridio releases get-metrics \
  --release-prn $RELEASE_PRN \
  --output json | jq -r '.success_rate')

if [ $(echo "$SUCCESS_RATE > 0.95" | bc) -eq 1 ]; then
  # 4. Expand if successful
  echo "Canary successful, expanding to 25%"
  peridio releases update \
    --release-prn $RELEASE_PRN \
    --phase-value 0.25
else
  # 4. Rollback if failed
  echo "Canary failed, disabling release"
  peridio releases update \
    --release-prn $RELEASE_PRN \
    --disabled true
fi
```

### Blue-Green Deployment

Set up blue-green deployment:

```bash
# Blue cohort (current production)
BLUE_COHORT="prn:1:org:cohorts:production-blue"

# Green cohort (new version)
GREEN_COHORT="prn:1:org:cohorts:production-green"

# Deploy to green
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $GREEN_COHORT \
  --bundle-prn $NEW_BUNDLE \
  --version "2.0.0"

# After validation, switch traffic
# (Move devices from blue to green cohort)
peridio devices move-cohort \
  --from-cohort $BLUE_COHORT \
  --to-cohort $GREEN_COHORT
```

### Automated Release Pipeline

Integrate with CI/CD:

```yaml
# GitHub Actions example
name: Deploy Release
on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Extract version
        run: echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_ENV

      - name: Create Peridio Release
        run: |
          peridio releases create \
            --organization-prn ${{ secrets.PERIDIO_ORG_PRN }} \
            --cohort-prn ${{ secrets.PRODUCTION_COHORT_PRN }} \
            --bundle-prn ${{ env.BUNDLE_PRN }} \
            --version ${{ env.VERSION }} \
            --version-requirement ">= ${{ env.PREV_VERSION }}" \
            --phase-value 0.1

      - name: Monitor Deployment
        run: |
          ./scripts/monitor-deployment.sh ${{ env.VERSION }}
```

## Monitoring and Management

### Check Release Status

```bash
# Get release details
peridio releases get \
  --release-prn $RELEASE_PRN

# Check deployment progress
peridio releases get-progress \
  --release-prn $RELEASE_PRN

# View device distribution
peridio releases get-device-stats \
  --release-prn $RELEASE_PRN
```

### Update Release Configuration

```bash
# Increase phase
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 0.5

# Remove scheduling constraint
peridio releases update \
  --release-prn $RELEASE_PRN \
  --schedule-date null

# Disable release
peridio releases update \
  --release-prn $RELEASE_PRN \
  --disabled true
```

## Troubleshooting

### Issue: Cannot Create Latest Release

**Symptom**: Error when creating new latest release

**Cause**: Current latest release has constrained availability

**Solution**:

```bash
# Complete current latest release
peridio releases update \
  --release-prn $CURRENT_LATEST \
  --phase-value 1.0 \
  --schedule-date null

# Now create new latest
peridio releases create \
  --organization-prn $ORG_PRN \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $NEW_BUNDLE
```

### Issue: Devices Not Receiving Release

**Symptom**: Devices don't update despite new release

**Common Causes**:

- Version requirements not met
- Release is disabled
- Phasing excludes devices
- Scheduling not yet active

**Solution**:

```bash
# Check device eligibility
peridio devices check-update \
  --device-prn $DEVICE_PRN

# Verify release configuration
peridio releases get \
  --release-prn $RELEASE_PRN

# Check version requirements
peridio releases validate-requirements \
  --release-prn $RELEASE_PRN \
  --device-prn $DEVICE_PRN
```

### Issue: Phasing Not Working

**Symptom**: Wrong number of devices receiving update

**Solution**:

```bash
# Check current phase
peridio releases get-phase-info \
  --release-prn $RELEASE_PRN

# Verify device count in cohort
peridio cohorts get-device-count \
  --cohort-prn $COHORT_PRN

# Adjust phase if needed
peridio releases update \
  --release-prn $RELEASE_PRN \
  --phase-value 0.25
```

## Best Practices

### Version Management

- Use semantic versioning consistently
- Define clear version requirements
- Plan for rollback scenarios
- Document version dependencies

### Phasing Strategy

- Start with small percentages (1-5%)
- Monitor key metrics before expanding
- Use tag-based phasing for controlled groups
- Always complete phases before new releases

### Safety Measures

- Mark only critical updates as required
- Set appropriate failure thresholds
- Maintain rollback releases
- Test in staging cohorts first

### Documentation

- Include clear release notes
- Document version requirements
- Track phasing decisions
- Maintain deployment runbooks

## Next Steps

- [Bundle Overrides](/peridio-core/firmware-management/bundle-overrides) - Emergency deployments
- [Release Channels](/peridio-core/firmware-management/release-channels) - Design update paths

## Related Documentation

- [Releases Reference](/peridio-core/firmware-management/releases)
- [Release Channels](/peridio-core/firmware-management/release-channels)
- [Bundle Distribution](/peridio-core/firmware-management/bundle-distribution)
- [Admin API - Releases](/admin-api#releases)
