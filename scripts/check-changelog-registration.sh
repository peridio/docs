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
#      (or .mdx, both are accepted)
#   2. changelogEntries.js  `import`              nothing renders it
#   3. changelogEntries.js  `rawEntries`          absent from the /changelog feed
#      (an import with no rawEntries member is the quietest failure of the four:
#      an unused import is not an error, so everything passes and the entry is
#      simply invisible)
#   4. sidebars-changelog.js                      unreachable from the nav
#
# The rawEntries member carries a hand-typed `permalink` that the feed resolves
# deep links by, so it is checked the same way: it has to equal /changelog/ plus
# the entry's own path, which the file already gives us.
#
# Checks run in both directions: a file missing from a registry, and a registry
# entry with no file behind it. Each defect is reported once — an entry that was
# never imported is reported as that, not also as a missing rawEntries member.

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
# Both forms are needed: two members rendering the same import collapse under
# `sort -u`, so the duplicate would be invisible to every comparison below while
# the entry renders twice in the feed.
sed -n 's|^ *Component: \([A-Za-z0-9_]*\),.*|\1|p' "$ENTRIES" | sort > "$work/components.all"
sort -u "$work/components.all" > "$work/components"
uniq -d "$work/components.all" > "$work/duplicate_components"

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

# ── 5 · permalinks ──────────────────────────────────────────────────────────
# Hand-typed, and the feed resolves deep links by matching this string exactly
# against the entry list (ChangelogInfiniteScroll/index.js). A typo leaves the
# entry in the sidebar and the build green while its link resolves to nothing —
# the same silent failure as a missing registration, so it gets the same
# both-directions treatment.
# Deduped: a copy-pasted member repeats its permalink, and `comm` would count the
# repeat as a permalink with no file behind it — a false report about an entry
# that is present and fine. The duplicate itself is caught below, once.
sed -n "s|^ *permalink: '/changelog/\(.*\)',.*|\1|p" "$ENTRIES" | sort -u > "$work/permalinks"

# ── the guard has to fail when its own parsing breaks ───────────────────────
# A regex that quietly matches nothing would turn this whole script into a
# no-op that reports success forever, which is worse than not having it.
for pair in "files:$work/files" "imports:$work/imported" \
            "rawEntries:$work/components" "sidebar:$work/in_sidebar" \
            "permalinks:$work/permalinks"; do
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
comm -23 "$work/files" "$work/in_sidebar" > "$work/missing_sidebar"
comm -13 "$work/files" "$work/in_sidebar" > "$work/orphan_sidebar"
comm -13 "$work/files.all" "$work/imported" > "$work/orphan_import"
comm -23 "$work/files" "$work/permalinks" > "$work/missing_permalink.all"
comm -13 "$work/files" "$work/permalinks" > "$work/orphan_permalink"

# `in_feed` is built from the imports, so an unimported entry can never appear
# in it and would otherwise be reported twice — once truthfully as not imported,
# then again as "imported but missing from rawEntries", which denies the first.
# Report the rawEntries gap only for entries that did import.
comm -23 "$work/files" "$work/in_feed" > "$work/missing_feed.all"
comm -23 "$work/missing_feed.all" "$work/missing_import" > "$work/missing_feed"

# Same reasoning for the permalink gap: an entry with no import or no member has
# no permalink either, and "add the member" already covers writing one. Report it
# only where the member exists, which is where it means a wrong or absent value.
comm -23 "$work/missing_permalink.all" "$work/missing_import" > "$work/missing_permalink.tmp"
comm -23 "$work/missing_permalink.tmp" "$work/missing_feed" > "$work/missing_permalink"

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

report "changelog entries have no permalink in rawEntries:" \
       "Add permalink: '/changelog/<month>/<entry>' — the feed resolves deep links by it." \
       "$work/missing_permalink"

report "rawEntries permalinks that point at no changelog entry:" \
       "Fix the typo — a permalink must be /changelog/ plus the file's own path." \
       "$work/orphan_permalink"

report "rawEntries renders the same entry more than once:" \
       "Remove the duplicate member — the entry shows twice in the feed." \
       "$work/duplicate_components"

if [ "$status" -ne 0 ]; then
  echo "Publishing a changelog entry means registering it in all of:" >&2
  echo "  $CONTENT_DIR/<month>/<entry>.md (or .mdx)" >&2
  echo "  $ENTRIES  (both the import and rawEntries)" >&2
  echo "  $SIDEBAR" >&2
  exit 1
fi

echo "changelog registration: $(wc -l < "$work/files" | tr -d ' ') entries, all registered"
