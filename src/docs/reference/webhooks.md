# Webhooks

Webhooks egress events from Peridio to an HTTPS endpoint.

## Security

- Require TLS to enforce encrypted communications.
- Provide HMAC-SHA256 request signatures.
- Provide published at data to prevent replay attacks.

### Secrets

Webhook secrets are the upcased hex-encoding of 128-bit secrets. They are rollable with a client-configurable transition window where dual signatures are provided temporarily.

### Signature verification

Webhook requests are signed via HMAC-SHA256.

To verify this signature you will need to calculate an expected signature and compare it. If they match, the signature has been verified to be correct.

To calculate the signature, you need the following data:

- The webhook's secret.
- The webhook request's:
  - `peridio-signature` header.
  - `peridio-published-at` header.
  - body.

:::caution sensitive operations
It is critical that your own code as well as any tools you use do not alter the headers or body in any way prior to signature verification as doing so will cause it to fail.
:::

**Verification process**

:::info dual signatures
When you roll a webhook's secret, depending on whether you provide a TTL or not and what the value is, there may be up to two active secrets at once. When this happens, the value of the signature header will include two signatures seperated by a comma like `<sig1>,<sig2>` instead of just one like `<sig1>`.
:::

1. Obtain value of `peridio-signature` header.
    - Keep in mind their may be two values here if you rolling secrets with a transition window. If your expected computed signature matches either signature, the request is valid.
2. Obtain value of `peridio-published-at` header.
3. Obtain request body.
4. Prepare the to-be-signed payload by concatentating:
    - The published at value.
    - The request body.
5. Compute the HMAC-SHA256 over the to-be-signed payload using the webhook's secret.

**Verification example**

You can use the following example values to validate your signature verification logic.

- Webhook secret: `B284A51B143841695B2D7BF3B8554731`.
- Published at: `2000-01-01T00:00:00Z`.
- Body:
    ```json
    {"version":1,"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:a727838c-0195-4ccf-8258-cebf4608db8e","type":"device","inserted_at":"2023-09-14T20:23:30Z","data":{"type":"release_changed","data":{"device":{"identifier":"SN1337","prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:a2edbb76-5f44-4202-860d-74a8c17d65aa"},"from_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:499b64fb-1420-4f58-8c73-e5497e1f531e","version":"1.0.0"},"to_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:f456986f-1a2f-4d73-8f70-96ff05a6bce7","version":"2.0.0"}}}}
    ```

Give the above, the to-be-signed payload would be:

```text
2000-01-01T00:00:00Z{"version":1,"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:a727838c-0195-4ccf-8258-cebf4608db8e","type":"device","inserted_at":"2023-09-14T20:23:30Z","data":{"type":"release_changed","data":{"device":{"identifier":"SN1337","prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:a2edbb76-5f44-4202-860d-74a8c17d65aa"},"from_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:499b64fb-1420-4f58-8c73-e5497e1f531e","version":"1.0.0"},"to_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:f456986f-1a2f-4d73-8f70-96ff05a6bce7","version":"2.0.0"}}}}
```

Compute the HMAC-SHA256 over the to-be-signed payload using the webhook's secret.

The expected computed value is:

```text
FC825FCAA2E4C2688F075144105B75C2943D8B88AC4B5FAB134F2676A63FB6EF
```

For valid requests, that should match the value provided by the `peridio-signature` header.

### Replay attacks

To protect against replay attacks, the published at header should be checked for staleness. Reject webhook requests whose published at value is sufficiently old given the current time and your security posture. We recommend a tolerance of 5 minutes. Ensure your servers performing this verification have accurate time via NTP or other means.

### Timing attacks

To protect against timing attacks, use a constant-time string comparison to compare the expected signature to each of the received signatures.

## URL verification

Peridio performs URL verification to help prevent misconfiguration of webhooks. When enabling a webhook, and when updating the `url` field of an enabled webhook, the operation will only succeed if URL verification succeeds.

During URL verification, Peridio will execute a webhook request that publishes a [webhook.test_fire event](#test_fire). For verification to succeed, a timely 200 must be returned.

## Deduplication

The events that webhooks publish have a [PRN](/reference/peridio-resource-names) field that can be used for deduplication.

## Client endpoint requirements

The client endpoint in this context is a webhook's `url` field.

- Must be prefixed with `https://`.
- Must immediately return a `200` upon receipt and signature verification. For example, you must return a `200` response before updating a record in your system.
- Must be operational at the time of enabling a webhook, or at the time of the update if updating the `url` of an enabled webhook.
- HTTP method:  `POST`.
- Max `url` length: `1028`.

## Retries

Peridio will retry webhook delivery for up to 3 days with a jittered backoff.

## Event filtering

Peridio supports Peridio-side event filtering. This means that only the events that you are interested in are published. Leverage the enabled events options in the API and CLI to control this.

:::tip
`webhook.test_fire` events created as part of URL verification are published regardless of the webhook's `state` and `enabled_events`. Test fire events created with the Peridio API [test-fire-webhook](/admin-api#webhooks/operation/test-fire-webhook) endpoint are published regardless of the webhook's state, but they require the webhook's `state` to be `enabled`.
:::

## Supported events

All events have the following top level structure:

```json
{
  "version": 1,
  "prn": "<prn of the event>",
  "type": "<type of the event",
  "data": <data structure depends on the type>,
  "inserted_at": "2023-09-14T20:23:30Z"
}
```

The possible values for `type` and the associated structure for their `data` fields are documented below.

### device

Events with a `type` of `device` have the following `data` structure:

```json
{
  "type": "<subtype of the event>",
  "data": <data structure depends on the type>,
}
```

The possible values for `type` and the associated structure for their `data` fields are documented below.

#### release_changed

This event is created when a device informs Peridio of its current release, and that release is different than the one Peridio currently had on record. For example, if Peridio thought the device was on release 1, but then the device informed Peridio it was on release 2, then this event would be created going from 1 to 2.

`device` events with a `type` of `release_changed` have the following `data` structure:

```json
{
  "device": {
    "identifier": "<identifier of the device>",
    "prn": "<prn of the device>",
  },
  "from_release": {
    "prn": "<prn of the release the device is udpating off of>",
    "version": "<semver of the release>",
  },
  "to_release": {
    "prn": "<prn of the release the device is updating to>",
    "version": "<semver of the release>",
  }
}
```

### webhook

Events with a `type` of `webhook` have the following `data` structure:

```json
{
  "type": "<subtype of the event>",
  "data": <data structure depends on the type>,
}
```

#### test_fire

This event is created by the Peridio API [test-fire-webhook](/admin-api#webhooks/operation/test-fire-webhook) endpoint as well as during [URL verification](/reference/webhooks#url-verification).

`webhook` events with a `type` of `test_fire` have the following `data` structure:

```json
{
  "webhook_prn": "<prn of the webhook>"
}
```
