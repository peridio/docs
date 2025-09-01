# Agent

An agent is the software that runs on devices and integrates with Peridio. You can develop and maintain your own agent or use the [Peridio Daemon](/integration/guides/peridio-core-custom-integration/overview#agent).

## Peridio Daemon

The official Peridio Daemon is made available for use via a [buildroot external tree](https://buildroot.org/downloads/manual/manual.html#outside-br-custom), available on GitHub at [peridio/buildroot-external-peridio](https://github.com/peridio/buildroot-external-peridio). The underlying buildroot package's source code is also available on GitHub at [peridio/peridiod](https://github.com/peridio/peridiod).

## Features and capabilities

Agents collaborate with Peridio to provide the following functionality:

- Automatically revertible A/B updates.
- Delta updates.
- Device status.
- Release installation.
- Remote shell.
- Remote reboot.

While an agent may provide all of the aforementioned features, it does not have to. There is
however an expectation that all agents will:

- Be able to use a device's certificate and private key with TLS.
- Check for updates via the Admin API.
- Download updates.
- Install updates.
- Report update status.
