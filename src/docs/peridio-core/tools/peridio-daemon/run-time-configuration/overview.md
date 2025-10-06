---
title: Overview
sidebar_position: 1
description: 'Peridio Daemon configuration using JSON files with device identity, update policies, and platform connectivity settings.'
---

Peridiod uses a JSON configuration file to define device identity, update behavior, and connectivity settings.

## Location

Peridiod is configured via a JSON formatted file on the filesystem.

The search order is:

1. `$PERIDIO_CONFIG_FILE`
2. `$XDG_CONFIG_HOME/peridio/peridio-config.json`
3. `$HOME/.config/peridio/peridio-config.json`

## Concepts

### Device identity

The most critical configuration is device identity, which determines how peridiod authenticates with the Peridio platform. Identity can be sourced from filesystem files, environment variables, U-Boot environment, or hardware security modules. File-based approaches offer flexibility and convenience for many deployments, while hardware-based approaches like PKCS#11 provide the strongest security guarantees.

### Update policies

Update behavior is controlled through polling configuration, target filtering, and cryptographic verification. Devices only install binaries matching their configured targets and signed with trusted keys. Update polling can be disabled for push-only deployments or adjusted based on network constraints.

### Remote connectivity

Remote access tunnels provide WireGuard-based secure connectivity to devices behind NAT or firewalls. Once established, tunnels allow interaction with any service running on the device - SSH servers, web interfaces, custom applications, or direct protocol access.

### Platform integration

Configuration approaches vary by deployment environment. Embedded systems often leverage U-Boot environment storage for credentials that persist across firmware updates. Containerized deployments typically rely on environment variables for dynamic credential injection. Development and testing environments benefit from file-based configuration for rapid iteration.
