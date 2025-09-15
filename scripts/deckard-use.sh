#!/bin/bash

# Script to permanently use local deckard files by converting symlinks to hard links
# Usage: ./scripts/deckard-use.sh

set -e

VENDOR_DIR="$(dirname "$0")/../src/vendor"

echo "Making local deckard usage permanent by converting symlinks to hard links..."

cd "$VENDOR_DIR"

# Define the specific files we need to handle
EXPECTED_FILES=(
    "index.esm.js"
    "style.css"
    "wasm-DDgzZJey.js"
)

# Convert symlinks to hard links
for file in "${EXPECTED_FILES[@]}"; do
    if [ -L "$file" ]; then
        # Get the target of the symlink
        target=$(readlink "$file")

        # Check if target exists
        if [ -f "$target" ]; then
            echo "Converting symlink to hard link: $file"

            # Remove the symlink
            rm "$file"

            # Create hard link to the target
            ln "$target" "$file"

            echo "  Hard link created: $file -> $target"
        else
            echo "[ERROR] Symlink target '$target' for '$file' does not exist"
            exit 1
        fi
    elif [ -f "$file" ]; then
        echo "[INFO] $file is already a regular file (not a symlink)"
    else
        echo "[WARNING] $file not found"
    fi
done

# Remove backup files
for file in "${EXPECTED_FILES[@]}"; do
    backup="${file}.backup"

    if [ -f "$backup" ]; then
        echo "Removing backup: $backup"
        rm "$backup"
    fi
done

echo ""
echo "Local deckard usage is now permanent!"
echo ""
echo "Symlinks have been converted to hard links - the files are now independent copies."
echo "The original vendored files have been removed and cannot be restored."
echo "To get the original files back, you'll need to restore them from git:"
echo "  git checkout HEAD -- src/vendor/"
echo ""
echo "To unlink and use git-tracked files again:"
echo "  git checkout HEAD -- src/vendor/"
