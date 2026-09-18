---
sidebar_position: 2
title: 'Hardware in the loop'
copy_markdown: true
description: 'Hardware-in-the-loop development with Avocado OS - iterate against live targets with NFS-mounted extensions for fast feedback loops and interactive debugging.'
---

Hardware-in-the-loop (HITL) lets you iterate against a live target while keeping fast, developer-friendly workflows. This guide mounts Avocado OS extensions over NFS into a running QEMU guest, so you can refresh code and configuration changes without full system rebuilds or reflashing. This supports tight feedback loops, interactive debugging, and extension lifecycle restarts.

Combining HITL development with a QEMU target, you can start developing before hardware is available. The same composable extensions can later be built and deployed to physical boards with `avocado deploy`. Live NFS mounting on physical hardware is currently unsafe; use the QEMU workflow below until the issue described in the warning is fixed.

This page shows how to use hardware-in-the-loop to develop and iterate on your extension(s).

:::danger Do not live-mount onto physical hardware yet
On a physical device, mounting an extension that the running system already depends on has collapsed the device's `/usr` (every non-builtin command gone, SSH down) until a power-cycle. A reboot recovers the device, but the cause is still being worked. Until that fix ships, run this workflow against the QEMU target as shown here, and iterate on hardware with `avocado deploy` instead.
:::

:::info
Run all commands in this guide from the root of your Avocado project on your host machine — the directory that contains your Avocado config. Code blocks labeled "On Device (VM)" are executed inside the running QEMU VM.
:::

### Creating a new extension

Edit your Avocado config to include a new extension. In this example, it will be called `my-app`.

```yaml title="avocado.yaml"
default_target: qemux86-64
supported_targets:
  - qemux86-64

runtimes:
  dev:
    extensions:
      - avocado-dev
      # highlight-added-start
      - my-app
      # highlight-added-end
    packages:
      avocado-runtime: '*'

sdk:
  image: avocadolinux/sdk:apollo-edge
  packages:
    nativesdk-qemu-system-x86-64: '*'

extensions:
  avocado-dev:
    types:
      - sysext
      - confext
    packages:
      avocado-hitl: '*'
    sdk:
      packages:
        nativesdk-avocado-hitl: '*'
  # highlight-added-start
  my-app:
    types:
      - sysext
      - confext
    version: '1.0.0'
  # highlight-added-end
```

### Building the extension

After adding an entry for our new extension, we need to build it. This is accomplished via `avocado build`. This will ensure all necessary components are re-built.

#### Command

```bash title="On Host"
avocado build
```

```bash
[INFO] Using target: qemux86-64 (from config file (default_target))
[INFO] Starting comprehensive build process...
[INFO] Step 1/4: Analyzing dependencies and compiling SDK code
[INFO] No SDK compilation needed.
[INFO] Step 2/4: Building extensions

... snip ...

[SUCCESS] Created.
[SUCCESS] Successfully ran SDK lifecycle hook 'avocado-build' for target 'qemux86-64'.
[SUCCESS] Successfully built runtime 'dev'
[SUCCESS] All components built successfully!
```

This creates the extension's image(s) in Avocado's state.

### Start HITL server

Start the HITL server to serve your extension over NFS so the device can mount it live. It runs detached: `avocado hitl status` lists the servers on this machine, `avocado hitl logs -f` follows this project's server log, and `avocado hitl stop` removes it. `avocado hitl server` is the same thing in the foreground.

#### Command

```bash title="On Host"
avocado hitl start -e my-app
```

### Run device virtual machine

Run the VM using the SDK passing args for host networking, so the guest (the device) can reach the HITL server on the host.

#### Command

```bash title="On Host"
avocado sdk run -iE vm dev
```

#### Output

```text
Runtime: dev

... snip ...

Avocado OS 0.1.0 avocado-qemux86-64 ttyS0

avocado-qemux86-64 login:
```

You may log in using the username `root`, and will not be prompted for a password.

### Mount HITL share

Inside your QEMU VM, mount the HITL NFS served by your host, so changes to your extension on the host appear immediately in the VM.

#### Command

```bash title="On Device (VM)"
avocadoctl hitl mount -e my-app -s 10.0.2.2
```

### Add a file to the extension export

We can leverage `avocado sdk run` to place assets into our extension's directory tree.

This command places a `hello.txt` file into the `/usr` directory of the `my-app` extension.

#### Command

```bash title="On Host"
avocado sdk run cd /opt/_avocado \&\& \
  mkdir -p ./qemux86-64/extensions/my-app/usr \&\& \
  echo "hello from host" \> ./qemux86-64/extensions/my-app/usr/hello.txt
```

:::info Escaping SDK run commands
The inner command runs inside the SDK container but is passed through your host shell first. Shell operators like `&&` and `>` are escaped as `\&\&` and `\>` so they are not consumed by the host shell and instead reach the container's shell unchanged.
:::

### Refresh the device

The device caches directory listings and file attributes from the share, so a file added or changed on the host is not guaranteed to show up until the device re-runs its extension lifecycle. From the host, `avocado hitl sync -d root@<device>` does that over SSH by running `avocadoctl ext refresh` on the device. The QEMU guest is not reachable from the host over SSH in this setup, so run the device-side command directly:

#### Command

```bash title="On Device (VM)"
avocadoctl ext refresh
```

### Verify the file appears in the VM

With the HITL server running, the extension mounted and refreshed, the placed artifacts appear inside the VM at the corresponding path.

#### Command

```bash title="On Device (VM)"
ls -la /usr
```

#### Output

```text
-rw-r--r-- 1 root root 17 Aug 12 23:05 hello.txt
```

#### Command

```bash title="On Device (VM)"
cat /usr/hello.txt
```

#### Output

```text
hello from host
```
