// The thumbnail lock file.
//
// It does four jobs at once: skip work whose inputs have not changed, make a run
// reproducible, hold the photographer attribution Unsplash's API terms require,
// and record which extension each note's assets carry so the theme can build a
// src for either a PNG or an animated GIF.
const crypto = require('node:crypto')
const fs = require('node:fs')

function readLock(lockPath) {
  if (!fs.existsSync(lockPath)) {
    return { didderVersion: null, notes: {} }
  }
  const parsed = JSON.parse(fs.readFileSync(lockPath, 'utf8'))
  return { didderVersion: parsed.didderVersion ?? null, notes: parsed.notes ?? {} }
}

function writeLock(lockPath, lock) {
  const notes = {}
  for (const slug of Object.keys(lock.notes).sort()) {
    notes[slug] = lock.notes[slug]
  }
  fs.writeFileSync(
    lockPath,
    JSON.stringify({ didderVersion: lock.didderVersion, notes }, null, 2) + '\n'
  )
}

function sha256File(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

// `expected.outputs` maps kind -> path. Inputs are compared by recorded value and
// outputs by content hash: existence alone would let a truncated, hand-edited or
// half-written asset pass as current, which is exactly what --check exists to
// catch.
function isCurrent(entry, expected) {
  if (!entry) return false
  const inputsMatch =
    entry.source === expected.source &&
    entry.sourceSha256 === expected.sourceSha256 &&
    entry.preset === expected.preset &&
    entry.presetSha256 === expected.presetSha256 &&
    entry.didderVersion === expected.didderVersion
  if (!inputsMatch) return false
  return Object.entries(expected.outputs).every(([kind, file]) => {
    if (!fs.existsSync(file)) return false
    // an entry written before output hashes were recorded cannot be verified
    if (!entry.outputs || !entry.outputs[kind]) return false
    return entry.outputs[kind] === sha256File(file)
  })
}

module.exports = { readLock, writeLock, sha256File, isCurrent }
