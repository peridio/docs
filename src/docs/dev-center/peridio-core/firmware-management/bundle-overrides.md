---
title: Bundle Overrides
---

# Bundle Overrides

Bundle overrides allow you to force a [device](/dev-center/peridio-core/device-management/devices) to be served a [bundle](bundles) of your choosing, taking precedence over any [release](releases) that otherwise would have been relevant for the duration of the override. They provide a powerful mechanism for targeted deployments and emergency updates.

## Overview

Bundle overrides are the highest priority distribution method in Peridio's firmware management system. When an override is active for a device, it supersedes all normal release channels and version requirements, ensuring the specified bundle is delivered regardless of the device's current state or cohort membership.

### Key Capabilities

- **Highest Priority**: Takes precedence over all release-based distribution
- **Targeted Deployment**: Apply to specific devices or device groups
- **Time-Bound**: Schedule start and end times for automatic management
- **Mutable**: Can be modified at any time without creating new resources
- **Emergency Updates**: Ideal for critical patches and hotfixes

## How Bundle Overrides Work

### Priority System

Bundle overrides operate at the highest level of Peridio's distribution hierarchy:

1. **Bundle Overrides** (highest priority)
2. **Release Channels** via cohort membership
3. **Default/No Update** (if no applicable distribution method)

When a device checks for updates:
- If an applicable bundle override exists → Serve the override's bundle
- If no override exists → Check release channels
- If no applicable releases → No update available

### Override Behavior

When a bundle override is active:

- **Different Bundle**: If device is on a different bundle → Serve override bundle
- **Same Bundle**: If device already has the override bundle → No update (prevents loops)
- **Override Ends**: Normal release resolution resumes

:::tip Bundle but No Release
When a device receives a bundle via a bundle override, there is a relevant bundle, but no relevant release. This requires careful consideration during [device integration](bundle-distribution#device-integration).
:::

## Scheduling

Bundle overrides support flexible scheduling to control when they become active and when they expire.

### Schedule Configuration

```javascript
{
  "start_datetime": "2024-02-01T00:00:00Z",  // Required
  "end_datetime": "2024-02-07T00:00:00Z"     // Optional
}
```

- **Start DateTime**: Required. When the override becomes active
- **End DateTime**: Optional. When the override expires
- **No End Date**: Override remains active indefinitely

### Schedule States

1. **Pending**: Current time < start_datetime
2. **Active**: start_datetime ≤ current time < end_datetime (or no end)
3. **Expired**: current time ≥ end_datetime

### Schedule Stacking

When multiple bundle overrides' schedules overlap, only a single bundle override is ever applicable at any given moment. The applicable bundle override is always the one whose schedule you are within, and that started most recently.

#### Example Scenario

```
Override A: Jan 1 - Jan 31
Override B: Jan 15 - Jan 20
Override C: Jan 18 - Jan 25

Timeline:
- Jan 1-14: Override A active
- Jan 15-17: Override B active (started more recently than A)
- Jan 18-20: Override C active (started more recently than B)
- Jan 21-25: Override C active (B has ended)
- Jan 26-31: Override A active (B and C have ended)
```

## Mutability

Unlike releases and bundles which are immutable, bundle overrides can be modified at any time. This provides flexibility for dynamic scenarios.

### Modifiable Attributes

- **Name**: Update for clarity
- **Description**: Add or modify notes
- **Bundle**: Switch to a different bundle
- **Schedule**: Adjust start/end times
- **Target Devices**: Add or remove devices

### Modification Best Practices

1. **Document Changes**: Keep audit trail of modifications
2. **Test First**: Validate bundle changes on test devices
3. **Communicate**: Notify affected teams of schedule changes
4. **Monitor**: Track device reactions to modifications

## Creating Bundle Overrides

### Prerequisites

- Target devices identified
- Bundle created and tested
- Appropriate permissions
- Clear deployment schedule

### Via Web Console

1. Navigate to Devices or Cohorts
2. Select target devices
3. Click "Create Bundle Override"
4. Select bundle to deploy
5. Configure schedule
6. Review and create

### Via CLI

```bash
# Basic override for single device
peridio bundle-overrides create \
  --device-prn "prn:1:org-uuid:devices:device-123" \
  --bundle-prn "prn:1:org-uuid:bundles:bundle-456" \
  --start-datetime "2024-02-01T00:00:00Z" \
  --end-datetime "2024-02-07T00:00:00Z" \
  --name "Critical security patch"

# Override for multiple devices
peridio bundle-overrides create \
  --device-prns "device-1,device-2,device-3" \
  --bundle-prn "prn:1:org-uuid:bundles:bundle-456" \
  --start-datetime "now" \
  --name "Emergency fix deployment"
```

### Via API

```bash
curl -X POST https://api.peridio.com/v2/bundle-overrides \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "device_prns": [
      "prn:1:org-uuid:devices:device-123",
      "prn:1:org-uuid:devices:device-124"
    ],
    "bundle_prn": "prn:1:org-uuid:bundles:bundle-456",
    "start_datetime": "2024-02-01T00:00:00Z",
    "end_datetime": "2024-02-07T00:00:00Z",
    "name": "Critical security patch",
    "description": "Addresses CVE-2024-001"
  }'
```

## Use Cases

### Emergency Patches

Deploy critical security fixes immediately without waiting for normal release cycles:

```bash
# Immediate deployment to affected devices
peridio bundle-overrides create \
  --device-tag "vulnerable" \
  --bundle-prn $SECURITY_PATCH_BUNDLE \
  --start-datetime "now" \
  --name "CVE-2024-001 Emergency Patch"
```

### Development Testing

Test new features on specific devices without affecting cohort releases:

```bash
# Test on developer devices for one week
peridio bundle-overrides create \
  --device-prns "dev-device-1,dev-device-2" \
  --bundle-prn $BETA_BUNDLE \
  --start-datetime "now" \
  --end-datetime "+7d" \
  --name "Beta feature testing"
```

### Rollback Scenarios

Quickly revert problematic updates on affected devices:

```bash
# Rollback to previous stable version
peridio bundle-overrides create \
  --device-tag "experiencing-issues" \
  --bundle-prn $PREVIOUS_STABLE_BUNDLE \
  --start-datetime "now" \
  --name "Rollback to v2.0.5"
```

### Staged Deployments

Create time-based deployment waves:

```bash
# Wave 1: Immediate
peridio bundle-overrides create \
  --device-tag "wave-1" \
  --bundle-prn $UPDATE_BUNDLE \
  --start-datetime "2024-02-01T00:00:00Z" \
  --end-datetime "2024-02-08T00:00:00Z"

# Wave 2: One week later
peridio bundle-overrides create \
  --device-tag "wave-2" \
  --bundle-prn $UPDATE_BUNDLE \
  --start-datetime "2024-02-08T00:00:00Z" \
  --end-datetime "2024-02-15T00:00:00Z"
```

### A/B Testing

Deploy different versions to compare performance:

```bash
# Group A: New algorithm
peridio bundle-overrides create \
  --device-tag "group-a" \
  --bundle-prn $VERSION_A_BUNDLE \
  --start-datetime "now" \
  --end-datetime "+30d"

# Group B: Current algorithm
peridio bundle-overrides create \
  --device-tag "group-b" \
  --bundle-prn $VERSION_B_BUNDLE \
  --start-datetime "now" \
  --end-datetime "+30d"
```

## Managing Overrides

### Viewing Active Overrides

```bash
# List all overrides
peridio bundle-overrides list \
  --organization $ORG_ID

# View overrides for specific device
peridio bundle-overrides list \
  --device-prn $DEVICE_PRN \
  --active-only

# Get override details
peridio bundle-overrides get \
  --override-prn $OVERRIDE_PRN
```

### Updating Overrides

```bash
# Extend end date
peridio bundle-overrides update \
  --override-prn $OVERRIDE_PRN \
  --end-datetime "2024-02-14T00:00:00Z"

# Change bundle
peridio bundle-overrides update \
  --override-prn $OVERRIDE_PRN \
  --bundle-prn $NEW_BUNDLE_PRN

# Update description
peridio bundle-overrides update \
  --override-prn $OVERRIDE_PRN \
  --description "Extended due to additional testing requirements"
```

### Deleting Overrides

```bash
# Delete single override
peridio bundle-overrides delete \
  --override-prn $OVERRIDE_PRN

# Delete expired overrides
peridio bundle-overrides cleanup \
  --expired-before "2024-01-01"
```

## Best Practices

### Planning and Documentation

1. **Clear Naming**: Use descriptive names indicating purpose and urgency
2. **Document Reasons**: Include detailed descriptions of why override is needed
3. **Set End Dates**: Always define end dates to prevent forgotten overrides
4. **Track Overrides**: Maintain registry of active overrides and their purposes

### Safety Measures

1. **Test First**: Validate bundle on test devices before broad override
2. **Start Small**: Begin with limited device set, then expand
3. **Monitor Closely**: Track device behavior during override period
4. **Have Rollback Plan**: Prepare to quickly change or remove override

### Operational Guidelines

1. **Minimize Use**: Use overrides sparingly for exceptional cases
2. **Coordinate Teams**: Ensure support teams aware of active overrides
3. **Review Regularly**: Audit active overrides weekly
4. **Clean Up**: Remove expired overrides promptly

### Integration Considerations

1. **Device Reporting**: Ensure devices correctly report bundle PRN without release PRN
2. **Monitoring**: Set up alerts for override creation/modification
3. **Automation**: Use API for programmatic override management
4. **Audit Trail**: Log all override operations for compliance

## Troubleshooting

### Common Issues

#### Device Not Receiving Override Bundle
- **Check Schedule**: Verify current time is within override schedule
- **Check Stacking**: Another override may have higher priority
- **Check Device**: Confirm device PRN matches override target
- **Check Bundle**: Verify bundle exists and is accessible

#### Override Not Taking Effect
- **Cache Issues**: Device may have cached previous update check
- **Reporting**: Device may not be correctly reporting current bundle
- **Timing**: Override may not have started yet

#### Multiple Overrides Confusion
- **Check Start Times**: Most recent start time takes precedence
- **List Active**: View all active overrides for device
- **Review Schedule**: Diagram overlapping schedules

#### Performance Impact
- **Large Overrides**: Many devices checking simultaneously
- **Mitigation**: Use phased start times to distribute load

### Validation Commands

```bash
# Check what bundle device will receive
peridio devices check-update \
  --device-prn $DEVICE_PRN

# Verify override is active
peridio bundle-overrides status \
  --override-prn $OVERRIDE_PRN

# List devices affected by override
peridio bundle-overrides list-devices \
  --override-prn $OVERRIDE_PRN
```

## Advanced Topics

### Programmatic Override Management

```python
# Python example for automated override management
import peridio
from datetime import datetime, timedelta

client = peridio.Client(api_key=API_KEY)

# Create override for devices with errors
error_devices = client.devices.list(filter={"status": "error"})
if error_devices:
    override = client.bundle_overrides.create(
        device_prns=[d.prn for d in error_devices],
        bundle_prn=RECOVERY_BUNDLE_PRN,
        start_datetime=datetime.now(),
        end_datetime=datetime.now() + timedelta(hours=24),
        name="Automated recovery deployment"
    )
```

### Override Automation Patterns

```yaml
# GitHub Actions example for emergency override
name: Emergency Override Deployment
on:
  workflow_dispatch:
    inputs:
      bundle_prn:
        description: 'Bundle PRN to deploy'
        required: true
      device_tag:
        description: 'Device tag to target'
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Create Override
        run: |
          peridio bundle-overrides create \
            --device-tag ${{ github.event.inputs.device_tag }} \
            --bundle-prn ${{ github.event.inputs.bundle_prn }} \
            --start-datetime "now" \
            --end-datetime "+24h" \
            --name "Emergency override via GitHub Actions"
```

### Monitoring and Alerting

Set up monitoring for override operations:

```javascript
// Webhook handler for override events
app.post('/webhooks/bundle-override', (req, res) => {
  const event = req.body;

  switch(event.type) {
    case 'bundle_override.created':
      notifyOps(`Override created: ${event.data.name}`);
      break;
    case 'bundle_override.expired':
      logMetric('override.expired', event.data);
      break;
    case 'bundle_override.device_updated':
      trackDevice(event.data.device_prn, event.data.bundle_prn);
      break;
  }

  res.sendStatus(200);
});
```

## Distribution Integration

Bundle overrides work as part of Peridio's broader bundle distribution system. For detailed information about how overrides interact with release resolution and device update checks, see the [bundle distribution](bundle-distribution) reference.

## Additional Resources

For additional resources, see:
- [Bundle Distribution Reference](bundle-distribution)
- [Bundles Reference](bundles)
- [Devices Reference](/dev-center/peridio-core/device-management/devices)