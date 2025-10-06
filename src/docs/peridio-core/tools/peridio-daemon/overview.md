---
title: Overview
sidebar_position: 1
description: 'Peridio Daemon is a lightweight service for managing OTA updates and device connectivity on embedded Linux systems.'
---

# Overview

Peridio Daemon (peridiod) is a lightweight background service that runs on embedded Linux devices to handle over-the-air updates and communication with the Peridio platform.

## Key capabilities

- **Automatic updates** - Polls for and installs firmware and application updates
- **Multi-installer support** - Handles various update formats (fwup, deb, rpm, opkg, swupdate, file)
- **Remote access tunnels** - Enables secure WireGuard-based remote access to devices
- **Device authentication** - Uses X.509 certificates with multiple storage backends
- **State tracking** - Maintains update state in U-Boot environment variables

## Architecture

Peridiod runs as a single system service that connects to Peridio Cloud via WebSocket for real-time communication and HTTPS for downloads.

The daemon supports multiple identity storage methods:

- File-based certificates
- Environment variables
- U-Boot environment
- PKCS#11 hardware security modules

## Integration

Peridiod integrates with existing embedded Linux workflows through:

- Build system support (Yocto, Buildroot)
- Package managers (RPM, DEB, OPKG)
- Container orchestration (Docker, Kubernetes)
- Direct binary deployment
- Custom application frameworks
