import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { data } from '@site/src/data/solutions/nvidia/jetson-orin-nx'

export default function JetsonOrinNxSolution() {
  return <SolutionLayout {...data} />
}
