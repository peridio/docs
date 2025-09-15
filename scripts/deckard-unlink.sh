#!/bin/bash

# Script to restore original vendored deckard files from backups
# Usage: ./scripts/restore-vendored-deckard.sh

set -e

VENDOR_DIR="$(dirname "$0")/../src/vendor"

echo "Restoring original vendored deckard files..."

cd "$VENDOR_DIR"

# Restore function
restore_file() {
    local file="$1"
    local backup="${file}.backup"

    if [ -f "$backup" ]; then
        echo "Restoring $file from backup..."
        if [ -L "$file" ]; then
            rm "$file"
        fi
        mv "$backup" "$file"
        echo "  Restored $file"
    else
        echo "[WARNING] No backup found for $file"
    fi
}

# Define the specific files we need to restore
EXPECTED_FILES=(
    "index.esm.js"
    "style.css"
    "wasm-DDgzZJey.js"
)

# Remove symlinks and restore backups for each specific file
for file in "${EXPECTED_FILES[@]}"; do
    restore_file "$file"
done

# Clean up any remaining symlinks to deckard files
for file in *.js *.css; do
    if [ -L "$file" ]; then
        TARGET=$(readlink "$file")
        if [[ "$TARGET" == *"deckard"* ]]; then
            echo "Removing deckard symlink: $file"
            rm "$file"
        fi
    fi
done

echo ""
echo "Restoration complete!"
echo ""
echo "To link local deckard development again, run:"
echo "  ./scripts/deckard-link.sh /path/to/deckard-react"
