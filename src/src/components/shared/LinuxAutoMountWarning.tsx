import React from 'react'
import Admonition from '@theme/Admonition'
import CodeBlock from '@theme/CodeBlock'

export default function LinuxAutoMountWarning() {
  return (
    <Admonition type="warning" title="Linux Auto-mounting">
      <p>
        Some Linux operating systems, like Ubuntu, will attempt to auto-mount mass storage devices.
        This can interfere with Avocado&apos;s ability to finalize provisioning a device.
      </p>
      <p>
        Before provisioning, disable auto-mounting. The following example is for Ubuntu (GNOME
        desktop); the same commands apply to other GNOME-based distributions such as Fedora
        Workstation.
      </p>
      <CodeBlock language="bash" title="Ubuntu (GNOME desktop)">
        {`gsettings set org.gnome.desktop.media-handling automount false
gsettings set org.gnome.desktop.media-handling automount-open false`}
      </CodeBlock>
    </Admonition>
  )
}
