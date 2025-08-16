---
title: Peridio Resource Names (PRNs)
---

# Peridio Resource Names (PRNs)

Peridio Resource Names (PRNs) uniquely identify Peridio resources. We require a PRN when you need to specify a resource unambiguously across all of Peridio, such as in authorization policies and API calls.

## Overview

PRNs provide a standardized way to reference any resource within the Peridio platform. They are:
- **Globally Unique**: No two resources share the same PRN
- **Immutable**: PRNs never change once assigned
- **Hierarchical**: Reflect the resource ownership structure
- **Self-Describing**: Include resource type and organization context

## PRN Format

The following are the general formats for PRNs:

```text
prn:prn-version:organization-id
prn:prn-version:organization-id:resource-type:resource-id
```

### Components

| Component | Description | Example |
|-----------|-------------|---------|
| **prn** | Fixed prefix identifying this as a PRN | `prn` |
| **prn-version** | Version of the PRN format (currently 1) | `1` |
| **organization-id** | UUID of the owning organization | `eec5cabf-c4a8-46ab-ae5a-70ca847d558d` |
| **resource-type** | Type of resource (plural form) | `artifacts`, `devices`, `products` |
| **resource-id** | UUID of the specific resource | `ddfd22a7-d928-4dce-8de2-cd98bd0dd72a` |

### Special Cases

#### Organization PRN
Organizations have a special format to avoid redundancy:
```text
prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d
```

#### Artifact PRN
Standard resource format:
```text
prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:artifacts:ddfd22a7-d928-4dce-8de2-cd98bd0dd72a
```

## Resource Types

The following resource types are supported in PRNs:

| Resource Type | PRN Identifier | Example |
|---------------|----------------|---------|
| Organizations | (special case) | `prn:1:org-uuid` |
| Products | `products` | `prn:1:org-uuid:products:product-uuid` |
| Devices | `devices` | `prn:1:org-uuid:devices:device-uuid` |
| Cohorts | `cohorts` | `prn:1:org-uuid:cohorts:cohort-uuid` |
| Artifacts | `artifacts` | `prn:1:org-uuid:artifacts:artifact-uuid` |
| Artifact Versions | `artifact-versions` | `prn:1:org-uuid:artifact-versions:version-uuid` |
| Binaries | `binaries` | `prn:1:org-uuid:binaries:binary-uuid` |
| Binary Parts | `binary-parts` | `prn:1:org-uuid:binary-parts:part-uuid` |
| Binary Signatures | `binary-signatures` | `prn:1:org-uuid:binary-signatures:signature-uuid` |
| Bundles | `bundles` | `prn:1:org-uuid:bundles:bundle-uuid` |
| Releases | `releases` | `prn:1:org-uuid:releases:release-uuid` |
| Deployments | `deployments` | `prn:1:org-uuid:deployments:deployment-uuid` |
| Firmware | `firmware` | `prn:1:org-uuid:firmware:firmware-uuid` |
| Signing Keys | `signing-keys` | `prn:1:org-uuid:signing-keys:key-uuid` |
| CA Certificates | `ca-certificates` | `prn:1:org-uuid:ca-certificates:cert-uuid` |
| Device Certificates | `device-certificates` | `prn:1:org-uuid:device-certificates:cert-uuid` |
| Webhooks | `webhooks` | `prn:1:org-uuid:webhooks:webhook-uuid` |
| Tunnels | `tunnels` | `prn:1:org-uuid:tunnels:tunnel-uuid` |
| Users | `users` | `prn:1:org-uuid:users:user-uuid` |
| API Keys | `api-keys` | `prn:1:org-uuid:api-keys:key-uuid` |

## Using PRNs

### In API Calls

PRNs are used in API requests to specify exact resources:

```bash
# Get a specific device using its PRN
curl -X GET https://api.peridio.com/v2/resources \
  -H "Authorization: Bearer $API_KEY" \
  -d "prn=prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:devices:device-123"
```

### In Authorization Policies

PRNs are used in IAM policies to grant specific permissions:

```json
{
  "version": "1",
  "statement": [
    {
      "effect": "allow",
      "action": ["device:read", "device:update"],
      "resource": "prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:devices:*"
    }
  ]
}
```

### In Cross-References

PRNs enable precise references between resources:

```json
{
  "device_prn": "prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:devices:device-123",
  "firmware_prn": "prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:firmware:fw-456"
}
```

## Wildcards in PRNs

Wildcards can be used in authorization policies and some API operations:

### Examples

| Pattern | Matches |
|---------|---------|
| `prn:1:org-uuid:devices:*` | All devices in the organization |
| `prn:1:org-uuid:products:prod-123:devices:*` | All devices in a specific product |
| `prn:1:org-uuid:*:*` | All resources in the organization |
| `prn:1:*:devices:*` | All devices across all organizations (admin only) |

## Constructing PRNs

### From the CLI

The Peridio CLI can generate PRNs for resources:

```bash
# Get PRN for a device
peridio devices get-prn --device-id device-123

# Get PRN for current organization
peridio organizations get-prn
```

### Programmatically

Example in various languages:

#### JavaScript
```javascript
function constructPRN(orgId, resourceType, resourceId) {
  if (!resourceType || !resourceId) {
    // Organization PRN
    return `prn:1:${orgId}`;
  }
  return `prn:1:${orgId}:${resourceType}:${resourceId}`;
}
```

#### Python
```python
def construct_prn(org_id, resource_type=None, resource_id=None):
    if not resource_type or not resource_id:
        # Organization PRN
        return f"prn:1:{org_id}"
    return f"prn:1:{org_id}:{resource_type}:{resource_id}"
```

#### Go
```go
func ConstructPRN(orgID string, resourceType, resourceID *string) string {
    if resourceType == nil || resourceID == nil {
        // Organization PRN
        return fmt.Sprintf("prn:1:%s", orgID)
    }
    return fmt.Sprintf("prn:1:%s:%s:%s", orgID, *resourceType, *resourceID)
}
```

## Parsing PRNs

### Regular Expression

```regex
^prn:(\d+):([a-f0-9-]+)(?::([a-z-]+):([a-f0-9-]+))?$
```

### Example Parser

```javascript
function parsePRN(prn) {
  const regex = /^prn:(\d+):([a-f0-9-]+)(?::([a-z-]+):([a-f0-9-]+))?$/;
  const match = prn.match(regex);
  
  if (!match) {
    throw new Error('Invalid PRN format');
  }
  
  return {
    version: match[1],
    organizationId: match[2],
    resourceType: match[3] || 'organizations',
    resourceId: match[4] || match[2]
  };
}
```

## Best Practices

1. **Store PRNs**: Save PRNs rather than constructing them repeatedly
2. **Validate Format**: Always validate PRN format before use
3. **Use Constants**: Define resource type constants in your code
4. **Error Handling**: Handle invalid PRN errors gracefully
5. **Logging**: Include PRNs in log messages for traceability
6. **Documentation**: Document which PRNs your applications use

## Security Considerations

1. **PRNs are not secrets**: While unique, PRNs should not be treated as authentication tokens
2. **Access Control**: Always verify permissions before acting on a PRN
3. **Audit Logging**: Log all operations involving PRNs
4. **Input Validation**: Validate PRN format to prevent injection attacks
5. **Rate Limiting**: Implement rate limiting for PRN-based operations

## Common Use Cases

### Device Management
```text
# List all devices in a product
GET /devices?product_prn=prn:1:org-uuid:products:product-123
```

### Firmware Distribution
```text
# Deploy firmware to specific devices
POST /deployments
{
  "firmware_prn": "prn:1:org-uuid:firmware:fw-456",
  "target_devices": [
    "prn:1:org-uuid:devices:device-1",
    "prn:1:org-uuid:devices:device-2"
  ]
}
```

### Access Control
```text
# Grant read access to specific cohort
{
  "grant": "read",
  "resource": "prn:1:org-uuid:cohorts:cohort-789",
  "to": "user@example.com"
}
```

## Troubleshooting

### Invalid PRN Format
- Verify all components are present
- Check UUIDs are valid format
- Ensure resource type is plural and lowercase
- Confirm organization exists

### PRN Not Found
- Verify resource exists
- Check organization membership
- Confirm permissions to access resource
- Validate PRN construction

### Permission Denied
- Review user's role and permissions
- Check resource-level access controls
- Verify organization membership
- Audit policy statements

## API Reference

For detailed API documentation on using PRNs, see the [Resources API Reference](/admin-api#resources).