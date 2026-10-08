import React from 'react'
import { LearnProgressProvider } from '@site/src/components/Learn/progress'

// Wraps the whole site once, so Learn progress is shared between the mission
// rail on /learn and the Steps and MarkComplete components on each mission.
export default function Root({ children }) {
  return <LearnProgressProvider>{children}</LearnProgressProvider>
}
