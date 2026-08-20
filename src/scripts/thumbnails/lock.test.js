const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { readLock, writeLock, sha256File, isCurrent } = require('./lock')

function tmp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'thumbs-'))
}

const ENTRY = {
  source: 'local:a.png',
  sourceSha256: 'aaa',
  preset: 'grain-mono',
  presetSha256: 'bbb',
  didderVersion: '1.3.0',
}

test('readLock returns an empty shape when the file is absent', () => {
  assert.deepEqual(readLock(path.join(tmp(), 'missing.json')), { didderVersion: null, notes: {} })
})

test('writeLock round-trips, sorts note keys and ends with a newline', () => {
  const file = path.join(tmp(), 'lock.json')
  writeLock(file, { didderVersion: '1.3.0', notes: { b: { source: 'x' }, a: { source: 'y' } } })
  const text = fs.readFileSync(file, 'utf8')
  assert.ok(text.endsWith('\n'))
  assert.ok(text.indexOf('"a"') < text.indexOf('"b"'))
  assert.equal(readLock(file).notes.a.source, 'y')
})

test('sha256File hashes contents', () => {
  const file = path.join(tmp(), 'a.txt')
  fs.writeFileSync(file, 'hello')
  assert.equal(sha256File(file), '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
})

test('isCurrent is true only when every recorded input matches', () => {
  const out = path.join(tmp(), 'out.png')
  fs.writeFileSync(out, 'x')
  const entry = { ...ENTRY, outputs: { thumb: sha256File(out) } }
  const expected = { ...ENTRY, outputs: { thumb: out } }
  assert.equal(isCurrent(entry, expected), true)
  assert.equal(isCurrent(entry, { ...expected, sourceSha256: 'zzz' }), false)
  assert.equal(isCurrent(entry, { ...expected, presetSha256: 'zzz' }), false)
  assert.equal(isCurrent(entry, { ...expected, preset: 'grain-violet' }), false)
  assert.equal(isCurrent(entry, { ...expected, didderVersion: '1.4.0' }), false)
  assert.equal(isCurrent(undefined, expected), false)
})

test('isCurrent is false when a recorded output is missing from disk', () => {
  const expected = { ...ENTRY, outputs: { thumb: path.join(tmp(), 'gone.png') } }
  assert.equal(isCurrent({ ...ENTRY, outputs: { thumb: 'whatever' } }, expected), false)
})

test('isCurrent is false when an output exists but its content changed', () => {
  // the bug this guards: existence-only checking let a corrupted asset pass as
  // current, so --check reported a clean tree over a broken file
  const out = path.join(tmp(), 'out.png')
  fs.writeFileSync(out, 'original')
  const entry = { ...ENTRY, outputs: { thumb: sha256File(out) } }
  const expected = { ...ENTRY, outputs: { thumb: out } }
  assert.equal(isCurrent(entry, expected), true)
  fs.writeFileSync(out, 'corrupted')
  assert.equal(isCurrent(entry, expected), false)
})

test('isCurrent is false for a legacy entry with no recorded output hashes', () => {
  const out = path.join(tmp(), 'out.png')
  fs.writeFileSync(out, 'x')
  assert.equal(isCurrent(ENTRY, { ...ENTRY, outputs: { thumb: out } }), false)
})
