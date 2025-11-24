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

## Static IPs

For environments with strict firewall policies requiring IP whitelisting, Peridio offers static IP addresses upon request. Contact support to enable this feature for your organization.

When enabled, device traffic will route through the following static IPs when communicating with Peridio:

### CDN (Binary Distribution):

`3.163.252.145`, `3.163.251.145`, `3.163.250.145`, `3.163.249.145`,
`3.163.248.145`, `3.163.247.145`, `3.163.246.145`, `3.163.245.145`,
`3.163.244.145`, `3.163.243.145`, `3.163.242.145`, `3.163.241.145`,
`3.163.240.145`, `3.163.239.145`, `3.163.238.145`, `3.163.237.145`,
`3.163.236.145`, `3.163.235.145`, `3.163.234.145`, `3.163.233.145`,
`3.163.232.145`

Note that all connections remain outbound-initiated on port 443.

## Networking

Devices need to connect to Peridio in order to receive updates and for remote access. In secure environments where firewalls exists, you may need to whitelist domains, ips, and/or ports. Connections are exclusively outbound-initiated.

### Inbound

- No ports need to be exposed here.

### Outbound

- CDN
  - Protocols: `HTTPS`
  - Ports: `443`
  - _Static IPs available_

- Device Updates
  - Hostname: `device.cremini.peridio.com`
  - Protocols: `HTTPS` and `WSS`
  - Ports: `443`
  - _Static IPs available_

- Tunnels
  - IP: `3.142.155.49`
  - Protocols: `UDP`
  - Ports: `49152-65535` (RFC6335)
