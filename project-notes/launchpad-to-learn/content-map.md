# DES-330 Phase 0 — LaunchPad → Docs content map

Audit of every LaunchPad route in Avocado Connect and where its content lands in Docs. Notes only; no product code changed.

- Sources: `peridio/avocado-connect-mono-repo` @ `077334c1` (`spa/src`), `peridio/docs` @ `777908de`, `avocado-linux/references` @ `main`, CLI reference `docs-guides/avocado-cli/commands.md` (`avocado 1.0.0-rc.5`).
- Companion files: [`cli-audit.md`](./cli-audit.md) (command-by-command check), [`redirects.csv`](./redirects.csv).
- All LaunchPad routes are mounted under `/orgs/:org_id/launchpad` in `spa/src/app/App.tsx` L319–412. Paths below drop that prefix.

## Proposed Docs structure

A new docs plugin instance (`id: 'learn'`, `path: 'docs-learn'`, `routeBasePath: 'learn'`, own sidebar), following the existing `hardware`/`guides` instances in `src/docusaurus.config.js`.

```
/learn                         landing (replaces LaunchPad "Getting Started" mission rail)
/learn/get-started             moved from /developer-reference/getting-started (index, qemu, raspberry-pi, jetson, frdm-imx93, any-target)
/learn/missions/first-ota
/learn/missions/remote-app
/learn/missions/pi-gateway
/learn/missions/jetson-vision
/learn/tutorials               index (replaces LaunchPad Workflows tab)
/learn/tutorials/device-heartbeat
/learn/tutorials/react-cross-compile
/learn/tutorials/rust-cross-compile
/learn/dev-kit-to-production
```

Product Docs → Avocado Connect gains 7 pages: `/avocado-connect/{runtimes,device-groups,code-signing,api-tokens,access-control,team,billing}`.

## 1. Shell, tabs, and legacy routes

| LaunchPad path | Source files | Docs destination | Notes |
|---|---|---|---|
| `/` (index, "Getting Started") | `routes/GetStartedPage.tsx`, `components/launchpad/MissionRail.tsx`, `lib/launchpad/useLaunchCompletion.ts` (localStorage completion) | `/learn` | Mission rail = First OTA → Remote App → fork to Pi Gateway / Jetson Vision. Rebuild as a static landing page with the same order. Completion ticks are localStorage-only and are dropped. |
| `get-started`, `essentials`, `marketplace`, `sequence` | `App.tsx` `<Navigate to="..">` | `/learn` | Legacy redirects. `marketplace` and `sequence` are **still linked from the sidebar** (`components/sidebar/SidebarNav.tsx` `LAUNCHPAD_CHILDREN`) and from `lib/navigation/routeTopNav.ts` ("My Launch Sequence"), but only bounce back to the index. |
| `workflows` | `routes/WorkflowsPage.tsx`, `components/launchpad/workflow-catalog.tsx`, `launchpad-workflows.tsx` | `/learn/tutorials` | Cards: Core Concepts, Heartbeat, React, Rust, OTA + 3 "coming soon" (Data Egress, Remote Access Tunnels, HITL). "Remote Access Tunnels" is listed as coming soon although tunnels ship (Remote App mission, `/avocado-connect/tunnels`): drop it. HITL already has Docs: `/developer-reference/hardware-in-the-loop`. |
| `platform` | `routes/PlatformPage.tsx` | `/avocado-connect/overview` | Index of the 14 platform guides (see section 4). |
| `hardware` | `routes/HardwarePage.tsx`, `components/launchpad/PlatformPicker.tsx` (`HardwareSectionBlock`), `launchpad-hardware.tsx`, `platform-picker-data.ts`, `lib/launchpad/useLaunchpadRoute.ts` | `/learn/dev-kit-to-production` | See section 6. |
| `*` (catch-all) | `routes/ComingSoonPage.tsx` | `/learn` | |
| `/orgs/:org_id` (Dashboard, not LaunchPad) | `routes/DashboardPage.tsx` | n/a | Out of scope for the redirect map, but removing it needs a new landing route. `SmartRedirect` and invite-accept in `App.tsx` navigate to `/orgs/:id`. |

## 2. Missions → `/learn/missions/*`

All four are interactive in Connect: left-pane command/preview, scroll-synced steps, and "Open Fleet/Projects" deep links. Docs versions become linear pages. Connect deep links become plain instructions ("open **Fleet** in the console").

| Mission | Path | Source files | Docs destination | Overlap with existing Docs | Net new |
|---|---|---|---|---|---|
| First OTA | `ota-guide` | `routes/OtaGuidePage.tsx`, `components/ota-guide/` (`ota-sections.ts` + 4 view files) | `/learn/missions/first-ota` | `/developer-reference/ota` (connect auth, link, upload, deploy, watch rollout); `/developer-reference/getting-started/qemu` (init/install/build/provision/`sdk run`); generated reference page `/developer-reference/references/shell-heartbeat` | End-to-end QEMU narrative: edit `heartbeat.sh` (adds `disk_free_kb`), `build -e heartbeat`, `connect upload dev --version dev-002 --publish`, `connect deploy --activate`, validate via `journalctl`. Expected agent log lines. **Stale reference name** `heartbeat-experimental` → `shell-heartbeat`. |
| Remote App | `remote-app-guide` | `routes/RemoteAppGuidePage.tsx`, `components/remote-app-guide/` (3 files) | `/learn/missions/remote-app` | `/developer-reference/remote-tunnel` (open/use tunnel); `/avocado-connect/tunnels`; reference page `react-dashboard` | Combined flow: React reference + `connect init` + QEMU boot + `systemctl status ref-reactjs` + HTTP tunnel to port 4000. **Stale reference** `react-experimental` → `react-dashboard`. Tunnel step says "Fleet page → find device"; tunnels are created on Device Detail. Wording needs a check. |
| Pi Gateway | `pi-gateway-guide` | `routes/PiGatewayGuidePage.tsx`, `components/pi-gateway-guide/` (3 files) | `/learn/missions/pi-gateway` | `/developer-reference/getting-started/raspberry-pi` (Pi 5 init/build/provision sd/usb, serial, SSH); reference page `python-mqtt` | Python telemetry agent → public broker (`broker.emqx.io`, topic `avocado/+/telemetry`) viewed in MQTTX. **Reference `python-basic` does not exist**; content matches `python-mqtt`. Needs owner confirmation. Public-broker demo caveat must carry over. |
| Jetson Vision | `jetson-vision-guide` | `routes/JetsonVisionGuidePage.tsx`, `components/jetson-vision-guide/` (3 files) | `/learn/missions/jetson-vision` | `/developer-reference/getting-started/jetson` (recovery mode, tegraflash, serial); field note `2026-06-22-fastest-path-ai-vision-nvidia`; reference page `nvidia-deepstream` | Native DeepStream people detection, tunnel to :8080, `/stream` + `/api/stats` endpoints, camera MJPG caveat. **Service name wrong**: guide uses `systemctl status app` / `journalctl -u app`; the reference ships `vision-app.service`. |

## 3. Workflows → `/learn/tutorials/*`

| Workflow | Path | Source files | Docs destination | Overlap | Net new |
|---|---|---|---|---|---|
| Device Heartbeat | `heartbeat-guide` | `routes/HeartbeatGuidePage.tsx`, `components/heartbeat-guide/` (`heartbeat-sections.ts`, `heartbeat-yaml.ts`, + 4 view files) | `/learn/tutorials/device-heartbeat` | `/avocado-os/core-concepts` (extensions, overlay, systemd); reference page `shell-heartbeat` | Annotated walkthrough of `avocado.yaml` and the extension files (`heartbeat.sh`, `.service`, `.conf`). The YAML is an **embedded copy** (`heartbeat-yaml.ts`), so it can drift from the reference. Docs should pull it from the reference or pin a commit. Stale `heartbeat-experimental` → `shell-heartbeat`. |
| React Cross-Compile | `react-guide` | `routes/ReactGuidePage.tsx`, `components/react-guide/` (`react-sections.ts`, `react-yaml.ts`, + 4) | `/learn/tutorials/react-cross-compile` | `/developer-reference/cross-compilation` (SDK compile model, Rust example); reference page `react-dashboard`; field note `nodejs-dashboard-portability` | React compile/install scripts walkthrough, `--host-fwd "4000-:4000"`, macOS Docker `-p` workaround, modify-and-reprovision loop. Stale `react-experimental` → `react-dashboard`. |
| Rust Cross-Compile | `rust-guide` | `routes/RustGuidePage.tsx`, `components/rust-guide/` (`rust-sections.ts`, `rust-yaml.ts`, + 4) | `/learn/tutorials/rust-cross-compile` | `/developer-reference/cross-compilation` already has "Example: Cross-compiling a Rust application" (**high overlap**); reference page `rust-vitals` | Reference-driven flow, `ref-rust.service` observe step, modify-and-reprovision. Consider making this the long-form tutorial and linking from cross-compilation. Stale `rust-experimental` → `rust-vitals`. |

## 4. Get-started guides

| Item | Path | Source files | Docs destination | Overlap | Net new |
|---|---|---|---|---|---|
| Core Concepts | `concepts` | `routes/CoreConceptsPage.tsx`, `components/core-concepts/` (`concepts.ts`, `ConceptList.tsx`, `YamlViewer.tsx`) | Merge into `/avocado-os/core-concepts` | **Near-total.** Docs already has all 7 topics (avocado.yaml, Runtimes, Extensions, Packages, Overlay, systemd, Lifecycle Hooks) in more depth. | Only the scroll-synced YAML highlighting and the heartbeat YAML as a running example. Merge any one-line summaries Docs lacks; otherwise just redirect. |
| QEMU Quick Start | `qemu-quickstart` | `routes/QemuQuickStartPage.tsx`, `components/qemu-quickstart/` (`quickstart-sections.ts`, `reference-yaml.ts`, `QuickStartDeviceCard.tsx`, `OverviewPanel.tsx`, `TroubleshootingPanel.tsx`, …) | Static steps → `/learn/get-started/qemu` (the moved `getting-started/qemu.md`) | Docs `qemu.md` covers init/install/build/provision/`sdk run`/SSH + stale-volume troubleshooting | Connect registration and verification: claim token, agent log expected output, device appears online, tunnel. **Interactive parts cannot move**: live claim-token widget and live device card (`use-device-channel.ts` over `launchpad:org:<id>` socket). **Stale**: `qemu-quickstart-experimental` → `qemu-quickstart`. The "paste token into `overlay/etc/avocado-conn/config.toml`" step targets a file the current reference doesn't have. Replace with `avocado connect auth login && avocado connect init`, as the OTA mission does. |
| Project Walkthrough | `project-walkthrough` | `routes/ProjectWalkthroughPage.tsx`, `components/launchpad/project-walkthrough-data.ts`, `ProjectMockPreview.tsx` | Absorb into `/avocado-connect/projects` (new "How it fits together" section) | `projects.mdx` lists runtimes/cohorts/deployments/provisioning | Four-step narrative (Project → Cohorts → Runtimes → Deployments) with mock UI. Use existing screenshots instead of the mock. |

### Platform guides (14) → Product Docs → Avocado Connect

All are `routes/guides/<Name>GuidePage.tsx` using `components/launchpad/GuidePage.tsx` + `CodeBlock.tsx` (4 prose sections + a right-hand "API/CLI reference" panel). Commands are audited in [`cli-audit.md`](./cli-audit.md).

| Guide | Path | Docs destination | Overlap | Net new / issues |
|---|---|---|---|---|
| Organize with Projects | `projects-guide` | `/avocado-connect/projects` | High: projects.mdx covers structure + access | "When to use projects" guidance; endpoint list → link API ref `/developer-reference/avocado-connect-api/projects-cohorts`. |
| Manage Your Fleet | `fleet-guide` | `/avocado-connect/fleet` | High | Little; endpoints → API ref `devices`. |
| Manage Runtimes | `runtimes-guide` | **New** `/avocado-connect/runtimes` | Partial: deployments.mdx paragraph on runtimes; API ref `runtimes` | Lifecycle (awaiting_upload/draft/published/deprecated), immutability. **CLI panel is stale** (`avocado upload`, `avocado runtime publish`, `avocado runtime list` used as a Connect command). |
| Deploy Software | `deploy-guide` | `/avocado-connect/deployments` | High | Example curl is missing required `name`; response mock is fictional. |
| Track with Cohorts | `cohorts-guide` | `/avocado-connect/deployments` (new `#cohorts` section) | Medium: fleet.mdx + deployments.mdx mention cohorts | Cohort tunnel policies section is net new. |
| Claim & Provision Devices | `provisioning-guide` | `/avocado-connect/getting-started` (new `#claim-tokens` section) | High: getting-started.mdx already has claim tokens + screenshot; `/developer-reference/provisioning` | Manufacturing-integration section; CLI `claim-tokens create` is valid. API endpoint path is wrong (`claim-tokens` → `claim_tokens`, not project-nested). |
| Create Device Groups | `groups-guide` | **New** `/avocado-connect/device-groups` | Low: projects.mdx mentions groups for access | Whole page. Note: "groups" are **user** groups for access control, despite the "Device Groups" title. Title needs product confirmation. |
| Set Up Remote Access | `remote-access-guide` | `/avocado-connect/tunnels` | High (+ `/developer-reference/remote-tunnel`) | Tunnel policies section. Curl body/response stale. |
| Set Up Code Signing | `signing-guide` | **New** `/avocado-connect/code-signing` | Partial: deployments.mdx TUF paragraph; API ref `signing-trust`; CLI `connect keys`/`connect trust` | Trust-chain explainer. Response mock stale. |
| Manage API Tokens | `api-tokens-guide` | **New** `/avocado-connect/api-tokens` | API ref `authentication-tokens` covers endpoints | Use cases + security practices. **Curl is stale** (body shape, prefix, response, no host/auth). Org-scoped tokens (`/api/orgs/:org_id/api-tokens`) aren't mentioned. Also linked from `routes/SettingsApiKeysTab.tsx:201`. |
| Access Control | `access-control-guide` | **New** `/avocado-connect/access-control` | Partial: projects.mdx "Access control" | Permission model (project vs cohort, user vs group). Cohort access endpoints are wrong (missing `/projects/:project_id`). |
| Invite Your Team | `team-guide` | **New** `/avocado-connect/team` | None | Roles list omits `owner` (API roles: owner/admin/member). |
| Configure Billing | `billing-guide` | **New** `/avocado-connect/billing` | overview.mdx "Developer tier" line | **Limits are stale**: guide says Development = 1 member / **5 devices** / 1 tunnel; `api/lib/avocado_connect_api/tier_limits.ex` says **1 device**. Docs overview calls the tier "Developer"; the code tier is `development`. Pricing copy needs owner sign-off. |

## 5. Board provisioning guides → Hardware pages

Source for all six: `routes/guides/<Board>ProvisionPage.tsx` (6-line wrappers) → `components/hardware-guides/hardware-guide-data.ts` + `HardwareGuidePage.tsx` / `HardwareGuideSections.tsx`. Five use `makeStandardProvisionGuide`, which produces these steps: prerequisites (x86_64 Linux host, board, USB-serial adapter, microSD), disable automount (`gsettings`), install CLI + `init --target` + `install --force`, `build`, serial console (`tio -b 115200 /dev/ttyUSB0`), `provision -r dev --profile <p>`, first boot.

**Reachability bug:** the Hardware tab's "guide" links use `guideTo: '/launchpad/provision/…'` with no `/orgs/:org_id` prefix (`launchpad-hardware.tsx`, rendered by `PlatformPicker.tsx` L194–196 / L255–257). They fall through to `<Route path="*">` → `/`. Today these pages are only reachable by typing the URL.

| Board | LaunchPad path | Docs page | Already on Docs page | Missing from Docs page (to add) |
|---|---|---|---|---|
| NVIDIA Jetson Orin Nano DK | `provision/jetson-orin-nano` | `/hardware/nvidia/jetson-orin-nano-developer-kit` | Only "Init, Install & Build" → link to `getting-started/jetson` (which has prerequisites incl. NVMe, serial, recovery jumper, `lsusb`, tegraflash, remove-jumper) | On the hardware page itself: Provision + Run sections (or explicit "Provisioning: see …" block). From LaunchPad, not in Docs anywhere: host needs **binfmt_misc + qemu-user-static** and **≥16 GB free disk**; expected `lsusb` line (`0955:7020 NVIDIA Corp. APX`); "you'll be prompted to unplug/replug USB-C **twice** during flash". |
| NXP i.MX 8M Plus EVK | `provision/nxp-imx8mp` | `/hardware/nxp/imx8mp` | Provision (`--profile sd`), automount note, Run | Prerequisites list (host, USB-serial adapter, microSD); serial console step (`tio`, baud 115200, device path). |
| OnLogic FR201 (draft in LaunchPad) | `provision/onlogic-fr201` | `/hardware/onlogic/fr201` | Provision (`--profile usb`), Run | Automount note (USB drive is also auto-mounted); prerequisites; serial console. LaunchPad's generic prerequisites say "microSD" but FR201 uses `usb`, so don't copy that line. **Data bug:** `platform-picker-data.ts` maps FR201 → recommended dev kit **NXP i.MX 8MP EVK**, but FR201 is CM4/BCM2711 (per Docs specs). It should be Raspberry Pi 4. |
| Raspberry Pi 4 Model B | `provision/raspberry-pi-4` | `/hardware/raspberry-pi/raspberry-pi-4-model-b` | Provision (`sd`), automount note, Run | Prerequisites; serial console step. |
| Raspberry Pi 5 | `provision/raspberry-pi-5` | `/hardware/raspberry-pi/raspberry-pi-5` | Only "Init, Install & Build" → link to `getting-started/raspberry-pi` (has serial, sd **and** usb options, Run) | On the hardware page: Provision + Run sections (or explicit pointer). LaunchPad adds nothing beyond `getting-started/raspberry-pi`. |
| Seeed reTerminal (draft in LaunchPad) | `provision/seeed-reterminal` | `/hardware/seeed/reterminal` | Provision (`sd`), automount note, Run | Prerequisites; serial console. **Needs owner confirmation:** reTerminal is CM4 with eMMC (per Docs specs). An "SD card" profile is suspect for eMMC SKUs (usually needs rpiboot/usbboot), and both Docs and LaunchPad say `--profile sd`. |

## 6. Dev-kit matcher → `/learn/dev-kit-to-production`

Source: `routes/HardwarePage.tsx`, `components/launchpad/launchpad-hardware.tsx` (`HARDWARE`, `PRODUCTION_HARDWARE`), `platform-picker-data.ts` (`COMPATIBILITY`), `lib/launchpad/useLaunchpadRoute.ts` (localStorage). `PlatformPicker` (the full component, L411+) appears unused. Only `HardwareSectionBlock` is imported.

Static Docs version: a table "Production target → recommended dev kit → compatible dev kits", each cell linking to its Hardware page:

| Production target | LaunchPad recommended / compatible | Docs page | Issue |
|---|---|---|---|
| Advantech ICAM-540 | Jetson Orin Nano / – | `/hardware/advantech/icam-540` | |
| Advantech MIC-715-OX | Jetson Orin Nano / – | `/hardware/under-evaluation/mic-715-ox` | Under evaluation in Docs |
| Advantech MIC-733-AO | Jetson Orin Nano / – | `/hardware/advantech/mic-733-ao` | |
| Advantech TPC-115W | i.MX 8MP EVK / i.MX 93 FRDM | `/hardware/under-evaluation/tpc-115w` | Under evaluation in Docs |
| OnLogic FR201 | i.MX 8MP EVK / i.MX 93 FRDM | `/hardware/onlogic/fr201` | **Wrong**: CM4-based, so the match should be RPi 4 (/ RPi 5) |
| Seeed reTerminal | RPi 4 / RPi 5 | `/hardware/seeed/reterminal` | |

Dev kits: Jetson Orin Nano DK, Grinn AstraSOM-1680 (`/hardware/grinn/astrasom-1680`), NXP i.MX 8MP EVK, NXP i.MX 93 FRDM (`/hardware/nxp/frdm-imx-93`), RPi 4, RPi 5. Net new: the whole matcher concept. Overlap: `/hardware/support-matrix`. Docs has many more production targets (MIC-712-OX, Variscite, CompuLab, SolidRun, Qualcomm…) than LaunchPad's 6. Decide whether to expand the table or keep LaunchPad's curated list.

## 7. Other LaunchPad / Dashboard references to update

**Mono repo**

| File | Reference | Action |
|---|---|---|
| `.claude/skills/qa-guide.md` (L3, 8, 22, 132) | QA bot drives `$CONNECT_PERIDIO_URL/orgs/<org-id>/launchpad/<guide-name>` | Retarget to Docs pages or retire. Also `docs/superpowers/{plans,specs}/2026-03-18-qa-bot-*` design docs. |
| `.claude/agents/{architect,ui-ux-designer,product-manager}/*.md` | "Launchpad — Guided onboarding for qemu, Pi, and Jetson targets" | Update feature list |
| `documentation/ops/DEMO_ORG.md` L64, L68 | "dashboard's tunnel counter", "**Dashboard** — Tunnels StatCard" | Point at Fleet / Device Detail |
| `spa/src/routes/projects/ProjectRuntimesTab.tsx:153` | `https://docs.peridio.com/avocado-linux/tools/avocado-cli/overview` | **Broken (HTTP 404, verified).** Correct URL: `https://docs.peridio.com/developer-reference/avocado-cli/overview` (200). Fix independently of DES-330. |
| `spa/src/routes/SettingsApiKeysTab.tsx:201` | Links `/orgs/:id/launchpad/api-tokens-guide` | Point at `/avocado-connect/api-tokens` |
| `spa/src/components/sidebar/SidebarNav.tsx`, `lib/navigation/routeTopNav.ts`, `routes/launchpadTabs.tsx`, `components/layouts/LaunchPadLayout.tsx` | Nav entries (Dashboard, LaunchPad + children) | Remove; add external "Learn" link |
| `spa/src/routes/FleetPage.tsx`, `DeviceDetailPage.tsx`, `components/tunnels.tsx`, `components/tunnel-constants.ts` | Import `LaunchPadTunnel`/`TunnelState` from `components/launchpad/launchpad-types.ts` | **Coupling.** Move the types before deleting `components/launchpad/` |
| `spa/src/components/launchpad/UserIntakeWidget.tsx`, `user-intake-data.ts`, `lib/launchpad/{intakeApi,useUserIntake}.ts`, `api` `PUT /api/me/intake`, `integrations/hubspot/contact_payload.ex` | Post-signup intake form lives **only** in `LaunchPadLayout` and feeds HubSpot lifecycle (`intake_completed`) | **GTM risk.** Needs a new home before LaunchPad goes away |
| `api/lib/avocado_connect_api_web/router.ex` L386–390, `launch_pad_controller.ex`, `launch_pad.ex`, `channels/launch_pad_channel.ex`, PubSub `launchpad:<org>` in `devices.ex`/`device_auth.ex`/`device_tunnel_controller.ex` | LaunchPad session API + live channel | Decide keep/retire; channel also powers QEMU live device card. Tests in `api/test/**/launch_pad*` |
| `documentation/LAUNCH_PAD_REQUIREMENTS.md`, `documentation/requirements/launchpad-requirements.md`, `onboarding-prd.md`, `STYLE_GUIDE.md`, `FEATURE_GAPS.md`, `api/posthog.md` | Specs/analytics referencing LaunchPad | Mark superseded |
| `CLAUDE.md` | `PUT /api/me/intake` "Upsert LaunchPad intake" | Update when intake moves |

**Docs repo**

| File | Reference | Action |
|---|---|---|
| `src/docs-overview/avocado-connect/getting-started.mdx` L19–42 | "## Launchpad" section, mentions **Dashboard**, screenshots `img/avocado-connect/launchpad.png`, `launchpad-workflows.png` | Rewrite to point at `/learn`; delete screenshots |
| `src/docs-overview/avocado-connect/overview.mdx` L17 | `img/avocado-connect/dashboard.png` hero | Replace with Fleet screenshot |
| `src/docs-guides/avocado-connect-api/remote-access.md` L117, `src/openapi/avocado-connect-openapi.json` L4180 | "used by LaunchPad/Fleet" | Regenerate from API OpenAPI after API text changes (generated file; don't hand-edit) |
| `src/docs-guides/avocado-connect-api/authentication-tokens.md` | Create-token example response shows `data.raw_token` + `inserted_at`; API returns `data.token.token` + `created_at` | Spec drift. Fix in API OpenAPI fragments, then regenerate |

## Notes on `redirects.csv`

- Section 1 is for a Connect `DocsRedirect` route. `:org_id` is dropped, and the catch-all row must be matched last.
- Two targets use anchors that don't exist yet: `/avocado-connect/deployments#cohorts` and `/avocado-connect/getting-started#claim-tokens`. Create those headings when absorbing the content.
- Section 2 rows go into `@docusaurus/plugin-client-redirects` in `src/docusaurus.config.js`. The `download` row already exists there today; it's listed only so nobody repoints it at `/learn`. Client redirects drop `#anchors` on the old URL, which is fine because the moved pages keep their headings.

## 8. Biggest risks and gaps

1. **Every reference-based guide uses reference names that don't exist** in `avocado-linux/references@main`: `heartbeat-experimental`, `qemu-quickstart-experimental`, `react-experimental`, `rust-experimental`, `python-basic`. The extension names they use (`heartbeat`, `example-reactjs`, `example-rust`) match `shell-heartbeat`, `react-dashboard`, `rust-vitals`, so the rename is near-certain. `python-basic` → `python-mqtt` is inferred. Copying LaunchPad steps verbatim would ship broken first commands.
2. **QEMU Quick Start claim-token step is obsolete** (config overlay file absent from the reference). It also depends on live widgets (claim-token mint and device card via the LaunchPad socket) that static Docs can't replicate. Docs must use `avocado connect init`.
3. **Intake form and HubSpot lifecycle** live only inside LaunchPad. Removing it drops the signup intake signal unless it moves first.
4. **Shared types/coupling**: Fleet, Device Detail, and tunnels import from `components/launchpad/launchpad-types.ts`. Removing the LaunchPad folder breaks those pages.
5. **Platform guide API panels have stale examples** (API tokens, tunnels, signing, deploy, access control, claim tokens) and stale billing limits. See `cli-audit.md`. They need rewriting, not copying.
6. **Hardware data errors**: FR201 matched to the wrong dev-kit family; reTerminal `sd` profile questionable; provisioning guides already unreachable from the UI (broken `guideTo`).
7. **Docs-internal move** of `/developer-reference/getting-started/*` touches ~140 internal links, including generated `src/data/hardware/{targets,generated-targets}.json` (produced by `scripts/sync-targets.js`, so the generator must change too), `HardwareHero` CTAs on ~27 hardware pages, `HardwareCarousel`, and `docs-overview/resources.mdx`. External inbound links (peridio.com, CLI output, READMEs) need the client redirects in `redirects.csv`.
8. **Embedded YAML copies** (`heartbeat-yaml.ts`, `react-yaml.ts`, `rust-yaml.ts`, `qemu-quickstart/reference-yaml.ts`) can silently drift. Docs should source from the generated reference pages (`/developer-reference/references/*` via `scripts/sync-references.js`) or pin a commit.
