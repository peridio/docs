# Scripts

This directory contains utility scripts for development and maintenance.

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
