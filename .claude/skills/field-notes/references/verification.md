# Verify a note before it leaves draft

Run these from `src/` in the docs repo, after `npm ci`. They match what the `Checks` CI job runs in `scripts/checks.sh`, so the first CI run holds no surprise.

## 1. Format and lint

```bash
npx prettier --check field-notes/<note>.mdx
npm run lint
npm exec -- prettier --check .
bash ../scripts/check-changelog-registration.sh
npm run check-mermaid
npm run og:check
```

`prettier --check .` covers the whole repo, including any new SVG.

`og:check` skips drafts, so it passes on a draft note that has no share card. When a note leaves draft, or when a published note's `title`, `og_title`, `description`, `category` or artwork changes, set `draft` to the value you will commit, then run `npm run og` and `npm run og:check`. Commit the changed PNG under `static/img/field-notes/og/` and `static/img/field-notes/og/manifest.json`.

## 2. Build the page

A note with `draft: true` is not in the build output. To check the rendered page:

1. Set `draft: false` in the note.
2. Run `npm run build`. It must exit 0. The build compiles the MDX.
3. Open `build/field-notes/YYYY/MM/DD/<slug>.html` and confirm the pieces below.
4. Restore the original `draft` value. If the note had no `draft` line, remove the one you added. Confirm with `grep -n '^draft:' field-notes/<note>.mdx`.

In the built page, check:

- each video embed is present (search for the video ID);
- each chart is present (search for its alt text, because small images are inlined as data URIs);
- the tables and the version string appear;
- no `[ENGINEER:` marker remains.

## 3. Content checks

```bash
grep -l "\[ENGINEER:" field-notes/*.mdx
```

The command must not list a note that is ready to leave draft. A draft lists its markers, and the build with `draft` set to `false` renders them, so keep the flag `true` until none remain. Scan the note for em dashes and en dashes. After any rewrite, compare every number in the old and new text, and account for each one that changed.

Trace every number to the raw output. This prints each number in the note body that the raw output does not contain:

```bash
awk '/^---$/{c++; next} c>=2' field-notes/<note>.mdx | grep -o -E '[0-9][0-9,.]*' | sort -u | while read -r n; do m=${n//,/}; m=${m%.}; grep -q -F -- "$m" <raw-output-file> || echo "$n"; done
```

Each number it prints must be a derivation you can name: a sum, a difference, a unit conversion or a rounding. Version strings, dates and protocol values (such as a settle time) are expected. Write the derivation down. If you cannot name one, the number is unverified. The check matches substrings, so a number can pass by accident. Use it as a screen, not as proof.

Open the generated `-thumb.png` for the note. Every label on it must be readable at 400 px.

## 4. Do not commit build output

The build can modify `src/src/data/hardware/generated-targets.json`. It is generated output. Stage the note, its assets, `src/field-notes/thumbnails.lock.json` when `make thumbs` changed it, the share card and `manifest.json` when `npm run og` changed them, and `src/field-notes/authors.yml` when you registered an author. Leave out the generated hardware data.
