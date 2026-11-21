---
title: 'Desktop: 1.1.0'
description: 'Avocado Desktop 1.1.0: Update & Install moves a project to the latest snapshot, builds without a docker client, and macOS USB/IP fixes.'
---

Released on 19 November. It follows
[1.0.0](/changelog/october-2026/desktop-1.0.0). Download it from
[Downloads](https://www.peridio.com/downloads#desktop). An installed 1.0.0 on
macOS offers the update in **Settings → Updates**.

## Update & Install

- **Move a project to the latest snapshot without a terminal.** The Install
  drawer has a new **Update to the latest snapshot** box. Checked, the button
  reads **Update & Install**. It runs `avocado update` for the selected target,
  then Install, and Install runs only if the update succeeded.
- **The run log lists what moved** in that target's lock.
- **Revert** puts the lock from before the update back, then runs Clean and
  Install. It appears after an Update & Install that succeeded, and Desktop
  keeps that lock until the app quits or its window reloads.
- **The agent can do the same.** The `run_project_action` tool accepts
  `update`.

See
[Update to the latest snapshot](/avocado-desktop/projects#update-to-the-latest-snapshot).

## No docker client needed

- **Install and Build no longer need the `docker` command** on macOS or Linux.
  With no `docker` binary, Desktop goes through the Avocado CLI's own Docker
  Engine client, and the **SDK Containers** card does too. This needs Avocado
  CLI 1.2.0 or later, which the app bundles.
- **An older CLI says what to do.** If the CLI Desktop runs has no engine
  client, the "install the Docker CLI" message now also suggests updating the
  CLI.
- On macOS you never need Docker Desktop. On Linux you still need Docker Engine
  running on the host.

## Fixes

- **macOS USB/IP keeps later transfers in sync.** The helper closes a
  submission with a bad direction or too many isochronous packets, and reads
  isochronous descriptors before it rejects an unsupported transfer.
- **Pre-release CLIs are offered the final release.** The version check ranked
  `1.0.0-rc.5` above `1.0.0`, so anyone on an rc saw "up to date". Pre-releases
  now sort below their release, and `rc.9` below `rc.10`.
- **The Homebrew cask is current again.** Each release opens the cask update as
  a pull request on the tap.
- **CI runs the macOS tests and the security audit again.**

## Security

- Dependency updates for RustSec advisories in quinn-udp, anyhow and rustix.
- tauri-plugin-updater 2.14.1, which moves zip to 9.4.1 for two advisories.
