---
title: Runtimes
sidebar_position: 5
description: 'Runtime images (the OS/application payload devices run) and their artifact uploads.'
copy_markdown: true
---

# Runtimes

Runtime images (the OS/application payload devices run) and their artifact uploads.

## Endpoints

| Method   | Path                                                                                      | Description                                                               |
| -------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/runtimes`                                       | [List runtimes](#list-runtimes)                                           |
| `POST`   | `/api/orgs/{org_id}/projects/{project_id}/runtimes`                                       | [Create a runtime](#create-a-runtime)                                     |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/runtimes/cohort-summary`                        | [Runtime cohort summary](#runtime-cohort-summary)                         |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}`                                  | [Get a runtime](#get-a-runtime)                                           |
| `PUT`    | `/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}`                                  | [Update a runtime](#update-a-runtime)                                     |
| `DELETE` | `/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}`                                  | [Delete a runtime](#delete-a-runtime)                                     |
| `POST`   | `/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}/complete`                         | [Complete a runtime artifact upload](#complete-a-runtime-artifact-upload) |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}/artifacts/{image_id}/upload-urls` | [Get artifact upload URLs](#get-artifact-upload-urls)                     |

### List runtimes

`GET /api/orgs/{org_id}/projects/{project_id}/runtimes`

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
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                              | Description               |
| ------ | ------------------------------------------------------------------------------------------------- | ------------------------- |
| `200`  | `data:` array of [`RuntimeSummary`](#runtimesummary), `meta:` [`PaginationMeta`](#paginationmeta) | Runtimes (summary shape). |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "version": "string",
      "build_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "display_version": "string",
      "description": "string",
      "manifest": {},
      "manifest_written_at": "2026-08-14T12:00:00Z",
      "status": "string",
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "created_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "content_key_hex": "string",
      "content_keyid": "string",
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

### Create a runtime

`POST /api/orgs/{org_id}/projects/{project_id}/runtimes`

Admin only. Returns the runtime plus presigned artifact upload URLs.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |

**Request body:**

| Field                     | Type     | Required | Description          |
| ------------------------- | -------- | -------- | -------------------- |
| `runtime`                 | `object` | Yes      |                      |
| `runtime.version`         | `string` | Yes      | 1–100 characters.    |
| `runtime.description`     | `string` | No       | Max 2000 characters. |
| `runtime.build_id`        | `string` | No       | Max 64 characters.   |
| `runtime.config`          | `object` | No       |                      |
| `runtime.manifest`        | `object` | No       |                      |
| `runtime.lockfile`        | `object` | No       |                      |
| `runtime.content_key_hex` | `string` | No       |                      |
| `runtime.content_keyid`   | `string` | No       |                      |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data:` [`Runtime`](#runtime)         | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "runtime": {
    "version": "string",
    "description": "string",
    "build_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "config": {},
    "manifest": {},
    "lockfile": {},
    "content_key_hex": "string",
    "content_keyid": "string"
  }
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "config": {},
    "lockfile": {},
    "artifacts": [
      {
        "image_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "upload_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "parts": [
          {
            "part_number": 0,
            "upload_url": "string"
          }
        ]
      }
    ]
  }
}
```

### Runtime cohort summary

`GET /api/orgs/{org_id}/projects/{project_id}/runtimes/cohort-summary`

Returns per-cohort device counts for the given runtimes, used to preview deployment impact.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |

**Query parameters:**

| Name          | Type     | Required | Description                    |
| ------------- | -------- | -------- | ------------------------------ |
| `runtime_ids` | `string` | No       | Comma-separated runtime UUIDs. |

**Responses:**

| Status | Body           | Description     |
| ------ | -------------- | --------------- |
| `200`  | `data: object` | Cohort summary. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes/cohort-summary" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {}
}
```

### Get a runtime

`GET /api/orgs/{org_id}/projects/{project_id}/runtimes/{id}`

Returns runtime detail including `config` and `lockfile`.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Responses:**

| Status | Body                          | Description         |
| ------ | ----------------------------- | ------------------- |
| `200`  | `data:` [`Runtime`](#runtime) | Runtime.            |
| `404`  | [`Error`](#error)             | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "config": {},
    "lockfile": {},
    "artifacts": [
      {
        "image_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "upload_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "parts": [
          {
            "part_number": 0,
            "upload_url": "string"
          }
        ]
      }
    ]
  }
}
```

### Update a runtime

`PUT /api/orgs/{org_id}/projects/{project_id}/runtimes/{id}`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Request body:**

| Field                     | Type     | Required | Description          |
| ------------------------- | -------- | -------- | -------------------- |
| `runtime`                 | `object` | Yes      |                      |
| `runtime.description`     | `string` | No       | Max 2000 characters. |
| `runtime.build_id`        | `string` | No       | Max 64 characters.   |
| `runtime.config`          | `object` | No       |                      |
| `runtime.manifest`        | `object` | No       |                      |
| `runtime.lockfile`        | `object` | No       |                      |
| `runtime.content_key_hex` | `string` | No       |                      |
| `runtime.content_keyid`   | `string` | No       |                      |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`Runtime`](#runtime)         | Updated.                        |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "runtime": {
    "description": "string",
    "build_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "config": {},
    "manifest": {},
    "lockfile": {},
    "content_key_hex": "string",
    "content_keyid": "string"
  }
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "config": {},
    "lockfile": {},
    "artifacts": [
      {
        "image_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "upload_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "parts": [
          {
            "part_number": 0,
            "upload_url": "string"
          }
        ]
      }
    ]
  }
}
```

### Delete a runtime

`DELETE /api/orgs/{org_id}/projects/{project_id}/runtimes/{id}`

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
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Complete a runtime artifact upload

`POST /api/orgs/{org_id}/projects/{project_id}/runtimes/{id}/complete`

Finalizes a multipart artifact upload by submitting the per-part ETags/checksums returned by S3.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Request body:**

| Field                             | Type       | Required | Description |
| --------------------------------- | ---------- | -------- | ----------- |
| `parts`                           | `object[]` | Yes      |             |
| `parts[].image_id`                | `string`   | Yes      |             |
| `parts[].parts`                   | `object[]` | Yes      |             |
| `parts[].parts[].part_number`     | `integer`  | Yes      |             |
| `parts[].parts[].etag`            | `string`   | Yes      |             |
| `parts[].parts[].checksum_sha256` | `string`   | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`Runtime`](#runtime)         | Completed.                      |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}/complete" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "parts": [
    {
      "image_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "parts": [
        {
          "part_number": 0,
          "etag": "string",
          "checksum_sha256": "string"
        }
      ]
    }
  ]
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "config": {},
    "lockfile": {},
    "artifacts": [
      {
        "image_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "upload_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "parts": [
          {
            "part_number": 0,
            "upload_url": "string"
          }
        ]
      }
    ]
  }
}
```

### Get artifact upload URLs

`GET /api/orgs/{org_id}/projects/{project_id}/runtimes/{id}/artifacts/{image_id}/upload-urls`

Returns presigned multipart upload URLs for an artifact image.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |
| `image_id`   | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | `data: object`    | Upload URLs.        |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/runtimes/{id}/artifacts/{image_id}/upload-urls" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "image_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "parts": [
      {
        "part_number": 0,
        "upload_url": "string"
      }
    ]
  }
}
```

## Object reference

### RuntimeSummary

Runtime as returned by list endpoints (omits `config` and `lockfile`, which can be large).

| Field                 | Type                 | Description |
| --------------------- | -------------------- | ----------- |
| `id`                  | `string`             |             |
| `version`             | `string`             |             |
| `build_id`            | `string`             | Nullable.   |
| `display_version`     | `string`             |             |
| `description`         | `string`             | Nullable.   |
| `manifest`            | `object`             | Nullable.   |
| `manifest_written_at` | `string (date-time)` | Nullable.   |
| `status`              | `string`             |             |
| `project_id`          | `string`             |             |
| `created_by_user_id`  | `string`             | Nullable.   |
| `content_key_hex`     | `string`             | Nullable.   |
| `content_keyid`       | `string`             | Nullable.   |
| `inserted_at`         | `string (date-time)` |             |
| `updated_at`          | `string (date-time)` |             |

### PaginationMeta

Cursor pagination metadata. Present only when the request supplied a pagination param (`cursor`, `limit`, or `direction`); otherwise the full list is returned unpaginated with no `meta`.

| Field          | Type      | Description                                                         |
| -------------- | --------- | ------------------------------------------------------------------- |
| `after`        | `string`  | Opaque cursor for the next page. Pass back as `?cursor=`. Nullable. |
| `before`       | `string`  | Opaque cursor for the previous page. Nullable.                      |
| `has_next`     | `boolean` |                                                                     |
| `has_previous` | `boolean` |                                                                     |
| `total`        | `integer` | Nullable.                                                           |

### Runtime

Runtime detail (adds `config` and `lockfile`; `artifacts` present on create/complete).

| Field       | Type                                 | Description |
| ----------- | ------------------------------------ | ----------- |
| `config`    | `object`                             | Nullable.   |
| `lockfile`  | `object`                             | Nullable.   |
| `artifacts` | array of [`UploadSpec`](#uploadspec) |             |

### UploadSpec

Presigned multipart upload URLs for a runtime artifact image.

| Field                 | Type       | Description |
| --------------------- | ---------- | ----------- |
| `image_id`            | `string`   |             |
| `upload_id`           | `string`   |             |
| `parts`               | `object[]` |             |
| `parts[].part_number` | `integer`  |             |
| `parts[].upload_url`  | `string`   |             |

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
