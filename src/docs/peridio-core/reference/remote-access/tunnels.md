---
title: 'Tunnels'
description: 'Tunnels in Peridio Core expose devices via public IP addresses and ports for secure remote access - asynchronous creation with state monitoring for connection readiness.'
---

Tunnels expose your device via a public IP address and port. The creation of tunnels are **asynchronous**. This means that a tunnel may not be open and available immediately after it's creation. You will then have to check the tunnel's `state` to see when it is `open` before attempting to connect.

Find additional information in the Admin API remote access [tunnels section](/peridio-core/tools/admin-api#tunnels) and the [creating tunnels guide](/peridio-core/guides/remote-access/creating-tunnels) guide.
