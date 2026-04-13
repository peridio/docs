import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'

const STEPS = [
  {
    prompt: '$ avocado init --target jetson-orin-nano-devkit my-project && cd my-project',
    output: `[SUCCESS] Project initialized at my-project/`,
    outputDelay: 400,
  },
  {
    prompt: '$ cat avocado.yaml',
    output: `target: jetson-orin-nano-devkit

runtimes:
  dev:
    extensions:
      - app
      - avocado-bsp-jetson-orin-nano-devkit
      - avocado-ext-dev
      - avocado-ext-jtop
      - avocado-ext-sshd-dev
      - config
      - nvidia-docker`,
    outputDelay: 100,
  },
  {
    prompt: '$ avocado install -f',
    output: `[INFO] Using target: jetson-orin-nano-devkit (from config file (default_target))
[INFO] Installing packages and dependencies for 'dev' runtime
  ✓ sdk bootstrap
  ✓ sdk packages
  ✓ rootfs install
  ✓ initramfs install
  ✓ target-dev install
  ✓ ext install app
  ✓ ext install avocado-bsp-jetson-orin-nano-devkit
  ✓ ext install avocado-ext-dev
  ✓ ext install avocado-ext-jtop
  ✓ ext install avocado-ext-sshd-dev
  ✓ ext install config
  ✓ runtime install dev
[SUCCESS] All components installed successfully!`,
    outputDelay: 800,
  },
  {
    prompt: '$ avocado build',
    output: `[INFO] Using target: jetson-orin-nano-devkit (from config file (default_target))
[INFO] Building 'dev' runtime
  ✓ ext build app
  ✓ ext build avocado-bsp-jetson-orin-nano-devkit
  ✓ ext build avocado-ext-dev
  ✓ ext build avocado-ext-jtop
  ✓ ext build avocado-ext-sshd-dev
  ✓ ext build config
  ✓ ext image app
  ✓ ext image avocado-bsp-jetson-orin-nano-devkit
  ✓ ext image avocado-ext-dev
  ✓ ext image avocado-ext-jtop
  ✓ ext image avocado-ext-sshd-dev
  ✓ ext image config
  ✓ runtime build dev
[SUCCESS] All components built successfully!`,
    outputDelay: 600,
  },
  {
    prompt: '$ avocado provision -r dev --profile tegraflash',
    output: `[INFO] Provisioning runtime 'dev'
[INFO] Running SDK lifecycle hook 'avocado-provision' for 'dev'.
[INFO] Running stone provision.
[INFO] Provisioning storage device 'rootdisk'.
[INFO] Building image 'tegraflash_esp' in device 'rootdisk'.
[INFO] Building image 'var' in device 'rootdisk'.
[INFO] Building image 'rootfs' in device 'rootdisk'.
[INFO] Building image 'tegraflash_tools' in device 'rootdisk'.
[INFO] Building image 'tegraflash_tos' in device 'rootdisk'.
[INFO] Building image 'initramfs' in device 'rootdisk'.
[INFO] Building image 'tegraflash_initramfs' in device 'rootdisk'.
[INFO] Building image 'tegraflash_bsp' in device 'rootdisk'.
=== Tegraflash Provisioning ===
== Step 1: Signing binaries ==
[SUCCESS] Binaries signed.
== Step 2: Boot Jetson via RCM ==
[SUCCESS] Found Jetson device in recovery mode.
== Step 3: Sending flash sequence commands ==
Commands written to device:
  ✓ bootloader
  ✓ extra-pre-wipe
  ✓ erase-nvme
  ✓ export-devices nvme0n1
  ✓ extra
  ✓ reboot
[SUCCESS] commands written to device.
== Step 4: Writing partitions on external storage device ==
  ✓ Creating partitions
  ✓ Writing partitions
[SUCCESS] Paritioned storage.
== Step 5: Waiting for final status from device == 
[SUCCESS] Provision script 'stone-provision-tegraflash.sh' completed successfully.
[SUCCESS] Provision completed.
[SUCCESS] Successfully ran SDK lifecycle hook 'avocado-provision' for target 'jetson-orin-nano-devkit'.
[SUCCESS] Successfully provisioned runtime 'dev'`,
    outputDelay: 600,
  },
]

const TYPING_SPEED = 40
const PAUSE_BETWEEN_STEPS = 1200
const PAUSE_AFTER_OUTPUT = 800

export default function TerminalDemo() {
  const [lines, setLines] = useState([])
  const [currentChar, setCurrentChar] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const terminalRef = useRef(null)
  const animationRef = useRef(null)

  function scrollToBottom() {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    let cancelled = false

    async function sleep(ms) {
      return new Promise((resolve) => {
        animationRef.current = setTimeout(resolve, ms)
      })
    }

    async function typeText(text) {
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return
        setCurrentChar(text.slice(0, i))
        scrollToBottom()
        await sleep(TYPING_SPEED)
      }
    }

    async function printLines(text) {
      const outputLines = text.split('\n')
      for (const line of outputLines) {
        if (cancelled) return
        setLines((prev) => [...prev, { type: 'output', text: line }])
        scrollToBottom()
        await sleep(100)
      }
    }

    async function runOnce() {
      for (const step of STEPS) {
        if (cancelled) return

        // Type the prompt
        await typeText(step.prompt)
        await sleep(300)

        // Move typed prompt to lines
        setCurrentChar('')
        setLines((prev) => [...prev, { type: 'prompt', text: step.prompt }])
        scrollToBottom()

        // Pause then print output line by line
        await sleep(step.outputDelay)
        if (cancelled) return

        await printLines(step.output)
        scrollToBottom()

        await sleep(PAUSE_BETWEEN_STEPS)
      }
    }

    async function run() {
      while (!cancelled) {
        setLines([])
        setCurrentChar('')
        setIsComplete(false)
        await runOnce()
        if (cancelled) return
        setIsComplete(true)
        await sleep(5000)
      }
    }

    run()

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      cancelled = true
      clearTimeout(animationRef.current)
      clearInterval(cursorInterval)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [lines, currentChar])

  return (
    <div className={styles.terminal}>
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
        </div>
        <span className={styles.titleText}>terminal</span>
      </div>
      <div className={styles.body} ref={terminalRef}>
        {lines.map((line, i) => {
          if (line.type === 'prompt') {
            return <div key={i} className={styles.promptLine}>{line.text}</div>
          }
          const text = line.text
          if (text.startsWith('[INFO]')) {
            return <div key={i} className={styles.outputLine}><span className={styles.infoTag}>[INFO]</span>{text.slice(6)}</div>
          }
          if (text.startsWith('[SUCCESS]')) {
            return <div key={i} className={styles.outputLine}><span className={styles.successTag}>[SUCCESS]</span>{text.slice(9)}</div>
          }
          if (text.trimStart().startsWith('✓')) {
            const indent = text.match(/^(\s*)/)[0]
            const rest = text.trimStart().slice(1)
            return <div key={i} className={styles.checkLine}>{indent}<span className={styles.checkMark}>✓</span>{rest}</div>
          }
          return <div key={i} className={styles.outputLine}>{text}</div>
        })}
        {!isComplete && (
          <div className={styles.promptLine}>
            {currentChar}
            <span className={styles.cursor} style={{ opacity: showCursor ? 1 : 0 }}>
              &#9608;
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
