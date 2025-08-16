---
title: Supported Hardware
hide_table_of_contents: true
---

import './support-matrix.css';

# Supported Hardware

:::caution Under Development
This documentation is currently under active development. Hardware support and feature availability may change as we continue to expand platform capabilities.
:::

Peridio supports a wide range of hardware platforms for IoT device management and OTA updates. Our platform integrates seamlessly with various processors, development boards, and production-ready systems.

## Hardware Support Matrix

<div className="support-matrix-container">
<table className="support-matrix">
  <thead>
    <tr>
      <th>Hardware Platform</th>
      <th>Avocado Linux</th>
      <th>OTA Updates</th>
      <th>Remote Access</th>
      <th>Secure Boot</th>
      <th>A/B Partitions</th>
      <th>Container Updates</th>
      <th>Fleet Management</th>
      <th>Production Ready</th>
    </tr>
  </thead>
  <tbody>
    <tr className="category-header">
      <td colSpan="9"><strong>Production Ready Systems</strong></td>
    </tr>
    <tr>
      <td><strong>Seeed reTerminal</strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>iCam540</strong></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>OnLogic Factor 201/202</strong></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr className="category-header">
      <td colSpan="9"><strong>NVIDIA Platforms</strong></td>
    </tr>
    <tr>
      <td><strong>Jetson Orin Nano EVK</strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
    </tr>
    <tr className="category-header">
      <td colSpan="9"><strong>NXP Platforms</strong></td>
    </tr>
    <tr>
      <td><strong>i.MX 93 FRDM SBC</strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
    </tr>
    <tr>
      <td><strong>i.MX 8MP EVK</strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
    </tr>
    <tr className="category-header">
      <td colSpan="9"><strong>Raspberry Pi</strong></td>
    </tr>
    <tr>
      <td><strong>Compute Module 4</strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
    <tr className="category-header">
      <td colSpan="9"><strong>Virtual Platforms</strong></td>
    </tr>
    <tr>
      <td><strong>QEMU (x86_64)</strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-none" title="Not Applicable">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-none" title="Not Applicable">●</span></td>
    </tr>
  </tbody>
</table>
</div>

<div className="support-legend">
  <h3>Legend</h3>
  <ul>
    <li><span className="status-full">●</span> Fully Supported - Production ready with full feature support</li>
    <li><span className="status-partial">●</span> In Development - Feature available in beta or limited capacity</li>
    <li><span className="status-none">●</span> Not Supported - Feature not available or not applicable</li>
  </ul>
</div>

## Feature Descriptions

### Core Features

**Avocado Linux** - Pre-configured Linux distribution optimized for embedded devices with deterministic builds and minimal footprint.

**OTA Updates** - Over-the-air firmware and software updates with rollback protection and delta updates.

**Remote Access** - Secure SSH tunneling and remote shell access for debugging and maintenance.

**Secure Boot** - Hardware-backed secure boot chain with signature verification and chain of trust.

### Advanced Features

**A/B Partitions** - Dual partition scheme for safe updates with automatic rollback on failure.

**Container Updates** - Docker and Podman container deployment and orchestration support.

**Fleet Management** - Centralized device monitoring, configuration, and batch operations.

**Production Ready** - Certified for commercial deployment with long-term support and SLAs.

## Hardware Categories

### Production Ready Systems

Complete, certified systems available from leading distributors that are ready for immediate deployment at scale. These systems come with full Peridio integration and are available from distributors like OnLogic, Advantech, Mouser, and others.

### Development Boards

Popular development platforms for prototyping and evaluation, including Raspberry Pi, NVIDIA Jetson, and NXP development kits.

### Virtual Environments

QEMU and other virtualization platforms for testing and development without physical hardware.

## Getting Started with Hardware

1. **Choose Your Platform**: Select hardware that matches your project requirements
2. **Follow Integration Guides**: Use our detailed guides for your specific hardware
3. **Deploy Peridio Agent**: Install and configure the Peridio agent on your device
4. **Test OTA Updates**: Validate update functionality with your hardware
5. **Scale Production**: Move from prototype to production deployment

## Hardware Requirements

Minimum requirements for Peridio integration:

- Linux-based operating system (or Android)
- Network connectivity (Ethernet, WiFi, or Cellular)
- Sufficient storage for update staging
- Secure boot capabilities (recommended)

## Need Help?

- Browse our hardware-specific guides
- Contact our support team for integration assistance
- Join our community forums for hardware discussions
