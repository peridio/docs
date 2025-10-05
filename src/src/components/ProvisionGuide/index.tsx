import React from 'react'
import CodeBlock from '@theme/CodeBlock'
import Admonition from '@theme/Admonition'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'

import styles from './styles.module.css'
import { getTargetConfig, targetConfigs, RunType } from '../../data/targetConfigs'

export interface ProvisionGuideProps {
  /** Target identifier to look up configuration, or manual config override */
  targetId?: string
  /** Target identifier used in avocado init command (manual override) */
  target?: string
  /** Suggested project directory name (manual override) */
  projectName?: string

  /** Whether this target supports macOS development */
  supportsMac?: boolean
  /** Provision profile to use (e.g., "sd") */
  provisionProfile?: string
  /** Required disk space for provisioning in GB (e.g., 8, 16) */
  diskSpace?: number
  /** Additional prerequisites or notes */
  additionalPrerequisites?: React.ReactNode
  /** Custom title override */
  title?: string
  /** Custom description */
  description?: string
  /** Whether this guide is in development - shows warning callout */
  inDevelopment?: boolean
  /** Type of run instructions to show (manual override) */
  runType?: RunType
}

// Base TOC structure
const baseToc = [
  {
    value: 'Prerequisites',
    id: 'prerequisites',
    level: 2,
  },
  {
    value: 'Initialize project',
    id: 'initialize-project',
    level: 3,
  },
]

const serialConsoleToc = [
  {
    value: 'Setup serial console',
    id: 'setup-serial-console',
    level: 3,
  },
]

const endToc = [
  {
    value: 'Provision',
    id: 'provision',
    level: 2,
  },
  {
    value: 'Run',
    id: 'run',
    level: 2,
  },
]

// Dynamic TOC generator function for programmatic use
export const getMyToc = (includeSerialConsole: boolean = true) =>
  includeSerialConsole ? [...baseToc, ...serialConsoleToc, ...endToc] : [...baseToc, ...endToc]

export default function ProvisionGuide({
  targetId,
  target: manualTarget,
  projectName: manualProjectName,
  supportsMac = false,
  provisionProfile,
  diskSpace,
  additionalPrerequisites,

  description,
  inDevelopment = false,
  runType: manualRunType,
}: ProvisionGuideProps) {
  // If targetId is provided, look up the configuration
  const config = targetId ? getTargetConfig(targetId) : null

  // Handle case where targetId is provided but config not found
  if (targetId && !config) {
    return (
      <div>
        <Heading as="h1">Target Configuration Not Found</Heading>
        <p>
          The target configuration for <code>{targetId}</code> could not be found. Please check that
          the target identifier is correct.
        </p>
        <p>Available targets: {Object.keys(targetConfigs).join(', ')}</p>
      </div>
    )
  }

  // Resolve final values - config takes precedence, then manual overrides, then defaults
  const resolvedTarget = config?.target || manualTarget || 'unknown'
  const resolvedProjectName = config?.projectName || manualProjectName || 'project'
  const resolvedSupportsMac = config?.supportsMac ?? supportsMac
  const resolvedProvisionProfile = config?.provisionProfile || provisionProfile
  const resolvedDiskSpace = config?.diskSpace || diskSpace
  const resolvedDescription = config?.description || description
  const resolvedTitle = 'Provision'
  const resolvedRunType = config?.runType || manualRunType || 'qemu'

  const hostMachine = resolvedSupportsMac ? 'Development machine' : 'Host machine'
  const platformSupport = resolvedSupportsMac ? (
    <>
      <li>macOS 10.12+</li>
      <li>Linux (Ubuntu 22.04+, Fedora 39+)</li>
    </>
  ) : (
    <>
      <li>Ubuntu 22.04+, Fedora 39+</li>
    </>
  )

  const hostRequirementText = resolvedSupportsMac
    ? 'Host machine:'
    : 'A Linux host machine per reliable provisioning:'

  const initCommand = `avocado init --target ${resolvedTarget} ${resolvedProjectName} && cd ${resolvedProjectName}
avocado install --force`

  const provisionCommand = resolvedProvisionProfile
    ? `avocado build
avocado provision -r dev --provision-profile ${resolvedProvisionProfile}`
    : `avocado build
avocado provision -r dev`

  const runCommand = `avocado sdk run -iE vm dev`

  const renderRunSection = () => {
    switch (resolvedRunType) {
      case 'qemu':
        return (
          <>
            <p>
              To leverage the provisioning artifacts to run the virtual machine, you may use the
              following command:
            </p>
            <CodeBlock language="bash" title={hostMachine}>
              {runCommand}
            </CodeBlock>
            <p>
              The <code>root</code> user is passwordless in the <code>dev</code> runtime used by
              this guide.
            </p>
          </>
        )
      case 'sd-card':
        return (
          <>
            <p>
              After provisioning completes, insert the SD card into your target device and power it
              on.
            </p>
            <p>
              The device will boot from the SD card with the provisioned system. The{' '}
              <code>root</code> user is passwordless in the <code>dev</code> runtime used by this
              guide.
            </p>
          </>
        )
      case 'usb-power-cycle':
        return (
          <>
            <p>
              After provisioning completes, remove any USB cables or jumpers that were used to
              facilitate USB provisioning, then reapply power to the device.
            </p>
            <p>
              The device will boot with the provisioned system. The <code>root</code> user is
              passwordless in the <code>dev</code> runtime used by this guide.
            </p>
          </>
        )
      default:
        return <p>Run instructions not available for this target type.</p>
    }
  }

  return (
    <div className={styles.provisionGuide}>
      <Heading as="h1">{resolvedTitle}</Heading>

      {inDevelopment && (
        <Admonition type="warning" title="In Development">
          <p>
            This provisioning guide is currently under development. Features may be incomplete or
            subject to change. Please check back for updates or{' '}
            <Link href="https://github.com/peridio/docs/issues">report any issues</Link> you
            encounter.
          </p>
        </Admonition>
      )}

      {resolvedDescription && <p>{resolvedDescription}</p>}

      <p>
        This guide will walk you through the process of provisioning a {config?.displayName} using
        the Avocado CLI. For general information on provisioning, see the{' '}
        <Link href="/avocado-linux/references/provisioning">provisioning reference</Link>.
      </p>

      <Heading as="h2" id="prerequisites">
        Prerequisites
      </Heading>

      <ul>
        <li>
          {resolvedSupportsMac ? (
            <>
              {hostRequirementText}
              <ul>{platformSupport}</ul>
            </>
          ) : (
            <>
              A Linux host machine per{' '}
              <Link href="/avocado-linux/references/provisioning#reliable-provisioning">
                reliable provisioning
              </Link>
              :<ul>{platformSupport}</ul>
            </>
          )}
        </li>
        {resolvedDiskSpace && <li>Available disk space: {resolvedDiskSpace} GB</li>}
        {resolvedRunType !== 'qemu' && (
          <li>
            A TTY serial console USB adapter to connect to the device&apos;s serial console for
            monitoring and debugging.
          </li>
        )}
        <li>
          The latest version of the{' '}
          <Link href="/avocado-linux/tools/avocado-cli/overview">Avocado CLI</Link>.
        </li>
      </ul>

      {additionalPrerequisites}

      <Heading as="h3" id="initialize-project">
        Initialize project
      </Heading>

      <p>Create the project directory and install dependencies.</p>

      <CodeBlock language="bash" title={hostMachine}>
        {initCommand}
      </CodeBlock>

      {resolvedRunType !== 'qemu' && (
        <>
          <Heading as="h3" id="setup-serial-console">
            Setup serial console
          </Heading>

          <p>
            Connect your TTY serial console USB adapter to the device&apos;s serial console port.
            This will allow you to monitor the boot process and access the device console.
          </p>

          <p>
            Use a serial terminal program like <code>screen</code> or <code>tio</code> to connect.
            The typical connection settings are:
          </p>

          <p>
            Example using <code>tio</code>:
          </p>

          <CodeBlock language="bash" title={hostMachine}>
            {`tio -b 115200 /dev/ttyUSB0`}
          </CodeBlock>

          <p>
            Replace <code>/dev/ttyUSB0</code> with the appropriate device path for your serial
            adapter.
          </p>
        </>
      )}

      <Heading as="h2" id="provision">
        Provision
      </Heading>

      <p>
        Build the project and execute the provisioning procedure.
        {resolvedSupportsMac
          ? ' Because QEMU is virtual, the act of provisioning will write its artifacts to disk on your development machine as opposed to physically interfacing with external hardware.'
          : ' This will build the system image and flash it to your target hardware.'}
      </p>

      <CodeBlock language="bash" title={hostMachine}>
        {provisionCommand}
      </CodeBlock>

      <Heading as="h2" id="run">
        Run
      </Heading>

      {renderRunSection()}
    </div>
  )
}

// Export dynamic TOC based on target configuration for use in .mdx files
export const getDynamicToc = (targetId: string) => {
  const config = getTargetConfig(targetId)
  const includeSerialConsole = config?.runType !== 'qemu'
  return getMyToc(includeSerialConsole)
}
