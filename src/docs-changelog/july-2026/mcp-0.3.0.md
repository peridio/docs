---
title: 'MCP 0.3.0'
description: 'Placeholder — Avocado MCP 0.3.0: npm distribution and three new build-introspection tools.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

## npm distribution

The MCP server now ships as `@avocado-linux/mcp` on npm, replacing the one-shot install from GitHub. Existing installs keep working; the GitHub path is deprecated and prints a pointer to the package.

## New tools

- **`build_graph`** — returns the dependency graph between runtimes, extensions, and images so an agent can explain *why* a rebuild happened.
- **`snapshot_diff`** — diffs two channel snapshots and summarizes package adds, removals, and version bumps.
- **`vm_events`** — streams hibernation/wake and deploy events from a running `avocado vm`.

## Fixes

- Connect-aware tools no longer error when the active profile has no organization set.
