---
title: 'Desktop: 1.0.0'
description: 'Avocado Desktop 1.0.0, the first stable release: Dark Mode and Avocado Classic themes, tabbed Settings, a Linux arm64 package and macOS USB/IP fixes.'
---

The first stable release of Avocado Desktop, released on 28 October. It
follows [1.0.0-rc.7](/changelog/august-2026/desktop-1.0.0-rc.7). Download it
from [Downloads](https://www.peridio.com/downloads#desktop).

## Themes and Settings

- **Dark Mode and Avocado Classic.** Every window, the terminal and the code
  editor use the same design tokens as Avocado Connect, and the sidebar
  matches Connect. Select a theme in Settings → Account. The default theme,
  "Grayscale Dark", is now called Dark Mode.
- **Settings has tabs:** Account, Agent, Virtual machine, Environment,
  Shortcuts, Updates, and Privacy & Help. The old Profile page is
  Settings → Account. Toggles and pickers save immediately.
- **The account menu matches Connect**, with the same items and keyboard
  shortcuts.
- **YAML colors by role in Dark Mode.** Keys, values, numbers and booleans
  have different colors, so `avocado.yaml` is easier to read.

## Projects and runs

- **Reinstall from scratch.** The Install drawer has an option that runs
  `avocado install -f`. Use it when the build stamps miss a change and Build
  reports "up to date".
- **One run per project at a time.** If a project already has an install,
  build, deploy or provision in progress, the app refuses a second run.
- **Importing a project opens it.**
- **The project header moved into the titlebar and a status bar**, so the
  editor starts one row higher.
- **The agent knows which project is open.** A new `get_active_project` tool
  lets a request such as "build and install this" act on the project in view.

## Linux

- **A Linux arm64 .deb**, tested on a Raspberry Pi 5 with Raspberry Pi OS
  (Debian 13).
- **The .deb recommends `pkexec` and the usbip tools**, so USB provisioning
  works after a plain `apt install`.
- **The AppImage starts again.** It now includes the GStreamer plugins.

## USB

- **qdl and adb no longer lose data over USB/IP on macOS.** A transfer that the
  VM cancels is now cancelled on the device too, and transfers run
  concurrently.
- **A booted Jetson keeps its USB network and serial console.** The app
  captures the generic Linux gadget ID (`1d6b:0104`) only during a Jetson
  flash.
- **The macOS USB helper exits after the app quits**, and it releases devices
  that are unplugged.
- **USB diagnostics.** The Events pane logs each USB state change. A device
  stuck at `attaching` times out with an error that gives the cause.

## Agent chat

- **Chat works again.** Every prompt failed with "Claude Code 2.1.44 does not
  support this model". The app now bundles the renamed
  `@agentclientprotocol/claude-agent-acp` adapter. Claude Code is a native
  binary in the bundle, which adds about 180 MB to the app.
- **The model picker lists the models that Claude Code reports**, and it
  switches the live session without a restart of the agent.

## Other fixes

- An install or build that takes more than 30 minutes now shows its result.
- The idle app no longer uses CPU or leaks memory in WebKit.
- Cancel stops the correct run, also during preflight.
- Saving in the editor keeps the file mode and writes through symlinks.
- Reset /var is in a Danger Zone and asks you to type `RESET`.
- If `avocado clean` takes more than 5 minutes, a project delete stops and the
  project stays in place.
- The last terminal row is no longer cut in half.

## Security

- The macOS USB helper limits a single URB to 64 MiB and drops a connection
  that stalls.
- Dependency updates for RustSec advisories in rustls, rustls-webpki,
  webpki-roots and quinn-proto.
- Third-party notices and an LGPL relink kit for libusb are published with each
  DMG.
