# Scripts

This directory contains utility scripts for development and maintenance.

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
