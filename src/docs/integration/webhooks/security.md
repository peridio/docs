# Webhook Security

Security is paramount when implementing webhooks. This guide covers authentication, signature verification, and security best practices to ensure your webhook endpoints are secure and reliable.

## Security Overview

Peridio implements multiple security layers for webhook delivery:

1. **HTTPS Requirement** - All webhooks must use encrypted HTTPS connections
2. **HMAC-SHA256 Signatures** - Every request is cryptographically signed
3. **Replay Protection** - Timestamps prevent replay attacks
4. **Secret Rotation** - Webhook secrets can be rotated with transition periods

## HMAC-SHA256 Signature Verification

Every webhook request includes a cryptographic signature that verifies the request authenticity and integrity.

### Signature Headers

Webhook requests include these security headers:

- **peridio-signature** - HMAC-SHA256 signature(s)
- **peridio-published-at** - ISO 8601 timestamp when the event was published

### Signature Verification Process

1. **Extract headers** - Get the signature and timestamp from request headers
2. **Prepare payload** - Concatenate the timestamp and request body
3. **Calculate HMAC** - Compute HMAC-SHA256 using your webhook secret
4. **Compare signatures** - Use constant-time comparison to verify the signature
5. **Check timestamp** - Ensure the request isn't too old (replay protection)

### Implementation Examples

#### Node.js

```javascript
const crypto = require('crypto')

function verifyWebhookSignature(req, webhookSecret) {
  const signature = req.headers['peridio-signature']
  const publishedAt = req.headers['peridio-published-at']
  const body = JSON.stringify(req.body)

  if (!signature || !publishedAt) {
    throw new Error('Missing required headers')
  }

  // Check for replay attacks (5-minute tolerance)
  const publishedTime = new Date(publishedAt)
  const currentTime = new Date()
  const timeDiff = Math.abs(currentTime - publishedTime)

  if (timeDiff > 5 * 60 * 1000) {
    // 5 minutes in milliseconds
    throw new Error('Request too old')
  }

  // Prepare the payload to be signed
  const toSign = publishedAt + body

  // Calculate expected signature
  const expectedSignature = crypto
    .createHmac('sha256', Buffer.from(webhookSecret, 'hex'))
    .update(toSign, 'utf8')
    .digest('hex')
    .toUpperCase()

  // Handle dual signatures during secret rotation
  const signatures = signature.split(',')
  const isValid = signatures.some((sig) =>
    crypto.timingSafeEqual(Buffer.from(expectedSignature, 'hex'), Buffer.from(sig.trim(), 'hex'))
  )

  if (!isValid) {
    throw new Error('Invalid signature')
  }

  return true
}

// Usage in Express.js
app.post('/webhooks', (req, res) => {
  try {
    verifyWebhookSignature(req, process.env.WEBHOOK_SECRET)

    // Process the webhook
    processWebhookEvent(req.body)
    res.status(200).send('OK')
  } catch (error) {
    console.error('Webhook verification failed:', error.message)
    res.status(401).send('Unauthorized')
  }
})
```

#### Python

```python
import hashlib
import hmac
import time
from datetime import datetime, timezone

def verify_webhook_signature(headers, body, webhook_secret):
    signature = headers.get('peridio-signature')
    published_at = headers.get('peridio-published-at')

    if not signature or not published_at:
        raise ValueError('Missing required headers')

    # Check for replay attacks (5-minute tolerance)
    published_time = datetime.fromisoformat(published_at.replace('Z', '+00:00'))
    current_time = datetime.now(timezone.utc)
    time_diff = abs((current_time - published_time).total_seconds())

    if time_diff > 300:  # 5 minutes
        raise ValueError('Request too old')

    # Prepare the payload to be signed
    to_sign = published_at + body

    # Calculate expected signature
    secret_bytes = bytes.fromhex(webhook_secret)
    expected_signature = hmac.new(
        secret_bytes,
        to_sign.encode('utf-8'),
        hashlib.sha256
    ).hexdigest().upper()

    # Handle dual signatures during secret rotation
    signatures = [sig.strip() for sig in signature.split(',')]

    # Use constant-time comparison
    is_valid = any(
        hmac.compare_digest(expected_signature, sig)
        for sig in signatures
    )

    if not is_valid:
        raise ValueError('Invalid signature')

    return True

# Usage in Flask
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhooks', methods=['POST'])
def handle_webhook():
    try:
        body = request.get_data(as_text=True)
        verify_webhook_signature(request.headers, body, os.environ['WEBHOOK_SECRET'])

        # Process the webhook
        event_data = request.json
        process_webhook_event(event_data)

        return jsonify({'status': 'success'}), 200
    except ValueError as e:
        print(f'Webhook verification failed: {e}')
        return jsonify({'error': 'Unauthorized'}), 401
```

#### Go

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "crypto/subtle"
    "encoding/hex"
    "fmt"
    "net/http"
    "strings"
    "time"
)

func verifyWebhookSignature(r *http.Request, body []byte, webhookSecret string) error {
    signature := r.Header.Get("peridio-signature")
    publishedAt := r.Header.Get("peridio-published-at")

    if signature == "" || publishedAt == "" {
        return fmt.Errorf("missing required headers")
    }

    // Check for replay attacks (5-minute tolerance)
    publishedTime, err := time.Parse(time.RFC3339, publishedAt)
    if err != nil {
        return fmt.Errorf("invalid published-at format")
    }

    if time.Since(publishedTime) > 5*time.Minute {
        return fmt.Errorf("request too old")
    }

    // Prepare the payload to be signed
    toSign := publishedAt + string(body)

    // Decode webhook secret from hex
    secretBytes, err := hex.DecodeString(webhookSecret)
    if err != nil {
        return fmt.Errorf("invalid webhook secret format")
    }

    // Calculate expected signature
    h := hmac.New(sha256.New, secretBytes)
    h.Write([]byte(toSign))
    expectedSignature := strings.ToUpper(hex.EncodeToString(h.Sum(nil)))

    // Handle dual signatures during secret rotation
    signatures := strings.Split(signature, ",")

    for _, sig := range signatures {
        sig = strings.TrimSpace(sig)
        if subtle.ConstantTimeCompare([]byte(expectedSignature), []byte(sig)) == 1 {
            return nil
        }
    }

    return fmt.Errorf("invalid signature")
}

func handleWebhook(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Failed to read request body", http.StatusBadRequest)
        return
    }

    if err := verifyWebhookSignature(r, body, os.Getenv("WEBHOOK_SECRET")); err != nil {
        log.Printf("Webhook verification failed: %v", err)
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    // Process the webhook
    processWebhookEvent(body)

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("OK"))
}
```

### Test Verification Logic

Use this example to validate your signature verification implementation:

**Test Data:**

- Webhook secret: `B284A51B143841695B2D7BF3B8554731`
- Published at: `2000-01-01T00:00:00Z`
- Body:

```json
{
  "version": 1,
  "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:a727838c-0195-4ccf-8258-cebf4608db8e",
  "type": "device",
  "inserted_at": "2023-09-14T20:23:30Z",
  "data": {
    "type": "release_changed",
    "data": {
      "device": {
        "identifier": "SN1337",
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:a2edbb76-5f44-4202-860d-74a8c17d65aa"
      },
      "from_release": {
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:499b64fb-1420-4f58-8c73-e5497e1f531e",
        "version": "1.0.0"
      },
      "to_release": {
        "prn": "prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:f456986f-1a2f-4d73-8f70-96ff05a6bce7",
        "version": "2.0.0"
      }
    }
  }
}
```

**Expected signature:** `FC825FCAA2E4C2688F075144105B75C2943D8B88AC4B5FAB134F2676A63FB6EF`

## Secret Management

### Understanding Webhook Secrets

- **Format** - 128-bit secrets encoded as uppercase hexadecimal (32 characters)
- **Generation** - Automatically generated by Peridio when creating webhooks
- **Storage** - Store secrets securely using environment variables or secret management systems
- **Rotation** - Secrets can be rotated for enhanced security

### Secret Rotation

Roll webhook secrets periodically for better security:

```bash
peridio webhooks roll-secret --prn prn:1:your-org:webhook:webhook-id
```

**Dual Signature Support:**

During secret rotation, Peridio may send dual signatures:

```http
peridio-signature: OLD_SIGNATURE,NEW_SIGNATURE
```

Your verification code should accept either signature during the transition period.

### Best Practices for Secret Storage

1. **Environment Variables** - Store secrets in environment variables, not in code
2. **Secret Management Systems** - Use services like AWS Secrets Manager, HashiCorp Vault, etc.
3. **Least Privilege** - Only grant access to secrets to services that need them
4. **Regular Rotation** - Rotate secrets periodically (e.g., every 90 days)
5. **Audit Access** - Monitor and log secret access

## Replay Attack Protection

### Timestamp Validation

Always check the `peridio-published-at` header to prevent replay attacks:

```javascript
function checkTimestamp(publishedAt) {
  const publishedTime = new Date(publishedAt)
  const currentTime = new Date()
  const timeDiff = Math.abs(currentTime - publishedTime)

  // Reject requests older than 5 minutes
  if (timeDiff > 5 * 60 * 1000) {
    throw new Error('Request too old')
  }
}
```

**Recommended tolerance:** 5 minutes maximum

### Time Synchronization

Ensure your servers have accurate time:

- Use NTP (Network Time Protocol) for time synchronization
- Monitor time drift and correct it automatically
- Consider time zone differences when processing timestamps

## Timing Attack Protection

Use constant-time comparison to prevent timing attacks:

```javascript
// Good - constant-time comparison
const isValid = crypto.timingSafeEqual(
  Buffer.from(expectedSignature, 'hex'),
  Buffer.from(receivedSignature, 'hex')
)

// Bad - vulnerable to timing attacks
const isValid = expectedSignature === receivedSignature
```

## HTTPS Requirements

### Certificate Validation

- **Valid certificates** - Use certificates from trusted Certificate Authorities
- **Certificate chain** - Ensure the full certificate chain is properly configured
- **Expiration monitoring** - Monitor certificate expiration and renew before expiry

### TLS Configuration

- **TLS 1.2 minimum** - Use TLS 1.2 or higher
- **Strong cipher suites** - Configure secure cipher suites
- **Perfect Forward Secrecy** - Enable PFS for enhanced security

## Network Security

### Firewall Configuration

- **Whitelist approach** - Only allow necessary inbound connections
- **Rate limiting** - Implement rate limiting to prevent abuse
- **Geographic restrictions** - Consider geographic restrictions if applicable

### Load Balancer Considerations

If using a load balancer:

- **Preserve headers** - Ensure webhook headers are preserved
- **SSL termination** - Handle SSL termination properly
- **Health checks** - Configure health checks that don't interfere with webhooks

## Monitoring and Alerting

### Security Monitoring

Monitor for security events:

- **Signature verification failures** - Alert on repeated verification failures
- **Replay attacks** - Monitor for suspicious timestamp patterns
- **Unusual traffic** - Alert on unusual webhook traffic patterns

### Logging Best Practices

Log security-relevant events:

```javascript
app.post('/webhooks', (req, res) => {
  try {
    verifyWebhookSignature(req, webhookSecret)

    // Log successful verification
    logger.info('Webhook received', {
      event_type: req.body.data?.type,
      published_at: req.headers['peridio-published-at'],
      source_ip: req.ip,
    })

    processWebhookEvent(req.body)
    res.status(200).send('OK')
  } catch (error) {
    // Log security failures
    logger.warn('Webhook verification failed', {
      error: error.message,
      source_ip: req.ip,
      user_agent: req.headers['user-agent'],
    })

    res.status(401).send('Unauthorized')
  }
})
```

## Compliance Considerations

### Data Protection

- **PII handling** - Be aware of personally identifiable information in webhook payloads
- **Data retention** - Implement appropriate data retention policies
- **Encryption at rest** - Encrypt stored webhook data if persistence is required

### Audit Requirements

- **Access logging** - Log all webhook endpoint access
- **Change tracking** - Track webhook configuration changes
- **Security reviews** - Conduct regular security reviews of webhook implementations

## Security Checklist

Before deploying your webhook endpoint:

- [ ] HTTPS is enforced (HTTP redirects or returns errors)
- [ ] Signature verification is implemented and tested
- [ ] Constant-time comparison is used for signature verification
- [ ] Timestamp validation prevents replay attacks (5-minute tolerance)
- [ ] Webhook secrets are stored securely (not in code)
- [ ] Error handling doesn't leak sensitive information
- [ ] Logging captures security-relevant events
- [ ] Rate limiting is implemented
- [ ] Network access is properly restricted
- [ ] Certificate management is automated
- [ ] Security monitoring and alerting is configured

## Common Security Mistakes

Avoid these common security pitfalls:

1. **Skipping signature verification** - Never trust webhooks without verification
2. **Using simple string comparison** - Use constant-time comparison to prevent timing attacks
3. **Ignoring timestamps** - Always check for replay attacks
4. **Storing secrets in code** - Use environment variables or secret management
5. **Inadequate error handling** - Don't leak sensitive information in error responses
6. **Missing HTTPS** - Never use HTTP for webhook endpoints
7. **Weak TLS configuration** - Use strong TLS settings
8. **No monitoring** - Implement security monitoring and alerting

## Next Steps

- **[Test your implementation](./troubleshooting.md)** - Learn debugging techniques and common issues
- **[Configure webhooks](./configuration.md)** - Set up webhooks with proper security settings
- **[Understand events](./events-and-payloads.md)** - Learn about event types and structures
