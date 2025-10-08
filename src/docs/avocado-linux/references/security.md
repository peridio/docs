---
title: 'Security'
description: 'Enterprise-grade security features in Avocado Linux - hardware-backed secure boot, filesystem integrity verification, and encrypted storage with atomic updates.'
---

Avocado supports enterprise-grade security capabilities including hardware-backed secure boot, filesystem integrity verification, hardware-encrypted storage, and atomic updates with automatic rollback. The platform provides the foundation and tooling to implement these production-ready security features while maintaining development velocity.

## Secure boot support

Avocado enables hardware root of trust implementation with support for unbroken cryptographic chains:

- Silicon-level bootloader validation capabilities
- Kernel image cryptographic verification support
- System extension validation framework
- Application authentication mechanisms

Multi-vendor signing authority support accommodates complex supply chains while enabling end-to-end trust establishment.

## Filesystem integrity capabilities

The platform supports dm-verity implementation for real-time block-level integrity verification through Merkle tree hashing. Avocado's extension system architecture enables independent hash trees for granular validation and rollback capabilities when configured.

## Hardware-Backed Encryption Support

Avocado facilitates LUKS encryption implementation with AES-256, supporting various hardware security elements:

- TPM key sealing capabilities
- Secure enclave integration support
- Hardware-unique key derivation options
- Remote attestation framework

For systems without dedicated security hardware, the platform supports split-knowledge derivation approaches with Argon2id.

## Atomic update architecture

Avocado's dual partition A/B update architecture supports:

- Cryptographic signature validation frameworks
- Comprehensive integrity verification capabilities
- Automatic rollback mechanisms
- Differential update support for bandwidth efficiency

## Production-Ready Features

**Manufacturing**: Factory mode support, hardware personalization capabilities, zero-touch provisioning frameworks

**Runtime**: Continuous integrity monitoring support, behavioral analysis capabilities, automated response mechanisms

**Compliance**: Architecture supports Common Criteria, FIPS 140-2, IEC 62443, ISO 27001, GDPR, HIPAA, SOX, PCI DSS requirements with comprehensive audit trail capabilities

Avocado's security architecture enables defense-in-depth protection while preserving the development velocity and composability that defines the platform's approach to embedded Linux.
