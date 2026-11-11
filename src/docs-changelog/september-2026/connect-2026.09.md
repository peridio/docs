---
title: 'Connect: 2026.09'
description: 'Avocado Connect, September 2026: custom device-claim domains for enterprise and automatic failover for the production database.'
---

- **Custom device-claim domains for enterprise.** An entitled org can claim
  devices on its own domain instead of a Peridio domain. The claim token
  response has a new `claim_url` field. Peridio configures the domain for the
  org.
- **Database failover.** The production database runs in more than one
  availability zone. If the primary instance fails, the database fails over to
  a standby automatically.
