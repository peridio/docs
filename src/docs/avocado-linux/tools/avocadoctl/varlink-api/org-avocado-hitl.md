---
title: org.avocado.Hitl
sidebar_position: 4
description: 'Varlink interface for hardware-in-the-loop NFS extension mounting and unmounting.'
---

# org.avocado.Hitl

Provides hardware-in-the-loop (HITL) testing support by mounting extension images from a remote NFS server. This allows developers to iterate on extension contents from a development workstation while the device runs the actual hardware, without needing to rebuild and flash extension images for each change.

## Interface Definition

```varlink
# Hardware-in-the-loop testing support
interface org.avocado.Hitl

# Mount NFS extensions from a remote server
method Mount(serverIp: string, serverPort: ?string, extensions: []string) -> ()

# Unmount NFS extensions
method Unmount(extensions: []string) -> ()

error MountFailed (extension: string, reason: string)
error UnmountFailed (extension: string, reason: string)
```

## Methods

### Mount

Mount one or more extension directories from an NFS server. The server must export the extension directories at paths matching the extension names. Once mounted, the extensions can be merged into the system using `org.avocado.Extensions.Merge`.

**Signature:** `Mount(serverIp: string, serverPort: ?string, extensions: []string) -> ()`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `serverIp` | `string` | IP address of the NFS server |
| `serverPort` | `?string` | NFS server port. Defaults to the standard NFS port if omitted. |
| `extensions` | `[]string` | List of extension names to mount from the server |

**Returns:** Empty on success.

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);
varlink_object_set_string(parameters, "serverIp", "192.168.1.100");

VarlinkArray *ext_list;
varlink_array_new(&ext_list);
varlink_array_append_string(ext_list, "my-app");
varlink_array_append_string(ext_list, "my-config");
varlink_object_set_array(parameters, "extensions", ext_list);

r = varlink_connection_call(connection, "org.avocado.Hitl.Mount", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

const char *error_name = NULL;
if (varlink_reply_is_error(reply, &error_name)) {
    fprintf(stderr, "Mount error: %s\n", error_name);

    const char *extension, *reason;
    varlink_object_get_string(reply, "extension", &extension);
    varlink_object_get_string(reply, "reason", &reason);
    fprintf(stderr, "  Extension: %s\n  Reason: %s\n", extension, reason);
} else {
    printf("NFS extensions mounted successfully.\n");
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

### Unmount

Unmount previously mounted NFS extensions.

**Signature:** `Unmount(extensions: []string) -> ()`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `extensions` | `[]string` | List of extension names to unmount |

**Returns:** Empty on success.

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);

VarlinkArray *ext_list;
varlink_array_new(&ext_list);
varlink_array_append_string(ext_list, "my-app");
varlink_array_append_string(ext_list, "my-config");
varlink_object_set_array(parameters, "extensions", ext_list);

r = varlink_connection_call(connection, "org.avocado.Hitl.Unmount", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

const char *error_name = NULL;
if (varlink_reply_is_error(reply, &error_name)) {
    fprintf(stderr, "Unmount error: %s\n", error_name);

    const char *extension, *reason;
    varlink_object_get_string(reply, "extension", &extension);
    varlink_object_get_string(reply, "reason", &reason);
    fprintf(stderr, "  Extension: %s\n  Reason: %s\n", extension, reason);
} else {
    printf("NFS extensions unmounted successfully.\n");
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

## Errors

### MountFailed

Returned when an NFS mount operation fails for a specific extension.

| Parameter | Type | Description |
|-----------|------|-------------|
| `extension` | `string` | The extension name that failed to mount |
| `reason` | `string` | Human-readable failure description |

**Trigger:** NFS server unreachable, export not found, permission denied, or filesystem error during mount.

### UnmountFailed

Returned when an NFS unmount operation fails for a specific extension.

| Parameter | Type | Description |
|-----------|------|-------------|
| `extension` | `string` | The extension name that failed to unmount |
| `reason` | `string` | Human-readable failure description |

**Trigger:** Extension not currently mounted, busy filesystem preventing unmount, or filesystem error during unmount.
