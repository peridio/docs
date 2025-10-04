import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { jetsonOrinNanoDevkitData } from '@site/src/data/solutions/jetson-orin-nano-devkit'

export default function JetsonOrinNanoDevkitSolution() {
  return <SolutionLayout {...jetsonOrinNanoDevkitData} />
}
