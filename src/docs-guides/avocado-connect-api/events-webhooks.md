---
title: Events & Webhooks
sidebar_position: 11
description: 'Subscribe to fleet events via webhooks and query aggregated activity.'
copy_markdown: true
---

# Events & Webhooks

Subscribe to fleet events via webhooks and query aggregated activity.

## Endpoints

| Method   | Path                                          | Description                                             |
| -------- | --------------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/orgs/{org_id}/webhooks`                 | [List webhook endpoints](#list-webhook-endpoints)       |
| `POST`   | `/api/orgs/{org_id}/webhooks`                 | [Create a webhook endpoint](#create-a-webhook-endpoint) |
| `GET`    | `/api/orgs/{org_id}/webhooks/{id}`            | [Get a webhook endpoint](#get-a-webhook-endpoint)       |
| `PUT`    | `/api/orgs/{org_id}/webhooks/{id}`            | [Update a webhook endpoint](#update-a-webhook-endpoint) |
| `DELETE` | `/api/orgs/{org_id}/webhooks/{id}`            | [Delete a webhook endpoint](#delete-a-webhook-endpoint) |
| `GET`    | `/api/orgs/{org_id}/webhooks/{id}/deliveries` | [List webhook deliveries](#list-webhook-deliveries)     |
| `POST`   | `/api/orgs/{org_id}/webhooks/{id}/test`       | [Send a test webhook](#send-a-test-webhook)             |
| `GET`    | `/api/orgs/{org_id}/events/aggregates`        | [Aggregate event counts](#aggregate-event-counts)       |

### List webhook endpoints

`GET /api/orgs/{org_id}/webhooks`

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

| Status | Body                                                                                                | Description                  |
| ------ | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| `200`  | `data:` array of [`WebhookEndpoint`](#webhookendpoint), `meta:` [`PaginationMeta`](#paginationmeta) | Endpoints (secrets omitted). |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/webhooks" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "name": "string",
      "url": "https://example.com",
      "events": ["string"],
      "enabled": true,
      "secret": "string",
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

### Create a webhook endpoint

`POST /api/orgs/{org_id}/webhooks`

Admin only. The signing `secret` is returned once, in the create response only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Request body:**

| Field                      | Type           | Required | Description |
| -------------------------- | -------------- | -------- | ----------- |
| `webhook_endpoint`         | `object`       | Yes      |             |
| `webhook_endpoint.name`    | `string`       | No       |             |
| `webhook_endpoint.url`     | `string (uri)` | Yes      |             |
| `webhook_endpoint.events`  | `string[]`     | No       |             |
| `webhook_endpoint.enabled` | `boolean`      | No       |             |

**Responses:**

| Status | Body                                          | Description                     |
| ------ | --------------------------------------------- | ------------------------------- |
| `201`  | `data:` [`WebhookEndpoint`](#webhookendpoint) | Created.                        |
| `422`  | [`ValidationError`](#validationerror)         | Request body failed validation. |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/webhooks" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "webhook_endpoint": {
    "name": "string",
    "url": "https://example.com",
    "events": [
      "string"
    ],
    "enabled": true
  }
}'
```

**Example response** (`201`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "url": "https://example.com",
    "events": ["string"],
    "enabled": true,
    "secret": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Get a webhook endpoint

`GET /api/orgs/{org_id}/webhooks/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                          | Description         |
| ------ | --------------------------------------------- | ------------------- |
| `200`  | `data:` [`WebhookEndpoint`](#webhookendpoint) | Endpoint.           |
| `404`  | [`Error`](#error)                             | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/webhooks/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "url": "https://example.com",
    "events": ["string"],
    "enabled": true,
    "secret": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Update a webhook endpoint

`PUT /api/orgs/{org_id}/webhooks/{id}`

Admin only.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Request body:**

| Field                      | Type           | Required | Description |
| -------------------------- | -------------- | -------- | ----------- |
| `webhook_endpoint`         | `object`       | Yes      |             |
| `webhook_endpoint.name`    | `string`       | No       |             |
| `webhook_endpoint.url`     | `string (uri)` | No       |             |
| `webhook_endpoint.events`  | `string[]`     | No       |             |
| `webhook_endpoint.enabled` | `boolean`      | No       |             |

**Responses:**

| Status | Body                                          | Description                     |
| ------ | --------------------------------------------- | ------------------------------- |
| `200`  | `data:` [`WebhookEndpoint`](#webhookendpoint) | Updated.                        |
| `404`  | [`Error`](#error)                             | Resource not found.             |
| `422`  | [`ValidationError`](#validationerror)         | Request body failed validation. |

**Example request:**

```bash
curl -X PUT "https://connect.peridio.com/api/orgs/{org_id}/webhooks/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "webhook_endpoint": {
    "name": "string",
    "url": "https://example.com",
    "events": [
      "string"
    ],
    "enabled": true
  }
}'
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "organization_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "name": "string",
    "url": "https://example.com",
    "events": ["string"],
    "enabled": true,
    "secret": "string",
    "inserted_at": "2026-08-14T12:00:00Z",
    "updated_at": "2026-08-14T12:00:00Z"
  }
}
```

### Delete a webhook endpoint

`DELETE /api/orgs/{org_id}/webhooks/{id}`

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
curl -X DELETE "https://connect.peridio.com/api/orgs/{org_id}/webhooks/{id}" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "ok": true
}
```

### List webhook deliveries

`GET /api/orgs/{org_id}/webhooks/{id}/deliveries`

Admin only. Delivery attempts for the endpoint.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Query parameters:**

| Name        | Type      | Required | Description                                                                              |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `cursor`    | `string`  | No       | Opaque pagination cursor from a prior response's `meta.after`/`meta.before`.             |
| `limit`     | `integer` | No       | Max items per page (clamped 1–100). Defaults to `20`. Range 1–100.                       |
| `direction` | `string`  | No       | Page direction relative to the cursor. One of: `after`, `before`. Defaults to `"after"`. |

**Responses:**

| Status | Body                                                                                                | Description         |
| ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| `200`  | `data:` array of [`WebhookDelivery`](#webhookdelivery), `meta:` [`PaginationMeta`](#paginationmeta) | Deliveries.         |
| `404`  | [`Error`](#error)                                                                                   | Resource not found. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/webhooks/{id}/deliveries" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": [
    {
      "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "webhook_endpoint_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
      "event_type": "string",
      "status": "string",
      "response_status": 0,
      "attempt_count": 0,
      "last_attempted_at": "2026-08-14T12:00:00Z",
      "delivered_at": "2026-08-14T12:00:00Z",
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

### Send a test webhook

`POST /api/orgs/{org_id}/webhooks/{id}/test`

Admin only. Enqueues a `ping` delivery to the endpoint and returns the created delivery record.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |
| `id`     | `string`        |                    |

**Responses:**

| Status | Body                                          | Description             |
| ------ | --------------------------------------------- | ----------------------- |
| `200`  | `data:` [`WebhookDelivery`](#webhookdelivery) | Test delivery enqueued. |
| `404`  | [`Error`](#error)                             | Resource not found.     |

**Example request:**

```bash
curl -X POST "https://connect.peridio.com/api/orgs/{org_id}/webhooks/{id}/test" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "webhook_endpoint_id": "0198a2e6-6f24-7cc3-b456-663cd21c4b12",
    "event_type": "string",
    "status": "string",
    "response_status": 0,
    "attempt_count": 0,
    "last_attempted_at": "2026-08-14T12:00:00Z",
    "delivered_at": "2026-08-14T12:00:00Z",
    "inserted_at": "2026-08-14T12:00:00Z"
  }
}
```

### Aggregate event counts

`GET /api/orgs/{org_id}/events/aggregates`

Returns time-bucketed event counts for the org over the given range, optionally filtered by event types, resource type, cohorts, tags, device search, or device status.

**Path parameters:**

| Name     | Type            | Description        |
| -------- | --------------- | ------------------ |
| `org_id` | `string (uuid)` | Organization UUID. |

**Query parameters:**

| Name            | Type     | Required | Description                                                |
| --------------- | -------- | -------- | ---------------------------------------------------------- |
| `range`         | `string` | No       | One of: `24h`, `7d`, `30d`. Defaults to `"24h"`.           |
| `types`         | `string` | No       | Comma-separated event types.                               |
| `resource_type` | `string` | No       |                                                            |
| `cohort_ids`    | `string` | No       | Comma-separated cohort UUIDs.                              |
| `tags`          | `string` | No       | Comma-separated device tags.                               |
| `search`        | `string` | No       |                                                            |
| `status`        | `string` | No       | One of: `unregistered`, `registered`, `online`, `offline`. |

**Responses:**

| Status | Body                                        | Description    |
| ------ | ------------------------------------------- | -------------- |
| `200`  | `data:` [`EventAggregate`](#eventaggregate) | Aggregates.    |
| `400`  | [`Error`](#error)                           | Invalid range. |

**Example request:**

```bash
curl "https://connect.peridio.com/api/orgs/{org_id}/events/aggregates" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

**Example response** (`200`):

```json
{
  "data": {
    "range": "24h",
    "bucket_size": "string",
    "buckets": [{}],
    "totals": {}
  }
}
```

## Object reference

### WebhookEndpoint

| Field             | Type                 | Description                               |
| ----------------- | -------------------- | ----------------------------------------- |
| `id`              | `string`             |                                           |
| `organization_id` | `string`             |                                           |
| `name`            | `string`             | Nullable.                                 |
| `url`             | `string (uri)`       |                                           |
| `events`          | `string[]`           | Event types this endpoint subscribes to.  |
| `enabled`         | `boolean`            |                                           |
| `secret`          | `string`             | Signing secret — returned only on create. |
| `inserted_at`     | `string (date-time)` |                                           |
| `updated_at`      | `string (date-time)` |                                           |

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

### WebhookDelivery

| Field                 | Type                 | Description                                     |
| --------------------- | -------------------- | ----------------------------------------------- |
| `id`                  | `string`             |                                                 |
| `webhook_endpoint_id` | `string`             |                                                 |
| `event_type`          | `string`             |                                                 |
| `status`              | `string`             | e.g. pending, delivered, failed.                |
| `response_status`     | `integer`            | HTTP status returned by the endpoint. Nullable. |
| `attempt_count`       | `integer`            |                                                 |
| `last_attempted_at`   | `string (date-time)` | Nullable.                                       |
| `delivered_at`        | `string (date-time)` | Nullable.                                       |
| `inserted_at`         | `string (date-time)` |                                                 |

### EventAggregate

| Field         | Type       | Description                                            |
| ------------- | ---------- | ------------------------------------------------------ |
| `range`       | `string`   | One of: `24h`, `7d`, `30d`.                            |
| `bucket_size` | `string`   | Time bucket granularity, e.g. `hour`.                  |
| `buckets`     | `object[]` | Per-bucket event counts.                               |
| `totals`      | `object`   | Totals keyed by event type; `_all` is the grand total. |
