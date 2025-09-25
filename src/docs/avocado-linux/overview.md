---
sidebar_position: 0
title: 'Overview'
description: 'Embedded product development framework with immutable Linux, live hardware-in-the-loop development, and enterprise-grade security for rapid prototyping to production.'
---

Avocado OS is a comprehensive embedded product development framework that resolves the tension between rapid development iteration and production-grade security through a sophisticated layered architecture built on Yocto and systemd. Unlike conventional embedded Linux distributions, it combines an immutable, cryptographically verifiable base system with composable [extensions](./references/extensions) to deliver web development-like iteration speeds through live NFS-mounted extensions and [hardware-in-the-loop](./references/hardware-in-the-loop) debugging, while simultaneously facilitating enterprise-grade security features including secure boot with hardware root of trust, dm-verity filesystem integrity verification, LUKS encryption with hardware-backed key management, and atomic A/B updates with automatic rollback. The framework provides streamlined [provisioning](./references/provisioning) workflows that transform build artifacts into deployable images for various target hardware platforms.

## Getting started

Ready to experience this unified development-to-production workflow? Start with [getting started](./guides/getting-started) to provision your first device and see how Avocado transforms embedded Linux development from a complex, time-consuming process into an efficient, enjoyable experience that scales from prototype to production fleet.

## Learn more

This documentation provides comprehensive resources to guide you from initial setup through production deployment. You'll find [references](./references/extensions) covering architecture and configuration options, step-by-step [guides](./guides/getting-started) for essential workflows, and [tools](./tools/avocado-cli/overview) for building and managing your Avocado systems.
