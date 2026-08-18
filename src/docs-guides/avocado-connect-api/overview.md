---
title: Overview
sidebar_position: 1
description: 'REST API for Avocado Connect — authentication, conventions, pagination, and errors.'
copy_markdown: true
---

# Avocado Connect API

The Avocado Connect API is the REST API behind [Avocado Connect](/avocado-connect/overview),
Peridio's fleet management platform. Use it to manage devices, projects, cohorts, runtimes,
deployments, remote-access tunnels, provisioning tokens, signing keys, and webhooks
programmatically.

## Base URL

```
https://connect.peridio.com
```

All endpoints are rooted at `/api`.

## Authentication

Authenticate every request with a personal or org-scoped access token sent as a Bearer token:

```
Authorization: Bearer avo_...
```

Create a personal access token via `POST /api/me/api-tokens` or an org-scoped token via
`POST /api/orgs/{org_id}/api-tokens` — see
[Authentication & Tokens](/developer-reference/avocado-connect-api/authentication-tokens).
Tokens do not require a CSRF token.

The first-party web app uses an httpOnly session cookie instead; API consumers should always
use Bearer tokens.

## Conventions

- All request and response bodies are JSON.
- Successful resource responses wrap the payload in a top-level `data` field.
- Simple acknowledgements return `{ "ok": true }`.
- Resource identifiers are UUID v7 strings unless otherwise noted.
- Org-scoped routes take the organization UUID as the `org_id` path parameter.

## Pagination

List endpoints use cursor pagination. Pass any of the following query parameters:

| Name        | Type      | Description                                                           |
| ----------- | --------- | --------------------------------------------------------------------- |
| `cursor`    | `string`  | Opaque cursor from a prior response's `meta.after` / `meta.before`.   |
| `limit`     | `integer` | Max items per page (clamped 1–100, defaults to 20).                   |
| `direction` | `string`  | Page direction relative to the cursor: `after` (default) or `before`. |

When a pagination parameter is supplied, responses include a `meta` object with `after`,
`before`, `has_next`, `has_previous`, and `total` alongside `data`. Without pagination
parameters, the full list is returned with no `meta`.

## Errors

Errors return a standard envelope:

```json
{ "error": "not_found", "message": "Resource not found" }
```

Validation errors return status `422` with per-field messages:

```json
{ "errors": { "name": ["can't be blank"] } }
```

Any endpoint may additionally return `401` (missing or invalid token), `403` (insufficient
permissions), or `404` (resource not found or not visible to the caller).

## OpenAPI specification

These pages are generated from the API's OpenAPI 3.0 specification, committed in this repo at
`src/openapi/avocado-connect-openapi.json`. Regenerate with `npm run build-connect-api`.
