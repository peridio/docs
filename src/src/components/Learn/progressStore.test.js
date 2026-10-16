const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { describe, it } = require('node:test')

// progressStore.js is ESM because webpack consumes it, while `npm test` runs plain
// CommonJS. The module is import-free, so dropping the `export` keywords leaves a
// script we can evaluate and unit-test for real.
const source = fs.readFileSync(path.join(__dirname, 'progressStore.js'), 'utf8')

function load() {
  assert.doesNotMatch(
    source,
    /^\s*import\s/m,
    'the shim below only works while this module has no imports'
  )
  const stripped = source.replace(/^export /gm, '')
  return vm.runInNewContext(`${stripped};({ STORAGE_KEY, EMPTY, createProgressStore })`)
}

const { STORAGE_KEY, EMPTY, createProgressStore } = load()

// One localStorage shared by every "tab", like a real browser profile.
function memoryStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  }
}

// vm objects come from another realm, so compare them as plain JSON.
const plain = (value) => JSON.parse(JSON.stringify(value))

describe('Learn progress store', () => {
  it('keeps a change another tab saved before this tab heard about it', () => {
    const storage = memoryStorage()
    const tabA = createProgressStore(() => storage)
    const tabB = createProgressStore(() => storage)

    // Both tabs loaded the same empty snapshot.
    const stateA = tabA.read()
    const stateB = tabB.read()

    tabA.change(stateA, 'missions', 'first-ota', true)
    // Tab B hasn't handled the storage event yet, so its state is stale.
    const nextB = tabB.change(stateB, 'steps', 'first-ota/prereqs', true)

    const expected = { missions: { 'first-ota': true }, steps: { 'first-ota/prereqs': true } }
    assert.deepEqual(plain(nextB), expected)
    assert.deepEqual(plain(JSON.parse(storage.getItem(STORAGE_KEY))), expected)
  })

  it('unchecks without disturbing other entries', () => {
    const storage = memoryStorage()
    const store = createProgressStore(() => storage)
    let state = store.change(EMPTY, 'steps', 'a', true)
    state = store.change(state, 'steps', 'b', true)
    state = store.change(state, 'steps', 'a', false)
    assert.deepEqual(plain(state), { missions: {}, steps: { b: true } })
  })

  it('keeps progress in memory when storage throws', () => {
    const store = createProgressStore(() => {
      throw new Error('SecurityError')
    })
    assert.equal(store.read(), null)
    let state = store.change(EMPTY, 'missions', 'remote-app', true)
    state = store.change(state, 'steps', 'remote-app/verify', true)
    assert.deepEqual(plain(state), {
      missions: { 'remote-app': true },
      steps: { 'remote-app/verify': true },
    })
  })

  it('stops building on storage once a write fails', () => {
    // Reads work but writes don't (quota exceeded): the stored snapshot goes
    // stale, and reading it back would drop changes that only live in memory.
    const storage = memoryStorage()
    storage.setItem(STORAGE_KEY, JSON.stringify({ missions: {}, steps: { old: true } }))
    const store = createProgressStore(() => ({
      getItem: storage.getItem,
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    }))
    let state = store.change(store.read(), 'steps', 'first', true)
    state = store.change(state, 'steps', 'second', true)
    assert.deepEqual(plain(state), {
      missions: {},
      steps: { old: true, first: true, second: true },
    })
  })

  it('treats a missing or partial snapshot as empty', () => {
    const storage = memoryStorage()
    const store = createProgressStore(() => storage)
    assert.deepEqual(plain(store.read()), plain(EMPTY))
    storage.setItem(STORAGE_KEY, JSON.stringify({ missions: { x: true } }))
    assert.deepEqual(plain(store.read()), { missions: { x: true }, steps: {} })
  })
})
