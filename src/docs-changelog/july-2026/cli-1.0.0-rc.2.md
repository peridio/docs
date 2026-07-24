---
title: 'CLI 1.0.0-rc.2'
description: 'Placeholder — Avocado CLI 1.0.0-rc.2: release-candidate feedback fixes ahead of the final 1.0 tag.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

Second release candidate for the 1.0 line. No format changes — this round is entirely feedback fixes from rc.1.

## Fixes

- `avocado vm` no longer leaves a stale supervisor socket behind after a host sleep/wake cycle.
- Lock file v7 snapshots round-trip correctly when a target name contains a dot.
- `avocado init` respects `--no-git` again instead of always initializing a repository.

## Notes

- The final `1.0.0` tag is expected once rc.2 has soaked for two weeks with no blocking reports.
