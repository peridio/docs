---
title: Users
---

# Users

A user is the logical representation of a person within Peridio. Users can belong to multiple organizations, have different roles in each, and interact with the platform through the web console, CLI, or API.

## User Model

Each user in Peridio has the following attributes:

| Attribute | Description | Modifiable |
|-----------|-------------|------------|
| **Email** | Primary identifier and login credential | No |
| **Name** | Display name shown in the UI | Yes |
| **Avatar** | Profile picture URL | Yes |
| **Timezone** | User's preferred timezone for timestamps | Yes |
| **Language** | Preferred language for UI and communications | Yes |
| **Status** | Active, Inactive, or Suspended | Admin only |
| **Created At** | Timestamp of account creation | No |
| **Last Login** | Timestamp of most recent authentication | No |

## Authentication

Peridio supports multiple authentication methods:

### Email and Password
Traditional authentication with email and password combination.

### Single Sign-On (SSO)
Enterprise SSO integration via SAML 2.0 or OAuth 2.0/OIDC.

### Two-Factor Authentication (2FA)
Additional security layer using:
- Time-based One-Time Passwords (TOTP)
- SMS verification codes
- Hardware security keys (WebAuthn/FIDO2)

### API Keys
Programmatic access for automation and CI/CD pipelines.

## User Roles and Permissions

Users are assigned roles at the organization level. A user can have different roles in different organizations.

### Organization-Level Roles

| Role | Permissions |
|------|------------|
| **Owner** | Full control including organization deletion |
| **Admin** | All permissions except organization deletion |
| **Manager** | Create, read, update, delete resources; cannot manage users or billing |
| **Developer** | Create, read, update resources; limited delete permissions |
| **Operator** | Read and update resources; execute deployments |
| **Viewer** | Read-only access to all resources |

### Product-Level Permissions

Additional granular permissions can be set at the product level:

| Permission | Description |
|------------|-------------|
| **product:read** | View product details and configuration |
| **product:write** | Modify product settings |
| **device:read** | View devices within the product |
| **device:write** | Add, modify, or remove devices |
| **firmware:read** | View firmware and binaries |
| **firmware:write** | Upload and manage firmware |
| **deployment:read** | View deployments and status |
| **deployment:write** | Create and manage deployments |

## User Management

### Inviting Users

Organization admins can invite new users:

#### Web Console
Navigate to Organization Settings > Users > Invite User

#### CLI
```bash
peridio users invite \
  --organization $ORG_ID \
  --email user@example.com \
  --role developer
```

#### API
```bash
curl -X POST https://api.peridio.com/v2/organizations/$ORG_ID/invitations \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "role": "developer"
  }'
```

### Managing User Roles

#### Updating a User's Role
```bash
peridio users update-role \
  --organization $ORG_ID \
  --user $USER_ID \
  --role manager
```

#### Removing a User from Organization
```bash
peridio users remove \
  --organization $ORG_ID \
  --user $USER_ID
```

### User Status Management

#### Suspending a User
Temporarily disable access while preserving user data:
```bash
peridio users suspend \
  --user $USER_ID \
  --reason "Security policy violation"
```

#### Reactivating a User
```bash
peridio users reactivate \
  --user $USER_ID
```

## User Sessions

### Session Management
- Sessions expire after a configurable period of inactivity
- Users can have multiple active sessions across devices
- Sessions can be individually revoked

### Viewing Active Sessions
```bash
peridio users sessions list \
  --user $USER_ID
```

### Revoking Sessions
```bash
peridio users sessions revoke \
  --session $SESSION_ID
```

## API Keys

Users can create personal API keys for programmatic access:

### Creating an API Key
```bash
peridio api-keys create \
  --name "CI/CD Pipeline" \
  --expires-in 90d \
  --scopes read,write
```

### API Key Best Practices
1. **Rotation**: Regularly rotate API keys (recommended: every 90 days)
2. **Scoping**: Use minimal required permissions
3. **Storage**: Never commit API keys to version control
4. **Monitoring**: Track API key usage and revoke unused keys
5. **Naming**: Use descriptive names to identify key purpose

## User Activity Audit

All user actions are logged for audit purposes:

### Audited Activities
- Login attempts (successful and failed)
- Resource creation, modification, and deletion
- Permission changes
- API key creation and usage
- Configuration changes

### Accessing Audit Logs
```bash
peridio audit-logs list \
  --user $USER_ID \
  --from 2024-01-01 \
  --to 2024-01-31
```

## User Preferences

Users can customize their experience:

### Notification Preferences
- Email notifications for deployments
- SMS alerts for critical events
- In-app notifications
- Webhook integrations

### UI Preferences
- Dashboard layout
- Default views
- Data display formats
- Color themes

## Security Best Practices

1. **Enforce 2FA**: Require two-factor authentication for all users
2. **Regular Access Reviews**: Audit user permissions quarterly
3. **Principle of Least Privilege**: Grant minimal required permissions
4. **Password Policies**: Enforce strong password requirements
5. **Session Management**: Configure appropriate session timeouts
6. **IP Restrictions**: Limit access to known IP ranges when possible
7. **Activity Monitoring**: Regular review of audit logs

## Troubleshooting

### Common Issues

#### User Cannot Access Resources
1. Verify user's role in the organization
2. Check product-level permissions
3. Confirm user account is active
4. Review any IP restrictions

#### Password Reset Issues
1. Check spam folder for reset emails
2. Verify email address is correct
3. Ensure account is not suspended
4. Contact support if issues persist

#### SSO Login Problems
1. Verify SSO configuration with identity provider
2. Check user exists in both systems
3. Confirm attribute mappings are correct
4. Review SSO audit logs

## API Reference

For detailed API documentation, see the [Users API Reference](/admin-api#users).