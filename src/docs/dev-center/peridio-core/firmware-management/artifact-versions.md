# Artifact Versions

Artifact versions represent specific iterations or releases of an artifact. They provide the versioning layer between artifact types and actual binary files.

## Understanding Versions

Each artifact version:
- Belongs to exactly one artifact
- Has a unique version identifier
- Can contain multiple target-specific binaries
- Represents a specific release or iteration

## Version Naming Strategies

### Semantic Versioning (Recommended)
Follow [SemVer](https://semver.org/) principles:
- **Major**: Breaking changes (1.0.0 → 2.0.0)
- **Minor**: New features (1.0.0 → 1.1.0)  
- **Patch**: Bug fixes (1.0.0 → 1.0.1)
- **Pre-release**: Beta/RC versions (1.0.0-beta.1)

Examples:
```
1.0.0
1.1.0
1.1.1
2.0.0-alpha
2.0.0-beta.1
2.0.0-rc.1
2.0.0
```

### Date-Based Versioning
Use timestamps for continuous delivery:
```
2024.01.15
2024.01.15.1
2024.01.15-hotfix
20240115.143022
```

### Build-Based Versioning
Use CI/CD build numbers:
```
build-1234
jenkins-5678
ci-2024.01.15.1234
```

### Git-Based Versioning
Use git commits or tags:
```
git-abc123def
v1.2.3-10-gabc123d
main-abc123def
```

## Creating Artifact Versions

### Via Web Console
1. Navigate to your artifact
2. Click **Create Version**
3. Enter version identifier
4. Add optional description and metadata

### Via CLI
```bash
peridio artifact-versions create \
  --artifact-prn $ARTIFACT_PRN \
  --version "1.2.3" \
  --description "Q1 2024 Release"
```

### Via API
```bash
curl -X POST https://api.peridio.com/v1/artifact-versions \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "artifact_prn": "prn:1:artifact:main-firmware",
    "version": "1.2.3",
    "description": "Q1 2024 Release"
  }'
```

## Version Metadata

Enhance versions with metadata:

```json
{
  "release_notes_url": "https://docs.example.com/v1.2.3",
  "git_commit": "abc123def456",
  "build_number": "1234",
  "release_date": "2024-01-15",
  "stability": "stable",
  "min_hardware_version": "2.0"
}
```

## Version Lifecycle

### Development Phase
```
1.2.0-dev.1
1.2.0-dev.2
1.2.0-alpha.1
```

### Testing Phase
```
1.2.0-beta.1
1.2.0-beta.2
1.2.0-rc.1
```

### Release Phase
```
1.2.0
1.2.1 (hotfix)
1.2.2 (patch)
```

### End of Life
Mark in metadata:
```json
{
  "status": "deprecated",
  "eol_date": "2024-12-31",
  "upgrade_to": "2.0.0"
}
```

## Multi-Target Support

A single version can have binaries for multiple targets:

```
main-firmware/
  1.2.3/
    ├── x86_64-linux-gnu       # Intel/AMD 64-bit
    ├── aarch64-linux-gnu      # ARM 64-bit
    ├── arm-linux-gnueabihf    # ARM 32-bit with HW float
    └── riscv64-linux-gnu      # RISC-V 64-bit
```

### Target Selection
Devices automatically receive the appropriate binary based on their target architecture.

## Version Comparison

Peridio supports version comparison for updates:

### Natural Ordering
Versions are sorted naturally:
```
1.0.0 < 1.0.1 < 1.1.0 < 2.0.0
```

### Pre-release Precedence
Pre-releases have lower precedence:
```
1.0.0-alpha < 1.0.0-beta < 1.0.0
```

## Release Channels

Map versions to channels:

### Stable Channel
Production-ready versions:
```
1.0.0
1.1.0
2.0.0
```

### Beta Channel
Testing versions:
```
1.1.0-beta.1
2.0.0-rc.1
```

### Edge Channel
Development versions:
```
1.1.0-dev.123
main-latest
```

## Version Dependencies

Model dependencies through metadata:

```json
{
  "requires": {
    "bootloader": ">=2.0.0",
    "kernel": "5.10.*"
  },
  "conflicts": {
    "old-driver": "<3.0.0"
  }
}
```

## Rollback Strategies

### Previous Version Reference
```json
{
  "rollback_version": "1.1.5",
  "rollback_reason": "Critical bug in 1.2.0"
}
```

### Automatic Rollback
Configure in deployment policies:
- Roll back if >X% devices fail
- Roll back if critical metrics exceed thresholds

## Version Validation

### Pre-release Testing
1. Create beta version
2. Deploy to test cohort
3. Monitor metrics
4. Promote to stable

### Staged Rollout
```
1.2.0-canary → 1% of fleet
1.2.0-beta → 10% of fleet  
1.2.0-rc → 50% of fleet
1.2.0 → 100% of fleet
```

## CI/CD Integration

### Automated Version Creation

#### GitHub Actions
```yaml
- name: Create Version
  run: |
    VERSION=$(git describe --tags --always)
    peridio artifact-versions create \
      --artifact-prn ${{ secrets.ARTIFACT_PRN }} \
      --version "$VERSION"
```

#### Jenkins
```groovy
stage('Create Version') {
  steps {
    script {
      def version = sh(
        script: 'git describe --tags --always',
        returnStdout: true
      ).trim()
      sh """
        peridio artifact-versions create \
          --artifact-prn ${ARTIFACT_PRN} \
          --version ${version}
      """
    }
  }
}
```

## Version Management Best Practices

### Planning
1. Define versioning strategy upfront
2. Document version semantics
3. Plan for rollback scenarios
4. Consider hardware compatibility

### Implementation
1. Use consistent version formats
2. Add comprehensive metadata
3. Test before promoting
4. Maintain upgrade paths

### Maintenance
1. Archive old versions appropriately
2. Document breaking changes
3. Communicate deprecation schedules
4. Monitor version adoption

## Common Patterns

### Feature Flags
Use versions to enable features:
```json
{
  "features": {
    "new_ui": true,
    "advanced_telemetry": false
  }
}
```

### Regional Versions
Deploy region-specific versions:
```
1.2.3-us
1.2.3-eu
1.2.3-asia
```

### Hardware-Specific Versions
Target specific hardware revisions:
```
1.2.3-hw1
1.2.3-hw2
1.2.3-hw3
```

## Querying Versions

### List All Versions
```bash
peridio artifact-versions list \
  --artifact-prn $ARTIFACT_PRN
```

### Get Specific Version
```bash
peridio artifact-versions get \
  --prn $VERSION_PRN
```

### Filter by Metadata
```bash
peridio artifact-versions list \
  --metadata stability=stable
```

## Version Limits and Constraints

- Version identifiers must be unique within an artifact
- No limit on number of versions per artifact
- Version strings up to 255 characters
- Metadata limited to 16KB JSON

## Troubleshooting

### Version Conflicts
- Ensure unique version identifiers
- Check for typos in version strings
- Verify artifact PRN is correct

### Missing Versions
- Confirm artifact exists
- Check permissions
- Verify organization context

### Update Failures
- Validate version compatibility
- Check device constraints
- Review deployment policies

## Next Steps

- [Binaries](binaries.md) - Upload binary content for versions
- [Binary Signatures](binary-signatures.md) - Sign your binaries
- [Creating Artifact Versions Guide](/platform/guides/creating-artifact-versions) - Step-by-step tutorial
- [API Reference](/admin-api#artifact-versions) - Complete API documentation