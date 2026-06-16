# Contributing to Field Notes

## Purpose

Field Notes is the surface where a skeptical embedded engineer sees real, reproducible proof that Avocado OS does the hard things — and it's the raw source that feeds HN, Reddit, and everything we repurpose downstream.

Field Notes is _true_. The blog is _pretty_. Don't mix them up.

## Goals

- **Build engineer trust and create internal champions** — be where an IC sees the proof and decides to bring us in.
- **Demonstrate the product doing hard things, reproducibly** — demos and hands-on guides (flashing containers on a Jetson, OTA rollback, JetPack migration) an engineer can run themselves.
- **Be the primary-source artifact for the engineer channels** — written to go raw to HN/Reddit and to rank for technical long-tail.
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

| Field              | Required        | Rendered                    | Purpose                                                                         |
| ------------------ | --------------- | --------------------------- | ------------------------------------------------------------------------------- |
| `title`            | yes             | yes                         | The note title                                                                  |
| `date`             | yes             | yes                         | The dated contract — "true as of this date"                                     |
| `authors`          | yes             | yes                         | Real engineer keys from `authors.yml`                                           |
| `tags`             | yes             | yes                         | Target (`orin-nx`, `imx`, `rpi5`…) + topic (`ota`, `yocto`, `security`, `mcp`…) |
| `tested_against`   | when applicable | yes (via `<TestedAgainst>`) | Avocado + JetPack/board versions                                                |
| `hn_title`         | no              | **no**                      | Suggested HN submission title                                                   |
| `poster`           | no              | **no**                      | Engineer who submits to HN and is on-call in comments for ~24h                  |
| `lift_for_blog`    | no              | **no**                      | One-line business-case angle for the blog (champion → approver)                 |
| `promote_to_track` | no              | **no**                      | Flag + note if this is curated-track on-ramp material                           |

`hn_title`, `poster`, `lift_for_blog`, and `promote_to_track` are editorial metadata. They never render to readers, but they live in frontmatter so the team can grep them. Run from `src/field-notes/`:

```bash
grep -l "^hn_title:" *.mdx
grep -l "^promote_to_track: \"[^\"]" *.mdx
```

## HN-readiness rules

- **TL;DR first.** Two sentences: what you did, what happened. Above everything else.
- **Cold-reader intro.** Assume the reader has never heard of Peridio or Avocado. Two or three sentences orient a stranger, then go dense.
- **Result-first title.** Concrete and specific. "We cut power 200 times mid-update on a Jetson. Here's what bricked." beats "Improving OTA resilience on embedded Linux."
- **No hype.** No "revolutionary," no "blazing fast," no "10x."
- **Include what didn't work.** Honesty about dead ends is the single biggest credibility signal on HN.

## Posting to HN / Reddit / Lobsters

- **Disclose.** When you submit, state plainly in the first comment: "I work on this." Non-negotiable. It prevents the astroturf backlash that buries an otherwise good post.
- **Be on-call for ~24h.** The `poster` is the engineer who submits _and_ answers comments. Don't post and disappear.
- **Select, don't spray.** HN throttles domains that self-submit too often and flags obvious marketing. Post only genuinely strong notes; let the rest live in the feed. A few great ones a quarter beats a steady drip.

## Light review gate

Before merging a note, one rotating engineering owner confirms:

1. The reproducible core actually reproduces on a fresh setup.
2. The versions and tags in `tested_against` are accurate.

This is a correctness check, not editorial polish. Field Notes is true; the blog is pretty.
