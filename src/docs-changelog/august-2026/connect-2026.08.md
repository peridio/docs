---
title: 'Connect: 2026.08'
description: 'Avocado Connect highlights for August 2026 — TOTP MFA, a dedicated device MQTT endpoint for enterprise, and deployment reliability fixes.'
---

- **TOTP-based MFA** — accounts can enroll a time-based one-time-password
  authenticator, part of the SOC 2 work.
- **Dedicated device MQTT endpoint for enterprise** — entitled orgs are handed a
  dedicated MQTT hostname backed by static IPs, so a fleet can firewall
  allow-list a stable address for its devices.
- **Deployment reliability** — OTA deployments are unblocked after a schema
  migration, overlapping deployments now supersede cleanly, and rollouts with an
  empty target set settle instead of hanging.
