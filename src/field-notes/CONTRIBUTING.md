# Contributing to Field Notes

## Purpose

Field Notes is the surface where a skeptical embedded engineer sees real, reproducible proof that Avocado OS does the hard things — and it's the raw source we repurpose downstream.

Field Notes is _true_. The blog is _pretty_. Don't mix them up.

## Goals

- **Build engineer trust and create internal champions** — be where an IC sees the proof and decides to bring us in.
- **Demonstrate the product doing hard things, reproducibly** — demos and hands-on guides (flashing containers on a Jetson, OTA rollback, JetPack migration) an engineer can run themselves.
- **Be the primary-source artifact for the engineer channels** — written to go raw to the community channels and to rank for technical long-tail.
- **Feed the rest of the system** — the source material marketing lifts into blog narratives and that gets promoted into the curated track.

## In scope

- Technical developer content.
- Raw demos (clips and terminal casts).
- Reproducible how-tos and standalone guides (e.g. "flashing containers on Jetson").
- "What we tried, what broke" experiments.

## How to write a note

Start by copying `_template.mdx`:

```bash
cp _template.mdx 2026-MM-DD-short-slug.mdx
```

The filename must start with `YYYY-MM-DD-` so it sorts correctly and the date matches frontmatter.

## Frontmatter fields

| Field              | Required | Rendered | Purpose                                                                        |
| ------------------ | -------- | -------- | ------------------------------------------------------------------------------ |
| `title`            | yes      | yes      | The note title                                                                 |
| `date`             | yes      | yes      | The dated contract — "true as of this date"                                    |
| `authors`          | yes      | yes      | Real engineer keys from `authors.yml`                                          |
| `tags`             | yes      | yes      | Target + topic; rendered as pills in the masthead                              |
| `category`         | no       | yes      | Short label above the title on the index; falls back to the first tag          |
| `image`            | no       | yes      | Index thumbnail (`/img/field-notes/<slug>.png`); placeholder box if omitted    |
| `featured`         | no       | yes      | `true` pins the note to the large hero slot on the index                       |
| `tested_against`   | no       | **no**   | Free-text versions for greppability (rendered test status uses `<TestStatus>`) |
| `poster`           | no       | **no**   | Engineer who posts the note and is on-call in comments for ~24h                |
| `lift_for_blog`    | no       | **no**   | One-line business-case angle for the blog (champion → approver)                |
| `promote_to_track` | no       | **no**   | Flag + note if this is curated-track on-ramp material                          |

`poster`, `lift_for_blog`, and `promote_to_track` are editorial metadata. They never render to readers, but they live in frontmatter so the team can grep them. Run from `src/field-notes/`:

```bash
grep -l "^promote_to_track: \"[^\"]" *.mdx
```

## Components and rendering

The masthead — the "FIELD NOTES" eyebrow, title, date, **tag pills**, and the **author byline** — is rendered automatically by the theme; you don't build it. A few pieces you add in the body:

- **`<TestStatus>`** — the "what I verified this against" card at the top. Props: `targets` (array of target slugs), `cli` (Avocado CLI version), and `reference` (`{ label, href }` — the source on GitHub, shown with a GitHub icon).

  ```mdx
  import TestStatus from '@site/src/components/TestStatus'

  <TestStatus
    targets={['jetson-orin-nano-devkit']}
    cli="0.40.0"
    reference={{
      label: 'nvidia-deepstream',
      href: 'https://github.com/avocado-linux/references/tree/main/nvidia-deepstream',
    }}
  />
  ```

- **`<PullQuote>`** — a result callout for a headline number or line: an
  accent-tinted panel with a left accent rail and a mono kicker. Wrap the key
  figures in `**bold**` to pull them out in the accent color. `label` sets the
  kicker (defaults to `Result`; pass `label={null}` to hide it).

  ```mdx
  import PullQuote from '@site/src/components/PullQuote'

  <PullQuote>A punchy result with the **headline number** pulled out.</PullQuote>
  ```

- **Author byline** — add yourself to `authors.yml` (`name`, `title`, and an optional `image_url` monogram/photo under `static/img/field-notes/authors/`), then list your key in `authors`. The byline renders link-free (a deliberate choice — author-page links tripped a password-manager overlay).

- **Images** — drop them in `static/img/field-notes/` and reference as `/img/field-notes/<name>`. Any image in the body is **click-to-zoom** automatically.

- **Code blocks** — always tag a language (` ```bash `, ` ```ini `, ` ```text `, …) so they syntax-highlight.

## Writing rules

- **TL;DR first.** Two sentences: what you did, what happened. Above everything else.
- **Cold-reader intro.** Assume the reader has never heard of Peridio or Avocado. Two or three sentences orient a stranger, then go dense.
- **Result-first title.** Concrete and specific. "We cut power 200 times mid-update on a Jetson. Here's what bricked." beats "Improving OTA resilience on embedded Linux."
- **No hype.** No "revolutionary," no "blazing fast," no "10x."
- **Include what didn't work.** Honesty about dead ends is the single biggest credibility signal.

## Posting to community channels

- **Disclose.** When you submit, state plainly in the first comment: "I work on this." Non-negotiable. It prevents the astroturf backlash that buries an otherwise good post.
- **Be on-call for ~24h.** The `poster` is the engineer who submits _and_ answers comments. Don't post and disappear.
- **Select, don't spray.** These channels throttle domains that self-submit too often and flag obvious marketing. Post only genuinely strong notes; let the rest live in the feed. A few great ones a quarter beats a steady drip.

## Light review gate

Before merging a note, one rotating engineering owner confirms:

1. The reproducible core actually reproduces on a fresh setup.
2. The versions and tags in `tested_against` are accurate.

This is a correctness check, not editorial polish. Field Notes is true; the blog is pretty.

## Drafts and the `[ENGINEER: ...]` convention

The `/field-notes` section is **public** — every note merged to `main` ships to `docs.peridio.com/field-notes`, is indexed, and appears in the RSS/Atom/JSON feeds. So a note is only ready to merge once it's true and complete; unfinished drafts stay on a branch and are reviewed on the pull request (and its deploy preview), not on `main`.

A note checked in with `[ENGINEER: paste the boot log here]` placeholders is a structured draft — the framing and the angle are committed, the engineer who runs the demo fills in the verified content:

- The author drafts the framing, TL;DR, mechanism, and the section structure.
- Placeholders mark every claim that needs a real measurement, command output, or honest "what didn't work" sentence.
- A reviewer reads the draft top-to-bottom on the PR, and the placeholders are the conversation: "do we actually have this number?", "is that the failure mode you hit?", etc.
- The engineer who ran the demo replaces placeholders with the real content and re-pushes.
- The draft only becomes "ready" when no `[ENGINEER: ...]` placeholders remain. Grep before merging:

  ```bash
  grep -l "\[ENGINEER:" *.mdx
  ```

Every new note starts with `draft: true` in its front matter — the template ships it that way. Docusaurus' `draft: true` excludes the post from production builds entirely, so a note stays out of the public build until it's true, complete, and reviewed. Flip it to `draft: false` (or remove it) only once no `[ENGINEER: ...]` placeholders remain and the note has passed the review gate.
