#!/usr/bin/env node

// Generates src/data/hardware/generated-targets.json — the list that drives the
// "Select your target" dropdown (src/components/TargetSelector). The set of
// targets is sourced from the live Avocado package feed so the dropdown stays
// in sync with what's actually buildable; the rich per-target provisioning
// metadata still comes from the hand-maintained src/data/hardware/targets.json.
//
// Reconciliation is a UNION:
//   - feed slug WITH local metadata  -> use the local entry
//   - feed slug WITHOUT local metadata -> minimal generated entry + warn
//   - local slug NOT in the feed       -> kept (so existing guides aren't lost) + warn
//
// A committed snapshot keeps `docusaurus start` and offline builds working; the
// build (scripts/build.sh) refreshes it from the feed before `docusaurus build`.

const fs = require('node:fs')
const path = require('node:path')

const FEED_URL =
  process.env.AVOCADO_TARGETS_FEED_URL || 'https://repo.avocadolinux.org/2024/edge/targets.json'
const LOCAL_PATH = path.resolve(__dirname, '..', 'src', 'data', 'hardware', 'targets.json')
const OUTPUT_PATH = path.resolve(
  __dirname,
  '..',
  'src',
  'data',
  'hardware',
  'generated-targets.json'
)

function humanize(slug) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Minimal entry shape the TargetSelector can render for a feed target that has
// no curated metadata yet (keeps `.map`/`.includes` calls safe).
function minimalEntry(slug) {
  return {
    name: humanize(slug),
    target: slug,
    category: 'physical',
    description: `${humanize(slug)} is supported by the Avocado package feed. A detailed getting-started guide for this target hasn't been written yet — the steps below are the standard flow.`,
    provisioning: {
      profile: null,
      prerequisites: [],
      provisionCommand: `avocado provision -r dev`,
      bootInstructions:
        'After provisioning completes, power-cycle the device to boot Avocado OS. The root user is passwordless in the dev runtime.',
      warnings: [],
    },
    serial: null,
    gettingStartedUrl: '/developer-reference/getting-started/any-target',
    hardwareUrl: null,
  }
}

async function fetchFeedSlugs() {
  try {
    const res = await fetch(FEED_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    return Object.keys(json)
  } catch (err) {
    console.warn(
      `  Warning: could not fetch target feed (${FEED_URL}): ${err.message}. ` +
        `Falling back to local metadata only.`
    )
    return null
  }
}

async function main() {
  console.log('Syncing targets from the package feed...\n')

  const local = JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf-8'))
  const localSlugs = new Set(Object.keys(local))

  const feedSlugs = await fetchFeedSlugs()

  // Without the feed (offline), keep the local list verbatim.
  const slugs = feedSlugs ? new Set([...feedSlugs, ...localSlugs]) : localSlugs

  const out = {}
  const generated = []
  for (const slug of [...slugs].sort()) {
    if (local[slug]) {
      out[slug] = local[slug]
    } else {
      out[slug] = minimalEntry(slug)
      generated.push(slug)
    }
  }

  if (feedSlugs) {
    const feedSet = new Set(feedSlugs)
    const localOnly = [...localSlugs].filter((s) => !feedSet.has(s))
    if (generated.length) {
      console.warn(
        `  ${generated.length} feed target(s) have no local metadata (basic entry generated): ${generated.join(', ')}`
      )
    }
    if (localOnly.length) {
      console.warn(
        `  ${localOnly.length} local target(s) are not in the feed (kept anyway): ${localOnly.join(', ')}`
      )
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(out, null, 2) + '\n')
  console.log(
    `\n  wrote generated-targets.json (${Object.keys(out).length} targets${
      feedSlugs ? `, ${feedSlugs.length} from feed` : ', feed unavailable'
    })`
  )
}

main()
