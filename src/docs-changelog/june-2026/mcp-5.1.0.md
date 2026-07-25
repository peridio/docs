---
title: 'MCP: 5.1.0'
description: 'Avocado OS MCP Server 5.1.0 release notes.'
---

## Avocado Connect awareness

The co-pilot now reaches past the local device into **Avocado Connect**. A new
set of Connect tools (`connect-init`, `connect-auth-status`,
`connect-list-resources`), a Connect resource, and a setup prompt let an
assistant check whether Connect is configured, walk the user through connecting,
and read Connect-managed resources — so fleet context is available in the same
session that builds and deploys, instead of a separate manual step.

## Upstream sources

A new upstream-sources resource teaches the assistant how to add source-based and
upstream packages, not just what already exists in the RPM feed. Combined with
the feed-first package search from 5.0.0, the co-pilot can now reach for an
upstream source when the feed doesn't carry what a project needs.

## Remote-only reference catalog

The reference catalog is now fully remote with nothing hardcoded in the server.
The list of reference projects the assistant can scaffold from always reflects
the current references repo, so new references show up without a server release.

## CLI invocation, restructured

Invoking the `avocado` CLI moved behind a dedicated CLI channel, which cleans up
how tools shell out and makes command invocation consistent across the Connect
and discovery tools. A guard bug that could break adding the MCP server to Claude
is fixed.

## Security and dependencies

- npm audit vulnerabilities resolved — `shell-quote` pinned to `^1.8.4`, `hono`
  and `qs` bumped.
- `SECURITY.md` endpoints corrected and the license/lockfile mismatch resolved.
