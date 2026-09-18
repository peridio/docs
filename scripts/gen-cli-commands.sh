#!/usr/bin/env bash
# Regenerate src/docs-guides/avocado-cli/commands.md from the `avocado` binary
# on PATH. Every section is that command's `--help`; nothing here is hand-typed
# except NOTE below. Requires Bash 4+ (on macOS, install it with `brew install bash`
# and use that bash rather than /bin/bash). Run after a CLI release, then let prettier format it:
#
#   bash scripts/gen-cli-commands.sh
#   (cd src && npm exec -- prettier --write docs-guides/avocado-cli/commands.md)
set -euo pipefail

if (( BASH_VERSINFO[0] < 4 )); then
  echo 'error: gen-cli-commands.sh requires Bash 4+. On macOS, run `brew install bash` and use the installed bash instead of /bin/bash.' >&2
  exit 1
fi

OUT="$(cd "$(dirname "$0")/.." && pwd)/src/docs-guides/avocado-cli/commands.md"
VER="$(avocado --version)"

# Names listed under "Commands:" in a --help output (continuation lines are
# indented deeper than two spaces, so they never match).
subs() {
  local help
  help=$(avocado "$@" --help) || return
  awk '/^Commands:$/{f=1;next} f&&/^$/{exit} f&&/^  [a-z]/&&$1!="help"{print $1}' <<< "$help"
}

# Groups in the order the page has always shown them; new groups follow.
GROUP_ORDER=(connect ext runtime sdk signing-keys var-key initramfs rootfs hitl)
declare -A LABEL=([connect]=Connect [ext]=Extension [runtime]=Runtime [sdk]=SDK
  [signing-keys]='Signing Key' [var-key]='Var Key' [initramfs]=Initramfs
  [rootfs]=Rootfs [hitl]=HITL [vm]=VM [container]=Container [kernel]=Kernel [config]=Config)
# Prose that follows a command's help block. Key is the command words.
declare -A NOTE=(
  ['connect clean']='Removes Connect state from the project: strips the `connect:` section and the `avocado-ext-connect-config` extension from `avocado.yaml`, and deletes `overlay/etc/avocado-conn/`. Operations are idempotent — missing items are skipped with an info message.'
)

help_block() {
  local k="${*:-_}" help
  help=$(avocado "$@" --help) || return
  printf '```\n%s\n\n```\n\n' "$help"
  [ -n "${NOTE[$k]:-}" ] && printf '%s\n\n' "${NOTE[$k]}"
  printf -- '---\n\n'
}

leaf() { # heading hashes, then command words
  local h=$1; shift
  printf '%s `avocado%s`\n\n' "$h" "${*:+ $*}"
  help_block "$@"
}

command_tree() {
  local h=$1 s children; shift
  leaf "$h" "$@"
  children=$(subs "$@")
  for s in $children; do
    command_tree "#$h" "$@" "$s"
  done
}

group() {
  local g=$1 s t u children
  printf '## %s Commands\n\n' "${LABEL[$g]:-${g^}}"
  leaf '###' "$g"
  children=$(subs "$g")
  for s in $children; do
    t=$(subs "$g" "$s")
    if [ -n "$t" ]; then
      printf '### `avocado %s %s` {#%s-%s}\n\n' "$g" "$s" "$g" "$s"
      help_block "$g" "$s"
      for u in $t; do command_tree '####' "$g" "$s" "$u"; done
    else
      leaf '###' "$g" "$s"
    fi
  done
}

# Publish only a complete generation; a failed --help must leave the old page intact.
TMP_OUT=$(mktemp "${OUT}.XXXXXX")
trap 'rm -f "$TMP_OUT"' EXIT

{
cat <<HDR
---
description: 'Complete reference of all Avocado CLI commands on a single page.'
sidebar_label: 'Commands'
sidebar_position: 5
copy_markdown: true
---

# \`commands\`

A complete reference of every \`avocado\` command and subcommand on a single page, taken from \`--help\` of \`${VER}\`. Use your browser's find (Ctrl+F / Cmd+F) to search.

---

## Top-Level Commands

HDR
leaf '###'
groups=()
commands=$(subs | sort)
for c in $commands; do
  children=$(subs "$c")
  if [ -n "$children" ]; then groups+=("$c"); else leaf '###' "$c"; fi
done
for g in "${GROUP_ORDER[@]}"; do
  for c in "${groups[@]}"; do [ "$c" = "$g" ] && group "$g"; done
done
for c in "${groups[@]}"; do
  for g in "${GROUP_ORDER[@]}"; do [ "$c" = "$g" ] && continue 2; done
  group "$c"
done
} > "$TMP_OUT"
mv "$TMP_OUT" "$OUT"
echo "wrote $OUT ($(grep -Ec '^#{3,} ' "$OUT") sections, $VER)"
