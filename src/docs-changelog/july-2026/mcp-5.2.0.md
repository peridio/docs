---
title: 'MCP: 5.2.0'
description: 'Avocado OS MCP Server 5.2.0 release notes.'
---

## Docker-to-Avocado package coverage

A new package-coverage capability helps users migrating off Docker gauge how much
of an image's runtime dependencies the Avocado feed already provides.

- A `/package-coverage` prompt and skill ingests a Dockerfile or SBOM
  (CycloneDX/SPDX) for a target and stream, extracts the runtime dependencies,
  batch-checks them against the feed, researches the gaps, and emits a shareable
  `package-coverage.md` with a headline coverage percentage.
- A new `check-package-coverage` tool checks a whole dependency list against one
  `(target, release, channel)` in a single call, returning a per-dependency
  present/missing verdict, a confidence tier (exact / strong / fuzzy), and a
  coverage summary.

## Multi-release, multi-channel feeds

The server is now stream-aware: releases **2024** and **2026**, and channels
**next / edge / stable** (the old `apollo` channel is retired). `validate-yaml`
and `list-targets` account for targets that differ per stream — e.g. the NVIDIA
Jetson AGX Thor is on 2026, not 2024 — and build-error diagnosis probes each
stream instead of a single channel.

## Security and dependencies

- npm audit vulnerabilities resolved — `shell-quote` pinned to `^1.8.4`, `hono`
  and `qs` bumped.
- `SECURITY.md` endpoints corrected and the license/lockfile mismatch resolved.
