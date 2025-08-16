---
title: Supported Hardware
hide_table_of_contents: true
---

import './support-matrix.css';

# Supported Hardware

Peridio supports a wide range of hardware platforms for IoT device management and OTA updates. Our platform integrates seamlessly with various processors, development boards, and production-ready systems.

## Hardware Support Matrix

<div className="support-matrix-container">
<table className="support-matrix">
  <thead>
    <tr>
      <th>Hardware Platform</th>
      <th>Provisioning</th>
      <th>HITL</th>
      <th>Side Loading</th>
      <th>Extension OTA</th>
      <th>OS OTA</th>
      <th>Secure Boot</th>
      <th>Remote Access Tunnels</th>
    </tr>
  </thead>
  <tbody>
    <tr className="category-header">
      <td colSpan="8"><strong>Production Ready</strong></td>
    </tr>
    <tr>
      <td><strong><a href="/solutions/advantech/icam-540" target="_blank" rel="noopener noreferrer">Advantech ICAM-540</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr>
      <td><strong><a href="/solutions/onlogic" target="_blank" rel="noopener noreferrer">OnLogic FR-201</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr>
      <td><strong><a href="/solutions/seeed" target="_blank" rel="noopener noreferrer">Seeed reTerminal</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr className="category-header">
      <td colSpan="8"><strong>EVKs</strong></td>
    </tr>
    <tr>
      <td><strong><a href="/dev-center/hardware/nvidia/jetson-orin-nano-evk" target="_blank" rel="noopener noreferrer">NVIDIA Jetson Orin Nano EVK</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-partial" title="In Development">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr>
      <td><strong><a href="/dev-center/hardware/nxp/imx8mp" target="_blank" rel="noopener noreferrer">NXP i.MX 8MP EVK</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr>
      <td><strong><a href="/dev-center/hardware/nxp/frdm-imx-93" target="_blank" rel="noopener noreferrer">NXP i.MX 93 FRDM SBC</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr>
      <td><strong><a href="/dev-center/hardware/raspberry-pi/compute-module-4" target="_blank" rel="noopener noreferrer">Raspberry Pi 4 Compute Module</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
    <tr className="category-header">
      <td colSpan="8"><strong>Virtual Environment</strong></td>
    </tr>
    <tr>
      <td><strong><a href="/dev-center/hardware/qemu" target="_blank" rel="noopener noreferrer">QEMU (Virtual Machine)</a></strong></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
      <td><span className="status-none" title="Not Applicable">●</span></td>
      <td><span className="status-full" title="Fully Supported">●</span></td>
    </tr>
  </tbody>
</table>
</div>

<div className="support-legend">
  <h3>Legend</h3>
  <ul>
    <li><span className="status-full">●</span> Fully Supported</li>
    <li><span className="status-partial">●</span> In Development</li>
    <li><span className="status-none">●</span> Not Supported</li>
  </ul>
</div>

## Under Evaluation

<div className="support-matrix-container">
<table className="support-matrix">
  <thead>
    <tr>
      <th>Hardware Platform</th>
      <th>Provisioning</th>
      <th>HITL</th>
      <th>Side Loading</th>
      <th>Extension OTA</th>
      <th>OS OTA</th>
      <th>Secure Boot</th>
      <th>Remote Access Tunnels</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>BeagleBone AI-64</strong></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>Intel NUC</strong></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>NVIDIA Jetson Nano</strong></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>Qualcomm RB5</strong></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>Raspberry Pi 5</strong></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>STM32MP1 Discovery Kit</strong></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
    <tr>
      <td><strong>Toradex Modules</strong></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
      <td><span className="status-none" title="Not Supported">●</span></td>
    </tr>
  </tbody>
</table>
</div>

## Feature Descriptions

**[Provisioning](/dev-center/getting-started/provision-device)** - Secure device onboarding and authentication setup for connecting devices to Peridio.

**[HITL (Hardware in the Loop)](/dev-center/getting-started/hardware-in-the-loop)** - Real-time device testing and development support for continuous integration workflows.

**[Side Loading](/dev-center/getting-started/desktop-deploy)** - Direct firmware deployment for development and debugging without network connectivity.

**[Extension OTA](/dev-center/peridio-core/ota/overview)** - Over-the-air updates for applications, containers, and add-on components.

**[OS OTA](/dev-center/peridio-core/ota/overview)** - Complete operating system updates with rollback protection and atomic operations.

**[Secure Boot](/dev-center/avocado-linux/security-implementation)** - Hardware-backed secure boot chain with signature verification and chain of trust.

**[Remote Access Tunnels](/dev-center/tunnels/overview)** - Secure SSH tunneling for remote device management and troubleshooting.

## Request Hardware Support

If you'd like Peridio to support your hardware platform, <a href="https://calendly.com/peridio/book-a-meeting" target="_blank" rel="noopener noreferrer">click here to book a meeting</a> with our team.