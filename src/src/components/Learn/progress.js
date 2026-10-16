import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { EMPTY, STORAGE_KEY, createProgressStore } from './progressStore'

// Learn progress lives in this browser only. Docs has no login and no org, so
// this is a convenience for the reader, never a record anything depends on.
// Storage access, and its fallbacks, live in progressStore.js.
const store = createProgressStore(() => window.localStorage)

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
    setProgress(store.read() ?? EMPTY)
    setReady(true)
    // Keep other open tabs in step when one of them changes progress.
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY) return
      const stored = store.read()
      if (stored) setProgress(stored)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const update = useCallback((kind, id, value) => {
    setProgress((prev) => store.change(prev, kind, id, value))
  }, [])

  const value = useMemo(
    () => ({
      ready,
      progress,
      setMissionComplete: (id, complete) => update('missions', id, complete),
      setStepChecked: (id, checked) => update('steps', id, checked),
      reset: () => {
        store.write(EMPTY)
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
