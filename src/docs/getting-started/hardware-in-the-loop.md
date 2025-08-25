# Hardware in the Loop

Hardware-in-the-loop (HITL) lets you iterate against a live target while keeping fast, developer-friendly workflows. With Avocado OS, extensions can be NFS-mounted into a running device (virtual or physical), so code and configuration changes are reflected immediately without full system rebuilds or reflashing. This facilitates tight feedback loops, interactive debugging, and soft restarts of only the components you're changing. This aligns day-to-day development with production-ready, immutable system images.

Combining HITL development with a QEMU target, you can start developing well before hardware is available, then switch to physical boards without changing your workflow. The same composable extension model runs in both environments, providing consistent behavior so hardware and software teams can co-develop in parallel and validate changes on real hardware as soon as boards arrive.

This page shows how to use hardware-in-the-loop to develop and iterate on your extension(s).

:::info
Run all commands in this guide from the root of your Avocado project on your host machine — the directory that contains your Avocado config. Code blocks labeled "On Device (VM)" are executed inside the running QEMU VM.
:::

### Creating a new extension

Edit your Avocado config to include a new extension. In this example, it will be called `my-app`.

```toml title="avocado.toml"
default_target = "qemux86-64"
supported_targets = ["qemux86-64"]

[runtime.dev]
target = "qemux86-64"

[runtime.dev.dependencies]
avocado-img-bootfiles = "*"
avocado-img-rootfs = "*"
avocado-img-initramfs = "*"
avocado-dev = { ext = "avocado-dev" }
# highlight-added-start
my-app = { ext = "my-app" }
# highlight-added-end

[sdk]
image = "avocadolinux/sdk:apollo-edge"

[sdk.dependencies]
nativesdk-qemu-system-x86-64 = "*"

[ext.avocado-dev]
types = ["sysext", "confext"]

[ext.avocado-dev.dependencies]
avocado-hitl = "*"

[ext.avocado-dev.sdk.dependencies]
nativesdk-avocado-hitl = "*"

# highlight-added-start
[ext.my-app]
types = ["sysext", "confext"]
version = "1.0.0"
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

Start the HITL server to serve your extension over NFS so the device can mount it live.

#### Command

```bash title="On Host"
avocado hitl server -e my-app
```

### Run device virtual machine

Run the VM using the SDK passing args for host networking, so the guest (the device) can reach the HITL server on the host.

#### Command

```bash title="On Host"
avocado sdk run -iE --container-arg "--net=host" vm dev
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
The inner command runs inside the SDK container but is passed through your host shell first. Shell operators like `&&` and `>` are escaped as `\&\&` and `\>` so they are not consumed by the host shell and instead reach the container’s shell unchanged.
:::

### Verify the file appears in the VM

As we have the HITL NFS server running, and the extenion mounted, the placed artifacts should immediately appear inside the VM at the corresponding path.

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
