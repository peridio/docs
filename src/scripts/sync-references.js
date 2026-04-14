#!/usr/bin/env node

const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const yaml = require('yaml')

// ── Configuration ──────────────────────────────────────────────────────────────
const REPO_URL = 'https://github.com/avocado-linux/references.git'
const CLONE_DIR = path.resolve(__dirname, '..', '.cache-references')
const OUTPUT_DIR = path.resolve(__dirname, '..', 'docs-guides', 'references')
const ICONS_DIR = path.resolve(__dirname, '..', 'static', 'generated', 'references')
const GITHUB_BASE = 'https://github.com/avocado-linux/references/tree/main'

// ── Clone or pull the references repo ────────────────────────────────────────
function syncRepo() {
  if (fs.existsSync(path.join(CLONE_DIR, '.git'))) {
    console.log(`Pulling latest from ${REPO_URL}...`)
    execSync('git fetch origin && git reset --hard origin/main', {
      cwd: CLONE_DIR,
      stdio: 'inherit',
    })
  } else {
    console.log(`Cloning ${REPO_URL}...`)
    if (fs.existsSync(CLONE_DIR)) {
      fs.rmSync(CLONE_DIR, { recursive: true })
    }
    execSync(`git clone --depth 1 ${REPO_URL} "${CLONE_DIR}"`, {
      stdio: 'inherit',
    })
  }
}

// ── Parse README.md frontmatter ───────────────────────────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  try {
    return yaml.parse(match[1]) || {}
  } catch {
    return {}
  }
}

// ── Extract title from H1 (strip inline img tags) ─────────────────────────────
function extractTitle(content) {
  const body = content.replace(/^---\n[\s\S]*?\n---\n*/, '')
  const h1Match = body.match(/^#\s+(.+)$/m)
  if (!h1Match) return null
  return h1Match[1].replace(/<img[^>]*\/?\s*>/g, '').trim()
}

// ── Extract description (first paragraph after H1) ────────────────────────────
function extractDescription(content) {
  const body = content.replace(/^---\n[\s\S]*?\n---\n*/, '')
  const lines = body.split('\n')
  let pastH1 = false
  for (const line of lines) {
    if (!pastH1) {
      if (line.match(/^#\s+/)) pastH1 = true
      continue
    }
    const trimmed = line.trim()
    if (trimmed === '') continue
    if (trimmed.startsWith('#') || trimmed.startsWith('```') || trimmed.startsWith('-')) break
    return trimmed
  }
  return ''
}

// ── Strip H1 and img tags from getting_started body ───────────────────────────
function processGettingStarted(content) {
  // Remove inline <img> tags
  let body = content.replace(/<img[^>]*\/?\s*>/g, '')
  // Remove the H1 line (we use frontmatter title instead)
  body = body.replace(/^#\s+.+$/m, '').trimStart()
  return body
}

// ── Parse a reference folder ──────────────────────────────────────────────────
function parseReference(name, dirPath) {
  const readmePath = path.join(dirPath, 'README.md')
  if (!fs.existsSync(readmePath)) return null

  const readme = fs.readFileSync(readmePath, 'utf-8')
  const frontmatter = parseFrontmatter(readme)

  // Validate required fields
  if (!frontmatter.language) {
    console.warn(`  Warning: ${name}/README.md missing 'language' in frontmatter, skipping`)
    return null
  }
  if (
    !frontmatter.topics ||
    !Array.isArray(frontmatter.topics) ||
    frontmatter.topics.length === 0
  ) {
    console.warn(`  Warning: ${name}/README.md missing 'topics' in frontmatter, skipping`)
    return null
  }

  const title = extractTitle(readme) || formatTitle(name)
  const description = extractDescription(readme)

  // Normalize targets
  let targets = []
  if (frontmatter.targets) {
    if (
      frontmatter.targets === '*' ||
      (Array.isArray(frontmatter.targets) && frontmatter.targets.includes('*'))
    ) {
      targets = ['*']
    } else if (Array.isArray(frontmatter.targets)) {
      targets = frontmatter.targets
    } else {
      targets = [frontmatter.targets]
    }
  }

  // Handle icon
  let icon = null
  if (frontmatter.icon) {
    const iconSrc = path.join(dirPath, frontmatter.icon)
    if (fs.existsSync(iconSrc)) {
      const ext = path.extname(frontmatter.icon)
      const iconDest = `${name}${ext}`
      fs.mkdirSync(ICONS_DIR, { recursive: true })
      fs.copyFileSync(iconSrc, path.join(ICONS_DIR, iconDest))
      icon = `/generated/references/${iconDest}`
    }
  }

  // Read getting_started.md
  const gsPath = path.join(dirPath, 'getting_started.md')
  const hasGettingStarted = fs.existsSync(gsPath)
  let gettingStartedBody = null
  if (hasGettingStarted) {
    gettingStartedBody = processGettingStarted(fs.readFileSync(gsPath, 'utf-8'))
  }

  const experimental = name.includes('experimental')

  return {
    name,
    title,
    description,
    language: frontmatter.language,
    targets,
    topics: frontmatter.topics,
    icon,
    experimental,
    hasGettingStarted,
    gettingStartedBody,
  }
}

function formatTitle(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// ── Clean stale generated files ──────────────────────────────────────────────
function cleanStale(refs) {
  const validNames = new Set(refs.map((r) => r.name))

  // Remove .mdx pages for references that no longer exist
  const existing = fs
    .readdirSync(OUTPUT_DIR)
    .filter((f) => f.endsWith('.mdx') && f !== 'explore.mdx')
  let removed = 0
  for (const file of existing) {
    const name = file.replace('.mdx', '')
    if (!validNames.has(name)) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file))
      console.log(`  removed stale page: ${file}`)
      removed++
    }
  }

  // Remove stale icons
  if (fs.existsSync(ICONS_DIR)) {
    const existingIcons = fs.readdirSync(ICONS_DIR)
    for (const file of existingIcons) {
      const name = file.replace(/\.[^.]+$/, '')
      if (!validNames.has(name)) {
        fs.unlinkSync(path.join(ICONS_DIR, file))
        console.log(`  removed stale icon: ${file}`)
        removed++
      }
    }
  }

  if (removed > 0) {
    console.log(`  cleaned ${removed} stale file(s)`)
  }
}

// ── Generate output ───────────────────────────────────────────────────────────
function generate(refs) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // Clean stale files from previous runs
  cleanStale(refs)

  // Write JSON data file (exclude gettingStartedBody from JSON)
  const dataRefs = refs.map(({ gettingStartedBody, hasGettingStarted, ...rest }) => rest)
  const dataPath = path.join(OUTPUT_DIR, 'data.json')
  fs.writeFileSync(dataPath, JSON.stringify(dataRefs, null, 2))
  console.log(`  wrote data.json (${refs.length} references)`)

  // Generate individual reference pages from getting_started.md
  let pageCount = 0
  for (const ref of refs) {
    if (!ref.hasGettingStarted || !ref.gettingStartedBody) continue

    const githubUrl = `${GITHUB_BASE}/${ref.name}`
    const pagePath = path.join(OUTPUT_DIR, `${ref.name}.mdx`)
    const page = `---
title: '${ref.title.replace(/'/g, "''")}'
description: 'Getting started with ${ref.title.replace(/'/g, "''")}.'
sidebar_class_name: hidden
---

<a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="reference-github-link">View source on GitHub</a>

${ref.gettingStartedBody}
`
    fs.writeFileSync(pagePath, page)
    pageCount++
  }
  console.log(`  wrote ${pageCount} reference pages`)

  // Only write explore.mdx if it doesn't exist yet
  const mdxPath = path.join(OUTPUT_DIR, 'explore.mdx')
  if (!fs.existsSync(mdxPath)) {
    const mdx = `---
title: 'Explore'
---

{/* Auto-generated data — run: node scripts/sync-references.js */}

import ReferenceList from '@site/src/components/ReferenceList'
import data from './data.json'

References are complete, ready-to-build example projects that demonstrate how to use Avocado OS with different languages, frameworks, and hardware targets. Each reference includes an ${'`'}avocado.yaml${'`'}, application source, build scripts, and a getting started guide. Use [${'`'}avocado init --reference${'`'}](/developer-reference/avocado-cli/commands#avocado-init) to scaffold a new project from any reference:

${'```'}text
avocado init --reference python-mqtt my-project
${'```'}

---

<ReferenceList references={data} />
`
    fs.writeFileSync(mdxPath, mdx)
    console.log('  wrote explore.mdx')
  } else {
    console.log('  explore.mdx already exists, skipping (only data.json updated)')
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  console.log('Syncing references...\n')

  syncRepo()

  const entries = fs.readdirSync(CLONE_DIR, { withFileTypes: true })
  const refs = []

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue
    const ref = parseReference(entry.name, path.join(CLONE_DIR, entry.name))
    if (ref) refs.push(ref)
  }

  refs.sort((a, b) => a.name.localeCompare(b.name))

  if (refs.length === 0) {
    console.warn('Warning: no references found')
    process.exit(0)
  }

  console.log(`\nFound ${refs.length} references: ${refs.map((r) => r.name).join(', ')}\n`)
  generate(refs)
}

main()
