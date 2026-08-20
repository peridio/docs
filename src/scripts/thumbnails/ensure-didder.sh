#!/usr/bin/env bash
# Download and verify the pinned didder binary.
#
# didder has no Homebrew formula and we do not assume a Go toolchain, so the
# release asset is fetched directly and checked against the published checksums
# file. The binary is gitignored: it is a tool, not a source artifact.
set -euo pipefail

VERSION="1.3.0"
DEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/.tools"
DEST="$DEST_DIR/didder"
BASE="https://github.com/makew0rld/didder/releases/download/v${VERSION}"

if [ -x "$DEST" ] && "$DEST" --version 2>/dev/null | grep -q "didder v${VERSION}"; then
  echo "didder v${VERSION} already present at $DEST"
  exit 0
fi

case "$(uname -s)-$(uname -m)" in
  Darwin-arm64)  ASSET="didder_${VERSION}_macOS_arm64" ;;
  Darwin-x86_64) ASSET="didder_${VERSION}_macOS_64-bit" ;;
  Linux-aarch64) ASSET="didder_${VERSION}_linux_arm64" ;;
  Linux-x86_64)  ASSET="didder_${VERSION}_linux_64-bit" ;;
  *) echo "error: no pinned didder asset for $(uname -s)-$(uname -m)" >&2; exit 1 ;;
esac

mkdir -p "$DEST_DIR"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Fetching $ASSET..."
curl -fsSL -o "$TMP/didder" "$BASE/$ASSET"
curl -fsSL -o "$TMP/checksums.txt" "$BASE/didder_${VERSION}_checksums.txt"

want="$(grep "  ${ASSET}\$" "$TMP/checksums.txt" | awk '{print $1}')"
if [ -z "$want" ]; then
  echo "error: no checksum line for $ASSET" >&2
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  got="$(sha256sum "$TMP/didder" | awk '{print $1}')"
else
  got="$(shasum -a 256 "$TMP/didder" | awk '{print $1}')"
fi

if [ "$got" != "$want" ]; then
  echo "error: checksum mismatch for $ASSET" >&2
  echo "  expected $want" >&2
  echo "  got      $got" >&2
  exit 1
fi

chmod +x "$TMP/didder"
mv "$TMP/didder" "$DEST"
echo "Installed $("$DEST" --version | head -1) at $DEST"
