import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

/**
 * Generic data table with column-driven rendering.
 *
 * @param {Object[]} columns - Column definitions
 * @param {string}   columns[].key     - Unique key / data field name
 * @param {string}   columns[].header  - Header label
 * @param {string}   [columns[].width] - CSS width (e.g. '38%')
 * @param {'left'|'center'|'right'} [columns[].align] - Cell alignment (default: center)
 * @param {Function} [columns[].render] - Custom render: (row) => ReactNode
 *
 * @param {Object[]} data - Grouped rows
 * @param {string}   [data[].category] - Optional category header text
 * @param {Object[]} data[].rows       - Row objects passed to column renderers
 *
 * @param {string}  [ariaLabel]           - Accessible label for the region
 * @param {boolean} [showCategoryHeaders] - Show category header rows (default: true)
 */
export default function DataTable({
  columns,
  data,
  ariaLabel = 'Data table',
  showCategoryHeaders = true,
}) {
  return (
    <div className={styles.container} role="region" aria-label={ariaLabel} tabIndex={0}>
      <table className={styles.table} data-datatable>
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={clsx(styles.th, col.align === 'left' && styles.cellLeft)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((group, gi) => (
            <React.Fragment key={gi}>
              {showCategoryHeaders && group.category && (
                <tr className={styles.categoryRow}>
                  <td colSpan={columns.length} className={styles.categoryCell}>
                    <strong>{group.category}</strong>
                  </td>
                </tr>
              )}
              {group.rows.map((row, ri) => (
                <tr key={`${gi}-${ri}`} className={styles.row}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx(styles.cell, col.align === 'left' && styles.cellLeft)}
                    >
                      {col.render ? col.render(row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
