# Device Management

## Complete Control Over Your Connected Fleet

Device Management in Peridio Core provides the foundation for organizing, provisioning, and maintaining your entire fleet of connected devices. From the moment a device is manufactured to its eventual decommissioning, Peridio gives you the tools to manage every aspect of its lifecycle.

## Core Architecture

Device management in Peridio follows a hierarchical structure designed to scale from prototypes to millions of production devices:

### Organizations
The top-level container that isolates all resources, users, and data. Each organization represents a completely separate environment with its own security boundaries.

### Products
Within an organization, products define different device types or hardware platforms. Think of products as the blueprint for a class of devices - they share firmware, configurations, and management policies.

### Cohorts
Logical groupings within products that enable sophisticated deployment strategies. Cohorts let you segment your fleet for staged rollouts, A/B testing, or geographic targeting.

### Devices
Individual device instances with unique identities, certificates, and operational data. Each device belongs to exactly one product and cohort.

## Key Capabilities

### Secure Device Identity
Every device in Peridio has a cryptographically secure identity based on X.509 certificates. This ensures:
- Mutual authentication between devices and cloud
- Protection against device impersonation
- Secure communication channels
- Certificate lifecycle management

### Flexible Provisioning
Peridio supports multiple provisioning workflows to match your manufacturing and deployment needs:
- **Just-in-Time Provisioning (JITP)** - Devices auto-register on first connection
- **Pre-provisioning** - Create device records before manufacturing
- **Bulk Import** - Onboard thousands of devices via CSV or API
- **Manual Creation** - Add individual devices through the console

### Real-Time Fleet Visibility
Monitor your entire fleet through comprehensive dashboards and analytics:
- Device connection status and health metrics
- Firmware version distribution
- Geographic deployment maps
- Update progress tracking
- Custom tags and metadata

### Granular Access Control
Manage who can see and control different aspects of your fleet:
- Role-based permissions
- Product and cohort-level access
- API key scoping
- Audit logging

## Common Workflows

### Manufacturing Integration
1. Generate CA certificates for your manufacturing line
2. Configure JITP with default product and cohort assignments
3. Devices automatically register when first powered on
4. Track provisioning rates and manufacturing yield

### Staged Deployments
1. Organize devices into cohorts (canary, beta, production)
2. Deploy updates to canary cohort first
3. Monitor metrics and rollback if needed
4. Progressively roll out to larger cohorts

### Field Diagnostics
1. Query devices by tags, location, or status
2. Access device logs and telemetry
3. Initiate remote access sessions
4. Quarantine problematic devices

## Security Considerations

Device management security is built on multiple layers:
- **Certificate-based authentication** using industry-standard X.509
- **Encrypted communications** via TLS 1.3
- **Role-based access control** for users and API keys
- **Audit trails** for compliance and forensics
- **Automatic certificate rotation** before expiration

## Integration Points

Device management integrates seamlessly with other Peridio Core features:
- **Firmware Management** - Deploy updates to specific devices or cohorts
- **Remote Access** - Establish secure tunnels to devices
- **Webhooks** - Receive real-time notifications of device events
- **APIs** - Automate device operations programmatically

## Next Steps

Explore the detailed documentation for each component:
- [Agent](/dev-center/peridio-core/device-management/agent) - On-device client software
- [Products](/dev-center/peridio-core/device-management/products) - Device type management
- [Cohorts](/dev-center/peridio-core/device-management/cohorts) - Fleet segmentation
- [Devices](/dev-center/peridio-core/device-management/devices) - Individual device operations
- [Just-in-Time Provisioning](/dev-center/peridio-core/device-management/just-in-time-provisioning) - Automatic device onboarding