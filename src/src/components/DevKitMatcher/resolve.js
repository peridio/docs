// Joins dev-kit-matcher.json with targets.json. The matcher file holds only
// the pairing data (SoC, recommended and compatible kits, the reason); the
// label and page URLs come from targets.json so a page move or rename is made
// in one place. Kept import-free so `npm test` can load it as a plain script
// (see resolve.test.js).

// The any-target guide renders every target through TargetSelector, which
// registers one anchor per targets.json key, so link straight to the kit.
const ANY_TARGET_URL = '/learn/get-started/any-target'

function getStartedUrl(id, target) {
  const url = target.gettingStartedUrl
  return url === ANY_TARGET_URL ? `${url}#${id}` : url
}

// Dev kits are keyed by their targets.json key. A production device either
// names its targets.json key in `target`, or (for boards without a
// targets.json entry, such as under-evaluation ones) carries its own `name`
// and `hardwareUrl`. Never both, so nothing is duplicated.
export function resolveMatcher(data, targets) {
  const devKits = {}
  for (const [id, kit] of Object.entries(data.devKits)) {
    const target = targets[id]
    if (!target) throw new Error(`dev kit "${id}" is not a targets.json key`)
    devKits[id] = {
      ...kit,
      name: target.name,
      hardwareUrl: target.hardwareUrl,
      getStartedUrl: getStartedUrl(id, target),
    }
  }

  const production = {}
  for (const [id, device] of Object.entries(data.production)) {
    const ownFields = 'name' in device || 'hardwareUrl' in device
    if (device.target && ownFields) {
      throw new Error(`production "${id}" sets target and also repeats name/hardwareUrl`)
    }
    let resolved
    if (device.target) {
      const target = targets[device.target]
      if (!target) {
        throw new Error(`production "${id}" target "${device.target}" is not a targets.json key`)
      }
      resolved = { ...device, name: target.name, hardwareUrl: target.hardwareUrl }
    } else {
      if (!device.name || !device.hardwareUrl) {
        throw new Error(`production "${id}" needs a target, or a name and hardwareUrl`)
      }
      resolved = { ...device }
    }
    for (const kitId of [device.recommended, ...device.compatible]) {
      if (!devKits[kitId]) throw new Error(`production "${id}" pairs with unknown kit "${kitId}"`)
    }
    production[id] = resolved
  }

  return { devKits, production }
}

// Every internal URL the matcher can render once a selection is made.
export function matcherLinks({ devKits, production }) {
  const links = new Set(['/hardware/support-matrix'])
  for (const kit of Object.values(devKits)) {
    links.add(kit.hardwareUrl)
    links.add(kit.getStartedUrl)
  }
  for (const device of Object.values(production)) links.add(device.hardwareUrl)
  return [...links]
}
