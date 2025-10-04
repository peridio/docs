import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { raspberryPi4Data } from '@site/src/data/solutions/raspberry-pi-4'

export default function RaspberryPi4Solution() {
  return <SolutionLayout {...raspberryPi4Data} />
}
