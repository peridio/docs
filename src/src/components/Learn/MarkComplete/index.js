import React from 'react'
import Link from '@docusaurus/Link'
import { useLearnProgress } from '../progress'
import { trackLearnEvent } from '../analytics'
import styles from './styles.module.css'

/**
 * End-of-mission button. Marks the mission complete in this browser, which
 * moves the Learn mission rail on, and reports the completion to analytics.
 *
 *   <MarkComplete mission="first-ota" />
 */
export default function MarkComplete({ mission }) {
  const { progress, ready, setMissionComplete } = useLearnProgress()
  const complete = Boolean(progress.missions[mission])

  const markComplete = () => {
    setMissionComplete(mission, true)
    trackLearnEvent('learn_mission_complete', { mission_id: mission })
  }

  return (
    <div className={styles.box}>
      {complete ? (
        <>
          <p className={styles.text}>
            <strong>Mission complete.</strong> Your progress is saved in this browser.
          </p>
          <div className={styles.actions}>
            <Link to="/learn" className="button button--primary button--sm">
              Back to Learn
            </Link>
            <button
              type="button"
              className="button button--secondary button--sm"
              onClick={() => setMissionComplete(mission, false)}
            >
              Mark as not done
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.text}>Finished every step above?</p>
          <div className={styles.actions}>
            <button
              type="button"
              className="button button--primary button--sm"
              onClick={markComplete}
              disabled={!ready}
            >
              Mark mission complete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
