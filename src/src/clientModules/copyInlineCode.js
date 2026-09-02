import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'

// Opt-in only: inline code is copyable when tagged with `.copyable`
// (hardware target/board chips). Plain inline code in prose is not.
const SELECTOR = '.theme-doc-markdown code.copyable'

function showTooltip(anchor) {
  const tip = document.createElement('span')
  tip.className = 'code-copy-tooltip'
  tip.textContent = 'Copied!'

  const rect = anchor.getBoundingClientRect()
  tip.style.left = `${rect.left + rect.width / 2}px`
  tip.style.top = `${rect.top - 4}px`

  document.body.appendChild(tip)
  requestAnimationFrame(() => tip.classList.add('code-copy-tooltip--visible'))
  setTimeout(() => {
    tip.classList.remove('code-copy-tooltip--visible')
    tip.addEventListener('transitionend', () => tip.remove(), { once: true })
    setTimeout(() => tip.remove(), 400)
  }, 900)
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('click', (e) => {
    const code = e.target.closest(SELECTOR)
    if (!code || code.closest('pre')) return

    navigator.clipboard.writeText(code.textContent).then(() => {
      code.classList.add('code--copied')
      showTooltip(code)
      setTimeout(() => code.classList.remove('code--copied'), 800)
    })
  })
}
