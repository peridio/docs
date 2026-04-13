import React, { useMemo } from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

const PATTERN_COUNT = 10

function usePatternIndices(count) {
  return useMemo(() => {
    const indices = []
    const available = Array.from({ length: PATTERN_COUNT }, (_, i) => i + 1)
    for (let i = 0; i < count; i++) {
      if (available.length === 0) {
        for (let j = 1; j <= PATTERN_COUNT; j++) available.push(j)
      }
      const pick = Math.floor(Math.random() * available.length)
      indices.push(available.splice(pick, 1)[0])
    }
    return indices
  }, [count])
}

function Tile({ title, description, to, icon, external, patternIndex }) {
  const { colorMode } = useColorMode()
  const prefix = colorMode === 'dark' ? 'dark' : 'light'
  const bgUrl = `/img/pcb/${prefix}-${patternIndex}.svg`

  const isExternal = external || (typeof to === 'string' && to.startsWith('http'))
  const Component = isExternal ? 'a' : Link
  const props = isExternal
    ? { href: to, target: '_blank', rel: 'noopener noreferrer' }
    : { to }

  return (
    <Component className={styles.tile} {...props}>
      <div
        className={styles.tileTop}
        style={{ '--tile-bg': `url("${bgUrl}")` }}
      >
        <div className={styles.tileTopFade} />
        <div className={styles.tileIcon}>
          {icon}
        </div>
      </div>
      <div className={styles.tileBottom}>
        <h3 className={styles.tileTitle}>{title}</h3>
        <p className={styles.tileDescription}>{description}</p>
      </div>
    </Component>
  )
}

export default function TileGrid({ tiles, columns = 3, center = false }) {
  const maxWidth = columns * 240 + (columns - 1) * 16
  const patterns = usePatternIndices(tiles.length)

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
        <Tile key={tile.title} {...tile} patternIndex={patterns[i]} />
      ))}
    </div>
  )
}
