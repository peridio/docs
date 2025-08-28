# Peridio Core

## The Operating System for Your Fleet

Peridio Core is your secure, scalable device management platform — the control plane for your connected products once they're deployed.

It works hand-in-hand with Avocado OS to handle the operational side of embedded devices: delivering updates, monitoring health, and enabling secure remote access at scale.

## Why We Built It

Shipping hardware is only the beginning.

Once devices are in the field, you face new challenges:

- How do you roll out updates without bricking devices?
- How do you monitor and diagnose issues remotely?
- How do you keep your fleet secure over years in production?

Peridio Core was built to answer those questions — without requiring you to build a custom management layer from scratch.

## What Peridio Core Delivers

**OTA Updates** – Granular targeting, staged rollouts, rollback support.

**Observability** – Fleet-wide monitoring, telemetry, and analytics.

**Remote Access** – Secure VPN access to devices for diagnostics.

**Security** – Authentication, certificate management, compliance features.

**Integration-Friendly** – REST APIs, webhooks, and CLI tools for your workflows.

## How It Works with Avocado OS

Avocado OS gets your device to production readiness.
Peridio Core keeps it there — healthy, secure, and always up-to-date.

Together, they give you full lifecycle coverage: from first boot to the last deployed device.

## What You'll Find Inside the Peridio Core Documentation

The Peridio Core documentation is organized to guide you through understanding, implementing, and operating your device fleet at scale. We've structured the content to build on itself — start with the fundamentals and progress to advanced operations as your deployment grows.

### Core Concepts

Before diving into implementation, you'll want to understand the fundamental building blocks that make Peridio tick. This section maps out the resource hierarchy — from organizations down to individual devices — and explains how firmware, releases, and updates flow through the system. Think of it as your mental model for everything that follows.

### Device Management

This is where theory meets practice. Device Management covers the entire lifecycle of your connected products, from the moment they're manufactured to their eventual decommissioning. You'll learn about provisioning strategies, including our powerful Just-in-Time Provisioning that can automatically onboard thousands of devices without manual intervention. The section dives deep into organizing devices with products and cohorts, managing certificates and authentication, and maintaining fleet health at scale.

We cover everything from the basics of device identity through X.509 certificates to advanced topics like verification codes and CA certificate management. Whether you're provisioning ten devices or ten thousand, these guides will show you the most efficient path.

### Remote Access Tunnels

When devices are deployed in the field, getting hands-on access becomes critical for debugging and support. Our Tunnels documentation shows you how to establish secure, on-demand connections to remote devices without exposing them to the internet. You'll learn to set up SSH sessions for command-line access, HTTP tunnels for web interfaces, and implement proper security controls to protect your fleet. This section is essential for anyone who needs to diagnose issues, collect logs, or provide remote support.

### Firmware Management

Updates are the lifeblood of connected products, and this section covers everything about getting new code onto your devices safely. You'll understand the relationship between artifacts (your firmware types), binaries (the actual files), and bundles (grouped updates that deploy together).

The documentation walks through creating signed firmware packages, managing version histories, and setting up the infrastructure for secure, reliable updates. You'll learn about binary signatures for authenticity, multi-part updates for complex systems, and how to organize your firmware repository for long-term maintenance.

### System Architecture

For those who need to understand the platform at a deeper level, the System Architecture section reveals how Peridio operates under the hood. This includes our multi-tier storage approach, global CDN distribution, security model, and API design. It's particularly valuable for teams integrating Peridio into existing infrastructure or those planning large-scale deployments who need to understand performance characteristics and scaling patterns.

### Organization Management

Running a successful IoT deployment isn't just about devices and firmware — it's about people and processes too. This section covers user management, role-based access control, and how to structure your organization for effective collaboration. You'll learn to set up teams with appropriate permissions, manage API keys for automation, and implement security policies that protect your fleet while enabling productivity.
