---
title: org.avocado.Extensions
sidebar_position: 2
description: 'Varlink interface for managing Avocado Linux system extensions - merge, unmerge, enable, disable, and query status.'
---

# org.avocado.Extensions

Manages Avocado Linux system extensions (sysext and confext images). This interface provides methods to list, merge, unmerge, refresh, enable, disable, and query the status of extensions.

## Interface Definition

```varlink
# Extension management for Avocado Linux system extensions
interface org.avocado.Extensions

type Extension (
    name: string,
    version: ?string,
    path: string,
    isSysext: bool,
    isConfext: bool,
    isDirectory: bool
)

type ExtensionStatus (
    name: string,
    version: ?string,
    isSysext: bool,
    isConfext: bool,
    isMerged: bool,
    origin: ?string,
    imageId: ?string
)

# List all available extensions in the extensions directory
method List() -> (extensions: []Extension)

# Merge extensions using systemd-sysext and systemd-confext
# Supports streaming: client may set more=true to receive per-message progress
method Merge() -> (message: string, done: bool)

# Unmerge extensions
# Supports streaming: client may set more=true to receive per-message progress
method Unmerge(unmount: ?bool) -> (message: string, done: bool)

# Refresh extensions (unmerge then merge)
# Supports streaming: client may set more=true to receive per-message progress
method Refresh() -> (message: string, done: bool)

# Enable extensions for a specific OS release version
method Enable(extensions: []string, osRelease: ?string) -> (enabled: int, failed: int)

# Disable extensions for a specific OS release version
method Disable(extensions: ?[]string, all: ?bool, osRelease: ?string) -> (disabled: int, failed: int)

# Show status of merged extensions
method Status() -> (extensions: []ExtensionStatus)

error ExtensionNotFound (name: string)
error MergeFailed (reason: string)
error UnmergeFailed (reason: string)
error ConfigurationError (message: string)
error CommandFailed (command: string, message: string)
```

## Types

### Extension

Represents an extension image or directory available on the filesystem.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Extension name (derived from the image filename) |
| `version` | `?string` | Extension version, if embedded in the image metadata |
| `path` | `string` | Absolute path to the extension image or directory |
| `isSysext` | `bool` | `true` if this is a system extension (overlays `/usr`) |
| `isConfext` | `bool` | `true` if this is a configuration extension (overlays `/etc`) |
| `isDirectory` | `bool` | `true` if the extension is a plain directory rather than an image file |

### ExtensionStatus

Represents the current status of an extension, including whether it is merged into the running system.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Extension name |
| `version` | `?string` | Extension version |
| `isSysext` | `bool` | `true` if this is a system extension |
| `isConfext` | `bool` | `true` if this is a configuration extension |
| `isMerged` | `bool` | `true` if the extension is currently merged into the root filesystem |
| `origin` | `?string` | Origin identifier (e.g., the TUF target name) |
| `imageId` | `?string` | Image digest or build identifier |

## Methods

### List

List all available extensions in the extensions directory.

**Signature:** `List() -> (extensions: []Extension)`

**Parameters:** None.

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `extensions` | `[]Extension` | Array of available extension objects |

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);
r = varlink_connection_call(connection, "org.avocado.Extensions.List", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkArray *extensions;
varlink_object_get_array(reply, "extensions", &extensions);

for (unsigned long i = 0; i < varlink_array_get_n_elements(extensions); i++) {
    VarlinkObject *ext;
    varlink_array_get_object(extensions, i, &ext);

    const char *name, *path;
    bool is_sysext, is_confext;

    varlink_object_get_string(ext, "name", &name);
    varlink_object_get_string(ext, "path", &path);
    varlink_object_get_bool(ext, "isSysext", &is_sysext);
    varlink_object_get_bool(ext, "isConfext", &is_confext);

    printf("%-30s  sysext=%d  confext=%d  %s\n", name, is_sysext, is_confext, path);
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

### Merge

Merge all enabled extensions into the running system using `systemd-sysext` and `systemd-confext`.

**Signature:** `Merge() -> (message: string, done: bool)`

**Parameters:** None.

**Returns (streaming):**

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` | Progress message describing the current step |
| `done` | `bool` | `true` on the final reply |

**Streaming:** Yes. Call with `VARLINK_CALL_MORE` to receive progress updates.

**C Example:**

```c
VarlinkObject *parameters = NULL;
long r;

varlink_object_new(&parameters);

r = varlink_connection_call(connection, "org.avocado.Extensions.Merge",
                            parameters, VARLINK_CALL_MORE, NULL);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkObject *reply = NULL;
while ((r = varlink_connection_reply(connection, &reply)) >= 0) {
    const char *message;
    varlink_object_get_string(reply, "message", &message);
    printf("[merge] %s\n", message);

    bool done;
    varlink_object_get_bool(reply, "done", &done);

    varlink_object_unref(reply);
    reply = NULL;

    if (done)
        break;
}

varlink_object_unref(parameters);
```

### Unmerge

Unmerge extensions from the running system.

**Signature:** `Unmerge(unmount: ?bool) -> (message: string, done: bool)`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `unmount` | `?bool` | If `true`, also unmount the extension images. Defaults to `false`. |

**Returns (streaming):**

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` | Progress message describing the current step |
| `done` | `bool` | `true` on the final reply |

**Streaming:** Yes. Call with `VARLINK_CALL_MORE` to receive progress updates.

**C Example:**

```c
VarlinkObject *parameters = NULL;
long r;

varlink_object_new(&parameters);
varlink_object_set_bool(parameters, "unmount", true);

r = varlink_connection_call(connection, "org.avocado.Extensions.Unmerge",
                            parameters, VARLINK_CALL_MORE, NULL);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkObject *reply = NULL;
while ((r = varlink_connection_reply(connection, &reply)) >= 0) {
    const char *message;
    varlink_object_get_string(reply, "message", &message);
    printf("[unmerge] %s\n", message);

    bool done;
    varlink_object_get_bool(reply, "done", &done);

    varlink_object_unref(reply);
    reply = NULL;

    if (done)
        break;
}

varlink_object_unref(parameters);
```

### Refresh

Unmerge and then re-merge all enabled extensions. This is equivalent to calling `Unmerge` followed by `Merge`.

**Signature:** `Refresh() -> (message: string, done: bool)`

**Parameters:** None.

**Returns (streaming):**

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` | Progress message describing the current step |
| `done` | `bool` | `true` on the final reply |

**Streaming:** Yes. Call with `VARLINK_CALL_MORE` to receive progress updates.

**C Example:**

```c
VarlinkObject *parameters = NULL;
long r;

varlink_object_new(&parameters);

r = varlink_connection_call(connection, "org.avocado.Extensions.Refresh",
                            parameters, VARLINK_CALL_MORE, NULL);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkObject *reply = NULL;
while ((r = varlink_connection_reply(connection, &reply)) >= 0) {
    const char *message;
    varlink_object_get_string(reply, "message", &message);
    printf("[refresh] %s\n", message);

    bool done;
    varlink_object_get_bool(reply, "done", &done);

    varlink_object_unref(reply);
    reply = NULL;

    if (done)
        break;
}

varlink_object_unref(parameters);
```

### Enable

Enable one or more extensions for a specific OS release version. Enabling an extension makes it available for merging.

**Signature:** `Enable(extensions: []string, osRelease: ?string) -> (enabled: int, failed: int)`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `extensions` | `[]string` | List of extension names to enable |
| `osRelease` | `?string` | Target OS release version. If omitted, the current OS release is used. |

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | `int` | Number of extensions successfully enabled |
| `failed` | `int` | Number of extensions that failed to enable |

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

r = varlink_connection_call(connection, "org.avocado.Extensions.Enable", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

const char *error_name = NULL;
if (varlink_reply_is_error(reply, &error_name)) {
    fprintf(stderr, "Error: %s\n", error_name);
} else {
    int64_t enabled, failed;
    varlink_object_get_int(reply, "enabled", &enabled);
    varlink_object_get_int(reply, "failed", &failed);
    printf("Enabled: %ld, Failed: %ld\n", enabled, failed);
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

### Disable

Disable extensions for a specific OS release version. Disabled extensions will not be included in subsequent merge operations.

**Signature:** `Disable(extensions: ?[]string, all: ?bool, osRelease: ?string) -> (disabled: int, failed: int)`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `extensions` | `?[]string` | List of extension names to disable. Omit if using `all`. |
| `all` | `?bool` | If `true`, disable all extensions. |
| `osRelease` | `?string` | Target OS release version. If omitted, the current OS release is used. |

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `disabled` | `int` | Number of extensions successfully disabled |
| `failed` | `int` | Number of extensions that failed to disable |

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);
varlink_object_set_bool(parameters, "all", true);

r = varlink_connection_call(connection, "org.avocado.Extensions.Disable", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

int64_t disabled, failed;
varlink_object_get_int(reply, "disabled", &disabled);
varlink_object_get_int(reply, "failed", &failed);
printf("Disabled: %ld, Failed: %ld\n", disabled, failed);

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

### Status

Show the current merge status of all extensions.

**Signature:** `Status() -> (extensions: []ExtensionStatus)`

**Parameters:** None.

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `extensions` | `[]ExtensionStatus` | Array of extension status objects |

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);
r = varlink_connection_call(connection, "org.avocado.Extensions.Status", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkArray *extensions;
varlink_object_get_array(reply, "extensions", &extensions);

for (unsigned long i = 0; i < varlink_array_get_n_elements(extensions); i++) {
    VarlinkObject *ext;
    varlink_array_get_object(extensions, i, &ext);

    const char *name;
    bool is_merged;

    varlink_object_get_string(ext, "name", &name);
    varlink_object_get_bool(ext, "isMerged", &is_merged);

    printf("%-30s  %s\n", name, is_merged ? "merged" : "not merged");
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

## Errors

### ExtensionNotFound

Returned when a referenced extension name does not exist in the extensions directory.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | The extension name that was not found |

**Trigger:** Passing an unknown extension name to `Enable` or `Disable`.

### MergeFailed

Returned when the merge operation fails.

| Parameter | Type | Description |
|-----------|------|-------------|
| `reason` | `string` | Human-readable description of the failure |

**Trigger:** `systemd-sysext merge` or `systemd-confext merge` exits with a non-zero status, or an internal error occurs during the merge process.

### UnmergeFailed

Returned when the unmerge operation fails.

| Parameter | Type | Description |
|-----------|------|-------------|
| `reason` | `string` | Human-readable description of the failure |

**Trigger:** `systemd-sysext unmerge` or `systemd-confext unmerge` exits with a non-zero status.

### ConfigurationError

Returned when the extension configuration is invalid.

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | `string` | Description of the configuration problem |

**Trigger:** Malformed extension metadata, missing required fields, or incompatible OS release versions.

### CommandFailed

Returned when an external command executed during extension management fails.

| Parameter | Type | Description |
|-----------|------|-------------|
| `command` | `string` | The command that failed |
| `message` | `string` | The command's error output or exit status |

**Trigger:** Any subprocess invoked during merge, unmerge, enable, or disable operations exits with a non-zero status.
