---
title: 'Devices'
description: 'Device management in Peridio Core - provision devices, manage tags, quarantine controls, and networking for secure IoT fleet operations.'
---

A device is a thing you wish to distribute updates to.

## Provisioning

Devices can be provisioned ad-hoc or via [just in time provisioning](just-in-time-provisioning) (JITP). The former is sometimes convenient when just starting out or taking a one off action, but quickly becomes untenable. When you wish to optimize the process of provisioning devices, it is recommended to leverage JITP.

## Tags

Devices can be associated with tags to achieve logical groupings. These grouping may have external meaning to you, but they may also be used within Peridio to adjust the scope of devices to which a deployment is applicable as part of its configured [conditions](/peridio-core/reference/long-term-support/deployments#tags).

## Quarantine

Devices have a boolean `quarantined` field. When `true`, the device is ineligible for updates from releases and deployments. You can quarantine and unquarantine devices with the CLI, admin API, and web console. Devices can be [automatically quarantined](/peridio-core/reference/long-term-support/deployments#automatically-quarantine-devices) by deployments during a [get-device-update](/peridio-core/tools/device-api#devices/operation/get-device-update) request.

## Networking

Devices need to connect to Peridio in order to receive updates and for remote access. In secure environments where firewalls exists, you may need to whitelist domains, ips, and/or ports. Connections are exclusively outbound-initiated.

### Inbound

- No ports need to be exposed here.

### Outbound

- Device Updates
  - Hostname: `device.cremini.peridio.com`
  - Protocols: `HTTPS` and `WSS`
  - Ports: `443`

- Tunnels
  - IP: `3.142.155.49`
  - Protocols: `UDP`
  - Ports: `49152-65535` (RFC6335)
