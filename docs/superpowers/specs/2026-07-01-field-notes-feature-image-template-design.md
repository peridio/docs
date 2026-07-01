# Field-notes feature images: templated icon-card generator

**Date:** 2026-07-01
**Status:** Draft — awaiting user review

## Problem

Field-notes feature images are currently bespoke, hand-authored SVGs. The only
rich example (`static/img/field-notes/two-boots-trust-update.svg`, a composed
chip / A-B / trust-shield scene) took real illustration effort, and there is no
tooling to produce more. As a result most notes ship with **no** feature image
and fall back to a placeholder box on the index. That does not scale as the
field-notes cadence grows.

## Goal

A scalable, repeatable process where an author produces an on-brand feature
image by **swapping in one icon** — no illustration work. Concretely: one CLI
command stamps a chosen [Heroicon](https://heroicons.com) into a fixed card
template and writes both the `.svg` source and the `.png` that frontmatter
references.

Non-goals: bespoke per-post scenes (kept as an exception, not the workflow),
per-post color theming, animated images, and build-time image generation.

## Display constraints (why the design looks the way it does)

The feature image is consumed by the swizzled `src/theme/BlogPostItems`
component. The **same file** is rendered at three aspect ratios, all with
`object-fit: cover`:

| Context        | Aspect  | Approx size |
| -------------- | ------- | ----------- |
| Featured hero  | `16/10` | large       |
| Standard row   | `1/1`   | 200px       |
| Mobile (both)  | `16/9`  | full-width  |

`frontMatter.image` also serves as the social/OG card. `cover` cropping means
the composition must be **center-safe**: anything meaningful has to survive a
1:1 and 16:9 center-crop of a 16:10 canvas. A centered icon on a uniform
background satisfies this by construction.

## Design

### Output canvas

- **1600×1000 (16:10)** — matches the existing image and the featured-hero
  slot exactly. Center-cropping to 1:1 / 16:9 only trims the uniform background.

### Composition (`buildSvg`)

Reuses the visual language already shipped in `two-boots-trust-update.svg` so
templated images sit in the same world:

- **Background:** `#0b0b14` base, subtle dot grid pattern, soft indigo radial
  glow (same `defs` as the existing image).
- **Center tile:** rounded-square container (~420px, centered at 800,500),
  dark fill `#141426`, thin indigo border (`#4f46e5` → `#6366f1`) — echoes the
  framed look of the reference icon-card.
- **Icon:** the chosen Heroicon, centered in the tile with generous padding
  (icon box ~220–240px), tinted the brand accent. Solid variant fills with
  `#c7d2fe`/`#a5b4fc`; outline strokes in the same.
- **No corner badge.** Single fixed accent, matching the site's
  `--field-notes-accent` indigo (`#4f46e5` light / `#818cf8` dark).

The 420px tile centered on a 1600×1000 canvas sits well inside the central
1000×1000 (1:1) and 16:9 crop regions, so it is never clipped.

### CLI

```bash
npm run feature-image -- --slug <slug> --icon <heroicon-name> [--variant solid|outline] [--force]
```

- `--slug` (required): output basename, matches the note slug.
- `--icon` (required): a Heroicon name, e.g. `shield-check`, `lock-closed`,
  `cpu-chip`.
- `--variant` (optional): `solid` (default) or `outline`. Solid is the default
  because it stays legible in the 200px row crop and on mobile.
- `--force` (optional): overwrite existing output files (otherwise refuse).

On success it writes the two files and prints the exact frontmatter line to
paste:

```
image: /img/field-notes/<slug>.png
```

### Data flow

1. Parse args; validate `--slug` and `--icon` are present.
2. Resolve the icon SVG from the `heroicons` npm package
   (`heroicons/24/{solid,outline}/<icon>.svg`). If the file does not exist,
   fail with a clear message and a few near-match suggestions (substring match
   over the directory listing).
3. Extract the icon's inner markup (paths) and its `0 0 24 24` viewBox.
4. Pass `{ iconInner, variant, accent }` to `buildSvg()`, which returns the full
   1600×1000 SVG string with the icon transformed (translate + uniform scale
   from 24 units to the tile's icon box) and colored.
5. Write `static/img/field-notes/<slug>.svg`.
6. Rasterize to `static/img/field-notes/<slug>.png` with `@resvg/resvg-js` at
   1600px width. No font configuration needed — Heroicons are pure paths.
7. Log the frontmatter line.

### Files

- `scripts/feature-image.js` — CLI entry. CommonJS, `#!/usr/bin/env node`
  shebang, `node:`-prefixed builtins, matching `scripts/sync-references.js`.
- `scripts/feature-image/template.js` — exports `buildSvg()`. Kept separate so
  the composition can be edited without touching arg-parsing. (Path may be
  flattened to a single file during implementation if it stays trivially small;
  the two-responsibility split is the intent.)
- `field-notes/CONTRIBUTING.md` — add a short "Feature images" section
  documenting the command, the icon source, and the frontmatter line.
- `package.json` — add the `feature-image` script and two **devDependencies**
  (`heroicons`, `@resvg/resvg-js`). Dev-only: generation is an authoring step;
  only the committed PNG/SVG ship.

### Dependency choice

`@resvg/resvg-js` over `sharp` (heavier, more transitive deps) or `puppeteer`
(headless-Chrome overkill). Path-only icons mean font rendering is never
required, so resvg is the lightest correct rasterizer.

## Error handling

- Missing `--slug`/`--icon` → usage message, exit 1.
- Unknown icon name → error naming the variant dir searched + up to ~5
  substring suggestions, exit 1.
- Output file exists without `--force` → refuse with a message pointing at
  `--force`, exit 1.
- resvg rasterization failure → surface the error, exit 1, and leave no partial
  PNG.

## Testing / verification

- Run the command for the demo note and confirm both files are written and
  non-empty.
- Open the generated SVG and PNG; verify the icon is centered, tinted, and not
  clipped.
- Verify center-crop safety by inspecting the central 1000×1000 and 16:9 region
  (tile fully contained).
- `npm run start` (or serve) and confirm the index thumbnail renders in the
  featured, row, and mobile treatments.
- Bad-input checks: unknown icon and missing-arg both fail cleanly.

## Assumptions (defaults chosen while awaiting confirmation)

These were the recommended options; the user was away when asked. Flag on
review if any should change:

1. **Existing bespoke `two-boots-trust-update` image is left as-is** — the
   template is for new/other posts, not a replacement for the flagship
   illustration.
2. **Demo the pipeline on one currently image-less note** — candidate:
   `2026-06-24-hardened-boot-imx93.mdx` with a security-themed Heroicon
   (`shield-check` or `lock-closed`), committed as a real sample.
3. **Solid** is the default icon variant.

## Out of scope / future

- Per-category accent colors or badges (explicitly dropped for now).
- A React component rendering the card at build time (social/OG cards need a
  static raster, so this would not replace the file-generation path).
- Batch regeneration of all notes.
