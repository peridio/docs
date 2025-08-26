---
title: Users
---

# Users

A user is the logical representation of a person within Peridio. Users can belong to multiple organizations and interact with the platform through the web console, CLI, or API.

## User Identification

Users in Peridio are identified by their email address, which serves as their primary login credential. Each user has:

- **Email**: Unique identifier used for authentication
- **Username**: Display name shown in the platform
- **Organization Memberships**: Users can belong to multiple organizations

## Authentication

Peridio supports authentication via:

- **Email and Password**: Traditional login method
- **API Keys**: For programmatic access and automation

## User Access Control

Users are granted access to organizations and resources through a granular permission system. User creation and access management are handled via the [Peridio Console](https://console.peridio.com/).

## User Identity

You can check your current user identity using the CLI:

```bash
peridio users me
```

This returns information about the currently authenticated user.

## API Keys

API keys provide programmatic access to the Peridio platform. API keys are managed via the [Peridio Console](https://console.peridio.com/).

### API Key Best Practices

1. **Rotation**: Regularly rotate API keys
2. **Storage**: Never commit API keys to version control
3. **Monitoring**: Track API key usage
4. **Naming**: Use descriptive names to identify key purpose

## Security Best Practices

1. **Strong Passwords**: Use strong, unique passwords for your account
2. **API Key Security**: Keep API keys secure and rotate them regularly
3. **Access Reviews**: Regularly review your organization access
4. **Secure Storage**: Never commit credentials to version control

## Support

For user account issues, access problems, or permission changes, contact [Peridio support](mailto:support@peridio.com).
