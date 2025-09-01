# OTA Updates

Peridio provides comprehensive OTA update capabilities that enable you to securely and reliably update your fleet of devices. Our OTA system supports multiple update strategies and deployment patterns to meet diverse operational requirements.

## Key Capabilities

- **Flexible Update Strategies**: Support for side-loading, cohort-based releases, quick deployments, and bundle overrides
- **Granular Control**: Define update eligibility based on device attributes, versions, and cohort membership
- **Safety Mechanisms**: Built-in rollback capabilities, failure thresholds, and automatic quarantine features
- **Real-time Monitoring**: Track update progress, success rates, and device status throughout the update process

## Update Methods

### [Avocado OS Side Loading](avocado-side-loading)

Deploy updates directly to devices running Avocado OS without going through standard release channels.

### [Cohort-Based Releases](cohort-based-releases)

Roll out updates progressively to specific device groups for controlled deployment and testing.

### [Quick Deploy / Bundle Overrides](quick-deploy-bundle-overrides)

Rapidly deploy critical updates or override standard release schedules for emergency fixes.

### [Deployments (Deprecated)](deployments-deprecated)

Legacy deployment system for backward compatibility with existing implementations.

## Best Practices

- Always test updates on a small cohort before fleet-wide deployment
- Configure appropriate failure thresholds to prevent widespread issues
- Use bundle overrides sparingly and only for critical updates
- Monitor update metrics and device health during rollouts
