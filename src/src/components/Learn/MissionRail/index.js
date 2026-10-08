import React from 'react'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import { useLearnProgress } from '../progress'
import { SHARED_MISSIONS, HARDWARE_MISSIONS } from '../missions'
import styles from './styles.module.css'

function Marker({ state, number }) {
  return (
    <span className={clsx(styles.marker, styles[`marker_${state}`])} aria-hidden="true">
      {state === 'complete' ? (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
          <path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        number
      )}
    </span>
  )
}

const STATE_LABELS = { complete: 'Complete', current: 'Up next', upcoming: 'Not started' }

/**
 * The Learn mission sequence: two shared missions, then a hardware branch.
 * Progress comes from LearnProgressProvider (src/theme/Root.js), so it is
 * per-browser and starts empty until the stored progress has loaded.
 */
export default function MissionRail() {
  const { progress, ready, reset } = useLearnProgress()
  const isComplete = (id) => Boolean(progress.missions[id])

  const currentIndex = SHARED_MISSIONS.findIndex((m) => !isComplete(m.id))
  const sharedDone = currentIndex === -1
  const hardwareDone = HARDWARE_MISSIONS.some((m) => isComplete(m.id))
  const anyDone = SHARED_MISSIONS.some((m) => isComplete(m.id)) || hardwareDone

  const forkState = hardwareDone ? 'complete' : sharedDone ? 'current' : 'upcoming'

  return (
    <section className={styles.rail} aria-label="Mission sequence">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Mission sequence</p>
        {ready && anyDone && (
          <button type="button" className={styles.reset} onClick={reset}>
            Reset progress
          </button>
        )}
      </div>

      <ol className={styles.steps}>
        {SHARED_MISSIONS.map((mission, index) => {
          const state = isComplete(mission.id)
            ? 'complete'
            : index === currentIndex
              ? 'current'
              : 'upcoming'
          return (
            <li key={mission.id} className={clsx(styles.step, styles[`step_${state}`])}>
              <Marker state={state} number={index + 1} />
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <Link to={mission.to} className={styles.title}>
                    {mission.title}
                  </Link>
                  <span className={clsx(styles.status, styles[`status_${state}`])}>
                    {STATE_LABELS[state]}
                  </span>
                </div>
                <p className={styles.description}>{mission.description}</p>
                {state === 'current' && (
                  <Link to={mission.to} className="button button--primary button--sm">
                    Start
                  </Link>
                )}
              </div>
            </li>
          )
        })}

        <li className={clsx(styles.step, styles.stepLast, styles[`step_${forkState}`])}>
          <Marker state={forkState} number={SHARED_MISSIONS.length + 1} />
          <div className={styles.body}>
            <div className={styles.titleRow}>
              <span className={styles.title}>Choose your hardware</span>
              <span className={clsx(styles.status, styles[`status_${forkState}`])}>
                {STATE_LABELS[forkState]}
              </span>
            </div>
            <p className={styles.description}>Pick the mission that matches the board you have.</p>
            <div className={styles.paths}>
              {HARDWARE_MISSIONS.map((mission) => (
                <Link
                  key={mission.id}
                  to={mission.to}
                  className={clsx(styles.path, isComplete(mission.id) && styles.pathComplete)}
                >
                  <span className={styles.titleRow}>
                    <span className={styles.pathTitle}>{mission.title}</span>
                    {isComplete(mission.id) && (
                      <span className={clsx(styles.status, styles.status_complete)}>Complete</span>
                    )}
                  </span>
                  <span className={styles.description}>{mission.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </li>
      </ol>
    </section>
  )
}
