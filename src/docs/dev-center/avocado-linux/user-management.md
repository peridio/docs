---
title: User Management
description: Configure and manage users and groups in Avocado OS system extensions
---

:::caution Under Development
This documentation is currently under active development. Content and procedures may change as we refine the Avocado OS platform.
:::

Avocado OS supports comprehensive user and group management in extensions using a flexible TOML configuration syntax. The user management system allows you to define users and groups within your system extensions (sysext) and configuration extensions (confext), providing fine-grained control over user accounts, passwords, permissions, and group memberships.

The user management system automatically handles the creation and configuration of users and groups during the extension build process. It seamlessly integrates with the underlying Linux user management infrastructure while providing a declarative configuration approach that ensures consistency across deployments. Users and groups defined in extensions are properly isolated and managed as part of the layered system architecture.

**User Management Features:**
- Declarative user and group configuration in TOML format
- Support for both simple inline and complex table syntax
- Full password aging and shadow file configuration
- System user and service account management
- Automatic UID/GID assignment with override capabilities

**Security and Compliance:**
- Build-time password validation and security warnings
- Proper file permissions automatically applied
- Support for password policies and account expiration
- No-login accounts for service users

## Configuration Approaches

You can use two approaches depending on the complexity of your user and group definitions:

### Simple Users/Groups: Inline Syntax

For users or groups with minimal configuration, use inline table syntax:

```toml
[ext.my-extension.users]
root = { password = "" }
guest = { password = "*" }

[ext.my-extension.groups]
users = { gid = 1000 }
staff = { gid = 20 }
```

### Complex Users/Groups: Table Syntax

For users or groups with many attributes, use separate table sections:

```toml
[ext.my-extension.users]
# Simple users still use inline syntax
root = { password = "" }

# Complex users use table syntax for better readability
[ext.my-extension.users.alice]
password = "$6$salt$hash"
uid = 1001
gid = 1001
gecos = "Alice Smith,Engineering,Room 123,555-1234,555-5678"
home = "/home/alice"
shell = "/bin/zsh"
groups = ["users", "developers", "sudo"]

[ext.my-extension.users.nginx]
password = "*"          # No login allowed
uid = 33
gid = 33
gecos = "nginx web server"
home = "/var/www"
shell = "/usr/sbin/nologin"
system = true           # Mark as system user
```

## User Attributes

All user attributes are optional with reasonable defaults:

### Core Attributes
- `password`: Password hash, `""` for no password, `"*"` for no login (default: `"*"`)
- `uid`: User ID (default: auto-increment from 1000)
- `gid`: Primary group ID (default: same as UID)
- `gecos`: Full name and contact info (default: username)
- `home`: Home directory (default: `/home/{username}`)
- `shell`: Login shell (default: `/bin/sh`)
- `groups`: Additional group memberships (default: user's own group)
- `system`: Mark as system user (default: false)

### Password Aging (Shadow File)
- `last_change`: Days since epoch when password was last changed (default: 19000)
- `min_days`: Minimum days between password changes (default: 0)
- `max_days`: Maximum days before password expires (default: 99999)
- `warn_days`: Days before expiration to warn user (default: 7)
- `inactive_days`: Days after expiration before account is disabled (default: empty)
- `expire_date`: Days since epoch when account expires (default: empty)
- `disabled`: Mark account as disabled (default: false)

## Group Attributes

All group attributes are optional with reasonable defaults:

### Core Attributes
- `gid`: Group ID (default: auto-increment from 1000)
- `members`: List of usernames to add to group (default: empty)
- `system`: Mark as system group (default: false)
- `password`: Group password for `newgrp` command (default: empty)
- `admins`: List of group administrators (default: empty)

## Complete Example

Here's a comprehensive example showing user and group management for a web application stack:

```toml
[ext.web-stack]
types = ["sysext", "confext"]

[ext.web-stack.users]
# Simple users use inline syntax
root = { password = "" }
guest = { password = "*" }

# Complex application user
[ext.web-stack.users.webapp]
password = "$6$salt$hash"
uid = 1001
gecos = "Web Application User"
home = "/opt/webapp"
shell = "/bin/bash"
groups = ["webapp", "users"]
# Password expires every 90 days
max_days = 90
warn_days = 7

# Database service user
[ext.web-stack.users.postgres]
password = "*"
uid = 26
gid = 26
gecos = "PostgreSQL Server"
home = "/var/lib/pgsql"
shell = "/usr/sbin/nologin"
system = true
groups = ["postgres"]

# Web server user
[ext.web-stack.users.nginx]
password = "*"
uid = 33
gid = 33
gecos = "nginx web server"
home = "/var/www"
shell = "/usr/sbin/nologin"
system = true

[ext.web-stack.groups]
# Simple groups use inline syntax
users = { gid = 1000 }

# Application group with members
[ext.web-stack.groups.webapp]
gid = 1001
members = ["webapp"]

# System service groups
[ext.web-stack.groups.postgres]
gid = 26
system = true

[ext.web-stack.groups.nginx]
gid = 33
system = true
```

## Security Considerations

The user management system includes several security features to ensure proper account management:

- **Password Warnings**: Empty passwords trigger build-time warnings to alert developers
- **Default Security**: Users without passwords default to `"*"` (no login allowed)
- **Proper Permissions**: Files automatically receive correct ownership and permissions
- **System Users**: Special handling for service accounts with appropriate restrictions
- **Password Aging**: Full support for account expiration and password policies

## Implementation Details

The system automatically handles user and group management during the extension build process:

1. Copies `/etc/passwd`, `/etc/shadow`, and `/etc/group` from the base rootfs
2. Creates any missing users and groups defined in the extension
3. Updates existing entries as needed to match the configuration
4. Sets proper file permissions (644 for passwd/group, 640 for shadow)
5. Correctly handles group membership assignments

## TOML Syntax Guidelines

When defining users and groups in your extension configuration:

- **Inline tables** must be on a single line: `user = { password = "hash", uid = 1001 }`
- **Separate tables** allow multiline formatting: `[ext.name.users.username]`
- **Mix both approaches** for optimal readability and maintainability
- **All fields are optional** with sensible defaults applied

## Next Steps

- [System Extensions →](./system-extensions) - Learn more about extension architecture
- [Security Implementation →](./security-implementation) - Explore security features in detail
- [Build & Provisioning →](./build-provisioning) - Configure user management in your builds