---
sidebar_position: 1
title: 'Peridio CLI'
description: 'Command-line interface for Peridio platform - comprehensive tools for managing devices, binaries, deployments, and services with API integration.'
---

The Peridio CLI is a command-line interface for interacting with Peridio's platform and services. It provides a comprehensive set of tools for managing devices, binaries, deployments, and more.

## Installation

Download the latest release from the [Peridio CLI releases page](https://github.com/peridio/peridio-cli/releases).

## Getting started

After installation, configure your CLI with your API credentials:

```bash
peridio config profiles create
```

## Configuration files

The CLI stores configuration in platform-specific locations:

- **macOS**: `~/Library/Application Support/peridio/`
- **Linux**: `~/.config/peridio/`
- **Windows**: `%APPDATA%\peridio\`

Configuration includes:

- `config.json` - CLI settings and profiles
- `credentials.json` - API keys and authentication tokens

## Usage

```bash
peridio [OPTIONS] <COMMAND>
```

### Global options

- `-a, --api-key <API_KEY>` - API key for authentication (env: `PERIDIO_API_KEY`)
- `-b, --base-url <BASE_URL>` - Base URL for the Peridio API (env: `PERIDIO_BASE_URL`)
- `-c, --ca-path <CA_PATH>` - Path to CA certificate (env: `PERIDIO_CA_PATH`)
- `-p, --profile <PROFILE>` - Configuration profile to use (env: `PERIDIO_PROFILE`)
- `-d, --config-directory <CONFIG_DIRECTORY>` - Config directory path (env: `PERIDIO_CONFIG_DIRECTORY`)
- `-h, --help` - Print help information
- `-V, --version` - Print version information

## Available commands

The Peridio CLI provides commands organized into the following categories:

### Device and product management

- `devices` - Manage devices
- `products` - Manage products
- `cohorts` - Manage device cohorts

### Binary and artifact management

- `artifacts` - Manage artifacts
- `artifact-versions` - Manage artifact versions
- `binaries` - Manage binaries
- `binary-parts` - Manage binary parts
- `binary-signatures` - Manage binary signatures
- `signing-keys` - Manage signing keys

### Bundle and release management

- `bundles` - Manage bundles
- `bundle-overrides` - Manage bundle overrides
- `releases` - Manage releases

### Security and certificates

- `ca-certificates` - Manage CA certificates
- `device-certificates` - Manage device certificates
- `x509` - Create X.509 certificates and private keys

### Remote access

- `tunnels` - Manage remote access tunnels

### Integration and automation

- `webhooks` - Manage webhooks

### CLI management

- `config` - Manage CLI configuration
- `users` - Inspect user identity
- `upgrade` - Upgrade the CLI

## Examples

### Create a new device

```bash
peridio devices create --product-name "MyProduct" --identifier "device-001"
```

### Upload a binary

```bash
peridio binaries create --artifact-name "firmware" --path ./firmware.bin
```

### Create a signing key

```bash
peridio signing-keys create --name "production-key"
```

For detailed information about each command, use the `--help` flag:

```bash
peridio <command> --help
```
