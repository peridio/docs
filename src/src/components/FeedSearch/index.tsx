import React, { useEffect, useMemo, useRef, useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import targetsData from '@site/src/data/hardware/targets.json'
import { archForTarget } from './targetArchMap'
import {
  fetchTargetPackages,
  searchPackages,
  type FeedPackage,
  type SearchResult,
} from './feedClient'
import styles from './styles.module.css'

const RELEASE = '2024'
const CHANNEL = 'edge'
const MAX_RESULTS = 100
const SUGGESTIONS = ['openssh', 'curl', 'python3', 'gstreamer', 'nginx', 'sqlite']

type LoadState =
  | { kind: 'idle' }
  | { kind: 'loading'; target: string }
  | { kind: 'ready'; target: string; packages: FeedPackage[]; errors: string[] }
  | { kind: 'error'; target: string; message: string }

interface TargetEntry {
  target: string
  name: string
}

function targetList(): TargetEntry[] {
  const entries = Object.values(targetsData as Record<string, { name: string; target: string }>)
  return entries
    .filter((t) => t && t.target)
    .map((t) => ({ target: t.target, name: t.name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function FeedSearchInner() {
  const targets = useMemo(targetList, [])
  const [target, setTarget] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [state, setState] = useState<LoadState>({ kind: 'idle' })
  const cache = useRef<Map<string, FeedPackage[]>>(new Map())
  const requestIdRef = useRef(0)

  // Fetch packages whenever target changes (cached after first load)
  useEffect(() => {
    if (!target) {
      setState({ kind: 'idle' })
      return
    }
    const cached = cache.current.get(target)
    if (cached) {
      setState({ kind: 'ready', target, packages: cached, errors: [] })
      return
    }
    const id = ++requestIdRef.current
    setState({ kind: 'loading', target })
    fetchTargetPackages(RELEASE, CHANNEL, target, archForTarget(target))
      .then(({ packages, errors }) => {
        if (id !== requestIdRef.current) return
        cache.current.set(target, packages)
        setState({ kind: 'ready', target, packages, errors })
      })
      .catch((err) => {
        if (id !== requestIdRef.current) return
        setState({ kind: 'error', target, message: err?.message ?? 'Failed to load feed' })
      })
  }, [target])

  const results: SearchResult[] = useMemo(() => {
    if (state.kind !== 'ready' || !query.trim()) return []
    return searchPackages(state.packages, query).slice(0, MAX_RESULTS)
  }, [state, query])

  const totalHitsCount = useMemo(() => {
    if (state.kind !== 'ready' || !query.trim()) return 0
    return searchPackages(state.packages, query).length
  }, [state, query])

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="feed-search-target">
            Target
          </label>
          <select
            id="feed-search-target"
            className={styles.select}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="">Select a target…</option>
            {targets.map((t) => (
              <option key={t.target} value={t.target}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Channel</label>
          <select className={styles.select} value={CHANNEL} disabled>
            <option value={CHANNEL}>{`${RELEASE} / ${CHANNEL}`}</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="feed-search-query">
            Search packages
          </label>
          <input
            id="feed-search-query"
            type="text"
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              state.kind === 'ready'
                ? `Search ${state.packages.length.toLocaleString()} packages…`
                : 'Select a target first…'
            }
            disabled={state.kind !== 'ready'}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      <StatusBar state={state} />

      {state.kind === 'idle' && (
        <div className={styles.empty}>
          <div className={styles.emptyTitle}>Pick a target to start searching</div>
          <p>
            Live results from <code>repo.avocadolinux.org</code>. The same packages{' '}
            <code>avocado sdk dnf search</code> sees on your machine.
          </p>
        </div>
      )}

      {state.kind === 'loading' && (
        <div className={styles.loaderOverlay}>
          <div className={styles.spinner} />
          <div>Loading packages for {state.target}…</div>
        </div>
      )}

      {state.kind === 'error' && (
        <div className={styles.error}>
          Failed to load packages for <strong>{state.target}</strong>: {state.message}
        </div>
      )}

      {state.kind === 'ready' && (
        <ReadyView
          target={state.target}
          query={query}
          results={results}
          totalHits={totalHitsCount}
          packages={state.packages}
          errors={state.errors}
          onSuggest={setQuery}
        />
      )}
    </div>
  )
}

function StatusBar({ state }: { state: LoadState }) {
  let dotClass = styles.statusDot
  let label = ''
  switch (state.kind) {
    case 'idle':
      label = 'Idle'
      break
    case 'loading':
      dotClass = `${styles.statusDot} ${styles.statusDotLoading}`
      label = `Fetching repodata for ${state.target}…`
      break
    case 'ready':
      dotClass = `${styles.statusDot} ${styles.statusDotReady}`
      label = `${state.packages.length.toLocaleString()} packages loaded for ${state.target}${
        archForTarget(state.target) ? ` (+${archForTarget(state.target)})` : ''
      }`
      break
    case 'error':
      dotClass = `${styles.statusDot} ${styles.statusDotError}`
      label = `Error loading ${state.target}`
      break
  }
  return (
    <div className={styles.statusBar}>
      <span className={dotClass} />
      <span>{label}</span>
    </div>
  )
}

function ReadyView({
  target,
  query,
  results,
  totalHits,
  packages,
  errors,
  onSuggest,
}: {
  target: string
  query: string
  results: SearchResult[]
  totalHits: number
  packages: FeedPackage[]
  errors: string[]
  onSuggest: (q: string) => void
}) {
  const trimmed = query.trim()

  if (!trimmed) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyTitle}>
          {packages.length.toLocaleString()} packages indexed. Type to search.
        </div>
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className={styles.suggestion}
              onClick={() => onSuggest(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
        {!archForTarget(target) && (
          <div className={styles.unmappedNote}>
            Note: this target has no CPU-arch mapping yet, so only target-specific avocado packages
            are searchable. General Linux packages live in the CPU-arch repo.
          </div>
        )}
        {errors.length > 0 && (
          <div className={styles.unmappedNote}>Some repos failed to load: {errors.join(', ')}</div>
        )}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyTitle}>No packages match "{trimmed}"</div>
        <p>
          Searched {packages.length.toLocaleString()} entries from {target}
          {archForTarget(target) ? ` and ${archForTarget(target)}` : ''}.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.results}>
      <div className={styles.resultsHeader}>
        <span>
          <span className={styles.resultsCount}>{results.length}</span>
          {totalHits > results.length && ` of ${totalHits}`} matches for "{trimmed}"
        </span>
        <span>{packages.length.toLocaleString()} packages indexed</span>
      </div>
      {results.map((r) => (
        <PackageCard key={`${r.repo}/${r.name}-${r.version}-${r.release}`} pkg={r} />
      ))}
      {totalHits > results.length && (
        <div className={styles.resultsHeader}>
          <span>
            Showing first {results.length} of {totalHits} matches — refine your query for fewer
            results.
          </span>
        </div>
      )}
    </div>
  )
}

function PackageCard({ pkg }: { pkg: SearchResult }) {
  const renderName = () => {
    if (!pkg.nameMatch) return pkg.name
    const [a, b] = pkg.nameMatch
    return (
      <>
        {pkg.name.slice(0, a)}
        <span className={styles.highlight}>{pkg.name.slice(a, b)}</span>
        {pkg.name.slice(b)}
      </>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.name}>{renderName()}</span>
        <span className={styles.version}>
          {pkg.version}
          {pkg.release ? `-${pkg.release}` : ''}
        </span>
      </div>
      {pkg.summary && <div className={styles.summary}>{pkg.summary}</div>}
    </div>
  )
}

export default function FeedSearch() {
  return (
    <BrowserOnly fallback={<div className={styles.empty}>Loading search…</div>}>
      {() => <FeedSearchInner />}
    </BrowserOnly>
  )
}
