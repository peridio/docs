import React from 'react'
import Admonition from '@theme/Admonition'

// The "serial console is optional" callout shared across the Getting Started
// guides and the TargetSelector. A UART console is only needed for a direct
// console to the target; if the device is on the network, SSH is the
// alternative. No hard anchor link (onBrokenAnchors is set to throw), so the
// pointer to the SSH section is plain text.
export default function SerialConsoleOptional() {
  return (
    <Admonition type="note" title="Optional: serial console">
      <p>
        A UART-to-USB serial console adapter is <strong>optional</strong>. You only need one if you
        want a serial console to the target — useful for watching early boot output or recovering a
        device that isn&apos;t reachable on the network. If the device is on your network, you can
        skip the adapter and SSH into it instead (see the SSH section below).
      </p>
    </Admonition>
  )
}
