---
title: Build & Provisioning
description: Build system images, manage keys, and provision devices for production deployment
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

The build and provisioning system in Avocado OS provides a secure, reproducible path from development to production. This guide covers key management, image building, and device provisioning workflows.

## Key Management

### Security Key Infrastructure

Avocado OS uses a hierarchical key structure to ensure secure boot, image signing, and device attestation:

**Key Hierarchy:**
```
Root CA (offline)
├── Image Signing Key
│   ├── Kernel signatures
│   ├── Extension signatures
│   └── Update bundle signatures
├── Device CA
│   ├── Device Identity Keys
│   └── Attestation Keys
└── Development Keys
    ├── Debug certificates
    └── Test signing keys
```

### Generating Production Keys

Create and manage your production key infrastructure:

```bash
# Initialize key management system
avocado-keys init --production

# Generate root certificate authority
avocado-keys generate-ca \
  --name "MyCompany Root CA" \
  --validity 10y \
  --key-size 4096

# Generate image signing key
avocado-keys generate-signing-key \
  --name "Production Image Signing" \
  --parent root-ca \
  --validity 2y

# Generate device provisioning keys
avocado-keys generate-device-ca \
  --name "Device Identity CA" \
  --parent root-ca \
  --validity 5y
```

### Key Storage and Protection

**Best Practices for Key Security:**

**1. Hardware Security Module (HSM):**
```bash
# Configure HSM integration
avocado-keys configure-hsm \
  --provider yubihsm \
  --device /dev/hidraw0

# Store root keys in HSM
avocado-keys import-to-hsm \
  --key root-ca.key \
  --slot 1
```

**2. Key Encryption and Backup:**
```bash
# Encrypt keys for storage
avocado-keys encrypt \
  --key production-signing.key \
  --output production-signing.key.enc

# Create secure backup
avocado-keys backup \
  --include-all \
  --encrypt \
  --output keys-backup-$(date +%Y%m%d).tar.enc

# Split key for multi-party control
avocado-keys split \
  --key root-ca.key \
  --shares 3 \
  --threshold 2
```

### Certificate Management

Manage certificates throughout their lifecycle:

```bash
# View certificate details
avocado-keys cert-info production-signing.crt

# Renew expiring certificates
avocado-keys renew \
  --cert production-signing.crt \
  --validity 2y

# Revoke compromised certificates
avocado-keys revoke \
  --cert device-001.crt \
  --reason key-compromise

# Generate Certificate Revocation List
avocado-keys generate-crl \
  --ca root-ca \
  --output crl.pem
```

## Device Tree Modifications

### Understanding Device Trees

Device trees describe hardware configuration to the Linux kernel. Avocado OS supports dynamic device tree overlays for hardware customization:

**Device Tree Structure:**
```dts
/dts-v1/;

/ {
    compatible = "vendor,board";
    model = "Custom Hardware Platform";
    
    chosen {
        stdout-path = "serial0:115200n8";
        bootargs = "console=ttyS0,115200";
    };
    
    memory@80000000 {
        device_type = "memory";
        reg = <0x80000000 0x40000000>; /* 1GB RAM */
    };
    
    peripherals {
        gpio@40020000 {
            compatible = "vendor,gpio";
            reg = <0x40020000 0x1000>;
            gpio-controller;
            #gpio-cells = <2>;
        };
    };
};
```

### Creating Device Tree Overlays

Build overlays for runtime hardware configuration:

```dts
// Enable I2C peripheral overlay
/dts-v1/;
/plugin/;

&i2c1 {
    status = "okay";
    clock-frequency = <400000>;
    
    sensor@48 {
        compatible = "ti,tmp102";
        reg = <0x48>;
    };
};
```

Compile and apply overlays:

```bash
# Compile device tree overlay
dtc -O dtb -o i2c-sensor.dtbo i2c-sensor.dts

# Apply overlay at runtime
avocado-dtb apply i2c-sensor.dtbo

# List active overlays
avocado-dtb list

# Remove overlay
avocado-dtb remove i2c-sensor
```

### Hardware-Specific Customization

Customize device trees for your hardware:

```bash
# Extract current device tree
avocado-dtb extract --output current.dts

# Modify for your hardware
vim current.dts

# Compile modified tree
dtc -O dtb -o custom.dtb current.dts

# Validate device tree
avocado-dtb validate custom.dtb

# Deploy to boot partition
avocado-dtb install custom.dtb
```

## Build System Integration

### Yocto Build Configuration

Avocado OS is built using Yocto Project. Configure your build:

```bash
# Clone Avocado OS layers
git clone https://github.com/avocado-linux/meta-avocado
git clone https://github.com/avocado-linux/meta-avocado-bsp-<board>

# Initialize build environment
source oe-init-build-env build-avocado

# Configure local.conf
cat >> conf/local.conf << EOF
MACHINE = "your-board"
DISTRO = "avocado"
AVOCADO_FEATURES = "secure-boot dm-verity"
EOF

# Add layers
bitbake-layers add-layer ../meta-avocado
bitbake-layers add-layer ../meta-avocado-bsp-<board>
```

### Building System Images

Build complete system images:

```bash
# Build base image
bitbake avocado-image-base

# Build with debug features
bitbake avocado-image-debug

# Build production image
bitbake avocado-image-production

# Build SDK for development
bitbake avocado-sdk
```

### Image Signing and Verification

Sign images for secure boot:

```bash
# Sign kernel image
avocado-sign kernel \
  --input tmp/deploy/images/*/Image \
  --key production-signing.key \
  --cert production-signing.crt \
  --output Image.signed

# Sign system image
avocado-sign image \
  --input avocado-image.wic \
  --key production-signing.key \
  --manifest \
  --output avocado-image-signed.wic

# Verify signed image
avocado-verify \
  --image avocado-image-signed.wic \
  --cert production-signing.crt
```

## Device Provisioning

### Factory Provisioning Workflow

Set up automated factory provisioning:

```bash
# Create provisioning server
avocado-provision server \
  --port 8080 \
  --cert-path /path/to/certs

# Generate provisioning image
avocado-provision create-image \
  --base avocado-image-production.wic \
  --server https://provision.example.com \
  --output provision.wic
```

### Device Identity Generation

Create unique identities for each device:

```bash
# Generate device certificate
avocado-provision generate-identity \
  --device-id "DEV-001" \
  --ca device-ca \
  --output device-001.p12

# Batch provisioning
avocado-provision batch \
  --count 1000 \
  --prefix "PROD-" \
  --ca device-ca \
  --output-dir identities/
```

### Secure Element Integration

Program secure elements during provisioning:

```bash
# Configure secure element
avocado-provision secure-element \
  --type atecc608a \
  --port /dev/i2c-1

# Write device identity
avocado-provision write-identity \
  --device device-001.p12 \
  --slot 0

# Lock configuration
avocado-provision lock \
  --permanent
```

### First Boot Configuration

Configure devices on first boot:

```yaml
# /etc/avocado/first-boot.yaml
hostname: device-${SERIAL}
timezone: UTC

network:
  interfaces:
    - name: eth0
      dhcp: true
    - name: wlan0
      ssid: "FactoryNetwork"
      psk: "${WIFI_PSK}"

services:
  - name: avocado-agent
    enabled: true
    config:
      server: https://fleet.example.com
      
provisioning:
  complete_url: https://provision.example.com/complete
  test_suite: factory-validation
```

## Production Deployment

### Release Management

Prepare images for production:

```bash
# Tag release
git tag -s v1.0.0 -m "Production release 1.0.0"

# Build release artifacts
avocado-release build \
  --version 1.0.0 \
  --sign

# Generate release notes
avocado-release notes \
  --version 1.0.0 \
  --changelog

# Create update bundle
avocado-release bundle \
  --version 1.0.0 \
  --delta-from 0.9.0 \
  --output release-1.0.0.avb
```

### Deployment Verification

Verify production deployments:

```bash
# Validate release bundle
avocado-release verify \
  --bundle release-1.0.0.avb

# Test update path
avocado-release test-update \
  --from 0.9.0 \
  --to 1.0.0 \
  --device test-device

# Generate compliance report
avocado-release compliance \
  --version 1.0.0 \
  --standard IEC62443
```

## Next Steps

- [Security Implementation →](./security-implementation) - Configure security features
- [Update Mechanisms →](./update-mechanisms) - Set up OTA updates
- [Porting Guide →](./porting-guide) - Port to new hardware