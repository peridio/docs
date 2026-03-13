---
title: org.avocado.RootAuthority
sidebar_position: 5
description: 'Varlink interface for querying the TUF trust anchor and signing key information.'
---

# org.avocado.RootAuthority

Provides read-only access to the device's TUF (The Update Framework) trust anchor. The trust anchor is the `root.json` metadata file stored at `/var/lib/avocado/metadata/root.json`. It contains the set of signing keys that the device trusts for verifying the TUF metadata chain: timestamp, snapshot, and targets roles.

This interface allows applications to inspect the trusted keys without parsing `root.json` directly, enabling integrations such as key rotation monitoring, compliance reporting, and device identity verification.

## Interface Definition

```varlink
# Trust anchor / root authority information
interface org.avocado.RootAuthority

type TrustedKey (
    keyId: string,
    keyType: string,
    roles: []string
)

type RootAuthorityInfo (
    version: int,
    expires: string,
    keys: []TrustedKey
)

# Show the trusted signing keys for this device
method Show() -> (authority: ?RootAuthorityInfo)

error NoRootAuthority ()
error ParseFailed (reason: string)
```

## Types

### TrustedKey

A single signing key trusted by this device.

| Field | Type | Description |
|-------|------|-------------|
| `keyId` | `string` | Hex-encoded key identifier (SHA-256 of the canonical key representation) |
| `keyType` | `string` | Key algorithm (e.g., `ed25519`, `ecdsa-sha2-nistp256`, `rsa`) |
| `roles` | `[]string` | TUF roles this key is authorized for (e.g., `root`, `targets`, `snapshot`, `timestamp`) |

### RootAuthorityInfo

The parsed contents of the TUF root metadata.

| Field | Type | Description |
|-------|------|-------------|
| `version` | `int` | Root metadata version number. Increments on each root key rotation. |
| `expires` | `string` | ISO 8601 expiration timestamp of the root metadata |
| `keys` | `[]TrustedKey` | All trusted signing keys declared in the root metadata |

## Methods

### Show

Return the device's current trust anchor information. If no `root.json` has been provisioned, the `authority` field in the response is `null`.

**Signature:** `Show() -> (authority: ?RootAuthorityInfo)`

**Parameters:** None.

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `authority` | `?RootAuthorityInfo` | Trust anchor information, or `null` if no root metadata exists |

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);
r = varlink_connection_call(connection, "org.avocado.RootAuthority.Show", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

const char *error_name = NULL;
if (varlink_reply_is_error(reply, &error_name)) {
    fprintf(stderr, "Error: %s\n", error_name);

    const char *reason;
    if (varlink_object_get_string(reply, "reason", &reason) >= 0) {
        fprintf(stderr, "Reason: %s\n", reason);
    }

    varlink_object_unref(reply);
    varlink_object_unref(parameters);
    return;
}

VarlinkObject *authority;
r = varlink_object_get_object(reply, "authority", &authority);
if (r < 0) {
    printf("No root authority provisioned on this device.\n");
    varlink_object_unref(reply);
    varlink_object_unref(parameters);
    return;
}

int64_t version;
const char *expires;
varlink_object_get_int(authority, "version", &version);
varlink_object_get_string(authority, "expires", &expires);

printf("Root metadata version: %ld\n", version);
printf("Expires:               %s\n", expires);

VarlinkArray *keys;
varlink_object_get_array(authority, "keys", &keys);

printf("Trusted keys:\n");
for (unsigned long i = 0; i < varlink_array_get_n_elements(keys); i++) {
    VarlinkObject *key;
    varlink_array_get_object(keys, i, &key);

    const char *key_id, *key_type;
    varlink_object_get_string(key, "keyId", &key_id);
    varlink_object_get_string(key, "keyType", &key_type);

    printf("  %s (%s)\n", key_id, key_type);

    VarlinkArray *roles;
    varlink_object_get_array(key, "roles", &roles);
    printf("    Roles: ");
    for (unsigned long j = 0; j < varlink_array_get_n_elements(roles); j++) {
        const char *role;
        varlink_array_get_string(roles, j, &role);
        if (j > 0) printf(", ");
        printf("%s", role);
    }
    printf("\n");
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

## Errors

### NoRootAuthority

Returned when no `root.json` file exists at `/var/lib/avocado/metadata/root.json`. This typically means the device has not yet been provisioned with a TUF trust anchor.

**Parameters:** None.

**Trigger:** Calling `Show` on a device that has not been provisioned with TUF root metadata.

### ParseFailed

Returned when `root.json` exists but cannot be parsed.

| Parameter | Type | Description |
|-----------|------|-------------|
| `reason` | `string` | Description of the parse error |

**Trigger:** Corrupt or malformed `root.json`, unsupported metadata version, or missing required fields in the root metadata file.
