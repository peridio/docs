import React from 'react'

// The data strings use backticks for inline code, as the Markdown they replace
// did. Odd-indexed pieces of a split on the backtick are the code spans.
export function Inline({ text }) {
  return text
    .split('`')
    .map((piece, i) =>
      i % 2 === 1 ? <code key={i}>{piece}</code> : <React.Fragment key={i}>{piece}</React.Fragment>
    )
}
