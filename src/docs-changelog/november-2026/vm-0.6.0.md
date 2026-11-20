---
title: 'VM: 0.6.0'
description: 'avocado-vm 0.6.0: Rubicon hub runs capture the boot console, logic-analyzer channels float, and console and USB/IP fixes.'
---

Released on 19 November. The avocado-vm is the Linux VM that `avocado vm` and
Avocado Desktop build in, and that runs a Rubicon hub. Update it with
`avocado vm update`, or from **Settings → Updates** in Avocado Desktop on macOS.

Most changes are for hub VMs that drive Rubicon boards. A VM used only for
builds gets the newer package snapshot and nothing else changes.

## New

- **A run that powers the board captures its console.** A run profile that
  switches an output on, or pulses one, joins the board's console for the run,
  so the boot lands in the board's console history. Before, a bare power cycle
  captured nothing. Capture lasts as long as the run, so end the profile with a
  wait to keep the whole boot. Runs with USB steps capture nothing on their
  own.
- **Console history says how old it is**, for example
  `[history: last output 3h ago]`, so old output isn't mistaken for current.
- **Logic-analyzer channels float for a project's buses.** A project's
  `rubicon.analyzer` setting names the buses wired to the Rubicon's `la0` to `la15`. Before the
  steps run, the hub sets those channels to plain inputs, so the analyzer
  doesn't load the board's bus. Every job resets them, so one job's setting
  never carries over. This needs Avocado CLI 1.2.0, which sends the setting with the job.

## Changed

- **The image ships `avocado-ext-connect` 0.3.0**, which connects a hub to
  Avocado Connect, so a hub VM needs nothing added after boot. The image moves
  to the latest 2026/next snapshot. The kernel is unchanged.
- **The hub journal shows each stage of a console open**, and why a console
  stopped, so a silent console shows where it stalled.

## Fixes

- **A console whose USB/IP import got no answer no longer stays open and
  silent.** The import times out after 5 seconds and the console reopens.
- **An abandoned console writer gives up the write lease** after 15 minutes
  without input, so another client can type on the board's console.
- **A device whose USB/IP connection died is imported again**, for example
  after the host re-enumerated it while the VM was paused.
- **Hub jobs that wait a long time get a fresh token.** A Connect job that
  waited 10 minutes or more in its board's queue asks Connect for a fresh board
  token and download URLs before it runs. Before, a job on a claimed board that
  waited more than an hour failed, and a provision's downloads could fail on
  expired URLs.

The full record is in the
[CHANGELOG](https://github.com/avocado-linux/avocado-vm/blob/main/CHANGELOG.md).
