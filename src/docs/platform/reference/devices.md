---
title: Devices
---

A device is a thing you wish to distribute updates to.

## Provisioning

Devices can be provisioned ad-hoc or via [just in time provisioning](just-in-time-provisioning) (JITP). The former is sometimes convenient when just starting out or taking a one off action, but quickly becomes untenable. When you wish to optimize the process of provisioning devices, it is recommended to leverage JITP.

## Tags

Devices can be associated with tags to achieve logical groupings. These grouping may have external meaning to you, but they may also be used within Peridio to adjust the scope of devices to which a deployment is applicable as part of its configured [conditions](deployments#tags).

## Quarantine

Device's have a boolean `quarantined` field. When `true`, the device is ineligible for updates from releases and deployments. You can quarantine and unquarantine devices with the CLI, admin API, and web console. Devices can be [automatically quarantined](/platform/reference/deployments#automatically-quarantine-devices) by deployments during a [get-device-update](/device-api#devices/operation/get-device-update) request.
