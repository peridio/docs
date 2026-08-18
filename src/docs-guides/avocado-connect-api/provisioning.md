---
title: Provisioning
sidebar_position: 8
description: 'Claim tokens that let new devices join your fleet at first boot.'
copy_markdown: true
---

# Provisioning

Claim tokens that let new devices join your fleet at first boot.

## Endpoints

| Method   | Path                                                    | Description                                                         |
| -------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| `GET`    | `/api/orgs/{org_id}/claim_tokens`                       | [List claim tokens](#list-claim-tokens)                             |
| `POST`   | `/api/orgs/{org_id}/claim_tokens`                       | [Create a claim token](#create-a-claim-token)                       |
| `GET`    | `/api/orgs/{org_id}/claim_tokens/{id}`                  | [Get a claim token](#get-a-claim-token)                             |
| `PUT`    | `/api/orgs/{org_id}/claim_tokens/{id}`                  | [Update a claim token](#update-a-claim-token)                       |
| `DELETE` | `/api/orgs/{org_id}/claim_tokens/{id}`                  | [Delete a claim token](#delete-a-claim-token)                       |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/claim_tokens` | [List claim tokens for a project](#list-claim-tokens-for-a-project) |

### List claim tokens

`GET /api/orgs/{org_id}/claim_tokens`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                      | Description                              |
| ------ | ----------------------------------------------------------------------------------------- | ---------------------------------------- |
| `200`  | `data:` array of [`ClaimToken`](#claimtoken), `meta:` [`PaginationMeta`](#paginationmeta) | Claim tokens (raw token values omitted). |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/claim_tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "expires_at": "2026-08-14T12:00:00Z",
      "max_uses": 0,
      "consume_count": 0,
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "created_by_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "tags": ["string"],
      "token": "string",
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

### Create a claim token

`POST /api/orgs/{org_id}/claim_tokens`

Admin only. The raw `token` is returned once, in the create response only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field                    | Type                 | Required | Description |
| ------------------------ | -------------------- | -------- | ----------- |
| `claim_token`            | `object`             | Yes      |             |
| `claim_token.name`       | `string`             | No       |             |
| `claim_token.max_uses`   | `integer`            | No       |             |
| `claim_token.expires_at` | `string (date-time)` | No       |             |
| `claim_token.cohort_id`  | `string`             | No       |             |
| `claim_token.tags`       | `string[]`           | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data:` [`ClaimToken`](#claimtoken)   | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/claim_tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "claim_token": {
    "name": "string",
    "max_uses": 0,
    "expires_at": "2026-08-14T12:00:00Z",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "tags": [
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
    "expires_at": "2026-08-14T12:00:00Z",
    "max_uses": 0,
    "consume_count": 0,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "created_by_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "tags": ["string"],
    "token": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Get a claim token

`GET /api/orgs/{org_id}/claim_tokens/{id}`

Admin only. Includes the token's use history.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                                | Description         |
| ------ | --------------------------------------------------- | ------------------- |
| `200`  | `data:` [`ClaimTokenWithUses`](#claimtokenwithuses) | Claim token.        |
| `404`  | [`Error`](#error)                                   | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/claim_tokens/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "expires_at": "2026-08-14T12:00:00Z",
    "max_uses": 0,
    "consume_count": 0,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "created_by_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "tags": ["string"],
    "token": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z",
    "uses": [
      {
        "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "claimed_at": "2026-08-14T12:00:00Z"
      }
    ]
  }
}
```

### Update a claim token

`PUT /api/orgs/{org_id}/claim_tokens/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field                    | Type                 | Required | Description |
| ------------------------ | -------------------- | -------- | ----------- |
| `claim_token`            | `object`             | Yes      |             |
| `claim_token.name`       | `string`             | No       |             |
| `claim_token.max_uses`   | `integer`            | No       |             |
| `claim_token.expires_at` | `string (date-time)` | No       |             |
| `claim_token.tags`       | `string[]`           | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`ClaimToken`](#claimtoken)   | Updated.                        |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/claim_tokens/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "claim_token": {
    "name": "string",
    "max_uses": 0,
    "expires_at": "2026-08-14T12:00:00Z",
    "tags": [
      "string"
    ]
  }
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "expires_at": "2026-08-14T12:00:00Z",
    "max_uses": 0,
    "consume_count": 0,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "created_by_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "tags": ["string"],
    "token": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Delete a claim token

`DELETE /api/orgs/{org_id}/claim_tokens/{id}`

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
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/claim_tokens/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### List claim tokens for a project

`GET /api/orgs/{org_id}/projects/{project_id}/claim_tokens`

Admin only. Claim tokens whose cohort belongs to the given project.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                      | Description   |
| ------ | ----------------------------------------------------------------------------------------- | ------------- |
| `200`  | `data:` array of [`ClaimToken`](#claimtoken), `meta:` [`PaginationMeta`](#paginationmeta) | Claim tokens. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/claim_tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "expires_at": "2026-08-14T12:00:00Z",
      "max_uses": 0,
      "consume_count": 0,
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "created_by_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "cohort_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "tags": ["string"],
      "token": "string",
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

## Object reference

### ClaimToken

| Field             | Type                 | Description                                      |
| ----------------- | -------------------- | ------------------------------------------------ |
| `id`              | `string`             |                                                  |
| `name`            | `string`             | Nullable.                                        |
| `expires_at`      | `string (date-time)` | Nullable.                                        |
| `max_uses`        | `integer`            | Nullable.                                        |
| `consume_count`   | `integer`            |                                                  |
| `organization_id` | `string`             |                                                  |
| `created_by_id`   | `string`             | Nullable.                                        |
| `cohort_id`       | `string`             | Nullable.                                        |
| `tags`            | `string[]`           | Tags applied to devices claimed with this token. |
| `token`           | `string`             | Raw claim token — returned only on create.       |
| `inserted_at`     | `string (date-time)` |                                                  |
| `updated_at`      | `string (date-time)` |                                                  |

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

### ClaimTokenWithUses

| Field               | Type                 | Description                                      |
| ------------------- | -------------------- | ------------------------------------------------ |
| `id`                | `string`             |                                                  |
| `name`              | `string`             | Nullable.                                        |
| `expires_at`        | `string (date-time)` | Nullable.                                        |
| `max_uses`          | `integer`            | Nullable.                                        |
| `consume_count`     | `integer`            |                                                  |
| `organization_id`   | `string`             |                                                  |
| `created_by_id`     | `string`             | Nullable.                                        |
| `cohort_id`         | `string`             | Nullable.                                        |
| `tags`              | `string[]`           | Tags applied to devices claimed with this token. |
| `token`             | `string`             | Raw claim token — returned only on create.       |
| `inserted_at`       | `string (date-time)` |                                                  |
| `updated_at`        | `string (date-time)` |                                                  |
| `uses`              | `object[]`           |                                                  |
| `uses[].device_id`  | `string`             |                                                  |
| `uses[].claimed_at` | `string (date-time)` |                                                  |

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
