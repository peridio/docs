# First OTA Update

You've shipped an initial image with your application as one or more Avocado extensions. Now you have a new version of an extension and need to deliver it to devices via Peridio Core.

This guide walks through updating the `my-app` extension and delivering it to your device(s):

- Make changes to `my-app`
- Build extensions
- Upload build output to Peridio Core as binaries within an artifact version
- Create a bundle containing these binaries
- Deliver via a bundle override (ad hoc) or a release (standard workflow)

:::info
Commands labeled "On Host" run from the root of your Avocado project. Steps that interact with Peridio Cloud use the `peridio` CLI. Ensure you have configured the CLI with your API key and selected organization/product.

See [Tools › CLI](/tools/peridio-cli) for setting up the Peridio CLI.
:::

### Make changes to `my-app`

Update your extension content and bump its version in your Avocado config.

```toml title="avocado.toml"
[runtime.dev]
target = "qemux86-64"

[runtime.dev.dependencies]
avocado-img-bootfiles = "*"
avocado-img-rootfs = "*"
avocado-img-initramfs = "*"
avocado-dev = { ext = "avocado-dev" }
my-app = { ext = "my-app" }

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

[ext.my-app]
types = ["sysext", "confext"]
# highlight-added-start
version = "1.1.0"
# highlight-added-end
```

### Build extensions

The build produces extension image(s) for your target in Avocado's state. You'll upload these file(s) as binaries in the following steps. The exact filenames/paths depend on your target and extension type(s).

#### Command

```bash title="On Host"
avocado build
```

### Create or reuse an artifact for `my-app`

If you don't already have an artifact for your app, create one. Otherwise, reuse its PRN.

#### Command

```bash title="On Host"
peridio artifacts create \
  --name my-app
```

:::tip
Record the returned `ARTIFACT_PRN` for the next step. You can also find it via `peridio artifacts list`. See the [CLI artifacts command](/peridio-cli/artifacts/create).
:::

### Create a new artifact version

Create a new version to represent this update, e.g., `1.1.0`.

#### Command

```bash title="On Host"
peridio artifact-versions create \
  --artifact-prn ARTIFACT_PRN \
  --version 1.1.0
```

:::tip
Record the returned `ARTIFACT_VERSION_PRN` for the next step. See the [CLI artifact-versions command](/peridio-cli/artifact-versions/create).
:::

### Upload the built extension as a binary

Upload the build output file(s) for your target as binaries associated with the artifact version. Repeat per target if needed.

#### Command

```bash title="On Host"
peridio binaries create \
  --artifact-version-prn ARTIFACT_VERSION_PRN \
  --target qemux86-64 \
  --content-path PATH_TO_BUILT_MY_APP_IMAGE
```

:::info
Replace `PATH_TO_BUILT_MY_APP_IMAGE` with the path to the `my-app` extension image produced by `avocado build` for your target. See the [CLI binaries command](/peridio-cli/binaries/create).
:::

### Create a bundle containing your update

Create a bundle that resolves to the latest binaries of one or more artifact versions.

#### Command

```bash title="On Host"
peridio bundles create \
  --name "my-app 1.1.0" \
  -a ARTIFACT_VERSION_PRN
```

:::tip
You can include multiple artifact versions by repeating `-a` or passing a comma-delimited list. See the [CLI bundles command](/peridio-cli/bundles/create).
:::

### Deliver the bundle

#### Bundle override (ad hoc)

Bundle overrides are great for manual tests and troubleshooting against specific devices or small sets.

##### Command

```bash title="On Host"
peridio bundle-overrides create \
  --name my-app-1.1.0-override \
  --bundle-prn BUNDLE_PRN \
  --starts-at "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

See the [CLI bundle-overrides command](/peridio-cli/bundle-overrides/create).

#### Release (standard workflow)

Create a release in a cohort to roll out broadly, optionally phased or scheduled.

##### Command

```bash title="On Host"
peridio releases create \
  --name my-app-1.1.0 \
  --bundle-prn BUNDLE_PRN \
  --cohort-prn COHORT_PRN \
  --schedule-date "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

:::tip
For phased rollouts, add `--phase-value` and/or `--phase-tags`. See the [CLI releases command](/peridio-cli/releases/create) for details.
:::

### Next steps

Device-side application of these updates is handled by the `peridiod` daemon. The specifics of activation and restart flows will be covered as that integration is developed. For now, you have published a new extension version, bundled it, and scheduled delivery via Peridio Core.

See also:

- Bundle Management Guide: `/platform/guides/bundle-management-overview`
- CLI reference: `/peridio-cli/artifacts/create`, `/peridio-cli/artifact-versions/create`, `/peridio-cli/binaries/create`, `/peridio-cli/bundles/create`, `/peridio-cli/bundle-overrides/create`, `/peridio-cli/releases/create`
