---
title: Overview
sidebar_position: 1
description: 'How Peridio Daemon uses custom metadata to configure binary installation behavior.'
---

# Custom metadata overview

Peridio Daemon uses custom metadata to determine how binaries should be installed on devices. This metadata specifies which installer to use and provides installer-specific configuration options.

## Purpose

Custom metadata bridges the gap between binary content and device installation requirements. Different binary types require different installation approaches - firmware images need specialized tools like fwup, while application packages use system package managers. Custom metadata allows operators to specify these requirements when creating artifacts or bundles.

## Metadata inheritance

Custom metadata follows an inheritance hierarchy where more specific configurations override general ones. Metadata can be set at the artifact level for consistent defaults, overridden for specific artifact versions, and further customized when binaries are associated with bundles.

## Supported installers

The daemon supports multiple installer types to handle different binary formats and deployment scenarios. These include firmware update tools like fwup and SWUpdate, system package managers like apt and yum, and file-based installation for configuration files and scripts.

## Configuration

Custom metadata is structured JSON that specifies the installer type, installer-specific options, and whether a reboot is required after installation. For complete schema details and configuration examples, see the [custom metadata schema](./schema.mdx).

## Setting metadata

Custom metadata can be configured through the Peridio CLI when creating artifacts, artifact versions, or bundles. It can also be set via the Admin API for programmatic workflows. The CLI provides the most straightforward approach for most use cases.

## Multi-binary coordination

Bundles containing multiple binaries can have different installation requirements for each binary. The daemon handles installation sequencing and reboot coordination automatically, ensuring all binaries are installed successfully before any system restart occurs.

## See also

- [Custom metadata schema](./schema.mdx) - Complete configuration reference
- [Configuration overview](../run-time-configuration/overview.md) - Global daemon settings
