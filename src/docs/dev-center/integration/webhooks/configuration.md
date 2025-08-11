# Webhook Configuration

This guide covers how to set up, configure, and manage webhooks in your Peridio account using both the CLI and web interface.

## Prerequisites

Before setting up webhooks, ensure you have:

- An HTTPS endpoint that can receive POST requests
- A Peridio account with appropriate permissions
- The Peridio CLI installed and configured (for CLI usage)

## Creating a Webhook

### Using the Peridio CLI

The most straightforward way to create a webhook is using the Peridio CLI:

```bash
peridio webhooks create --url https://your-domain.com/webhooks
```

#### Adding Event Filtering

Specify which events you want to receive using the `--enabled-events` flag:

```bash
peridio webhooks create \
  --url https://your-domain.com/webhooks \
  --enabled-events device.connected device.release-changed
```

#### Adding a Description

Include a description to help identify the webhook's purpose:

```bash
peridio webhooks create \
  --url https://your-domain.com/webhooks \
  --description "Production webhook for device monitoring" \
  --enabled-events device.connected device.authentication-failed
```

#### Multiple Events

You can specify multiple events in several ways:

```bash
# Using multiple flags
peridio webhooks create \
  --url https://your-domain.com/webhooks \
  --enabled-events device.connected \
  --enabled-events device.release-changed \
  --enabled-events device.updated

# Using comma-separated values
peridio webhooks create \
  --url https://your-domain.com/webhooks \
  --enabled-events device.connected,device.release-changed,device.updated
```

### URL Verification

When creating a webhook, Peridio automatically performs URL verification:

1. **Test request sent** - Peridio sends a `webhook.test_fire` event to your endpoint
2. **Response required** - Your endpoint must return a 200 HTTP status code
3. **Timeout handling** - The verification request has a reasonable timeout period
4. **Failure handling** - If verification fails, the webhook creation will fail

**Example verification payload:**
```json
{
  "version": 1,
  "prn": "prn:1:organization-id:event:event-id",
  "type": "webhook",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "test_fire",
    "data": {}
  }
}
```

Your endpoint should respond with:
```http
HTTP/1.1 200 OK
Content-Type: application/json
```

## Managing Webhooks

### Listing Webhooks

View all webhooks in your account:

```bash
peridio webhooks list
```

### Getting Webhook Details

Retrieve information about a specific webhook:

```bash
peridio webhooks get --prn prn:1:your-org:webhook:webhook-id
```

### Updating Webhooks

Modify existing webhook configuration:

```bash
# Update URL
peridio webhooks update \
  --prn prn:1:your-org:webhook:webhook-id \
  --url https://new-domain.com/webhooks

# Update enabled events
peridio webhooks update \
  --prn prn:1:your-org:webhook:webhook-id \
  --enabled-events device.connected,device.release-changed

# Update webhook state
peridio webhooks update \
  --prn prn:1:your-org:webhook:webhook-id \
  --state disabled

# Update description
peridio webhooks update \
  --prn prn:1:your-org:webhook:webhook-id \
  --description "Updated webhook for monitoring"
```

### Webhook States

Webhooks can be in different states:

- **enabled** - Active and receiving events
- **disabled** - Inactive, not receiving events

Change the state using the `--state` parameter when updating.

## Secret Management

### Understanding Webhook Secrets

Each webhook has an associated secret used for HMAC-SHA256 signature generation:

- **Format** - 128-bit secrets encoded as uppercase hexadecimal
- **Security** - Used to verify webhook authenticity
- **Rotation** - Can be rolled for enhanced security

### Rolling Secrets

Update a webhook's secret for security purposes:

```bash
peridio webhooks roll-secret --prn prn:1:your-org:webhook:webhook-id
```

**Important considerations:**
- Rolling secrets may cause a brief transition period where both old and new secrets are valid
- Update your verification code to handle dual signatures during transitions
- Test your verification logic after rolling secrets

## Testing Webhooks

### Test Fire

Send a test event to verify your webhook endpoint:

```bash
peridio webhooks test-fire --prn prn:1:your-org:webhook:webhook-id
```

This sends a `webhook.test_fire` event to your endpoint, allowing you to:
- Verify your endpoint is reachable
- Test your signature verification logic
- Confirm your event processing works correctly

### Testing Your Endpoint

Before creating a webhook, ensure your endpoint:

1. **Accepts POST requests** on your webhook URL
2. **Returns 200 status** for successful processing
3. **Handles JSON payloads** correctly
4. **Verifies signatures** (recommended)
5. **Processes quickly** to avoid timeouts

**Example endpoint test:**
```bash
# Test your endpoint manually
curl -X POST https://your-domain.com/webhooks \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## Event Filtering

### Available Events

Configure which events trigger webhook deliveries:

- **device.authentication-failed** - Device authentication failures
- **device.checked-for-release** - Device checks for firmware updates
- **device.claimed-release** - Device claims a firmware release
- **device.connected** - Device connects to Peridio
- **device.release-changed** - Device firmware release changes
- **device.updated** - Device information updates
- **api_key.created** - API key creation
- **webhook.test-fire** - Test events (always enabled during verification)

### Best Practices

1. **Subscribe selectively** - Only enable events you actually need
2. **Start small** - Begin with a few key events and add more as needed
3. **Test thoroughly** - Use test-fire to validate each event type you enable
4. **Monitor volume** - Be aware of high-frequency events like `device.checked-for-release`

## Configuration Examples

### Basic Device Monitoring

```bash
peridio webhooks create \
  --url https://monitoring.company.com/peridio-webhooks \
  --description "Device monitoring webhook" \
  --enabled-events device.connected,device.authentication-failed
```

### Comprehensive Tracking

```bash
peridio webhooks create \
  --url https://api.company.com/peridio/events \
  --description "Full device lifecycle tracking" \
  --enabled-events device.connected,device.release-changed,device.updated,device.claimed-release
```

### Security-Focused

```bash
peridio webhooks create \
  --url https://security.company.com/device-alerts \
  --description "Security event monitoring" \
  --enabled-events device.authentication-failed,api_key.created
```

## Deleting Webhooks

Remove webhooks that are no longer needed:

```bash
peridio webhooks delete --prn prn:1:your-org:webhook:webhook-id
```

**Warning:** Deleting a webhook cannot be undone. Ensure you have backups of the configuration if needed.

## Next Steps

Once your webhook is configured:

1. **[Implement security](./security.md)** - Add signature verification to your endpoint
2. **[Understand events](./events-and-payloads.md)** - Learn about event types and payload structures  
3. **[Monitor and debug](./troubleshooting.md)** - Set up monitoring and handle common issues

## Common Configuration Issues

- **URL verification fails** - Ensure your endpoint returns 200 and is accessible
- **HTTPS required** - Webhooks only work with HTTPS URLs
- **Timeout issues** - Ensure your endpoint responds quickly during verification
- **Firewall blocking** - Verify Peridio can reach your endpoint from the internet