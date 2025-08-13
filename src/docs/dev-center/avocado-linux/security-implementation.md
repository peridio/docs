---
title: Security Implementation
description: Implement comprehensive security features including secure boot, encryption, and integrity verification
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

Avocado OS provides enterprise-grade security features to protect your devices from boot to application. This guide covers implementing secure boot, filesystem encryption, integrity verification, and runtime security policies.

## Secure Boot Configuration

### Understanding Secure Boot Chain

Secure boot establishes a chain of trust from hardware to application:

```
┌──────────────┐
│  Hardware    │ ← ROM/eFuses (immutable root of trust)
│  Root Trust  │
└──────┬───────┘
       ↓ Verifies
┌──────────────┐
│  Bootloader  │ ← SPL/U-Boot (signed)
│   (Stage 1)  │
└──────┬───────┘
       ↓ Verifies
┌──────────────┐
│  Bootloader  │ ← U-Boot proper (signed)
│   (Stage 2)  │
└──────┬───────┘
       ↓ Verifies
┌──────────────┐
│    Kernel    │ ← Linux kernel (signed)
│   + initrd   │
└──────┬───────┘
       ↓ Verifies
┌──────────────┐
│     Root     │ ← dm-verity protected
│  Filesystem  │
└──────────────┘
```

### Configuring Hardware Root of Trust

Program hardware security features:

```bash
# Configure i.MX HAB (High Assurance Boot)
avocado-security hab-config \
  --srk-hash srk_hash.bin \
  --device /dev/mmcblk0

# Program eFuses (PERMANENT - cannot be undone)
avocado-security efuse-program \
  --srk-hash srk_hash.bin \
  --close-device \
  --confirm

# Configure UEFI Secure Boot
avocado-security uefi-config \
  --pk platform-key.crt \
  --kek key-exchange-key.crt \
  --db authorized-signatures.crt
```

### Bootloader Security

Secure U-Boot configuration:

```bash
# Generate signing keys for U-Boot
openssl genrsa -out boot-signing.key 4096
openssl req -new -x509 -key boot-signing.key -out boot-signing.crt

# Sign SPL (Secondary Program Loader)
avocado-security sign-spl \
  --input u-boot-spl.bin \
  --key boot-signing.key \
  --output u-boot-spl-signed.bin

# Sign U-Boot proper with FIT image
mkimage -f u-boot.its -k keys/ -r u-boot.itb

# Configure verified boot in U-Boot
cat >> configs/secure_defconfig << EOF
CONFIG_FIT_SIGNATURE=y
CONFIG_RSA=y
CONFIG_RSA_VERIFY=y
CONFIG_FIT_ENABLE_RSA4096_SUPPORT=y
EOF
```

### Kernel Signing and Verification

Sign and verify kernel images:

```bash
# Sign kernel with UEFI Secure Boot
sbsign --key signing.key \
       --cert signing.crt \
       --output vmlinuz.signed \
       vmlinuz

# Create signed FIT image for U-Boot
cat > kernel.its << EOF
/dts-v1/;
/ {
    description = "Avocado OS Kernel";
    images {
        kernel {
            data = /incbin/("Image");
            type = "kernel";
            arch = "arm64";
            compression = "none";
            hash-1 {
                algo = "sha256";
            };
        };
    };
    configurations {
        default = "config-1";
        config-1 {
            kernel = "kernel";
            signature {
                algo = "sha256,rsa4096";
                key-name-hint = "production";
                sign-images = "kernel";
            };
        };
    };
};
EOF

mkimage -f kernel.its -k keys/ kernel.itb
```

## dm-verity Setup

### Filesystem Integrity Protection

Configure dm-verity for read-only filesystem verification:

```bash
# Create dm-verity protected image
veritysetup format avocado-rootfs.img rootfs.verity \
  --hash-offset=1073741824 \
  --data-blocks=131072 \
  --hash-blocks=1024 \
  --salt=random \
  --uuid=random

# Extract root hash
ROOT_HASH=$(veritysetup verify avocado-rootfs.img rootfs.verity | grep "Root hash" | cut -d: -f2)

# Sign root hash
openssl dgst -sha256 -sign verity-signing.key \
  -out roothash.sig \
  <(echo -n "$ROOT_HASH")

# Configure kernel command line
cat >> bootargs << EOF
root=/dev/mapper/rootfs \
dm-mod.create="rootfs,,,ro,0 $((131072*4096)) verity 1 /dev/mmcblk0p2 /dev/mmcblk0p3 4096 4096 131072 1024 sha256 $ROOT_HASH"
EOF
```

### Creating Verity-Enabled Images

Build system integration for dm-verity:

```python
# Yocto recipe snippet for dm-verity
IMAGE_FEATURES += "read-only-rootfs"
EXTRA_IMAGECMD_ext4 = "-i 4096"

python do_verity() {
    import subprocess
    
    # Generate verity metadata
    rootfs = d.getVar('IMAGE_ROOTFS')
    output = d.getVar('DEPLOY_DIR_IMAGE') + '/rootfs.verity'
    
    cmd = ['veritysetup', 'format', 
           rootfs + '.ext4', 
           output,
           '--salt=random']
    
    result = subprocess.run(cmd, capture_output=True)
    
    # Store root hash for boot configuration
    with open(output + '.roothash', 'w') as f:
        f.write(result.stdout.decode())
}

addtask verity after do_image_ext4 before do_image_complete
```

### Runtime Verification

Monitor and handle verification failures:

```bash
# Check dm-verity status
dmsetup status rootfs

# Configure corruption handling
echo "restart" > /sys/module/dm_verity/parameters/error_behavior

# Monitor verity errors
journalctl -u dm-verity-monitor -f

# Create recovery handler
cat > /usr/local/bin/verity-error-handler << 'EOF'
#!/bin/bash
# Log error details
logger -t verity "Integrity violation detected"
# Trigger recovery mode
systemctl isolate recovery.target
EOF
```

## LUKS Encryption

### Full Disk Encryption Setup

Configure LUKS encryption for data partitions:

```bash
# Create encrypted partition
cryptsetup luksFormat /dev/mmcblk0p4 \
  --cipher aes-xts-plain64 \
  --key-size 512 \
  --hash sha256 \
  --iter-time 5000

# Add recovery key
cryptsetup luksAddKey /dev/mmcblk0p4 \
  --key-slot 1 \
  recovery-key.txt

# Open encrypted partition
cryptsetup luksOpen /dev/mmcblk0p4 data

# Format and mount
mkfs.ext4 /dev/mapper/data
mount /dev/mapper/data /data
```

### Key Management for Encryption

Implement secure key storage and management:

```bash
# Use TPM for key sealing
tpm2_createprimary -C o -g sha256 -G rsa -c primary.ctx
tpm2_create -C primary.ctx -g sha256 -G keyedhash \
  -r key.priv -u key.pub -L policy.dat

# Seal LUKS key to TPM PCRs
echo -n "$LUKS_KEY" | tpm2_create -C primary.ctx \
  -i - -L pcr.policy -r sealed.priv -u sealed.pub

# Configure automatic unlock with TPM
cat > /etc/crypttab << EOF
data UUID=xxx none luks,tpm2-device=auto,tpm2-pcrs=0+7
EOF

# Use secure element for key storage
avocado-security store-key \
  --type luks \
  --key /tmp/luks.key \
  --slot 2 \
  --device atecc608a
```

### Encrypted Containers

Use encrypted containers for application data:

```bash
# Create encrypted container
dd if=/dev/zero of=/data/container.img bs=1M count=1024
cryptsetup luksFormat container.img

# Mount encrypted container
cryptsetup luksOpen container.img secure-data
mkfs.ext4 /dev/mapper/secure-data
mount /dev/mapper/secure-data /secure

# Auto-mount with systemd
cat > /etc/systemd/system/secure-container.service << EOF
[Unit]
Description=Encrypted Container Mount
After=data.mount

[Service]
Type=oneshot
ExecStart=/usr/local/bin/mount-secure-container
RemainAfterExit=yes
ExecStop=/usr/local/bin/umount-secure-container

[Install]
WantedBy=multi-user.target
EOF
```

## Runtime Security

### Mandatory Access Control

Configure SELinux or AppArmor policies:

```bash
# SELinux configuration
semanage fcontext -a -t avocado_exec_t '/opt/avocado/bin(/.*)?'
restorecon -Rv /opt/avocado

# Create custom policy module
cat > avocado.te << EOF
policy_module(avocado, 1.0.0)

type avocado_t;
type avocado_exec_t;

init_daemon_domain(avocado_t, avocado_exec_t)

allow avocado_t self:capability { net_admin sys_admin };
allow avocado_t avocado_port_t:tcp_socket { bind listen accept };
EOF

# Compile and install policy
checkmodule -M -m avocado.te -o avocado.mod
semodule_package -o avocado.pp -m avocado.mod
semodule -i avocado.pp
```

### Secure Service Configuration

Harden system services:

```ini
# systemd service hardening
[Service]
# User/Group
User=avocado
Group=avocado
DynamicUser=yes

# Filesystem
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
ReadWritePaths=/var/lib/avocado

# Kernel
ProtectKernelTunables=yes
ProtectKernelModules=yes
ProtectControlGroups=yes

# Network
RestrictAddressFamilies=AF_INET AF_INET6
IPAddressDeny=any
IPAddressAllow=192.168.0.0/16

# System calls
SystemCallFilter=@system-service
SystemCallErrorNumber=EPERM
NoNewPrivileges=yes

# Resources
LimitNOFILE=1024
LimitNPROC=64
MemoryLimit=512M
```

### Audit and Monitoring

Configure comprehensive security monitoring:

```bash
# Configure auditd rules
cat >> /etc/audit/rules.d/avocado.rules << EOF
# Monitor critical files
-w /etc/avocado/ -p wa -k avocado_config
-w /boot/ -p wa -k boot_modification

# Monitor privileged commands
-a always,exit -F path=/usr/bin/sudo -F perm=x -k privileged

# Monitor system calls
-a always,exit -F arch=b64 -S open -F dir=/etc -F success=0 -k access_denied
EOF

# Configure intrusion detection
cat > /etc/aide/aide.conf.d/avocado << EOF
/boot/vmlinuz* R+sha512
/opt/avocado/bin R+sha512+e+p+u+g
EOF

# Initialize AIDE database
aideinit -y
```

## Security Best Practices

### Development Security

**Secure Development Guidelines:**
- Use static analysis tools (Coverity, CodeQL)
- Regular dependency scanning
- Fuzzing critical components
- Security code reviews
- Threat modeling for new features

### Deployment Security

**Production Deployment Checklist:**
- ✓ Enable secure boot chain
- ✓ Configure dm-verity for rootfs
- ✓ Encrypt sensitive data partitions
- ✓ Implement least privilege access
- ✓ Enable security monitoring
- ✓ Regular security updates
- ✓ Incident response plan

### Compliance and Certification

**Security Standards:**
- IEC 62443 for industrial systems
- Common Criteria certification path
- FIPS 140-2 cryptographic validation
- CIS benchmarks compliance

## Next Steps

- [Update Mechanisms →](./update-mechanisms) - Secure OTA updates
- [Porting Guide →](./porting-guide) - Security for new platforms
- [Key Management →](./build-provisioning#key-management) - Advanced key management