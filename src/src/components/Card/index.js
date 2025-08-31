import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styles from './styles.module.css'

/**
 * Reusable Card component with consistent styling
 * Based on the landing page card design with hover effects, shadows, and borders
 */
export default function Card({ children, className, ...props }) {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

/**
 * Card Header component for consistent header styling
 */
export function CardHeader({ children, className, ...props }) {
  return (
    <div className={clsx(styles.cardHeader, className)} {...props}>
      {children}
    </div>
  )
}

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

/**
 * Card Body component for consistent body styling
 */
export function CardBody({ children, className, ...props }) {
  return (
    <div className={clsx(styles.cardBody, className)} {...props}>
      {children}
    </div>
  )
}

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
