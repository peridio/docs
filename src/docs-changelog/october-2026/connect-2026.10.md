---
title: 'Connect: 2026.10'
description: 'Avocado Connect, October 2026: LaunchPad guides move to the docs, Fleet becomes the landing page, and new orgs get a first-device card.'
---

- **LaunchPad's guides move to the docs.** The guided missions, tutorials and
  the dev-kit-to-production matcher are now in [Docs Learn](/learn), and the
  Platform guides are under [Avocado Connect](/avocado-connect/overview) in the
  Product Docs, where they can be searched and linked publicly. Mission progress
  is kept in your browser. Old `/orgs/<org>/launchpad/...` links redirect to the
  matching Docs page.
- **Fleet is the landing page.** Signing in, switching orgs, creating an org and
  accepting an invite all land on Fleet. The Dashboard is retired. Its activity
  chart is on Fleet and its usage meters are under Settings → Billing.
- **First-device card.** An org with no devices sees the commands to bring up a
  QEMU device and a live status that flips as the device claims and comes
  online, with a link to the [First OTA mission](/learn/missions/first-ota).
- **A sidebar card points to Learn.** Until the end of November, a dismissible
  card in the sidebar links to Docs Learn. The Documentation link stays.
- **`/go/` deep links.** Docs can send you to `connect.peridio.com/go/fleet` or
  `/go/settings/api-keys` and Connect resolves your current org, going through
  login first if needed.
- **Intake moved into onboarding.** The short questionnaire now appears right
  after your first org is created, at `/onboarding/intake`, with a _Finish
  onboarding_ entry in the user menu to come back to it.
- **Avocado Classic theme.** Connect has the same mint theme as Avocado
  Desktop. If you selected the old green theme, Connect loads it as Avocado
  Classic.
- **Custom MQTT domains for enterprise.** An entitled org can send device MQTT
  traffic through a domain that it owns.
- **Upgraded MQTT broker.**
