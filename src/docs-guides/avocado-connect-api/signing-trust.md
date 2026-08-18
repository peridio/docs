---
title: 'Signing & Trust'
sidebar_position: 9
description: 'TUF trust-root and signing-key management for update integrity (advanced).'
copy_markdown: true
---

# Signing & Trust

TUF trust-root and signing-key management for update integrity (advanced).

## Endpoints

| Method   | Path                                                        | Description                                                                   |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `GET`    | `/api/orgs/{org_id}/trust/status`                           | [Get fleet trust posture](#get-fleet-trust-posture)                           |
| `POST`   | `/api/orgs/{org_id}/trust/root`                             | [Upload a signed root.json](#upload-a-signed-rootjson)                        |
| `GET`    | `/api/orgs/{org_id}/runtimes/{runtime_id}/delegations`      | [List runtime delegations](#list-runtime-delegations)                         |
| `POST`   | `/api/orgs/{org_id}/runtimes/{runtime_id}/delegations`      | [Upload runtime delegated targets](#upload-runtime-delegated-targets)         |
| `DELETE` | `/api/orgs/{org_id}/runtimes/{runtime_id}/delegations/{id}` | [Delete a runtime delegation](#delete-a-runtime-delegation)                   |
| `POST`   | `/api/orgs/{org_id}/trust/promote-root/propose`             | [Propose root promotion](#propose-root-promotion)                             |
| `POST`   | `/api/orgs/{org_id}/trust/promote-root/commit`              | [Commit root promotion](#commit-root-promotion)                               |
| `DELETE` | `/api/orgs/{org_id}/trust/promote-root/pending`             | [Cancel a pending root promotion](#cancel-a-pending-root-promotion)           |
| `POST`   | `/api/orgs/{org_id}/trust/rotate-server-key`                | [Rotate the server signing key](#rotate-the-server-signing-key)               |
| `POST`   | `/api/orgs/{org_id}/trust/rotate-server-key/propose`        | [Propose server-key rotation (Level 2)](#propose-server-key-rotation-level-2) |
| `POST`   | `/api/orgs/{org_id}/trust/rotate-server-key/commit`         | [Commit server-key rotation (Level 2)](#commit-server-key-rotation-level-2)   |
| `GET`    | `/api/orgs/{org_id}/signing/server-key`                     | [Get the org server signing key](#get-the-org-server-signing-key)             |
| `GET`    | `/api/orgs/{org_id}/signing/status`                         | [Get signing configuration status](#get-signing-configuration-status)         |
| `GET`    | `/api/orgs/{org_id}/signing/keys`                           | [List delegate keys](#list-delegate-keys)                                     |
| `POST`   | `/api/orgs/{org_id}/signing/keys`                           | [Register a delegate key](#register-a-delegate-key)                           |
| `POST`   | `/api/orgs/{org_id}/signing/keys/approve`                   | [Approve a staged delegate key](#approve-a-staged-delegate-key)               |
| `DELETE` | `/api/orgs/{org_id}/signing/keys/staged`                    | [Discard a staged delegate key](#discard-a-staged-delegate-key)               |
| `POST`   | `/api/orgs/{org_id}/signing/sign-for-deploy`                | [Sign targets for a local deploy](#sign-targets-for-a-local-deploy)           |

### Get fleet trust posture

`GET /api/orgs/{org_id}/trust/status`

Returns the org's TUF root version, security level, and device root-version distribution.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body                          | Description   |
| ------ | ----------------------------- | ------------- |
| `200`  | [`TrustStatus`](#truststatus) | Trust status. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/trust/status" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "current_root_version": 0,
  "setup_complete": true,
  "root_rotated": true,
  "security_level": 0,
  "has_pending_promotion": true,
  "root_version_distribution": {},
  "total_tracked_devices": 0,
  "stale_device_count": 0
}
```

### Upload a signed root.json

`POST /api/orgs/{org_id}/trust/root`

Admin only. Uploads the org's user-signed TUF root metadata (signed offline).

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field       | Type     | Required | Description                        |
| ----------- | -------- | -------- | ---------------------------------- |
| `root_json` | `object` | Yes      | The signed root metadata document. |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data: object`                        | Uploaded.                       |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/trust/root" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "root_json": {}
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "version": 0,
    "setup_complete": true
  }
}
```

### List runtime delegations

`GET /api/orgs/{org_id}/runtimes/{runtime_id}/delegations`

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `runtime_id` | `string`        |                    |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                                    | Description  |
| ------ | ------------------------------------------------------------------------------------------------------- | ------------ |
| `200`  | `data:` array of [`RuntimeDelegation`](#runtimedelegation), `meta:` [`PaginationMeta`](#paginationmeta) | Delegations. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/runtimes/{runtime_id}/delegations" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "username": "string",
      "role_name": "string",
      "inserted_at": "2026-08-14T12:00:00Z"
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

### Upload runtime delegated targets

`POST /api/orgs/{org_id}/runtimes/{runtime_id}/delegations`

Admin only. Uploads user-signed delegated targets JSON for a runtime.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `runtime_id` | `string`        |                    |

**Request body:**

| Field          | Type     | Required | Description                            |
| -------------- | -------- | -------- | -------------------------------------- |
| `targets_json` | `object` | Yes      | The signed delegated targets document. |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data: object`                        | Uploaded.                       |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/runtimes/{runtime_id}/delegations" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "targets_json": {}
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "runtime_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "role_name": "string"
  }
}
```

### Delete a runtime delegation

`DELETE /api/orgs/{org_id}/runtimes/{runtime_id}/delegations/{id}`

Admin only.

**Path parameters:**

| Name         | Type            | Description        |
| ------------ | --------------- | ------------------ |
| `org_id`     | `string (uuid)` | Organization UUID. |
| `runtime_id` | `string`        |                    |
| `id`         | `string`        |                    |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `204`  | —                 | Deleted.            |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/runtimes/{runtime_id}/delegations/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

### Propose root promotion

`POST /api/orgs/{org_id}/trust/promote-root/propose`

Admin only. Proposes promoting the TUF root (Level 1 → 2). Returns the pending root JSON for the CLI to sign.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body           | Description |
| ------ | -------------- | ----------- |
| `200`  | `data: object` | Proposed.   |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/trust/promote-root/propose" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "pending_root_json": {},
    "version": 0
  }
}
```

### Commit root promotion

`POST /api/orgs/{org_id}/trust/promote-root/commit`

Admin only. Commits the proposed root promotion with the user's co-signature.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field       | Type     | Required | Description |
| ----------- | -------- | -------- | ----------- |
| `signature` | `string` | Yes      |             |

**Responses:**

| Status | Body           | Description |
| ------ | -------------- | ----------- |
| `200`  | `data: object` | Committed.  |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/trust/promote-root/commit" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "signature": "string"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "version": 0,
    "security_level": 0
  }
}
```

### Cancel a pending root promotion

`DELETE /api/orgs/{org_id}/trust/promote-root/pending`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body | Description |
| ------ | ---- | ----------- |
| `204`  | —    | Cancelled.  |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/trust/promote-root/pending" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

### Rotate the server signing key

`POST /api/orgs/{org_id}/trust/rotate-server-key`

Admin only. Rotates the server signing key at trust Level 0/1 (no user action needed).

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body           | Description |
| ------ | -------------- | ----------- |
| `200`  | `data: object` | Rotated.    |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/trust/rotate-server-key" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "version": 0
  }
}
```

### Propose server-key rotation (Level 2)

`POST /api/orgs/{org_id}/trust/rotate-server-key/propose`

Admin only. Returns the pending root JSON for the CLI to co-sign.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body           | Description |
| ------ | -------------- | ----------- |
| `200`  | `data: object` | Proposed.   |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/trust/rotate-server-key/propose" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "pending_root_json": {},
    "version": 0
  }
}
```

### Commit server-key rotation (Level 2)

`POST /api/orgs/{org_id}/trust/rotate-server-key/commit`

Admin only. Commits with the user's co-signature.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field       | Type     | Required | Description |
| ----------- | -------- | -------- | ----------- |
| `signature` | `string` | Yes      |             |

**Responses:**

| Status | Body           | Description |
| ------ | -------------- | ----------- |
| `200`  | `data: object` | Committed.  |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/trust/rotate-server-key/commit" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "signature": "string"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "version": 0,
    "security_level": 0
  }
}
```

### Get the org server signing key

`GET /api/orgs/{org_id}/signing/server-key`

Returns the org server signing key (public hex + key ID). Creates the key if none exists.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body           | Description |
| ------ | -------------- | ----------- |
| `200`  | `data: object` | Server key. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/signing/server-key" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "public_key_hex": "string",
    "keyid": "string",
    "root_key": {}
  }
}
```

### Get signing configuration status

`GET /api/orgs/{org_id}/signing/status`

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Responses:**

| Status | Body                                      | Description     |
| ------ | ----------------------------------------- | --------------- |
| `200`  | `data:` [`SigningStatus`](#signingstatus) | Signing status. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/signing/status" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "setup_complete": true,
    "root_rotated": true,
    "root_json_version": 0,
    "timestamp_ttl_days": 0,
    "server_key_hex": "string",
    "server_keyid": "string",
    "root_key": {}
  }
}
```

### List delegate keys

`GET /api/orgs/{org_id}/signing/keys`

Lists active and staged delegate signing keys for the org.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `key_type`  | `string`  | No       | One of: `content`, `targets`.                                                            |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                        | Description |
| ------ | ------------------------------------------------------------------------------------------- | ----------- |
| `200`  | `data:` array of [`DelegateKey`](#delegatekey), `meta:` [`PaginationMeta`](#paginationmeta) | Keys.       |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/signing/keys" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "username": "string",
      "keyid": "string",
      "public_key_hex": "string",
      "status": "string",
      "key_type": "content",
      "role_name": "string",
      "paths": ["string"],
      "staged_at": "2026-08-14T12:00:00Z",
      "activated_at": "2026-08-14T12:00:00Z",
      "activated_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
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

### Register a delegate key

`POST /api/orgs/{org_id}/signing/keys`

Registers (stages) a delegate signing key for the current user. Approval by an admin activates it.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field            | Type     | Required | Description                                            |
| ---------------- | -------- | -------- | ------------------------------------------------------ |
| `public_key_hex` | `string` | Yes      |                                                        |
| `key_type`       | `string` | No       | One of: `content`, `targets`. Defaults to `"content"`. |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`DelegateKey`](#delegatekey) | Registered (staged).            |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/signing/keys" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "public_key_hex": "string",
  "key_type": "content"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "username": "string",
    "keyid": "string",
    "public_key_hex": "string",
    "status": "string",
    "key_type": "content",
    "role_name": "string",
    "paths": ["string"],
    "staged_at": "2026-08-14T12:00:00Z",
    "activated_at": "2026-08-14T12:00:00Z",
    "activated_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
  }
}
```

### Approve a staged delegate key

`POST /api/orgs/{org_id}/signing/keys/approve`

Admin only. Approves (activates) a staged delegate key. Identify the key by `keyid`, or by `key_type` to approve that role's staged key.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:** _(optional)_

| Field      | Type     | Required | Description                   |
| ---------- | -------- | -------- | ----------------------------- |
| `keyid`    | `string` | No       |                               |
| `key_type` | `string` | No       | One of: `content`, `targets`. |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data:` [`DelegateKey`](#delegatekey) | Approved.                       |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/signing/keys/approve" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "keyid": "string",
  "key_type": "content"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "username": "string",
    "keyid": "string",
    "public_key_hex": "string",
    "status": "string",
    "key_type": "content",
    "role_name": "string",
    "paths": ["string"],
    "staged_at": "2026-08-14T12:00:00Z",
    "activated_at": "2026-08-14T12:00:00Z",
    "activated_by_user_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12"
  }
}
```

### Discard a staged delegate key

`DELETE /api/orgs/{org_id}/signing/keys/staged`

Admin only. Discards a staged (unapproved) delegate key. Identify by `keyid` or `key_type`.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name       | Type     | Required | Description                   |
| ---------- | -------- | -------- | ----------------------------- |
| `keyid`    | `string` | No       |                               |
| `key_type` | `string` | No       | One of: `content`, `targets`. |

**Responses:**

| Status | Body              | Description         |
| ------ | ----------------- | ------------------- |
| `204`  | —                 | Discarded.          |
| `404`  | [`Error`](#error) | Resource not found. |

**Example request:**

```bash
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/signing/keys/staged" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

### Sign targets for a local deploy

`POST /api/orgs/{org_id}/signing/sign-for-deploy`

Signs a caller-supplied TUF targets list with the org server key, in the per-runtime delegated format `avocado deploy --connect-sign` expects. Returns the signed `targets_json`, `snapshot_json`, `timestamp_json`, and `delegated_targets_json` (all at version 1).

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field          | Type     | Required | Description              |
| -------------- | -------- | -------- | ------------------------ |
| `targets`      | `object` | Yes      | TUF target list to sign. |
| `runtime_uuid` | `string` | Yes      |                          |

**Responses:**

| Status | Body                                  | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| `200`  | `data: object`                        | Signed metadata.                |
| `422`  | [`ValidationError`](#validationerror) | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/signing/sign-for-deploy" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "targets": {},
  "runtime_uuid": "string"
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "targets_json": {},
    "snapshot_json": {},
    "timestamp_json": {},
    "delegated_targets_json": {}
  }
}
```

## Object reference

### TrustStatus

| Field                       | Type      | Description                         |
| --------------------------- | --------- | ----------------------------------- |
| `current_root_version`      | `integer` |                                     |
| `setup_complete`            | `boolean` |                                     |
| `root_rotated`              | `boolean` |                                     |
| `security_level`            | `integer` | TUF trust level (0/1/2).            |
| `has_pending_promotion`     | `boolean` |                                     |
| `root_version_distribution` | `object`  | Map of root version → device count. |
| `total_tracked_devices`     | `integer` |                                     |
| `stale_device_count`        | `integer` |                                     |

### ValidationError

Changeset validation error. Keys are field names; values are lists of messages.

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `errors` | `object` |             |

### RuntimeDelegation

| Field         | Type                 | Description                                     |
| ------------- | -------------------- | ----------------------------------------------- |
| `id`          | `string`             |                                                 |
| `runtime_id`  | `string`             |                                                 |
| `user_id`     | `string`             |                                                 |
| `username`    | `string`             | Nullable.                                       |
| `role_name`   | `string`             | TUF delegated role name, e.g. `runtime-<uuid>`. |
| `inserted_at` | `string (date-time)` |                                                 |

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

### SigningStatus

| Field                | Type      | Description                     |
| -------------------- | --------- | ------------------------------- |
| `setup_complete`     | `boolean` |                                 |
| `root_rotated`       | `boolean` |                                 |
| `root_json_version`  | `integer` |                                 |
| `timestamp_ttl_days` | `integer` |                                 |
| `server_key_hex`     | `string`  |                                 |
| `server_keyid`       | `string`  |                                 |
| `root_key`           | `object`  | Present once a root key exists. |

### DelegateKey

| Field                  | Type                 | Description                                      |
| ---------------------- | -------------------- | ------------------------------------------------ |
| `id`                   | `string`             |                                                  |
| `user_id`              | `string`             |                                                  |
| `username`             | `string`             | Nullable.                                        |
| `keyid`                | `string`             |                                                  |
| `public_key_hex`       | `string`             |                                                  |
| `status`               | `string`             | e.g. staged, active.                             |
| `key_type`             | `string`             | Delegate key role. One of: `content`, `targets`. |
| `role_name`            | `string`             |                                                  |
| `paths`                | `string[]`           | TUF delegation paths (create response).          |
| `staged_at`            | `string (date-time)` | Nullable.                                        |
| `activated_at`         | `string (date-time)` | Nullable.                                        |
| `activated_by_user_id` | `string`             | Nullable.                                        |
