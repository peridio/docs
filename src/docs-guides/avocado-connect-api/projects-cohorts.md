---
title: Projects & Cohorts
sidebar_position: 4
description: 'Organize your fleet: projects group your work; cohorts group devices for targeted deployments and access control.'
copy_markdown: true
---

# Projects & Cohorts

Organize your fleet: projects group your work; cohorts group devices for targeted deployments and access control.

## Endpoints

| Method   | Path                                                                             | Description                                                        |
| -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `GET`    | `/api/orgs/{org_id}/projects`                                                    | [List projects](#list-projects)                                    |
| `POST`   | `/api/orgs/{org_id}/projects`                                                    | [Create a project](#create-a-project)                              |
| `GET`    | `/api/orgs/{org_id}/projects/{id}`                                               | [Get a project](#get-a-project)                                    |
| `PUT`    | `/api/orgs/{org_id}/projects/{id}`                                               | [Update a project](#update-a-project)                              |
| `DELETE` | `/api/orgs/{org_id}/projects/{id}`                                               | [Delete a project](#delete-a-project)                              |
| `POST`   | `/api/orgs/{org_id}/projects/{id}/access/users`                                  | [Grant a user project access](#grant-a-user-project-access)        |
| `DELETE` | `/api/orgs/{org_id}/projects/{id}/access/users/{user_id}`                        | [Revoke a user's project access](#revoke-a-users-project-access)   |
| `POST`   | `/api/orgs/{org_id}/projects/{id}/access/groups`                                 | [Grant a group project access](#grant-a-group-project-access)      |
| `DELETE` | `/api/orgs/{org_id}/projects/{id}/access/groups/{group_id}`                      | [Revoke a group's project access](#revoke-a-groups-project-access) |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/cohorts`                               | [List cohorts in a project](#list-cohorts-in-a-project)            |
| `POST`   | `/api/orgs/{org_id}/projects/{project_id}/cohorts`                               | [Create a cohort](#create-a-cohort)                                |
| `GET`    | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}`                          | [Get a cohort](#get-a-cohort)                                      |
| `PUT`    | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}`                          | [Update a cohort](#update-a-cohort)                                |
| `DELETE` | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}`                          | [Delete a cohort](#delete-a-cohort)                                |
| `POST`   | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/users`             | [Grant a user cohort access](#grant-a-user-cohort-access)          |
| `DELETE` | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/users/{user_id}`   | [Revoke a user's cohort access](#revoke-a-users-cohort-access)     |
| `POST`   | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/groups`            | [Grant a group cohort access](#grant-a-group-cohort-access)        |
| `DELETE` | `/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/groups/{group_id}` | [Revoke a group's cohort access](#revoke-a-groups-cohort-access)   |
| `GET`    | `/api/orgs/{org_id}/cohorts`                                                     | [List all cohorts in the org](#list-all-cohorts-in-the-org)        |

### List projects

`GET /api/orgs/{org_id}/projects`

Lists projects the caller can access. Paginated when a pagination param is supplied.

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

| Status | Body                                                                                | Description                                     |
| ------ | ----------------------------------------------------------------------------------- | ----------------------------------------------- |
| `200`  | `data:` array of [`Project`](#project), `meta:` [`PaginationMeta`](#paginationmeta) | Projects.                                       |
| `401`  | [`Error`](#error)                                                                   | Authentication is missing, invalid, or expired. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects" \
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
      "everyone_enabled": true,
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
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

### Create a project

`POST /api/orgs/{org_id}/projects`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field                      | Type      | Required | Description |
| -------------------------- | --------- | -------- | ----------- |
| `project`                  | `object`  | Yes      |             |
| `project.name`             | `string`  | Yes      |             |
| `project.description`      | `string`  | No       |             |
| `project.everyone_enabled` | `boolean` | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data:` [`Project`](#project)         | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "project": {
    "name": "string",
    "description": "string",
    "everyone_enabled": true
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
    "everyone_enabled": true,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Get a project

`GET /api/orgs/{org_id}/projects/{id}`

Returns the project with its access users and groups.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                              | Description         |
| ------ | ------------------------------------------------- | ------------------- |
| `200`  | `data:` [`ProjectWithAccess`](#projectwithaccess) | Project.            |
| `404`  | [`Error`](#error)                                 | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "everyone_enabled": true,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z",
    "access_users": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string",
        "username": "string"
      }
    ],
    "access_groups": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string"
      }
    ]
  }
}
```

### Update a project

`PUT /api/orgs/{org_id}/projects/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field                      | Type      | Required | Description |
| -------------------------- | --------- | -------- | ----------- |
| `project`                  | `object`  | Yes      |             |
| `project.name`             | `string`  | No       |             |
| `project.description`      | `string`  | No       |             |
| `project.everyone_enabled` | `boolean` | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`Project`](#project)         | Updated.                        |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/projects/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "project": {
    "name": "string",
    "description": "string",
    "everyone_enabled": true
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
    "everyone_enabled": true,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Delete a project

`DELETE /api/orgs/{org_id}/projects/{id}`

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
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Grant a user project access

`POST /api/orgs/{org_id}/projects/{id}/access/users`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field     | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| `user_id` | `string` | Yes      |             |

**Responses:**

| Status | Body                                              | Description                                                    |
| ------ | ------------------------------------------------- | -------------------------------------------------------------- |
| `200`  | `data:` [`ProjectWithAccess`](#projectwithaccess) | Access granted; returns the project with updated access lists. |
| `404`  | [`Error`](#error)                                 | Resource not found.                                            |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{id}/access/users" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "everyone_enabled": true,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z",
    "access_users": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string",
        "username": "string"
      }
    ],
    "access_groups": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string"
      }
    ]
  }
}
```

### Revoke a user's project access

`DELETE /api/orgs/{org_id}/projects/{id}/access/users/{user_id}`

Admin only.

**Path parameters:**

| Name      | Type            | Description        |
| --------- | --------------- | ------------------ |
| `org_id`  | `string (uuid)` | Organization UUID. |
| `id`      | `string`        |                    |
| `user_id` | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Revoked.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{id}/access/users/{user_id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Grant a group project access

`POST /api/orgs/{org_id}/projects/{id}/access/groups`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field      | Type     | Required | Description |
| ---------- | -------- | -------- | ----------- |
| `group_id` | `string` | Yes      |             |

**Responses:**

| Status | Body                                              | Description                                                    |
| ------ | ------------------------------------------------- | -------------------------------------------------------------- |
| `200`  | `data:` [`ProjectWithAccess`](#projectwithaccess) | Access granted; returns the project with updated access lists. |
| `404`  | [`Error`](#error)                                 | Resource not found.                                            |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{id}/access/groups" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "group_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "everyone_enabled": true,
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z",
    "access_users": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string",
        "username": "string"
      }
    ],
    "access_groups": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string"
      }
    ]
  }
}
```

### Revoke a group's project access

`DELETE /api/orgs/{org_id}/projects/{id}/access/groups/{group_id}`

Admin only.

**Path parameters:**

| Name       | Type            | Description        |
| ---------- | --------------- | ------------------ |
| `org_id`   | `string (uuid)` | Organization UUID. |
| `id`       | `string`        |                    |
| `group_id` | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Revoked.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{id}/access/groups/{group_id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### List cohorts in a project

`GET /api/orgs/{org_id}/projects/{project_id}/cohorts`

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

| Status | Body                                                                              | Description |
| ------ | --------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`Cohort`](#cohort), `meta:` [`PaginationMeta`](#paginationmeta) | Cohorts.    |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts" \
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
      "everyone_enabled": true,
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "device_count": 0,
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

### Create a cohort

`POST /api/orgs/{org_id}/projects/{project_id}/cohorts`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |

**Request body:**

| Field                     | Type      | Required | Description |
| ------------------------- | --------- | -------- | ----------- |
| `cohort`                  | `object`  | Yes      |             |
| `cohort.name`             | `string`  | Yes      |             |
| `cohort.description`      | `string`  | No       |             |
| `cohort.everyone_enabled` | `boolean` | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `201`  | `data:` [`Cohort`](#cohort)           | Created.                        |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "cohort": {
    "name": "string",
    "description": "string",
    "everyone_enabled": true
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
    "everyone_enabled": true,
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Get a cohort

`GET /api/orgs/{org_id}/projects/{project_id}/cohorts/{id}`

Returns the cohort with access lists.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Responses:**

| Status | Body                                            | Description         |
| ------ | ----------------------------------------------- | ------------------- |
| `200`  | `data:` [`CohortWithAccess`](#cohortwithaccess) | Cohort.             |
| `404`  | [`Error`](#error)                               | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "everyone_enabled": true,
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z",
    "access_users": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string",
        "username": "string"
      }
    ],
    "access_groups": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string"
      }
    ]
  }
}
```

### Update a cohort

`PUT /api/orgs/{org_id}/projects/{project_id}/cohorts/{id}`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Request body:**

| Field                     | Type      | Required | Description |
| ------------------------- | --------- | -------- | ----------- |
| `cohort`                  | `object`  | Yes      |             |
| `cohort.name`             | `string`  | No       |             |
| `cohort.description`      | `string`  | No       |             |
| `cohort.everyone_enabled` | `boolean` | No       |             |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`Cohort`](#cohort)           | Updated.                        |
| `404`  | [`Error`](#error)                     | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "cohort": {
    "name": "string",
    "description": "string",
    "everyone_enabled": true
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
    "everyone_enabled": true,
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Delete a cohort

`DELETE /api/orgs/{org_id}/projects/{project_id}/cohorts/{id}`

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
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Grant a user cohort access

`POST /api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/users`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Request body:**

| Field     | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| `user_id` | `string` | Yes      |             |

**Responses:**

| Status | Body                                            | Description                                                   |
| ------ | ----------------------------------------------- | ------------------------------------------------------------- |
| `200`  | `data:` [`CohortWithAccess`](#cohortwithaccess) | Access granted; returns the cohort with updated access lists. |
| `404`  | [`Error`](#error)                               | Resource not found.                                           |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/users" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "everyone_enabled": true,
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z",
    "access_users": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string",
        "username": "string"
      }
    ],
    "access_groups": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string"
      }
    ]
  }
}
```

### Revoke a user's cohort access

`DELETE /api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/users/{user_id}`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |
| `user_id`    | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Revoked.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/users/{user_id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### Grant a group cohort access

`POST /api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/groups`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |

**Request body:**

| Field      | Type     | Required | Description |
| ---------- | -------- | -------- | ----------- |
| `group_id` | `string` | Yes      |             |

**Responses:**

| Status | Body                                            | Description                                                   |
| ------ | ----------------------------------------------- | ------------------------------------------------------------- |
| `200`  | `data:` [`CohortWithAccess`](#cohortwithaccess) | Access granted; returns the cohort with updated access lists. |
| `404`  | [`Error`](#error)                               | Resource not found.                                           |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/groups" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "group_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "description": "string",
    "everyone_enabled": true,
    "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "device_count": 0,
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z",
    "access_users": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string",
        "email": "string",
        "username": "string"
      }
    ],
    "access_groups": [
      {
        "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
        "name": "string"
      }
    ]
  }
}
```

### Revoke a group's cohort access

`DELETE /api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/groups/{group_id}`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `project_id` | `string (uuid)` | Project UUID.      |
| `id`         | `string`        |                    |
| `group_id`   | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `200`  | [`Ok`](#ok)       | Revoked.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/projects/{project_id}/cohorts/{id}/access/groups/{group_id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### List all cohorts in the org

`GET /api/orgs/{org_id}/cohorts`

Lists cohorts across all projects the caller can access.

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

| Status | Body                                                                              | Description |
| ------ | --------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`Cohort`](#cohort), `meta:` [`PaginationMeta`](#paginationmeta) | Cohorts.    |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/cohorts" \
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
      "everyone_enabled": true,
      "project_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "device_count": 0,
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

### Project

| Field              | Type                 | Description                                                                         |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------- |
| `id`               | `string`             |                                                                                     |
| `name`             | `string`             |                                                                                     |
| `description`      | `string`             | Nullable.                                                                           |
| `everyone_enabled` | `boolean`            | When true, all org members have access; otherwise access is granted per-user/group. |
| `organization_id`  | `string`             |                                                                                     |
| `inserted_at`      | `string (date-time)` |                                                                                     |
| `updated_at`       | `string (date-time)` |                                                                                     |

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

### ProjectWithAccess

| Field              | Type                                   | Description                                                                         |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------- |
| `id`               | `string`                               |                                                                                     |
| `name`             | `string`                               |                                                                                     |
| `description`      | `string`                               | Nullable.                                                                           |
| `everyone_enabled` | `boolean`                              | When true, all org members have access; otherwise access is granted per-user/group. |
| `organization_id`  | `string`                               |                                                                                     |
| `inserted_at`      | `string (date-time)`                   |                                                                                     |
| `updated_at`       | `string (date-time)`                   |                                                                                     |
| `access_users`     | array of [`AccessUser`](#accessuser)   |                                                                                     |
| `access_groups`    | array of [`AccessGroup`](#accessgroup) |                                                                                     |

### AccessUser

| Field      | Type     | Description |
| ---------- | -------- | ----------- |
| `id`       | `string` |             |
| `name`     | `string` |             |
| `email`    | `string` |             |
| `username` | `string` | Nullable.   |

### AccessGroup

| Field  | Type     | Description |
| ------ | -------- | ----------- |
| `id`   | `string` |             |
| `name` | `string` |             |

### Ok

Simple acknowledgement.

| Field | Type      | Description |
| ----- | --------- | ----------- |
| `ok`  | `boolean` |             |

### Cohort

| Field              | Type                 | Description                |
| ------------------ | -------------------- | -------------------------- |
| `id`               | `string`             |                            |
| `name`             | `string`             |                            |
| `description`      | `string`             | Nullable.                  |
| `everyone_enabled` | `boolean`            |                            |
| `project_id`       | `string`             |                            |
| `device_count`     | `integer`            | Present on list responses. |
| `inserted_at`      | `string (date-time)` |                            |
| `updated_at`       | `string (date-time)` |                            |

### CohortWithAccess

| Field              | Type                                   | Description                |
| ------------------ | -------------------------------------- | -------------------------- |
| `id`               | `string`                               |                            |
| `name`             | `string`                               |                            |
| `description`      | `string`                               | Nullable.                  |
| `everyone_enabled` | `boolean`                              |                            |
| `project_id`       | `string`                               |                            |
| `device_count`     | `integer`                              | Present on list responses. |
| `inserted_at`      | `string (date-time)`                   |                            |
| `updated_at`       | `string (date-time)`                   |                            |
| `access_users`     | array of [`AccessUser`](#accessuser)   |                            |
| `access_groups`    | array of [`AccessGroup`](#accessgroup) |                            |
