# Verify a note before it leaves draft

Run these from `src/` in the docs repo, after `npm ci`. They match what the `Checks` CI job runs in `scripts/checks.sh`, so the first CI run holds no surprise.

## 1. Format and lint

```bash
npx prettier --check field-notes/<note>.mdx
npm run lint
npm exec -- prettier --check .
bash ../scripts/check-changelog-registration.sh
npm run check-mermaid
```

`prettier --check .` covers the whole repo, including any new SVG.

## 2. Build the page

A note with `draft: true` is not in the build output. To check the rendered page:

1. Set `draft: false` in the note.
2. Run `npm run build`. It must exit 0. The build compiles the MDX.
3. Open `build/field-notes/YYYY/MM/DD/<slug>.html` and confirm the pieces below.
4. Set `draft: true` again, and confirm with `grep -n '^draft:' field-notes/<note>.mdx`.

In the built page, check:

- each video embed is present (search for the video ID);
- each chart is present (search for its alt text, because small images are inlined as data URIs);
- the tables and the version string appear;
- no `[ENGINEER:` marker remains.

## 3. Content checks

```bash
grep -l "\[ENGINEER:" field-notes/*.mdx
```

The command must not list the note. Scan the note for em dashes and en dashes. After any rewrite, compare every number in the old and new text, and account for each one that changed.

## 4. Do not commit build output

The build can modify `src/src/data/hardware/generated-targets.json`. It is generated output. Stage only the note and its assets.
