# System Architecture

## Overview

Peridio is built on a robust, scalable architecture designed to handle millions of IoT devices globally. The platform provides comprehensive device management, secure update distribution, and remote access capabilities through a cloud-native infrastructure.

## Core Components

### Organizations
[Organizations](/platform/reference/organizations) are the highest level of resource isolation in Peridio. They provide complete separation between different companies, teams, or projects, ensuring data security and access control.

### Device Hierarchy
Within an organization, devices are organized through:
- **[Products](/platform/reference/products)**: Define device types and hardware platforms
- **[Cohorts](/platform/reference/cohorts)**: Group devices for targeted updates and management
- **[Devices](/platform/reference/devices)**: Individual device instances with unique identities

Devices can be created manually, imported in bulk, or provisioned just-in-time as they connect to the platform.

## Platform Services

### Update Management
The update system orchestrates the distribution of binaries to devices through a sophisticated release management pipeline. This includes version control, rollback capabilities, and progressive deployment strategies.

### Device Communication
Secure, bidirectional communication between devices and the cloud using:
- X.509 certificate authentication
- TLS encryption for all communications
- RESTful APIs for device operations
- WebSocket connections for real-time features

### Remote Access
Wireguard-based tunneling provides secure remote access to devices for:
- SSH sessions
- HTTP services
- Custom protocols
- Debugging and diagnostics

### Data Storage
Multi-tier storage architecture:
- **Metadata**: PostgreSQL for relational data
- **Binary Storage**: Object storage (S3-compatible)
- **Time-series Data**: Optimized for metrics and telemetry
- **Cache Layer**: Redis for performance optimization

## Security Model

### Authentication & Authorization
- Multi-factor authentication for users
- API key management for programmatic access
- X.509 certificates for device authentication
- Role-based access control (RBAC)

### Data Protection
- Encryption at rest for all stored data
- TLS 1.3 for data in transit
- Signed binaries with cryptographic verification
- Audit logging for compliance

## Scalability & Reliability

### Global Infrastructure
- Multi-region deployment
- CDN for binary distribution
- Edge locations for reduced latency
- Automatic failover and redundancy

### Performance
- Horizontal scaling for all services
- Load balancing across availability zones
- Database replication and sharding
- Asynchronous processing for heavy operations

## Integration Points

### APIs
- [Admin API](/admin-api): Full platform control
- [Device API](/device-api): Device communication
- [Webhooks](/platform/reference/webhooks): Event notifications

### External Systems
- Cloud storage providers (AWS S3, Azure Blob, GCS)
- CI/CD pipelines
- Monitoring and alerting systems
- Enterprise identity providers (SAML, OIDC)

## Next Steps

- [Getting Started](/platform/getting-started): Begin using Peridio
- [Device Management](device-management): Managing your fleet
- [Firmware Management](firmware-management/overview): Understanding updates
- [API Documentation](/admin-api): Integration reference