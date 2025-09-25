import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { rubikPiData } from '@site/src/data/solutions/rubik-pi'

export default function RubikPiSolutionNew() {
  return <SolutionLayout {...rubikPiData} />
}
