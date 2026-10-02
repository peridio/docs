import React from 'react'
import caps from '../../data/hardware/security-capabilities'
import { Inline } from '../SecurityCapabilities/inline'

const matrixColumns = caps.CAPABILITIES.filter(({ matrixLabel }) => matrixLabel)

function cell(cap) {
  return cap.summary || caps.STATUS_LABELS[cap.status] || cap.status
}

// The board matrix on the Security features page, one row per profile in
// security-capabilities.json. The stamp under it says which feed and date the
// values were read at, because the machine confs are the authority.
export default function SecurityMatrix() {
  const { asOf, feed, profiles } = caps.data

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Target</th>
            {matrixColumns.map(({ key, matrixLabel }) => (
              <th key={key}>
                <Inline text={matrixLabel} />
              </th>
            ))}
            <th>Declared capabilities</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(profiles).map(([id, profile]) => (
            <tr key={id}>
              <td>
                <code>{profile.label || profile.machines.join(', ')}</code>
              </td>
              {matrixColumns.map(({ key }) => (
                <td key={key}>
                  <Inline text={cell(profile[key])} />
                </td>
              ))}
              <td>
                {profile.declared !== null && <code>{profile.declared || '""'}</code>}
                {profile.declared !== null && profile.note && ' - '}
                {profile.note && <Inline text={profile.note} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <em>
          Read from the {feed} machine confs on {asOf}.
        </em>
      </p>
    </>
  )
}
