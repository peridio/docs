# AWS S3 Setup for Custom Binary Backends

This comprehensive guide walks you through setting up Amazon S3 as a custom binary backend for Peridio, enabling you to store and distribute firmware binaries using your own AWS infrastructure.

## Prerequisites

Before beginning the setup process, ensure you have:

- **AWS Account** with administrative access or sufficient IAM permissions
- **Peridio Organization** properly configured and active
- **AWS CLI** installed and configured (optional but recommended)
- **Basic AWS Knowledge** of S3, IAM, and resource management
- **Billing Setup** with appropriate cost monitoring in place

## Step 1: S3 Bucket Configuration

### Creating Your Storage Bucket

1. **Navigate to S3 Console**
   - Log into AWS Console
   - Go to S3 service dashboard
   - Click "Create bucket"

2. **Bucket Configuration**

   ```
   Bucket name: your-peridio-binaries-prod
   AWS Region: us-west-2 (choose based on your needs)
   Object Ownership: ACLs disabled (recommended)
   Block Public Access: Keep all settings enabled
   Bucket Versioning: Enable (recommended for backup)
   Default Encryption: Enable with SSE-S3
   ```

3. **Advanced Settings**
   - **Lifecycle Management**: Configure to transition old versions to cheaper storage
   - **Cross-Region Replication**: Enable for disaster recovery if needed
   - **Monitoring**: Enable CloudWatch metrics for operational visibility

### Bucket Naming Best Practices

Choose a bucket name that:

- Is globally unique across all AWS accounts
- Follows your organization's naming conventions
- Indicates the purpose (e.g., `companyname-peridio-firmware-prod`)
- Includes environment designation (`prod`, `staging`, `dev`)

Example naming patterns:

```
acme-peridio-firmware-prod
acme-peridio-binaries-us-west-2
acme-iot-updates-production
```

### Regional Considerations

Select your S3 region based on:

- **Primary device locations** - Choose regions closest to your device fleet
- **Compliance requirements** - Data residency and regulatory constraints
- **Cost optimization** - Regional pricing variations
- **Disaster recovery** - Secondary region availability

Popular region choices:

- `us-east-1` (N. Virginia) - Lowest cost, highest availability
- `us-west-2` (Oregon) - Good balance of cost and performance
- `eu-west-1` (Ireland) - European data residency
- `ap-southeast-1` (Singapore) - Asian Pacific coverage

## Step 2: IAM Role Creation

### Creating the Peridio Service Role

1. **Navigate to IAM Console**
   - Go to IAM → Roles → Create role

2. **Configure Trust Relationship**
   - Choose "AWS account" as trusted entity
   - Select "This account" initially (we'll update this later)
   - No conditions or external ID needed at this stage

3. **Role Naming**
   ```
   Role name: PeridioBinaryBackendRole
   Description: Allows Peridio to manage binaries in S3 bucket
   ```

### Creating the IAM Policy

Create a custom policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketAccess",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:ListBucketVersions"
      ],
      "Resource": ["arn:aws:s3:::YOUR_BUCKET_NAME", "arn:aws:s3:::YOUR_BUCKET_NAME/*"]
    },
    {
      "Sid": "S3BucketLocationAccess",
      "Effect": "Allow",
      "Action": ["s3:GetBucketLocation", "s3:GetBucketVersioning"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME"
    }
  ]
}
```

**Important Replacements:**

- Replace `YOUR_BUCKET_NAME` with your actual bucket name
- Attach this policy directly to your IAM role

### Enhanced Security Considerations

For production environments, consider additional restrictions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketAccessWithConditions",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      "Condition": {
        "StringEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        },
        "StringLike": {
          "s3:x-amz-server-side-encryption-aws-kms-key-id": "arn:aws:kms:region:account:key/key-id"
        }
      }
    }
  ]
}
```

This adds requirements for:

- Server-side encryption on all objects
- Specific KMS key usage for enhanced security

## Step 3: Peridio Registration

### Information Gathering

Before contacting Peridio support, collect:

**Required Information:**

```
Bucket Name: your-peridio-binaries-prod
AWS Region: us-west-2
Role ARN: arn:aws:iam::123456789012:role/PeridioBinaryBackendRole
Role Name: prod-binary-backend (max 10 characters)
Organization ID: Your Peridio organization identifier
```

**Optional Information:**

```
Secondary Region: us-east-1 (for disaster recovery)
Encryption Method: SSE-S3 or SSE-KMS
Lifecycle Policies: Enabled/Disabled
Versioning: Enabled/Disabled
Cross-Region Replication: Enabled/Disabled
```

### Contacting Support

Reach out to Peridio support with:

**Subject**: Custom Binary Backend Setup - AWS S3
**Message Template**:

```
Hello Peridio Support Team,

I would like to set up a custom binary backend using AWS S3 for my organization.

Organization Details:
- Organization ID: [YOUR_ORG_ID]
- Primary Contact: [YOUR_EMAIL]

AWS Configuration:
- S3 Bucket Name: [BUCKET_NAME]
- AWS Region: [REGION]
- IAM Role ARN: [ROLE_ARN]
- Preferred Role Name: [SHORT_NAME] (max 10 chars)

Additional Requirements:
- CDN Integration: Yes/No
- Multi-region: Yes/No
- Expected Traffic: [ESTIMATE]
- Go-live Timeline: [DATE]

Please provide the trust policy configuration and next steps.

Best regards,
[YOUR_NAME]
```

## Step 4: Trust Policy Configuration

### Applying the Trust Policy

Once Peridio provides the trust policy, apply it to your IAM role:

**Example Trust Policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::PERIDIO_AWS_ACCOUNT:role/binary_backend_ORG_ID_ROLE_NAME"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "YOUR_ORG_ID"
        }
      }
    }
  ]
}
```

### Verification Steps

1. **Policy Validation**
   - Verify the trust policy is correctly applied
   - Check that permission policies are attached
   - Validate bucket ARNs match exactly

2. **Connection Testing**
   - Peridio will test the connection during setup
   - Monitor CloudTrail logs for successful AssumeRole calls
   - Verify S3 access logs show expected activity

## Step 5: Testing and Validation

### Pre-Production Testing

Before going live, test your setup:

1. **Upload Test**

   ```bash
   # Using AWS CLI to verify basic access
   aws s3 cp test-file.bin s3://your-bucket-name/test/
   ```

2. **Permission Verification**

   ```bash
   # Test all required operations
   aws s3api list-objects-v2 --bucket your-bucket-name
   aws s3api get-object --bucket your-bucket-name --key test/test-file.bin /tmp/download
   ```

3. **Cross-Region Testing** (if applicable)
   - Verify replication is working
   - Test failover scenarios
   - Validate latency from different regions

### Monitoring Setup

Implement monitoring for:

**CloudWatch Metrics:**

- `NumberOfObjects` - Track storage growth
- `BucketSizeBytes` - Monitor storage costs
- `AllRequests` - Track usage patterns

**CloudTrail Logging:**

- API calls for audit trails
- AssumeRole events from Peridio
- Object access patterns

**Custom Alerts:**

```json
{
  "AlarmName": "PeridioS3-HighErrorRate",
  "MetricName": "4xxErrors",
  "Threshold": 10,
  "ComparisonOperator": "GreaterThanThreshold",
  "EvaluationPeriods": 2
}
```

## Advanced Configuration

### Lifecycle Management

Configure intelligent tiering for cost optimization:

```json
{
  "Rules": [
    {
      "ID": "PeridioFirmwareLifecycle",
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        },
        {
          "Days": 365,
          "StorageClass": "DEEP_ARCHIVE"
        }
      ]
    }
  ]
}
```

### Cross-Region Replication

For disaster recovery:

```json
{
  "Role": "arn:aws:iam::account:role/replication-role",
  "Rules": [
    {
      "ID": "PeridioReplication",
      "Status": "Enabled",
      "Prefix": "",
      "Destination": {
        "Bucket": "arn:aws:s3:::backup-bucket-name",
        "StorageClass": "STANDARD_IA"
      }
    }
  ]
}
```

## Troubleshooting

### Common Issues

**Access Denied Errors:**

- Verify IAM role ARN is correct
- Check trust policy external ID matches organization ID
- Ensure S3 bucket policy doesn't conflict

**Slow Upload/Download:**

- Check S3 Transfer Acceleration
- Verify regional proximity
- Consider multipart upload configuration

**Cost Overruns:**

- Review lifecycle policies
- Monitor request patterns
- Check for unnecessary GET operations

### Debug Commands

```bash
# Test assume role capability
aws sts assume-role --role-arn YOUR_ROLE_ARN --role-session-name test

# Verify bucket permissions
aws s3api get-bucket-policy --bucket your-bucket-name

# Check encryption status
aws s3api get-bucket-encryption --bucket your-bucket-name
```

## Security Best Practices

### Regular Maintenance

- **Quarterly access reviews** - Verify role usage and permissions
- **Annual key rotation** - Rotate any associated KMS keys
- **Security scanning** - Use AWS Config for compliance checking
- **Cost optimization** - Regular reviews of lifecycle policies

### Monitoring Security

- Set up GuardDuty for threat detection
- Enable VPC Flow Logs if using VPC endpoints
- Monitor unusual access patterns
- Implement automated responses to security events

## Next Steps

With S3 configured, consider:

1. **CDN Integration** - Set up [CloudFront for global distribution](./aws-cloudfront-setup.md)
2. **Geographic Strategy** - Plan your [multi-region approach](./geographic-distribution.md)
3. **Cost Optimization** - Implement [cost management strategies](./cost-optimization.md)
4. **Monitoring & Alerting** - Set up comprehensive operational monitoring

Your S3 backend is now ready for integration with Peridio's device management platform!
