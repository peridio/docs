---
title: 'Desktop: 1.0.0-rc.6'
description: 'Avocado Desktop 1.0.0 release candidates (rc.1–rc.6) release notes.'
---

The 1.0 release-candidate line, from the first candidate through rc.6. Each
build built on the last; the highlights below are grouped by where they landed.

## rc.1 — the shape of 1.0

The first candidate (direct DMG download only) that established the 1.0 feature
set:

- **First-run onboarding** — a full-screen welcome wizard for new installs.
- **Avocado Connect integration** — sign in, upload and deploy to fleets, and
  install-vs-build guidance directly from the desktop, with custom window chrome
  and a **profile switcher** for multi-profile credentials.
- **Projects** — a discoverable per-project actions menu, import-in-place, and a
  non-destructive "remove from list."
- **VM hibernation** surfaced while the desktop is open, **OTA deploy
  confirmation** before a runtime update is pushed, and **⌘K quick search**.
- A **major UI refactor** — redesigned control bar with clearer LOCAL vs FLEET
  differentiation and a simplified build bar.

## rc.2 — fresh-install testing and USB hardening

- **Docker preflight** before Install/Build — one actionable message ("Docker
  isn't installed / running…") instead of a cryptic mid-run `os error 2`.
- **References catalog persists across launches** and refreshes best-effort, so
  the New Project sheet survives GitHub's anonymous rate limit or being offline.
- **USB helper re-architecture for macOS 26 (Tahoe).** DriverKit refuses to
  release USB interfaces to a process in system session 0, which broke Jetson
  mass-storage attach; the helper reverts to a SUID-root subprocess in the user's
  session while a narrow root daemon only installs it. Hardened in response to
  security review: a TOCTOU-safe atomic SUID install, peer authentication via
  code-signing requirement (audit-token based), and an environment scrub on SUID
  entry. The helper also binds `127.0.0.1:3240` instead of all interfaces.

## rc.3 & rc.5 — the auto-updater

Two releases fixing the in-app updater so updates actually apply:

- **rc.3** — the updater public key baked into the app never matched the key CI
  signs with, so every update failed signature verification. Fixed, plus a
  release-time gate that fails the build on key drift. _(rc.1/rc.2 installs must
  install rc.3 manually once; auto-update works from rc.3 onward.)_
- **rc.5** — the updater manifest pointed at the DMG, but the macOS updater
  consumes a gzipped app-bundle tarball. Releases now build and publish
  `Avocado-<version>.app.tar.gz` as the updater artifact (the DMG stays the
  manual-download / Homebrew artifact). _(rc.4 was a validation-only build
  exercising the rc.3 fix end to end.)_

## rc.6 — bundled runtime and self-healing USB

- **Bundled Node runtime for the chat agent** — the app ships Node 22 and a
  pinned ACP adapter, so chat works with no host `node`/`npx`. (Clear any custom
  agent command in Settings to use it.)
- **The USB helper upgrades itself across app updates** via a build-identity
  handshake — no reinstall or re-approval.
- **Local Network permission** is requested at first launch (macOS 15+) and
  deploy preflights detect a denied grant and explain the fix instead of failing
  with a raw network error.
- Plus `events.log` size-capped rotation, onboarding preflights (CLI environment
  and QEMU detection), opt-in Connect signing per runtime, truthful USB
  install-failure reporting, and a shared ANSI stripper so agents no longer
  misread terminal output.
