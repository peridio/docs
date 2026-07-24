---
title: 'Desktop 0.9.0'
description: 'Placeholder — Avocado Desktop 0.9.0 beta: the last beta before 1.0.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

The final beta before the 1.0 launch. Focus was stability and the agent's flash-and-boot loop.

## Changes

- The agent detects an attached device's target automatically instead of asking.
- Flashing shows per-partition progress with a cancel that actually cancels.
- The app now prefers a host-installed Avocado CLI and falls back to the bundled sidecar.

## Known issues

- USB devices are dropped on VM hibernation and must be re-attached manually (fixed in CLI 0.41.0's wake hints).
