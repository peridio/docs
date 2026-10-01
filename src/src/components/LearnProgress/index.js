import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'peridio-learn-progress-v1'
const EMPTY = { missions: {}, steps: {} }

// Progress is a convenience only: storage can be missing (SSR), disabled, full,
// or hold stale JSON, and none of that may break a page.
function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw)
    return {
      missions: parsed?.missions && typeof parsed.missions === 'object' ? parsed.missions : {},
      steps: parsed?.steps && typeof parsed.steps === 'object' ? parsed.steps : {},
    }
  } catch {
    return EMPTY
  }
}

function writeStorage(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function trackEvent(name, params) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, params)
    }
  } catch {
    // ignore
  }
}

const LearnProgressContext = createContext(null)

export function LearnProgressProvider({ children }) {
  const [state, setState] = useState(EMPTY)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(readStorage())
    setHydrated(true)
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setState(readStorage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const update = useCallback((fn) => {
    setState((prev) => {
      const next = fn(prev)
      writeStorage(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      hydrated,
      completed: state.missions,
      isComplete: (id) => Boolean(state.missions[id]),
      setComplete: (id, done = true) =>
        update((prev) => {
          const missions = { ...prev.missions }
          if (done) missions[id] = Date.now()
          else delete missions[id]
          return { ...prev, missions }
        }),
      isStepChecked: (listId, stepId) => Boolean(state.steps[listId]?.[stepId]),
      setStepChecked: (listId, stepId, checked) =>
        update((prev) => {
          const list = { ...prev.steps[listId] }
          if (checked) list[stepId] = true
          else delete list[stepId]
          return { ...prev, steps: { ...prev.steps, [listId]: list } }
        }),
      reset: () => update(() => EMPTY),
    }),
    [hydrated, state, update]
  )

  return <LearnProgressContext.Provider value={value}>{children}</LearnProgressContext.Provider>
}

const NOOP = {
  hydrated: false,
  completed: {},
  isComplete: () => false,
  setComplete: () => {},
  isStepChecked: () => false,
  setStepChecked: () => {},
  reset: () => {},
}

export function useLearnProgress() {
  return useContext(LearnProgressContext) ?? NOOP
}
