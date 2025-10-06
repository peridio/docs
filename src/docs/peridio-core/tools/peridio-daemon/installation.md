---
title: Installation
sidebar_position: 2
description: 'Installing Peridio Daemon using build systems, package managers, containers, or pre-compiled binaries.'
draft: true
---

# Installation

Peridio Daemon can be installed through build system integration, package managers, containers, or as a standalone binary.

## Build system integration

### Yocto

Add the meta-peridio layer to your build:

```bash
git clone https://github.com/peridio/meta-peridio.git
bitbake-layers add-layer meta-peridio
```

Include in your image:

```
IMAGE_INSTALL += "peridiod"
```

The service will start automatically on boot via systemd.

### Buildroot

Enable in your defconfig:

```
BR2_PACKAGE_PERIDIOD=y
```

Or via menuconfig under `Target packages → System tools → peridiod`.

## Package managers

### RPM-based systems

```bash
sudo dnf config-manager --add-repo https://packages.peridio.com/rpm/peridio.repo
sudo dnf install peridiod
sudo systemctl enable --now peridiod
```

### DEB-based systems

```bash
curl -fsSL https://packages.peridio.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://packages.peridio.com/debian $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/peridio.list
sudo apt update && sudo apt install peridiod
sudo systemctl enable --now peridiod
```

### OpenWrt (OPKG)

```bash
opkg update
opkg install peridiod
/etc/init.d/peridiod enable
/etc/init.d/peridiod start
```

## Container deployment

### Docker

```bash
docker run -d \
  --name peridiod \
  --cap-add NET_ADMIN \
  -v /path/to/config:/etc/peridiod \
  peridio/peridiod:latest
```

The container requires `NET_ADMIN` capability for WireGuard tunnel management.

### Docker Compose

```yaml
version: '3.8'
services:
  peridiod:
    image: peridio/peridiod:latest
    cap_add:
      - NET_ADMIN
    volumes:
      - ./config:/etc/peridiod
    restart: unless-stopped
```

## Pre-compiled binaries

Download the appropriate binary for your architecture:

```bash
# x86_64
wget https://github.com/peridio/peridiod/releases/latest/download/peridiod-x86_64-linux

# ARM64
wget https://github.com/peridio/peridiod/releases/latest/download/peridiod-aarch64-linux

# ARMv7
wget https://github.com/peridio/peridiod/releases/latest/download/peridiod-armv7-linux
```

Install and run:

```bash
chmod +x peridiod-*-linux
sudo mv peridiod-*-linux /usr/local/bin/peridiod

# Run directly
peridiod start

# Or create a systemd service
sudo tee /etc/systemd/system/peridiod.service > /dev/null <<EOF
[Unit]
Description=Peridio Daemon
After=network-online.target

[Service]
ExecStart=/usr/local/bin/peridiod start
Restart=always
Environment="PERIDIO_CONFIG_FILE=/etc/peridiod/peridio-config.json"

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now peridiod
```

## Verification

After installation, verify peridiod is running:

```bash
# Systemd
systemctl status peridiod

# Docker
docker logs peridiod

# Process check
pgrep -a peridiod
```

Check connectivity to Peridio:

```bash
journalctl -u peridiod | grep -i connected
```
