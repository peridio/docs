---
title: 'Desktop: 0.4.4'
description: 'Avocado Desktop 0.x — from the first macOS host through the Tauri rebuild.'
---

The 0.x line of Avocado Desktop, from the first macOS host through the Tauri
rebuild.

## The first macOS host

Avocado Desktop began as a macOS menu-bar app (`LSUIElement`, no Dock icon,
macOS 14+) that owns the local Avocado environment so the CLI doesn't have to:

- **Owns the local QEMU VM** — spawns `qemu-system-aarch64`, holds it in a
  starting state until the guest agent responds, then tracks its lifecycle.
- **USB pass-through** — an IOKit watcher drives a SUID-root `AvocadoUSBIPHelper`
  that speaks the USB/IP wire protocol on TCP 3240, with per-device routing and
  stuck-attach detection.
- **Talks to the CLI over IPC** — a JSON-line socket handling `vm.status` /
  `vm.start` / `vm.stop` / `vm.wait_ready`, plus a Mac↔in-VM control plane over
  virtio-serial.
- **Dashboard + provisioning** — Overview / USB Devices / Projects / Settings /
  Events / Help panes, a menu-bar controller with live VM/USB/container status,
  and a serial-monitor-backed provisioning flow.
- Centralized logging under `~/Library/Logs/Avocado/` with rotation.

## Agent chat and an MCP host

- **Agent chat panel** — a right-side chat surface (⌘⇧A) backed by an agent that
  speaks Zed's Agent Client Protocol, folded into the main dashboard window.
- **MCP host server** on `127.0.0.1:11551`, reachable from inside the VM at
  `10.0.2.2` via QEMU's user-mode NAT. Its tools let an agent drive the host:
  `run_avocado_cli` (delegate `avocado` invocations with the user's own CLI,
  config, and credentials), `await_avocado_cli`, scheduled follow-ups rendered as
  cancelable pills, plus `navigate`, `notify_chat`, `list_serial_devices`, and
  project-lifecycle tools.
- **avocado-mcp bridge** — an in-process proxy that spawns the `avocado-mcp` npm
  package so its tools share the same transport as the host tools.
- **YAML config view** — a syntax-colored `avocado.yaml` editor with clickable
  cross-references between runtime and extension definitions.
- **VM lifecycle follows the CLI** — with `avocado-cli` 0.40 owning the QEMU
  lifecycle, the supervisor treats the CLI's pidfile as source of truth,
  fixing orphaned QEMU processes.

## An editor and project management

- **Monaco editor pane** — replaces the read-only YAML viewer with Monaco in a
  WKWebView (custom `avocado` theme, file tree, Cmd+S write-through).
- **Project management** — a Blank project flow (`avocado init`), rename /
  duplicate with in-flight-run guards, and import of external folders (with a
  non-destructive "remove from list").
- **MCP + target picker** — the target picker and MCP `list_targets` honor
  `AVOCADO_REPO_URL`, and `run_avocado_cli` redirects install/build/provision to
  `run_project_action` instead of running silently in the background.

## Rebuilt on Tauri

0.4.0 rebuilds the desktop on **Tauri** (it was SwiftUI). The bundle identifier
and DMG URL are unchanged, so installing over a 0.3.x install replaces the app in
place and carries settings forward. **Sparkle is retired** — the Tauri updater is
now the only auto-update channel, so 0.3.x installs must upgrade manually once.

- **Updates pane** in Settings — installed-vs-latest for avocado-cli, the Avocado
  VM, and the desktop itself, with one-click in-app updates.
- **Getting Started checklist** on the Overview pane.
- **System-first, bundled-fallback CLI resolution** — prefers the user's `$PATH`
  `avocado` so the desktop matches Terminal, falling back to a bundled sidecar.

## Notable fixes across 0.x

- **Launch on non-developer machines (0.2.1)** — dropped a forward-declared
  system-extension entitlement that had no bundled provisioning profile, which
  had blocked launch for every Homebrew-cask user.
- **CLI binary override, auto-relaunch, and `$PATH` augmentation (0.4.2)** — point
  at a dev `avocado` build, updates now relaunch instead of hanging, and a
  Finder-launched app finds `npx`/`node`/`brew`.
- **USB helper SUID packaging (0.4.4, critical)** — the published DMG's
  `AvocadoUSBIPHelper` was missing its SUID-root bit (an unprivileged `ditto`
  dropped it during CI packaging), so USB/IP attach silently failed on
  0.4.0–0.4.3. CI now stages with `sudo ditto` and fails loud if the bit is
  missing. Users on 0.4.0–0.4.3 should upgrade to 0.4.4.
