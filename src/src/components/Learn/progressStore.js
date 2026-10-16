// Learn progress storage, kept free of imports so `npm test` can load it in a
// vm sandbox (see progressStore.test.js). Every storage access is wrapped:
// localStorage throws in some private modes and when site data is blocked, and
// the pages must still render then.
export const STORAGE_KEY = 'avocado-learn-progress'
export const EMPTY = { missions: {}, steps: {} }

// `getStorage` is called on every access rather than once, so a storage that
// throws on access (not just on use) is caught too, and nothing touches
// `window` during the server render.
export function createProgressStore(getStorage) {
  // Once a write fails, what's stored is older than what's in memory, so stop
  // building on it until a write goes through again.
  let storedIsCurrent = true

  // Returns null when storage can't be read, so callers keep what they have.
  function read() {
    try {
      const raw = getStorage().getItem(STORAGE_KEY)
      if (!raw) return EMPTY
      const parsed = JSON.parse(raw)
      return { missions: parsed.missions ?? {}, steps: parsed.steps ?? {} }
    } catch {
      return null
    }
  }

  function write(progress) {
    try {
      getStorage().setItem(STORAGE_KEY, JSON.stringify(progress))
      storedIsCurrent = true
    } catch {
      // Storage unavailable: progress lasts until the page is closed.
      storedIsCurrent = false
    }
  }

  // Applies one change on top of the latest stored snapshot, not this tab's
  // copy, so a change another tab saved before our `storage` event arrived
  // isn't overwritten. Falls back to `current` when storage can't be used.
  function change(current, kind, id, value) {
    const base = (storedIsCurrent && read()) || current
    const nextKind = { ...base[kind] }
    if (value) nextKind[id] = true
    else delete nextKind[id]
    const next = { ...base, [kind]: nextKind }
    write(next)
    return next
  }

  return { read, write, change }
}
