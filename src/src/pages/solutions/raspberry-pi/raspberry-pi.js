import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { raspberryPiData } from '@site/src/data/solutions/raspberry-pi'

export default function RaspberryPiSolution() {
  return <SolutionLayout {...raspberryPiData} />
}
