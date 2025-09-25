import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { seeedReterminalData } from '@site/src/data/solutions/seeed-reterminal'

export default function SeeedSolution() {
  return <SolutionLayout {...seeedReterminalData} />
}
