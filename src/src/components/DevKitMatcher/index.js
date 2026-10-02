import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link'
import useBrokenLinks from '@docusaurus/useBrokenLinks'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import data from '@site/src/data/hardware/dev-kit-matcher.json'
import styles from './styles.module.css'

// Ported from Avocado Connect's LaunchPad hardware picker. Pairings are by SoC
// family: each production device lists the dev kit that runs the same (or the
// closest supported) silicon, plus any kits that also work for early work.
const { devKits, production } = data

const PRODUCTION_PREFIX = 'production-'
const DEV_KIT_PREFIX = 'dev-kit-'

function parseHash(hash) {
  if (hash.startsWith(PRODUCTION_PREFIX)) {
    const id = hash.slice(PRODUCTION_PREFIX.length)
    if (production[id]) return { kind: 'production', id }
  }
  if (hash.startsWith(DEV_KIT_PREFIX)) {
    const id = hash.slice(DEV_KIT_PREFIX.length)
    if (devKits[id]) return { kind: 'devKit', id }
  }
  return null
}

function relation(productionId, devKitId) {
  const device = production[productionId]
  if (device.recommended === devKitId) return 'recommended'
  if (device.compatible.includes(devKitId)) return 'compatible'
  return null
}

const RELATION_LABELS = { recommended: 'Recommended', compatible: 'Also works' }

function DevKitLinks({ kit }) {
  return (
    <span className={styles.links}>
      <Link to={kit.getStartedUrl}>Get started</Link>
      <Link to={kit.hardwareUrl}>Hardware page</Link>
    </span>
  )
}

function ProductionResult({ id }) {
  const device = production[id]
  const recommended = devKits[device.recommended]
  return (
    <div className={styles.result} aria-live="polite">
      <p className={styles.resultEyebrow}>
        {device.name} · {device.soc}
        {device.underEvaluation && <span className={styles.evaluation}>Under evaluation</span>}
      </p>
      <Heading as="h3" className={styles.resultTitle}>
        Develop on the {recommended.name}
      </Heading>
      <p className={styles.resultText}>{device.why}</p>
      <DevKitLinks kit={recommended} />
      {device.compatible.length > 0 && (
        <ul className={styles.alternatives}>
          {device.compatible.map((kitId) => (
            <li key={kitId}>
              <strong>Also works:</strong> {devKits[kitId].name}{' '}
              <DevKitLinks kit={devKits[kitId]} />
            </li>
          ))}
        </ul>
      )}
      <p className={styles.resultText}>
        When you are ready, see the <Link to={device.hardwareUrl}>{device.name}</Link> page for
        production provisioning.
      </p>
    </div>
  )
}

function DevKitResult({ id }) {
  const kit = devKits[id]
  const matches = Object.entries(production)
    .map(([productionId, device]) => ({ productionId, device, rel: relation(productionId, id) }))
    .filter((m) => m.rel)
  return (
    <div className={styles.result} aria-live="polite">
      <p className={styles.resultEyebrow}>
        {kit.name} · {kit.soc}
      </p>
      <Heading as="h3" className={styles.resultTitle}>
        {matches.length > 0
          ? 'Production hardware it prepares you for'
          : 'No production pairing yet'}
      </Heading>
      {matches.length > 0 ? (
        <ul className={styles.alternatives}>
          {matches.map(({ productionId, device, rel }) => (
            <li key={productionId}>
              <Link to={device.hardwareUrl}>{device.name}</Link> ({device.soc}) ·{' '}
              {RELATION_LABELS[rel]}
              {device.underEvaluation && ' · under evaluation'}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.resultText}>
          See the <Link to="/hardware/support-matrix">support matrix</Link> for every supported
          board.
        </p>
      )}
      <DevKitLinks kit={kit} />
    </div>
  )
}

/**
 * Dev kit ↔ production hardware matcher. Pick either side to see the other.
 * The selection lives in the URL hash (#production-<id> / #dev-kit-<id>) so
 * a match can be shared as a link, the same pattern as TargetSelector.
 */
export default function DevKitMatcher() {
  const [selected, setSelected] = useState(null)

  // Register every selection anchor so deep links validate at build time.
  const brokenLinks = useBrokenLinks()
  Object.keys(production).forEach((id) => brokenLinks.collectAnchor(PRODUCTION_PREFIX + id))
  Object.keys(devKits).forEach((id) => brokenLinks.collectAnchor(DEV_KIT_PREFIX + id))

  useEffect(() => {
    setSelected(parseHash(window.location.hash.slice(1)))
  }, [])

  function select(kind, id) {
    const prefix = kind === 'production' ? PRODUCTION_PREFIX : DEV_KIT_PREFIX
    setSelected({ kind, id })
    window.history.replaceState(null, '', `#${prefix}${id}`)
  }

  function optionState(kind, id) {
    if (!selected) return null
    if (selected.kind === kind) return selected.id === id ? 'selected' : null
    return kind === 'devKit' ? relation(selected.id, id) : relation(id, selected.id)
  }

  const renderOption = (kind, id, item) => {
    const state = optionState(kind, id)
    return (
      <button
        key={id}
        type="button"
        className={clsx(styles.option, state && styles[`option_${state}`])}
        aria-pressed={state === 'selected'}
        onClick={() => select(kind, id)}
      >
        <span className={styles.optionName}>{item.name}</span>
        <span className={styles.optionSoc}>{item.soc}</span>
        {state && state !== 'selected' && (
          <span className={styles.optionBadge}>{RELATION_LABELS[state]}</span>
        )}
      </button>
    )
  }

  return (
    <div className={styles.matcher}>
      <div className={styles.columns}>
        <div>
          <Heading as="h3" className={styles.columnTitle}>
            Production hardware
          </Heading>
          <div className={styles.options}>
            {Object.entries(production).map(([id, item]) => renderOption('production', id, item))}
          </div>
        </div>
        <div>
          <Heading as="h3" className={styles.columnTitle}>
            Development kits
          </Heading>
          <div className={styles.options}>
            {Object.entries(devKits).map(([id, item]) => renderOption('devKit', id, item))}
          </div>
        </div>
      </div>
      {selected ? (
        selected.kind === 'production' ? (
          <ProductionResult id={selected.id} />
        ) : (
          <DevKitResult id={selected.id} />
        )
      ) : (
        <p className={styles.hint}>Pick the hardware you ship on, or the kit you have.</p>
      )}
    </div>
  )
}
