---
title: Creating Bundles
---

# Creating Bundles

This guide describes how to create bundles in Peridio, package binaries with metadata, and prepare them for distribution to your device fleet.

## Overview

Bundles are immutable packages that contain one or more binaries along with custom metadata. They serve as the fundamental unit of distribution in Peridio's firmware management system.

To learn more about bundles in general, see the [bundles reference](/dev-center/peridio-core/firmware-management/bundles).

## Prerequisites

Before creating bundles, ensure you have:

- [Peridio CLI](https://github.com/peridio/morel/releases) installed and configured
- Organization and product created
- One or more binaries uploaded to Peridio
- Appropriate permissions to create bundles

## Creating a Bundle

### Via CLI

The CLI provides the most straightforward way to create bundles:

#### Basic Bundle Creation

```bash
# Create bundle with binary PRNs
peridio bundles create \
  --organization-prn $ORGANIZATION_PRN \
  --binary-prns $BINARY_PRN_1,$BINARY_PRN_2 \
  --name "Production Release v2.0.0"
```

#### With Custom Metadata

```bash
# Create bundle with metadata
peridio bundles create \
  --organization-prn $ORGANIZATION_PRN \
  --binary-prns $BINARY_PRN \
  --name "Feature Release v2.1.0" \
  --metadata '{
    "version": "2.1.0",
    "release_notes": "Added Bluetooth support",
    "min_hardware_version": "3.0",
    "reboot_required": true
  }'
```

#### Using Artifact Versions

You can also create bundles using artifact version PRNs:

```bash
peridio bundles create \
  --organization-prn $ORGANIZATION_PRN \
  --artifact-version-prns $AV_PRN_1,$AV_PRN_2 \
  --name "Multi-component Bundle"
```

### Via API

Use the Peridio Admin API for programmatic bundle creation:

```bash
curl -X POST https://api.peridio.com/v2/organizations/$ORG_PRN/bundles \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "binaries": [
      {"prn": "prn:1:org:binaries:binary-123"},
      {"prn": "prn:1:org:binaries:binary-456"}
    ],
    "name": "API Created Bundle",
    "metadata": {
      "version": "2.0.0",
      "build_number": "1234"
    }
  }'
```

### Via Web Console

1. Navigate to the [Peridio Web Console](https://console.peridio.com)
2. Go to Firmware > Bundles
3. Click "Create Bundle"
4. Select binaries to include
5. Configure metadata (optional)
6. Review and create

## Bundle Composition Strategies

### Single Binary Bundle

For simple firmware updates with a single binary:

```bash
peridio bundles create \
  --organization-prn $ORG_PRN \
  --binary-prns $FIRMWARE_BINARY \
  --name "Firmware Update v1.5.0"
```

### Multi-Component Bundle

For complex updates with multiple components:

```bash
# Bundle with application, bootloader, and configuration
peridio bundles create \
  --organization-prn $ORG_PRN \
  --binary-prns $APP_BINARY,$BOOTLOADER_BINARY,$CONFIG_BINARY \
  --name "Complete System Update" \
  --metadata '{
    "components": {
      "application": "2.0.0",
      "bootloader": "1.2.0",
      "config": "1.0.3"
    }
  }'
```

### Delta Update Bundle

For incremental updates:

```bash
peridio bundles create \
  --organization-prn $ORG_PRN \
  --binary-prns $DELTA_BINARY \
  --name "Delta Update 2.0.0 -> 2.0.1" \
  --metadata '{
    "update_type": "delta",
    "from_version": "2.0.0",
    "to_version": "2.0.1",
    "size_reduction": "85%"
  }'
```

## Metadata Best Practices

### Essential Metadata Fields

Include these fields for better tracking and management:

```json
{
  "version": "2.1.0",
  "release_date": "2024-02-01",
  "release_notes": "Bug fixes and performance improvements",
  "build_info": {
    "commit": "abc123def",
    "branch": "main",
    "build_time": "2024-02-01T10:00:00Z",
    "ci_run": "https://ci.example.com/builds/1234"
  },
  "compatibility": {
    "min_hardware_version": "3.0",
    "min_software_version": "2.0.0",
    "max_software_version": null
  },
  "deployment": {
    "reboot_required": true,
    "installation_time_seconds": 300,
    "rollback_enabled": true
  }
}
```

### Metadata Inheritance

Understanding how metadata inherits through the system:

1. **Artifact Level**: Base metadata for all versions
2. **Artifact Version Level**: Version-specific overrides
3. **Binary Level**: Binary-specific metadata
4. **Bundle Level**: Final override at bundle creation

Example:

```bash
# Artifact has base metadata
# Binary adds specific metadata
# Bundle creation can override both

peridio bundles create \
  --organization-prn $ORG_PRN \
  --binary-prns $BINARY_WITH_METADATA \
  --metadata '{"priority": "high", "deployment_window": "maintenance"}'
```

## Validation and Testing

### Pre-Creation Checklist

Before creating a bundle:

1. ✅ Verify all binaries are uploaded and signed
2. ✅ Confirm binary compatibility
3. ✅ Validate metadata JSON syntax
4. ✅ Check binary sizes for bandwidth considerations
5. ✅ Review version numbering consistency

### Post-Creation Validation

After creating a bundle:

```bash
# Get bundle details
peridio bundles get \
  --bundle-prn $BUNDLE_PRN

# List bundle contents
peridio bundles list-binaries \
  --bundle-prn $BUNDLE_PRN

# Verify metadata
peridio bundles get-metadata \
  --bundle-prn $BUNDLE_PRN
```

## Advanced Scenarios

### Conditional Bundle Creation

Create bundles based on conditions:

```bash
#!/bin/bash
# Create bundle only if tests pass

if ./run_tests.sh; then
  BUNDLE_PRN=$(peridio bundles create \
    --organization-prn $ORG_PRN \
    --binary-prns $TESTED_BINARY \
    --name "Tested Release $(date +%Y%m%d)" \
    --output json | jq -r '.prn')

  echo "Bundle created: $BUNDLE_PRN"
else
  echo "Tests failed, bundle not created"
  exit 1
fi
```

### Automated Bundle Creation

Integrate with CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Create Peridio Bundle
  run: |
    BUNDLE_PRN=$(peridio bundles create \
      --organization-prn ${{ secrets.PERIDIO_ORG_PRN }} \
      --binary-prns ${{ env.BINARY_PRN }} \
      --name "Release ${{ github.ref_name }}" \
      --metadata '{
        "git_ref": "${{ github.ref }}",
        "git_sha": "${{ github.sha }}",
        "build_url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
      }' \
      --output json | jq -r '.prn')

    echo "BUNDLE_PRN=$BUNDLE_PRN" >> $GITHUB_ENV
```

### Batch Bundle Creation

Create multiple related bundles:

```python
# Python script for creating variant bundles
import subprocess
import json

variants = [
    {"region": "us", "features": ["feature_a", "feature_b"]},
    {"region": "eu", "features": ["feature_a", "feature_c"]},
    {"region": "asia", "features": ["feature_b", "feature_c"]}
]

for variant in variants:
    metadata = json.dumps({
        "region": variant["region"],
        "features": variant["features"],
        "version": "2.0.0"
    })

    result = subprocess.run([
        "peridio", "bundles", "create",
        "--organization-prn", org_prn,
        "--binary-prns", binary_prn,
        "--name", f"Release 2.0.0 - {variant['region'].upper()}",
        "--metadata", metadata
    ], capture_output=True, text=True)

    print(f"Created bundle for {variant['region']}: {result.stdout}")
```

## Common Issues and Solutions

### Issue: Bundle Creation Fails

**Symptom**: Error when creating bundle

**Common Causes**:

- Invalid binary PRNs
- Malformed metadata JSON
- Insufficient permissions
- Quota exceeded

**Solution**:

```bash
# Verify binary exists
peridio binaries get --binary-prn $BINARY_PRN

# Validate metadata JSON
echo $METADATA | jq .

# Check permissions
peridio organizations get-permissions
```

### Issue: Metadata Not Appearing

**Symptom**: Custom metadata missing or incorrect

**Common Causes**:

- Inheritance overriding metadata
- JSON formatting issues
- Size limits exceeded

**Solution**:

```bash
# Check metadata at each level
peridio artifacts get-metadata --artifact-prn $ARTIFACT_PRN
peridio binaries get-metadata --binary-prn $BINARY_PRN
peridio bundles get-metadata --bundle-prn $BUNDLE_PRN
```

### Issue: Wrong Binaries in Bundle

**Symptom**: Bundle contains unexpected binaries

**Common Causes**:

- Incorrect PRN specification
- Copy-paste errors
- Wrong binary versions

**Solution**:

```bash
# List bundle contents
peridio bundles list-binaries --bundle-prn $BUNDLE_PRN

# Verify each binary
for prn in $BINARY_PRNS; do
  peridio binaries get --binary-prn $prn
done
```

## Best Practices

### Naming Conventions

Use clear, consistent naming:

```bash
# Good naming examples
"firmware-v2.1.0-prod-20240201"
"hotfix-CVE-2024-001-v1.0.1"
"feature-bluetooth-beta-v3.0.0"

# Include environment, version, and date
NAME="firmware-${VERSION}-${ENV}-$(date +%Y%m%d)"
```

### Version Management

Maintain version consistency:

```bash
# Semantic versioning in metadata
--metadata '{
  "version": "2.1.0",
  "prev_version": "2.0.0",
  "next_version": "2.2.0"
}'
```

### Documentation

Always document bundle contents:

```bash
# Include comprehensive release notes
--metadata '{
  "release_notes": "## Changes\n- Fixed memory leak\n- Added new API\n- Improved performance",
  "known_issues": "Bluetooth may disconnect on first boot",
  "upgrade_instructions": "Device will reboot twice during installation"
}'
```

## Next Steps

- [Creating Releases](creating-releases) - Deploy your bundles to devices
- [Bundle Distribution](/dev-center/peridio-core/firmware-management/bundle-distribution) - Understand resolution

## Related Documentation

- [Bundles Reference](/dev-center/peridio-core/firmware-management/bundles)
- [Admin API - Bundles](/admin-api#bundles)
