# HardwareHero

Top-of-page hero for hardware docs pages under `/hardware/<vendor>/<model>`. Renders inside the standard docs body so it cooperates with the docs sidebar, breadcrumbs, and right-hand TOC.

## When to use

Use it as the very first content block on a supported hardware page (e.g. `src/docs-hardware/<vendor>/<model>/index.mdx`). It replaces the conventional `# H1` + tagline + product image + bold-pipe stats line with a structured component that adds CTAs and a scannable stats grid.

The page frontmatter should include `hide_title: true` so Docusaurus does not also render the markdown title — `HardwareHero` provides the H1.

## Usage

```mdx
---
title: 'All-in-One AI Vision from Development to Production'
sidebar_position: 0
description: '...'
hide_title: true
---

import HardwareHero from '@site/src/components/HardwareHero'

<HardwareHero
  vendor="Advantech"
  vendorUrl="https://www.advantech.com/en-us/products/.../icam-540"
  model="ICAM-540"
  tagline="Transform your Advantech ICAM-540 from AI development platform to production-grade industrial vision system with enterprise Linux and fleet management."
  image="/img/hardware/advantech/advantech-icam540.png"
  imageAlt="Advantech ICAM-540 industrial AI camera"
  stats={[
    { value: '100 TOPS', label: 'AI Performance' },
    { value: '8MP @ 45fps', label: 'Sony IMX334 Sensor' },
    { value: 'C-Mount', label: 'Flexible Lens Options' },
    { value: '6x Faster', label: 'Time to Production' },
    { value: '-20° to 60°C', label: 'Industrial Operating Range' },
    { value: 'Jetson Orin NX', label: 'NVIDIA AI Module' },
  ]}
  ctas={{
    primary: {
      label: 'Get Started',
      to: '/developer-reference/getting-started/any-target',
    },
    secondary: {
      label: 'Download Product Brief',
      to: 'https://example.com/icam-540-brief.pdf',
      external: true,
    },
  }}
/>

## Overview

…
```

## Props

| Prop             | Type                       | Required | Notes                                                                                                                                                                               |
| ---------------- | -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vendor`         | `string`                   | yes      | Rendered as a small uppercase eyebrow above the model.                                                                                                                              |
| `vendorUrl`      | `string`                   | no       | When set, the vendor name renders as a link to the manufacturer's product page (opens in a new tab, with a small external-link icon). When omitted, the vendor name is plain text.  |
| `model`          | `string`                   | yes      | Renders as the page H1 next to `vendor`.                                                                                                                                            |
| `tagline`        | `string`                   | no       | One-sentence value prop.                                                                                                                                                            |
| `image`          | `string`                   | no       | Absolute path under `static/`. The image renders inside a fixed-height container (200px desktop / 180px mobile). Omit to hide the image and let the heading column span full width. |
| `imageAlt`       | `string`                   | no       | Defaults to `${vendor} ${model}`.                                                                                                                                                   |
| `stats`          | `{ value, label }[]`       | no       | **Provide exactly 3 or 6 entries.** Other counts render with an auto-fit fallback layout that is not part of the supported contract.                                                |
| `ctas.primary`   | `{ label, to, external? }` | no       | Filled brand button. Use for the highest-value action (typically Get Started).                                                                                                      |
| `ctas.secondary` | `{ label, to, external? }` | no       | Outlined button. Use for downloads / additional resources.                                                                                                                          |

Both CTA slots are optional. Missing slots simply do not render, so vendor pages can adopt the hero incrementally with whatever URLs they have.

## CTA conventions

For partner hardware pages, the recommended slot mapping is:

- **Primary — Get Started** → `/developer-reference/getting-started/<target>` (or `/any-target`).
- **Secondary — Download Product Brief** → hosted PDF/one-pager.

The manufacturer's product page is wired through `vendorUrl` (not a CTA slot) — the vendor name itself becomes the link.

External links (the secondary CTA when `external: true`, and the vendor link) automatically open in a new tab, get `rel="noopener noreferrer"`, and render an external-link icon. The icon size scales with context: ~14px on the secondary CTA, ~10px next to the vendor name.

## Theming

The component uses semantic CSS tokens (`--color-accent-button`, `--color-bg-surface`, `--color-text-heading`, etc.) from `src/src/css/tokens/_semantics.css`, so it inherits the active theme (peridio / avocado / alt) and respects light/dark mode without any per-theme overrides.

## Migration checklist (per vendor page)

1. Add `hide_title: true` to the frontmatter.
2. Delete the `# H1`, the tagline paragraph, the `![image](...)` line, and the bold pipe-separated stats line.
3. Add `import HardwareHero from '@site/src/components/HardwareHero'`.
4. Render `<HardwareHero …/>` with `vendor`, `vendorUrl` (if you have it), `model`, `tagline`, `image`, `stats` (exactly 3 or 6 entries), and whichever CTAs are known.
5. Leave the rest of the markdown body (Overview, Specifications, Use Cases, Challenges and Solutions, Key Features, Getting Started) unchanged.
