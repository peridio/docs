#!/usr/bin/env node
// Prints one line per Lighthouse JSON report in a directory.
// Usage: node scripts/lighthouse-summary.js <dir>
const fs = require('node:fs')
const path = require('node:path')

const dir = process.argv[2]
if (!dir) {
  console.error('usage: lighthouse-summary.js <dir>')
  process.exit(1)
}
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.report.json'))
  .sort()
for (const file of files) {
  const report = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))
  const score = (k) => Math.round((report.categories[k]?.score ?? 0) * 100)
  const ms = (k) => Math.round(report.audits[k]?.numericValue ?? 0)
  const kb = Math.round((report.audits['total-byte-weight']?.numericValue ?? 0) / 1024)
  const cls = (report.audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3)
  console.log(
    `${file.replace('.report.json', '').padEnd(58)} perf=${score('performance')} a11y=${score('accessibility')} bp=${score('best-practices')} seo=${score('seo')}  FCP=${ms('first-contentful-paint')}ms LCP=${ms('largest-contentful-paint')}ms TBT=${ms('total-blocking-time')}ms CLS=${cls} bytes=${kb}KB`
  )
}
