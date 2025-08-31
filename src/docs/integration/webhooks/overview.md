# Overview

Webhooks provide a powerful way to receive real-time notifications about events in your Peridio account. Instead of continuously polling the API for updates, webhooks allow Peridio to push event data directly to your application as events occur.

## What are Webhooks?

Webhooks are HTTP callbacks that Peridio sends to your specified endpoint URL when certain events occur in your account. They enable you to:

- **React to events in real-time** - Get immediate notifications when devices connect, firmware updates complete, or other important events occur
- **Integrate with external systems** - Automatically sync data with your CRM, monitoring tools, or custom applications
- **Automate workflows** - Trigger automated processes based on device and firmware lifecycle events
- **Build reactive applications** - Create responsive user interfaces that update immediately when events occur

## How Webhooks Work

1. **Configure a webhook** - You specify an HTTPS endpoint URL and select which events you want to receive
2. **Peridio validates the endpoint** - Your endpoint must respond with a 200 status code to verify it can receive webhooks
3. **Events trigger notifications** - When subscribed events occur, Peridio sends HTTP POST requests to your endpoint
4. **Your application processes the data** - Parse the JSON payload and take appropriate action based on the event

## Key Features

### Security First

- **HTTPS required** - All webhook requests are sent over encrypted connections
- **HMAC-SHA256 signatures** - Every request is cryptographically signed to verify authenticity
- **Replay protection** - Timestamps prevent old requests from being replayed
- **Secret rolling** - Webhook secrets can be rotated with configurable transition periods

### Reliability

- **Automatic retries** - Failed deliveries are automatically retried for up to 3 days with exponential backoff
- **Event filtering** - Choose exactly which events you want to receive to reduce noise
- **Deduplication support** - Each event includes a unique PRN for reliable deduplication

### Developer Experience

- **JSON payloads** - All webhook data is sent as structured JSON
- **Test functionality** - Test your endpoint with sample events before going live
- **Comprehensive documentation** - Detailed payload schemas and examples for all event types

## Common Use Cases

### Device Management

- **Connection monitoring** - Track when devices come online or go offline
- **Firmware update tracking** - Monitor the progress of OTA updates across your fleet
- **Authentication alerts** - Get notified of failed device authentication attempts

### Integration Workflows

- **CRM synchronization** - Automatically update customer records when device status changes
- **Monitoring integration** - Send device events to your monitoring and alerting systems
- **Data pipeline triggers** - Initiate data processing workflows when devices report new data

### Business Intelligence

- **Analytics ingestion** - Stream device events into your data warehouse or analytics platform
- **Real-time dashboards** - Power live dashboards with instant event updates
- **Compliance reporting** - Automatically generate compliance reports from device activities

## Getting Started

Ready to start using webhooks? Here's what to do next:

1. **[Set up your first webhook](./configuration.md)** - Learn how to configure and test webhooks
2. **[Understand event types](./events-and-payloads.md)** - Explore available events and their payload structures
3. **[Implement security](./security.md)** - Add proper signature verification and security measures
4. **[Debug issues](./troubleshooting.md)** - Learn how to troubleshoot common problems

## Event Categories

Peridio webhooks support several categories of events:

- **Device Events** - Connection status, authentication, and firmware update events
- **API Key Events** - API key creation and management events
- **Webhook Events** - Test events for webhook validation

See the [Events and Payloads](./events-and-payloads.md) page for complete details on all available events.

## Requirements

To receive webhooks, your endpoint must:

- Use HTTPS (HTTP is not supported)
- Respond with a 200 HTTP status code within a reasonable time
- Be accessible from the internet
- Properly verify webhook signatures for security

## Next Steps

- **[Configuration Guide](./configuration.md)** - Set up your first webhook
- **[Security Implementation](./security.md)** - Add signature verification
- **[Event Reference](./events-and-payloads.md)** - Understand all available events
