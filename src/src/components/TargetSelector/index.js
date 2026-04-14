import React, { useState, useMemo, useEffect } from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import LinuxAutoMountWarning from '@site/src/components/shared/LinuxAutoMountWarning'
import styles from './styles.module.css'
import targets from '@site/src/data/hardware/targets.json'

const WARNING_MESSAGES = {
  linuxHostOnly:
    'This target requires a Linux host machine for provisioning. macOS and Windows are not supported.',
}

const targetList = Object.values(targets).sort((a, b) => a.name.localeCompare(b.name))

export default function TargetSelector() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

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

          <Heading as="h2">Prerequisites</Heading>
          <ul>
            {t.provisioning.prerequisites.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
            <li>
              <Link href="https://www.docker.com/products/docker-desktop/">Docker Desktop</Link>{' '}
              installed and running
            </li>
            <li>
              The latest version of the{' '}
              <Link to="/developer-reference/avocado-cli/overview">Avocado CLI</Link>
            </li>
          </ul>

          {t.provisioning.warnings.includes('linuxHostOnly') && (
            <div className={styles.warningBox}>⚠ {WARNING_MESSAGES.linuxHostOnly}</div>
          )}

          {t.provisioning.warnings.includes('linuxAutoMount') && <LinuxAutoMountWarning />}

          {t.serial && (
            <>
              <Heading as="h2">Serial Console</Heading>
              <p>
                Connect a TTY serial console USB adapter (
                <Link href="https://www.amazon.com/dp/B07WX2DSVB">this or similar</Link>) to your
                target. The adapter must be set to {t.serial.voltage}.
              </p>
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
                Replace <code>/dev/ttyUSB0</code> with the appropriate device path for your adapter.
              </p>
            </>
          )}

          {t.provisioning.recoveryMode && (
            <>
              <Heading as="h2">Boot into Recovery Mode</Heading>
              <p>To flash the device, it must be in USB recovery mode:</p>
              <ol>
                {t.provisioning.recoveryMode.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <p>Verify the device is detected:</p>
              <pre>
                <code>{t.provisioning.recoveryMode.verifyCommand}</code>
              </pre>
              <p>{t.provisioning.recoveryMode.verifyExpect}</p>
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
          {t.provisioning.provisionDescription ? (
            <p>{t.provisioning.provisionDescription}</p>
          ) : t.provisioning.profile ? (
            <p>
              Provision the <code>dev</code> runtime using the <code>{t.provisioning.profile}</code>{' '}
              profile:
            </p>
          ) : (
            <p>
              Provision the <code>dev</code> runtime:
            </p>
          )}
          <pre>
            <code>{t.provisioning.provisionCommand}</code>
          </pre>
          {t.provisioning.provisionSteps &&
            t.provisioning.provisionSteps.map((step, i) =>
              step.type === 'code' ? (
                <pre key={i}>
                  <code>{step.content}</code>
                </pre>
              ) : (
                <p key={i}>{step.content}</p>
              )
            )}

          <Heading as="h2">Run</Heading>
          {t.category === 'virtual' ? (
            <>
              <p>Launch the virtual machine:</p>
              <pre>
                <code>avocado sdk run -iE vm dev</code>
              </pre>
            </>
          ) : t.provisioning.bootSteps ? (
            <ol>
              {t.provisioning.bootSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          ) : (
            <p>{t.provisioning.bootInstructions}</p>
          )}
          {t.provisioning.bootNote ? (
            <p>{t.provisioning.bootNote}</p>
          ) : (
            <p>
              The <code>root</code> user is passwordless in the <code>dev</code> runtime.
            </p>
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
