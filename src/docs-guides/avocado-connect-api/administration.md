---
title: Administration
sidebar_position: 10
description: 'Organization membership, teams, invitations, and account-level requests.'
copy_markdown: true
---

# Administration

Organization membership, teams, invitations, and account-level requests.

## Endpoints

| Method   | Path                                                     | Description                                                         |
| -------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| `GET`    | `/api/orgs/{org_id}/members`                             | [List org members](#list-org-members)                               |
| `DELETE` | `/api/orgs/{org_id}/members/{user_id}`                   | [Remove a member](#remove-a-member)                                 |
| `PUT`    | `/api/orgs/{org_id}/members/{user_id}/role`              | [Change a member's role](#change-a-members-role)                    |
| `GET`    | `/api/orgs/{org_id}/groups`                              | [List groups](#list-groups)                                         |
| `POST`   | `/api/orgs/{org_id}/groups`                              | [Create a group](#create-a-group)                                   |
| `GET`    | `/api/orgs/{org_id}/groups/{id}`                         | [Get a group](#get-a-group)                                         |
| `PUT`    | `/api/orgs/{org_id}/groups/{id}`                         | [Update a group](#update-a-group)                                   |
| `DELETE` | `/api/orgs/{org_id}/groups/{id}`                         | [Delete a group](#delete-a-group)                                   |
| `POST`   | `/api/orgs/{org_id}/groups/{group_id}/members`           | [Add a user to a group](#add-a-user-to-a-group)                     |
| `DELETE` | `/api/orgs/{org_id}/groups/{group_id}/members/{user_id}` | [Remove a user from a group](#remove-a-user-from-a-group)           |
| `GET`    | `/api/orgs/{org_id}/invitations`                         | [List invitations](#list-invitations)                               |
| `POST`   | `/api/orgs/{org_id}/invitations`                         | [Create an invitation](#create-an-invitation)                       |
| `DELETE` | `/api/orgs/{org_id}/invitations/{id}`                    | [Revoke an invitation](#revoke-an-invitation)                       |
| `GET`    | `/api/orgs/{org_id}/limit-increase-requests`             | [List limit-increase requests](#list-limit-increase-requests)       |
| `POST`   | `/api/orgs/{org_id}/limit-increase-requests`             | [Submit a limit-increase request](#submit-a-limit-increase-request) |
| `GET`    | `/api/orgs/{org_id}/reclaim-requests`                    | [List device reclaim requests](#list-device-reclaim-requests)       |
| `GET`    | `/api/orgs/{org_id}/reclaim-requests/count`              | [Count pending reclaim requests](#count-pending-reclaim-requests)   |
| `GET`    | `/api/orgs/{org_id}/reclaim-requests/{id}`               | [Get a reclaim request](#get-a-reclaim-request)                     |
| `DELETE` | `/api/orgs/{org_id}/reclaim-requests/{id}`               | [Delete a reclaim request](#delete-a-reclaim-request)               |
| `POST`   | `/api/orgs/{org_id}/reclaim-requests/{id}/approve`       | [Approve a reclaim request](#approve-a-reclaim-request)             |
| `POST`   | `/api/orgs/{org_id}/reclaim-requests/{id}/deny`          | [Deny a reclaim request](#deny-a-reclaim-request)                   |

### List org members

`GET /api/orgs/{org_id}/members`

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `search`    | `string`  | No       |                                                                                          |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                    | Description |
| ------ | --------------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`OrgMember`](#orgmember), `meta:` [`PaginationMeta`](#paginationmeta) | Members.    |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/members" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "email": "string",
      "role": "owner"
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

### Remove a member

`DELETE /api/orgs/{org_id}/members/{user_id}`

Admin only. Cannot remove yourself.

**Path parameters:**

| Name      | Type            | Description        |
| --------- | --------------- | ------------------ |
| `org_id`  | `string (uuid)` | Organization UUID. |
| `user_id` | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `204`  | —                 | Removed.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/members/{user_id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

### Change a member's role

`PUT /api/orgs/{org_id}/members/{user_id}/role`

Admin only. Cannot change your own role.

**Path parameters:**

| Name      | Type            | Description        |
| --------- | --------------- | ------------------ |
| `org_id`  | `string (uuid)` | Organization UUID. |
| `user_id` | `string`        |                    |

**Request body:**

| Field  | Type     | Required | Description                         |
| ------ | -------- | -------- | ----------------------------------- |
| `role` | `string` | Yes      | One of: `owner`, `admin`, `member`. |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data: object`                        | Role updated.                   |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/members/{user_id}/role" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "role": "owner"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "role": "string"
  }
}
```

### List groups

`GET /api/orgs/{org_id}/groups`

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

| Status | Body                                                                            | Description |
| ------ | ------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`Group`](#group), `meta:` [`PaginationMeta`](#paginationmeta) | Groups.     |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/groups" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "description": "string"
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

### Create a group

`POST /api/orgs/{org_id}/groups`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field         | Type     | Required | Description |
| ------------- | -------- | -------- | ----------- |
| `name`        | `string` | Yes      |             |
| `description` | `string` | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data:` [`Group`](#group)             | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/groups" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "string",
  "description": "string"
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string"
  }
}
```

### Get a group

`GET /api/orgs/{org_id}/groups/{id}`

Returns the group with its members.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                            | Description         |
| ------ | ----------------------------------------------- | ------------------- |
| `200`  | `data:` [`GroupWithMembers`](#groupwithmembers) | Group.              |
| `404`  | [`Error`](#error)                               | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/groups/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "members": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string",
        "role": "owner"
      }
    ]
  }
}
```

### Update a group

`PUT /api/orgs/{org_id}/groups/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field         | Type     | Required | Description |
| ------------- | -------- | -------- | ----------- |
| `name`        | `string` | No       |             |
| `description` | `string` | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`Group`](#group)             | Updated.                        |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/groups/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "string",
  "description": "string"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string"
  }
}
```

### Delete a group

`DELETE /api/orgs/{org_id}/groups/{id}`

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
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/groups/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Add a user to a group

`POST /api/orgs/{org_id}/groups/{group_id}/members`

Admin only.

**Path parameters:**

| Name       | Type            | Description        |
| ---------- | --------------- | ------------------ |
| `org_id`   | `string (uuid)` | Organization UUID. |
| `group_id` | `string`        |                    |

**Request body:**

| Field     | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| `user_id` | `string` | Yes      |             |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `201`  | `data: object`    | Added.              |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/groups/{group_id}/members" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
}'
```

**Example response** (`201`):

```json
{
  "data": {}
}
```

### Remove a user from a group

`DELETE /api/orgs/{org_id}/groups/{group_id}/members/{user_id}`

Admin only.

**Path parameters:**

| Name       | Type            | Description        |
| ---------- | --------------- | ------------------ |
| `org_id`   | `string (uuid)` | Organization UUID. |
| `group_id` | `string`        |                    |
| `user_id`  | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Removed.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/groups/{group_id}/members/{user_id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### List invitations

`GET /api/orgs/{org_id}/invitations`

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

| Status | Body                                                                                            | Description  |
| ------ | ----------------------------------------------------------------------------------------------- | ------------ |
| `200`  | `data:` array of [`OrgInvitation`](#orginvitation), `meta:` [`PaginationMeta`](#paginationmeta) | Invitations. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/invitations" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "email": "string",
      "role": "owner",
      "target_username": "string",
      "status": "pending",
      "group": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string"
      },
      "inviter": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string"
      },
      "expires_at": "2026-08-14T12:00:00Z",
      "accepted_at": "2026-08-14T12:00:00Z",
      "inserted_at": "2026-08-14T12:00:00Z",
      "invite_url": "string"
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

### Create an invitation

`POST /api/orgs/{org_id}/invitations`

Admin only. Sends an invite email; when email delivery is disabled the response also includes `invite_url`.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field      | Type             | Required | Description                                                 |
| ---------- | ---------------- | -------- | ----------------------------------------------------------- |
| `email`    | `string (email)` | Yes      |                                                             |
| `role`     | `string`         | No       | One of: `owner`, `admin`, `member`. Defaults to `"member"`. |
| `group_id` | `string`         | No       | Nullable.                                                   |

**Responses:**

| Status | Body                                      | Description                     |
| ------ | ----------------------------------------- | ------------------------------- |
| `201`  | `data:` [`OrgInvitation`](#orginvitation) | Created.                        |
| `422`  | [`ValidationError`](#validationerror)     | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/invitations" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "email": "string",
  "role": "member",
  "group_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "email": "string",
    "role": "owner",
    "target_username": "string",
    "status": "pending",
    "group": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string"
    },
    "inviter": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "email": "string"
    },
    "expires_at": "2026-08-14T12:00:00Z",
    "accepted_at": "2026-08-14T12:00:00Z",
    "inserted_at": "2026-08-14T12:00:00Z",
    "invite_url": "string"
  }
}
```

### Revoke an invitation

`DELETE /api/orgs/{org_id}/invitations/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Revoked.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/invitations/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### List limit-increase requests

`GET /api/orgs/{org_id}/limit-increase-requests`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `status`    | `string`  | No       | One of: `pending`, `approved`, `denied`, `all`.                                          |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                                          | Description |
| ------ | ------------------------------------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`LimitIncreaseRequest`](#limitincreaserequest), `meta:` [`PaginationMeta`](#paginationmeta) | Requests.   |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/limit-increase-requests" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "requester_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "requester_user": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string"
      },
      "resolver_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "resolver_user": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string"
      },
      "resource_type": "string",
      "requested_limit": 0,
      "reason": "string",
      "status": "pending",
      "approved_limit": 0,
      "denied_reason": "string",
      "resolved_at": "2026-08-14T12:00:00Z",
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

### Submit a limit-increase request

`POST /api/orgs/{org_id}/limit-increase-requests`

Admin only. Available on the Teams plan.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field             | Type      | Required | Description |
| ----------------- | --------- | -------- | ----------- |
| `resource_type`   | `string`  | Yes      |             |
| `requested_limit` | `integer` | Yes      |             |
| `reason`          | `string`  | No       |             |

**Responses:**

| Status | Body                                                    | Description              |
| ------ | ------------------------------------------------------- | ------------------------ |
| `201`  | `data:` [`LimitIncreaseRequest`](#limitincreaserequest) | Submitted.               |
| `422`  | [`Error`](#error)                                       | Not eligible or invalid. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/limit-increase-requests" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "resource_type": "string",
  "requested_limit": 0,
  "reason": "string"
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "requester_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "requester_user": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "email": "string"
    },
    "resolver_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "resolver_user": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "email": "string"
    },
    "resource_type": "string",
    "requested_limit": 0,
    "reason": "string",
    "status": "pending",
    "approved_limit": 0,
    "denied_reason": "string",
    "resolved_at": "2026-08-14T12:00:00Z",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### List device reclaim requests

`GET /api/orgs/{org_id}/reclaim-requests`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `status`    | `string`  | No       | One of: `pending`, `approved`, `denied`, `all`.                                          |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                                          | Description |
| ------ | ------------------------------------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`DeviceReclaimRequest`](#devicereclaimrequest), `meta:` [`PaginationMeta`](#paginationmeta) | Requests.   |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/reclaim-requests" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "device": {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "identifier": "string",
        "status": "string"
      },
      "claim_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "api_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "requested_fingerprint": "string",
      "status": "pending",
      "requested_at": "2026-08-14T12:00:00Z",
      "resolved_at": "2026-08-14T12:00:00Z",
      "resolver_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "expires_at": "2026-08-14T12:00:00Z",
      "request_ip": "string",
      "request_user_agent": "string",
      "denied_reason": "string",
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

### Count pending reclaim requests

`GET /api/orgs/{org_id}/reclaim-requests/count`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body           | Description |
| ------ | -------------- | ----------- |
| `200`  | `data: object` | Count.      |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/reclaim-requests/count" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "count": 0
  }
}
```

### Get a reclaim request

`GET /api/orgs/{org_id}/reclaim-requests/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                                    | Description         |
| ------ | ------------------------------------------------------- | ------------------- |
| `200`  | `data:` [`DeviceReclaimRequest`](#devicereclaimrequest) | Request.            |
| `404`  | [`Error`](#error)                                       | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/reclaim-requests/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "identifier": "string",
      "status": "string"
    },
    "claim_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "api_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "requested_fingerprint": "string",
    "status": "pending",
    "requested_at": "2026-08-14T12:00:00Z",
    "resolved_at": "2026-08-14T12:00:00Z",
    "resolver_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "expires_at": "2026-08-14T12:00:00Z",
    "request_ip": "string",
    "request_user_agent": "string",
    "denied_reason": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Delete a reclaim request

`DELETE /api/orgs/{org_id}/reclaim-requests/{id}`

Admin only. Only denied requests can be deleted.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body              | Description                          |
| ------ | ----------------- | ------------------------------------ |
| `204`  | —                 | Deleted.                             |
| `404`  | [`Error`](#error) | Resource not found.                  |
| `422`  | [`Error`](#error) | Only denied requests can be deleted. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/reclaim-requests/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

### Approve a reclaim request

`POST /api/orgs/{org_id}/reclaim-requests/{id}/approve`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                                    | Description                     |
| ------ | ------------------------------------------------------- | ------------------------------- |
| `200`  | `data:` [`DeviceReclaimRequest`](#devicereclaimrequest) | Approved.                       |
| `422`  | [`ValidationError`](#validationerror)                   | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/reclaim-requests/{id}/approve" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "identifier": "string",
      "status": "string"
    },
    "claim_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "api_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "requested_fingerprint": "string",
    "status": "pending",
    "requested_at": "2026-08-14T12:00:00Z",
    "resolved_at": "2026-08-14T12:00:00Z",
    "resolver_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "expires_at": "2026-08-14T12:00:00Z",
    "request_ip": "string",
    "request_user_agent": "string",
    "denied_reason": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Deny a reclaim request

`POST /api/orgs/{org_id}/reclaim-requests/{id}/deny`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:** _(optional)_

| Field    | Type     | Required | Description |
| -------- | -------- | -------- | ----------- |
| `reason` | `string` | No       |             |

**Responses:**

| Status | Body                                                    | Description                     |
| ------ | ------------------------------------------------------- | ------------------------------- |
| `200`  | `data:` [`DeviceReclaimRequest`](#devicereclaimrequest) | Denied.                         |
| `422`  | [`ValidationError`](#validationerror)                   | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/reclaim-requests/{id}/deny" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "reason": "string"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device": {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "identifier": "string",
      "status": "string"
    },
    "claim_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "api_token_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "requested_fingerprint": "string",
    "status": "pending",
    "requested_at": "2026-08-14T12:00:00Z",
    "resolved_at": "2026-08-14T12:00:00Z",
    "resolver_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "expires_at": "2026-08-14T12:00:00Z",
    "request_ip": "string",
    "request_user_agent": "string",
    "denied_reason": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

## Object reference

### OrgMember

| Field     | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `id`      | `string` |                                     |
| `user_id` | `string` |                                     |
| `name`    | `string` |                                     |
| `email`   | `string` |                                     |
| `role`    | `string` | One of: `owner`, `admin`, `member`. |

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

### Group

| Field         | Type     | Description |
| ------------- | -------- | ----------- |
| `id`          | `string` |             |
| `name`        | `string` |             |
| `description` | `string` | Nullable.   |

### GroupWithMembers

| Field         | Type                               | Description |
| ------------- | ---------------------------------- | ----------- |
| `id`          | `string`                           |             |
| `name`        | `string`                           |             |
| `description` | `string`                           | Nullable.   |
| `members`     | array of [`OrgMember`](#orgmember) |             |

### Ok

Simple acknowledgement.

| Field | Type      | Description |
| ----- | --------- | ----------- |
| `ok`  | `boolean` |             |

### OrgInvitation

| Field             | Type                  | Description                                             |
| ----------------- | --------------------- | ------------------------------------------------------- |
| `id`              | `string`              |                                                         |
| `email`           | `string (email)`      |                                                         |
| `role`            | `string`              | One of: `owner`, `admin`, `member`.                     |
| `target_username` | `string`              | Nullable.                                               |
| `status`          | `string`              | One of: `pending`, `accepted`, `expired`.               |
| `group`           | `object`              | Nullable.                                               |
| `group.id`        | `string`              |                                                         |
| `group.name`      | `string`              |                                                         |
| `inviter`         | [`UserRef`](#userref) | Nullable.                                               |
| `expires_at`      | `string (date-time)`  |                                                         |
| `accepted_at`     | `string (date-time)`  | Nullable.                                               |
| `inserted_at`     | `string (date-time)`  |                                                         |
| `invite_url`      | `string`              | Present on create only when email delivery is disabled. |

### UserRef

| Field   | Type     | Description |
| ------- | -------- | ----------- |
| `id`    | `string` |             |
| `name`  | `string` |             |
| `email` | `string` |             |

### LimitIncreaseRequest

| Field               | Type                  | Description                                                 |
| ------------------- | --------------------- | ----------------------------------------------------------- |
| `id`                | `string`              |                                                             |
| `organization_id`   | `string`              |                                                             |
| `requester_user_id` | `string`              |                                                             |
| `requester_user`    | [`UserRef`](#userref) | Nullable.                                                   |
| `resolver_user_id`  | `string`              | Nullable.                                                   |
| `resolver_user`     | [`UserRef`](#userref) | Nullable.                                                   |
| `resource_type`     | `string`              | Limit being requested (e.g. `users`, `devices`, `tunnels`). |
| `requested_limit`   | `integer`             |                                                             |
| `reason`            | `string`              | Nullable.                                                   |
| `status`            | `string`              | One of: `pending`, `approved`, `denied`.                    |
| `approved_limit`    | `integer`             | Nullable.                                                   |
| `denied_reason`     | `string`              | Nullable.                                                   |
| `resolved_at`       | `string (date-time)`  | Nullable.                                                   |
| `inserted_at`       | `string (date-time)`  |                                                             |
| `updated_at`        | `string (date-time)`  |                                                             |

### DeviceReclaimRequest

| Field                   | Type                 | Description                              |
| ----------------------- | -------------------- | ---------------------------------------- |
| `id`                    | `string`             |                                          |
| `device_id`             | `string`             |                                          |
| `device`                | `object`             | Nullable.                                |
| `device.id`             | `string`             |                                          |
| `device.name`           | `string`             | Nullable.                                |
| `device.identifier`     | `string`             |                                          |
| `device.status`         | `string`             |                                          |
| `claim_token_id`        | `string`             | Nullable.                                |
| `api_token_id`          | `string`             | Nullable.                                |
| `requested_fingerprint` | `string`             |                                          |
| `status`                | `string`             | One of: `pending`, `approved`, `denied`. |
| `requested_at`          | `string (date-time)` |                                          |
| `resolved_at`           | `string (date-time)` | Nullable.                                |
| `resolver_user_id`      | `string`             | Nullable.                                |
| `expires_at`            | `string (date-time)` | Nullable.                                |
| `request_ip`            | `string`             | Nullable.                                |
| `request_user_agent`    | `string`             | Nullable.                                |
| `denied_reason`         | `string`             | Nullable.                                |
| `inserted_at`           | `string (date-time)` |                                          |
| `updated_at`            | `string (date-time)` |                                          |
