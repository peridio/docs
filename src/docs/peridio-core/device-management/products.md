---
title: Products
---

# Products

Products define a type for your [devices](/peridio-core/device-management/devices). They provide the highest level of logical grouping within an organization and serve as containers for firmware, configurations, and device cohorts.

## Purpose

Products represent distinct device types or hardware platforms in your fleet. Each product typically corresponds to:

- A specific hardware model or SKU
- A product line with shared characteristics
- A major hardware revision
- A distinct embedded application

## Product Structure

### Hierarchy

```
Organization
└── Product
    ├── Cohorts
    ├── Devices
    ├── Firmware (Artifacts/Bundles)
    └── Configurations
```

### Key Relationships

- **One-to-many with devices** - A product contains multiple devices
- **One-to-many with cohorts** - A product contains multiple cohorts for segmentation
- **Firmware association** - Artifacts and bundles are scoped to products
- **Certificate authorities** - CA certificates can be associated for JITP

## Use Cases

### Hardware Variants

```
product-indoor-sensor
product-outdoor-sensor
product-gateway-v1
product-gateway-v2
```

### Product Lines

```
product-consumer-basic
product-consumer-pro
product-enterprise
```

### Geographic Models

```
product-us-model
product-eu-model
product-asia-model
```

## Creating Products

### Required Information

- **Name** - Unique identifier within the organization
- **Description** - Human-readable description of the product

### Optional Configuration

- **Tags** - Metadata for organization and filtering
- **JITP settings** - Default configurations for auto-provisioning
- **Firmware policies** - Update strategies and constraints

## Product Management

### Organizing Devices

Products provide the primary organization for devices:

- Devices must belong to exactly one product
- Moving devices between products requires re-provisioning
- Product assignment happens during device creation or JITP

### Firmware Scoping

Firmware artifacts and bundles are scoped to products:

- Each product has its own firmware repository
- Prevents incompatible firmware deployment
- Enables product-specific update strategies

### Access Control

Products can have granular permissions:

- Product-level admin roles
- Read-only access for support teams
- API key scoping per product

## Best Practices

### Naming Conventions

- Use descriptive, consistent names
- Include hardware version or model
- Avoid special characters that complicate API usage
- Consider including target market or use case

### Product Granularity

- **Too few products** - Difficult to manage different hardware types
- **Too many products** - Operational overhead and complexity
- **Just right** - One product per distinct hardware/firmware combination

### Planning for Growth

- Design product structure to accommodate future models
- Consider how products will evolve over time
- Plan for end-of-life and migration strategies
- Document product purposes and boundaries

## Common Patterns

### Development Lifecycle

```
product-prototype     # Early development
product-evk          # Evaluation kits
product-production   # Production hardware
```

### Version Management

```
product-model-a-v1   # First generation
product-model-a-v2   # Second generation
product-model-b-v1   # Different model line
```

### Multi-Tenant

```
product-customer-a   # Customer-specific builds
product-customer-b
product-standard     # Generic product
```

## Product Operations

### Monitoring

- Device count per product
- Firmware version distribution
- Update success rates
- Connection statistics

### Maintenance

- Regular review of product structure
- Archive obsolete products
- Document product specifications
- Maintain product roadmaps

## Migration Considerations

### Product Consolidation

When merging products:

1. Identify target product
2. Migrate devices carefully
3. Consolidate firmware repositories
4. Update documentation

### Product Splitting

When dividing products:

1. Create new product definitions
2. Plan device migration
3. Separate firmware streams
4. Communicate changes to team

## Integration

Products integrate with:

- [Cohorts](/peridio-core/device-management/cohorts) for device segmentation
- [Devices](/peridio-core/device-management/devices) as members
- [Artifacts](/peridio-core/firmware-management/artifacts) for firmware
- [JITP](/peridio-core/device-management/just-in-time-provisioning) for auto-provisioning

## Limitations

- Devices cannot belong to multiple products
- Products cannot be merged automatically
- Product names must be unique within organization
- Deleting products requires removing all devices first

## Related Topics

- [Devices](/peridio-core/device-management/devices)
- [Cohorts](/peridio-core/device-management/cohorts)
- [Organizations](/platform/reference/organizations)
- [Firmware Management](/peridio-core/firmware-management/overview)
