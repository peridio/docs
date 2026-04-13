---
title: Runtime Manifest Specification
sidebar_position: 1
description: 'Complete specification of the Avocado Linux runtime manifest format including all fields, versioning, and image ID scheme.'
---

The runtime manifest is a JSON file that describes a complete runtime configuration, including the runtime identity, extensions, and optional OS bundle. It is stored at `/var/lib/avocado/runtimes/{runtime_id}/manifest.json`.

## Full Example (with OS bundle)

```json
{
  "manifest_version": 2,
  "id": "a1b2c3d4-e5f6-7890-abcd-ef0123456789",
  "built_at": "2026-03-12T10:30:00Z",
  "runtime": {
    "name": "production",
    "version": "1.2.0"
  },
  "extensions": [
    {
      "name": "my-app",
      "version": "2.1.0",
      "image_id": "f47ac10b-58cc-5372-8567-0e02b2c3d479",
      "sha256": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
    },
    {
      "name": "my-config",
      "version": "1.0.0",
      "image_id": "7c9e6679-7425-540b-8c36-e23b1e3b1e81",
      "sha256": "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3"
    }
  ],
  "os_bundle": {
    "image_id": "deadbeef-1234-5678-abcd-000000000000",
    "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "os_build_id": "avocado-os-20260312",
    "initramfs_build_id": "initramfs-20260312"
  }
}
```

## Minimal Example (extensions only)

```json
{
  "manifest_version": 1,
  "id": "abc12345-def6-7890-abcd-ef0123456789",
  "built_at": "2026-03-12T10:30:00Z",
  "runtime": {
    "name": "dev",
    "version": "0.1.0"
  },
  "extensions": [
    {
      "name": "my-app",
      "version": "0.1.0",
      "image_id": "f47ac10b-58cc-5372-8567-0e02b2c3d479",
      "sha256": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
    }
  ]
}
```

## Field Reference

| Field                          | Type    | Required | Description                                                                                                      |
| ------------------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `manifest_version`             | integer | Yes      | Schema version. `1` for extensions-only manifests, `2` adds `initramfs_build_id` support.                        |
| `id`                           | string  | Yes      | Unique identifier for this runtime, typically a UUID. Used as the directory name under `runtimes/`.              |
| `built_at`                     | string  | Yes      | ISO-8601 timestamp of when the runtime was built.                                                                |
| `runtime`                      | object  | Yes      | Runtime identity.                                                                                                |
| `runtime.name`                 | string  | Yes      | Human-readable runtime name (e.g., "production", "dev").                                                         |
| `runtime.version`              | string  | Yes      | Semantic version of the runtime.                                                                                 |
| `extensions`                   | array   | Yes      | List of extension images included in this runtime. May be empty.                                                 |
| `extensions[].name`            | string  | Yes      | Extension name.                                                                                                  |
| `extensions[].version`         | string  | Yes      | Extension version.                                                                                               |
| `extensions[].image_id`        | string  | No       | UUIDv5 content-addressable image identifier. When present, the image file is `{image_id}.raw`.                   |
| `extensions[].image_type`      | string  | No       | Image format. Absent for raw squashfs/erofs images, `"kab"` for KAB-wrapped images.                              |
| `extensions[].sha256`          | string  | Yes      | SHA-256 hash of the extension image file for integrity verification.                                             |
| `os_bundle`                    | object  | No       | Optional OS bundle reference for rootfs/initramfs updates.                                                       |
| `os_bundle.image_id`           | string  | Yes\*    | UUIDv5 identifier for the OS bundle image file. \*Required if `os_bundle` is present.                            |
| `os_bundle.sha256`             | string  | Yes\*    | SHA-256 hash of the OS bundle `.raw` file for integrity verification.                                            |
| `os_bundle.os_build_id`        | string  | No       | Identifies the rootfs version. Compared against the running system's `AVOCADO_OS_BUILD_ID` to detect OS changes. |
| `os_bundle.initramfs_build_id` | string  | No       | Identifies the initramfs version. Requires `manifest_version` >= 2.                                              |

## Image ID Scheme

Extension and OS bundle images use UUIDv5 content-addressable identifiers. IDs are generated deterministically from the fixed namespace UUID `7488fa35-6390-425b-bbbf-b156cfe1eed2` and the SHA-256 hash of the image contents. This provides deduplication: runtimes that share identical image content reference the same image file. The `sha256` field in each extension and OS bundle entry is used to verify image integrity before the runtime is applied.

## Image Resolution

When `image_id` is present:

```
/var/lib/avocado/images/{image_id}.raw
```

When `image_id` is absent (legacy):

```
/var/lib/avocado/images/{name}-{version}.raw
```

## Manifest Version History

| Version | Changes                                                                              |
| ------- | ------------------------------------------------------------------------------------ |
| 1       | Initial format with extensions and optional `os_bundle` (supports `os_build_id`).    |
| 2       | Adds `initramfs_build_id` to `os_bundle` for independent initramfs version tracking. |
