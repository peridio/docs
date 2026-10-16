import React, { createContext, useContext } from 'react'
import useBrokenLinks from '@docusaurus/useBrokenLinks'
import clsx from 'clsx'
import { useLearnProgress } from '../progress'
import { trackLearnEvent } from '../analytics'
import styles from './styles.module.css'

const StepsContext = createContext(null)

/**
 * A numbered list of checkable steps. Checked state is saved per browser
 * under `<Steps id>/<Step id>`, so both ids must stay stable.
 *
 *   <Steps id="first-ota">
 *     <Step id="install-cli" title="Install the Avocado CLI">...</Step>
 *   </Steps>
 */
export function Steps({ id, children }) {
  return (
    <StepsContext.Provider value={id}>
      <ol className={styles.steps}>{children}</ol>
    </StepsContext.Provider>
  )
}

export function Step({ id, title, children }) {
  const groupId = useContext(StepsContext)
  const { progress, setStepChecked } = useLearnProgress()
  const key = `${groupId}/${id}`
  const anchor = `step-${groupId}-${id}`
  const checked = Boolean(progress.steps[key])

  // Each step is linkable (#step-<group>-<id>). Register the anchor so the
  // build's broken-anchor check knows it exists.
  useBrokenLinks().collectAnchor(anchor)

  const onChange = (event) => {
    setStepChecked(key, event.target.checked)
    if (event.target.checked) trackLearnEvent('learn_step_checked', { step_id: key })
  }

  return (
    <li id={anchor} className={clsx(styles.step, checked && styles.checked)}>
      <label className={styles.label}>
        <input type="checkbox" className={styles.checkbox} checked={checked} onChange={onChange} />
        <span className={styles.title}>{title}</span>
      </label>
      <div className={styles.content}>{children}</div>
    </li>
  )
}

export default Steps
