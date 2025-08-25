# Artifacts

Artifacts define the type or category of binary content in your firmware management system. They serve as the top-level organizational structure for your binaries.

## What are Artifacts?

An artifact is a logical grouping that represents a specific type of deployable content. Think of artifacts as templates or blueprints that define what kind of binary you're managing, independent of its version or target architecture.

## Common Artifact Types

### Firmware Images

Complete system images or updates:

- **Linux Images**: Full root filesystem images
- **RTOS Binaries**: Real-time operating system images
- **Bootloaders**: U-Boot, GRUB, or custom bootloaders
- **Kernel Images**: Linux kernel binaries

### Application Software

User-space applications and services:

- **Application Binaries**: Compiled executables
- **Container Images**: Docker or OCI containers
- **Service Bundles**: Systemd services or init scripts

### Machine Learning Models

AI/ML components:

- **Neural Networks**: TensorFlow, PyTorch models
- **Computer Vision Models**: Object detection, classification
- **Edge AI Models**: Optimized models for embedded devices

### Configuration and Data

Non-executable content:

- **Configuration Files**: System or application settings
- **Certificates**: TLS certificates, keys
- **Media Assets**: Images, videos, audio files
- **Databases**: SQLite databases, data files

## Creating Artifacts

### Via Web Console

1. Navigate to **Firmware → Artifacts**
2. Click **Create Artifact**
3. Provide:
   - **Name**: Descriptive identifier (e.g., `main-firmware`)
   - **Description**: Purpose and contents
   - **Metadata**: Custom key-value pairs

### Via CLI

```bash
peridio artifacts create \
  --name "main-firmware" \
  --description "Primary system firmware image"
```

### Via API

```bash
curl -X POST https://api.peridio.com/v1/artifacts \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "name": "main-firmware",
    "description": "Primary system firmware image"
  }'
```

## Artifact Naming Conventions

Establish clear naming conventions for consistency:

### Recommended Patterns

- `{component}-{type}` (e.g., `app-firmware`, `ml-model`)
- `{platform}-{component}` (e.g., `rpi4-bootloader`, `jetson-firmware`)
- `{product}-{subsystem}` (e.g., `gateway-os`, `sensor-firmware`)

### Best Practices

- Use lowercase with hyphens
- Avoid version numbers in artifact names
- Keep names concise but descriptive
- Use consistent prefixes for related artifacts

## Artifact Metadata

Artifacts support custom metadata for additional context:

```json
{
  "platform": "raspberry-pi-4",
  "component": "operating-system",
  "team": "firmware-team",
  "criticality": "high"
}
```

Use metadata to:

- Track ownership and responsibility
- Categorize artifacts
- Enable advanced filtering
- Store deployment requirements

## Immutability and Consistency

Artifacts provide immutable references that remain constant throughout their lifecycle:

### Benefits

- **Consistent Identification**: PRN never changes
- **Reliable References**: Code can depend on artifact identity
- **Clear Boundaries**: Distinct separation between types
- **Audit Trail**: Complete history of all versions

### Example Use Case

```javascript
// Device update handler
function handleUpdate(manifest) {
  const firmware = manifest.binaries.find((b) => b.artifact_prn === 'prn:1:artifact:main-firmware')
  const mlModel = manifest.binaries.find((b) => b.artifact_prn === 'prn:1:artifact:ml-model')

  // Apply different update strategies based on artifact type
  if (firmware) applyFirmwareUpdate(firmware)
  if (mlModel) loadMLModel(mlModel)
}
```

## Artifact Relationships

### Hierarchical Structure

```
Artifact
├── Version 1.0.0
│   ├── Binary (x86_64)
│   ├── Binary (arm64)
│   └── Binary (armhf)
├── Version 1.1.0
│   ├── Binary (x86_64)
│   └── Binary (arm64)
└── Version 2.0.0
    └── Binary (universal)
```

### Dependencies

While artifacts themselves don't have dependencies, you can model relationships through:

- Metadata tags
- Naming conventions
- Bundle composition
- Documentation

## Managing Multiple Artifacts

### Organization Strategies

#### By Component

```
app-frontend
app-backend
app-database
```

#### By Platform

```
linux-firmware
rtos-firmware
bootloader
```

#### By Function

```
core-os
user-applications
system-utilities
```

### Artifact Limits

- No limit on number of artifacts
- Each artifact can have unlimited versions
- Names must be unique within organization

## Artifact Lifecycle

### Creation

Artifacts are created empty and serve as containers for versions.

### Active Use

Artifacts accumulate versions and binaries over time.

### Deprecation

Mark artifacts as deprecated in metadata when phasing out.

### Archival

Artifacts cannot be deleted but can be hidden from active use.

## Integration with CI/CD

### Automated Creation

```yaml
# GitHub Actions example
- name: Create Artifact
  run: |
    peridio artifacts create \
      --name "${{ env.COMPONENT }}-firmware" \
      --description "Auto-generated from ${{ github.sha }}"
```

### Version Management

```bash
# Jenkins pipeline
def artifactName = "${env.COMPONENT}-${env.TYPE}"
sh "peridio artifacts get --name ${artifactName} || \
    peridio artifacts create --name ${artifactName}"
```

## Querying Artifacts

### List All Artifacts

```bash
peridio artifacts list
```

### Filter by Metadata

```bash
peridio artifacts list --metadata platform=raspberry-pi-4
```

### Get Specific Artifact

```bash
peridio artifacts get --prn prn:1:artifact:main-firmware
```

## Best Practices

### Planning

1. Define artifact taxonomy before implementation
2. Document artifact purposes and contents
3. Establish naming conventions early
4. Plan for future expansion

### Implementation

1. Use descriptive names
2. Add comprehensive metadata
3. Group related binaries logically
4. Maintain consistency across projects

### Maintenance

1. Regular review of artifact usage
2. Archive obsolete artifacts
3. Document deprecation timelines
4. Monitor artifact proliferation

## Common Patterns

### Multi-Architecture Support

Create one artifact with multiple target-specific binaries:

```
main-firmware/
  1.0.0/
    x86_64-linux-gnu
    aarch64-linux-gnu
    arm-linux-gnueabihf
```

### Modular Updates

Separate artifacts for independent components:

```
os-kernel        # System kernel
os-rootfs        # Root filesystem
app-suite        # Application bundle
config-pack      # Configuration files
```

### Progressive Deployment

Use artifacts to manage rollout stages:

```
firmware-stable     # Production releases
firmware-beta       # Beta testing
firmware-edge       # Development builds
```

## Troubleshooting

### Duplicate Names

- Artifact names must be unique
- Use prefixes or suffixes to differentiate
- Consider organizational structure

### Missing Artifacts

- Verify artifact exists before creating versions
- Check permissions and access rights
- Ensure correct organization context

## Next Steps

- [Artifact Versions](artifact-versions.md) - Version your artifacts
- [Binaries](binaries.md) - Upload binary content
- [Creating Artifacts Guide](/platform/guides/creating-artifacts) - Step-by-step tutorial
- [API Reference](/admin-api#artifacts) - Complete API documentation
