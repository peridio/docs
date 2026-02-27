import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { jetsonOrinNanoData } from '@site/src/data/solutions/nvidia/jetson-orin-nano'

export default function JetsonOrinNanoSolution() {
  return <SolutionLayout {...jetsonOrinNanoData} />
}
