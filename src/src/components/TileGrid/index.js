import React, { useMemo } from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './styles.module.css'
import { patternIndices } from './patterns'

function Tile({ title, description, to, icon, external, patternIndex, headingLevel }) {
  const patternStyle = {
    '--tile-bg-light': `url("/img/pcb/light-${patternIndex}.svg")`,
    '--tile-bg-dark': `url("/img/pcb/dark-${patternIndex}.svg")`,
  }

  const isExternal = external || (typeof to === 'string' && to.startsWith('http'))
  const Component = isExternal ? 'a' : Link
  const props = isExternal ? { href: to, target: '_blank', rel: 'noopener noreferrer' } : { to }

  return (
    <Component className={styles.tile} {...props}>
      <div className={styles.tileTop} style={patternStyle}>
        <div className={styles.tileTopFade} />
        <div className={styles.tileIcon}>{icon}</div>
      </div>
      <div className={styles.tileBottom}>
        <Heading as={headingLevel} className={styles.tileTitle}>
          {title}
        </Heading>
        <p className={styles.tileDescription}>{description}</p>
      </div>
    </Component>
  )
}

// headingLevel: use 'h2' when the grid sits directly under the page h1.
export default function TileGrid({ tiles, columns = 3, center = false, headingLevel = 'h3' }) {
  const maxWidth = columns * 240 + (columns - 1) * 16
  const patterns = useMemo(
    () => patternIndices(tiles.length, tiles.map((t) => t.title).join('|')),
    [tiles]
  )

  return (
    <div
      className={styles.tileGrid}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        maxWidth: `${maxWidth}px`,
        marginLeft: center ? 'auto' : undefined,
        marginRight: center ? 'auto' : undefined,
      }}
    >
      {tiles.map((tile, i) => (
        <Tile key={tile.title} {...tile} patternIndex={patterns[i]} headingLevel={headingLevel} />
      ))}
    </div>
  )
}
