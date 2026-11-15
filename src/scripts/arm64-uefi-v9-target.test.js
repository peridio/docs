const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const targets = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/hardware/targets.json'), 'utf8')
)
const entry = targets['arm64-uefi-v9']
const reference = targets['intel-x86-64-v3']

test('arm64-uefi-v9 entry exists', () => {
  assert.ok(entry)
  assert.equal(entry.name, 'Arm64 UEFI (Armv9)')
  assert.equal(entry.target, 'arm64-uefi-v9')
})

test('2026 release is the string in-progress and nothing is supported', () => {
  assert.deepEqual(entry.releases, { 2026: 'in-progress' })
  assert.ok(!Object.values(entry.releases).includes('supported'))
})

test('key set equals intel-x86-64-v3', () => {
  assert.deepEqual(Object.keys(entry).sort(), Object.keys(reference).sort())
})

test('category is one already used by other entries', () => {
  const others = Object.entries(targets)
    .filter(([slug]) => slug !== 'arm64-uefi-v9')
    .map(([, t]) => t.category)
  assert.equal(entry.category, 'usb')
  assert.ok(others.includes(entry.category))
})

test('hardwareUrl is null and provisioning matches the generic UEFI USB flow', () => {
  assert.equal(entry.hardwareUrl, null)
  assert.deepEqual(entry.provisioning, reference.provisioning)
  assert.equal(entry.serial, null)
  assert.equal(entry.gettingStartedUrl, reference.gettingStartedUrl)
})
