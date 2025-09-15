#!/bin/bash

# Script to symlink local deckard-react dist files for development
# Usage: ./scripts/use-local-deckard.sh /path/to/deckard-react

set -e

# Check if path argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 /path/to/deckard-react"
    echo "Example: $0 ../deckard-react"
    exit 1
fi

DECKARD_PATH="$1"
VENDOR_DIR="$(dirname "$0")/../src/vendor"

# Validate deckard-react path exists
if [ ! -d "$DECKARD_PATH" ]; then
    echo "[ERROR] Deckard path '$DECKARD_PATH' does not exist."
    exit 1
fi

# Validate dist directory exists
DIST_DIR="$DECKARD_PATH/dist"
if [ ! -d "$DIST_DIR" ]; then
    echo "[ERROR] Dist directory '$DIST_DIR' not found."
    echo "Make sure you've built deckard-react first with 'npm run build' or similar."
    exit 1
fi

# Convert to absolute path
DECKARD_ABS_PATH=$(cd "$DECKARD_PATH" && pwd)
VENDOR_ABS_PATH=$(cd "$VENDOR_DIR" && pwd)

echo "Setting up symlinks for local deckard development..."
echo "Deckard path: $DECKARD_ABS_PATH"
echo "Vendor path: $VENDOR_ABS_PATH"

# Backup existing files if they're not already symlinks
backup_if_needed() {
    local file="$1"
    if [ -f "$file" ] && [ ! -L "$file" ]; then
        echo "Backing up existing $file to ${file}.backup"
        mv "$file" "${file}.backup"
    fi
}

# Remove existing symlinks
remove_symlink() {
    local file="$1"
    if [ -L "$file" ]; then
        echo "Removing existing symlink: $file"
        rm "$file"
    fi
}

# Create symlink with validation
create_symlink() {
    local source="$1"
    local target="$2"
    local description="$3"

    if [ ! -f "$source" ]; then
        echo "[WARNING] Source file '$source' not found, skipping $description"
        return
    fi

    echo "Symlinking $description..."
    ln -sf "$source" "$target"
    echo "  $VENDOR_ABS_PATH/$target -> $source"
}

cd "$VENDOR_DIR"

# Define the specific files we need to link
EXPECTED_FILES=(
    "index.esm.js"
    "style.css"
    "wasm-DDgzZJey.js"
)

# Handle each specific file
for target_file in "${EXPECTED_FILES[@]}"; do
    source_file="$DECKARD_ABS_PATH/dist/$target_file"

    if [ -f "$source_file" ]; then
        backup_if_needed "$target_file"
        remove_symlink "$target_file"
        create_symlink "$source_file" "$target_file" "$target_file"
    else
        echo "[WARNING] Expected file '$source_file' not found in deckard dist"
    fi
done

echo ""
echo "Symlinks created successfully!"
echo ""
echo "To restore the original vendored files, run:"
echo "  ./scripts/deckard-unlink.sh"
echo ""
echo "To permanently use local deckard (remove backups), run:"
echo "  ./scripts/deckard-use.sh"
echo ""
echo "Remember to rebuild deckard-react whenever you make changes:"
echo "  cd $DECKARD_ABS_PATH && npm run build"
