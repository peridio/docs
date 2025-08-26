# Agent

An agent is the software that runs on devices and integrates with Peridio. You can develop and maintain your own agent or use the [Peridio Agent](/dev-center/integration/guides/peridio-core-custom-integration/introduction#agent).

## Peridio Agent

The official agent is made available for use via a [buildroot external tree](https://buildroot.org/downloads/manual/manual.html#outside-br-custom), available on GitHub at [peridio/buildroot-external-peridio](https://github.com/peridio/buildroot-external-peridio). The underlying buildroot package's source code is also available on GitHub at [peridio/peridiod](https://github.com/peridio/peridiod).

## Features and Capabilities

Agents collaborate with Peridio to provide the following functionality:

- Automatically revertible A/B updates
- Delta updates
- Device status reporting
- Release installation
- Remote shell access
- Remote reboot capabilities

While an agent may provide all of the aforementioned features, it does not have to. There is however an expectation that all agents will:

- Be able to use a device's certificate and private key with TLS
- Check for updates via the Device API
- Download updates securely
- Install updates reliably
- Report update status back to Peridio

## Custom Agent Development

If you choose to develop your own agent, ensure it implements:

### Core Requirements

- **Authentication**: Use X.509 certificates for device authentication
- **API Integration**: Communicate with the Peridio Device API
- **Update Management**: Download, verify, and install firmware updates
- **Status Reporting**: Send device health and update progress

### Recommended Features

- **Rollback Support**: Ability to revert failed updates
- **Delta Updates**: Minimize bandwidth with incremental updates
- **Remote Access**: Enable SSH or other remote management
- **Telemetry**: Collect and report device metrics

## Integration

For detailed integration instructions, see:

- [Peridio Agent Integration](/dev-center/integration/peridiod-agent)
- [Device API Reference](/device-api)
