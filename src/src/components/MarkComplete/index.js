import React from 'react'
import Link from '@docusaurus/Link'
import { trackEvent, useLearnProgress } from '@site/src/components/LearnProgress'
import { MISSIONS, findMission } from '@site/src/data/learn/missions'
import styles from './styles.module.css'

function nextMissionAfter(id) {
  const found = findMission(id)
  if (!found) return null
  const next = MISSIONS[found.index + 1]
  if (!next) return null
  return next.to ? next : { ...next, to: '/learn' }
}

/**
 * End-of-mission button that records completion and links to the next mission.
 *
 * @param {object} props
 * @param {string} props.id - Mission or branch id from src/data/learn/missions.js.
 * @param {string} [props.label] - Button text.
 */
export default function MarkComplete({ id, label = 'Mark mission complete' }) {
  const { isComplete, setComplete } = useLearnProgress()
  const done = isComplete(id)
  const next = nextMissionAfter(id)

  const complete = () => {
    setComplete(id, true)
    trackEvent('learn_mission_complete', { mission_id: id })
  }

  return (
    <div className={styles.box} data-complete={done}>
      {done ? (
        <>
          <span className={styles.doneLabel}>✓ Mission complete</span>
          <div className={styles.actions}>
            {next && (
              <Link to={next.to} className={styles.primary}>
                Next: {next.title} →
              </Link>
            )}
            <button type="button" className={styles.undo} onClick={() => setComplete(id, false)}>
              Undo
            </button>
          </div>
        </>
      ) : (
        <>
          <span className={styles.prompt}>Finished this mission?</span>
          <button type="button" className={styles.primary} onClick={complete}>
            {label}
          </button>
        </>
      )}
    </div>
  )
}
