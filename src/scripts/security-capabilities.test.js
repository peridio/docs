const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const caps = require('../src/data/hardware/security-capabilities.js')

const SITE_ROOT = path.resolve(__dirname, '..')

function cap(status, extra = {}) {
  return { status, ...extra }
}

function validProfile(overrides = {}) {
  return {
    machines: ['m1'],
    declared: 'encrypted-var',
    encryptedVar: cap('yes'),
    signedBootFit: cap('no'),
    rootfsVerity: cap('no'),
    extensionVerity: cap('yes'),
    ...overrides,
  }
}

function validData(profiles) {
  return { asOf: '2026-10-02', feed: '2026 (wrynose)', profiles }
}

function errorsFor(overrides) {
  return caps.validate(validData({ p: validProfile(overrides) }))
}

test('the shipped data has no validation errors', () => {
  assert.deepEqual(caps.validate(caps.data), [])
})

test('a status outside the vocabulary is rejected and names the profile and capability', () => {
  const errors = errorsFor({ encryptedVar: cap('mostly') })
  assert.equal(errors.length, 1)
  assert.match(errors[0], /p\.encryptedVar/)
  assert.match(errors[0], /mostly/)
})

test('n/a and staged need a matrix summary because a bare label would say nothing', () => {
  for (const status of ['n/a', 'staged']) {
    const errors = errorsFor({ rootfsVerity: cap(status) })
    assert.equal(errors.length, 1, status)
    assert.match(errors[0], /p\.rootfsVerity/)
    assert.match(errors[0], /summary/)
  }
})

test('a whitespace-only summary is rejected like a missing one', () => {
  const errors = errorsFor({ rootfsVerity: cap('staged', { summary: '   ' }) })
  assert.equal(errors.length, 1)
  assert.match(errors[0], /p\.rootfsVerity.*summary/)
})

test('n/a with a summary is accepted', () => {
  const errors = errorsFor({ signedBootFit: cap('n/a', { summary: 'n/a - no FIT' }) })
  assert.deepEqual(errors, [])
})

test('a missing capability is rejected', () => {
  const profile = validProfile()
  delete profile.extensionVerity
  const errors = caps.validate(validData({ p: profile }))
  assert.equal(errors.length, 1)
  assert.match(errors[0], /p\.extensionVerity/)
})

test('a machine listed in two profiles is rejected', () => {
  const errors = caps.validate(
    validData({
      a: validProfile({ machines: ['dup'] }),
      b: validProfile({ machines: ['dup', 'other'] }),
    })
  )
  assert.equal(errors.length, 1)
  assert.match(errors[0], /dup/)
})

test('a profile with no machines is rejected', () => {
  const errors = errorsFor({ machines: [] })
  assert.deepEqual(errors, ['profile p lists no machines'])
})

test('the stamp must carry a date and a feed so the table cannot go undated', () => {
  const errors = caps.validate({ profiles: { p: validProfile() } })
  assert.equal(errors.length, 2)
  assert.match(errors[0], /asOf/)
  assert.match(errors[1], /feed/)
})

test('asOf must be an ISO date', () => {
  const errors = caps.validate({ ...validData({ p: validProfile() }), asOf: 'last tuesday' })
  assert.equal(errors.length, 1)
  assert.match(errors[0], /asOf.*last tuesday/)
})

test('declared must be a string or null, and may not be left out', () => {
  assert.equal(errorsFor({ declared: 42 }).length, 1)
  assert.match(errorsFor({ declared: 42 })[0], /p\.declared/)

  const profile = validProfile()
  delete profile.declared
  const errors = caps.validate(validData({ p: profile }))
  assert.equal(errors.length, 1)
  assert.match(errors[0], /p\.declared/)
})

test('an other row needs a label and a detail', () => {
  const noLabel = errorsFor({ other: [{ detail: 'x' }] })
  assert.equal(noLabel.length, 1)
  assert.match(noLabel[0], /p\.other\[0\].*label/)

  const noDetail = errorsFor({ other: [{ label: 'AHAB' }] })
  assert.equal(noDetail.length, 1)
  assert.match(noDetail[0], /p\.other\[0\].*detail/)
})

test('encrypted /var is yes exactly when the machine declares encrypted-var', () => {
  const notDeclared = errorsFor({ declared: 'tpm2' })
  assert.equal(notDeclared.length, 1)
  assert.match(notDeclared[0], /p\.encryptedVar.*encrypted-var/)

  const declaredButNo = errorsFor({ encryptedVar: cap('no') })
  assert.equal(declaredButNo.length, 1)
  assert.match(declaredButNo[0], /p\.encryptedVar.*encrypted-var/)

  assert.deepEqual(errorsFor({ declared: null, encryptedVar: cap('not-declared') }), [])
})

test('a signed boot FIT is yes exactly when the machine declares verified-boot', () => {
  const notDeclared = errorsFor({ signedBootFit: cap('yes') })
  assert.equal(notDeclared.length, 1)
  assert.match(notDeclared[0], /p\.signedBootFit.*verified-boot/)

  const declaredButNo = errorsFor({ declared: 'encrypted-var verified-boot' })
  assert.equal(declaredButNo.length, 1)
  assert.match(declaredButNo[0], /p\.signedBootFit.*verified-boot/)

  const consistent = errorsFor({
    declared: 'encrypted-var verified-boot',
    signedBootFit: cap('yes'),
  })
  assert.deepEqual(consistent, [])
})

test('profileForMachine resolves a member of a shared profile', () => {
  const profile = caps.profileForMachine('jetson-orin-nx')
  assert.equal(profile, caps.data.profiles.jetson)
})

test('profileForMachine throws on an unknown machine', () => {
  assert.throws(() => caps.profileForMachine('no-such-board'), /no-such-board/)
})

test('profileById resolves a profile and throws on an unknown id', () => {
  assert.equal(caps.profileById('jetson'), caps.data.profiles.jetson)
  assert.throws(() => caps.profileById('no-such-profile'), /no-such-profile/)
})

test('rowsFor lists the capability rows then the other rows, in matrix order', () => {
  const rows = caps.rowsFor('jetson')
  assert.deepEqual(
    rows.map((r) => r.label),
    [
      'Encrypted `/var`',
      'Signed boot FIT',
      'Rootfs dm-verity',
      'Extension dm-verity',
      'Recovery key',
    ]
  )
  assert.equal(rows[0].detail, caps.data.profiles.jetson.encryptedVar.detail)
})

test('rowsFor refuses a profile that has no hardware-page detail, rather than render an empty table', () => {
  assert.throws(() => caps.rowsFor('imx-booti'), /imx-booti.*detail/)
})

test('rowsFor refuses a half-filled profile, because a missing detail would silently drop a row', () => {
  const data = validData({ p: validProfile({ encryptedVar: cap('yes', { detail: 'Built' }) }) })
  assert.throws(() => caps.rowsFor('p', data), /p\.rootfsVerity.*detail/)
})

test('every machine or profile named by a docs page resolves', () => {
  const roots = ['docs-hardware', 'docs-guides', 'docs-overview', 'docs-changelog', 'field-notes']
  const pages = []
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.mdx?$/.test(entry.name)) pages.push(full)
    }
  }
  for (const root of roots) walk(path.join(SITE_ROOT, root))

  let seen = 0
  for (const page of pages) {
    const text = fs.readFileSync(page, 'utf8')
    const openings = (text.match(/<SecurityCapabilities\b/g) || []).length
    const named = [...text.matchAll(/<SecurityCapabilities\b[^>]*?\b(machine|profile)="([^"]+)"/g)]
    assert.equal(
      named.length,
      openings,
      `${page}: a <SecurityCapabilities> names no machine or profile in double quotes`
    )
    for (const [, kind, value] of named) {
      seen += 1
      if (kind === 'machine') {
        assert.doesNotThrow(() => caps.profileForMachine(value), `${page}: ${value}`)
      } else {
        assert.doesNotThrow(() => caps.profileById(value), `${page}: profile ${value}`)
      }
    }
  }
  assert.ok(seen > 0, 'no page uses <SecurityCapabilities>; the scan matched nothing')
})
