import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Learn progress lives in this browser only. Docs has no login and no org, so
// this is a convenience for the reader, never a record anything depends on.
// Every storage access is wrapped: localStorage throws in some private modes
// and when site data is blocked, and the pages must still render then.
const STORAGE_KEY = 'avocado-learn-progress'
const EMPTY = { missions: {}, steps: {} }

// Returns null when storage can't be read, so callers keep what they have.
function readProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw)
    return { missions: parsed.missions ?? {}, steps: parsed.steps ?? {} }
  } catch {
    return null
  }
}

function writeProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Storage unavailable: progress lasts until the page is closed.
  }
}

const noop = () => {}
const LearnProgressContext = createContext({
  ready: false,
  progress: EMPTY,
  setMissionComplete: noop,
  setStepChecked: noop,
  reset: noop,
})

export function LearnProgressProvider({ children }) {
  // Start empty on both the server and the first client render so hydration
  // matches, then load the stored progress once mounted.
  const [progress, setProgress] = useState(EMPTY)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setProgress(readProgress() ?? EMPTY)
    setReady(true)
    // Keep other open tabs in step when one of them changes progress.
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY) return
      const stored = readProgress()
      if (stored) setProgress(stored)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const update = useCallback((kind, id, value) => {
    setProgress((prev) => {
      const nextKind = { ...prev[kind] }
      if (value) nextKind[id] = true
      else delete nextKind[id]
      const next = { ...prev, [kind]: nextKind }
      writeProgress(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      ready,
      progress,
      setMissionComplete: (id, complete) => update('missions', id, complete),
      setStepChecked: (id, checked) => update('steps', id, checked),
      reset: () => {
        writeProgress(EMPTY)
        setProgress(EMPTY)
      },
    }),
    [ready, progress, update]
  )

  return <LearnProgressContext.Provider value={value}>{children}</LearnProgressContext.Provider>
}

export function useLearnProgress() {
  return useContext(LearnProgressContext)
}
