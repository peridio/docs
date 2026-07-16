import React, { useState, useMemo, useEffect } from 'react'
import Link from '@docusaurus/Link'
import useBrokenLinks from '@docusaurus/useBrokenLinks'
import Heading from '@theme/Heading'
import Admonition from '@theme/Admonition'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import HostPrerequisites from '@site/src/components/shared/HostPrerequisites'
import SerialConsoleOptional from '@site/src/components/shared/SerialConsoleOptional'
import styles from './styles.module.css'
import targets from '@site/src/data/hardware/generated-targets.json'

const targetList = Object.values(targets).sort((a, b) => a.name.localeCompare(b.name))

export default function TargetSelector() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  // Register one anchor per target with Docusaurus's broken-link checker so
  // deep links like /any-target#rzv2n-sr-som validate at build time. The
  // hash-driven runtime behaviour lives in the useEffect below; collectAnchor
  // is just bookkeeping for the SSR pass.
  const brokenLinks = useBrokenLinks()
  targetList.forEach((target) => brokenLinks.collectAnchor(target.target))

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && targets[hash]) {
      setSelected(targets[hash])
    }
  }, [])

  const filtered = useMemo(() => {
    if (!query) return targetList
    const q = query.toLowerCase()
    return targetList.filter(
      (t) => t.name.toLowerCase().includes(q) || t.target.toLowerCase().includes(q)
    )
  }, [query])

  function handleSelect(target) {
    setSelected(target)
    setQuery('')
    setIsOpen(false)
    window.history.replaceState(null, '', `#${target.target}`)
  }

  const t = selected
  const options = t ? t.provisioning.options : []
  const multiOption = options.length > 1

  // Shown inside a provisioning option that writes host-mounted removable
  // media (autoMount === true), so it appears only where auto-mount can
  // actually interfere.
  const autoMountNote = (
    <p>
      On a Linux host that auto-mounts removable media, disable it first — see{' '}
      <Link to="/developer-reference/linux-auto-mounting">Linux Auto-Mounting</Link>.
    </p>
  )

  const renderRecovery = (rm) => (
    <>
      <p>To flash the device, it must be in USB recovery mode:</p>
      {rm.reference && (
        <p>
          See{' '}
          <Link href={rm.reference.url} target="_blank" rel="noopener noreferrer">
            {rm.reference.label}
          </Link>{' '}
          for the full hardware reference.
        </p>
      )}
      <ol>
        {rm.steps.map((step, i) => {
          // Each step is either a plain string (legacy Nano-style) or an
          // object `{ text, images? }` where `images` renders inline beneath.
          const text = typeof step === 'string' ? step : step.text
          const images = typeof step === 'string' ? null : step.images
          return (
            <li key={i}>
              {text}
              {images && images.length > 0 && (
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '0.5rem 0' }}
                >
                  {images.map((img, j) => (
                    <img
                      key={j}
                      src={img.src}
                      alt={img.alt}
                      style={{
                        maxWidth: '320px',
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                      }}
                    />
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <p>Verify the device is detected:</p>
      <pre>
        <code>{rm.verifyCommand}</code>
      </pre>
      <p>{rm.verifyExpect}</p>
    </>
  )

  const renderProvisionBody = (o) => (
    <>
      {o.description ? (
        <p>{o.description}</p>
      ) : o.profile ? (
        <p>
          Provision the <code>dev</code> runtime using the <code>{o.profile}</code> profile:
        </p>
      ) : (
        <p>
          Provision the <code>dev</code> runtime:
        </p>
      )}
      <pre>
        <code>{o.command}</code>
      </pre>
      {o.steps &&
        o.steps.map((step, i) =>
          step.type === 'code' ? (
            <pre key={i}>
              <code>{step.content}</code>
            </pre>
          ) : (
            <p key={i}>{step.content}</p>
          )
        )}
    </>
  )

  const renderRunBody = (o) => {
    if (t.category === 'virtual') {
      return (
        <>
          <p>Launch the virtual machine:</p>
          <pre>
            <code>avocado sdk run -iE vm dev</code>
          </pre>
        </>
      )
    }
    return (
      <>
        {o.bootSteps ? (
          <ol>
            {o.bootSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>{o.bootInstructions}</p>
        )}
        {o.bootNote ? (
          <p>{o.bootNote}</p>
        ) : (
          <p>
            The <code>root</code> user is passwordless in the <code>dev</code> runtime.
          </p>
        )}
      </>
    )
  }

  return (
    <div>
      <div className={styles.selectorBox}>
        <div className={styles.selectorHeader}>
          <span className={styles.selectorIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="24"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
              />
            </svg>
          </span>
          <div>
            <Heading as="h3" className={styles.selectorTitle}>
              Select your target
            </Heading>
            <p className={styles.selectorDescription}>
              Choose your hardware target to see the complete getting started guide. See the{' '}
              <Link to="/hardware/support-matrix">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="14"
                  height="14"
                  style={{ verticalAlign: 'middle', marginRight: '3px', marginTop: '-2px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                  />
                </svg>{' '}
                hardware support matrix
              </Link>{' '}
              for all supported targets.
            </p>
          </div>
        </div>

        <div className={styles.dropdownWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={selected ? selected.name : 'Search targets...'}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />
          {isOpen && filtered.length > 0 && (
            <div className={styles.dropdown}>
              {filtered.map((target) => (
                <button
                  key={target.target}
                  className={`${styles.dropdownItem} ${
                    selected?.target === target.target ? styles.dropdownItemActive : ''
                  }`}
                  onMouseDown={() => handleSelect(target)}
                >
                  <span className={styles.dropdownName}>{target.name}</span>
                  <code className={styles.dropdownTarget}>{target.target}</code>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {t && (
        <div className={styles.targetInfo}>
          <Heading as="h2">{t.name}</Heading>
          {t.description && <p>{t.description}</p>}

          {t.images &&
            t.images.length > 0 &&
            t.images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                style={{
                  display: 'block',
                  maxWidth: '720px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  margin: '0.5rem 0 1rem',
                }}
              />
            ))}

          <Heading as="h2">Prerequisites</Heading>
          <ul>
            {t.provisioning.prerequisites.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <HostPrerequisites />

          {t.serial && (
            <>
              <Heading as="h2">Serial Console (optional)</Heading>
              {/* Boards with an onboard UART bridge (serial.onboard) need only a
                  cable, not a separate USB adapter, so the shared adapter callout
                  would be misleading — show a cable-oriented optional note instead. */}
              {t.serial.onboard ? (
                <Admonition type="note" title="Optional: serial console">
                  <p>
                    The serial console is optional. Connect the Micro USB cable only if you want
                    console access to the target — otherwise skip it and SSH into the device once
                    it&apos;s on the network (see the SSH section below).
                  </p>
                </Admonition>
              ) : (
                <SerialConsoleOptional />
              )}
              {t.serial.description ? (
                <p>{t.serial.description}</p>
              ) : t.serial.kind === 'onboard-micro-usb' ? (
                <p>
                  The Jetson exposes its UART console over a debug Micro USB port — no TTL adapter
                  is required. Once the Micro USB cable is connected to your host, the host
                  enumerates several serial devices; the UART console is the first one enumerated.
                </p>
              ) : (
                <p>
                  Connect a TTY serial console USB adapter (
                  <Link href="https://www.amazon.com/dp/B07WX2DSVB">this or similar</Link>) to your
                  target. The adapter must be set to {t.serial.voltage}.
                </p>
              )}
              {t.serial.gpio && (
                <>
                  <p>Locate the GPIO pins on your board:</p>
                  <ul>
                    {t.serial.gpio.filter((p) => p.note === 'recovery mode').length > 0 && (
                      <li>
                        Boot into recovery mode:
                        <ul>
                          {t.serial.gpio
                            .filter((p) => p.note === 'recovery mode')
                            .map((pin, i) => (
                              <li key={i}>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '14px',
                                    height: '14px',
                                    backgroundColor: pin.color,
                                    borderRadius: '2px',
                                    verticalAlign: 'middle',
                                    marginRight: '6px',
                                  }}
                                />
                                {pin.label}: short <code>{pin.pin}</code> to <code>{pin.to}</code>
                              </li>
                            ))}
                        </ul>
                      </li>
                    )}
                    <li>
                      Connect your serial console adapter:
                      <ul>
                        {t.serial.gpio
                          .filter((p) => p.note !== 'recovery mode')
                          .map((pin, i) => (
                            <li key={i}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '14px',
                                  height: '14px',
                                  backgroundColor: pin.color,
                                  borderRadius: '2px',
                                  verticalAlign: 'middle',
                                  marginRight: '6px',
                                }}
                              />
                              {pin.label}: <code>{pin.pin}</code> to {pin.to}
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                </>
              )}
              {t.serial.image && (
                <img
                  src={t.serial.image.src}
                  alt={t.serial.image.alt}
                  style={{ maxWidth: '100%', borderRadius: '8px', margin: '1rem 0' }}
                />
              )}
              <p>Open a serial terminal:</p>
              <pre>
                <code>{t.serial.command}</code>
              </pre>
              <p>
                Replace <code>/dev/ttyUSB0</code> with the appropriate device path
                {t.serial.onboard
                  ? ' enumerated on your host once the cable is connected.'
                  : ' for your adapter.'}
              </p>
            </>
          )}

          {!multiOption && options[0].recoveryMode && (
            <>
              <Heading as="h2">Boot into Recovery Mode</Heading>
              {renderRecovery(options[0].recoveryMode)}
            </>
          )}

          <Heading as="h2">Initialize</Heading>
          <p>Create a new project for your target:</p>
          <pre>
            <code>{`avocado init --target ${t.target} ${t.target}\ncd ${t.target}`}</code>
          </pre>

          <Heading as="h2">Install</Heading>
          <p>Install the SDK toolchain, extension dependencies, and runtime packages.</p>
          <pre>
            <code>avocado install -f</code>
          </pre>

          <Heading as="h2">Build</Heading>
          <p>Build the system image.</p>
          <pre>
            <code>avocado build</code>
          </pre>

          <Heading as="h2">Provision</Heading>
          {multiOption ? (
            <Tabs groupId="provision-method">
              {options.map((o) => (
                <TabItem key={o.id} value={o.id} label={o.label}>
                  {o.prerequisites && o.prerequisites.length > 0 && (
                    <p>For this option you&apos;ll also need: {o.prerequisites.join(', ')}.</p>
                  )}
                  {o.autoMount && autoMountNote}
                  {o.recoveryMode && renderRecovery(o.recoveryMode)}
                  {renderProvisionBody(o)}
                </TabItem>
              ))}
            </Tabs>
          ) : (
            <>
              {options[0].autoMount && autoMountNote}
              {renderProvisionBody(options[0])}
            </>
          )}

          <Heading as="h2">Run</Heading>
          {multiOption && t.category !== 'virtual' ? (
            <Tabs groupId="provision-method">
              {options.map((o) => (
                <TabItem key={o.id} value={o.id} label={o.label}>
                  {renderRunBody(o)}
                </TabItem>
              ))}
            </Tabs>
          ) : (
            renderRunBody(options[0])
          )}

          <Heading as="h2">SSH Access</Heading>
          <p>Once booted, SSH into the device:</p>
          <pre>
            <code>{'ssh root@<device-ip>'}</code>
          </pre>

          {t.hardwareUrl && (
            <>
              <hr />
              <p>
                See the full <Link to={t.hardwareUrl}>{t.name} hardware page</Link> for
                specifications and additional details.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
