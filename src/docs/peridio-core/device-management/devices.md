---
title: Devices
---

# Devices

A device is a thing you wish to distribute updates to. Each device represents an individual unit in your fleet with its own identity, configuration, and operational state.

## Device Identity

Every device in Peridio has:

- **Unique identifier** - System-generated PRN (Peridio Resource Name)
- **Human-readable name** - Optional friendly identifier
- **X.509 certificate** - Cryptographic identity for authentication
- **Product association** - Belongs to exactly one product
- **Cohort membership** - Assigned to one cohort within the product

## Provisioning

Devices can be provisioned through multiple methods:

### Just-in-Time Provisioning (JITP)

Automatically register devices on first connection. See [Just-in-Time Provisioning](/peridio-core/device-management/just-in-time-provisioning) for details.

### Manual Provisioning

Create devices individually through:

- Web console interface
- Admin API calls
- CLI commands

### Bulk Import

Import multiple devices via:

- CSV file upload
- API batch operations
- Migration tools

:::tip Start with JITP
When possible, use JITP for scalable, automated provisioning. Manual provisioning is best for testing or small deployments.
:::

## Tags

Devices can be associated with tags to achieve logical groupings. These groupings may have external meaning to you, but they also integrate with Peridio features:

### Tag Usage

- **Deployment targeting** - Include/exclude devices based on tags
- **Search and filtering** - Find devices quickly in large fleets
- **Custom attributes** - Store metadata like location, customer, or hardware version
- **Automation triggers** - Use tags in webhook conditions and API queries

### Tag Format

- Key-value pairs (e.g., `environment:production`)
- Multiple tags per device supported
- Case-sensitive matching
- Special characters allowed in values

## Device States

### Connection Status

- **Online** - Currently connected to Peridio
- **Offline** - Not currently connected
- **Never Connected** - Provisioned but hasn't connected yet

### Operational Status

- **Healthy** - Normal operation
- **Updating** - Firmware update in progress
- **Quarantined** - Isolated from updates
- **Failed** - Error condition reported

## Quarantine

Devices have a boolean `quarantined` field. When `true`, the device is ineligible for updates from releases and deployments.

### Quarantine Methods

- **Manual** - Via console, API, or CLI
- **Automatic** - Based on deployment conditions
- **Programmatic** - Through webhook integrations

### Use Cases

- Isolate problematic devices
- Pause updates during debugging
- Control rollout to specific devices
- Compliance holds

:::info Quarantine is reversible
Devices can be unquarantined at any time to resume normal operations.
:::

## Networking

Devices need to connect to Peridio to receive updates and for remote access. In secure environments with firewalls, you may need to whitelist domains, IPs, and ports.

### Inbound Requirements

No inbound ports need to be exposed on the device.

### Outbound Requirements

#### Device Updates

- **Hostname**: `device.cremini.peridio.com`
- **Protocols**: HTTPS and WSS
- **Ports**: 443

#### Tunnels (Remote Access)

- **IP**: `3.142.155.49`
- **Protocol**: UDP
- **Ports**: 49152-65535 (RFC6335 ephemeral range)

## Device Metadata

Each device maintains various metadata:

### System Information

- Firmware version
- Hardware identifiers
- Network configuration
- Last seen timestamp

### Custom Attributes

- Application-specific data
- Business metadata
- Deployment information
- Service configuration

## Device Operations

### Common Operations

- **Update firmware** - Deploy new releases
- **Remote access** - Establish secure tunnels
- **Reboot** - Trigger remote restart
- **Collect logs** - Gather diagnostic information
- **Update configuration** - Modify device settings

### Bulk Operations

- Apply tags to multiple devices
- Move devices between cohorts
- Quarantine device groups
- Export device lists

## Best Practices

1. **Use meaningful identifiers** - Help identify devices in the field
2. **Apply consistent tagging** - Develop a tagging taxonomy
3. **Monitor connection status** - Set up alerts for offline devices
4. **Plan for scale** - Design patterns that work for your fleet size
5. **Implement monitoring** - Track device health metrics

## Security Considerations

- Each device should have a unique certificate
- Rotate certificates before expiration
- Monitor for suspicious connection patterns
- Use quarantine for compromised devices
- Implement audit logging for device operations

## Related Topics

- [Products](/peridio-core/device-management/products)
- [Cohorts](/peridio-core/device-management/cohorts)
- [Device Certificates](/peridio-core/device-management/device-certificates)
- [Just-in-Time Provisioning](/peridio-core/device-management/just-in-time-provisioning)
