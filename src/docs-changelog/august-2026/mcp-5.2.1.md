---
title: 'MCP: 5.2.1'
description: 'Avocado OS MCP Server 5.2.1 — a quality pass on the stream-aware 5.2.0 release.'
---

5.2.1 is a quality pass on the stream-aware 5.2.0 release — no new tools, just
tighter, less noisy suggestions.

- **Target suggestions are filtered to the support-matrix selectable set**, so
  the server only offers targets a user can actually build for, and a short
  two-character overlap no longer conflates architectures (`x86_64` no longer
  pulls in `qemuarm64`), with a regression test locking the guard in place.
- **Resolver noise, tmux session addressing in the device-info snippet, and
  duplicate validators** are cleaned up from review follow-ups on the 5.2.0
  work.
