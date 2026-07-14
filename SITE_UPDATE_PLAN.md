# Site Update Plan — `nsinas/reqs-cleanup`

Cleanup pass on the docs site to reflect two product realities:

1. **Avocado Desktop** (macOS) now bundles the build VM ("Avocado VM"), so on macOS a user no longer needs Docker Desktop — Desktop is a self-contained alternative to the CLI + Docker path.
2. **UART/serial** is no longer a hard requirement for most flows — a user can SSH into the device instead of attaching a console adapter.

This plan covers the seven requested items plus additional findings from a full sweep of the `src/` tree.

---

## Key facts & canonical links (use these everywhere)

| Thing | Route / value |
| --- | --- |
| Avocado CLI overview | `/developer-reference/avocado-cli/overview` |
| Avocado CLI installation | `/developer-reference/avocado-cli/installation` |
| Avocado Desktop | `/avocado-desktop/overview` |
| Desktop platform support | macOS 13.0 (Ventura)+ **only**; Windows/Linux "on the way" |
| Desktop bundles | build VM ("Avocado VM"), toolchain, provisioning, AI agent — **no Docker Desktop required** |
| Docker Desktop (CLI path) | `https://www.docker.com/products/docker-desktop/` |

**Two supported host setups to describe on every Getting Started page:**

- **macOS** — either (a) **Avocado CLI** + **Docker Desktop**, or (b) **Avocado Desktop** (no Docker Desktop required).
- **Linux** — **Avocado CLI** + **Docker Desktop** (Avocado Desktop is not yet available on Linux).

> Recommendation: encode this in a **single shared component** (e.g. `src/src/components/shared/HostPrerequisites.tsx`) and drop it into all Getting Started surfaces so the wording stays consistent and is edited in one place. The `TargetSelector` currently hardcodes "Docker Desktop … + Avocado CLI" in JSX (`index.js:161-169`), and each `.md`/`.mdx` page repeats it by hand — this is exactly the kind of drift a shared snippet prevents.

---

## Architecture notes (how these pages are built)

- **Getting Started section** lives in `src/docs-guides/getting-started/` and is routed under `/developer-reference/getting-started/` (config: `src/docusaurus.config.js:87`, sidebar: `src/sidebars-guides.js`). Pages: `index.mdx`, `qemu.md`, `raspberry-pi.mdx`, `jetson.md`, `any-target.mdx`.
- **"Any Supported Target"** (`any-target.mdx`) renders `<TargetSelector />` (`src/src/components/TargetSelector/index.js`), which is data-driven from `src/src/data/hardware/generated-targets.json`. That JSON is **generated** by `src/scripts/sync-targets.js` from the hand-maintained `src/src/data/hardware/targets.json` unioned with the live package feed. **Edit `targets.json`, not the generated file.**
- The **Linux auto-mount callout** is the shared component `src/src/components/shared/LinuxAutoMountWarning.tsx`. It is rendered:
  - via `<LinuxAutoMountWarning />` on `raspberry-pi.mdx` and **11 hardware reference pages** (`docs-hardware/**`), and inside `TargetSelector` (`index.js:175`, gated on a `linuxAutoMount` warning flag in the target data);
  - **inline / hardcoded** (not via the component) on `jetson.md:22-24`.
- **Serial console** content in `TargetSelector` is driven by each target's `serial` object in `targets.json`; the "Serial Console" section renders whenever `t.serial` is present (`index.js:177`).
- The **"Development"** category (where the new auto-mount page goes) is defined in `src/sidebars-guides.js` (currently: `provisioning`, `hardware-in-the-loop`, `sideloading`, `package-feeds`, `feed-search`).

---

## Item 1 — Move the Linux Auto-Mounting callout to its own page

**Goal:** Remove the auto-mount callout from all Getting Started pages and the Any Supported Target page. Create a dedicated page **"Linux Auto-Mounting"** under **Developer Reference → Development**.

**Create** `src/docs-guides/linux-auto-mounting.md`:
- Title: `Linux Auto-Mounting`.
- Content: the substance currently in `LinuxAutoMountWarning.tsx` — why GNOME-based Linux desktops (Ubuntu, Fedora Workstation) auto-mount mass storage, how it interferes with finalizing provisioning, and the `gsettings … automount false` fix. Expand slightly into prose (it can absorb the "Auto-mounting considerations" section from `provisioning.md:28-37`).
- Front-matter: `title`, `description`, and a `sidebar_position` that slots it into the Development group.

**Register in sidebar** `src/sidebars-guides.js` — add `'linux-auto-mounting'` to the `Development` category `items` list.

**Remove the callout from:**
- `src/docs-guides/getting-started/raspberry-pi.mdx` — delete the `<LinuxAutoMountWarning />` render (line 32) and its `import` (line 7).
- `src/docs-guides/getting-started/jetson.md` — delete the inline `:::warning Disable auto-mount` admonition (lines 22-24).
- `src/src/components/TargetSelector/index.js` — remove the `{t.provisioning.warnings.includes('linuxAutoMount') && <LinuxAutoMountWarning />}` render (line 175) and the now-unused import (line 5). This clears it from the Any Supported Target page.

**Replace with a pointer (recommended):** where the callout is removed from a Getting Started page, add a one-line link near the provisioning step — e.g. *"On a Linux host, see [Linux Auto-Mounting](/developer-reference/linux-auto-mounting) before provisioning."* — so the guidance is still discoverable at the moment it matters.

**Decision needed — hardware reference pages.** The same `<LinuxAutoMountWarning />` also renders on 11 pages under `src/docs-hardware/**` (raspberry-pi-4/5/zero-2-w, nxp frdm-imx-91/93, imx8mp, imx93-evk, stm32mp257f-dk, solidrun hummingboard, seeed reterminal/reterminal-dm). These are **not** "Getting Started" or "Any Supported Target" pages, so they're out of the literal scope of item 1. Options:
- (a) Leave them (literal scope), or
- (b) For consistency, replace the callout on those pages with a link to the new page too.
_Recommend (b)_ so the callout lives in exactly one place. Either way, once the callout is gone from `TargetSelector`, the `linuxAutoMount` flags in `targets.json` are only consumed by the hardware pages (which import the component directly), so the flag can stay.

---

## Item 2 — Getting Started prerequisites: add the Avocado Desktop path (macOS)

Update the **Prerequisites** on every Getting Started page to present the two host setups (see "Key facts" above). Currently every page lists a flat "Docker Desktop + Avocado CLI" with no mention that Desktop is an alternative on macOS.

Apply to:
- `src/docs-guides/getting-started/qemu.md` — Prerequisites (lines 12-16).
- `src/docs-guides/getting-started/raspberry-pi.mdx` — Prerequisites (lines 15-22).
- `src/docs-guides/getting-started/jetson.md` — Prerequisites (lines 13-20).
- `src/src/components/TargetSelector/index.js` — the hardcoded Docker Desktop + Avocado CLI `<li>`s (lines 161-169) → render the same two-path guidance.

Suggested wording block (the shared component in "Key facts"):

> **Choose your setup**
> - **macOS** — install [Avocado CLI](/developer-reference/avocado-cli/overview) and [Docker Desktop](https://www.docker.com/products/docker-desktop/), **or** install [Avocado Desktop](/avocado-desktop/overview), which bundles the build VM and toolchain (no Docker Desktop required).
> - **Linux** — install [Avocado CLI](/developer-reference/avocado-cli/overview) and [Docker Desktop](https://www.docker.com/products/docker-desktop/). (Avocado Desktop is macOS-only today.)

Link Avocado CLI to `/developer-reference/avocado-cli/overview` (or `/installation` where the step is "install it") and Avocado Desktop to `/avocado-desktop/overview` every time either is named.

Note: the `getting-started/index.mdx` landing page already has an Avocado Desktop `CalloutButton` (lines 15-19) — keep it. Its "Three steps" panel is CLI-centric; optionally add "or open your project in Avocado Desktop" so the two paths are visible from the top.

---

## Item 3 — Jetson page: no longer Linux-only

`src/docs-guides/getting-started/jetson.md` currently hardcodes **"Linux host machine (Ubuntu 22.04+, Fedora 39+)"** as a prerequisite (line 15) and the whole flow assumes a Linux host with `lsusb`, `/dev/ttyUSB0`, etc.

Changes:
- Replace the Linux-only host prerequisite with the two-path host setup from Item 2 (macOS via Avocado Desktop is now viable — Desktop provisions real hardware over USB passthrough from the bundled VM).
- Apply Item 1 (remove the inline auto-mount warning) and Item 4 (mark the serial adapter optional) here as well.
- Review host-specific commands that assume Linux: `lsusb` (line 56) for recovery-mode detection, `/dev/ttyUSB0` device path. Add macOS/Desktop equivalents or note that Desktop surfaces device detection in-app.
- **Verify with product:** does macOS + Avocado Desktop actually support the Jetson USB-recovery (`tegraflash`) provisioning path today? The Jetson entry in `targets.json` currently carries the `linuxHostOnly` warning (see Additional Findings). If Desktop now covers it, drop/adjust that flag; if not, keep a scoped note that Jetson recovery-flash still needs a Linux host or Desktop-on-macOS specifically.

---

## Item 4 — Mark UART-to-USB adapter as optional

The **serial console USB adapter** is currently listed as a hard prerequisite. It should be **optional**, with a callout explaining it's only needed for a console to the target — otherwise the user can SSH in.

Occurrences:
- `src/docs-guides/getting-started/raspberry-pi.mdx:22` — prerequisite bullet for the TTY adapter, plus the `tio` block (lines 24-30).
- `src/docs-guides/getting-started/jetson.md:20` — prerequisite bullet, plus the wiring/`tio` instructions (lines 26-43) and "Leave the serial console adapter connected" (line 116) / "Log in … via the serial console" (line 119).
- `src/src/components/TargetSelector/index.js:177-268` — the entire "Serial Console" section (renders when `t.serial` is set).
- `src/src/data/hardware/targets.json` — targets that list the adapter as a prerequisite string, e.g. `"TTY serial console USB adapter (3.3V)"` (around line 106), and per-target `serial` objects.

Changes:
- Move the adapter out of the required list into an **"Optional"** framing with a callout:
  > **Optional: serial console.** A UART-to-USB adapter is only needed if you want a serial console to the target (useful for watching early boot or recovering a device with no network). If the device is on your network, you can skip the adapter and [SSH in](#ssh-access) instead.
- In `TargetSelector`, wrap the "Serial Console" heading/section so it reads as optional (e.g. "Serial Console (optional)" + the callout). Consider a `serial.optional` / `serial.required` flag in `targets.json` for targets where console access is genuinely needed for the documented flow.
- Ensure every Getting Started page has an **SSH access** section to point to. Pi (`raspberry-pi.mdx:76-84`) and QEMU (`qemu.md:91-107`) and `TargetSelector` (`index.js:403-407`) already have one; **`jetson.md` does not** — add an SSH access section so the "SSH instead of console" story holds for Jetson.
- **Jetson nuance:** the Jetson flow uses the serial console both for recovery-mode wiring and for first login. Recovery-mode wiring may still require the adapter for that board; keep that scoped rather than declaring serial fully optional for Jetson. Confirm with product what the minimum is once Desktop is in the loop.

---

## Item 5 — Provisioning page update

`src/docs-guides/provisioning.md` currently frames provisioning as **Linux-first**:
- "Platform constraints" (lines 24-26) describes macOS/Windows VM-in-VM friction.
- "Recommended approach" (lines 39-43) says **"Use a native Linux environment,"** and recommends a dedicated Linux machine for teams on other platforms.
- "Auto-mounting considerations" (lines 28-37) duplicates the auto-mount guidance.

Changes:
- Reconcile the "native Linux" recommendation with the Avocado Desktop story: on **macOS**, Avocado Desktop's bundled build VM + USB passthrough is now the supported way to provision without a native Linux box. Reframe "Recommended approach" to present: (a) native Linux + CLI, or (b) macOS + Avocado Desktop — rather than implying Linux is the only reliable path.
- Keep the honest platform-constraint discussion for the **CLI-on-macOS/Windows-with-Docker** path (VM-in-VM friction is real there), but make clear Avocado Desktop is the answer on macOS.
- **Auto-mounting section (lines 28-37):** with Item 1 creating a dedicated page, either (a) trim this to a one-line link to `/developer-reference/linux-auto-mounting`, or (b) keep it here and have the new page be the canonical source. _Recommend (a)_ to avoid two copies drifting.

---

## Item 6 — Raspberry Pi page update

`src/docs-guides/getting-started/raspberry-pi.mdx` — apply all of the above:
- Item 1: remove `<LinuxAutoMountWarning />` (line 32) + import (line 7), optionally link the new page near Provision.
- Item 2: two-path host setup in Prerequisites (lines 15-22). Note it already lists "macOS 10.12+ or Linux" — align the host bullet with the CLI+Docker / Desktop framing.
- Item 4: make the TTY serial adapter optional (line 22) and frame the `tio` block (lines 24-30) as the optional console path; it already has an SSH access section (lines 76-84) to point to.

---

## Item 7 — Additional findings from a full sweep

1. **Second, separate "Getting Started" index exists.** `src/docs-getting-started/index.md` (routed under a different plugin, links to `/getting-started/qemu`, etc.) is a parallel Getting Started landing distinct from `docs-guides/getting-started/index.mdx` (`/developer-reference/getting-started/`). Confirm whether this is a live page or stale/duplicate. If live, it needs the same Desktop-path treatment; if stale, remove it. **Flag for decision.**

2. **`linuxHostOnly` warnings in `targets.json` + `TargetSelector`.** `TargetSelector` shows "This target requires a Linux host machine for provisioning. macOS and Windows are not supported." (`index.js:9-12, 171-173`) for targets flagged `linuxHostOnly` (e.g. the Jetson and imx8mp entries). This directly contradicts the "not limited to Linux" direction (Items 2/3). Audit every `linuxHostOnly` flag in `targets.json`: for targets Avocado Desktop can now provision on macOS, drop or soften the flag; for any that genuinely still need Linux, keep it but word it around "CLI on macOS" rather than "macOS unsupported."

3. **Docker Desktop hardcoded in `targets.json` prerequisites.** Some target entries list "Docker Desktop installed and running" as a prerequisite string (e.g. lines ~69, ~86), and `TargetSelector` also hardcodes it for all targets (`index.js:161-164`). With the two-path setup, Docker should be presented as required only for the CLI path, not universally. Fold into the shared host-prerequisites component.

4. **Hardware reference pages (`src/docs-hardware/**`)** carry the auto-mount callout (11 pages) and, in `targets.json`, serial-adapter prerequisites. Decide whether the Item 1 (auto-mount → dedicated page) and Item 4 (serial optional) changes should extend here for consistency (recommended) — see the decision note under Item 1.

5. **Reference project pages (`src/docs-guides/references/*.mdx`)** list "Docker Desktop" as a prerequisite (~20 pages). Out of the core scope, but they're the same CLI+Docker assumption; consider a follow-up consistency pass so they also mention the Avocado Desktop path on macOS.

6. **QEMU SSH note** (`qemu.md:93-95`) — "`--host-fwd` is Linux only." Leave as-is (accurate CLI detail), but worth a glance once Desktop's VM story is documented, in case Desktop changes the port-forwarding behavior on macOS.

---

## Suggested execution order

1. Create the shared **HostPrerequisites** component and the **Linux Auto-Mounting** page; wire the sidebar.
2. Update the three `.md`/`.mdx` Getting Started pages (qemu, raspberry-pi, jetson) for Items 1, 2, 4 (+ Item 3 for Jetson).
3. Update `TargetSelector/index.js` (auto-mount removal, host prerequisites, optional serial).
4. Update `targets.json` (audit `linuxHostOnly`, Docker/serial prerequisite strings; add `serial.optional` if adopted). Regenerate the snapshot via `src/scripts/sync-targets.js` (the build refreshes it from the feed anyway).
5. Update `provisioning.md` (Item 5).
6. Resolve the Item 7 decisions (second GS index, hardware pages, reference pages) with the user.
7. `npm run` build/lint locally to confirm no broken links (Docusaurus fails the build on broken internal links; the `TargetSelector` anchor bookkeeping at `index.js:25-26` is link-checked).

## Open decisions for the user

- **A.** Extend auto-mount removal + serial-optional to the 11 hardware reference pages (`docs-hardware/**`)? _(Recommend: yes.)_
- **B.** Is `src/docs-getting-started/index.md` a live page or a stale duplicate of the `docs-guides` Getting Started index?
- **C.** Does macOS + Avocado Desktop support the Jetson USB-recovery (`tegraflash`) flow today — i.e. can we drop Jetson's Linux-host requirement outright, or only partially?
- **D.** Should the new Linux Auto-Mounting page be the single source (with `provisioning.md` linking to it), or keep a short copy in both?
