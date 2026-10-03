// Per-machine security capabilities, the single source for the board matrix on
// the Security features page and for every hardware page's "Security features"
// table. CommonJS so `node --test` can load it as well as webpack.
//
// A profile is one matrix row: the machines that share a declaration. Each
// capability carries a `status` from STATUSES. `summary` is the matrix cell
// text and is required when the bare status label would say too little
// (`n/a`, `staged`); `detail` is the hardware-page cell.

const data = require('./security-capabilities.json')

const STATUSES = ['yes', 'no', 'not-declared', 'staged', 'n/a']
const NEEDS_SUMMARY = ['staged', 'n/a']

// Order is the column order of the matrix and the row order of a page table.
const CAPABILITIES = [
  { key: 'encryptedVar', label: 'Encrypted `/var`', matrixLabel: 'Encrypted `/var`' },
  { key: 'signedBootFit', label: 'Signed boot FIT', matrixLabel: 'Signed boot FIT' },
  { key: 'rootfsVerity', label: 'Rootfs dm-verity', matrixLabel: 'Rootfs verity' },
  { key: 'extensionVerity', label: 'Extension dm-verity', matrixLabel: null },
]

// A capability the machine conf states by a token in AVOCADO_SECURITY_CAPABILITIES
// is `yes` exactly when the token is there; tying the two together is what makes
// `declared` catch a status that drifted from the conf.
const DECLARED_TOKENS = { encryptedVar: 'encrypted-var', signedBootFit: 'verified-boot' }

const STATUS_LABELS = { 'not-declared': 'not yet declared' }

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const isText = (v) => typeof v === 'string' && v.trim() !== ''

function validateCapability(id, key, c, errors) {
  if (!c) {
    errors.push(`${id}.${key} is missing`)
    return
  }
  if (!STATUSES.includes(c.status)) {
    errors.push(`${id}.${key} has status "${c.status}", expected one of ${STATUSES.join(', ')}`)
  } else if (NEEDS_SUMMARY.includes(c.status) && !isText(c.summary)) {
    errors.push(`${id}.${key} is ${c.status} and needs a summary for the matrix cell`)
  }
}

function validate(d) {
  const errors = []
  if (!d.asOf) {
    errors.push('missing asOf: the table must say when it was checked')
  } else if (!ISO_DATE.test(d.asOf)) {
    errors.push(`asOf "${d.asOf}" is not a YYYY-MM-DD date`)
  }
  if (!d.feed) errors.push('missing feed: the table must say which feed it describes')

  const owner = new Map()
  for (const [id, profile] of Object.entries(d.profiles || {})) {
    if (!Array.isArray(profile.machines) || profile.machines.length === 0) {
      errors.push(`profile ${id} lists no machines`)
    }
    for (const machine of profile.machines || []) {
      if (owner.has(machine)) {
        errors.push(`machine ${machine} is in both ${owner.get(machine)} and ${id}`)
      }
      owner.set(machine, id)
    }

    const declaredOk = profile.declared === null || typeof profile.declared === 'string'
    if (!declaredOk) {
      errors.push(
        `${id}.declared must be a string or null, got ${JSON.stringify(profile.declared)}`
      )
    }

    for (const { key } of CAPABILITIES) {
      validateCapability(id, key, profile[key], errors)
    }

    if (declaredOk) {
      const tokens = (profile.declared || '').split(/\s+/)
      for (const [key, token] of Object.entries(DECLARED_TOKENS)) {
        const c = profile[key]
        if (!c || !STATUSES.includes(c.status)) continue
        const declares = tokens.includes(token)
        if (declares !== (c.status === 'yes')) {
          errors.push(
            `${id}.${key} is ${c.status} but declared "${profile.declared || ''}" ${
              declares ? 'includes' : 'lacks'
            } ${token}`
          )
        }
      }
    }

    ;(profile.other || []).forEach((row, i) => {
      if (!isText(row.label)) errors.push(`${id}.other[${i}] needs a label`)
      if (!isText(row.detail)) errors.push(`${id}.other[${i}] needs a detail`)
    })
  }
  return errors
}

function profileById(id, d = data) {
  const profile = d.profiles[id]
  if (!profile) throw new Error(`security-capabilities: no profile "${id}"`)
  return profile
}

function profileIdForMachine(machine) {
  for (const [id, profile] of Object.entries(data.profiles)) {
    if (profile.machines.includes(machine)) return id
  }
  throw new Error(`security-capabilities: no profile lists machine "${machine}"`)
}

function profileForMachine(machine) {
  return profileById(profileIdForMachine(machine))
}

// The rows of a hardware page's table. Refuses a profile with no detail, or
// with detail on only some capabilities, because the page would otherwise
// render an empty or short table and the build would still pass.
function rowsFor(profileId, d = data) {
  const profile = profileById(profileId, d)
  const rows = [
    ...CAPABILITIES.map(({ key, label }) => ({ label, detail: profile[key].detail })),
    ...(profile.other || []).map(({ label, detail }) => ({ label, detail })),
  ]
  const missing = CAPABILITIES.filter(({ key }) => !profile[key].detail).map(
    ({ key }) => `${profileId}.${key}`
  )
  if (missing.length === CAPABILITIES.length) {
    throw new Error(
      `security-capabilities: profile ${profileId} has no detail text, so a hardware page cannot render it`
    )
  }
  if (missing.length > 0) {
    throw new Error(`security-capabilities: ${missing.join(', ')} have no detail`)
  }
  return rows
}

// Fail the build, not the reader, when the data is malformed.
const problems = validate(data)
if (problems.length > 0) {
  throw new Error(`security-capabilities.json is invalid:\n- ${problems.join('\n- ')}`)
}

module.exports = {
  data,
  validate,
  profileById,
  profileIdForMachine,
  profileForMachine,
  rowsFor,
  CAPABILITIES,
  STATUS_LABELS,
}
