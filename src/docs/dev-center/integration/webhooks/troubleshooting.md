# Webhook Troubleshooting

This guide helps you diagnose and resolve common webhook issues. Use this reference to quickly identify and fix problems with webhook delivery, configuration, and processing.

## Quick Diagnostic Steps

When webhooks aren't working as expected, start with these steps:

1. **Check webhook status** - Verify the webhook is enabled
2. **Test endpoint manually** - Confirm your endpoint is reachable
3. **Verify signatures** - Ensure signature verification is working
4. **Check logs** - Review both Peridio and your application logs
5. **Test with simple payload** - Use test-fire to isolate issues

## Common Issues and Solutions

### Webhook Creation Fails

#### Issue: URL Verification Timeout

**Symptoms:**

- Webhook creation fails with timeout error
- "URL verification failed" message

**Causes:**

- Endpoint not responding within timeout period
- Endpoint returning non-200 status code
- Network connectivity issues

**Solutions:**

```bash
# Test your endpoint manually
curl -X POST https://your-endpoint.com/webhooks \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}' \
  -w "Status: %{http_code}\nTime: %{time_total}s\n"
```

**Checklist:**

- [ ] Endpoint returns 200 HTTP status
- [ ] Response time is under 10 seconds
- [ ] Endpoint is accessible from the internet
- [ ] Firewall allows inbound HTTPS traffic
- [ ] SSL certificate is valid and not expired

#### Issue: Invalid URL Format

**Symptoms:**

- "Invalid URL" error during creation
- URL validation fails

**Solutions:**

- Ensure URL starts with `https://` (HTTP not supported)
- URL must be under 1028 characters
- Use valid URL format with proper encoding

```bash
# Good
peridio webhooks create --url https://api.company.com/peridio/webhooks

# Bad - HTTP not allowed
peridio webhooks create --url http://api.company.com/webhooks

# Bad - Invalid characters
peridio webhooks create --url https://api.company.com/webhooks with spaces
```

### Webhook Not Receiving Events

#### Issue: Events Not Being Delivered

**Symptoms:**

- Webhook configured but no events received
- Expected events not triggering webhooks

**Diagnostic Steps:**

1. **Check webhook status:**

```bash
peridio webhooks get --prn your-webhook-prn
```

2. **Verify enabled events:**

```bash
# List webhook configuration
peridio webhooks get --prn your-webhook-prn | grep enabled_events
```

3. **Test with manual event:**

```bash
peridio webhooks test-fire --prn your-webhook-prn
```

**Common Causes:**

- Webhook is disabled (`state: disabled`)
- Event type not in `enabled_events` list
- Endpoint returning non-200 status codes
- Signature verification failing

**Solutions:**

```bash
# Enable webhook if disabled
peridio webhooks update --prn your-webhook-prn --state enabled

# Add missing event types
peridio webhooks update \
  --prn your-webhook-prn \
  --enabled-events device.connected,device.release-changed
```

#### Issue: High-Frequency Events Missing

**Symptoms:**

- Some device events received, others missing
- Inconsistent event delivery

**Likely Cause:** Rate limiting or endpoint timeouts

**Solutions:**

- Optimize endpoint performance
- Return 200 immediately, process asynchronously
- Implement proper error handling

```javascript
// Good - immediate response
app.post('/webhooks', (req, res) => {
  // Return 200 immediately
  res.status(200).send('OK')

  // Process asynchronously
  setImmediate(() => {
    processWebhookEvent(req.body)
  })
})

// Bad - synchronous processing
app.post('/webhooks', (req, res) => {
  processWebhookEvent(req.body) // This might be slow
  res.status(200).send('OK')
})
```

### Signature Verification Issues

#### Issue: Signature Verification Always Fails

**Symptoms:**

- All webhook requests fail signature verification
- "Invalid signature" errors in logs

**Common Causes:**

1. **Incorrect secret format:**

```javascript
// Wrong - using secret as string
const secret = 'B284A51B143841695B2D7BF3B8554731'

// Right - converting hex string to bytes
const secret = Buffer.from('B284A51B143841695B2D7BF3B8554731', 'hex')
```

2. **Body modification:**

```javascript
// Wrong - body modified by middleware
app.use(express.json()) // This changes the raw body
app.post('/webhooks', (req, res) => {
  const body = JSON.stringify(req.body) // Body is already parsed
  // Signature verification will fail
})

// Right - preserve raw body
app.use('/webhooks', express.raw({ type: 'application/json' }))
app.post('/webhooks', (req, res) => {
  const body = req.body.toString() // Use raw body
  const parsedBody = JSON.parse(body)
  // Signature verification will succeed
})
```

3. **Incorrect header names:**

```javascript
// Wrong - incorrect header names
const signature = req.headers['peridio_signature'] // Underscore
const publishedAt = req.headers['Peridio-Published-At'] // Wrong case

// Right - correct header names
const signature = req.headers['peridio-signature'] // Hyphen, lowercase
const publishedAt = req.headers['peridio-published-at'] // Hyphen, lowercase
```

**Debugging Steps:**

```javascript
function debugSignatureVerification(req, webhookSecret) {
  const signature = req.headers['peridio-signature']
  const publishedAt = req.headers['peridio-published-at']
  const body = req.body.toString()

  console.log('Debug signature verification:')
  console.log('- Signature header:', signature)
  console.log('- Published-at header:', publishedAt)
  console.log('- Body length:', body.length)
  console.log('- Body (first 100 chars):', body.substring(0, 100))
  console.log('- Webhook secret:', webhookSecret)

  const toSign = publishedAt + body
  console.log('- To-sign payload:', toSign)

  const expectedSignature = crypto
    .createHmac('sha256', Buffer.from(webhookSecret, 'hex'))
    .update(toSign, 'utf8')
    .digest('hex')
    .toUpperCase()

  console.log('- Expected signature:', expectedSignature)
}
```

#### Issue: Signatures Work Intermittently

**Symptoms:**

- Some webhook requests verify successfully, others fail
- Inconsistent verification results

**Likely Cause:** Dual signatures during secret rotation

**Solution:** Handle multiple signatures properly:

```javascript
function verifySignature(receivedSignature, expectedSignature) {
  // Handle dual signatures (comma-separated)
  const signatures = receivedSignature.split(',')

  return signatures.some((sig) =>
    crypto.timingSafeEqual(Buffer.from(expectedSignature, 'hex'), Buffer.from(sig.trim(), 'hex'))
  )
}
```

### Replay Attack Protection Issues

#### Issue: Recent Requests Rejected as "Too Old"

**Symptoms:**

- Valid webhook requests rejected with "too old" errors
- Timestamp validation failing for recent events

**Common Causes:**

1. **Server time synchronization:**

```bash
# Check server time
date
timedatectl status

# Sync time with NTP
sudo ntpdate -s time.nist.gov
# or
sudo chrony sources
```

2. **Incorrect timezone handling:**

```javascript
// Wrong - not handling UTC properly
const publishedTime = new Date(publishedAt)

// Right - explicitly handle UTC
const publishedTime = new Date(publishedAt)
const currentTime = new Date()
console.log('Published:', publishedTime.toISOString())
console.log('Current:', currentTime.toISOString())
```

3. **Too strict time tolerance:**

```javascript
// Too strict - 30 seconds
if (timeDiff > 30 * 1000) {
  throw new Error('Request too old')
}

// Better - 5 minutes (recommended)
if (timeDiff > 5 * 60 * 1000) {
  throw new Error('Request too old')
}
```

### Performance and Reliability Issues

#### Issue: Webhook Timeouts

**Symptoms:**

- Webhook delivery failures
- Retries being triggered
- Performance degradation

**Optimization Strategies:**

```javascript
// Use async processing
const Queue = require('bull')
const webhookQueue = new Queue('webhook processing')

app.post('/webhooks', async (req, res) => {
  try {
    // Verify signature quickly
    verifyWebhookSignature(req, webhookSecret)

    // Return 200 immediately
    res.status(200).send('OK')

    // Queue for async processing
    await webhookQueue.add('process', req.body)
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
})
```

#### Issue: Memory Leaks with High Volume

**Symptoms:**

- Increasing memory usage over time
- Application becomes slow or crashes
- High webhook volume environments

**Solutions:**

```javascript
// Implement proper cleanup
const processedEvents = new Set()
const MAX_CACHE_SIZE = 10000

function processWebhook(eventData) {
  // Deduplicate using event PRN
  const eventPrn = eventData.prn

  if (processedEvents.has(eventPrn)) {
    return // Already processed
  }

  // Clean cache if it gets too large
  if (processedEvents.size >= MAX_CACHE_SIZE) {
    processedEvents.clear()
  }

  processedEvents.add(eventPrn)

  // Process the event
  handleEvent(eventData)
}
```

### Development and Testing Issues

#### Issue: Test Events Not Received

**Symptoms:**

- `peridio webhooks test-fire` succeeds but no request received
- Testing environment issues

**Debugging Steps:**

1. **Check endpoint accessibility:**

```bash
# Test from external network
curl -X POST https://your-endpoint.com/webhooks \
  -H "Content-Type: application/json" \
  -d '{"test": "manual"}' \
  -v
```

2. **Use webhook testing tools:**

```bash
# Use ngrok for local development
ngrok http 3000

# Create webhook with ngrok URL
peridio webhooks create --url https://abc123.ngrok.io/webhooks
```

3. **Check firewall and network settings:**

- Ensure port 443 is open for inbound traffic
- Verify DNS resolution works correctly
- Check if behind corporate firewall

#### Issue: Local Development Setup

**Symptoms:**

- Can't test webhooks locally
- Peridio can't reach local development server

**Solution - Using ngrok:**

```bash
# Install ngrok
# Download from https://ngrok.com/

# Expose local server
ngrok http 3000

# Use the HTTPS URL for webhook
peridio webhooks create --url https://abc123.ngrok.io/webhooks
```

**Solution - Using webhook testing services:**

```javascript
// Use services like webhook.site for testing
// 1. Go to https://webhook.site/
// 2. Copy the unique URL
// 3. Create webhook with that URL
// 4. View requests in real-time on the website

peridio webhooks create --url https://webhook.site/your-unique-id
```

## Monitoring and Alerting Setup

### Health Check Implementation

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    webhook_endpoint: '/webhooks',
  })
})
```

### Error Rate Monitoring

```javascript
const webhookStats = {
  received: 0,
  processed: 0,
  failed: 0,
}

app.post('/webhooks', (req, res) => {
  webhookStats.received++

  try {
    verifyWebhookSignature(req, webhookSecret)
    processWebhookEvent(req.body)

    webhookStats.processed++
    res.status(200).send('OK')
  } catch (error) {
    webhookStats.failed++
    console.error('Webhook processing failed:', error)
    res.status(401).send('Unauthorized')
  }
})

// Expose metrics endpoint
app.get('/metrics', (req, res) => {
  const errorRate = (webhookStats.failed / webhookStats.received) * 100

  res.json({
    ...webhookStats,
    error_rate_percent: errorRate.toFixed(2),
  })
})
```

## Debugging Tools and Techniques

### Request Logging

```javascript
const morgan = require('morgan')

// Custom morgan format for webhook debugging
app.use(
  '/webhooks',
  morgan(':method :url :status :res[content-length] - :response-time ms - :req[peridio-signature]')
)
```

### Signature Validation Testing

```javascript
// Test signature generation with known values
function testSignatureGeneration() {
  const testSecret = 'B284A51B143841695B2D7BF3B8554731'
  const testPublishedAt = '2000-01-01T00:00:00Z'
  const testBody = '{"version":1,"test":"data"}'
  const expectedSignature = 'EXPECTED_SIGNATURE_HERE'

  const toSign = testPublishedAt + testBody
  const signature = crypto
    .createHmac('sha256', Buffer.from(testSecret, 'hex'))
    .update(toSign, 'utf8')
    .digest('hex')
    .toUpperCase()

  console.log('Generated signature:', signature)
  console.log('Expected signature:', expectedSignature)
  console.log('Match:', signature === expectedSignature)
}
```

## Getting Help

If you're still experiencing issues after following this troubleshooting guide:

1. **Check Peridio status** - Visit status.peridio.com for service status
2. **Review documentation** - Consult the [webhook reference](/platform/reference/webhooks)
3. **Contact support** - Provide relevant logs and configuration details
4. **Community resources** - Check community forums and discussions

### Information to Provide When Seeking Help

When reporting webhook issues, include:

- Webhook PRN and configuration
- Error messages and logs
- Sample request/response data (without sensitive information)
- Timestamp when the issue occurred
- Steps to reproduce the problem
- Your implementation language and framework

## Prevention Best Practices

- **Implement comprehensive logging** for debugging
- **Set up monitoring and alerting** for webhook health
- **Test signature verification** with known test vectors
- **Use staging environments** to test changes
- **Keep webhook secrets secure** and rotate regularly
- **Monitor webhook performance** and optimize as needed
- **Document your webhook implementation** for team members

## Next Steps

- **[Review security implementation](./security.md)** - Ensure your webhook security is properly configured
- **[Understand event types](./events-and-payloads.md)** - Learn about all available webhook events
- **[Configuration reference](./configuration.md)** - Review webhook setup and management options
