---
title: Porting Guide
description: Port Avocado OS to new hardware platforms with comprehensive BSP integration and validation
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

This guide walks through the process of porting Avocado OS to new hardware platforms. From initial BSP assessment to production validation, you'll learn how to adapt Avocado OS for your specific hardware requirements.

## BSP Assessment

### Hardware Requirements Analysis

Before starting the porting process, evaluate your hardware:

**Minimum Hardware Requirements:**
- **CPU**: ARMv7+ or x86_64 processor
- **RAM**: 256MB minimum (512MB recommended)
- **Storage**: 2GB minimum (4GB+ for full features)
- **Boot**: U-Boot, UEFI, or compatible bootloader
- **Network**: Ethernet or WiFi interface (optional but recommended)

**BSP Checklist:**
```bash
# Use BSP assessment tool
avocado-port assess --hardware my-board

# Manual assessment checklist
cat > bsp-assessment.md << EOF
## Processor
- [ ] Architecture: ___________
- [ ] Core count: ___________
- [ ] Frequency: ___________
- [ ] Cache sizes: ___________

## Memory
- [ ] RAM size: ___________
- [ ] RAM type: ___________
- [ ] Memory map documented

## Storage
- [ ] Boot media: ___________
- [ ] Storage size: ___________
- [ ] Partition layout: ___________

## Peripherals
- [ ] UART console: ___________
- [ ] Network interfaces: ___________
- [ ] USB ports: ___________
- [ ] GPIO availability: ___________
- [ ] I2C/SPI buses: ___________

## Boot Infrastructure
- [ ] Bootloader type: ___________
- [ ] Secure boot support: ___________
- [ ] Device tree source: ___________
EOF
```

### Vendor BSP Integration

Integrate vendor-provided BSP components:

```bash
# Clone vendor BSP
git clone https://vendor.com/bsp/my-board-bsp.git

# Analyze BSP structure
tree -L 2 my-board-bsp/
# ├── bootloader/
# ├── kernel/
# ├── drivers/
# └── tools/

# Extract necessary components
avocado-port extract-bsp \
  --input my-board-bsp/ \
  --output meta-avocado-bsp-myboard/

# Verify kernel configuration
diff -u my-board-bsp/kernel/defconfig \
        meta-avocado/conf/kernel/base_defconfig
```

### Creating BSP Layer

Structure your Yocto BSP layer:

```bash
# Create BSP layer structure
avocado-port create-layer --name myboard

# Layer structure
meta-avocado-bsp-myboard/
├── conf/
│   ├── layer.conf
│   ├── machine/
│   │   └── myboard.conf
│   └── bblayers.conf.sample
├── recipes-bsp/
│   ├── bootloader/
│   │   └── u-boot-myboard.bb
│   └── firmware/
│       └── firmware-myboard.bb
├── recipes-kernel/
│   ├── linux/
│   │   ├── linux-myboard_5.15.bb
│   │   └── files/
│   │       ├── defconfig
│   │       └── patches/
│   └── modules/
└── recipes-core/
    └── images/
        └── avocado-image-myboard.bb
```

Machine configuration example:

```bash
# conf/machine/myboard.conf
#@TYPE: Machine
#@NAME: My Custom Board
#@DESCRIPTION: Machine configuration for My Board

require conf/machine/include/arm/armv8a/tune-cortexa53.inc

MACHINE_FEATURES = "uart usb ethernet wifi bluetooth"

# Kernel configuration
PREFERRED_PROVIDER_virtual/kernel = "linux-myboard"
KERNEL_DEVICETREE = "vendor/myboard.dtb"
KERNEL_IMAGETYPE = "Image"

# Bootloader configuration
PREFERRED_PROVIDER_virtual/bootloader = "u-boot-myboard"
UBOOT_MACHINE = "myboard_defconfig"
UBOOT_ENTRYPOINT = "0x80008000"
UBOOT_LOADADDRESS = "0x80008000"

# Image configuration
IMAGE_FSTYPES = "ext4 wic wic.bmap"
WKS_FILE = "myboard.wks"

# Serial console
SERIAL_CONSOLES = "115200;ttyS0"
```

## Device Tree Configuration

### Analyzing Existing Device Tree

Understand your hardware's device tree:

```bash
# Decompile existing DTB
dtc -I dtb -O dts -o myboard.dts myboard.dtb

# Analyze device tree structure
fdtdump myboard.dtb | less

# Extract specific nodes
fdtget myboard.dtb /chosen bootargs
fdtget myboard.dtb /memory reg

# Validate device tree
dt-validate myboard.dts
```

### Creating Avocado-Compatible Device Tree

Adapt device tree for Avocado OS:

```dts
// myboard-avocado.dts
/dts-v1/;

#include "vendor/myboard-base.dtsi"

/ {
    model = "My Board with Avocado OS";
    compatible = "vendor,myboard", "avocado,generic";
    
    chosen {
        stdout-path = "serial0:115200n8";
        bootargs = "console=ttyS0,115200 root=/dev/mmcblk0p2 rw";
        
        // Avocado-specific boot parameters
        avocado {
            boot-mode = "normal";
            update-partition = "/dev/mmcblk0p3";
            recovery-partition = "/dev/mmcblk0p4";
        };
    };
    
    // Memory configuration
    memory@80000000 {
        device_type = "memory";
        reg = <0x0 0x80000000 0x0 0x40000000>; // 1GB @ 2GB
    };
    
    // Avocado system extensions mount points
    avocado-extensions {
        compatible = "avocado,extensions";
        mount-point = "/opt/extensions";
        
        slots {
            slot@0 {
                reg = <0>;
                label = "system";
                max-size = <0x10000000>; // 256MB
            };
            slot@1 {
                reg = <1>;
                label = "user";
                max-size = <0x20000000>; // 512MB
            };
        };
    };
};

// Hardware-specific configurations
&uart0 {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&uart0_pins>;
};

&ethernet0 {
    status = "okay";
    phy-mode = "rgmii-id";
    phy-handle = <&phy0>;
};

&usb0 {
    status = "okay";
    dr_mode = "host";
};
```

### Device Tree Overlays for Variants

Support hardware variants with overlays:

```dts
// myboard-wifi.dtso - WiFi variant overlay
/dts-v1/;
/plugin/;

&{/} {
    wireless {
        compatible = "vendor,wifi-module";
        status = "okay";
    };
};

&sdio0 {
    status = "okay";
    wifi@1 {
        compatible = "broadcom,bcm4329";
        reg = <1>;
        interrupt-parent = <&gpio>;
        interrupts = <15 IRQ_TYPE_LEVEL_LOW>;
    };
};
```

## Driver Integration

### Kernel Driver Porting

Port and integrate kernel drivers:

```c
// drivers/myboard/myboard-gpio.c
#include <linux/module.h>
#include <linux/platform_device.h>
#include <linux/gpio/driver.h>
#include <linux/of.h>

struct myboard_gpio {
    struct gpio_chip chip;
    void __iomem *base;
    spinlock_t lock;
};

static int myboard_gpio_probe(struct platform_device *pdev)
{
    struct myboard_gpio *gpio;
    struct resource *res;
    int ret;
    
    gpio = devm_kzalloc(&pdev->dev, sizeof(*gpio), GFP_KERNEL);
    if (!gpio)
        return -ENOMEM;
    
    res = platform_get_resource(pdev, IORESOURCE_MEM, 0);
    gpio->base = devm_ioremap_resource(&pdev->dev, res);
    if (IS_ERR(gpio->base))
        return PTR_ERR(gpio->base);
    
    spin_lock_init(&gpio->lock);
    
    // Configure GPIO chip
    gpio->chip.label = "myboard-gpio";
    gpio->chip.parent = &pdev->dev;
    gpio->chip.owner = THIS_MODULE;
    gpio->chip.base = -1;
    gpio->chip.ngpio = 32;
    gpio->chip.can_sleep = false;
    
    ret = devm_gpiochip_add_data(&pdev->dev, &gpio->chip, gpio);
    if (ret) {
        dev_err(&pdev->dev, "Failed to register GPIO chip\n");
        return ret;
    }
    
    platform_set_drvdata(pdev, gpio);
    
    dev_info(&pdev->dev, "MyBoard GPIO driver initialized\n");
    return 0;
}

static const struct of_device_id myboard_gpio_of_match[] = {
    { .compatible = "vendor,myboard-gpio" },
    { }
};
MODULE_DEVICE_TABLE(of, myboard_gpio_of_match);

static struct platform_driver myboard_gpio_driver = {
    .driver = {
        .name = "myboard-gpio",
        .of_match_table = myboard_gpio_of_match,
    },
    .probe = myboard_gpio_probe,
};
module_platform_driver(myboard_gpio_driver);

MODULE_DESCRIPTION("MyBoard GPIO Driver");
MODULE_LICENSE("GPL v2");
```

### Userspace Driver Integration

Add userspace drivers and utilities:

```c
// userspace/myboard-util.c
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/ioctl.h>

#define MYBOARD_IOCTL_BASE 'M'
#define MYBOARD_GET_VERSION _IOR(MYBOARD_IOCTL_BASE, 0, int)
#define MYBOARD_SET_LED _IOW(MYBOARD_IOCTL_BASE, 1, int)

int main(int argc, char *argv[])
{
    int fd, version;
    
    fd = open("/dev/myboard", O_RDWR);
    if (fd < 0) {
        perror("Failed to open device");
        return 1;
    }
    
    // Get driver version
    if (ioctl(fd, MYBOARD_GET_VERSION, &version) == 0) {
        printf("MyBoard driver version: %d.%d\n", 
               version >> 16, version & 0xFFFF);
    }
    
    // Control board LED
    if (argc > 1) {
        int led_state = atoi(argv[1]);
        ioctl(fd, MYBOARD_SET_LED, &led_state);
        printf("LED set to %s\n", led_state ? "ON" : "OFF");
    }
    
    close(fd);
    return 0;
}
```

## Validation Testing

### Hardware Validation Suite

Comprehensive hardware testing:

```bash
# Create hardware test suite
cat > hw-validation.sh << 'EOF'
#!/bin/bash
set -e

echo "=== Avocado OS Hardware Validation ==="

# CPU tests
echo -n "CPU: "
stress-ng --cpu 0 --timeout 10s --metrics-brief 2>&1 | grep -q "successful" && echo "PASS" || echo "FAIL"

# Memory tests
echo -n "Memory: "
memtester 100M 1 2>&1 | grep -q "ok" && echo "PASS" || echo "FAIL"

# Storage tests
echo -n "Storage: "
dd if=/dev/zero of=/tmp/test bs=1M count=100 2>/dev/null
dd if=/tmp/test of=/dev/null bs=1M 2>/dev/null
rm -f /tmp/test && echo "PASS" || echo "FAIL"

# Network tests
echo -n "Network: "
ping -c 3 8.8.8.8 >/dev/null 2>&1 && echo "PASS" || echo "FAIL"

# GPIO tests
echo -n "GPIO: "
for pin in 17 27 22; do
    echo $pin > /sys/class/gpio/export 2>/dev/null || true
    echo out > /sys/class/gpio/gpio$pin/direction
    echo 1 > /sys/class/gpio/gpio$pin/value
    sleep 0.1
    echo 0 > /sys/class/gpio/gpio$pin/value
    echo $pin > /sys/class/gpio/unexport
done && echo "PASS" || echo "FAIL"

# Thermal tests
echo -n "Thermal: "
temp=$(cat /sys/class/thermal/thermal_zone0/temp)
[ $temp -lt 85000 ] && echo "PASS ($((temp/1000))°C)" || echo "FAIL ($((temp/1000))°C)"
EOF

chmod +x hw-validation.sh
```

### Boot Performance Testing

Measure and optimize boot time:

```bash
# Enable boot time profiling
cat >> /boot/cmdline.txt << EOF
initcall_debug printk.time=y
EOF

# Analyze boot time
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain

# Generate boot chart
systemd-analyze plot > boot.svg

# Kernel boot time analysis
dmesg | grep -E "^\[[ ]*[0-9.]*\]" | less

# Create boot optimization script
cat > optimize-boot.sh << 'EOF'
#!/bin/bash
# Disable unnecessary services
systemctl disable bluetooth
systemctl disable cups

# Optimize filesystem mount options
sed -i 's/defaults/defaults,noatime/' /etc/fstab

# Configure static IP to skip DHCP
echo "interface eth0
static ip_address=192.168.1.100/24
static routers=192.168.1.1" >> /etc/dhcpcd.conf
EOF
```

### Stress Testing

Validate system stability under load:

```bash
# Comprehensive stress test
avocado-test stress \
  --duration 24h \
  --cpu-load 80 \
  --memory-load 70 \
  --io-load 50 \
  --network-load 30 \
  --temperature-monitor \
  --report stress-test.json

# Power cycle testing
avocado-test power-cycle \
  --iterations 1000 \
  --delay 30s \
  --validate-boot \
  --log power-test.log

# Update stress testing
avocado-test update-stress \
  --updates 100 \
  --rollback-probability 0.1 \
  --network-interruption 0.05
```

### Compliance Validation

Ensure compliance with standards:

```bash
# Run compliance test suite
avocado-test compliance \
  --standard IEC-62443 \
  --level SL-2 \
  --report compliance-report.pdf

# Security validation
avocado-test security \
  --scan-vulnerabilities \
  --check-encryption \
  --verify-signatures \
  --test-secure-boot

# Performance benchmarks
avocado-test benchmark \
  --suite embedded \
  --compare-baseline \
  --output benchmarks.json
```

## Production Readiness

### Final Integration Checklist

**Before Production Release:**
- [ ] All hardware interfaces tested and functional
- [ ] Boot time meets requirements (< 30 seconds)
- [ ] Power consumption within specifications
- [ ] Thermal management validated
- [ ] Security features enabled and tested
- [ ] Update mechanism verified
- [ ] Recovery mode functional
- [ ] Production keys provisioned
- [ ] Documentation complete
- [ ] Compliance certifications obtained

### Performance Optimization

Final optimizations for production:

```bash
# Kernel optimization
make menuconfig
# Disable DEBUG options
# Enable performance governors
# Optimize for size or speed

# Build optimized image
EXTRA_IMAGE_FEATURES:remove = "debug-tweaks"
EXTRA_IMAGE_FEATURES:remove = "tools-debug"

# Strip debug symbols
INHIBIT_PACKAGE_STRIP = "0"
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"
```

## Next Steps

- [Architecture Overview →](./architecture-overview) - System architecture details
- [Build & Provisioning →](./build-provisioning) - Production build setup
- [Security Implementation →](./security-implementation) - Security hardening