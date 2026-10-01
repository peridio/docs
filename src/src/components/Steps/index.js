import React, { createContext, useContext } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useBrokenLinks from '@docusaurus/useBrokenLinks'
import { trackEvent, useLearnProgress } from '@site/src/components/LearnProgress'
import styles from './styles.module.css'

const ListContext = createContext({ listId: null })

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Numbered step list. Pass `id` to make the steps checkable (see <Checklist>).
 *
 * @param {object} props
 * @param {string} [props.id] - Progress key; when set, each step gets a persisted checkbox.
 * @param {React.ReactNode} [props.title] - Optional heading shown above the steps.
 * @param {React.ReactNode} [props.eyebrow] - Optional small label above the title.
 */
export function Steps({ id, title, eyebrow, children }) {
  return (
    <ListContext.Provider value={{ listId: id ?? null }}>
      <div className={clsx(styles.steps, id && styles.checkable)}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        {title && <div className={styles.heading}>{title}</div>}
        <ol className={styles.list}>{children}</ol>
      </div>
    </ListContext.Provider>
  )
}

/** Checkable <Steps>; `id` is required and namespaces the stored state. */
export function Checklist({ id, ...props }) {
  return <Steps id={id} {...props} />
}

/**
 * One step. Its anchor is `id`, or the slugified `title` when `title` is a string.
 *
 * @param {object} props
 * @param {React.ReactNode} props.title
 * @param {string} [props.id] - Anchor + progress key; required when `title` is not a string.
 */
export function Step({ title, id, children }) {
  const { listId } = useContext(ListContext)
  const { isStepChecked, setStepChecked } = useLearnProgress()
  const anchor = id ?? (typeof title === 'string' ? slugify(title) : undefined)
  const brokenLinks = useBrokenLinks()
  if (anchor) brokenLinks.collectAnchor(anchor)

  const checkable = Boolean(listId && anchor)
  const checked = checkable && isStepChecked(listId, anchor)
  const onChange = (e) => {
    setStepChecked(listId, anchor, e.target.checked)
    if (e.target.checked)
      trackEvent('learn_step_checked', { checklist_id: listId, step_id: anchor })
  }

  return (
    <li id={anchor} className={clsx(styles.step, checked && styles.checked)}>
      <div className={styles.stepTitle}>
        {checkable ? (
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              className={styles.checkbox}
            />
            <span>{title}</span>
          </label>
        ) : (
          title
        )}
        {anchor && (
          <Link to={`#${anchor}`} className={styles.hashLink} aria-label={`Link to ${anchor}`}>
            #
          </Link>
        )}
      </div>
      {children && <div className={styles.stepBody}>{children}</div>}
    </li>
  )
}

export default Steps
