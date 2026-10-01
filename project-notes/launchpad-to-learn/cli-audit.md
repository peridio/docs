# DES-330 Phase 0 — LaunchPad CLI / API command audit

Every CLI, curl, and API command shown in LaunchPad, checked against:

- CLI: `src/docs-guides/avocado-cli/commands.md` (generated from `--help` of `avocado 1.0.0-rc.5 (78732c3 2026-09-17)`), plus `avocado-linux/avocado-cli` `src/main.rs` for hidden flags. `cli-usage-notes/notes.md` in the mono repo only lists `build`, `provision -r dev`, `sdk run -iE vm dev`.
- References: `avocado-linux/references@main` directory listing and each reference's `avocado.yaml` / systemd units.
- API: `api/lib/avocado_connect_api_web/router.ex` + controllers/schemas in the mono repo (`077334c1`).

Paths are relative to `spa/src/`. Status: **OK**, **STALE** (corrected command given), **NEEDS OWNER** (can't determine), **MINOR** (works, but misleading).

## 1. CLI commands

### Valid as written

| Command | Where | Status | Note |
|---|---|---|---|
| `curl -fsSL https://connect.peridio.com/install.sh \| sh` (`AVOCADO_INSTALL_COMMAND`) | all guides | OK | URL returns 200; matches `/developer-reference/avocado-cli/installation` |
| `avocado init --target <t> <dir>` (imx8mp-evk, fr201, raspberrypi4/5, reterminal, jetson-orin-nano-devkit) | `components/hardware-guides/hardware-guide-data.ts` | OK | Targets match `src/data/hardware/targets.json` |
| `avocado install --force` / `avocado install -f` | all | OK | `-f, --force` exists. Docs getting-started uses plain `avocado install`, so pick one for consistency |
| `avocado build`, `avocado build -e <ext>` | all | OK | `-e, --extension` exists |
| `avocado provision -r dev [--profile sd\|usb\|tegraflash]` | all | OK | `-r/--runtime` is a **hidden** alias (`main.rs` L439 `hide = true`). The documented form is `avocado provision dev`. Docs getting-started also uses `-r`, so keep or switch both together |
| `avocado sdk run -iE vm dev [--host-fwd "4000-:4000"]` | qemu, heartbeat, react, rust, OTA, remote-app | OK | Same as `/developer-reference/getting-started/qemu` |
| `avocado sdk run -iE --container-arg "-p" --container-arg "4000:4000" vm dev --host-fwd "4000-:4000"` | `components/react-guide/react-sections.ts` (macOS note) | OK | `--container-arg` exists |
| `avocado connect auth login` | OTA, remote-app, pi-gateway, jetson-vision, provisioning | OK | `avocado login` is the shortcut |
| `avocado connect init` | OTA, remote-app, pi-gateway, jetson-vision | OK | |
| `avocado connect upload dev --version dev-002 --publish` | `components/ota-guide/ota-sections.ts` L197 | OK | |
| `avocado connect deploy --activate` | `ota-sections.ts` L217 | OK | |
| `avocado connect claim-tokens create --name production-batch-1 --max-uses 10` (+ `--no-expiration` note) | `routes/guides/ProvisioningGuidePage.tsx` L92 | OK | All flags exist; 24h default expiry is accurate |
| `tio -b 115200 /dev/ttyUSB0`, `lsusb \| grep -i nvidia`, `gsettings set org.gnome.desktop.media-handling automount[-open] false` | hardware guides, jetson-vision | OK | Host tools. Docs prefers linking `/developer-reference/linux-auto-mounting` over inlining `gsettings` |
| `journalctl -u avocado-conn -f`, `journalctl -u heartbeat -f`, `systemctl status ref-reactjs`, `systemctl status ref-rust` | device-side | OK | Unit names match the renamed references (`heartbeat.service`, `ref-reactjs.service`, `ref-rust.service`) |
| `systemctl status app` / `journalctl -u app -f` | `components/pi-gateway-guide/pi-gateway-sections.ts` L117/122 | OK *if* reference is `python-mqtt` (ships `app.service`) | Depends on the reference confirmation below |

### Stale

| # | Command as shown | Where | Problem | Corrected command |
|---|---|---|---|---|
| C1 | `avocado build` → `avocado upload --project smart-thermostat --version 1.2.0` | `routes/guides/RuntimesGuidePage.tsx` L58 | No top-level `upload`. Upload is `avocado connect upload <RUNTIME> --version <V>`. `--project` takes a **project ID** (or `connect.project` in `avocado.yaml`), not a slug | `avocado connect upload dev --version 1.2.0` (after `avocado connect init`; or add `--project <PROJECT_ID>`) |
| C2 | `avocado runtime publish --project smart-thermostat --version 1.2.0` | `RuntimesGuidePage.tsx` L64 | No `runtime publish` subcommand (`avocado runtime` has install/build/provision/list/deps/dnf/clean/deploy/sign) | Publish at upload time: `avocado connect upload dev --version 1.2.0 --publish`. Or publish in the console (Project → Runtimes). `PUT /api/orgs/:org_id/projects/:project_id/runtimes/:id` also exists, but a status-change payload **needs owner confirmation** |
| C3 | `avocado runtime list --project smart-thermostat` | `RuntimesGuidePage.tsx` L70 | `avocado runtime list` lists **local** runtime names from `avocado.yaml` and has no `--project` | `avocado connect runtimes list` (uses `connect.project`; or `--project <PROJECT_ID>`) |
| C4 | `avocado init --reference qemu-quickstart-experimental` + `cd qemu-quickstart-experimental` | `components/qemu-quickstart/quickstart-sections.ts` L138/149, `reference-yaml.ts` L3 | Reference doesn't exist on `main` | `avocado init --reference qemu-quickstart qemu-quickstart && cd qemu-quickstart` |
| C5 | `avocado init --reference heartbeat-experimental` (L114, preceded by `mkdir … && cd …`); `avocado init my-heartbeat --reference heartbeat-experimental` | `components/heartbeat-guide/heartbeat-sections.ts` L114, `heartbeat-yaml.ts` L3, `ota-sections.ts` L85 | Reference doesn't exist | `avocado init my-heartbeat --reference shell-heartbeat` (extension names `heartbeat` / `heartbeat.service` match) |
| C6 | `avocado init --reference react-experimental`; `avocado init my-react-app --reference react-experimental` | `components/react-guide/react-sections.ts` L144, `react-yaml.ts` L3, `components/remote-app-guide/remote-app-sections.ts` L47 | Reference doesn't exist | `avocado init my-react-app --reference react-dashboard` (`example-reactjs` + `ref-reactjs.service` match) |
| C7 | `avocado init --reference rust-experimental` | `components/rust-guide/rust-sections.ts` L149/160, `rust-yaml.ts` L3 | Reference doesn't exist | `avocado init my-rust --reference rust-vitals` (`example-rust` + `ref-rust.service` match) |
| C8 | `avocado init --target raspberrypi5 gateway --reference python-basic` | `pi-gateway-sections.ts` L44 | Reference doesn't exist | **NEEDS OWNER.** Likely `avocado init --target raspberrypi5 gateway --reference python-mqtt`: its README matches the guide (public broker, `avocado/<machine-id>/telemetry`, `app.service`) |
| C9 | `$EDITOR overlay/etc/avocado-conn/config.toml` (paste claim token) | `quickstart-sections.ts` L196 | `qemu-quickstart@main` has no such overlay file. The other missions register with `connect init` | `avocado connect auth login && avocado connect init` (then `install`/`build`/`provision`) |
| C10 | `systemctl status app` / `journalctl -u app -f` | `components/jetson-vision-guide/jetson-vision-sections.ts` L129/134 | `nvidia-deepstream` ships `vision-app.service` | `systemctl status vision-app` / `journalctl -u vision-app -f` |
| C11 | "In Avocado Connect: Devices → your Jetson → Tunnels" / "Open the Fleet page … create an HTTP tunnel" | `jetson-vision-sections.ts` L151, `remote-app-sections.ts` L117 | UI path wording (not a command). Tunnels are created on Device Detail (`/orgs/:id/devices/:deviceId`) | **MINOR.** Write as "Fleet → select device → Tunnels". Confirm against current UI when writing Docs |

### Hardware guide copy (not commands, but wrong)

| # | Where | Problem |
|---|---|---|
| H1 | `hardware-guide-data.ts` `makeStandardProvisionGuide` prerequisites | Says "microSD card" for every board, including FR201 (`--profile usb`) |
| H2 | `SEEED_RETERMINAL_GUIDE` `profile: 'sd'` | reTerminal is CM4 with eMMC. **NEEDS OWNER**: confirm the `sd` profile applies (Docs page says the same) |

## 2. API endpoints and curl examples

The router base is `/api/orgs/:org_id/…`. No LaunchPad curl includes a host or auth header. Every corrected example below uses the Docs API reference convention: `https://connect.peridio.com` + `Authorization: Bearer $AVOCADO_TOKEN`.

### Endpoint blocks

| Guide | Endpoint shown | Status | Correct |
|---|---|---|---|
| Fleet | `GET /devices`, `GET /devices/stats`, `GET /devices/:id` | OK | |
| Projects | `GET/POST /projects` | OK | |
| Cohorts | `GET/POST /projects/:project_id/cohorts` | OK | |
| Deploy | `GET/POST /projects/:project_id/deployments`, `GET …/deployments/:id` | OK | |
| Groups | `GET/POST /groups`, `GET /groups/:id` | OK | |
| Team | `GET /members`, `POST/GET /invitations`, `DELETE /invitations/:id` | OK | |
| Billing | `GET /billing`, `POST /billing/checkout`, `POST /billing/portal` | OK | |
| Signing | `GET /signing/status`, `GET/POST /signing/keys`, `GET /trust/status` | OK | |
| Remote Access | `POST /tunnels`, `GET /tunnels/:id`, `DELETE /tunnels/:id` | OK | Device-scoped tunnel API (`DeviceTunnelController`) |
| API Tokens | `GET/POST /api/me/api-tokens`, `DELETE /api/me/api-tokens/:id` | OK | Org tokens (`/api/orgs/:org_id/api-tokens`) aren't mentioned; add them |
| Access Control | `POST /projects/:id/access/users`, `POST /projects/:id/access/groups` | OK | |
| Access Control | `POST /api/orgs/:org_id/cohorts/:id/access/users` and `…/groups` | **STALE (A1)** | `POST /api/orgs/:org_id/projects/:project_id/cohorts/:id/access/users` and `…/access/groups` (router L467/473) |
| Provisioning | `POST /api/orgs/:org_id/projects/:project_id/claim-tokens` | **STALE (A2)** | `POST /api/orgs/:org_id/claim_tokens` (underscore, org-level; body `{"claim_token": {"name", "cohort_id", "max_uses", "expires_at", "tags"}}`). Listing per project: `GET /api/orgs/:org_id/projects/:project_id/claim_tokens` |
| Provisioning | `POST /api/device/claim` | OK | Agent-only (guide says so) |

### Curl examples

**A3 — API Tokens (`routes/guides/ApiTokensGuidePage.tsx` L60–80). STALE.**

Shown:

```bash
curl -X POST /api/me/api-tokens \
  -H "Content-Type: application/json" \
  -d '{ "api_token": { "name": "ci-pipeline" } }'
# response: { "data": { "id", "name", "token": "avat_abc123...", "inserted_at" } }
```

Problems:

- No host and no auth. The endpoint needs a session cookie + CSRF token, or a Bearer token.
- The body is **flat**: `UserApiTokenController.create/2` passes top-level params to `Accounts.create_user_api_token/2`, which casts `name`, `expires_at`, `organization_id`. A wrapped `api_token` key fails validation (`name` required).
- Tokens are prefixed `avo_`, not `avat_` (`accounts.ex` L307).
- The response is `{"data": {"token": {id, name, organization_id, last_used_at, expires_at, created_at, token}}}`.

Corrected:

```bash
curl -X POST "https://connect.peridio.com/api/me/api-tokens" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "ci-pipeline"}'
```

```json
{
  "data": {
    "token": {
      "id": "0198…",
      "name": "ci-pipeline",
      "organization_id": null,
      "last_used_at": null,
      "expires_at": null,
      "created_at": "2026-…",
      "token": "avo_…"
    }
  }
}
```

The first token must come from the console (Settings → API Keys) or `avocado connect auth login`, because creating one needs auth.

**Docs drift:** `src/docs-guides/avocado-connect-api/authentication-tokens.md` documents `data.raw_token` + `inserted_at`. The controller returns `data.token.token` + `created_at`. Fix the API OpenAPI fragment and regenerate. **NEEDS OWNER**: which is intended.

**A4 — Deploy (`routes/guides/DeployGuidePage.tsx` L59). STALE.**

- The `{"deployment": {...}}` wrapper is correct.
- `name` is **required** (`Deployment.changeset` `validate_required([:name, :cohort_id, :runtime_id])`) but missing from the example.
- The response mock (`runtime_version`, `cohort_name`, `progress{}`) doesn't match `render_deployment/1`, which returns `id, name, description, status, rollout_percentage, cohort_id, runtime_id, device_ids, filter_tags, is_targeted, tuf_* …`.

```bash
curl -X POST "https://connect.peridio.com/api/orgs/$ORG_ID/projects/$PROJECT_ID/deployments" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"deployment": {"name": "v1.2.0-beta", "runtime_id": "…", "cohort_id": "…"}}'
```

CLI equivalent: `avocado connect deploy --runtime <ID> --cohort <ID> --activate`.

**A5 — Remote Access (`routes/guides/RemoteAccessGuidePage.tsx` L59). STALE.**

- `DeviceTunnelController.create/2` takes **flat** `device_id` and optional `device_proxy_port` (default `9090`, the device-side proxy). There's no `tunnel` wrapper and no `port`.
- Response keys: `id, state, device_id, relay_endpoint ("host:port"), server_proxy_port, device_proxy_port, expires_at, established_at, failure_reason`. The mock uses `status` and `wg://…`.
- The target service port (22, 4000…) isn't set here. **NEEDS OWNER**: how the target port is chosen (via device proxy / tunnel policy?) before Docs describes it.

```bash
curl -X POST "https://connect.peridio.com/api/orgs/$ORG_ID/tunnels" \
  -H "Authorization: Bearer $AVOCADO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"device_id": "…"}'
```

**A6 — Signing (`routes/guides/SigningGuidePage.tsx` L73). STALE.**

- The example authenticates with a raw session cookie (`-H "Cookie: _avocado_connect_api_key=..."`). The cookie is httpOnly, so users can't copy it. Use a Bearer token.
- The response mock (`initialized, root_version, targets_key_count, last_rotation`) doesn't match `SigningController.status/2`, which returns `setup_complete, root_rotated, root_json_version, timestamp_ttl_days, server_key_hex, server_keyid[, root_key]`.

```bash
curl "https://connect.peridio.com/api/orgs/$ORG_ID/signing/status" \
  -H "Authorization: Bearer $AVOCADO_TOKEN"
```

CLI equivalent: `avocado connect trust status`.

## 3. Content facts that are stale (non-command)

| # | Where | Shown | Actual (source) | Status |
|---|---|---|---|---|
| F1 | `routes/guides/BillingGuidePage.tsx` "Plan Tiers" | Development: 1 member, **5 devices**, 1 tunnel | `tier_limits.ex`: `development` = 1 user, **1 device**, 1 tunnel, 2 claim tokens | STALE. Public pricing copy **NEEDS OWNER** |
| F2 | `docs-overview/avocado-connect/overview.mdx` | "**Developer** tier" | Tier key `development` | NEEDS OWNER (marketing name vs key) |
| F3 | `routes/guides/TeamGuidePage.tsx` "Roles" | Admin, Member | `organizations.ex` `@admin_roles ~w(owner admin super_user)`, plus `member` | MINOR. Add Owner |
| F4 | `routes/guides/RuntimesGuidePage.tsx` | "draft, published, deprecated" | `Runtime` status enum also has `awaiting_upload` | MINOR |
| F5 | `routes/guides/GroupsGuidePage.tsx` title "Create Device Groups" | Groups are **user** groups for access control (`GroupController` add/remove **members** by `user_id`) | | NEEDS OWNER. Title is misleading |
| F6 | `components/launchpad/platform-picker-data.ts` | FR201 → i.MX 8MP EVK | FR201 is CM4/BCM2711 (Docs hardware page) | STALE. Should be RPi 4 / RPi 5 |
