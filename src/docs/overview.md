---
sidebar_position: 0
title: 'Overview'
description: 'Complete embedded Linux development platform combining Avocado Linux and Peridio Core for rapid development and production-ready IoT device management.'
---

Peridio delivers a complete embedded Linux development platform that eliminates the traditional choice between rapid development and production readiness. The platform combines Avocado Linux, an immutable embedded Linux distribution for development and deployment, with Peridio Core for enterprise device management, enabling teams to build secure, reliable embedded systems without sacrificing development velocity.

## Avocado Linux

- [Overview](/avocado-linux/overview)
- [Getting started](/avocado-linux/guides/getting-started)

Avocado Linux comprises an embedded product development framework rather than a traditional operating system. Built on a composable, extension-based architecture, it enables developers to prototype rapidly with live hardware-in-the-loop development, then seamlessly transition to production using the same codebase and security features.

The system combines an immutable core OS with modular extensions for applications and configurations. Developers work in containerized SDK environments with extensions NFS-mounted to running hardware for instant iteration. Production deployments use the same architecture while facilitating secure boot, full disk encryption, and cryptographic verification of all components.

## Peridio Core

- [Overview](/peridio-core/overview)
- [Getting started](/peridio-core/guides/getting-started)

Peridio Core provides enterprise device management for production fleets, handling secure over-the-air updates, remote access, and monitoring at scale. It works seamlessly with Avocado Linux's extension system to enable atomic updates while maintaining system integrity.

The platform manages device fleets through a comprehensive dashboard that provides real-time visibility into device health, deployment status, and performance metrics. Built for production reliability, it includes features like rollback capabilities, staged deployments, and integration with existing CI/CD pipelines.
