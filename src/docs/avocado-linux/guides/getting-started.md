---
title: 'Getting started'
description: 'Complete guide to Avocado Linux development - provision devices, hardware-in-the-loop development, and sideload updates for embedded systems.'
---

This guide connects three distinct workflows that build upon each other:

1. **Provision a device** – Create your first Avocado project and boot a fully functional system
2. **Hardware-in-the-loop development** – Iterate at web development speeds by mounting code directly into running devices
3. **Sideload an update** – Push updates from your development machine to test changes on real hardware

Each workflow introduces concepts you'll use throughout your product lifecycle, from prototype to production.

## Choose your hardware

Before you begin, consider what hardware you'll use. You can choose from any of our supported [hardware](../../hardware/support-matrix).

:::tip trial with qemu
Start with QEMU for the fastest path to understanding core concepts. QEMU is a virtual target that runs on your development machine, so you can experience the full workflow without waiting for hardware.
:::

Whichever hardware you choose, it will have an overview of its features and specifications. For example, the [NVIDIA Jetson Orin Nano](/hardware/nvidia/jetson-orin-nano-developer-kit/provision) has a powerful GPU and high-speed connectivity, while the [Raspberry Pi 4 Model B](/hardware/raspberry-pi/raspberry-pi-4-model-b/provision) is a low-cost, versatile option.

### Evaluate with virtual device

In this case, continue to the [three step journey](#the-three-step-journey).

### Build with real hardware

Jump directly to hardware-specific guides. You'll follow the same core workflows, but on physical devices:

- [NVIDIA Jetson Orin Nano](/hardware/nvidia/jetson-orin-nano-developer-kit/provision)
- [Raspberry Pi 4 Model B](/hardware/raspberry-pi/raspberry-pi-4-model-b/provision)

**Custom hardware?** [Contact us](https://www.peridio.com/contact) for support with your specific platform.

## Prerequisites

Before starting, ensure you have:

- **Development machine**: Linux (Ubuntu 20.04+) or macOS (10.12+)
- **Hardware** (optional): One of our supported devices

## The three-step journey

### Step 1: Provision a device

**What you'll learn:** Project setup, building custom images, and booting your first Avocado system.

**Where to go:**

- **QEMU users:** [Provision with QEMU](../../../hardware/qemu/x86-64/provision)
- **Hardware users:** Follow your device-specific provision guide

**Key outcomes:**

- Understand Avocado project structure
- Build and boot a custom system image
- Experience immutable system concepts

---

### Step 2: Hardware-in-the-loop development

**What you'll learn:** How to mount code directly into running devices for instant feedback loops.

**Where to go:** [Hardware-in-the-loop guide](/avocado-linux/guides/hardware-in-the-loop)

**Prerequisites:** Complete Step 1 with a running device

**Key outcomes:**

- Mount extensions via NFS for live development
- Make changes that appear instantly on the device
- Understand the development-to-production workflow

---

### Step 3: Sideload an update

**What you'll learn:** Push updates directly from your workstation to running devices during development.

**Where to go:** [Sideload an update guide](/avocado-linux/guides/sideloading)

**Prerequisites:** Complete Steps 1 and 2

**Key outcomes:**

- Deploy atomic updates to running systems
- Test update workflows before production
- Understand A/B update mechanics

## What's next

After completing these three workflows, you'll have hands-on experience with:

- **Immutable systems** and how they ensure consistency
- **System extensions** for modular application deployment
- **Development workflows** that scale from prototype to production
- **Update mechanics** with automatic rollback capabilities

### Recommended next steps:

- **For production:** Explore [Peridio Core](/peridio-core/overview) for cloud-managed updates
- **For custom hardware:** [Contact us](https://www.peridio.com/contact) for support with your specific platform
- **For advanced features:** Dive into [security features](/avocado-linux/references/security)

## Getting help

The workflows are designed to build progressively – each guide assumes you've completed the previous ones. If you get stuck:

1. Check that you've completed prerequisite steps
2. Review the [community resources](/avocado-linux/community) for help options
3. [Join our community](https://www.peridio.com/contact) for support

Ready to begin? Start with [provisioning your first device](../../../hardware/qemu/x86-64/provision).
