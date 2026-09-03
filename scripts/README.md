# Scripts

This directory contains utility scripts for development and maintenance.

## Development server

### src/scripts/dev-server.js

Wraps `docusaurus start` and `docusaurus serve` so the site is reachable from a
phone. Docusaurus binds to localhost by default, which no other device on the
network can see; this binds to `0.0.0.0` and, once the site has actually
compiled, prints the LAN URL with a QR code beside it.

It backs `npm start` and `npm run serve` (and so `make dev`, `make start`,
`make serve`) — there is no separate command to remember.

**Usage:**

```bash
npm start                  # dev server, localhost + LAN + QR
npm run serve              # same, for the last production build
PORT=4000 npm start        # start looking for a free port at 4000
npm start -- --no-open     # extra flags pass through to docusaurus
```

**What it does:**

- Picks the first free port from `--port`, else `$PORT`, else 3000, so a second
  checkout can run alongside the first instead of prompting
- Waits for a real HTTP response before printing, so the banner lands _below_
  webpack's output rather than scrolling away above it
- Picks the LAN address from the first non-virtual private IPv4 interface, and
  degrades to a localhost-only banner when there is nothing routable
- Forwards `SIGINT`/`SIGTERM` to the child so the server never outlives the
  wrapper holding the port

Hot reload works over the LAN too, so edits show up on the phone as you make
them. Everything else on the network can reach the server while it runs — worth
knowing on a network you do not trust.

### src/scripts/qr.js

The QR encoder behind that banner: byte mode, versions 1–6, error correction
level M with an L fallback, rendered with half-block characters and explicit
black/white ANSI colours so it scans on a light or dark terminal alike. It is
about 300 lines and has no dependencies, which is the point — a dev-server
convenience does not justify a package in the tree.

`scripts/qr.test.js` reads each symbol back the way a scanner does, with the
layout rules re-derived rather than imported, and checks the Reed–Solomon
syndromes. The encoder was additionally verified against macOS CoreImage's
decoder for every payload length from 1 to 134 bytes.

## Checks

### check-changelog-registration.sh

Asserts that every file in `src/docs-changelog/` is registered in all the places
a reader depends on. Runs from `checks.sh` (and so in CI on every PR) before
`npm ci`, because it needs nothing installed and should fail fast.

Publishing a changelog entry touches four places. A missing file or import breaks
the build, but **a missing `rawEntries` member or sidebar id still builds, still
serves the page and still passes lint** — the entry just never shows up where
people look. That silent success is what this catches:

| Place | Cost of skipping it |
| --- | --- |
| `src/docs-changelog/<month>/<entry>.md` or `.mdx` | the content itself |
| `changelogEntries.js` — the `import` | nothing renders it |
| `changelogEntries.js` — `rawEntries` | absent from the `/changelog` feed |
| `sidebars-changelog.js` | unreachable from the nav |

The `rawEntries` half is the quietest of the four: an import with no member is
an _unused import_, which is not an error, so every check passes and the entry
is simply invisible.

That member carries a `permalink`, which fails the same way. It is typed by hand,
and the feed resolves deep links by matching it exactly, so a typo leaves the
entry sitting in the sidebar with a link that goes nowhere. It has to equal
`/changelog/` plus the entry's own path, which the file already tells us, so the
check derives it rather than trusting it.

A duplicated `rawEntries` member is caught too — two members rendering the same
import make the entry appear twice in the feed.

It also checks the reverse — a registry entry with no file behind it — and it
**fails if its own parsing finds nothing**, so a future change to the file
layout cannot quietly turn it into a no-op that reports success forever.

Each defect is reported once. An entry that was never imported cannot be in the
feed either, so it is reported as the missing import it is, rather than a second
time as a missing member that contradicts the first.

`index.mdx` and `latest.mdx` are exempt: they live under `docs-changelog/`
without being entries. Registrations disabled with a `/* ... */` block comment
still read as active — the guard is text matching, not a JS parser.

**Usage:**

```bash
./scripts/check-changelog-registration.sh
```

## Field Notes thumbnails

### thumbnails.sh

Generates the dithered thumbnails for the Field Notes index. Runnable from
anywhere in the repo; `make thumbs` is a thin alias for it.

**Usage:**

```bash
./scripts/thumbnails.sh                       # convert what changed
./scripts/thumbnails.sh --only <note-slug>    # one note
./scripts/thumbnails.sh --force               # ignore the lock, rebuild all
./scripts/thumbnails.sh --check               # report drift, write nothing
./scripts/thumbnails.sh --list-presets        # print each preset's didder argv
```

**What it does:**

- Fetches the pinned [didder](https://github.com/makew0rld/didder) binary into
  gitignored `src/.tools/` if missing, verifying it against the release checksums
- Reads each note's `image_source`, centre-crops the source to 16:9, sharpens it,
  and dithers it into a `-thumb` (400px) and a `-hero` (1152px) asset
- Fills in the note's `image` field, whose extension depends on whether the
  source turned out to be animated
- Records source hashes, preset hashes and frame counts in
  `src/field-notes/thumbnails.lock.json`, so unchanged notes are skipped

**A note opts in with one line of front matter:**

```yaml
image_source: local:my-capture.png # or unsplash:<photo-id> / url:<link>
```

Animated GIF sources stay animated. Original images are never modified — the
outputs are new derived files.

**Changing the look:** the palette, dot size, sharpening and frame stride live in
`src/scripts/thumbnails/presets.json`. Editing that file invalidates every note,
so a plain run regenerates them all.

**Requirements:**

- Network access on first run, to fetch the didder binary
- `curl` and either `sha256sum` or `shasum`

## Deckard development scripts

### deckard-link.sh

Sets up symlinks to use a local deckard-react build for development instead of the vendored files.

**Usage:**

```bash
./scripts/deckard-link.sh /path/to/deckard-react
```

**What it does:**

- Creates symlinks from `src/vendor/` files to your local deckard-react `dist/` files
- Backs up existing vendored files (if they're not already symlinks)
- Links JavaScript, CSS, and WASM files automatically
- Validates that the deckard-react path and dist directory exist

**Example:**

```bash
# If deckard-react is in a sibling directory
./scripts/deckard-link.sh ../deckard-react

# Or with an absolute path
./scripts/deckard-link.sh /Users/username/projects/deckard-react
```

**Requirements:**

- The deckard-react repository must be built (`npm run build` or equivalent)
- The `dist/` directory must exist with the built files

### deckard-unlink.sh

Restores the original vendored deckard files from backups created by `deckard-link.sh`.

**Usage:**

```bash
./scripts/deckard-unlink.sh
```

**What it does:**

- Removes symlinks to local deckard-react files
- Restores original vendored files from `.backup` files
- Cleans up any remaining deckard-related symlinks

### deckard-use.sh

Permanently uses local deckard files by removing backup files. This makes the symlinks permanent and removes the ability to restore the original vendored files.

**Usage:**

```bash
./scripts/deckard-use.sh
```

**What it does:**

- Removes `.backup` files created by `deckard-link.sh`
- Makes the current symlinked state permanent
- Cannot be undone without git

**Warning:** After running this script, you can only restore original files via git:

```bash
git checkout HEAD -- src/vendor/
```

## Development workflow

### Temporary linking (recommended for development)

1. **Link local development:**

   ```bash
   ./scripts/deckard-link.sh ../deckard-react
   ```

2. **Make changes to deckard-react and rebuild:**

   ```bash
   cd ../deckard-react
   npm run build
   ```

3. **Test changes in docs** (your changes should be reflected immediately)

4. **When done, restore vendored files:**
   ```bash
   ./scripts/deckard-unlink.sh
   ```

### Permanent linking

1. **Link local development:**

   ```bash
   ./scripts/deckard-link.sh ../deckard-react
   ```

2. **Make it permanent:**

   ```bash
   ./scripts/deckard-use.sh
   ```

3. **To restore later (only via git):**
   ```bash
   git checkout HEAD -- src/vendor/
   ```
