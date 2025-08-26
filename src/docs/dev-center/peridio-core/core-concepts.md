---
title: Core Concepts
---

# Core Concepts

Understanding the fundamental building blocks of Peridio Core is essential for effectively managing your device fleet and firmware distribution. This guide introduces the key concepts and their relationships.

## Resource Hierarchy

[Organizations](/platform/reference/organizations) are the highest level of resource isolation in Peridio. Within an organization you can create [products](/dev-center/peridio-core/device-management/products) and [cohorts](/dev-center/peridio-core/device-management/cohorts) to categorize your [devices](/dev-center/peridio-core/device-management/devices).

### Organization Structure

```
Organization
├── Products
│   ├── Cohorts
│   │   ├── Devices
│   │   └── Releases (OTA)
│   └── Bundles
│       └── Artifacts
│           └── Artifact Versions
│               └── Binaries
└── Users & Permissions
```

## Device Management

### Devices

Individual units in your fleet with unique identities and certificates. Devices can be:

- Created manually through the console or API
- Imported in bulk via CSV or programmatic methods
- Automatically provisioned using [Just-in-Time Provisioning (JITP)](/dev-center/peridio-core/device-management/just-in-time-provisioning)

### Products

Logical groupings that represent device types or hardware platforms. Products serve as containers for:

- Device cohorts
- Firmware artifacts
- Configuration policies
- Certificate authorities

### Cohorts

Segments within products that enable:

- Staged rollouts (canary, beta, production)
- Geographic targeting
- Customer-specific configurations
- A/B testing and experimentation

## Firmware Management

[Binaries](/dev-center/peridio-core/firmware-management/binaries) are the assets you wish to distribute to your devices. There is no restriction on the format of their content. The firmware management system consists of:

### Artifacts

Define types for your binaries. Examples include:

- Application firmware
- Operating system images
- Configuration files
- Machine learning models

### Artifact Versions

Track binaries of a certain type across distinct versions, enabling:

- Version history
- Rollback capabilities
- Dependency management

### Bundles

Create immutable, reusable ordered sets of binaries that:

- Group related firmware components
- Ensure atomic updates
- Maintain consistency across devices

## Release Management

[Releases](/platform/reference/releases) are what tie together devices and binaries. Within a cohort of devices, you can create graphs of releases to define the update paths available to your devices.

### Release Components

- **Bundle Association**: Each release references a specific bundle
- **Version Graph**: Defines valid update paths between releases
- **Rollout Strategy**: Controls deployment speed and targeting
- **Validation Rules**: Ensures safe updates

### Update Flow

1. Device checks for available updates
2. Peridio resolves the appropriate release based on device state
3. Device downloads the bundle associated with the release
4. Update is applied according to device agent logic

<img src="/img/guides-overview.png" width="auto" />

## Security Architecture

### Certificate-Based Authentication

- X.509 certificates for device identity
- Mutual TLS for all communications
- CA certificate management for JITP

### Signed Firmware

- Cryptographic signatures on binaries
- Chain of trust validation
- Rollback protection

### Access Control

- Role-based permissions (RBAC)
- API key scoping
- Audit logging

## Integration Points

### APIs

- **Admin API**: Full platform control and automation
- **Device API**: Device-to-cloud communication
- **Webhooks**: Event-driven integrations

### Agent Software

- Official Peridio Agent (peridiod)
- Custom agent development
- SDK integration options

## Common Workflows

### Manufacturing Integration

1. Configure CA certificates for factory provisioning
2. Set up JITP with default assignments
3. Devices auto-register on first boot
4. Ready for updates and management

### Progressive Deployment

1. Create release in canary cohort
2. Monitor metrics and health
3. Promote to beta cohort
4. Full production rollout

### Emergency Response

1. Identify affected devices via tags/cohorts
2. Create fix bundle
3. Deploy with expedited rollout
4. Monitor resolution

## Best Practices

### Organization Design

- Use products to separate distinct hardware types
- Create cohorts that align with your deployment strategy
- Apply consistent tagging taxonomy
- Document your organizational structure

### Update Strategy

- Always test in smaller cohorts first
- Implement automatic rollback policies
- Monitor update metrics closely
- Maintain rollback paths

### Security Posture

- Rotate certificates before expiration
- Use separate CAs for production/development
- Implement defense in depth
- Regular security audits

## Next Steps

Now that you understand the core concepts, explore these areas:

- [Device Management](/dev-center/peridio-core/device-management/overview) - Deep dive into device operations
- [Firmware Management](/dev-center/peridio-core/firmware-management/overview) - Learn about update distribution
- [System Architecture](/dev-center/peridio-core/system-architecture) - Understand the platform design
- [Getting Started](/platform/getting-started) - Begin using Peridio
