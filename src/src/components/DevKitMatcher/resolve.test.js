const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { describe, it } = require('node:test')

const data = require('../../data/hardware/dev-kit-matcher.json')
const targets = require('../../data/hardware/targets.json')

// resolve.js is ESM because webpack consumes it, while `npm test` runs plain
// CommonJS. The module is import-free, so dropping the `export` keywords leaves a
// script we can evaluate.
const source = fs.readFileSync(path.join(__dirname, 'resolve.js'), 'utf8')
assert.doesNotMatch(source, /^\s*import\s/m, 'the shim below needs an import-free module')
const { resolveMatcher } = vm.runInNewContext(
  `${source.replace(/^export /gm, '')};({ resolveMatcher })`
)

describe('dev-kit-matcher.json', () => {
  it('keys every dev kit by a targets.json key', () => {
    for (const id of Object.keys(data.devKits)) {
      assert.ok(targets[id], `dev kit "${id}" is not in targets.json`)
    }
  })

  it('points every production target at a targets.json key', () => {
    for (const [id, device] of Object.entries(data.production)) {
      if (device.target) {
        assert.ok(targets[device.target], `production "${id}" target "${device.target}" is missing`)
      }
    }
  })

  it('resolves against targets.json without errors', () => {
    const { devKits, production } = resolveMatcher(data, targets)
    for (const kit of Object.values(devKits)) {
      assert.ok(kit.name && kit.hardwareUrl && kit.getStartedUrl, JSON.stringify(kit))
    }
    for (const device of Object.values(production)) {
      assert.ok(device.name && device.hardwareUrl, JSON.stringify(device))
    }
  })
})

describe('resolveMatcher', () => {
  const kit = { soc: 'X' }
  const pairing = { soc: 'X', underEvaluation: false, recommended: 'kit', compatible: [], why: '' }
  const fakeTargets = {
    kit: { name: 'Kit', hardwareUrl: '/hardware/kit', gettingStartedUrl: '/learn/get-started/kit' },
    board: {
      name: 'Board',
      hardwareUrl: '/hardware/board',
      gettingStartedUrl: '/learn/get-started/any-target',
    },
  }

  it('reads labels and URLs from targets.json', () => {
    const { devKits, production } = resolveMatcher(
      { devKits: { kit, board: kit }, production: { p: { ...pairing, target: 'board' } } },
      fakeTargets
    )
    assert.equal(devKits.kit.name, 'Kit')
    assert.equal(devKits.kit.getStartedUrl, '/learn/get-started/kit')
    assert.equal(devKits.board.getStartedUrl, '/learn/get-started/any-target#board')
    assert.equal(production.p.hardwareUrl, '/hardware/board')
  })

  it('rejects a dev kit that is not a targets.json key', () => {
    assert.throws(
      () => resolveMatcher({ devKits: { nope: kit }, production: {} }, fakeTargets),
      /dev kit "nope"/
    )
  })

  it('rejects a production target that is not a targets.json key', () => {
    const input = { devKits: { kit }, production: { p: { ...pairing, target: 'nope' } } }
    assert.throws(() => resolveMatcher(input, fakeTargets), /target "nope"/)
  })

  it('rejects a target that also repeats its name or URL', () => {
    const input = {
      devKits: { kit },
      production: { p: { ...pairing, target: 'board', name: 'Board' } },
    }
    assert.throws(() => resolveMatcher(input, fakeTargets), /repeats/)
  })

  it('rejects a pairing with an unknown kit', () => {
    const input = {
      devKits: { kit },
      production: { p: { ...pairing, target: 'board', compatible: ['nope'] } },
    }
    assert.throws(() => resolveMatcher(input, fakeTargets), /unknown kit "nope"/)
  })
})
