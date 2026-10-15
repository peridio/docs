// Pure helpers for picking PCB background patterns. Deterministic on purpose:
// Math.random() here produced a different answer on the server and the client,
// and React 19 logs a hydration mismatch for every tile.
const PATTERN_COUNT = 10

// djb2
function hashString(str) {
  let h = 5381
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0
  return h
}

// `seed` is any string that differs between grids (we use the joined tile
// titles) so two grids on the site don't start on the same pattern. Within a
// grid, consecutive tiles walk the pattern list so ten tiles get ten patterns.
function patternIndices(count, seed = '') {
  const start = hashString(String(seed)) % PATTERN_COUNT
  const out = []
  for (let i = 0; i < count; i++) out.push(((start + i) % PATTERN_COUNT) + 1)
  return out
}

module.exports = { PATTERN_COUNT, hashString, patternIndices }
