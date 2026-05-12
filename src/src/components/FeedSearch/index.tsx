import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import targetsData from '../../data/hardware/targets.json'
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
const COPY_FLASH_MS = 1800

type CopyStatus = 'idle' | 'copied' | 'error'

function useCopy(flashMs: number = COPY_FLASH_MS) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const flash = useCallback(
    (next: CopyStatus) => {
      setStatus(next)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setStatus('idle'), flashMs)
    },
    [flashMs]
  )

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
          flash('copied')
          return true
        }
        throw new Error('clipboard API unavailable')
      } catch {
        try {
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.opacity = '0'
          document.body.appendChild(textarea)
          textarea.select()
          const ok = document.execCommand('copy')
          document.body.removeChild(textarea)
          flash(ok ? 'copied' : 'error')
          return ok
        } catch {
          flash('error')
          return false
        }
      }
    },
    [flash]
  )

  return { status, copy }
}

function SuggestionIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="7" cy="7" r="4.5" />
      <line x1="10.5" y1="10.5" x2="14" y2="14" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  )
}

function CopyIcon({ status, variant }: { status: CopyStatus; variant: 'name' | 'yaml' }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  if (status === 'copied') {
    return (
      <svg {...common}>
        <path d="M5 12.5 L10 17.5 L19 7" />
      </svg>
    )
  }
  if (status === 'error') {
    return (
      <svg {...common}>
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="8" y="3" width="8" height="4" rx="1" />
      <path d="M15 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
      {variant === 'yaml' && (
        <>
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="13" y2="16" />
        </>
      )}
    </svg>
  )
}

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
  // Lagged copy of `state` used to render the body. Loading transitions
  // are deferred so brief/cached fetches don't flash the loader.
  const [displayState, setDisplayState] = useState<LoadState>({ kind: 'idle' })
  const cache = useRef<Map<string, FeedPackage[]>>(new Map())
  const requestIdRef = useRef(0)
  const stickyHeaderRef = useRef<HTMLDivElement>(null)

  // Pin the sticky header just below the Docusaurus navbar.
  // The navbar has `height: auto` (two-row layout) so its rendered height
  // doesn't match `--ifm-navbar-height`. Measure it on mount + on resize.
  // Sticky behavior only applies at >= 997px to match the layout breakpoint.
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>('nav.navbar')
    if (!navbar) return

    const mql = window.matchMedia('(min-width: 997px)')

    const update = () => {
      const el = stickyHeaderRef.current
      if (!el) return
      if (mql.matches) {
        el.style.top = `${navbar.offsetHeight}px`
      } else {
        el.style.top = ''
      }
    }
    update()

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update)
      ro.observe(navbar)
    }
    window.addEventListener('resize', update)
    mql.addEventListener('change', update)

    return () => {
      window.removeEventListener('resize', update)
      mql.removeEventListener('change', update)
      ro?.disconnect()
    }
  }, [])

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

  // Defer committing a "loading" state to the rendered UI. If the fetch
  // finishes within the grace period (cached / fast network), we never
  // show the loader at all and the previous ready view stays put.
  useEffect(() => {
    if (state.kind === 'loading') {
      const t = window.setTimeout(() => setDisplayState(state), 220)
      return () => window.clearTimeout(t)
    }
    setDisplayState(state)
  }, [state])

  const results: SearchResult[] = useMemo(() => {
    if (displayState.kind !== 'ready' || !query.trim()) return []
    return searchPackages(displayState.packages, query).slice(0, MAX_RESULTS)
  }, [displayState, query])

  const totalHitsCount = useMemo(() => {
    if (displayState.kind !== 'ready' || !query.trim()) return 0
    return searchPackages(displayState.packages, query).length
  }, [displayState, query])

  const canReset = query !== ''
  const handleReset = useCallback(() => {
    setQuery('')
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [])

  const trimmedQuery = query.trim()
  const showResultsHeader =
    displayState.kind === 'ready' && trimmedQuery.length > 0 && results.length > 0
  // True while a fetch is in flight but we're still showing the previous
  // ready view. Used to softly dim the stale content.
  const isPending = state.kind === 'loading' && displayState.kind !== 'loading'

  return (
    <div className={styles.wrapper}>
      <div
        ref={stickyHeaderRef}
        className={`${styles.stickyHeader} ${
          showResultsHeader ? styles.stickyHeaderWithBorder : ''
        }`.trim()}
      >
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
            <label className={styles.label} htmlFor="feed-search-query">
              Search packages
            </label>
            <div className={styles.inputWrap}>
              <input
                id="feed-search-query"
                type="text"
                className={`${styles.input} ${styles.inputWithReset}`}
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
              {canReset && (
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={handleReset}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <ResetIcon />
                </button>
              )}
            </div>
          </div>
        </div>

        <StatusBar state={state} />

        <div
          className={`${styles.resultsHeaderCollapse} ${
            showResultsHeader ? styles.resultsHeaderCollapseOpen : ''
          }`.trim()}
          aria-hidden={!showResultsHeader}
        >
          <div className={styles.resultsHeaderInner}>
            <div className={styles.resultsHeader}>
              {state.kind === 'ready' && trimmedQuery.length > 0 && results.length > 0 && (
                <>
                  <span>
                    <span className={styles.resultsCount}>{results.length}</span>
                    {totalHitsCount > results.length && ` of ${totalHitsCount}`} matches for &quot;
                    {trimmedQuery}&quot;
                  </span>
                  <span>{state.packages.length.toLocaleString()} packages indexed</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.body} ${isPending ? styles.bodyPending : ''}`.trim()}>
        {displayState.kind === 'idle' && (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Pick a target to start searching</div>
            <p>
              Live results from <code>repo.avocadolinux.org</code>
              <br />
              the same packages <code>avocado sdk dnf search</code> sees on your machine.
            </p>
            <button
              type="button"
              className={styles.emptyButton}
              onClick={() => {
                const el = document.getElementById('feed-search-target') as HTMLSelectElement | null
                if (!el) return
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                el.focus()
                try {
                  ;(el as HTMLSelectElement & { showPicker?: () => void }).showPicker?.()
                } catch {
                  // showPicker can throw if not user-activated; focus is the fallback
                }
              }}
            >
              Pick a target
            </button>
          </div>
        )}

        {displayState.kind === 'loading' && (
          <div className={styles.loaderOverlay}>
            <div className={styles.spinner} />
            <div>Loading packages for {displayState.target}…</div>
          </div>
        )}

        {displayState.kind === 'error' && (
          <div className={styles.error}>
            Failed to load packages for <strong>{displayState.target}</strong>:{' '}
            {displayState.message}
          </div>
        )}

        {displayState.kind === 'ready' && (
          <ReadyView
            target={displayState.target}
            query={query}
            results={results}
            totalHits={totalHitsCount}
            packages={displayState.packages}
            errors={displayState.errors}
            onSuggest={setQuery}
          />
        )}
      </div>
    </div>
  )
}

function StatusBar({ state }: { state: LoadState }) {
  if (state.kind === 'idle') {
    return <div className={styles.statusBar} aria-hidden="true" />
  }

  if (state.kind === 'loading') {
    return (
      <div className={`${styles.statusBar} ${styles.statusBarLoading}`} role="status">
        <span className={styles.statusPrimary}>
          <span className={`${styles.statusDot} ${styles.statusDotLoading}`} />
          <span className={styles.statusKey}>Loading…</span>
        </span>
        <span className={styles.statusMeta}>
          <span className={styles.statusTarget}>{state.target}</span>
        </span>
      </div>
    )
  }

  if (state.kind === 'error') {
    return (
      <div className={`${styles.statusBar} ${styles.statusBarError}`} role="status">
        <span className={styles.statusPrimary}>
          <span className={`${styles.statusDot} ${styles.statusDotError}`} />
          <span className={styles.statusKey}>Failed to load</span>
        </span>
        <span className={styles.statusMeta}>
          <span className={styles.statusTarget}>{state.target}</span>
        </span>
      </div>
    )
  }

  const arch = archForTarget(state.target)
  return (
    <div className={`${styles.statusBar} ${styles.statusBarReady}`} role="status">
      <span className={styles.statusPrimary}>
        <span className={`${styles.statusDot} ${styles.statusDotReady}`} />
        <span className={styles.statusCount}>{state.packages.length.toLocaleString()}</span>
        <span className={styles.statusKey}>packages</span>
      </span>
      <span className={styles.statusMeta}>
        <span className={styles.statusTarget}>{state.target}</span>
        {arch && <span className={styles.statusArch}>{arch}</span>}
        <span className={styles.statusChannel} title="Release line and stability channel">
          {`${RELEASE}/${CHANNEL}`}
        </span>
      </span>
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
          {packages.length.toLocaleString()} packages indexed.{' '}
          <span className={styles.emptyTitleSoft}>Type to search.</span>
        </div>
        <div className={styles.suggestions}>
          <span className={styles.suggestionsLabel}>Try</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className={styles.suggestion}
              onClick={() => onSuggest(s)}
              type="button"
              aria-label={`Search for ${s}`}
            >
              <SuggestionIcon />
              <span className={styles.suggestionTerm}>{s}</span>
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
        <div className={styles.emptyTitle}>No packages match &quot;{trimmed}&quot;</div>
        <p>
          Searched {packages.length.toLocaleString()} entries from {target}
          {archForTarget(target) ? ` and ${archForTarget(target)}` : ''}.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.results}>
      {results.map((r) => (
        <PackageCard key={`${r.repo}/${r.name}-${r.version}-${r.release}`} pkg={r} />
      ))}
      {totalHits > results.length && (
        <div className={styles.resultsFooter}>
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
  const { status, copy } = useCopy()
  const [settled, setSettled] = useState(false)
  const prevStatusRef = useRef<CopyStatus>('idle')
  const yamlPayload = `${pkg.name}: "*"`

  useEffect(() => {
    const prev = prevStatusRef.current
    prevStatusRef.current = status
    if (status === 'copied' || status === 'error') {
      setSettled(false)
    } else if (status === 'idle' && prev !== 'idle') {
      setSettled(true)
    }
  }, [status])

  const handleMouseLeave = useCallback(() => setSettled(false), [])

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

  const versionLabel = `v${pkg.version}${pkg.release ? `-${pkg.release}` : ''}`
  const showArch = pkg.arch && pkg.arch !== 'noarch'

  const trimmedSummary = pkg.summary?.trim() ?? ''
  const summaryIsRedundant =
    !trimmedSummary ||
    trimmedSummary.toLowerCase() === pkg.name.toLowerCase() ||
    new RegExp(`^${pkg.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+version\\b`, 'i').test(
      trimmedSummary
    )

  return (
    <div
      className={`${styles.card} ${settled ? styles.cardSettled : ''}`.trim()}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardRow}>
        <div className={styles.nameWrap}>
          <span className={styles.name} title={pkg.name}>
            {renderName()}
          </span>
          <span className={styles.version} title={versionLabel}>
            {versionLabel}
          </span>
          {showArch && <span className={`${styles.chip} ${styles['chip--arch']}`}>{pkg.arch}</span>}
        </div>
      </div>
      {!summaryIsRedundant && <div className={styles.summary}>{trimmedSummary}</div>}
      {status !== 'idle' && (
        <div
          className={`${styles.copyToast} ${status === 'error' ? styles.copyToastError : ''}`}
          role="status"
          aria-live="polite"
        >
          {status === 'copied' ? (
            <>
              <span className={styles.copyToastLabel}>Copied</span>
              <code className={styles.copyToastCode}>{yamlPayload}</code>
            </>
          ) : (
            <span className={styles.copyToastLabel}>Copy failed</span>
          )}
        </div>
      )}
      <CopyButton
        status={status}
        onCopy={() => void copy(yamlPayload)}
        pkg={pkg}
        payload={yamlPayload}
      />
    </div>
  )
}

function CopyButton({
  pkg,
  payload,
  status,
  onCopy,
}: {
  pkg: SearchResult
  payload: string
  status: CopyStatus
  onCopy: () => void
}) {
  const flashClass =
    status === 'copied' ? styles.copiedFlash : status === 'error' ? styles.copyFailFlash : ''

  const label = status === 'copied' ? 'Copied' : status === 'error' ? 'Failed' : 'Copy'

  return (
    <button
      type="button"
      className={`${styles.copyButton} ${flashClass}`.trim()}
      onClick={onCopy}
      aria-label={`Copy YAML line for ${pkg.name}`}
      title={`Copy ${payload}`}
    >
      <CopyIcon status={status} variant="yaml" />
      <span className={styles.copyLabel}>{label}</span>
    </button>
  )
}

export default function FeedSearch() {
  return (
    <BrowserOnly fallback={<div className={styles.empty}>Loading search…</div>}>
      {() => <FeedSearchInner />}
    </BrowserOnly>
  )
}
