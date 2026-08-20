#!/usr/bin/env node

// Wrapper around `docusaurus start` / `docusaurus serve` that also makes the
// site reachable from a phone on the same network.
//
// Docusaurus binds to localhost by default, which is invisible to every other
// device on the Wi-Fi. This binds to 0.0.0.0 instead and, once the site has
// actually compiled, prints the LAN URL together with a QR code you can point a
// phone camera at. The QR is rendered by scripts/qr.js — no dependency.
//
// Usage:
//   node scripts/dev-server.js              # dev server (npm start)
//   node scripts/dev-server.js serve        # serve the production build
//   node scripts/dev-server.js start --poll # extra flags pass through
//
// The port comes from --port, else $PORT, else 3000; if that port is taken the
// next free one is used, so a second checkout can run alongside the first.
//
// Everything on the network can reach the dev server while it runs. That is the
// point, but it is worth knowing on a network you do not trust.

const fs = require('node:fs')
const http = require('node:http')
const net = require('node:net')
const os = require('node:os')
const path = require('node:path')
const { spawn } = require('node:child_process')

const qr = require('./qr')

const SITE_DIR = path.resolve(__dirname, '..')
const DEFAULT_PORT = 3000
const READY_TIMEOUT_MS = 5 * 60 * 1000

// macOS and Linux both expose a pile of virtual interfaces that carry an IPv4
// address no phone can route to. None of these is ever the answer.
const VIRTUAL_INTERFACE = /^(utun|awdl|llw|bridge|vmnet|vboxnet|docker|veth|tun|tap|ap\d)/

function isPrivateV4(address) {
  const [a, b] = address.split('.').map(Number)
  return a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)
}

// The address a phone should use. Prefers a private address on a physical
// interface; returns null when there is nothing routable (offline, or Wi-Fi off).
function lanAddress() {
  const candidates = []
  for (const [name, addresses] of Object.entries(os.networkInterfaces())) {
    for (const entry of addresses ?? []) {
      if (entry.family !== 'IPv4' || entry.internal) continue
      if (entry.address.startsWith('169.254.')) continue // self-assigned, no router
      candidates.push({ name, address: entry.address })
    }
  }

  const rank = (candidate) =>
    (VIRTUAL_INTERFACE.test(candidate.name) ? 2 : 0) + (isPrivateV4(candidate.address) ? 0 : 1)

  candidates.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name))
  return candidates.length ? candidates[0].address : null
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const probe = net.createServer()
    probe.once('error', () => resolve(false))
    probe.once('listening', () => probe.close(() => resolve(true)))
    probe.listen(port, '0.0.0.0')
  })
}

async function firstFreePort(start) {
  for (let port = start; port < start + 20; port++) {
    if (await isPortFree(port)) return port
  }
  throw new Error(`No free port found in ${start}–${start + 19}`)
}

// Read baseUrl straight out of the config text. Loading the real config means
// loading every plugin, which is far too slow for one string used in a banner.
function readBaseUrl() {
  try {
    const source = fs.readFileSync(path.join(SITE_DIR, 'docusaurus.config.js'), 'utf8')
    const match = source.match(/^\s*baseUrl:\s*['"]([^'"]+)['"]/m)
    if (match) return match[1]
  } catch {
    // Fall through to the default.
  }
  return '/'
}

// Resolve one GET against the site. webpack-dev-middleware holds requests until
// the first compilation finishes, so a response means the site is genuinely
// ready — which keeps the banner from printing above a wall of webpack output.
function get(port, pathname) {
  return new Promise((resolve, reject) => {
    const request = http.get(
      { host: '127.0.0.1', port, path: pathname, timeout: READY_TIMEOUT_MS },
      (response) => {
        response.resume()
        resolve()
      }
    )
    request.once('error', reject)
    request.once('timeout', () => request.destroy(new Error('timed out')))
  })
}

async function waitUntilReady(port, pathname, isRunning) {
  const deadline = Date.now() + READY_TIMEOUT_MS
  while (Date.now() < deadline) {
    if (!isRunning()) return false
    try {
      await get(port, pathname)
      return true
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }
  return false
}

const BOLD = '\x1b[1m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'

function printBanner({ localUrl, networkUrl }) {
  const lines = ['', `${BOLD}Preview on your phone${RESET}`, '']
  lines.push(`  ${DIM}Local${RESET}     ${localUrl}`)

  if (!networkUrl) {
    lines.push(`  ${DIM}Network${RESET}   ${DIM}unavailable — no LAN address found${RESET}`)
    lines.push('')
    process.stdout.write(`${lines.join('\n')}\n`)
    return
  }

  lines.push(`  ${BOLD}Network${RESET}   ${networkUrl}`)
  lines.push('')
  lines.push(qr.render(qr.encode(networkUrl), { color: true }))
  lines.push(`${DIM}Scan with your phone camera. Both devices must be on the same network.${RESET}`)
  lines.push('')
  process.stdout.write(`${lines.join('\n')}\n`)
}

// Pull --port/-p and --host out of the passthrough args: the port is needed
// here to poll and to build the URL, and the host is ours to decide.
function extractArgs(argv) {
  const passthrough = []
  let port = null
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    const portMatch = arg.match(/^(?:-p|--port)(?:=(.*))?$/)
    if (portMatch) {
      port = portMatch[1] ?? argv[++i]
      continue
    }
    if (/^(?:-h|--host)(?:=|$)/.test(arg)) {
      if (!arg.includes('=')) i++
      continue
    }
    passthrough.push(arg)
  }
  return { port: port ? Number(port) : null, passthrough }
}

async function main() {
  const [modeArg, ...rest] = process.argv.slice(2)
  const mode = modeArg && !modeArg.startsWith('-') ? modeArg : 'start'
  const { port: requestedPort, passthrough } = extractArgs(
    modeArg && modeArg.startsWith('-') ? process.argv.slice(2) : rest
  )

  const preferredPort = requestedPort || Number(process.env.PORT) || DEFAULT_PORT
  const port = await firstFreePort(preferredPort)
  if (port !== preferredPort) {
    process.stdout.write(`${DIM}Port ${preferredPort} is in use — using ${port}.${RESET}\n`)
  }

  const baseUrl = readBaseUrl()
  const address = lanAddress()

  const docusaurus = require.resolve('@docusaurus/core/bin/docusaurus.mjs')
  const child = spawn(
    process.execPath,
    [docusaurus, mode, '--host', '0.0.0.0', '--port', String(port), ...passthrough],
    { cwd: SITE_DIR, stdio: 'inherit' }
  )

  let running = true
  child.on('exit', (code, signal) => {
    running = false
    process.exit(signal ? 128 + (os.constants.signals[signal] ?? 0) : (code ?? 0))
  })

  // Ctrl-C reaches the whole foreground process group anyway; this is for the
  // case where something signals the wrapper alone, so the server does not get
  // orphaned holding the port.
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
      if (running) child.kill(signal)
    })
  }

  const ready = await waitUntilReady(port, baseUrl, () => running)
  if (ready) {
    printBanner({
      localUrl: `http://localhost:${port}${baseUrl}`,
      networkUrl: address ? `http://${address}:${port}${baseUrl}` : null,
    })
  }
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`)
  process.exit(1)
})
