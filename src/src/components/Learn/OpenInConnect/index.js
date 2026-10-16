import React from 'react'
import Link from '@docusaurus/Link'

const CONNECT_URL = 'https://connect.peridio.com'

// Docs never knows the reader's org id, so deep links go through Connect's
// /go/:page route, which resolves the current org (logging in first if
// needed). Until that route ships in Connect, every link opens Connect's
// home page instead. Flip this once /go/:page is live.
const GO_ROUTE_LIVE = false

/**
 * Button that opens a page in Avocado Connect.
 *
 *   <OpenInConnect to="fleet">Open Fleet</OpenInConnect>
 *   <OpenInConnect to="settings/api-keys" />
 */
export default function OpenInConnect({ to, children = 'Open in Avocado Connect' }) {
  const href = GO_ROUTE_LIVE && to ? `${CONNECT_URL}/go/${to}` : CONNECT_URL
  return (
    <Link href={href} className="button button--primary button--sm">
      {children}
    </Link>
  )
}
