---
name: field-notes
description: "Use when writing, drafting, converting or reviewing a Field Note for the Peridio docs site (src/field-notes/*.mdx), including a comparison of two images or options. Not for the marketing blog, and not for prose-only edits to a note that is already published."
---

# Field Notes

## What it does

Drives a session that turns a demo, a measurement or a comparison into a Field Note in the house format, then checks the note against the same gates CI runs. It interviews the engineer, writes the note, and leaves an honest `[ENGINEER: ...]` marker for every value nobody verified.

## When to reach for it

- You have a demo, a measurement or a comparison to write up for `docs.peridio.com/field-notes`.
- You have a rough draft or an existing doc to convert into a note.
- You have a draft note that must pass review before it leaves draft.

## Where it fits

It runs in the docs repo. The format itself lives in two files in the repo, and this skill defers to them. For charts, invoke the `dataviz` skill. For the plain-English pass, invoke the `asd-ste100` skill when it is installed, and otherwise apply the rules in step 7. The marketing blog is a different surface: Field Notes are true, the blog is pretty.

## Prerequisites

A docs repo checkout with `src/field-notes/_template.mdx`, `src/field-notes/CONTRIBUTING.md` and `src/field-notes/authors.yml`, and Node dependencies installed (`npm --prefix src ci`) so the checks in `references/verification.md` can run. If a format file is missing, halt and name the path.

## The one defining constraint

A Field Note is true. Every number, version and command output traces to something the engineer ran and kept. Never fabricate a value to fill a gap. An unknown value becomes an `[ENGINEER: ...]` marker, and a note with a marker left in it does not ship.

## Steps

1. **Load the format.** `Read` `src/field-notes/_template.mdx` and `src/field-notes/CONTRIBUTING.md` first. They are authoritative. Do not work from memory.
2. **Register the author.** Open `src/field-notes/authors.yml`. If the engineer is not a key, add one (`name`, `title`, optional `image_url`), and use that key in `authors`.
3. **Pick the shape.** A single result or demo follows the template. A comparison of two images or options follows `references/comparison-note.md`. Read it before you draft a comparison.
4. **Gather material.** Ask what the engineer brings: nothing (interview), notes or an outline (expand them, ask only about load-bearing gaps), or a rough draft (keep every command, output, path and number, then restructure). Ask in small batches. For a comparison also ask:
   - which baseline a typical user runs, and why that baseline;
   - the measurement protocol, and whether both sides ran it the same way;
   - whether both sides use the same configuration (power mode, governors, versions);
   - which released version of the tool the note will cite, and whether the engineer reran the project with it;
   - which changes the note depends on are not published yet;
   - which recordings or screenshots exist, and where they are hosted.
5. **Write the note.** Write `src/field-notes/YYYY-MM-DD-<slug>.mdx`. The date prefix must match the frontmatter `date`, and the slug must match the note's scope. Set `draft: true` on a new note. For an existing published note, keep its current `draft` value. Include every part in the checklist below.
6. **Check the headline.** Compute each difference as a percentage against the strongest and the weakest honest baseline. Lead the title and the TL;DR with the large differences, and state a small difference plainly as one result among others. Do not claim what nobody measured.
7. **Run a plain-English pass.** Keep sentences under 25 words, and instructions under 20. Use one idea per sentence, active voice, no semicolons in prose, and one word for one action. Keep every hedge and every number exactly as written. After the rewrite, compare the numbers in the old and new text.
8. **Verify.** Run the commands in `references/verification.md`, including the build with `draft` temporarily set to `false`. Restore the original value afterwards.
9. **Open the PR as a draft.** Write the body as Problem, Solution, Key changes and Reviewer notes, and state what was verified and what was not. Keep private feedback out of the PR, the note and the commit. Mark the PR ready only when CI is green or its known red check is explained in the body. Request reviewers.

### Checklist for step 5

- Frontmatter: `title` (result-first), `description`, `date`, `draft: true`, `authors`, `tags`, `category`, and the internal fields (`tested_against`, `poster`, `lift_for_blog`, `promote_to_track`).
- Index thumbnail: keep the template's empty `image: ''` line, set `image_source`, then run `make thumbs`. Without the `image:` line the generator writes the files and fails with `no image: line to update`. Use a 16:9 source with text at least 46 px tall and labels under 16 characters, because the index shows the thumbnail at 400 px, a quarter of the 1600 px source, dithered to six grey levels. Open the generated `-thumb.png` and read every label before you commit. Commit the generated files and the source.
- `<TestStatus>` with `targets`, a released `cli` version, and the `reference` link.
- A TL;DR that opens with the result in one sentence with its key number. For a comparison, add one bullet list of facts per option, then one line of conditions.
- The `{/* truncate */}` marker, then a cold-reader intro of two or three sentences.
- A body with language-tagged code blocks, and a `<PullQuote>` for the headline result.
- The honest problems section. In a comparison, fold each problem into its option's section. Drop a problem that is fixed before publication, and say what changed.
- A "Reproduce it" section with every prerequisite step. Publish each script the note depends on (a reference repo or a gist) and link it. A path in a scratch directory is not a source a reader can open, so leave an `[ENGINEER: ...]` marker until the script is published.
- Media: images under `static/img/field-notes/`, and recordings as a responsive YouTube `iframe`.

## What NOT to do

- Do NOT skip the step 1 `Read`. The template and CONTRIBUTING define the format.
- Do NOT fabricate versions, numbers, board names or command output.
- Do NOT cite a release you did not run. Name a released version in `cli` and `tested_against` only after you built, flashed and booted the project with it, and say which build produced the measured image. If you ran only a development build, cite that build and keep `draft: true` until you rerun with the release.
- Do NOT lead with the weakest result because it was the first one measured.
- Do NOT compare two sides that ran different configurations without saying so.
- Do NOT hype ("revolutionary", "blazing fast", "10x").
- Do NOT put private feedback, names or customer details in the note, the PR or a commit.
- Do NOT add AI attribution to the note or the commit.

## It's working if

The build in `references/verification.md` exits 0 with `draft` set to `false`, and the note's `draft` line has its original value again afterwards. Every number that does not appear in the raw data is a derivation you can name. A reader who reads only the TL;DR can state the result and its key numbers.

For a note that is ready to leave draft, `grep -l "\[ENGINEER:" src/field-notes/<note>.mdx` prints nothing. A draft that still has markers prints the note, which is expected. Keep `draft: true` until it does not, because the build with `draft` set to `false` renders every marker on the page.
