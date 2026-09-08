---
title: 'OTA Updates'
copy_markdown: true
description: 'Complete an over-the-air update end to end with Avocado OS: create an Avocado Connect account, upload a runtime from the CLI or Avocado Desktop, create a deployment, and watch it roll out to your device.'
---

This guide walks through a complete over-the-air (OTA) update with Avocado OS: from creating an Avocado Connect account, to publishing a runtime, to creating a deployment and watching your device pick it up. By the end you will have shipped a real update to a running device through the same pipeline you would use for a production fleet.

Along the way you'll see each step done multiple ways where multiple tools support it: uploading a runtime from the **Avocado CLI** or **Avocado Desktop**, and creating a deployment from the **CLI**, **Desktop**, or the **Avocado Connect** console.

## How an OTA works in Avocado

- A **runtime** is the versioned artifact you deploy. You build it locally, then upload and publish it to your Connect project.
- A **deployment** targets a published runtime at a **cohort** of devices (optionally filtered to specific devices or tags).
- Devices verify every update against TUF signatures before installing. How the update applies depends on what changed: extension-level changes (like the package additions in this guide) merge live with no reboot, while updates that carry a new OS image apply to A/B partitions and reboot into the new slot, with automatic rollback on boot failure. See the [update architecture](/avocado-os/security/update-architecture) overview and the [activation process](/developer-reference/avocadoctl/runtime-management/activation-process) for the exact rules.

## Prerequisites

- An Avocado project that builds successfully (`avocado install`, `avocado build`) — see [Getting Started](/developer-reference/getting-started/)
- The [Avocado CLI](/developer-reference/avocado-cli/installation) installed, and optionally Avocado Desktop if you prefer a GUI for upload and deployment

## Step 1: Create an Avocado Connect account

Sign up for a **free developer account** at [connect.peridio.com/login](https://connect.peridio.com/login). For more on what Avocado Connect provides, see the [Connect overview](/avocado-connect/overview).

## Step 2: Link your project to Connect

- Authenticate the CLI: `avocado connect auth login` — opens a browser link, then select your organization.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-auth.png"
    alt="Terminal running avocado connect auth login: a browser login URL is printed, an organization is selected, and the CLI reports a successful login."
    loading="lazy"
    decoding="async"
  />
</div>

- The browser confirms the CLI session and issues an API token scoped to your organization; return to your terminal.

<div className="framed-shot">
  <img
    src="/img/guides/ota/cli-auth.png"
    alt="Browser confirmation page after logging in: CLI Authenticated — your Avocado CLI is now connected and an access token has been created for this session."
    style={{width: '50%', display: 'block', margin: '0 auto'}}
    loading="lazy"
    decoding="async"
  />
</div>

- Initialize Connect in the project: `avocado connect init` — select the organization and project; this writes the `connect:` section to `avocado.yaml`, adds the connect extensions to the runtime, creates a claim token, and writes the device config overlay.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-init.png"
    alt="Terminal running avocado connect init: organization and project selection, claim token creation, and the final Connect initialized summary with org, project, server key, and claim token."
    loading="lazy"
    decoding="async"
  />
</div>

- In Avocado Desktop, the same Connect configuration lives in the **Fleet** bar — pick the org, project, and cohort, then **Save**. The Upload and Deploy OTA actions used later in this guide live in the same place.

<div className="framed-shot">
  <img
    src="/img/guides/ota/desktop-auth.png"
    alt="Avocado Desktop with the project connected to Fleet: the Configure Avocado Connect bar with org, project, and cohort dropdowns alongside Reconfigure, Upload, and Deploy OTA tabs."
    loading="lazy"
    decoding="async"
  />
</div>

:::info
If your device was provisioned before Connect was initialized in the project, its image contains no Connect configuration, so it cannot enroll. After running `avocado connect init`, rebuild the image so it picks up the Connect extensions and device config (`avocado install -f && avocado build`), then re-provision the device. It enrolls and auto-claims into your project on first boot.
:::

## Step 3: Upload your runtime

Before you can upload, you need a built runtime and a running device to update. From the project directory:

1. Install dependencies: `avocado install -f`
2. Build the runtime: `avocado build`
3. Provision a device — either [QEMU](/developer-reference/getting-started/qemu) or [supported hardware](/developer-reference/provisioning) (`avocado provision`). For QEMU, provisioning only creates the disk image — boot the VM afterwards with `avocado sdk run -iE vm dev`. Since the project was initialized with Connect in Step 2, the device enrolls and auto-claims into your project on first boot.
4. Confirm the device is online in Connect: open your project's fleet, find the device, and check that its status shows **Online**.

<div className="framed-shot">
  <img
    src="/img/guides/ota/confirm-device.png"
    alt="A device detail page in Avocado Connect showing the device status as Online, with its identifier, cohort, tags, and last-seen time."
    loading="lazy"
    decoding="async"
  />
</div>

Then make a visible change to deploy (e.g., add a package to `avocado.yaml`) and rebuild: `avocado install -f && avocado build`

### Option A: Avocado CLI

- `avocado connect upload <runtime> --publish --version <version>` — uploads the runtime at the given version and publishes it (draft → published) in one step.
- Add `--description` to annotate the upload. As a fast path, the `--deploy-cohort` and `--deploy-activate` flags create and activate a deployment in the same command.

<div className="framed-shot">
  <img
    src="/img/guides/ota/upload.png"
    alt="Terminal running avocado connect upload dev --publish --version v0.1.1: artifacts are discovered and uploaded with progress bars, then the runtime is uploaded and published."
    loading="lazy"
    decoding="async"
  />
</div>

### Option B: Avocado Desktop

- In the **Fleet** bar, open the **Upload** tab, enter a version for the runtime, and click **Upload**.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-upload.png"
    alt="The Upload tab in Avocado Desktop's Fleet bar: the dev runtime with a version field set to v0.1.2 and an Upload button."
    loading="lazy"
    decoding="async"
  />
</div>

- The output panel tracks each stage of the upload — verifying build prerequisites, discovering artifacts, creating the runtime, uploading artifacts, and finalizing — and reports **Ready to OTA fleet** when done.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-upload-complete.png"
    alt="Avocado Desktop's output panel after an upload: all stages complete — verify build prerequisites, discover artifacts, create runtime, upload artifacts, finalize — with the status Ready to OTA fleet."
    loading="lazy"
    decoding="async"
  />
</div>

- Whichever option you used, verify the upload: the runtime appears under **Runtimes** in the Connect console with status _Published_.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-runtime-list.png"
    alt="The Runtimes tab in Avocado Connect: the published v0.1.1 version of the dev runtime with its build ID, module count, and Deploy and Deprecate actions."
    loading="lazy"
    decoding="async"
  />
</div>

## Step 4: Create a deployment

Deployments target a cohort, so before creating one, make sure your device is assigned to a cohort: on the device's **Overview** in Connect, use **Assign** next to **Cohort**, pick the cohort, and **Save**.

<div className="framed-shot">
  <img
    src="/img/guides/ota/assign-cohort-updated.png"
    alt="A device's Overview in Avocado Connect with the Cohort dropdown open: the jetson-nano cohort selected and Save and Cancel buttons alongside."
    loading="lazy"
    decoding="async"
  />
</div>

### Option A: Avocado CLI

- Run `avocado connect deploy --activate`. The command is interactive: first, select the published runtime version to deploy.

<div className="framed-shot">
  <img
    src="/img/guides/ota/cli-deploy-runtime.png"
    alt="Terminal running avocado connect deploy --activate: an interactive list of published runtime versions to select from."
    loading="lazy"
    decoding="async"
  />
</div>

- Next, select the cohort to target.

<div className="framed-shot">
  <img
    src="/img/guides/ota/cli-deploy-cohort.png"
    alt="The avocado connect deploy prompt after selecting a runtime: an interactive list of cohorts to target."
    loading="lazy"
    decoding="async"
  />
</div>

- The CLI creates the deployment and activates it. Omit `--activate` to create the deployment without starting the rollout, and activate it later in Connect.

<div className="framed-shot">
  <img
    src="/img/guides/ota/cli-deploy-complete.png"
    alt="The completed avocado connect deploy run: the deployment is created and activated, with its runtime, cohort, and active status summarized."
    loading="lazy"
    decoding="async"
  />
</div>

### Option B: Avocado Desktop

- In the **Fleet** bar, open the **Deploy OTA** tab, pick the runtime and cohort, and click **Deploy OTA**. A confirmation dialog reminds you which cohort you're about to update — it could affect production devices in the field. The output panel then tracks each stage: resolving the runtime and cohort, creating the deployment, and activating it.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-create-deployment-confirmation.png"
    alt="The Deploy OTA tab in Avocado Desktop with runtime and cohort selected: a confirmation dialog asks Deploy OTA update? warning it will deploy to the jetson-nano cohort and could affect production devices, above output stages for resolving, creating, and activating the deployment."
    loading="lazy"
    decoding="async"
  />
</div>

- The rollout is asynchronous — the device applies the update on its own schedule (an extension-only change like this one merges live; a reboot happens only when the update carries a new OS image). Once it shows **On target** in the deployment's **Rollout** tab (see Step 5), verify it on the device: connect over UART or SSH, run `avocadoctl runtime list` to confirm the new runtime is active, and check that the change shipped (e.g., the new packages are present).

<div className="framed-shot">
  <img
    src="/img/guides/ota/device-side-success.png"
    alt="A UART session on the device after the Desktop OTA: avocadoctl runtime list shows three runtimes with the newest active, and curl and iperf3 version checks confirm the deployed packages are present."
    loading="lazy"
    decoding="async"
  />
</div>

### Option C: Avocado Connect

- From the **Runtimes** tab, click **Deploy** on the published runtime to open the **New Deployment** form: name the deployment, pick the runtime and cohort, and optionally add a description.
- Under **Advanced options**, you can target specific devices or filter devices by tags.
- Choose **Create & Activate** to start rolling out immediately, or **Create Deployment** if you wish to activate it at a later time.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-create-deployment.png"
    alt="The New Deployment form in Avocado Connect: deploying runtime v0.1.1 to the jetson-nano cohort with a description, advanced options, a preview of changes, and Create Deployment and Create & Activate buttons."
    loading="lazy"
    decoding="async"
  />
</div>

- Verify on the device the same way once it shows **On target** in the deployment's **Rollout** tab: `avocadoctl runtime list` shows the new runtime active, and the new package is present.

<div className="framed-shot">
  <img
    src="/img/guides/ota/device-side-ota.png"
    alt="A UART session on the device after the OTA: avocadoctl runtime list shows two runtimes with the new one active, and curl --version confirms the newly added package is present."
    loading="lazy"
    decoding="async"
  />
</div>

## Step 5: Watch the rollout in Connect

However you created the deployment, its rollout is tracked in Avocado Connect. Open the deployment and switch to the **Rollout** tab to watch convergence: total devices, on-target percentage, pending and stale counts, and per-device update status.

When the rollout starts, devices in the cohort show as **Pending** with their current (old) runtime.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-rollout-start.png"
    alt="An active deployment's Rollout tab in Avocado Connect: 1 device total, 0% on target, 1 pending — the device is Online but still reports its previous runtime."
    loading="lazy"
    decoding="async"
  />
</div>

As each device applies the update, it moves to **On target**. When every device converges, the deployment is **Completed**.

<div className="framed-shot">
  <img
    src="/img/guides/ota/connect-rollout-success.png"
    alt="A completed deployment's Rollout tab in Avocado Connect: 1 device total, 100% on target, 0 pending — the device reports the new runtime and is On target."
    loading="lazy"
    decoding="async"
  />
</div>

## Rollback and safety

- What happens when a bad OS update ships? A/B rollback to the rescue — read our Field Note: [Two boots to trust an update](/field-notes/2026/06/20/two-boots-trust-update).
- For more information, see [Deployments](/avocado-connect/deployments) and the [update architecture](/avocado-os/security/update-architecture).
- Turning on a manifest-level security feature (`image.verity`, `var.encrypt`) over OTA has an ordering rule: an update is applied by the avocadoctl **already on the device**, so ship the current avocadoctl in a plain OS update first. [Security features](/developer-reference/security) covers which transitions work over OTA and which need a reprovision.
