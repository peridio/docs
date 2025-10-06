---
title: Remote access tunnels
sidebar_position: 7
description: 'How Peridio Daemon enables and manages remote access tunnels for device connectivity.'
---

# Remote access tunnels

Peridio Daemon provides support for remote access tunnels, allowing operators to connect securely to devices for administration and troubleshooting.

## Daemon role

The daemon handles tunnel establishment and teardown when requested by the Peridio platform. It manages network interface creation, service exposure, and connection lifecycle without requiring manual intervention on the device.

## Configuration

Tunnel functionality is configured through the daemon's JSON configuration file. This includes enabling tunnel support, specifying accessible services, and defining integration hooks.

See the [configuration schema](/peridio-core/tools/peridio-daemon/run-time-configuration/schema) for complete configuration options.

## Platform integration

Tunnels are created through the Peridio Console or CLI tools. Once established, they provide access to configured device services for remote administration tasks.

For tunnel management and usage, see the [remote access guides](/peridio-core/guides/remote-access/introduction-to-remote-access) and [tunnels reference](/peridio-core/reference/remote-access/tunnels).
