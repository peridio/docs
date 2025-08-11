# Peridio Core Introduction

Peridio Core is a CI/CD platform for embedded devices, providing comprehensive device management, secure OTA updates, and remote access capabilities.

## Overview Video

*[Video placeholder - will include comprehensive platform overview]*

## Key Capabilities

### Device Management
- Fleet-wide device visibility and control
- Real-time device health monitoring
- Cohort-based organization and targeting
- Just-in-time provisioning (JITP)

### Firmware Management  
- **Artifacts** - Versioned software components
- **Bundles** - Collections of artifacts for deployment
- **Releases** - Signed, distributable updates
- **Channels** - Controlled release distribution

### Secure Remote Access
- WireGuard-based VPN tunneling
- Web-based device console access
- SSH tunnel management
- Network-isolated device connectivity

### Security & Compliance
- Code signing with PKI infrastructure
- Certificate-based device authentication
- Encrypted update delivery
- Audit trails and compliance reporting

## Architecture

Peridio Core operates as a cloud-native platform with the following components:

- **Admin API** - Platform management and automation
- **Device API** - Device-to-cloud communication
- **Web Console** - User interface and fleet view
- **Agent** - On-device update and connectivity client

## Getting Started

Begin with our platform overview:
- [Platform Getting Started](/platform/getting-started)
- [Raspberry Pi Getting Started](/dev-center/getting-started/raspberry-pi)
- [Platform Reference](/platform/reference/overview)

## Integration Approach

Peridio Core supports multiple integration patterns:
- **API-only** - Programmatic control via REST/GraphQL
- **Agent-based** - Full device integration with peridiod
- **Hybrid** - Combination of API and agent approaches

Choose the approach that best fits your device architecture and operational requirements.