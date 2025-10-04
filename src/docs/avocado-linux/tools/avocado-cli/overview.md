---
title: Overview
sidebar_position: 1
description: 'Avocado CLI tool for initializing, configuring, building, and provisioning Avocado OS projects with comprehensive development workflow support.'
---

The Avocado CLI is a powerful tool that allows you to initialize, configure, build, and provision Avocado OS projects.

## Installation

1. Visit [GitHub releases](https://github.com/avocado-linux/avocado-cli/releases)
2. Download the appropriate binary for your operating system from the latest release
3. Extract the binary and place it in your PATH

### Verify Installation

After installation, verify that the CLI is working correctly:

```bash
avocado --version
```

This should display the version information for the Avocado CLI.

## Upgrading

To upgrade to the latest version, you can use the built-in upgrade command:

```bash
avocado upgrade
```

:::tip elevated permissions
Depending on where you place the CLI binary on your system, the upgrade command may require elevated permissions (e.g. sudo) to write the upgraded binary.
:::
