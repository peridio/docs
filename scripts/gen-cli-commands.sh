#!/usr/bin/env bash
# Regenerate src/docs-guides/avocado-cli/commands.md from the `avocado` binary
# on PATH. Every section is that command's `--help`; nothing here is hand-typed
# except NOTE below. Run after a CLI release, then let prettier format it:
#
#   bash scripts/gen-cli-commands.sh
#   (cd src && npm exec -- prettier --write docs-guides/avocado-cli/commands.md)
set -euo pipefail

OUT="$(cd "$(dirname "$0")/.." && pwd)/src/docs-guides/avocado-cli/commands.md"
VER="$(avocado --version)"

# Names listed under "Commands:" in a --help output (continuation lines are
# indented deeper than two spaces, so they never match).
subs() { avocado "$@" --help | awk '/^Commands:$/{f=1;next} f&&/^$/{exit} f&&/^  [a-z]/{print $1}' | grep -vx help || true; }

# Groups in the order the page has always shown them; new groups follow.
GROUP_ORDER=(connect ext runtime sdk signing-keys var-key initramfs rootfs hitl)
declare -A LABEL=([connect]=Connect [ext]=Extension [runtime]=Runtime [sdk]=SDK
  [signing-keys]='Signing Key' [var-key]='Var Key' [initramfs]=Initramfs
  [rootfs]=Rootfs [hitl]=HITL [vm]=VM [container]=Container [kernel]=Kernel [config]=Config)
# Prose that follows a command's help block. Key is the command words.
declare -A NOTE=(
  ['connect clean']='Removes Connect state from the project: strips the `connect:` section and the `avocado-ext-connect-config` extension from `avocado.yaml`, and deletes `overlay/etc/avocado-conn/`. Operations are idempotent — missing items are skipped with an info message.'
)

leaf() { # heading hashes, then command words
  local h=$1; shift
  local k="${*:-_}"
  printf '%s `avocado%s`\n\n```\n%s\n\n```\n\n' "$h" "${*:+ $*}" "$(avocado "$@" --help)"
  [ -n "${NOTE[$k]:-}" ] && printf '%s\n\n' "${NOTE[$k]}"
  printf -- '---\n\n'
}

group() {
  local g=$1 s t u
  printf '## %s Commands\n\n' "${LABEL[$g]:-${g^}}"
  leaf '###' "$g"
  for s in $(subs "$g"); do
    t=$(subs "$g" "$s")
    if [ -n "$t" ]; then
      printf '### `avocado %s %s` {#%s-%s}\n\n' "$g" "$s" "$g" "$s"
      for u in $t; do leaf '####' "$g" "$s" "$u"; done
    else
      leaf '###' "$g" "$s"
    fi
  done
}

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
for c in $(subs | sort); do
  if [ -n "$(subs "$c")" ]; then groups+=("$c"); else leaf '###' "$c"; fi
done
for g in "${GROUP_ORDER[@]}"; do
  for c in "${groups[@]}"; do [ "$c" = "$g" ] && group "$g"; done
done
for c in "${groups[@]}"; do
  for g in "${GROUP_ORDER[@]}"; do [ "$c" = "$g" ] && continue 2; done
  group "$c"
done
} > "$OUT"
echo "wrote $OUT ($(grep -c '^### \|^#### ' "$OUT") sections, $VER)"
