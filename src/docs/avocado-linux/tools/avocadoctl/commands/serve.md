---
title: serve
description: 'Start the Varlink IPC server daemon.'
---

Starts the avocadoctl Varlink daemon, listening for connections from CLI commands and third-party applications. See the [Varlink API](../varlink-api/overview) documentation for details on the exposed interfaces.

```
avocadoctl serve [OPTIONS]
```

### Options

| Option                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `--address <ADDRESS>` | Listen address. Default: `unix:/run/avocado/avocadoctl.sock` |

### Examples

```bash
# Start the daemon with default socket
avocadoctl serve

# Start the daemon on a custom address
avocadoctl serve --address unix:/tmp/avocadoctl.sock
```
