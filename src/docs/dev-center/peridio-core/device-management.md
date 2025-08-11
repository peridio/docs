# Device Management

Comprehensive device lifecycle management from provisioning through decommissioning.

## Core Concepts

### Devices
Individual units in your fleet with unique identities and certificates. Each device belongs to a product and cohort.

**Key Features:**
- Unique device identifiers
- Certificate-based authentication
- Real-time connection status
- Hardware and software inventory
- Tag-based categorization

### Products
Logical groupings that represent a device type or product line.

**Organization:**
- Shared firmware artifacts
- Common configuration policies
- Unified certificate authorities
- Cohort management

### Cohorts
Deployment targeting groups within products that enable staged rollouts.

**Use Cases:**
- **Canary** - Early testing with subset of devices
- **Beta** - Pre-production validation
- **Production** - General availability releases
- **Geography** - Region-specific deployments

## Device Provisioning

### Just-in-Time Provisioning (JITP)
Automatically register devices when they first connect using pre-shared CA certificates.

**Workflow:**
1. Device generates certificate signed by trusted CA
2. First connection triggers automatic registration
3. Device assigned to specified product and cohort
4. Ready for updates and management

### Manual Registration
Explicitly create device records before deployment.

**Benefits:**
- Pre-deployment validation
- Inventory management
- Security audit trails

## Fleet Visibility

### Fleet View
Real-time dashboard showing:
- Device connection status
- Update deployment progress
- Health metrics and alerts
- Geographic distribution

### Device Details
Per-device information including:
- Hardware specifications
- Software versions
- Network connectivity
- Update history
- Remote access status

## Device States

Devices progress through several operational states:

- **Registered** - Created in Peridio but never connected
- **Online** - Currently connected and communicating
- **Offline** - Previously connected but currently unavailable
- **Updating** - Applying firmware updates
- **Failed** - Error state requiring attention

## Monitoring & Alerts

- Connection status changes
- Update success/failure notifications
- Device health threshold violations
- Certificate expiration warnings

## Reference Documentation

- [Devices Reference](/platform/reference/devices)
- [Products Reference](/platform/reference/products) 
- [Cohorts Reference](/platform/reference/cohorts)
- [Creating Devices Guide](/platform/guides/creating-devices)