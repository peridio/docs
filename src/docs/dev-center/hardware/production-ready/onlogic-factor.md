---
title: OnLogic Factor 201 & 202
description: Rugged industrial computers built for harsh environments
---

# OnLogic Factor 201 & 202

The OnLogic Factor 201 and Factor 202 are rugged, fanless industrial computers designed for deployment in challenging environments. Built for 24/7 operation with Peridio integration, these systems deliver reliable performance for industrial IoT, edge computing, and automation applications.

## Why Choose OnLogic Factor Series?

- **Rugged Reliability**: Fanless design with no moving parts
- **Harsh Environment Ready**: Wide temperature range and vibration resistant
- **Flexible Configuration**: Customizable I/O and expansion options
- **Direct from Manufacturer**: Available from OnLogic with global support
- **Peridio Certified**: Pre-validated for seamless integration

## Model Comparison

### Factor 201
Compact edge computer optimized for space-constrained deployments:
- Intel Atom or Celeron processors
- Ideal for basic edge computing and IoT gateway applications
- Lower power consumption (12-24W typical)
- Compact form factor

### Factor 202
Higher performance system for demanding applications:
- Intel Core i3/i5/i7 processor options
- Suitable for AI inference and complex edge analytics
- Enhanced graphics capabilities
- Additional expansion slots

## Technical Specifications

### Common Features (Both Models)

#### Durability
- Fanless, ventless design
- Operating Temperature: -40°C to 70°C (with wide-temp option)
- Shock: 50G (IEC 60068-2-27)
- Vibration: 5 GRMS (IEC 60068-2-64)
- IP50 rated enclosure

#### Connectivity
- Dual Gigabit Ethernet ports
- Wi-Fi 6 and Bluetooth 5.2 (optional)
- 4G/5G cellular modem support (optional)
- Multiple USB 3.2 ports
- Serial ports (RS232/RS485)

#### Storage & Memory
- M.2 NVMe SSD support
- 2.5" SATA drive bay
- DDR4 SO-DIMM (up to 64GB)
- eMMC option available

#### I/O Options
- Digital I/O (GPIO)
- CAN bus support
- Mini PCIe expansion slots
- DisplayPort and HDMI outputs

### Factor 201 Specific

- **Processor**: Intel Atom x6000E or Celeron N Series
- **Memory**: Up to 32GB DDR4
- **Dimensions**: 177mm x 124mm x 49mm
- **Power**: 12-24V DC input, 12-25W typical

### Factor 202 Specific

- **Processor**: Intel Core i3/i5/i7 (11th Gen)
- **Memory**: Up to 64GB DDR4
- **Dimensions**: 213mm x 151mm x 58mm
- **Power**: 12-24V DC input, 35-65W typical

## Purchasing Information

### Direct from OnLogic
- Configure-to-order options
- Volume pricing available
- Global shipping
- Extended warranty options
- Custom branding available

### Configuration Options
- Processor selection
- Memory and storage
- Wireless connectivity
- I/O modules
- Operating system pre-installation

Visit [onlogic.com](https://www.onlogic.com) or contact OnLogic sales for quotes.

## Use Cases

### Industrial Automation
- PLC replacement and augmentation
- SCADA systems
- Machine control and monitoring
- Protocol conversion gateways
- Predictive maintenance systems

### Transportation
- Fleet management systems
- Vehicle diagnostics
- Digital signage controllers
- Passenger information systems
- Traffic monitoring

### Energy & Utilities
- Substation automation
- Smart grid controllers
- Solar/wind farm monitoring
- Pipeline monitoring
- Water treatment systems

### Edge AI
- Computer vision applications
- Predictive analytics
- Anomaly detection
- Real-time inference
- Data preprocessing

## Getting Started with Peridio

### Initial Setup

1. **Order Hardware**: Configure and purchase from OnLogic
2. **OS Installation**: Install Linux distribution (Ubuntu, Debian, or Yocto)
3. **Peridio Agent**: Install and configure Peridio agent
4. **Cloud Registration**: Connect to Peridio Cloud
5. **Deploy Applications**: Manage via Peridio Console

### Peridio Agent Installation

```bash
# Download Peridio agent installer
wget https://releases.peridio.com/peridiod/latest/install.sh

# Run installer
sudo bash install.sh

# Configure device credentials
sudo peridio-config setup \
  --device-id "your-device-id" \
  --server "your-instance.peridio.com"

# Start the agent
sudo systemctl start peridiod
sudo systemctl enable peridiod

# Verify status
sudo peridio-agent status
```

## Optimizations for OnLogic Hardware

### Power Management
- Configure for always-on operation
- Set up wake-on-LAN if needed
- Optimize for thermal constraints

### Storage Configuration
- Use industrial-grade SSDs
- Configure wear leveling
- Set up redundant storage if critical

### Network Resilience
- Configure failover between Ethernet and cellular
- Set up connection monitoring
- Implement local buffering for offline scenarios

## Development Tools

### Supported Operating Systems
- Ubuntu 20.04/22.04 LTS
- Debian 11/12
- Yocto Project custom builds
- Windows 10/11 IoT Enterprise

### Development Resources
- OnLogic BSP packages
- Hardware documentation
- Sample applications
- Peridio integration examples

## Support & Resources

### OnLogic Support
- Hardware warranty and RMA
- Technical documentation
- BIOS customization
- Hardware customization services

### Peridio Support
- Integration assistance
- OTA update configuration
- Device management setup
- Best practices guidance

## Certifications

- CE, FCC, IC compliance
- IEC 60068 environmental testing
- EN 50155 railway applications (optional)
- UL/cUL listed (select configurations)
- RoHS compliant

## Next Steps

- Browse [OnLogic's full product line](https://www.onlogic.com)
- Review [Peridio platform features](/platform/getting-started)
- Set up [device provisioning](/dev-center/getting-started/provision-device)
- Configure [OTA updates](/dev-center/getting-started/first-ota-update)
