---
title: 'Remote Access'
sidebar_position: 7
description: 'Open secure WireGuard tunnels to individual devices, governed by tunnel policy.'
copy_markdown: true
---

# Remote Access

Open secure WireGuard tunnels to individual devices, governed by tunnel policy.

## Endpoints

| Method   | Path                                                                         | Description                                                  |
| -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `GET`    | `/api/orgs/{org_id}/tunnel-policy`                                           | [Get the org tunnel policy](#get-the-org-tunnel-policy)      |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{cohort_id}/tunnel-policy` | [Get a cohort's tunnel policy](#get-a-cohorts-tunnel-policy) |
| `POST`   | `/api/orgs/{org_id}/tunnels`                                                 | [Open a device tunnel](#open-a-device-tunnel)                |
| `GET`    | `/api/orgs/{org_id}/tunnels/{id}`                                            | [Get a device tunnel](#get-a-device-tunnel)                  |
| `DELETE` | `/api/orgs/{org_id}/tunnels/{id}`                                            | [Close a device tunnel](#close-a-device-tunnel)              |
| `GET`    | `/api/orgs/{org_id}/devices/{device_id}/tunnels`                             | [List a device's tunnels](#list-a-devices-tunnels)           |

### Get the org tunnel policy

`GET /api/orgs/{org_id}/tunnel-policy`

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body                                    | Description |
| ------ | --------------------------------------- | ----------- |
| `200`  | `data:` [`TunnelPolicy`](#tunnelpolicy) | Policy.     |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/tunnel-policy" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "max_ttl_seconds": 0,
    "backoff_seconds": 0,
    "max_concurrent": 0,
    "cidr_allowlist": ["string"],
    "require_reason": true,
    "allowed_windows": [{}]
  }
}
```

### Get a cohort's tunnel policy

`GET /api/orgs/{org_id}/projects/{project_id}/cohorts/{cohort_id}/tunnel-policy`

Returns the resolved policy and the cohort's overrides.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `cohort_id`  | `string`        |                    |

**Responses:**

| Status | Body                                                | Description |
| ------ | --------------------------------------------------- | ----------- |
| `200`  | `data:` [`CohortTunnelPolicy`](#cohorttunnelpolicy) | Policy.     |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{cohort_id}/tunnel-policy" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "resolved": {
      "max_ttl_seconds": 0,
      "backoff_seconds": 0,
      "max_concurrent": 0,
      "cidr_allowlist": ["string"],
      "require_reason": true,
      "allowed_windows": [{}]
    },
    "overrides": {
      "max_ttl_seconds": 0,
      "backoff_seconds": 0,
      "max_concurrent": 0,
      "cidr_allowlist": ["string"],
      "require_reason": true,
      "allowed_windows": [{}]
    }
  }
}
```

### Open a device tunnel

`POST /api/orgs/{org_id}/tunnels`

Opens a tunnel to a device by device ID (org-scoped; used by LaunchPad/Fleet). Defaults to a 1-hour TTL and device proxy port 9090.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field               | Type      | Required | Description         |
| ------------------- | --------- | -------- | ------------------- |
| `device_id`         | `string`  | Yes      |                     |
| `device_proxy_port` | `integer` | No       | Defaults to `9090`. |

**Responses:**

| Status | Body                                                  | Description         |
| ------ | ----------------------------------------------------- | ------------------- |
| `201`  | `data:` [`DeviceTunnelSummary`](#devicetunnelsummary) | Requested.          |
| `404`  | [`Error`](#error)                                     | Resource not found. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/tunnels" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
  "device_proxy_port": 9090
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "state": "string",
    "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "relay_endpoint": "string",
    "server_proxy_port": 0,
    "device_proxy_port": 0,
    "expires_at": "2026-08-14T12:00:00Z",
    "established_at": "2026-08-14T12:00:00Z",
    "failure_reason": "string"
  }
}
```

### Get a device tunnel

`GET /api/orgs/{org_id}/tunnels/{id}`

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                                  | Description         |
| ------ | ----------------------------------------------------- | ------------------- |
| `200`  | `data:` [`DeviceTunnelSummary`](#devicetunnelsummary) | Tunnel.             |
| `404`  | [`Error`](#error)                                     | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/tunnels/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "state": "string",
    "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "relay_endpoint": "string",
    "server_proxy_port": 0,
    "device_proxy_port": 0,
    "expires_at": "2026-08-14T12:00:00Z",
    "established_at": "2026-08-14T12:00:00Z",
    "failure_reason": "string"
  }
}
```

### Close a device tunnel

`DELETE /api/orgs/{org_id}/tunnels/{id}`

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `204`  | —                 | Closed.             |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/tunnels/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

### List a device's tunnels

`GET /api/orgs/{org_id}/devices/{device_id}/tunnels`

**Path parameters:**

| Name        | Type            | Description        |
| ----------- | --------------- | ------------------ |
| `org_id`    | `string (uuid)` | Organization UUID. |
| `device_id` | `string`        |                    |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                                        | Description |
| ------ | ----------------------------------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`DeviceTunnelSummary`](#devicetunnelsummary), `meta:` [`PaginationMeta`](#paginationmeta) | Tunnels.    |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/devices/{device_id}/tunnels" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "state": "string",
      "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "relay_endpoint": "string",
      "server_proxy_port": 0,
      "device_proxy_port": 0,
      "expires_at": "2026-08-14T12:00:00Z",
      "established_at": "2026-08-14T12:00:00Z",
      "failure_reason": "string"
    }
  ],
  "meta": {
    "after": "string",
    "before": "string",
    "has_next": true,
    "has_previous": true,
    "total": 0
  }
}
```

## Object reference

### TunnelPolicy

| Field             | Type       | Description |
| ----------------- | ---------- | ----------- |
| `max_ttl_seconds` | `integer`  | Nullable.   |
| `backoff_seconds` | `integer`  | Nullable.   |
| `max_concurrent`  | `integer`  | Nullable.   |
| `cidr_allowlist`  | `string[]` | Nullable.   |
| `require_reason`  | `boolean`  | Nullable.   |
| `allowed_windows` | `object[]` | Nullable.   |

### CohortTunnelPolicy

Cohort tunnel policy: the effective (resolved) policy plus the cohort's own overrides (null fields inherit from the org).

| Field       | Type                            | Description |
| ----------- | ------------------------------- | ----------- |
| `resolved`  | [`TunnelPolicy`](#tunnelpolicy) |             |
| `overrides` | [`TunnelPolicy`](#tunnelpolicy) |             |

### DeviceTunnelSummary

Condensed tunnel view used by org-scoped (device) tunnel endpoints.

| Field               | Type                 | Description |
| ------------------- | -------------------- | ----------- |
| `id`                | `string`             |             |
| `state`             | `string`             |             |
| `device_id`         | `string`             |             |
| `relay_endpoint`    | `string`             | Nullable.   |
| `server_proxy_port` | `integer`            | Nullable.   |
| `device_proxy_port` | `integer`            | Nullable.   |
| `expires_at`        | `string (date-time)` | Nullable.   |
| `established_at`    | `string (date-time)` | Nullable.   |
| `failure_reason`    | `string`             | Nullable.   |

### Error

Standard error envelope.

| Field     | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `error`   | `string` | Machine-readable error code. |
| `message` | `string` | Human-readable explanation.  |

### PaginationMeta

Cursor pagination metadata. Present only when the request supplied a pagination param (`cursor`, `limit`, or `direction`); otherwise the full list is returned unpaginated with no `meta`.

| Field          | Type      | Description                                                         |
| -------------- | --------- | ------------------------------------------------------------------- |
| `after`        | `string`  | Opaque cursor for the next page. Pass back as `?cursor=`. Nullable. |
| `before`       | `string`  | Opaque cursor for the previous page. Nullable.                      |
| `has_next`     | `boolean` |                                                                     |
| `has_previous` | `boolean` |                                                                     |
| `total`        | `integer` | Nullable.                                                           |
