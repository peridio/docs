---
title: Configuration
sidebar_position: 3
description: 'Avocado CLI configuration guide - precedence of CLI arguments, environment variables, and configuration files for project setup and board support.'
---

The Avocado config defines your project from board support to provisioning, and everything in between.

## Precedence of supplied values

The Avocado CLI can be configured three ways, from highest to lowest precedence:

1. CLI arguments
2. Environment variables
3. Configuration files

## Configuration files

The Avocado CLI uses a single configuration file to define your project settings, build configurations, dependencies, and provisioning profiles.

By default, the CLI looks for a configuration file named `avocado.toml` in the current working directory. This can be configured to use a different file name or location.

For detailed information about all available configuration options, see the [config schema](./config-schema.mdx).

## Examples

Example configuration files are available in the [Avocado OS repository](https://github.com/avocado-linux/avocado-os/tree/main/references). These examples demonstrate common configuration patterns for different use cases and target platforms.
