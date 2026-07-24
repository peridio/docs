---
title: 'Desktop 1.0.1'
description: 'Placeholder — Avocado Desktop 1.0.1: post-launch bug fixes.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

First patch release after the 1.0 launch.

## Fixes

- The onboarding flow no longer stalls when Homebrew is installed but not on `PATH` for GUI apps.
- Agent transcripts persist across app restarts instead of resetting to an empty session.
- Fixed a memory leak in the log viewer when a VM streams more than ~50 MB of output.
- The updater now verifies the DMG signature before prompting to install.
