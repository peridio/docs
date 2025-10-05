import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { data } from '@site/src/data/solutions/raspberry-pi/raspberry-pi-5'

export default function RaspberryPiSolution() {
  return <SolutionLayout {...data} />
}
