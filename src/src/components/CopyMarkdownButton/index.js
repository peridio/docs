import React, { useState, useCallback } from 'react'
import TurndownService from 'turndown'
import styles from './styles.module.css'

function createTurndownService() {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    hr: '---',
    bulletListMarker: '-',
  })

  // Code blocks — extract language from Docusaurus/Prism class names
  td.addRule('fencedCodeBlock', {
    filter(node) {
      return node.nodeName === 'PRE' && node.querySelector('code')
    },
    replacement(_content, node) {
      const code = node.querySelector('code')
      const text = code.textContent || ''
      // Extract language from class like "language-bash" or "prism-code language-bash"
      const langMatch = (node.className + ' ' + code.className).match(/language-(\S+)/)
      const lang = langMatch ? langMatch[1] : ''
      return '\n\n```' + lang + '\n' + text.replace(/\n$/, '') + '\n```\n\n'
    },
  })

  // Tables — convert to GFM markdown tables
  td.addRule('table', {
    filter: 'table',
    replacement(_content, node) {
      const rows = Array.from(node.querySelectorAll('tr'))
      if (rows.length === 0) return ''

      const matrix = rows.map((row) =>
        Array.from(row.querySelectorAll('th, td')).map((cell) =>
          cell.textContent.trim().replace(/\\/g, '\\\\').replace(/\|/g, '\\|')
        )
      )
      if (matrix.length === 0) return ''

      const colCount = Math.max(...matrix.map((r) => r.length))
      const pad = (arr) => {
        while (arr.length < colCount) arr.push('')
        return arr
      }

      const lines = []
      lines.push('| ' + pad(matrix[0]).join(' | ') + ' |')
      lines.push('| ' + Array(colCount).fill('---').join(' | ') + ' |')
      for (let i = 1; i < matrix.length; i++) {
        lines.push('| ' + pad(matrix[i]).join(' | ') + ' |')
      }

      return '\n\n' + lines.join('\n') + '\n\n'
    },
  })

  // Skip table sub-elements — handled by the table rule above
  td.addRule('tableCell', {
    filter: ['thead', 'tbody', 'tfoot', 'tr', 'th', 'td'],
    replacement(content) {
      return content
    },
  })

  // Strip images entirely
  td.addRule('image', {
    filter: 'img',
    replacement() {
      return ''
    },
  })

  // Strip SVGs (icons, decorative elements)
  td.addRule('svg', {
    filter: 'svg',
    replacement() {
      return ''
    },
  })

  // Admonitions — convert to blockquote-style callouts
  td.addRule('admonition', {
    filter(node) {
      return node.nodeName === 'DIV' && node.getAttribute('data-admonition-type') != null
    },
    replacement(content, node) {
      const type = node.getAttribute('data-admonition-type') || 'note'
      const trimmed = content.trim()
      return (
        '\n\n> **' +
        type.charAt(0).toUpperCase() +
        type.slice(1) +
        '**\n' +
        trimmed
          .split('\n')
          .map((line) => '> ' + line)
          .join('\n') +
        '\n\n'
      )
    },
  })

  return td
}

function extractMarkdown() {
  const container = document.querySelector('.theme-doc-markdown.markdown')
  if (!container) return null

  const clone = container.cloneNode(true)

  // Remove elements that aren't content
  const selectors = [
    '.buttonGroup', // code block copy buttons
    '.admonition-icon', // admonition icons
    '[class*="copyButton"]', // alternative copy button selectors
    '.hash-link', // heading anchor links
    '.badge', // badges
    '.dev-badge', // dev badges
  ]
  clone.querySelectorAll(selectors.join(',')).forEach((el) => el.remove())

  const td = createTurndownService()
  let md = td.turndown(clone.innerHTML)

  // Clean up excessive blank lines
  md = md.replace(/\n{3,}/g, '\n\n').trim()

  // Prepend source URL so the LLM knows where this came from
  const source = window.location.origin + window.location.pathname
  md = `Source: ${source}\n\n${md}`

  return md
}

export default function CopyMarkdownButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const md = extractMarkdown()
    if (!md) return

    try {
      await navigator.clipboard.writeText(md)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = md
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={handleCopy}
      title="Copy page content as Markdown for use with AI coding agents"
    >
      {copied ? (
        <>
          <CheckIcon />
          <span>Copied for LLM</span>
        </>
      ) : (
        <>
          <ClipboardIcon />
          <span>Copy for LLM</span>
        </>
      )}
    </button>
  )
}

function ClipboardIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
