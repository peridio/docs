import React from 'react'
import caps from '../../data/hardware/security-capabilities'
import { Inline } from './inline'

// The "Security features" table on a hardware page, rendered from
// security-capabilities.json so a capability change is one edit. Pass `machine`
// for a single board or `profile` for a family page that shares one table.
export default function SecurityCapabilities({ machine, profile: profileId }) {
  if (!machine && !profileId) {
    throw new Error('SecurityCapabilities needs a machine or a profile prop')
  }
  const id = profileId || caps.profileIdForMachine(machine)
  const profile = caps.profileById(id)
  const rows = caps.rowsFor(id)

  const heading =
    profile.machines.length === 1 ? (
      <>
        Status on <code>{profile.machines[0]}</code>
      </>
    ) : (
      'Status'
    )

  return (
    <table>
      <thead>
        <tr>
          <th>Capability</th>
          <th>{heading}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ label, detail }) => (
          <tr key={label}>
            <td>
              <Inline text={label} />
            </td>
            <td>
              <Inline text={detail} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
