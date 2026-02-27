import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { jetsonOrinNxData } from '@site/src/data/solutions/nvidia/jetson-orin-nx'

export default function JetsonOrinNXSolution() {
  return <SolutionLayout {...jetsonOrinNxData} />
}
