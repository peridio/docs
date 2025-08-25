---
title: Account Management Overview
---

# Account Management

Account management in Peridio provides the foundation for organizing resources, controlling access, and managing users across your IoT infrastructure. This system enables secure multi-tenancy, role-based access control, and hierarchical resource organization.

## Core Components

### [Organizations](organizations)

The top-level container for all Peridio resources, providing isolation and management boundaries for your IoT deployments.

### [Users](users)

Individual accounts that interact with the Peridio platform, with configurable roles and permissions.

### [Peridio Resource Names (PRNs)](/peridio-core/peridio-resource-names)

Unique identifiers that unambiguously specify resources across the entire Peridio platform.

## Key Features

- **Multi-tenancy**: Isolate resources and users across different organizations
- **Role-based Access Control**: Define granular permissions for users within organizations
- **Resource Hierarchy**: Organize resources in a logical structure for easier management
- **Audit Trail**: Track all account-related activities and changes
- **API Integration**: Programmatic access to all account management features

## Getting Started

1. **Create an Organization**: Set up your top-level container for resources
2. **Invite Users**: Add team members with appropriate roles
3. **Configure Permissions**: Set up role-based access control
4. **Organize Resources**: Structure your products, devices, and deployments

## Best Practices

- Use descriptive organization names that reflect your business structure
- Implement least-privilege access principles when assigning user roles
- Regularly audit user access and remove inactive accounts
- Use PRNs for precise resource identification in automation scripts
- Document your organization's resource naming conventions
