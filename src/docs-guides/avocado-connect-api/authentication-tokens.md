---
title: Authentication & Tokens
sidebar_position: 2
description: 'Obtain and manage API access tokens. Authenticate every request with `Authorization: Bearer <token>`. Create a personal token via `POST /api/me/api-tokens` or an org-scoped token via `POST /api/orgs/{org_id}/api-tokens`.'
copy_markdown: true
---

# Authentication & Tokens

Obtain and manage API access tokens. Authenticate every request with `Authorization: Bearer <token>`. Create a personal token via `POST /api/me/api-tokens` or an org-scoped token via `POST /api/orgs/{org_id}/api-tokens`.

## Endpoints

| Method   | Path                                 | Description                                                       |
| -------- | ------------------------------------ | ----------------------------------------------------------------- |
| `GET`    | `/api/me`                            | [Get the current user](#get-the-current-user)                     |
| `GET`    | `/api/me/api-tokens`                 | [List personal access tokens](#list-personal-access-tokens)       |
| `POST`   | `/api/me/api-tokens`                 | [Create a personal access token](#create-a-personal-access-token) |
| `DELETE` | `/api/me/api-tokens/{id}`            | [Revoke a personal access token](#revoke-a-personal-access-token) |
| `GET`    | `/api/orgs/{org_id}/api-tokens`      | [List org API tokens](#list-org-api-tokens)                       |
| `POST`   | `/api/orgs/{org_id}/api-tokens`      | [Create an org API token](#create-an-org-api-token)               |
| `DELETE` | `/api/orgs/{org_id}/api-tokens/{id}` | [Revoke an org API token](#revoke-an-org-api-token)               |

### Get the current user

`GET /api/me`

Returns the authenticated user, the token in use (for Bearer auth), post-signup intake state, and all organizations the user belongs to with their role and tier limits.

**Responses:**

| Status | Body              | Description                                     |
| ------ | ----------------- | ----------------------------------------------- |
| `200`  | `data: object`    | Current user and organizations.                 |
| `401`  | [`Error`](#error) | Authentication is missing, invalid, or expired. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/me" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "token": {
      "name": "string",
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
    },
    "user": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "email": "string",
      "name": "string",
      "username": "string",
      "avatar_url": "string",
      "is_super_user": true,
      "has_logged_in": true,
      "auth_provider": "string"
    },
    "intake": {
      "status": "dismissed",
      "submitted_at": "2026-08-14T12:00:00Z"
    },
    "organizations": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "slug": "string",
        "tier": "development",
        "role": "owner",
        "max_users": 0,
        "max_devices": 0,
        "max_tunnels": 0,
        "max_claim_tokens": 0,
        "subscription_status": "string",
        "stripe_enabled": true
      }
    ]
  }
}
```

### List personal access tokens

`GET /api/me/api-tokens`

Lists the current user's personal access tokens (raw token values are never returned).

**Responses:**

| Status | Body                                                           | Description                                     |
| ------ | -------------------------------------------------------------- | ----------------------------------------------- |
| `200`  | `data:` array of [`PersonalAccessToken`](#personalaccesstoken) | Tokens.                                         |
| `401`  | [`Error`](#error)                                              | Authentication is missing, invalid, or expired. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/me/api-tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "last_used_at": "2026-08-14T12:00:00Z",
      "expires_at": "2026-08-14T12:00:00Z",
      "inserted_at": "2026-08-14T12:00:00Z"
    }
  ]
}
```

### Create a personal access token

`POST /api/me/api-tokens`

Creates a personal access token. The raw token is returned **once** in `data.raw_token` and never again — store it securely. Use it as a Bearer token.

**Request body:**

| Field  | Type     | Required | Description |
| ------ | -------- | -------- | ----------- |
| `name` | `string` | Yes      |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data: object`                        | Token created.                  |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/me/api-tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "string"
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "token": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "last_used_at": "2026-08-14T12:00:00Z",
      "expires_at": "2026-08-14T12:00:00Z",
      "inserted_at": "2026-08-14T12:00:00Z"
    },
    "raw_token": "string"
  }
}
```

### Revoke a personal access token

`DELETE /api/me/api-tokens/{id}`

**Path parameters:**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` | Token ID.   |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Revoked.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/me/api-tokens/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### List org API tokens

`GET /api/orgs/{org_id}/api-tokens`

Lists the organization's API tokens (raw values omitted).

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

| Status | Body                                                        | Description |
| ------ | ----------------------------------------------------------- | ----------- |
| `200`  | `data: object`, `meta:` [`PaginationMeta`](#paginationmeta) | Tokens.     |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/api-tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "tokens": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "owner": {
          "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
          "name": "string",
          "email": "string"
        },
        "last_used_at": "2026-08-14T12:00:00Z",
        "expires_at": "2026-08-14T12:00:00Z",
        "created_at": "2026-08-14T12:00:00Z",
        "token": "string"
      }
    ]
  },
  "meta": {
    "after": "string",
    "before": "string",
    "has_next": true,
    "has_previous": true,
    "total": 0
  }
}
```

### Create an org API token

`POST /api/orgs/{org_id}/api-tokens`

Creates an org-scoped API token owned by the current user. The raw token is returned once in `data.token.token`.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field  | Type     | Required | Description |
| ------ | -------- | -------- | ----------- |
| `name` | `string` | Yes      |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data: object`                        | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/api-tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "string"
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "token": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "owner": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string"
      },
      "last_used_at": "2026-08-14T12:00:00Z",
      "expires_at": "2026-08-14T12:00:00Z",
      "created_at": "2026-08-14T12:00:00Z",
      "token": "string"
    }
  }
}
```

### Revoke an org API token

`DELETE /api/orgs/{org_id}/api-tokens/{id}`

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `204`  | —                 | Revoked.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/api-tokens/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

## Object reference

### User

| Field        | Type             | Description                              |
| ------------ | ---------------- | ---------------------------------------- |
| `id`         | `string`         | User UUID.                               |
| `email`      | `string (email)` |                                          |
| `name`       | `string`         |                                          |
| `username`   | `string`         | Nullable.                                |
| `avatar_url` | `string`         | Null for email+password users. Nullable. |

### OrganizationMembership

An organization the current user belongs to, with their role and the org's tier limits.

| Field                 | Type      | Description                                                     |
| --------------------- | --------- | --------------------------------------------------------------- |
| `id`                  | `string`  |                                                                 |
| `name`                | `string`  |                                                                 |
| `slug`                | `string`  |                                                                 |
| `tier`                | `string`  | One of: `development`, `startup`, `teams`, `pro`, `enterprise`. |
| `role`                | `string`  | One of: `owner`, `admin`, `member`.                             |
| `max_users`           | `integer` | Nullable.                                                       |
| `max_devices`         | `integer` | Nullable.                                                       |
| `max_tunnels`         | `integer` | Nullable.                                                       |
| `max_claim_tokens`    | `integer` | Nullable.                                                       |
| `subscription_status` | `string`  | Nullable.                                                       |
| `stripe_enabled`      | `boolean` |                                                                 |

### Error

Standard error envelope.

| Field     | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `error`   | `string` | Machine-readable error code. |
| `message` | `string` | Human-readable explanation.  |

### PersonalAccessToken

| Field          | Type                 | Description |
| -------------- | -------------------- | ----------- |
| `id`           | `string`             |             |
| `name`         | `string`             |             |
| `last_used_at` | `string (date-time)` | Nullable.   |
| `expires_at`   | `string (date-time)` | Nullable.   |
| `inserted_at`  | `string (date-time)` |             |

### ValidationError

Changeset validation error. Keys are field names; values are lists of messages.

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `errors` | `object` |             |

### Ok

Simple acknowledgement.

| Field | Type      | Description |
| ----- | --------- | ----------- |
| `ok`  | `boolean` |             |

### OrgApiToken

| Field             | Type                  | Description                                 |
| ----------------- | --------------------- | ------------------------------------------- |
| `id`              | `string`              |                                             |
| `name`            | `string`              |                                             |
| `organization_id` | `string`              |                                             |
| `owner`           | [`UserRef`](#userref) | Nullable.                                   |
| `last_used_at`    | `string (date-time)`  | Nullable.                                   |
| `expires_at`      | `string (date-time)`  | Nullable.                                   |
| `created_at`      | `string (date-time)`  |                                             |
| `token`           | `string`              | Raw Bearer token — returned only on create. |

### UserRef

| Field   | Type     | Description |
| ------- | -------- | ----------- |
| `id`    | `string` |             |
| `name`  | `string` |             |
| `email` | `string` |             |

### PaginationMeta

Cursor pagination metadata. Present only when the request supplied a pagination param (`cursor`, `limit`, or `direction`); otherwise the full list is returned unpaginated with no `meta`.

| Field          | Type      | Description                                                         |
| -------------- | --------- | ------------------------------------------------------------------- |
| `after`        | `string`  | Opaque cursor for the next page. Pass back as `?cursor=`. Nullable. |
| `before`       | `string`  | Opaque cursor for the previous page. Nullable.                      |
| `has_next`     | `boolean` |                                                                     |
| `has_previous` | `boolean` |                                                                     |
| `total`        | `integer` | Nullable.                                                           |
