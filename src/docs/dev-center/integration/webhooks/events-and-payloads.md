# Events and Payloads

This guide provides detailed information about all webhook events supported by Peridio, including their payload structures and when they are triggered.

## Event Structure

All webhook events follow a consistent structure:

```json
{
  "version": 1,
  "prn": "prn:1:organization-id:event:event-id",
  "type": "event_category",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "specific_event_type",
    "data": {
      // Event-specific payload
    }
  }
}
```

### Common Fields

- **version** - Schema version (currently always `1`)
- **prn** - Unique Peridio Resource Name for the event (used for deduplication)
- **type** - Event category (`device`, `api_key`, `webhook`)
- **inserted_at** - ISO 8601 timestamp when the event was created
- **data.type** - Specific event type within the category
- **data.data** - Event-specific payload containing relevant information

## Device Events

Device events are triggered by device lifecycle activities and interactions with the Peridio platform.

### device.connected

Triggered when a device establishes a connection to Peridio.

**Event Type:** `device.connected`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:connection-event-id",
  "type": "device",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "connected",
    "data": {
      "device": {
        "identifier": "SN1337",
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:device-id"
      }
    }
  }
}
```

**Use Cases:**
- Device connectivity monitoring
- Triggering device initialization workflows
- Updating device status in external systems

### device.authentication-failed

Triggered when a device fails to authenticate with Peridio.

**Event Type:** `device.authentication-failed`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:auth-failure-event-id",
  "type": "device",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "authentication-failed",
    "data": {
      "device": {
        "identifier": "SN1337",
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:device-id"
      },
      "reason": "invalid_certificate"
    }
  }
}
```

**Common Reasons:**
- `invalid_certificate` - Device certificate is invalid or expired
- `unknown_device` - Device is not registered in the system
- `revoked_certificate` - Device certificate has been revoked

**Use Cases:**
- Security monitoring and alerting
- Automatic device troubleshooting
- Compliance and audit logging

### device.checked-for-release

Triggered when a device checks for available firmware releases.

**Event Type:** `device.checked-for-release`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:check-release-event-id",
  "type": "device",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "checked-for-release",
    "data": {
      "device": {
        "identifier": "SN1337",
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:device-id"
      },
      "current_release": {
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:current-release-id",
        "version": "1.0.0"
      }
    }
  }
}
```

**Use Cases:**
- Monitoring device update checking patterns
- Analytics on device behavior
- Debugging update delivery issues

**Note:** This event can be high-frequency depending on device check intervals.

### device.claimed-release

Triggered when a device successfully claims (downloads) a firmware release.

**Event Type:** `device.claimed-release`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:claimed-release-event-id",
  "type": "device",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "claimed-release",
    "data": {
      "device": {
        "identifier": "SN1337",
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:device-id"
      },
      "release": {
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:new-release-id",
        "version": "2.0.0"
      }
    }
  }
}
```

**Use Cases:**
- Tracking firmware download progress
- Update deployment monitoring
- Bandwidth usage analytics

### device.release-changed

Triggered when a device's active firmware release changes (typically after a successful update).

**Event Type:** `device.release-changed`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:release-changed-event-id",
  "type": "device",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "release-changed",
    "data": {
      "device": {
        "identifier": "SN1337",
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:device-id"
      },
      "from_release": {
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:old-release-id",
        "version": "1.0.0"
      },
      "to_release": {
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:new-release-id",
        "version": "2.0.0"
      }
    }
  }
}
```

**Use Cases:**
- Confirming successful firmware updates
- Update campaign tracking
- Device fleet version monitoring
- Triggering post-update workflows

### device.updated

Triggered when device metadata or configuration is updated.

**Event Type:** `device.updated`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:device-updated-event-id",
  "type": "device",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "updated",
    "data": {
      "device": {
        "identifier": "SN1337",
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:device-id"
      },
      "updated_fields": ["description", "tags"]
    }
  }
}
```

**Use Cases:**
- Synchronizing device data with external systems
- Audit logging for device changes
- Triggering configuration updates

## API Key Events

Events related to API key management and security.

### api_key.created

Triggered when a new API key is created in your account.

**Event Type:** `api_key.created`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:api-key-created-event-id",
  "type": "api_key",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "created",
    "data": {
      "api_key": {
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:api_key:api-key-id",
        "name": "Production Integration Key"
      }
    }
  }
}
```

**Use Cases:**
- Security monitoring and alerting
- Access audit logging
- Automated key management workflows

## Webhook Events

Events related to webhook testing and management.

### webhook.test_fire

Triggered during webhook URL verification or manual testing.

**Event Type:** `webhook.test_fire`

**Example Payload:**
```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:test-fire-event-id",
  "type": "webhook",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "test_fire",
    "data": {}
  }
}
```

**When Triggered:**
- During webhook creation (URL verification)
- When updating a webhook's URL
- When manually testing with `peridio webhooks test-fire`

**Use Cases:**
- Webhook endpoint validation
- Testing signature verification logic
- Debugging webhook configuration

## Event Filtering

When configuring webhooks, you can subscribe to specific events using these identifiers:

- `device.authentication-failed`
- `device.checked-for-release`
- `device.claimed-release`
- `device.connected`
- `device.release-changed`
- `device.updated`
- `api_key.created`

**Note:** `webhook.test_fire` events are always sent regardless of enabled events during URL verification.

## Processing Guidelines

### Event Ordering

- Events are not guaranteed to arrive in chronological order
- Use the `inserted_at` timestamp to determine actual event sequence
- Implement idempotent processing using the event PRN for deduplication

### High-Frequency Events

Some events may occur frequently:

- `device.checked-for-release` - Can occur every few minutes per device
- `device.connected` - Depends on device connectivity patterns

Consider the volume when subscribing to these events.

### Error Handling

Always implement proper error handling:

```javascript
// Example error handling
app.post('/webhooks', (req, res) => {
  try {
    // Verify signature first
    if (!verifySignature(req)) {
      return res.status(401).send('Invalid signature');
    }
    
    // Process the event
    processWebhookEvent(req.body);
    
    // Always return 200 for successful processing
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return 200 to prevent retries for processing errors
    res.status(200).send('Processing error logged');
  }
});
```

## Payload Validation

Validate incoming webhooks:

1. **Verify signatures** - Always verify HMAC signatures before processing
2. **Check timestamps** - Reject stale events based on `inserted_at`
3. **Validate schema** - Ensure the payload structure matches expectations
4. **Handle unknown events** - Gracefully handle new event types you haven't implemented yet

## Next Steps

- **[Implement security](./security.md)** - Add signature verification to validate webhook authenticity
- **[Debug issues](./troubleshooting.md)** - Learn how to troubleshoot webhook problems
- **[Configuration guide](./configuration.md)** - Learn how to configure webhooks for specific events