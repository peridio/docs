#!/usr/bin/env node

// Refreshes schemas/avocado-config.json, the avocado.yaml schema that the
// "Config schema" page renders and the site serves at
// /schemas/avocado-config.json (where `avocado init` points editors).
//
// The schema is owned by avocado-cli, which warns about any key it doesn't
// describe, so it is taken from there rather than edited here. It comes from
// the latest avocado-cli release, not main, so the site never documents keys a
// released CLI doesn't read yet.
//
// A committed snapshot keeps `docusaurus start` and offline builds working, and
// covers releases that predate the schema moving into avocado-cli; the build
// (scripts/build.sh) refreshes it before `docusaurus build`.

const fs = require('node:fs')
const path = require('node:path')

const REPO = 'avocado-linux/avocado-cli'
const SCHEMA_PATH = 'schemas/avocado-config.json'
// Set to a branch, tag or commit to preview an unreleased schema.
const REF_OVERRIDE = process.env.AVOCADO_CLI_SCHEMA_REF
const OUTPUT_PATH = path.resolve(__dirname, '..', 'schemas', 'avocado-config.json')

async function latestReleaseTag() {
  const headers = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers })
  if (!res.ok) throw new Error(`latest release: HTTP ${res.status}`)
  return (await res.json()).tag_name
}

async function fetchSchema(ref) {
  const url = `https://raw.githubusercontent.com/${REPO}/${ref}/${SCHEMA_PATH}`
  const res = await fetch(url)
  // A release cut before the schema lived in avocado-cli has no such file.
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
  const text = await res.text()
  JSON.parse(text)
  return text
}

async function main() {
  console.log('Syncing the avocado.yaml schema from avocado-cli...\n')
  try {
    const ref = REF_OVERRIDE || (await latestReleaseTag())
    const schema = await fetchSchema(ref)
    if (schema === null) {
      console.warn(`  ${REPO}@${ref} has no ${SCHEMA_PATH}; keeping the committed snapshot.`)
      return
    }
    fs.writeFileSync(OUTPUT_PATH, schema.endsWith('\n') ? schema : `${schema}\n`)
    console.log(`  Wrote the schema from ${REPO}@${ref}.`)
  } catch (err) {
    console.warn(
      `  Warning: could not fetch the schema (${err.message}). Keeping the committed snapshot.`
    )
  }
}

main()
