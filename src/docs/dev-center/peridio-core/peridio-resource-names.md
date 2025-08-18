---
title: Peridio Resource Names (PRNs)
---

# Peridio Resource Names (PRNs)

Peridio Resource Names (PRNs) uniquely identify Peridio resources. PRNs are used throughout the Peridio platform to reference specific resources in API calls and responses.

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
| **resource-type** | Type of resource (singular form) | `artifact`, `device`, `product` |
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
prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:artifact:ddfd22a7-d928-4dce-8de2-cd98bd0dd72a
```

## Resource Types

The following resource types are supported in PRNs:

| Resource Type | PRN Identifier | Example |
|---------------|----------------|---------|
| API Keys | `api_key` | `prn:1:org-uuid:api_key:key-uuid` |
| Artifacts | `artifact` | `prn:1:org-uuid:artifact:artifact-uuid` |
| Artifact Versions | `artifact_version` | `prn:1:org-uuid:artifact_version:version-uuid` |
| Binaries | `binary` | `prn:1:org-uuid:binary:binary-uuid` |
| Binary Parts | `binary_part` | `prn:1:org-uuid:binary_part:part-uuid` |
| Binary Signatures | `binary_signature` | `prn:1:org-uuid:binary_signature:signature-uuid` |
| Bundles | `bundle` | `prn:1:org-uuid:bundle:bundle-uuid` |
| CA Certificates | `ca_certificate` | `prn:1:org-uuid:ca_certificate:cert-uuid` |
| Cohorts | `cohort` | `prn:1:org-uuid:cohort:cohort-uuid` |
| Device Certificates | `device_certificate` | `prn:1:org-uuid:device_certificate:cert-uuid` |
| Devices | `device` | `prn:1:org-uuid:device:device-uuid` |
| Organizations | (special case) | `prn:1:org-uuid` |
| Products | `product` | `prn:1:org-uuid:product:product-uuid` |
| Releases | `release` | `prn:1:org-uuid:release:release-uuid` |
| Signing Keys | `signing_key` | `prn:1:org-uuid:signing_key:key-uuid` |
| Tunnels | `tunnel` | `prn:1:org-uuid:tunnel:tunnel-uuid` |
| Users | `user` | `prn:1:user:user-uuid` |
| Webhooks | `webhook` | `prn:1:org-uuid:webhook:webhook-uuid` |

## Using PRNs

### In API Calls

PRNs are used in API requests to specify exact resources:

```bash
# Get a specific device using its PRN
curl -X GET https://api.peridio.com/devices/prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:device:ddfd22a7-d928-4dce-8de2-cd98bd0dd72a \
  -H "Authorization: Bearer $API_KEY"
```

### In Cross-References

PRNs enable precise references between resources:

```json
{
  "device_prn": "prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:device:ddfd22a7-d928-4dce-8de2-cd98bd0dd72a",
  "bundle_prn": "prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:bundle:b3f1f699-3bc8-4c77-bda2-b974595d5e3f"
}
```

## Best Practices

PRNs are provided in API responses when creating or retrieving resources. You typically don't need to construct them manually.

All support requests will need PRNs to identify resources. PRNs are the only unique identifier we consider and will not accept object "names" or "identifiers".

## Security Considerations

1. **PRNs are not secrets**: While unique, PRNs should not be treated as authentication tokens
2. **Access Control**: Always verify permissions before acting on a PRN
3. **Audit Logging**: Log all operations involving PRNs
4. **Input Validation**: Validate PRN format to prevent injection attacks
5. **Rate Limiting**: Implement rate limiting for PRN-based operations

## Troubleshooting

### Invalid PRN Format
- Verify all components are present
- Check UUIDs are valid format
- Ensure resource type is singular and lowercase
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
