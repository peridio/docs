---
title: 'Desktop 1.1.0'
description: 'Placeholder — Avocado Desktop 1.1.0: agent task queue, Linux preview build, and device timeline.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

## Agent task queue

The AI agent can now queue multiple build-and-flash jobs and run them back to back. Each task shows live logs, and a failed step pauses the queue instead of discarding the remaining work.

## Linux preview build

A first AppImage preview of Avocado Desktop for x86_64 Linux is available behind the `desktop-linux` opt-in. VM features are limited to KVM hosts for now.

## Device timeline

The device panel gains a timeline view: boots, deploys, hibernations, and USB attach/detach events in one scrubbable strip.

## Fixes

- The sidecar CLI no longer shadows a newer host-installed CLI after an app update.
- Fixed a white flash when switching between light and dark themes on external displays.
