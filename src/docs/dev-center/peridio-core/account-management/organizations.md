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

Peridio supports granular permission-based access control for users within organizations. User management and access control configuration is handled through Peridio support. Contact [Peridio support](mailto:support@peridio.com) for details on:

- Adding users to your organization
- Configuring user permissions and access levels
- Managing user roles and responsibilities

## Creating Organizations

New organizations must be created through Peridio support. Please contact [Peridio support](mailto:support@peridio.com) to request a new organization for your account.

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

Organization ownership transfers must be handled through Peridio support. Contact support to initiate an ownership transfer.

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

## Support

For assistance with organization management, contact [Peridio support](mailto:support@peridio.com).