const assert = require('node:assert/strict')
const { describe, it } = require('node:test')
const { patternIndices, hashString, PATTERN_COUNT } = require('./patterns')

describe('TileGrid patterns', () => {
  it('is deterministic for the same inputs', () => {
    assert.deepEqual(patternIndices(4, 'a|b|c|d'), patternIndices(4, 'a|b|c|d'))
  })
  it('gives ten consecutive tiles ten distinct patterns', () => {
    const ten = patternIndices(10, 'any')
    assert.equal(new Set(ten).size, PATTERN_COUNT)
    for (const n of ten) assert.ok(n >= 1 && n <= PATTERN_COUNT)
  })
  it('wraps around after ten without throwing', () => {
    assert.equal(patternIndices(13, 'x').length, 13)
  })
  it('varies the starting pattern between grids', () => {
    const seeds = [
      'QEMU|Raspberry Pi|NVIDIA',
      'Avocado OS|Supported Hardware|Quick Start',
      'Community|Contact Support|Getting Started Guide',
      'Fleet|Projects|Deployments',
      'Secure Boot|Filesystem Integrity|Encryption',
      'NXP|Qualcomm|Seeed',
    ]
    const starts = new Set(seeds.map((s) => patternIndices(1, s)[0]))
    assert.ok(starts.size >= 3, `only ${starts.size} distinct starting patterns`)
  })
  it('hashes strings to a non-negative integer', () => {
    assert.ok(Number.isInteger(hashString('abc')) && hashString('abc') >= 0)
  })
})
