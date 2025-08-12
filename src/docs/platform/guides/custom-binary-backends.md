# Using your own storage

This guide walks you through setting up custom binary backends for Peridio, allowing you to use your own storage infrastructure instead of Peridio's default storage.

## Overview

Custom binary backends let you store your binaries in your own cloud storage while still using Peridio's device management capabilities. This is useful for:

- **Compliance requirements** - Keep your binaries in specific regions or providers
- **Cost optimization** - Use your existing storage contracts
- **Performance** - Store binaries closer to your devices
- **Security** - Maintain full control over your binary storage

## Supported Backends

Currently, Peridio supports:

- **Amazon S3** - Direct storage in your S3 buckets
- **Amazon CloudFront** - CDN distribution with signed URLs for enhanced security and performance

## Setting Up Amazon S3 Backend

### Prerequisites

Before you begin, make sure you have:

- An AWS account with administrative access
- A Peridio organization set up
- Basic familiarity with AWS IAM and S3

### Step 1: Create Your S3 Bucket

1. Log into your AWS Console
2. Navigate to S3 and create a new bucket
3. Choose a unique bucket name (you'll need this later)
4. Select the AWS region where you want to store your binaries
5. Keep the default settings for now - we'll configure permissions next

### Step 2: Create an IAM Role for Peridio

Peridio needs permission to upload, download, and manage binaries in your bucket. Let's create a dedicated IAM role:

1. Go to AWS IAM console
2. Click "Roles" → "Create role"
3. Choose "AWS account" as the trusted entity type
4. Select the default "This account" option - we'll update with a custom policy later
5. Name your role something descriptive

### Step 3: Attach the Bucket Policy

Your IAM role needs specific permissions to work with your S3 bucket. Attach this policy to your role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::YOUR_BUCKET_NAME", "arn:aws:s3:::YOUR_BUCKET_NAME/*"]
    }
  ]
}
```

**Important**: Replace `YOUR_BUCKET_NAME` with your actual bucket name.

### Step 4: Register with Peridio

Contact Peridio support with the following information:

**Required Information:**

- **Bucket name** - The name of your S3 bucket
- **AWS region** - The region where your bucket is located
- **Role ARN** - The Amazon Resource Name of the IAM role you created
- **Role name** - A short name to identify the configuration in Peridio's system (max 10 characters - this doesn't need to match your IAM role name)

### Step 5: Update Your Trust Policy

Once Peridio creates the necessary infrastructure, you'll receive a trust policy to apply to your IAM role. It will look like this:

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

Apply this trust policy to your IAM role to complete the setup.

## Setting Up Amazon CloudFront (Optional)

CloudFront provides additional benefits like global distribution and signed URLs for enhanced security.

### When to Use CloudFront

Consider CloudFront if you need:

- **Global distribution** - Faster downloads for devices worldwide
- **Enhanced security** - Time-limited download links
- **Bandwidth optimization** - Reduce costs with edge caching

### Step 1: Create a CloudFront Distribution

1. In AWS Console, navigate to CloudFront
2. Create a new distribution
3. Set your S3 bucket as the origin
4. Configure caching behavior as needed for your use case

### Step 2: Set Up Signed URLs

For secure, time-limited downloads, you'll need to configure signed URLs:

1. **Create a public/private key pair** for signing
2. **Create a key group** in CloudFront using your public key
3. **Configure your distribution** to require signed URLs

### Step 3: Provide Information to Peridio

Send Peridio the following information:

**Required:**

- **Host** - Your CloudFront domain (e.g., `d1234567890.cloudfront.net`)
- **Private key** - The private key for signing URLs
- **Key pair ID** - The ID of your CloudFront key group

**Optional:**

- **TTL seconds** - How long download links remain valid (default is reasonable for most use cases)

## Important Considerations

### Timing and Activation

Setting up custom binary backends involves coordination between two systems:

1. **Configuration gap** - There's a brief period where Peridio knows about your backend but AWS hasn't updated trust policies yet. During this time, Peridio will continue using the default storage.
2. **Dual requirements** - Both upload and download configurations must be active before the system switches over to your custom backend

### Security Best Practices

- **Least privilege** - Only grant the minimum permissions needed
- **External ID** - The trust policy uses your organization ID as an external ID for additional security
- **Regular rotation** - Consider rotating your CloudFront signing keys periodically

## Getting Help

If you encounter issues:

1. **Check permissions** - Verify your IAM role has the correct policies
2. **Verify trust policy** - Ensure the trust policy matches exactly what Peridio provided
3. **Contact support** - Reach out to Peridio support with specific error messages

The Peridio team is here to help you get your custom binary backend running smoothly!
