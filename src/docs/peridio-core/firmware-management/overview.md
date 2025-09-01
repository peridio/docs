# Firmware Management

[Binaries](/platform/reference/binaries) are the assets you wish to distribute to your devices. There is no restriction on the format of their content. [Artifacts](/platform/reference/artifacts) are used to define types for your binaries, and [artifact versions](/platform/reference/artifact-versions) allow you to track a binary of a certain type across distinct version. [Bundles](/platform/reference/bundles) allow you to create immutable, reusable ordered sets of Binaries.

[Releases](/platform/reference/releases) are what ties together devices and binaries. Within a cohort of devices you can create graphs of releases to define the update paths available to your devices. Each release is associated with a bundle, and that is what determines the content of the update when a device resolves that release.

<img src="/img/guides-overview.png" width="auto" />

Peridio's firmware management system provides a comprehensive framework for organizing, versioning, signing, and distributing binary content to your device fleet. This system is built on a hierarchical structure that ensures secure, reliable, and scalable firmware deployments.

## Core Concepts

The firmware management system is organized into three primary levels:

### 1. Artifacts

**Artifacts** define the type of binary content you're managing. Think of artifacts as categories or classifications for your binaries. Examples include:

- Firmware images
- Machine learning models
- Configuration files
- Media assets
- Application binaries

Each artifact serves as an immutable reference point that remains consistent regardless of versions or specific binaries created within it.

### 2. Artifact Versions

**Artifact Versions** represent specific iterations of an artifact. They follow semantic versioning or your preferred versioning scheme. For example:

- `1.0.0` - Initial release
- `1.1.0` - Feature update
- `1.1.1` - Bug fix
- `2.0.0-beta` - Pre-release version

Versions allow you to track the evolution of your artifacts over time while maintaining a clear upgrade path.

### 3. Binaries

**Binaries** are the actual content files distributed to devices. Each binary:

- Is associated with a specific artifact version
- Can target specific hardware architectures (e.g., `arm-linux-gnueabihf`)
- Contains the actual firmware image, model, or file data
- Must be signed before distribution

## Binary Lifecycle

Understanding the binary lifecycle is crucial for effective firmware management:

```
Uploadable → Hashable → Hashing → Signable → Signed
```

1. **Uploadable**: Initial state, ready to receive data
2. **Hashable**: Upload complete, ready for verification
3. **Hashing**: Peridio verifies integrity automatically
4. **Signable**: Verified and ready for code signing
5. **Signed**: Complete and ready for distribution

## Code Signing and Security

All binaries must be cryptographically signed before distribution. This ensures:

- **Authenticity**: Devices can verify the binary comes from a trusted source
- **Integrity**: Any tampering with the binary will be detected
- **Non-repudiation**: Provides an audit trail of who signed each binary

The signing process uses:

- RSA or Ed25519 signing keys
- SHA-256 hashing for integrity verification
- X.509 certificates for key management

## Distribution Workflow

Once binaries are signed, they're distributed through:

1. **Bundles**: Collections of related binaries that should be deployed together
2. **Releases**: Signed, versioned packages ready for deployment
3. **Release Channels**: Controlled distribution paths (stable, beta, edge)

## Target Architecture Support

Binaries support target-specific builds through target triplets:

- `x86_64-linux-gnu` - 64-bit Linux on Intel/AMD
- `aarch64-linux-gnu` - 64-bit ARM Linux
- `arm-linux-gnueabihf` - 32-bit ARM with hardware float
- Custom targets for specialized hardware

## Storage and CDN

Peridio handles binary storage with:

- Automatic replication across multiple regions
- CDN distribution for fast, reliable downloads
- Support for external storage backends (S3, Azure Blob)
- Multipart upload for large binaries

## Best Practices

### Version Management

- Use semantic versioning for clarity
- Tag pre-release versions appropriately
- Maintain version history documentation

### Binary Organization

- Group related binaries in the same artifact
- Use consistent naming conventions
- Document target compatibility

### Security

- Rotate signing keys periodically
- Use hardware security modules (HSMs) for production keys
- Implement role-based access control
- Audit all signing operations

### Testing

- Test binaries in staging before production release
- Use release channels for phased rollouts
- Implement automated testing pipelines

## Common Use Cases

### Multi-Component Updates

Deploy firmware, configuration, and ML models together:

- Create separate artifacts for each component type
- Bundle compatible versions together
- Deploy atomically to ensure consistency

### A/B Testing

Test new features with subset of fleet:

- Create experimental artifact versions
- Use cohorts to target test devices
- Monitor metrics before full rollout

### Emergency Rollback

Quickly revert problematic updates:

- Maintain previous signed binaries
- Create rollback releases pre-emptively
- Use priority channels for critical fixes

## Integration Points

The firmware management system integrates with:

- **CI/CD Pipelines**: Automated building and signing
- **Device Management**: Targeting and deployment
- **Monitoring**: Update success metrics
- **Webhooks**: Event notifications

## Next Steps

- [Artifacts](artifacts.md) - Define binary types
- [Artifact Versions](artifact-versions.md) - Version your binaries
- [Binaries](binaries.md) - Upload and manage binary content
- [Binary Signatures](binary-signatures.md) - Sign your binaries
- [API Reference](/admin-api#binaries) - Detailed API documentation
