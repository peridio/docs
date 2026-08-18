---
title: 'Deployments'
sidebar_position: 6
description: 'Roll a runtime out to a cohort of devices and track per-device deployment status.'
copy_markdown: true
---

# Deployments

Roll a runtime out to a cohort of devices and track per-device deployment status.

## Endpoints

| Method   | Path                                                                | Description                                                |
| -------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/deployments`              | [List deployments](#list-deployments)                      |
| `POST`   | `/api/orgs/{org_id}/projects/{project_id}/deployments`              | [Create a deployment](#create-a-deployment)                |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/deployments/{id}`         | [Get a deployment](#get-a-deployment)                      |
| `PUT`    | `/api/orgs/{org_id}/projects/{project_id}/deployments/{id}`         | [Update a deployment (PUT)](#update-a-deployment-put)      |
| `DELETE` | `/api/orgs/{org_id}/projects/{project_id}/deployments/{id}`         | [Delete a deployment](#delete-a-deployment)                |
| `POST`   | `/api/orgs/{org_id}/projects/{project_id}/deployments/{id}/cancel`  | [Cancel a deployment](#cancel-a-deployment)                |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/deployments/{id}/devices` | [List a deployment's devices](#list-a-deployments-devices) |

### List deployments

`GET /api/orgs/{org_id}/projects/{project_id}/deployments`

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `search`    | `string`  | No       |                                                                                          |
| `status`    | `string`  | No       |                                                                                          |
| `cohort_id` | `string`  | No       |                                                                                          |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                      | Description  |
| ------ | ----------------------------------------------------------------------------------------- | ------------ |
| `200`  | `data:` array of [`Deployment`](#deployment), `meta:` [`PaginationMeta`](#paginationmeta) | Deployments. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/deployments" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "description": "string",
      "status": "string",
      "rollout_percentage": 0,
      "started_at": "2026-08-14T12:00:00Z",
      "completed_at": "2026-08-14T12:00:00Z",
      "tuf_repos_total": 0,
      "tuf_repos_generated": 0,
      "tuf_generation_started_at": "2026-08-14T12:00:00Z",
      "tuf_generation_completed_at": "2026-08-14T12:00:00Z",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "created_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "device_ids": ["string"],
      "filter_tags": ["string"],
      "is_targeted": true,
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

### Create a deployment

`POST /api/orgs/{org_id}/projects/{project_id}/deployments`

Admin only. Targets a cohort, optionally narrowed by `device_ids` or `filter_tags`.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |

**Request body:**

| Field                           | Type              | Required | Description                   |
| ------------------------------- | ----------------- | -------- | ----------------------------- |
| `deployment`                    | `object`          | Yes      |                               |
| `deployment.name`               | `string`          | Yes      |                               |
| `deployment.description`        | `string`          | No       |                               |
| `deployment.cohort_id`          | `string (uuid)`   | Yes      |                               |
| `deployment.runtime_id`         | `string (uuid)`   | Yes      |                               |
| `deployment.rollout_percentage` | `integer`         | No       | Defaults to `0`. Range 0–100. |
| `deployment.device_ids`         | `string (uuid)[]` | No       | Explicit device targeting.    |
| `deployment.filter_tags`        | `string[]`        | No       | Tag-based targeting.          |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data:` [`Deployment`](#deployment)   | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/deployments" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "deployment": {
    "name": "string",
    "description": "string",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "rollout_percentage": 0,
    "device_ids": [
      "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    ],
    "filter_tags": [
      "string"
    ]
  }
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "status": "string",
    "rollout_percentage": 0,
    "started_at": "2026-08-14T12:00:00Z",
    "completed_at": "2026-08-14T12:00:00Z",
    "tuf_repos_total": 0,
    "tuf_repos_generated": 0,
    "tuf_generation_started_at": "2026-08-14T12:00:00Z",
    "tuf_generation_completed_at": "2026-08-14T12:00:00Z",
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "created_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_ids": ["string"],
    "filter_tags": ["string"],
    "is_targeted": true,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Get a deployment

`GET /api/orgs/{org_id}/projects/{project_id}/deployments/{id}`

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Responses:**

| Status | Body                                | Description         |
| ------ | ----------------------------------- | ------------------- |
| `200`  | `data:` [`Deployment`](#deployment) | Deployment.         |
| `404`  | [`Error`](#error)                   | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/deployments/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "status": "string",
    "rollout_percentage": 0,
    "started_at": "2026-08-14T12:00:00Z",
    "completed_at": "2026-08-14T12:00:00Z",
    "tuf_repos_total": 0,
    "tuf_repos_generated": 0,
    "tuf_generation_started_at": "2026-08-14T12:00:00Z",
    "tuf_generation_completed_at": "2026-08-14T12:00:00Z",
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "created_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_ids": ["string"],
    "filter_tags": ["string"],
    "is_targeted": true,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Update a deployment (PUT)

`PUT /api/orgs/{org_id}/projects/{project_id}/deployments/{id}`

Admin only. Same handler as PATCH. Supports status transitions (e.g. activation) and field edits.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Request body:**

| Field                           | Type      | Required | Description |
| ------------------------------- | --------- | -------- | ----------- |
| `deployment`                    | `object`  | Yes      |             |
| `deployment.name`               | `string`  | No       |             |
| `deployment.description`        | `string`  | No       |             |
| `deployment.status`             | `string`  | No       |             |
| `deployment.rollout_percentage` | `integer` | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`Deployment`](#deployment)   | Updated.                        |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/deployments/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "deployment": {
    "name": "string",
    "description": "string",
    "status": "string",
    "rollout_percentage": 0
  }
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "status": "string",
    "rollout_percentage": 0,
    "started_at": "2026-08-14T12:00:00Z",
    "completed_at": "2026-08-14T12:00:00Z",
    "tuf_repos_total": 0,
    "tuf_repos_generated": 0,
    "tuf_generation_started_at": "2026-08-14T12:00:00Z",
    "tuf_generation_completed_at": "2026-08-14T12:00:00Z",
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "created_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_ids": ["string"],
    "filter_tags": ["string"],
    "is_targeted": true,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Delete a deployment

`DELETE /api/orgs/{org_id}/projects/{project_id}/deployments/{id}`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Deleted.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/deployments/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Cancel a deployment

`POST /api/orgs/{org_id}/projects/{project_id}/deployments/{id}/cancel`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Responses:**

| Status | Body                                | Description         |
| ------ | ----------------------------------- | ------------------- |
| `200`  | `data:` [`Deployment`](#deployment) | Cancelled.          |
| `404`  | [`Error`](#error)                   | Resource not found. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/deployments/{id}/cancel" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "status": "string",
    "rollout_percentage": 0,
    "started_at": "2026-08-14T12:00:00Z",
    "completed_at": "2026-08-14T12:00:00Z",
    "tuf_repos_total": 0,
    "tuf_repos_generated": 0,
    "tuf_generation_started_at": "2026-08-14T12:00:00Z",
    "tuf_generation_completed_at": "2026-08-14T12:00:00Z",
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "created_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_ids": ["string"],
    "filter_tags": ["string"],
    "is_targeted": true,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### List a deployment's devices

`GET /api/orgs/{org_id}/projects/{project_id}/deployments/{id}/devices`

Lists the devices targeted by the deployment and their per-device status. Before activation, returns preview rows (with `deployment_device: null`).

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `sort_by`   | `string`  | No       |                                                                                          |
| `sort_dir`  | `string`  | No       | One of: `asc`, `desc`.                                                                   |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                                        | Description |
| ------ | ----------------------------------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`DeploymentDeviceRow`](#deploymentdevicerow), `meta:` [`PaginationMeta`](#paginationmeta) | Devices.    |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/deployments/{id}/devices" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "device": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "identifier": "string",
        "status": "string",
        "last_seen_at": "2026-08-14T12:00:00Z",
        "shadow_runtime_build_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
      },
      "deployment_device": {
        "status": "string"
      }
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

### Deployment

| Field                         | Type                 | Description                                                |
| ----------------------------- | -------------------- | ---------------------------------------------------------- |
| `id`                          | `string`             |                                                            |
| `name`                        | `string`             |                                                            |
| `description`                 | `string`             | Nullable.                                                  |
| `status`                      | `string`             |                                                            |
| `rollout_percentage`          | `integer`            | Nullable.                                                  |
| `started_at`                  | `string (date-time)` | Nullable.                                                  |
| `completed_at`                | `string (date-time)` | Nullable.                                                  |
| `tuf_repos_total`             | `integer`            | Nullable.                                                  |
| `tuf_repos_generated`         | `integer`            | Nullable.                                                  |
| `tuf_generation_started_at`   | `string (date-time)` | Nullable.                                                  |
| `tuf_generation_completed_at` | `string (date-time)` | Nullable.                                                  |
| `project_id`                  | `string`             |                                                            |
| `cohort_id`                   | `string`             | Nullable.                                                  |
| `runtime_id`                  | `string`             |                                                            |
| `created_by_user_id`          | `string`             | Nullable.                                                  |
| `device_ids`                  | `string[]`           | Explicit device targeting; null for cohort-wide. Nullable. |
| `filter_tags`                 | `string[]`           | Tag-based targeting. Nullable.                             |
| `is_targeted`                 | `boolean`            | True when device_ids or filter_tags is set.                |
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

### ValidationError

Changeset validation error. Keys are field names; values are lists of messages.

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `errors` | `object` |             |

### Error

Standard error envelope.

| Field     | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `error`   | `string` | Machine-readable error code. |
| `message` | `string` | Human-readable explanation.  |

### Ok

Simple acknowledgement.

| Field | Type      | Description |
| ----- | --------- | ----------- |
| `ok`  | `boolean` |             |

### DeploymentDeviceRow

| Field                            | Type                 | Description                                       |
| -------------------------------- | -------------------- | ------------------------------------------------- |
| `device`                         | `object`             |                                                   |
| `device.id`                      | `string`             |                                                   |
| `device.name`                    | `string`             | Nullable.                                         |
| `device.identifier`              | `string`             |                                                   |
| `device.status`                  | `string`             |                                                   |
| `device.last_seen_at`            | `string (date-time)` | Nullable.                                         |
| `device.shadow_runtime_build_id` | `string`             | Nullable.                                         |
| `deployment_device`              | `object`             | Null for preview (pre-activation) rows. Nullable. |
| `deployment_device.status`       | `string`             |                                                   |
