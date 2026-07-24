---
title: 'MCP 0.2.0'
description: 'Placeholder — Avocado MCP 0.2.0: Connect awareness and structured error responses.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

## Connect awareness

The server can now read Connect state — organizations, cohorts, and recent deploys — so an agent can answer "what version is the field fleet on?" alongside local build questions.

## Structured errors

Tool failures return typed error payloads (`config_invalid`, `sdk_unavailable`, `auth_required`) instead of free-form strings, so clients can branch on them.

## Fixes

- `avocado.yaml` parsing matches the CLI exactly by reusing its schema crate instead of a vendored copy.
