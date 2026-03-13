---
title: org.avocado.Runtimes
sidebar_position: 3
description: 'Varlink interface for runtime lifecycle management - add, activate, remove, inspect, and list runtimes.'
---

# org.avocado.Runtimes

Manages the lifecycle of Avocado Linux runtimes. A runtime is a versioned bundle comprising an OS image, an initramfs, and a set of extensions described by a manifest. This interface provides methods to list available runtimes, stage new runtimes from remote or local sources, activate a staged runtime, remove staged runtimes, and inspect runtime details.

## Interface Definition

```varlink
# Runtime lifecycle management for Avocado Linux
interface org.avocado.Runtimes

type RuntimeInfo (
    name: string,
    version: string
)

type ManifestExtension (
    name: string,
    version: string,
    imageId: ?string
)

type Runtime (
    id: string,
    manifestVersion: int,
    builtAt: string,
    runtime: RuntimeInfo,
    extensions: []ManifestExtension,
    active: bool,
    osBuildId: ?string,
    initramfsBuildId: ?string
)

# List all available runtimes
method List() -> (runtimes: []Runtime)

# Add a runtime from a TUF repository URL (authToken: optional bearer token for protected endpoints)
# Supports streaming: client may set more=true to receive per-message progress
method AddFromUrl(url: string, authToken: ?string, artifactsUrl: ?string) -> (message: string, done: bool, runtime: ?Runtime)

# Add a runtime from a local manifest file
# Supports streaming: client may set more=true to receive per-message progress
method AddFromManifest(manifestPath: string) -> (message: string, done: bool, runtime: ?Runtime)

# Remove a staged runtime by ID (or prefix)
method Remove(id: string) -> ()

# Activate a staged runtime by ID (or prefix)
# Supports streaming: client may set more=true to receive per-message progress
method Activate(id: string) -> (message: string, done: bool, runtime: ?Runtime)

# Inspect a runtime's details (omit id to inspect the active runtime)
method Inspect(id: ?string) -> (runtime: Runtime)

error RuntimeNotFound (id: string)
error AmbiguousRuntimeId (id: string, candidates: []string)
error RemoveActiveRuntime ()
error StagingFailed (reason: string)
error UpdateFailed (reason: string)
```

## Types

### RuntimeInfo

Basic identity of a runtime.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Runtime name |
| `version` | `string` | Runtime version string |

### ManifestExtension

An extension declared in the runtime manifest.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Extension name |
| `version` | `string` | Extension version string |
| `imageId` | `?string` | Image digest used to verify the downloaded extension artifact |

### Runtime

Full description of a runtime, including its manifest metadata, constituent extensions, and activation state.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique runtime identifier (hex digest) |
| `manifestVersion` | `int` | Manifest schema version |
| `builtAt` | `string` | ISO 8601 timestamp of when the runtime was built |
| `runtime` | `RuntimeInfo` | Runtime name and version |
| `extensions` | `[]ManifestExtension` | Extensions included in this runtime |
| `active` | `bool` | `true` if this is the currently active runtime |
| `osBuildId` | `?string` | OS image build identifier. A change in this value triggers an OS update on activation. |
| `initramfsBuildId` | `?string` | Initramfs build identifier |

## Methods

### List

List all available runtimes, both staged and active.

**Signature:** `List() -> (runtimes: []Runtime)`

**Parameters:** None.

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `runtimes` | `[]Runtime` | Array of all known runtimes |

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);
r = varlink_connection_call(connection, "org.avocado.Runtimes.List", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkArray *runtimes;
varlink_object_get_array(reply, "runtimes", &runtimes);

for (unsigned long i = 0; i < varlink_array_get_n_elements(runtimes); i++) {
    VarlinkObject *rt;
    varlink_array_get_object(runtimes, i, &rt);

    const char *id;
    bool active;
    varlink_object_get_string(rt, "id", &id);
    varlink_object_get_bool(rt, "active", &active);

    VarlinkObject *info;
    varlink_object_get_object(rt, "runtime", &info);

    const char *name, *version;
    varlink_object_get_string(info, "name", &name);
    varlink_object_get_string(info, "version", &version);

    printf("%-12s  %s %s%s\n", id, name, version, active ? "  [active]" : "");
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

### AddFromUrl

Stage a new runtime by downloading its manifest and artifacts from a TUF repository.

**Signature:** `AddFromUrl(url: string, authToken: ?string, artifactsUrl: ?string) -> (message: string, done: bool, runtime: ?Runtime)`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `url` | `string` | TUF repository URL |
| `authToken` | `?string` | Optional bearer token for authenticated endpoints |
| `artifactsUrl` | `?string` | Optional separate URL for artifact downloads. If omitted, artifacts are fetched from the TUF repository URL. |

**Returns (streaming):**

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` | Progress message |
| `done` | `bool` | `true` on the final reply |
| `runtime` | `?Runtime` | The staged runtime object, present only in the final reply |

**Streaming:** Yes. Call with `VARLINK_CALL_MORE` to receive download and verification progress.

**C Example:**

```c
VarlinkObject *parameters = NULL;
long r;

varlink_object_new(&parameters);
varlink_object_set_string(parameters, "url", "https://tuf.example.com/repo");
varlink_object_set_string(parameters, "authToken", "my-bearer-token");

r = varlink_connection_call(connection, "org.avocado.Runtimes.AddFromUrl",
                            parameters, VARLINK_CALL_MORE, NULL);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkObject *reply = NULL;
while ((r = varlink_connection_reply(connection, &reply)) >= 0) {
    const char *error_name = NULL;
    if (varlink_reply_is_error(reply, &error_name)) {
        fprintf(stderr, "Error: %s\n", error_name);
        varlink_object_unref(reply);
        break;
    }

    const char *message;
    varlink_object_get_string(reply, "message", &message);
    printf("[add] %s\n", message);

    bool done;
    varlink_object_get_bool(reply, "done", &done);

    if (done) {
        VarlinkObject *runtime;
        if (varlink_object_get_object(reply, "runtime", &runtime) >= 0) {
            const char *id;
            varlink_object_get_string(runtime, "id", &id);
            printf("Staged runtime: %s\n", id);
        }
    }

    varlink_object_unref(reply);
    reply = NULL;

    if (done)
        break;
}

varlink_object_unref(parameters);
```

### AddFromManifest

Stage a new runtime from a local manifest file. The manifest references artifacts that must already be present on the local filesystem or accessible via the paths declared in the manifest.

**Signature:** `AddFromManifest(manifestPath: string) -> (message: string, done: bool, runtime: ?Runtime)`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `manifestPath` | `string` | Absolute path to the local manifest file |

**Returns (streaming):**

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` | Progress message |
| `done` | `bool` | `true` on the final reply |
| `runtime` | `?Runtime` | The staged runtime object, present only in the final reply |

**Streaming:** Yes. Call with `VARLINK_CALL_MORE` to receive progress updates.

**C Example:**

```c
VarlinkObject *parameters = NULL;
long r;

varlink_object_new(&parameters);
varlink_object_set_string(parameters, "manifestPath", "/tmp/runtime-manifest.json");

r = varlink_connection_call(connection, "org.avocado.Runtimes.AddFromManifest",
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
    printf("[add-manifest] %s\n", message);

    bool done;
    varlink_object_get_bool(reply, "done", &done);

    if (done) {
        VarlinkObject *runtime;
        if (varlink_object_get_object(reply, "runtime", &runtime) >= 0) {
            const char *id;
            varlink_object_get_string(runtime, "id", &id);
            printf("Staged runtime: %s\n", id);
        }
    }

    varlink_object_unref(reply);
    reply = NULL;

    if (done)
        break;
}

varlink_object_unref(parameters);
```

### Remove

Remove a staged runtime by its ID or an unambiguous ID prefix.

**Signature:** `Remove(id: string) -> ()`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Runtime ID or unique prefix |

**Returns:** Empty on success.

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

varlink_object_new(&parameters);
varlink_object_set_string(parameters, "id", "a1b2c3");

r = varlink_connection_call(connection, "org.avocado.Runtimes.Remove", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

const char *error_name = NULL;
if (varlink_reply_is_error(reply, &error_name)) {
    fprintf(stderr, "Error: %s\n", error_name);

    /* Check for ambiguous ID */
    VarlinkArray *candidates;
    if (varlink_object_get_array(reply, "candidates", &candidates) >= 0) {
        fprintf(stderr, "Matching runtimes:\n");
        for (unsigned long i = 0; i < varlink_array_get_n_elements(candidates); i++) {
            const char *candidate;
            varlink_array_get_string(candidates, i, &candidate);
            fprintf(stderr, "  %s\n", candidate);
        }
    }
} else {
    printf("Runtime removed.\n");
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

### Activate

Activate a staged runtime. If the runtime's `osBuildId` differs from the currently running OS, this triggers an OS update (writing the new OS image to the inactive partition and configuring the bootloader). A reboot is required to complete the update.

**Signature:** `Activate(id: string) -> (message: string, done: bool, runtime: ?Runtime)`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Runtime ID or unique prefix |

**Returns (streaming):**

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` | Progress message (e.g., writing OS image, enabling extensions) |
| `done` | `bool` | `true` on the final reply |
| `runtime` | `?Runtime` | The activated runtime object, present only in the final reply |

**Streaming:** Yes. Call with `VARLINK_CALL_MORE` to receive progress updates. This is especially useful during OS updates, which may take significant time.

**C Example:**

```c
VarlinkObject *parameters = NULL;
long r;

varlink_object_new(&parameters);
varlink_object_set_string(parameters, "id", "a1b2c3");

r = varlink_connection_call(connection, "org.avocado.Runtimes.Activate",
                            parameters, VARLINK_CALL_MORE, NULL);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

VarlinkObject *reply = NULL;
while ((r = varlink_connection_reply(connection, &reply)) >= 0) {
    const char *error_name = NULL;
    if (varlink_reply_is_error(reply, &error_name)) {
        fprintf(stderr, "Activation error: %s\n", error_name);
        const char *reason;
        if (varlink_object_get_string(reply, "reason", &reason) >= 0) {
            fprintf(stderr, "Reason: %s\n", reason);
        }
        varlink_object_unref(reply);
        break;
    }

    const char *message;
    varlink_object_get_string(reply, "message", &message);
    printf("[activate] %s\n", message);

    bool done;
    varlink_object_get_bool(reply, "done", &done);

    if (done) {
        VarlinkObject *runtime;
        if (varlink_object_get_object(reply, "runtime", &runtime) >= 0) {
            const char *id;
            varlink_object_get_string(runtime, "id", &id);
            printf("Activated runtime: %s\n", id);
        }
    }

    varlink_object_unref(reply);
    reply = NULL;

    if (done)
        break;
}

varlink_object_unref(parameters);
```

### Inspect

Inspect the details of a specific runtime. If `id` is omitted, the currently active runtime is inspected.

**Signature:** `Inspect(id: ?string) -> (runtime: Runtime)`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `?string` | Runtime ID or unique prefix. Omit to inspect the active runtime. |

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `runtime` | `Runtime` | The full runtime object |

**C Example:**

```c
VarlinkObject *parameters = NULL;
VarlinkObject *reply = NULL;
long r;

/* Omit "id" to inspect the active runtime */
varlink_object_new(&parameters);

r = varlink_connection_call(connection, "org.avocado.Runtimes.Inspect", parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
    varlink_object_unref(parameters);
    return;
}

const char *error_name = NULL;
if (varlink_reply_is_error(reply, &error_name)) {
    fprintf(stderr, "Error: %s\n", error_name);
    varlink_object_unref(reply);
    varlink_object_unref(parameters);
    return;
}

VarlinkObject *runtime;
varlink_object_get_object(reply, "runtime", &runtime);

const char *id, *built_at;
bool active;
varlink_object_get_string(runtime, "id", &id);
varlink_object_get_string(runtime, "builtAt", &built_at);
varlink_object_get_bool(runtime, "active", &active);

VarlinkObject *info;
varlink_object_get_object(runtime, "runtime", &info);

const char *name, *version;
varlink_object_get_string(info, "name", &name);
varlink_object_get_string(info, "version", &version);

printf("Runtime:  %s %s\n", name, version);
printf("ID:       %s\n", id);
printf("Built:    %s\n", built_at);
printf("Active:   %s\n", active ? "yes" : "no");

VarlinkArray *extensions;
varlink_object_get_array(runtime, "extensions", &extensions);
printf("Extensions:\n");
for (unsigned long i = 0; i < varlink_array_get_n_elements(extensions); i++) {
    VarlinkObject *ext;
    varlink_array_get_object(extensions, i, &ext);

    const char *ext_name, *ext_version;
    varlink_object_get_string(ext, "name", &ext_name);
    varlink_object_get_string(ext, "version", &ext_version);
    printf("  %s %s\n", ext_name, ext_version);
}

varlink_object_unref(reply);
varlink_object_unref(parameters);
```

## Errors

### RuntimeNotFound

Returned when the specified runtime ID does not match any known runtime.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | The ID that was not found |

**Trigger:** Passing an unknown ID to `Remove`, `Activate`, or `Inspect`.

### AmbiguousRuntimeId

Returned when the specified ID prefix matches more than one runtime. The response includes the list of matching candidate IDs so the caller can present them to the user or retry with a longer prefix.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | The ambiguous prefix |
| `candidates` | `[]string` | Full IDs of all matching runtimes |

**Trigger:** Passing a short ID prefix to `Remove`, `Activate`, or `Inspect` that matches multiple runtimes.

### RemoveActiveRuntime

Returned when attempting to remove the currently active runtime. The active runtime cannot be removed.

**Parameters:** None.

**Trigger:** Calling `Remove` with the ID of the active runtime.

### StagingFailed

Returned when staging a new runtime fails during download, verification, or installation.

| Parameter | Type | Description |
|-----------|------|-------------|
| `reason` | `string` | Human-readable failure description |

**Trigger:** TUF metadata verification failure, artifact download error, disk space exhaustion, or corrupt manifest in `AddFromUrl` or `AddFromManifest`.

### UpdateFailed

Returned when the OS update triggered by `Activate` fails.

| Parameter | Type | Description |
|-----------|------|-------------|
| `reason` | `string` | Human-readable failure description |

**Trigger:** OS image write failure, bootloader configuration error, or extension enable/merge failure during `Activate`.
