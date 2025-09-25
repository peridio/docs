---
title: 'Cloud delegated updates'
description: 'Enable backend services to integrate with Peridio for device update management without direct device-to-Peridio communication using Admin API.'
---

Cloud delegated updates enable your backend services to integrate with Peridio to check for updates and manage device update state without requiring direct device-to-Peridio communication. This guide explains how to implement cloud delegated updates using Peridio's Admin API.

## Overview

In some architectures, devices connect to your backend services rather than directly to Peridio. Cloud delegated updates allow your backend to:

- Check for available updates on behalf of devices.
- Manage device update state in Peridio.
- Leverage Admin API authentication and authorization controls.
- Facilitate cloud-to-cloud integrations.

## Prerequisites

- Admin API access credentials.
- Proper authorization with the required permissions:
  - `device.check_for_update`
  - `binary.download`
- Device PRNs for the devices you want to manage.
- Current update state for the devices you want to manage.
  - Release PRN.
  - Bundle PRN.
  - Release version.

## Check for updates

To check for available updates, use the Admin API [get-device-udpate](/peridio-core/tools/admin-api#devices/operation/devices-get-update) route. When an update is available, the response will include a manifest of the bundle contents including binary details and pre-signed download URLs. This request serves the dual purpose of checking for an updates as well as reporting the device's current update state to Peridio.

Checking for an update causes Peridio to perform bundle resolution. For more context, see the
[bundle distribution](/peridio-core/reference/bundle-management/bundle-distribution) reference.
