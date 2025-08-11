# AWS CloudFront CDN Setup for Peridio

This guide covers setting up Amazon CloudFront as a content delivery network for your Peridio binary distribution, providing global edge caching, enhanced security with signed URLs, and improved download performance for your device fleet.

## Prerequisites

Before setting up CloudFront, ensure you have:

- **AWS S3 Backend** already configured (see [AWS S3 Setup Guide](./aws-s3-setup.md))
- **CloudFront Service Access** in your AWS account
- **Key Management Understanding** for signed URL implementation
- **SSL Certificate** for custom domain names (optional)
- **DNS Management** access for custom domains (optional)

## Why Use CloudFront?

### Performance Benefits
- **Global Edge Locations** - 400+ edge locations worldwide
- **Reduced Latency** - Content served from nearest geographic location
- **Bandwidth Optimization** - Efficient compression and caching
- **Connection Optimization** - HTTP/2 and TCP optimization

### Security Features
- **Signed URLs** - Time-limited, authenticated download links
- **Origin Access Control** - Restrict direct S3 access
- **WAF Integration** - Web Application Firewall protection
- **DDoS Protection** - Built-in AWS Shield protection

### Cost Optimization
- **Reduced Origin Costs** - Fewer requests to S3 through caching
- **Regional Pricing** - Optimized pricing based on edge location
- **Data Transfer Savings** - Efficient content delivery

## Step 1: CloudFront Distribution Setup

### Basic Distribution Configuration

1. **Navigate to CloudFront Console**
   - Go to AWS Console → CloudFront
   - Click "Create distribution"

2. **Origin Configuration**
   ```
   Origin Domain: your-bucket-name.s3.region.amazonaws.com
   Origin Path: /firmware (optional - organize your binaries)
   Name: S3-peridio-binaries-origin
   Origin Access: Origin access control settings (recommended)
   ```

3. **Default Cache Behavior**
   ```
   Path Pattern: Default (*)
   Viewer Protocol Policy: Redirect HTTP to HTTPS
   Allowed HTTP Methods: GET, HEAD, OPTIONS
   Cache Policy: CachingOptimized (or create custom)
   Origin Request Policy: None (or CORS-S3Origin if needed)
   ```

4. **Distribution Settings**
   ```
   Price Class: Use All Edge Locations (or customize based on needs)
   WAF: Enable if security requirements dictate
   Alternate Domain Names: firmware-cdn.yourdomain.com (optional)
   SSL Certificate: Default CloudFront or custom ACM certificate
   Default Root Object: Leave blank for binary distribution
   ```

### Advanced Configuration Options

**Custom Cache Policies for Firmware:**
```json
{
    "Name": "PeridioFirmwareCaching",
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "MinTTL": 0,
    "ParametersInCacheKeyAndForwardedToOrigin": {
        "EnableAcceptEncodingGzip": true,
        "EnableAcceptEncodingBrotli": true,
        "QueryStringsConfig": {
            "QueryStringBehavior": "none"
        },
        "HeadersConfig": {
            "HeaderBehavior": "whitelist",
            "Headers": {
                "Quantity": 1,
                "Items": ["Authorization"]
            }
        }
    }
}
```

**Origin Request Policy for S3 Integration:**
```json
{
    "Name": "PeridioOriginRequest",
    "Comment": "Policy for Peridio firmware distribution",
    "CookiesConfig": {
        "CookieBehavior": "none"
    },
    "HeadersConfig": {
        "HeaderBehavior": "whitelist",
        "Headers": {
            "Quantity": 2,
            "Items": [
                "Origin",
                "Access-Control-Request-Method"
            ]
        }
    },
    "QueryStringsConfig": {
        "QueryStringBehavior": "none"
    }
}
```

## Step 2: Origin Access Control (OAC)

### Setting up Origin Access Control

Origin Access Control provides secure access to your S3 bucket through CloudFront:

1. **Create OAC**
   ```
   Name: peridio-firmware-oac
   Description: Origin access control for Peridio firmware distribution
   Origin Type: S3
   Signing Behavior: Sign requests (recommended)
   ```

2. **Update S3 Bucket Policy**
   
   Add this policy to your S3 bucket to allow CloudFront access:
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "AllowCloudFrontServicePrincipal",
               "Effect": "Allow",
               "Principal": {
                   "Service": "cloudfront.amazonaws.com"
               },
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
               "Condition": {
                   "StringEquals": {
                       "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/DISTRIBUTION_ID"
                   }
               }
           }
       ]
   }
   ```

### Blocking Direct S3 Access

To ensure all access goes through CloudFront:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "BlockDirectAccess",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
            "Condition": {
                "StringNotEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/DISTRIBUTION_ID"
                }
            }
        }
    ]
}
```

## Step 3: Signed URLs Configuration

### Creating Key Pairs for Signed URLs

Signed URLs provide secure, time-limited access to firmware binaries:

1. **Generate RSA Key Pair**
   ```bash
   # Generate private key
   openssl genrsa -out private_key.pem 2048
   
   # Generate public key
   openssl rsa -pubout -in private_key.pem -out public_key.pem
   ```

2. **Create CloudFront Key Group**
   - Go to CloudFront → Key Groups
   - Click "Create key group"
   - Upload your public key
   - Note the Key Group ID for later use

### Key Group Configuration

```json
{
    "Name": "peridio-signing-keys",
    "Comment": "Key group for Peridio firmware signing",
    "Items": [
        {
            "PublicKey": "-----BEGIN PUBLIC KEY-----\n[YOUR_PUBLIC_KEY_CONTENT]\n-----END PUBLIC KEY-----",
            "Name": "peridio-key-2024",
            "Comment": "Primary signing key for 2024"
        }
    ]
}
```

### Distribution Behavior for Signed URLs

Update your CloudFront distribution to require signed URLs:

```json
{
    "PathPattern": "*.bin",
    "TargetOriginId": "S3-peridio-binaries-origin",
    "ViewerProtocolPolicy": "https-only",
    "TrustedKeyGroups": {
        "Enabled": true,
        "Quantity": 1,
        "Items": ["KEY_GROUP_ID"]
    },
    "CachePolicyId": "your-custom-cache-policy-id"
}
```

## Step 4: Custom Domain Configuration (Optional)

### Setting up Custom Domain

For branded firmware distribution (e.g., `firmware-cdn.yourcompany.com`):

1. **Request ACM Certificate**
   ```bash
   aws acm request-certificate \
       --domain-name firmware-cdn.yourcompany.com \
       --validation-method DNS \
       --region us-east-1
   ```

2. **DNS Validation**
   - Add CNAME records as provided by ACM
   - Wait for certificate validation

3. **Update CloudFront Distribution**
   ```
   Alternate Domain Names: firmware-cdn.yourcompany.com
   SSL Certificate: Custom SSL Certificate (your ACM cert)
   ```

4. **DNS Configuration**
   ```
   Type: CNAME
   Name: firmware-cdn
   Value: d1234567890.cloudfront.net
   TTL: 300
   ```

### SSL/TLS Configuration

**Recommended SSL Settings:**
```json
{
    "MinimumProtocolVersion": "TLSv1.2_2021",
    "SSLSupportMethod": "sni-only",
    "CertificateSource": "acm",
    "Certificate": "arn:aws:acm:us-east-1:account:certificate/cert-id"
}
```

## Step 5: Peridio Integration

### Information for Peridio Support

Provide the following information to Peridio support:

**Required CloudFront Information:**
```
CloudFront Domain: d1234567890.cloudfront.net
Custom Domain: firmware-cdn.yourcompany.com (if applicable)
Key Group ID: K1234567890ABCD
Private Key: [PRIVATE_KEY_CONTENT]
Distribution ID: E1234567890ABC
```

**Optional Configuration:**
```
TTL Seconds: 3600 (1 hour default)
Path Prefix: /firmware/
Custom Headers: None (or specify if needed)
Geographic Restrictions: None (or specify countries)
```

### Private Key Security

**Secure Private Key Handling:**
- Store private keys in AWS Secrets Manager or similar
- Use IAM roles to access keys programmatically
- Implement key rotation procedures
- Never commit keys to version control

**Example Secrets Manager Setup:**
```json
{
    "SecretId": "peridio/cloudfront/signing-key",
    "SecretString": "{\"private_key\":\"-----BEGIN RSA PRIVATE KEY-----\\n...\\n-----END RSA PRIVATE KEY-----\"}"
}
```

## Step 6: Performance Optimization

### Cache Configuration

**Optimal Cache Headers for Firmware:**
```
Cache-Control: public, max-age=86400
ETag: "firmware-version-hash"
Last-Modified: [ISO8601 timestamp]
Content-Type: application/octet-stream
```

**Custom Cache Behaviors:**
```json
{
    "PathPattern": "*.bin",
    "CachePolicyId": "custom-firmware-policy",
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "MinTTL": 0
}
```

### Compression Settings

Enable compression for metadata files:
```json
{
    "PathPattern": "*.json",
    "CompressConfig": {
        "Enabled": true
    },
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
}
```

## Step 7: Monitoring and Analytics

### CloudWatch Metrics

Key metrics to monitor:

**Distribution Metrics:**
- `Requests` - Total requests to your distribution
- `BytesDownloaded` - Data transfer volume
- `ErrorRate` - 4xx and 5xx error rates
- `OriginLatency` - Response time from S3

**Custom Dashboards:**
```json
{
    "widgets": [
        {
            "type": "metric",
            "properties": {
                "metrics": [
                    ["AWS/CloudFront", "Requests", "DistributionId", "DISTRIBUTION_ID"],
                    [".", "BytesDownloaded", ".", "."],
                    [".", "4xxErrorRate", ".", "."],
                    [".", "5xxErrorRate", ".", "."]
                ],
                "period": 300,
                "stat": "Sum",
                "region": "us-east-1",
                "title": "Peridio CloudFront Metrics"
            }
        }
    ]
}
```

### Real-time Logs

Enable real-time logs for detailed analytics:

1. **Create Kinesis Data Stream**
   ```bash
   aws kinesis create-stream \
       --stream-name peridio-cloudfront-logs \
       --shard-count 1
   ```

2. **Configure Real-time Logs**
   ```json
   {
       "Name": "peridio-realtime-logs",
       "EndPoints": [
           {
               "StreamType": "Kinesis",
               "KinesisStreamConfig": {
                   "RoleArn": "arn:aws:iam::account:role/CloudFrontRealtimeLogRole",
                   "StreamArn": "arn:aws:kinesis:region:account:stream/peridio-cloudfront-logs"
               }
           }
       ],
       "Fields": [
           "timestamp",
           "c-ip",
           "sc-status",
           "cs-method",
           "cs-uri-stem",
           "cs-bytes",
           "time-taken"
       ]
   }
   ```

## Step 8: Security Best Practices

### Access Control

**WAF Rules for Additional Security:**
```json
{
    "Name": "PeridioFirmwareWAF",
    "Rules": [
        {
            "Name": "BlockNonBinaryRequests",
            "Priority": 1,
            "Action": "BLOCK",
            "Statement": {
                "NotStatement": {
                    "Statement": {
                        "ByteMatchStatement": {
                            "FieldToMatch": {"UriPath": {}},
                            "SearchString": ".bin",
                            "TextTransformations": [{"Priority": 0, "Type": "LOWERCASE"}],
                            "PositionalConstraint": "ENDS_WITH"
                        }
                    }
                }
            }
        }
    ]
}
```

### Key Rotation Strategy

**Automated Key Rotation:**
```bash
#!/bin/bash
# Key rotation script for CloudFront signing keys

# Generate new key pair
openssl genrsa -out new_private_key.pem 2048
openssl rsa -pubout -in new_private_key.pem -out new_public_key.pem

# Update Key Group (AWS CLI)
aws cloudfront create-public-key \
    --public-key-config "$(cat new_key_config.json)"

# Update Peridio configuration
# (Contact Peridio support with new private key)

# Remove old key after transition period
aws cloudfront delete-public-key --id OLD_KEY_ID
```

## Troubleshooting

### Common Issues

**403 Forbidden Errors:**
- Check Origin Access Control configuration
- Verify S3 bucket policy allows CloudFront
- Ensure signed URL parameters are correct

**504 Gateway Timeout:**
- Check S3 bucket region matches origin configuration
- Verify S3 bucket permissions
- Check for S3 service issues

**Slow Performance:**
- Review cache hit ratio
- Check TTL settings
- Verify edge location coverage

### Debug Tools

**Testing Signed URLs:**
```bash
# Test signed URL generation
python3 -c "
import boto3
from botocore.signers import CloudFrontSigner
import datetime

# Your configuration
private_key = open('private_key.pem', 'rb').read()
key_id = 'YOUR_KEY_ID'
url = 'https://your-distribution.cloudfront.net/firmware.bin'
expire_date = datetime.datetime.utcnow() + datetime.timedelta(hours=1)

# Generate signed URL
cloudfront_signer = CloudFrontSigner(key_id, lambda message: private_key)
signed_url = cloudfront_signer.generate_presigned_url(url, date_less_than=expire_date)
print(signed_url)
"
```

**Cache Invalidation:**
```bash
# Invalidate specific files during testing
aws cloudfront create-invalidation \
    --distribution-id DISTRIBUTION_ID \
    --paths "/*"
```

## Advanced Features

### Lambda@Edge Integration

For advanced request/response manipulation:

```javascript
// Example Lambda@Edge function for custom headers
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    
    // Add custom headers for firmware requests
    if (request.uri.endsWith('.bin')) {
        request.headers['x-firmware-type'] = [{ key: 'X-Firmware-Type', value: 'production' }];
    }
    
    callback(null, request);
};
```

### Geographic Restrictions

**Country-based Access Control:**
```json
{
    "GeoRestriction": {
        "RestrictionType": "whitelist",
        "Locations": ["US", "CA", "GB", "DE", "JP"],
        "Quantity": 5
    }
}
```

## Next Steps

With CloudFront configured:

1. **Test Distribution** - Verify firmware downloads work globally
2. **Monitor Performance** - Set up alerts and dashboards
3. **Optimize Costs** - Review [cost optimization strategies](./cost-optimization.md)
4. **Plan Geography** - Implement [geographic distribution](./geographic-distribution.md)
5. **Scale Operations** - Set up automated monitoring and alerts

Your CloudFront CDN is now ready to deliver firmware updates with global performance and enterprise-grade security!