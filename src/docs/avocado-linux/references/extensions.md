---
title: 'Extensions'
description: 'Avocado Linux extensions system - composable System Extensions (sysext) and Configuration Extensions (confext) for modular embedded development.'
---

Extensions are the foundational building block of Avocado systems. They provide the mechanism for delivering code, packages, configurations, and services into the immutable base system. Every piece of user-defined functionality ships as an extension, from application binaries to configuration files to kernel modules.

Avocado's extension system builds upon systemd's sysext and confext mechanisms while extending them with declarative configuration, SDK integration, and build-time tooling. Extensions are defined in your `avocado.yaml` configuration and composed together at runtime to form the complete system.

## Extension types

Avocado supports two extension types that correspond to systemd's extension mechanisms:

**System Extensions (sysext)** extend the `/usr/` and `/opt/` directory hierarchies. Use sysext for application binaries, libraries, systemd service units, and any files that belong in the system directories.

**Configuration Extensions (confext)** extend the `/etc/` hierarchy. Use confext for configuration files, user accounts, network settings, and service configurations.

Extensions specify their type using the `types` array:

```yaml
extensions:
  my-app:
    types:
      - sysext
      - confext
    version: '1.0.0'
```

An extension can be both sysext and confext simultaneously, allowing a single extension to deliver both application binaries and their configuration.

## Defining extensions

Extensions are defined in the `extensions` section of your `avocado.yaml`. The primary method is inline definition, where the extension configuration exists directly in your project configuration. See the [config schema](../tools/avocado-cli/config-schema) for complete configuration reference.

### Basic extension with packages

The simplest extension installs packages from the Avocado repository:

```yaml
extensions:
  networking-tools:
    types:
      - sysext
    version: '1.0.0'
    packages:
      curl: '*'
      wget: '*'
      iperf3: '*'
```

Package versions can be specified as `"*"` for latest, or pinned to specific versions:

```yaml
packages:
  nginx: '1.24.0'
  openssl: '>=3.0.0'
```

### Adding files with overlays

Overlays include arbitrary files in your extension. The `overlay` property specifies a path relative to `src_dir`, which defaults to the directory containing your `avocado.yaml` configuration file:

```yaml
extensions:
  my-app:
    types:
      - sysext
      - confext
    version: '1.0.0'
    overlay: overlays/my-app
```

In this example, the overlay directory is located at `./overlays/my-app/` relative to the configuration file. The overlay directory structure determines where files are placed in the extension:

```
project/
├── avocado.yaml
└── overlays/
    └── my-app/
        ├── usr/
        │   ├── bin/
        │   │   └── my-app
        │   └── lib/
        │       └── systemd/
        │           └── system/
        │               └── my-app.service
        └── etc/
            └── my-app/
                └── config.yaml
```

Files under `usr/` become part of the sysext image. Files under `etc/` become part of the confext image. When the extension is built, these files are packaged into the appropriate extension images.

### Enabling systemd services

Extensions can automatically enable systemd services when merged:

```yaml
extensions:
  my-app:
    types:
      - sysext
      - confext
    version: '1.0.0'
    overlay: overlays/my-app
    enable_services:
      - my-app.service
      - my-app-healthcheck.timer
```

The specified services are enabled in the extension's systemd configuration, ensuring they start automatically when the extension is active.

### User and group configuration

Configuration extensions can manage user accounts and groups. The `users` and `groups` properties are intended for real user accounts that require login credentials, home directories, and shell access:

```yaml
extensions:
  system-config:
    types:
      - confext
    version: '1.0.0'
    users:
      developer:
        password: ''
        shell: /bin/bash
        home: /home/developer
        groups:
          - wheel
          - docker
    groups:
      docker:
        gid: 999
```

For service users (accounts used by daemons and system services), use systemd-sysusers configuration files in your extension overlay instead:

```
overlays/my-app/
└── usr/
    └── lib/
        └── sysusers.d/
            └── my-app.conf
```

The sysusers.d configuration file follows the [systemd-sysusers format](https://www.freedesktop.org/software/systemd/man/latest/sysusers.d.html):

```
# my-app.conf
u my-app - "My Application Service" /var/lib/my-app /bin/false
```

This approach ensures service users are created with appropriate restrictions and follows systemd conventions for system account management.

### Loading kernel modules

Extensions that include kernel modules can specify modules to load on activation:

```yaml
extensions:
  container-runtime:
    types:
      - sysext
    version: '1.0.0'
    packages:
      kernel-module-overlay: '*'
      kernel-module-br-netfilter: '*'
    modprobe:
      - overlay
      - br_netfilter
```

### Merge and unmerge hooks

Extensions can run custom commands when merged or unmerged. Use `on_merge` for commands that should run after the extension is activated, and `on_unmerge` for cleanup before deactivation:

```yaml
extensions:
  my-app:
    types:
      - sysext
      - confext
    version: '1.0.0'
    overlay: overlays/my-app
    enable_services:
      - my-app.service
    on_merge:
      - systemctl restart --no-block my-app.service
    on_unmerge:
      - systemctl stop my-app.service
```

Common use cases for merge hooks:

- Restarting services that need to pick up new configuration
- Running database migrations
- Triggering cache invalidation
- Executing initialization scripts

Certain hooks are added automatically based on extension contents:

- Extensions containing kernel modules automatically run `depmod`
- Extensions containing shared libraries in `ld.so.conf.d` automatically run `ldconfig`
- Extensions containing sysusers.d configuration files automatically run `systemd-sysusers`

## Runtimes and extension composition

Runtimes define which extensions are included in a deployment. Different runtimes can compose different sets of extensions for various environments. See the [config schema](../tools/avocado-cli/config-schema) for runtime configuration options.

```yaml
runtimes:
  dev:
    extensions:
      - avocado-ext-dev
      - avocado-ext-sshd-dev
      - avocado-bsp-{{ avocado.target }}
      - config
      - app
    packages:
      avocado-img-bootfiles: '*'
      avocado-img-rootfs: '*'
      avocado-img-initramfs: '*'

  prod:
    extensions:
      - avocado-bsp-{{ avocado.target }}
      - config-prod
      - app
    packages:
      avocado-img-bootfiles: '*'
      avocado-img-rootfs: '*'
      avocado-img-initramfs: '*'
```

This pattern enables you to include development tools, debugging utilities, and verbose logging in `dev` while keeping `prod` minimal and secure.

## Building extensions

Extensions are built using the Avocado CLI. For complete build command options, see the [ext build command](../tools/avocado-cli/commands/ext/build) documentation.

```bash
# Build a specific extension
avocado ext build --ext my-app

# Build all extensions in a runtime
avocado build --runtime dev
```

The build process:

1. Installs SDK packages required by the extension
2. Runs compile scripts for any source dependencies
3. Runs install scripts to populate the extension sysroot
4. Installs runtime packages into the extension sysroot
5. Copies overlay files into the appropriate locations
6. Generates extension release files with metadata
7. Creates extension images (squashfs or directory)

Built extensions are output to the project's build directory as either raw directories or squashfs images suitable for deployment.

## Extension merging at runtime

At boot time, `avocadoctl` merges extensions into the running system using systemd-sysext and systemd-confext:

```bash
# Merge all extensions
avocadoctl merge

# List merged extensions
avocadoctl status

# Refresh extensions (unmerge and re-merge)
avocadoctl refresh
```

The merge process:

1. Scans the extensions directory for available extensions
2. Filters extensions by scope (initrd vs system based on current environment)
3. Validates extension release files for compatibility
4. Activates sysext extensions via systemd-sysext (overlays `/usr/` and `/opt/`)
5. Activates confext extensions via systemd-confext (overlays `/etc/`)
6. Runs post-merge hooks defined in extension release files (depmod, ldconfig, etc.)

Extensions are automatically merged during boot by systemd services. The base system remains immutable while extensions provide dynamic functionality.

### Extension release files

Each extension contains a release file that defines its behavior:

For sysext: `/usr/lib/extension-release.d/extension-release.<name>`
For confext: `/etc/extension-release.d/extension-release.<name>`

Release files contain:

```
ID=_any
EXTENSION_RELOAD_MANAGER=1
SYSEXT_SCOPE=system
AVOCADO_ON_MERGE="depmod"
```

The `AVOCADO_ON_MERGE` field specifies commands to run after merging (e.g., `depmod` for kernel modules, `ldconfig` for shared libraries).

## External extension sources

Extensions can be sourced from external locations for reusability and vendor support. External extensions are identified by the presence of a `source` field.

### Board support extensions

For each supported target, Avocado provides a pre-built board support package (BSP) extension that delivers comprehensive hardware enablement. These extensions include kernel modules, device drivers, firmware, and platform-specific packages required to fully utilize the target hardware.

BSP extensions use templated names that resolve to the current target:

```yaml
extensions:
  avocado-bsp-{{ avocado.target }}:
    source:
      type: package
      version: '*'
```

When building for `raspberrypi4`, this resolves to `avocado-bsp-raspberrypi4`. When building for `jetson-orin-nano-devkit`, it resolves to `avocado-bsp-jetson-orin-nano-devkit`.

BSP extensions typically provide:

- Kernel modules for board-specific peripherals (GPIO, I2C, SPI controllers)
- Device tree overlays for hardware configuration
- Firmware blobs for wireless, GPU, and other subsystems
- Platform drivers for power management and thermal control
- Provisioning profiles for board-specific flashing workflows
- SDK compile sections for building against board-specific libraries

Including the BSP extension for your target ensures the system has complete hardware support without manually identifying and installing individual driver packages.

### Package repository

Extensions published to the Avocado package repository:

```yaml
extensions:
  avocado-ext-dev:
    source:
      type: package
      version: '*'
```

### Git repository

Extensions from git repositories support branch, tag, or commit references:

```yaml
extensions:
  custom-drivers:
    source:
      type: git
      url: https://github.com/organization/extensions.git
      ref: v1.2.0
```

For monorepos, sparse checkout limits the clone to specific paths:

```yaml
extensions:
  networking:
    source:
      type: git
      url: https://github.com/organization/extensions.git
      ref: main
      sparse_checkout:
        - extensions/networking
```

### Local path

Path-based extensions reference local directories, useful for monorepos or development:

```yaml
extensions:
  shared-libs:
    source:
      type: path
      path: ../shared/extensions/libs
```

### Including configuration from external extensions

External extensions can contribute configuration sections to your project. The `include` property specifies which sections to import:

```yaml
extensions:
  avocado-bsp-{{ avocado.target }}:
    source:
      type: package
      version: '*'
      include:
        - provision_profiles.tegraflash
        - sdk.compile.*
```

Supported include patterns:

| Pattern                         | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `provision_profiles.*`          | Vendor provisioning profiles (tegraflash, sd-card, USB) |
| `provision_profiles.tegraflash` | Specific provisioning profile                           |
| `sdk.packages.*`                | Build-time SDK package dependencies                     |
| `sdk.compile.*`                 | Cross-compilation sections                              |

This mechanism enables BSP extensions to provide complete toolchain support, provisioning workflows, and build scripts without requiring manual configuration.

## Organizational patterns

Structure extensions based on your project requirements:

### By team ownership

Separate extensions by team responsibility:

```yaml
extensions:
  platform-base:
    # Platform team owns core system configuration

  networking:
    # Networking team owns connectivity

  application:
    # Application team owns business logic
```

### By application

Each application as an independent extension:

```yaml
extensions:
  web-frontend:
    types: [sysext]
    packages:
      nginx: '*'

  api-service:
    types: [sysext]
    packages:
      api-server: '*'

  database:
    types: [sysext, confext]
    packages:
      postgresql: '*'
```

### By environment

Separate debug and production concerns:

```yaml
extensions:
  my-app:
    types: [sysext]
    version: '1.0.0'
    packages:
      my-app: '*'

  my-app-debug:
    types: [sysext]
    version: '1.0.0'
    packages:
      my-app-debug-symbols: '*'
      gdb: '*'
      strace: '*'
      ltrace: '*'

runtimes:
  dev:
    extensions:
      - my-app
      - my-app-debug

  prod:
    extensions:
      - my-app
```

Debug extensions can be enabled in production when needed without rebuilding the application.

## Build-time SDK integration

Extensions integrate with the Avocado SDK for cross-compilation. Extensions can declare SDK dependencies and reference `sdk.compile` sections for building source code. See the [config schema](../tools/avocado-cli/config-schema) for complete SDK configuration options.

### Extension SDK packages

Extensions can specify SDK packages required for building:

```yaml
extensions:
  my-rust-app:
    types:
      - sysext
    version: '1.0.0'
    sdk:
      packages:
        nativesdk-rust: '*'
        rust-cross-canadian-aarch64: '*'
        nativesdk-cargo: '*'
```

These packages are installed in the SDK container when building the extension.

### Compile sections

For extensions that include compiled code, define a compile section in the SDK configuration and reference it from the extension:

```yaml
extensions:
  my-app:
    types:
      - sysext
    version: '1.0.0'
    packages:
      my-app-binary:
        compile: my-app-build
        install: scripts/install-app.sh

sdk:
  compile:
    my-app-build:
      compile: scripts/compile-app.sh
      packages:
        openssl-dev: '*'
        zlib-dev: '*'
```

The compile script runs in the SDK container with access to the cross-compilation toolchain. The install script copies built artifacts into the extension sysroot.

### Kernel module compilation

Kernel modules require the kernel development sources and cross-compiler:

```yaml
extensions:
  custom-driver:
    types:
      - sysext
    version: '1.0.0'
    modprobe:
      - custom_driver
    packages:
      custom-driver-module:
        compile: driver-build
        install: scripts/install-driver.sh
    sdk:
      packages:
        nativesdk-gcc: '*'
        nativesdk-make: '*'
        packagegroup-cross-canadian-avocado-{{ avocado.target }}: '*'

sdk:
  compile:
    driver-build:
      compile: scripts/compile-driver.sh
      packages:
        kernel-devsrc: '*'
```

## Extension scopes

Scopes control when extensions are activated during the boot process:

| Scope    | Description                            |
| -------- | -------------------------------------- |
| `system` | Activated after rootfs mount (default) |
| `initrd` | Activated during initramfs phase       |

Extensions default to `system` scope. Specify alternative scopes:

```yaml
extensions:
  early-drivers:
    types:
      - sysext
    scopes:
      - initrd
      - system
```

Extensions with `initrd` scope are included in the initramfs and activated before the root filesystem mounts.

### Initramfs extensions

Use initramfs extensions for functionality required before the root filesystem is available:

- Storage drivers for accessing the root device
- Encryption modules for decrypting the root filesystem
- Platform drivers for hardware initialization
- Network modules for network-booted systems

```yaml
extensions:
  disk-encryption:
    types:
      - sysext
    scopes:
      - initrd
    version: '1.0.0'
    packages:
      cryptsetup: '*'
      kernel-module-dm-crypt: '*'
    modprobe:
      - dm-crypt
      - aes
```

Extensions with only `initrd` scope are not merged in userspace. Extensions with both `initrd` and `system` scopes are available in both phases.

## Mutability options

Mutability determines whether merged extension hierarchies are writable or read-only once activated. In immutable mode, extension content is overlaid as read-only. In mutable mode, writes are redirected through write routing directories or temporarily allowed depending on the mode.

Mutability is configured through the `avocadoctl` configuration file (`/etc/avocadoctl/config.toml`) with separate settings for sysext and confext:

```toml
[avocado.ext]
# System extensions mutability (/usr, /opt)
sysext_mutable = "ephemeral"

# Configuration extensions mutability (/etc)
confext_mutable = "ephemeral"
```

Available mutability modes:

| Mode               | Description                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `no`               | Force immutable mode. Extensions are merged read-only even if write routing directories exist.                                                    |
| `auto`             | Enable mutable mode only if write routing directories exist under `/var/lib/extensions.mutable/`. Otherwise, use immutable mode.                  |
| `yes`              | Force mutable mode. Write routing directories are created automatically if missing. Writes are redirected to `/var/lib/extensions.mutable/`.      |
| `import`           | Immutable mode, but existing contents in write routing directories are merged into the host filesystem.                                           |
| `ephemeral`        | Mutable mode where writes go to temporary storage and are discarded when the extension is unmerged. Changes are not persisted.                    |
| `ephemeral-import` | Combination mode: write routing directory contents are merged (like `import`), but changes made during the merged state are discarded at unmerge. |

The default mode is `ephemeral`, which allows testing and development workflows while preventing unintended persistence of changes to extensions.

For detailed information on mutability modes and write routing behavior, see the systemd documentation:

- [systemd-sysext mutability modes](https://www.freedesktop.org/software/systemd/man/latest/systemd-sysext.html#--mutable=BOOL)
- [sysext.conf configuration](https://www.freedesktop.org/software/systemd/man/latest/sysext.conf.html)

## Configuration reference

| Property          | Type   | Description                                       |
| ----------------- | ------ | ------------------------------------------------- |
| `types`           | array  | Extension types: `sysext`, `confext`              |
| `version`         | string | Semantic version                                  |
| `scopes`          | array  | Activation scopes: `system`, `initrd`             |
| `overlay`         | string | Path to overlay directory (relative to `src_dir`) |
| `packages`        | object | Runtime package dependencies                      |
| `sdk.packages`    | object | Build-time SDK dependencies                       |
| `enable_services` | array  | Systemd services to enable                        |
| `modprobe`        | array  | Kernel modules to load                            |
| `on_merge`        | array  | Commands to run after merge                       |
| `on_unmerge`      | array  | Commands to run before unmerge                    |
| `users`           | object | Real user account configuration                   |
| `groups`          | object | Group configuration                               |
| `source`          | object | External source (package, git, path)              |

## Development workflow

The extension system transforms embedded development from edit-compile-flash-boot-test cycles into interactive workflows:

- **Live NFS-mounted extensions**: Changes reflect immediately on target devices
- **Interactive debugging**: GDB server integration with live code updates
- **Hot reloading**: Update application code without losing system state

Extensions integrate with Avocado's SDK for declarative package selection, custom toolchain extensions, and versioned dependencies across development environments.

Learn how to leverage these capabilities with [hardware-in-the-loop development](../guides/hardware-in-the-loop).

## Security and composition

Extensions maintain security through:

- Compatibility enforcement via release files
- Cryptographic signature verification
- Integrity checking during runtime

Multiple extensions compose together with clear isolation boundaries. Each extension contains complete dependencies and cannot modify the immutable base system. The base system provides the trusted foundation while extensions deliver functionality.

A typical production composition:

```
Base Avocado OS (immutable, verified)
├── BSP extension (board support, drivers)
├── Container runtime extension
├── Application extension
└── Configuration extension (environment-specific)
```

Extensions enable atomic updates, independent rollback capability, and staged deployment across device fleets while maintaining the same composability and security properties from development through production.
