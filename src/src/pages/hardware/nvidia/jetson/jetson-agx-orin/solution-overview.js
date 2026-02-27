import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { jetsonAgxOrinData } from '@site/src/data/solutions/nvidia/jetson-agx-orin'

export default function JetsonAgxOrinSolution() {
  return <SolutionLayout {...jetsonAgxOrinData} />
}
