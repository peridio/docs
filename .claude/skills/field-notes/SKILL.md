---
name: field-notes
description: Drive an interactive session that writes a Field Note for the Peridio docs site (src/field-notes/*.mdx). Interviews the engineer, produces the note in the house template, registers the author, and leaves [ENGINEER:] placeholders for anything not yet verified. Use when writing or drafting a Field Note. Skip for the marketing blog or for editing an existing note's prose only.
---

# Field Notes

Write a Field Note for `docs.peridio.com/field-notes`: a real, reproducible proof
that Avocado OS does the hard things, in the house format. Field Notes are _true_;
the blog is _pretty_. This skill interviews the engineer, writes the note, and
leaves the honest gaps marked.

## Step 1: Load the format (do this first)

`Read` both, they are the authoritative source, do not work from memory:

- `src/field-notes/_template.mdx` - the frontmatter fields, the `<TestStatus>` /
  `<PullQuote>` usage, the TL;DR / `{/* truncate */}` / section skeleton.
- `src/field-notes/CONTRIBUTING.md` - the writing rules (result-first title,
  TL;DR first, cold-reader intro, no hype, include what didn't work), the
  frontmatter table, and the `[ENGINEER: ...]` draft convention.

If either is missing, halt with the path.

## Step 2: Register the author

Open `src/field-notes/authors.yml`. If the engineer is not already a key, add
one (`name`, `title`, optional `image_url` monogram under
`static/img/field-notes/authors/`), and use that key in the note's `authors`.

## Step 3: Material-gathering mode

Ask what they bring:

- **A. Nothing yet - interview me** (Step 4).
- **B. Notes / an outline** - read them, expand into the template, ask only
  about load-bearing gaps.
- **C. A rough draft or an existing doc to convert** - preserve every command,
  output, path, and number; restructure into the template.

## Step 4: Interview

Ask in small batches. Skip anything they cannot answer and turn it into an
`[ENGINEER: ...]` placeholder, never block on a missing answer, and never
fabricate a number, version, or command output to fill a gap.

1. The result, in one concrete sentence (this becomes the result-first title and
   the TL;DR: what you did, what happened).
2. The cold-reader intro: two or three sentences that orient someone who has
   never heard of Peridio or Avocado, then go dense.
3. The mechanism: the commands, config, and output. What you actually did.
4. What broke, or what you would do differently (the single biggest credibility
   signal - CONTRIBUTING requires it).
5. How to reproduce it (steps, or a link to a runnable repo/reference).
6. `<TestStatus>`: the target slugs, the Avocado CLI version, and the reference
   link (`{ label, href }`) to the source on GitHub.
7. Frontmatter: `tags` (target + topic), `category` (short label), and whether
   this is a `featured` candidate (usually a lead's call - default `false`).

## Step 5: Produce the note

Write `src/field-notes/YYYY-MM-DD-<slug>.mdx`. The filename date prefix must
match the frontmatter `date`. Always set `draft: true` in the frontmatter — new
notes default to draft and stay out of the production build until verified and
ready to ship. Follow the template exactly: frontmatter, the
`<TestStatus>` card, a two-sentence `**TL;DR**`, the `{/* truncate */}` marker,
the cold-reader intro, the dense body with language-tagged code blocks, a
`<PullQuote>` for a standout number, an honest "what broke" section, and a
"Reproduce it" section. Put any image in `static/img/field-notes/` and reference
it as `/img/field-notes/<name>`. Mark every unverified claim `[ENGINEER: ...]`.

## Step 6: Before it can merge

Per CONTRIBUTING, `/field-notes` is public - a note ships to the live site,
index, and feeds the moment it hits `main`. So:

- Grep for unfinished markers before calling it ready:

  ```bash
  grep -l "\[ENGINEER:" src/field-notes/*.mdx
  ```

- A note with `[ENGINEER: ...]` placeholders is a reviewed-on-PR draft, not a
  merge. Keep it on the branch until the engineer who ran the demo fills them in.
- New notes carry `draft: true` by default, which keeps them out of the
  production build. Only flip it to `draft: false` once the note is verified,
  has no `[ENGINEER: ...]` placeholders left, and has passed the review gate.
- The light review gate: one engineer confirms the reproducible core actually
  reproduces on a fresh setup and the `tested_against` versions are accurate.

## What NOT to do

- Do NOT skip the Step 1 Read. The template and CONTRIBUTING define the format.
- Do NOT fabricate versions, numbers, board names, or command output. Unknown
  values are `[ENGINEER: ...]` placeholders.
- Do NOT hype ("revolutionary", "blazing fast", "10x") - CONTRIBUTING bans it.
- Do NOT omit the "what broke" section; honesty about dead ends is the point.
- Do NOT append AI attribution to the note or the commit.
