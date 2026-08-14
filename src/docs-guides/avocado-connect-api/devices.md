---
title: Devices
sidebar_position: 3
description: 'Manage the devices in your fleet — list, inspect, tag, update, and assign to cohorts.'
copy_markdown: true
---

# Devices

Manage the devices in your fleet — list, inspect, tag, update, and assign to cohorts.

## Endpoints

| Method   | Path                                     | Description                                    |
| -------- | ---------------------------------------- | ---------------------------------------------- |
| `GET`    | `/api/orgs/{org_id}/devices`             | [List devices](#list-devices)                  |
| `POST`   | `/api/orgs/{org_id}/devices`             | [Create a device](#create-a-device)            |
| `GET`    | `/api/orgs/{org_id}/devices/stats`       | [Device counts](#device-counts)                |
| `GET`    | `/api/orgs/{org_id}/devices/tags`        | [List device tags](#list-device-tags)          |
| `GET`    | `/api/orgs/{org_id}/devices/{id}`        | [Get a device](#get-a-device)                  |
| `PUT`    | `/api/orgs/{org_id}/devices/{id}`        | [Update a device](#update-a-device)            |
| `DELETE` | `/api/orgs/{org_id}/devices/{id}`        | [Delete a device](#delete-a-device)            |
| `PUT`    | `/api/orgs/{org_id}/devices/{id}/cohort` | [Set a device's cohort](#set-a-devices-cohort) |

### List devices

`GET /api/orgs/{org_id}/devices`

Lists org devices, filtered to cohorts the caller can access.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name         | Type      | Required | Description                                                                              |
| ------------ | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `search`     | `string`  | No       |                                                                                          |
| `status`     | `string`  | No       | One of: `unregistered`, `registered`, `online`, `offline`.                               |
| `cohort_id`  | `string`  | No       |                                                                                          |
| `cohort_ids` | `string`  | No       | Comma-separated cohort UUIDs.                                                            |
| `tags`       | `string`  | No       | Comma-separated tags.                                                                    |
| `sort_by`    | `string`  | No       |                                                                                          |
| `sort_dir`   | `string`  | No       | One of: `asc`, `desc`.                                                                   |
| `cursor`     | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`      | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction`  | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                              | Description         |
| ------ | --------------------------------------------------------------------------------- | ------------------- |
| `200`  | `data:` array of [`Device`](#device), `meta:` [`PaginationMeta`](#paginationmeta) | Devices.            |
| `422`  | [`Error`](#error)                                                                 | Invalid sort field. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/devices" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "identifier": "string",
      "status": "unregistered",
      "last_seen_at": "2026-08-14T12:00:00Z",
      "tags": ["string"],
      "metadata": {},
      "shadow": {},
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "resolved_runtime": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "version": "string",
        "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
      },
      "cohort": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
      },
      "active_tunnel_count": 0,
      "inserted_at": "2026-08-14T12:00:00Z",
      "updated_at": "2026-08-14T12:00:00Z"
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

### Create a device

`POST /api/orgs/{org_id}/devices`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field               | Type       | Required | Description               |
| ------------------- | ---------- | -------- | ------------------------- |
| `device`            | `object`   | Yes      |                           |
| `device.name`       | `string`   | Yes      |                           |
| `device.identifier` | `string`   | Yes      | Unique device identifier. |
| `device.tags`       | `string[]` | No       |                           |
| `device.metadata`   | `object`   | No       |                           |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data:` [`Device`](#device)           | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/devices" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "device": {
    "name": "string",
    "identifier": "string",
    "tags": [
      "string"
    ],
    "metadata": {}
  }
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "identifier": "string",
    "status": "unregistered",
    "last_seen_at": "2026-08-14T12:00:00Z",
    "tags": ["string"],
    "metadata": {},
    "shadow": {},
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "resolved_runtime": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "version": "string",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    },
    "cohort": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    },
    "active_tunnel_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Device counts

`GET /api/orgs/{org_id}/devices/stats`

Returns device counts by status for the caller's accessible cohorts.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name         | Type     | Required | Description |
| ------------ | -------- | -------- | ----------- |
| `search`     | `string` | No       |             |
| `cohort_id`  | `string` | No       |             |
| `cohort_ids` | `string` | No       |             |
| `tags`       | `string` | No       |             |

**Responses:**

| Status | Body                                  | Description |
| ------ | ------------------------------------- | ----------- |
| `200`  | `data:` [`DeviceStats`](#devicestats) | Stats.      |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/devices/stats" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "total": 0,
    "online": 0,
    "offline": 0,
    "registered": 0,
    "unregistered": 0
  }
}
```

### List device tags

`GET /api/orgs/{org_id}/devices/tags`

Returns the distinct set of device tags across the caller's accessible cohorts.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body               | Description |
| ------ | ------------------ | ----------- |
| `200`  | `data:` `string[]` | Tags.       |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/devices/tags" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": ["string"]
}
```

### Get a device

`GET /api/orgs/{org_id}/devices/{id}`

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                        | Description         |
| ------ | --------------------------- | ------------------- |
| `200`  | `data:` [`Device`](#device) | Device.             |
| `404`  | [`Error`](#error)           | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/devices/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "identifier": "string",
    "status": "unregistered",
    "last_seen_at": "2026-08-14T12:00:00Z",
    "tags": ["string"],
    "metadata": {},
    "shadow": {},
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "resolved_runtime": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "version": "string",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    },
    "cohort": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    },
    "active_tunnel_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Update a device

`PUT /api/orgs/{org_id}/devices/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field             | Type       | Required | Description |
| ----------------- | ---------- | -------- | ----------- |
| `device`          | `object`   | Yes      |             |
| `device.name`     | `string`   | No       |             |
| `device.tags`     | `string[]` | No       |             |
| `device.metadata` | `object`   | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`Device`](#device)           | Updated.                        |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/devices/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "device": {
    "name": "string",
    "tags": [
      "string"
    ],
    "metadata": {}
  }
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "identifier": "string",
    "status": "unregistered",
    "last_seen_at": "2026-08-14T12:00:00Z",
    "tags": ["string"],
    "metadata": {},
    "shadow": {},
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "resolved_runtime": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "version": "string",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    },
    "cohort": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    },
    "active_tunnel_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Delete a device

`DELETE /api/orgs/{org_id}/devices/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Deleted.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/devices/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Set a device's cohort

`PUT /api/orgs/{org_id}/devices/{id}/cohort`

Admin only. Reassigns the device to a cohort (must be in the same project). The cohort cannot be cleared — delete the device to decommission it.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field       | Type     | Required | Description |
| ----------- | -------- | -------- | ----------- |
| `cohort_id` | `string` | Yes      |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | [`Ok`](#ok)                           | Reassigned.                     |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/devices/{id}/cohort" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
}'
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

## Object reference

### Device

| Field                         | Type                 | Description                                                |
| ----------------------------- | -------------------- | ---------------------------------------------------------- |
| `id`                          | `string`             |                                                            |
| `name`                        | `string`             | Nullable.                                                  |
| `identifier`                  | `string`             |                                                            |
| `status`                      | `string`             | One of: `unregistered`, `registered`, `online`, `offline`. |
| `last_seen_at`                | `string (date-time)` | Nullable.                                                  |
| `tags`                        | `string[]`           |                                                            |
| `metadata`                    | `object`             | Nullable.                                                  |
| `shadow`                      | `object`             | Reported/desired device shadow state. Nullable.            |
| `organization_id`             | `string`             |                                                            |
| `cohort_id`                   | `string`             | Nullable.                                                  |
| `resolved_runtime`            | `object`             | Nullable.                                                  |
| `resolved_runtime.id`         | `string`             |                                                            |
| `resolved_runtime.version`    | `string`             |                                                            |
| `resolved_runtime.project_id` | `string`             |                                                            |
| `cohort`                      | `object`             | Present on list/show responses. Nullable.                  |
| `cohort.id`                   | `string`             |                                                            |
| `cohort.name`                 | `string`             |                                                            |
| `cohort.project_id`           | `string`             |                                                            |
| `active_tunnel_count`         | `integer`            | Present on list responses.                                 |
| `inserted_at`                 | `string (date-time)` |                                                            |
| `updated_at`                  | `string (date-time)` |                                                            |

### PaginationMeta

Cursor pagination metadata. Present only when the request supplied a pagination param (`cursor`, `limit`, or `direction`); otherwise the full list is returned unpaginated with no `meta`.

| Field          | Type      | Description                                                         |
| -------------- | --------- | ------------------------------------------------------------------- |
| `after`        | `string`  | Opaque cursor for the next page. Pass back as `?cursor=`. Nullable. |
| `before`       | `string`  | Opaque cursor for the previous page. Nullable.                      |
| `has_next`     | `boolean` |                                                                     |
| `has_previous` | `boolean` |                                                                     |
| `total`        | `integer` | Nullable.                                                           |

### Error

Standard error envelope.

| Field     | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `error`   | `string` | Machine-readable error code. |
| `message` | `string` | Human-readable explanation.  |

### ValidationError

Changeset validation error. Keys are field names; values are lists of messages.

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `errors` | `object` |             |

### DeviceStats

| Field          | Type      | Description |
| -------------- | --------- | ----------- |
| `total`        | `integer` |             |
| `online`       | `integer` |             |
| `offline`      | `integer` |             |
| `registered`   | `integer` |             |
| `unregistered` | `integer` |             |

### Ok

Simple acknowledgement.

| Field | Type      | Description |
| ----- | --------- | ----------- |
| `ok`  | `boolean` |             |
