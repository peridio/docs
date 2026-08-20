#!/bin/bash
#
# Assert that every changelog entry is registered everywhere it has to be.
#
# Publishing an entry means touching four places. A missing file or import
# breaks the build, but a missing rawEntries member or sidebar id still builds,
# still serves the page and still passes lint — the entry just never appears
# where readers look for it. That is the whole reason this check exists: the
# failure mode is a silent success, so only an assertion catches it.
#
# The four places, and what skipping each one costs:
#
#   1. src/docs-changelog/<month>/<entry>.md      the content itself
#   2. changelogEntries.js  `import`              nothing renders it
#   3. changelogEntries.js  `rawEntries`          absent from the /changelog feed
#      (an import with no rawEntries member is the quietest failure of the four:
#      an unused import is not an error, so everything passes and the entry is
#      simply invisible)
#   4. sidebars-changelog.js                      unreachable from the nav
#
# Checks run in both directions: a file missing from a registry, and a registry
# entry with no file behind it.

set -euo pipefail

# `join` requires its inputs collated the same way they were sorted, and the
# runner's locale is not ours to assume.
export LC_ALL=C

cd "$(dirname "$0")/.."

CONTENT_DIR="src/docs-changelog"
ENTRIES="src/src/components/ChangelogInfiniteScroll/changelogEntries.js"
SIDEBAR="src/sidebars-changelog.js"

# Pages that live under docs-changelog/ without being changelog entries: the
# index, and the /changelog/latest target that the release process repoints.
NOT_AN_ENTRY=("index" "latest")

for f in "$ENTRIES" "$SIDEBAR"; do
  [ -f "$f" ] || { echo "error: $f is missing — this check needs updating." >&2; exit 1; }
done

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

# ── 1 · the content files, month/name with the extension stripped ────────────
find "$CONTENT_DIR" -type f \( -name '*.md' -o -name '*.mdx' \) \
  | sed -e "s|^$CONTENT_DIR/||" -e 's/\.mdx\{0,1\}$//' \
  | sort > "$work/files.all"

# Drop the non-entry pages. The match is anchored on the whole relative path,
# so it only ever drops root-level index/latest — a month/index.md would still
# be checked like any other entry.
cp "$work/files.all" "$work/files"
for skip in "${NOT_AN_ENTRY[@]}"; do
  grep -v "^${skip}$" "$work/files" > "$work/files.tmp" || true
  mv "$work/files.tmp" "$work/files"
done

# ── 2 · imports: IDENT -> month/name ────────────────────────────────────────
sed -n "s|^import \([A-Za-z0-9_]*\) from '.*docs-changelog/\(.*\)\.mdx\{0,1\}'.*|\1 \2|p" \
  "$ENTRIES" | sort > "$work/imports.pairs"
cut -d' ' -f2 "$work/imports.pairs" | sort > "$work/imported"

# ── 3 · rawEntries: the Component each member renders ───────────────────────
sed -n 's|^ *Component: \([A-Za-z0-9_]*\),.*|\1|p' "$ENTRIES" | sort -u > "$work/components"

# Translate those identifiers back into paths, so the diff below reads in the
# same terms as everything else. Options before the operands — BSD join rejects
# them afterwards — and no error suppression here: a guard that hides its own
# failures is how this rots into a no-op.
join -o 2.2 "$work/components" "$work/imports.pairs" | sort > "$work/in_feed"

# ── 4 · sidebar ids ─────────────────────────────────────────────────────────
# Drop line comments first: the parsers above anchor at ^ and so ignore them
# already. Block comments are not handled. `|| true` hands a no-match result to
# the zero-row check below, which reports it — without it grep's exit 1 trips
# `set -e` here and the script dies with no message at all.
grep -v '^[[:space:]]*//' "$SIDEBAR" \
  | grep -oE "'[a-z]+-[0-9]{4}/[^']+'" | tr -d "'" | sort -u > "$work/in_sidebar" || true

# ── the guard has to fail when its own parsing breaks ───────────────────────
# A regex that quietly matches nothing would turn this whole script into a
# no-op that reports success forever, which is worse than not having it.
for pair in "files:$work/files" "imports:$work/imported" \
            "rawEntries:$work/components" "sidebar:$work/in_sidebar"; do
  name=${pair%%:*}
  path=${pair#*:}
  if [ ! -s "$path" ]; then
    echo "error: parsed zero $name entries — the file layout changed and this" >&2
    echo "       check is no longer looking at the right thing. Fix the check." >&2
    exit 1
  fi
done

status=0

report() {
  local title=$1 fix=$2 list=$3
  [ -s "$list" ] || return 0
  status=1
  echo "error: $title" >&2
  sed 's/^/  - /' "$list" >&2
  echo "       $fix" >&2
  echo >&2
}

comm -23 "$work/files" "$work/imported"   > "$work/missing_import"
comm -23 "$work/files" "$work/in_feed"    > "$work/missing_feed"
comm -23 "$work/files" "$work/in_sidebar" > "$work/missing_sidebar"
comm -13 "$work/files" "$work/in_sidebar" > "$work/orphan_sidebar"
comm -13 "$work/files.all" "$work/imported" > "$work/orphan_import"

report "changelog entries are not imported in changelogEntries.js:" \
       "Add an import for each, newest-first." "$work/missing_import"

report "changelog entries are imported but missing from rawEntries:" \
       "Add a rawEntries member for each — without one it never reaches the feed." \
       "$work/missing_feed"

report "changelog entries are missing from sidebars-changelog.js:" \
       "Add each to its month's category items." "$work/missing_sidebar"

report "sidebars-changelog.js references entries that do not exist:" \
       "Remove them, or restore the files." "$work/orphan_sidebar"

report "changelogEntries.js imports files that do not exist:" \
       "Remove the imports, or restore the files." "$work/orphan_import"

if [ "$status" -ne 0 ]; then
  echo "Publishing a changelog entry means registering it in all of:" >&2
  echo "  $CONTENT_DIR/<month>/<entry>.md" >&2
  echo "  $ENTRIES  (both the import and rawEntries)" >&2
  echo "  $SIDEBAR" >&2
  exit 1
fi

echo "changelog registration: $(wc -l < "$work/files" | tr -d ' ') entries, all registered"
