---
title: Organizations
---

# Organizations

At the highest level, Peridio resources are created and managed within an organization. Organizations provide a secure, isolated environment for managing your IoT infrastructure, including devices, firmware, users, and deployments.

## Overview

An organization serves as:
- The top-level container for all Peridio resources
- A security boundary providing complete isolation from other organizations
- The billing entity for platform usage
- The scope for user access control and permissions

## User Access

Users within an organization with a role of `admin` are able to invite other users to that organization. As part of this process the inviter will choose a role level for the invited which will dictate their access level to the organization in general.

### Organization Roles

Organizations support multiple role levels to provide granular access control:

| Role | Description | Permissions |
|------|-------------|------------|
| **Admin** | Full organization access | Create, read, update, delete all resources; manage users and billing |
| **Manager** | Operational management | Create, read, update, delete most resources; cannot manage billing |
| **Developer** | Development access | Create, read, update resources; limited delete permissions |
| **Viewer** | Read-only access | Read all resources; no modification permissions |

## Creating Organizations

Organizations can be created through multiple methods:

### Web Console

Navigate to the [Peridio Web Console](https://console.peridio.com) and follow the organization creation wizard.

### CLI

```bash
peridio organizations create \
  --name "My Organization" \
  --display-name "My Company IoT Division"
```

### API

Use the Peridio Admin API to programmatically create organizations:

```bash
curl -X POST https://api.peridio.com/v2/organizations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-organization",
    "display_name": "My Company IoT Division"
  }'
```

## Organization Settings

### General Settings
- **Name**: Unique identifier for the organization (cannot be changed)
- **Display Name**: Human-readable name shown in the UI
- **Description**: Optional description of the organization's purpose
- **Contact Email**: Primary contact for organization-level communications

### Security Settings
- **Two-factor Authentication**: Enforce 2FA for all organization users
- **IP Allowlisting**: Restrict access to specific IP ranges
- **Session Timeout**: Configure maximum session duration
- **API Key Rotation**: Set policies for API key lifecycle

### Billing Settings
- **Billing Email**: Email for invoice delivery
- **Payment Method**: Credit card or invoicing options
- **Usage Alerts**: Configure thresholds for usage notifications

## Resource Limits

Organizations have configurable limits on resources:

| Resource | Default Limit | Maximum Limit |
|----------|--------------|---------------|
| Products | 100 | Unlimited* |
| Devices | 10,000 | Unlimited* |
| Users | 50 | 500 |
| API Keys | 100 | 1,000 |
| Webhooks | 25 | 100 |

*Contact sales for custom limits

## Organization Management

### Transferring Ownership

Organization ownership can be transferred to another admin user:

```bash
peridio organizations transfer-ownership \
  --organization $ORG_ID \
  --new-owner $USER_EMAIL
```

### Deleting Organizations

:::danger
Deleting an organization is irreversible and will permanently delete all associated resources including devices, firmware, and deployment history.
:::

Organizations can only be deleted when:
- All devices have been deleted or transferred
- All active deployments have been stopped
- All users except the owner have been removed
- There are no outstanding billing charges

## Best Practices

1. **Naming Conventions**: Use consistent, descriptive names for organizations that reflect your business structure
2. **Access Control**: Implement least-privilege principles when assigning roles
3. **Regular Audits**: Periodically review user access and remove inactive accounts
4. **Resource Organization**: Use a logical hierarchy for products and devices within the organization
5. **Backup Strategy**: Maintain backups of critical configuration and certificates
6. **Documentation**: Document your organization's structure and access policies

## Multi-Organization Strategies

For enterprises managing multiple organizations:

### Separate by Environment
- Development Organization
- Staging Organization  
- Production Organization

### Separate by Business Unit
- Consumer Products Organization
- Industrial Products Organization
- Partner Integration Organization

### Separate by Geography
- North America Organization
- Europe Organization
- Asia Pacific Organization

## API Reference

For detailed API documentation, see the [Organizations API Reference](/admin-api#organizations).