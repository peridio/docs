import React from 'react'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import { useLearnProgress } from '@site/src/components/LearnProgress'
import { MISSIONS, isMissionComplete } from '@site/src/data/learn/missions'
import styles from './styles.module.css'

/**
 * The LaunchPad mission sequence with progress read from LearnProgress.
 *
 * @param {object} props
 * @param {string} [props.current] - Mission or branch id to highlight (e.g. on a mission page).
 * @param {boolean} [props.compact] - Hide descriptions and the reset control.
 */
export default function MissionRail({ current, compact = false }) {
  const { completed, hydrated, reset } = useLearnProgress()
  const doneCount = MISSIONS.filter((m) => isMissionComplete(m, completed)).length
  const nextIndex = MISSIONS.findIndex((m) => !isMissionComplete(m, completed))
  const pct = Math.round((doneCount / MISSIONS.length) * 100)

  return (
    <section className={clsx(styles.rail, compact && styles.compact)} aria-label="Mission sequence">
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>Mission sequence</div>
          <div className={styles.progressLabel}>
            {doneCount} of {MISSIONS.length} missions complete
          </div>
        </div>
        {!compact && hydrated && doneCount > 0 && (
          <button type="button" className={styles.reset} onClick={reset}>
            Reset progress
          </button>
        )}
      </div>
      <div
        className={styles.bar}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Mission progress"
      >
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
      <ol className={styles.list}>
        {MISSIONS.map((mission, i) => {
          const done = isMissionComplete(mission, completed)
          const isCurrent =
            current === mission.id || mission.branches?.some((b) => b.id === current)
          const status = done ? 'done' : i === nextIndex ? 'next' : 'upcoming'
          return (
            <li
              key={mission.id}
              className={clsx(styles.item, styles[status], isCurrent && styles.current)}
              data-status={status}
            >
              <span className={styles.marker} aria-hidden="true">
                {done ? '✓' : i + 1}
              </span>
              <div className={styles.body}>
                {mission.to ? (
                  <Link to={mission.to} className={styles.title}>
                    {mission.title}
                  </Link>
                ) : (
                  <span className={styles.title}>{mission.title}</span>
                )}
                <span className={styles.status}>
                  {done ? 'Complete' : status === 'next' ? 'Up next' : 'Upcoming'}
                </span>
                {!compact && <p className={styles.description}>{mission.description}</p>}
                {mission.branches && (
                  <div className={styles.branches}>
                    {mission.branches.map((b) => (
                      <Link
                        key={b.id}
                        to={b.to}
                        className={clsx(
                          styles.branch,
                          completed[b.id] && styles.branchDone,
                          current === b.id && styles.current
                        )}
                      >
                        {completed[b.id] ? '✓ ' : ''}
                        {b.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
