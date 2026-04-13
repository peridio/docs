---
title: 'Production-Ready Features'
sidebar_position: 4
description: 'Manufacturing support, compliance capabilities, and runtime security features in Avocado OS for production embedded deployments.'
---

# Production-Ready Features

The EU Cyber Resilience Act is raising the compliance floor. Avocado OS is built to meet it.

Security in production goes beyond boot verification and encryption. It includes how devices are manufactured, how software is tracked, how vulnerabilities are managed, and how compliance is demonstrated to auditors and regulators. Avocado integrates these concerns into the platform rather than leaving them as afterthoughts that require separate tooling and processes.

## Manufacturing security

Manufacturing is the most vulnerable point in a device's lifecycle. Hardware arrives blank from the fab. Software, keys, and identity must be provisioned — often on a contract manufacturing line where time is money and every second of setup per device is multiplied across thousands of units.

### Factory provisioning

Avocado's `avocado provision` command handles the full manufacturing flow:

- **Image flashing** — Write the complete system (bootloaders, root filesystem, extensions) to the target storage in a single operation
- **Key provisioning** — Program signing keys, encryption keys, and device identity into hardware security modules or OTP fuses
- **Device identity** — Assign unique device certificates for fleet enrollment and mutual TLS authentication
- **Hardware testing** — Manufacturing mode boot runs end-of-line tests (GPIO validation, peripheral checks, sensor calibration) before sealing the device

### Manufacturing boot mode

Avocado's boot mode system supports a dedicated manufacturing mode — a runtime composed specifically for the factory floor. Manufacturing mode includes test harnesses and calibration tools but excludes development utilities that shouldn't exist on production hardware. Because boot modes are implemented through extension composition (not separate firmware images), the core OS is identical across development, manufacturing, and production. Bug fixes propagate automatically.

### Line efficiency

Traditional provisioning workflows often require powering on the device, waiting for it to boot, establishing a network connection, then streaming software. Avocado supports offline provisioning — composing the entire system as blocks on disk that can be written directly to storage media without the device being powered on. For platforms that support it, this eliminates boot-wait time on the manufacturing line entirely.

## Compliance and auditability

### Reproducible builds

Every Avocado build is deterministic. The same `avocado.yaml` plus the same package feed version produces the same output, byte for byte. This means:

- Builds can be independently reproduced and verified by auditors
- Binary artifacts can be traced back to their exact source configuration
- Compliance evidence doesn't depend on "trust us" — it's independently verifiable

### SBOM generation

Avocado tracks every package, dependency, and version that goes into a build. Software Bill of Materials (SBOM) generation provides a complete manifest of every component in the deployed system — critical for vulnerability management and regulatory compliance.

### CVE patching cadence

Avocado's package feeds are maintained with regular security updates. When a CVE affects a package in the feed, patched versions are published and can be consumed by rebuilding with the updated feed. Because builds are fast (packages are pre-built, not compiled from source), security patches can be tested and deployed rapidly rather than waiting for multi-hour Yocto rebuilds.

### Regulatory alignment

Avocado doesn't claim certification against these standards — that's a product-level concern. But the platform provides the technical controls that these standards require, so teams aren't building compliance infrastructure from scratch.

#### EU Cyber Resilience Act (CRA)

The CRA applies to virtually all products with digital elements sold in the EU, effective 2027. It places direct obligations on the operating system layer:

- **Vulnerability handling** — Manufacturers must identify and document vulnerabilities, provide security updates for the product's lifetime, and report actively exploited vulnerabilities within 24 hours. This means the OS must have a clear CVE tracking and patching process, not ad-hoc updates whenever someone notices a problem.
- **SBOM requirement** — The CRA requires a machine-readable Software Bill of Materials identifying all components, including open-source dependencies. For an embedded OS, this means every package, library, and kernel module in the deployed image must be tracked and attributable.
- **Secure by default** — Products must ship with secure configurations out of the box. No default passwords, no unnecessary open ports, no debug interfaces left enabled in production. The OS must enforce this structurally, not rely on manual hardening checklists.
- **Secure update mechanism** — Automatic security updates must be available. The update mechanism itself must be secure — signed, verified, and resilient to tampering.

**How Avocado addresses this:** Deterministic builds mean every artifact is traceable to its exact source configuration. SBOM generation is built into the build process. The immutable root filesystem enforces secure-by-default — there's nothing to harden because the system can't be modified at runtime. The A/B atomic update architecture with cryptographic verification provides the secure update mechanism the CRA requires. Package feed maintenance with regular CVE patches provides the vulnerability handling cadence.

#### IEC 62443

IEC 62443 is the primary cybersecurity standard for industrial automation and control systems (IACS). It defines security levels (SL-1 through SL-4) and applies requirements to components, systems, and organizations. For an embedded OS running in an industrial context, the relevant parts are:

- **Component security (62443-4-2)** — Requires identification and authentication, use control, data integrity, data confidentiality, restricted data flow, timely response to events, and resource availability. The OS must provide primitives for all of these — not just application-level controls, but system-level enforcement.
- **Secure development lifecycle (62443-4-1)** — The development process must follow secure coding practices, include threat modeling, and maintain a vulnerability management process. Reproducible builds and version-controlled package feeds are directly relevant.
- **Defense in depth** — IEC 62443 explicitly requires multiple independent layers of security. A single control (e.g., encryption alone) is insufficient — the architecture must combine multiple mechanisms so that failure of one doesn't compromise the system.
- **Security levels** — Higher SLs require stronger controls. SL-2 (protection against intentional violation with simple means) is the baseline for most industrial deployments. SL-3 (sophisticated means) requires hardware-backed security.

**How Avocado addresses this:** The layered security architecture — secure boot, dm-verity, LUKS encryption, extension isolation — provides the defense-in-depth that IEC 62443 requires. Hardware-backed key storage supports SL-3 deployments. The immutable root with verified extensions provides data integrity at the OS level. Audit logging and boot mode separation support access control and use control requirements. Atomic updates with rollback provide resource availability during maintenance.

#### Common Criteria (ISO/IEC 15408)

Common Criteria evaluations assess products against a defined set of security functional requirements (SFRs) grouped into a Protection Profile. For embedded OS components, the relevant requirements typically include:

- **Security domain separation** — The system must enforce boundaries between security domains. Processes in one domain should not be able to access resources in another without explicit authorization.
- **Trusted boot** — The system must establish a chain of trust from hardware through to the operating environment. All code that executes must be verified against a known-good state.
- **Audit** — Security-relevant events must be logged, and logs must be protected from tampering. The OS must record boot events, authentication attempts, configuration changes, and integrity verification results.
- **Self-protection** — The OS must protect its own integrity. Runtime modification of system code or security policy must be prevented.

**How Avocado addresses this:** Extension isolation enforces security domain separation structurally — each extension is an independent overlay that cannot modify the core OS or other extensions. Secure boot establishes the trusted boot chain from silicon through application code. The read-only root filesystem provides self-protection — there is no mechanism to modify system code at runtime, even with root access. Systemd journal logging captures boot and runtime events with tamper-evident properties when combined with the immutable root.

#### FIPS 140-3

FIPS 140-3 governs cryptographic modules used in federal systems (US and Canada) and is increasingly referenced by other regulatory frameworks. It applies directly to the cryptographic implementations within the OS:

- **Validated cryptographic algorithms** — All cryptography used for security functions must use NIST-approved algorithms (AES, SHA-2/3, ECDSA, etc.) from a validated implementation. Using the right algorithm with an unvalidated implementation doesn't count.
- **Key management** — Cryptographic keys must be generated, stored, and destroyed according to specific requirements. Keys must not be accessible in plaintext outside of a validated cryptographic boundary.
- **Physical security (Level 2+)** — At higher levels, the cryptographic module must provide tamper evidence or tamper resistance. This maps to hardware security modules (TPMs, secure enclaves) rather than software-only implementations.
- **Self-tests** — The cryptographic module must perform self-tests at power-on and conditionally during operation to verify that algorithms are functioning correctly.

**How Avocado addresses this:** Avocado uses the Linux kernel's crypto subsystem, which includes FIPS-validated implementations (via the kernel FIPS mode and certified modules like OpenSSL FIPS provider). Hardware-backed key storage through TPMs, TrustZone TEEs, and secure enclaves keeps keys within validated cryptographic boundaries. LUKS encryption uses AES-256-XTS — a NIST-approved algorithm and mode. The platform supports FIPS-mode kernel configuration for deployments that require validated cryptography.

#### GDPR and HIPAA

These data protection regulations apply when embedded devices process personal data (GDPR — EU residents) or protected health information (HIPAA — US healthcare). The OS-level implications are:

- **Data at rest encryption** — Personal data stored on the device must be encrypted. If the device is lost or stolen, the data must be inaccessible without the encryption key.
- **Access controls** — The system must enforce role-based or policy-based access to sensitive data. Not all software on the device should be able to read all data.
- **Audit trails** — Access to personal data must be logged. The system must be able to demonstrate who (or what process) accessed what data and when.
- **Data minimization** — The system should only store the personal data necessary for its function. The OS architecture should support selective encryption and data lifecycle management.
- **Right to erasure** — For GDPR, the system must be able to cryptographically erase personal data on request. This means the OS must support secure key destruction, which effectively renders the encrypted data unrecoverable.

**How Avocado addresses this:** LUKS encryption provides data at rest protection for the writable var partition where application data lives. Per-application encryption domains through the extension system support data minimization — different data classes can be encrypted with different keys. Secure key destruction via the hardware security module enables cryptographic erasure for right-to-erasure requests. Extension isolation provides structural access control boundaries between application components. Systemd journal logging provides audit trail capabilities.

## Runtime security

### Immutable system core

The read-only root filesystem prevents runtime modification of system binaries, libraries, and configuration. Even with root access in production mode, the SquashFS root cannot be written to. Combined with dm-verity, this ensures that the system running in the field is exactly the system that was built and signed.

### Extension isolation

System extensions overlay onto the immutable root but maintain clear boundaries. Each extension is independently signed, independently verified, and independently updatable. A compromised application extension cannot modify the core OS or other extensions — the overlay architecture enforces this structurally, not just by policy.

### Recovery mode

When a device enters an unrecoverable state — persistent boot failures, corrupted var partition, or other critical faults — Avocado's recovery mode provides a minimal environment focused on system restoration. Recovery mode operates with minimal dependencies, providing just enough functionality to re-provision the device over the network or from local media.
