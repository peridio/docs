import React from 'react'
import { LearnProgressProvider } from '@site/src/components/LearnProgress'

export default function Root({ children }) {
  return <LearnProgressProvider>{children}</LearnProgressProvider>
}
