---
title: Overview
sidebar_position: 1
description: 'Guide to using the avocadoctl Varlink API for programmatic access to extension management, runtime lifecycle, and OS updates from C programs.'
---

# Varlink API Overview

avocadoctl exposes four Varlink interfaces over a Unix domain socket. Any application on the device can connect to the socket using the Varlink protocol, a JSON-based IPC mechanism, to programmatically manage extensions, runtimes, hardware-in-the-loop testing, and trust anchor information.

**Socket address:** `unix:/run/avocado/avocadoctl.sock`

The daemon is automatically started at boot by the included `avocadoctl` service extension, which is enabled by default in both the initramfs and system scopes. This means the Varlink API is available immediately on all Avocado runtimes without any manual setup.

The daemon can also be started manually if needed:

```bash
avocadoctl serve
```

Once running, any process on the device can open a connection to the socket and invoke methods on the available interfaces.

## Connecting from C

The following example demonstrates a minimal C program that connects to the avocadoctl socket, calls `org.avocado.Extensions.List`, and prints the names of all available extensions.

```c
#include <varlink.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    VarlinkConnection *connection = NULL;
    VarlinkObject *parameters = NULL;
    VarlinkObject *reply = NULL;
    long r;

    r = varlink_connection_new(&connection, "unix:/run/avocado/avocadoctl.sock");
    if (r < 0) {
        fprintf(stderr, "Failed to connect: %s\n", varlink_error_string(-r));
        return EXIT_FAILURE;
    }

    varlink_object_new(&parameters);

    r = varlink_connection_call(connection, "org.avocado.Extensions.List", parameters, 0, &reply);
    if (r < 0) {
        fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
        varlink_connection_free(connection);
        return EXIT_FAILURE;
    }

    VarlinkArray *extensions;
    varlink_object_get_array(reply, "extensions", &extensions);

    for (unsigned long i = 0; i < varlink_array_get_n_elements(extensions); i++) {
        VarlinkObject *ext;
        varlink_array_get_object(extensions, i, &ext);

        const char *name;
        varlink_object_get_string(ext, "name", &name);
        printf("Extension: %s\n", name);
    }

    varlink_object_unref(reply);
    varlink_object_unref(parameters);
    varlink_connection_free(connection);

    return EXIT_SUCCESS;
}
```

Compile with:

```bash
gcc -o list_extensions list_extensions.c $(pkg-config --cflags --libs libvarlink)
```

## Streaming Methods

Several methods support streaming via the Varlink `more` flag. When called with the `VARLINK_CALL_MORE` flag, the server sends multiple reply objects as the operation progresses. Each intermediate reply contains a `message` field with a progress string and `done: false`. The final reply has `done: true`.

The following example calls `org.avocado.Extensions.Merge` with streaming enabled and prints each progress message as it arrives:

```c
#include <varlink.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    VarlinkConnection *connection = NULL;
    VarlinkObject *parameters = NULL;
    long r;

    r = varlink_connection_new(&connection, "unix:/run/avocado/avocadoctl.sock");
    if (r < 0) {
        fprintf(stderr, "Failed to connect: %s\n", varlink_error_string(-r));
        return EXIT_FAILURE;
    }

    varlink_object_new(&parameters);

    r = varlink_connection_call(connection, "org.avocado.Extensions.Merge",
                                parameters, VARLINK_CALL_MORE, NULL);
    if (r < 0) {
        fprintf(stderr, "Call failed: %s\n", varlink_error_string(-r));
        varlink_connection_free(connection);
        return EXIT_FAILURE;
    }

    VarlinkObject *reply = NULL;
    while ((r = varlink_connection_reply(connection, &reply)) >= 0) {
        const char *message;
        varlink_object_get_string(reply, "message", &message);
        printf("%s\n", message);

        bool done;
        varlink_object_get_bool(reply, "done", &done);

        varlink_object_unref(reply);
        reply = NULL;

        if (done)
            break;
    }

    if (r < 0 && r != -VARLINK_REPLY_EOF) {
        fprintf(stderr, "Streaming error: %s\n", varlink_error_string(-r));
    }

    varlink_object_unref(parameters);
    varlink_connection_free(connection);

    return EXIT_SUCCESS;
}
```

## Error Handling

Varlink errors are returned as structured objects. Each error includes an interface-qualified name (e.g., `org.avocado.Extensions.MergeFailed`) and a set of error parameters providing additional context.

Use `varlink_reply_is_error` to detect error responses:

```c
VarlinkObject *reply = NULL;

r = varlink_connection_call(connection, "org.avocado.Extensions.Merge",
                            parameters, 0, &reply);
if (r < 0) {
    fprintf(stderr, "Transport error: %s\n", varlink_error_string(-r));
    return EXIT_FAILURE;
}

const char *error_name = NULL;
if (varlink_reply_is_error(reply, &error_name)) {
    fprintf(stderr, "Varlink error: %s\n", error_name);

    /* Extract error parameters */
    const char *reason;
    if (varlink_object_get_string(reply, "reason", &reason) >= 0) {
        fprintf(stderr, "Reason: %s\n", reason);
    }

    varlink_object_unref(reply);
    return EXIT_FAILURE;
}
```

## Available Interfaces

| Interface                                                 | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| [org.avocado.Extensions](./org-avocado-extensions)        | Extension management (merge, unmerge, enable, disable) |
| [org.avocado.Runtimes](./org-avocado-runtimes)            | Runtime lifecycle (add, activate, remove, inspect)     |
| [org.avocado.Hitl](./org-avocado-hitl)                    | Hardware-in-the-loop NFS testing                       |
| [org.avocado.RootAuthority](./org-avocado-root-authority) | TUF trust anchor information                           |
