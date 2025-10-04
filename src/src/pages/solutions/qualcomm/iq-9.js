import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { qualcommIq9Data } from '@site/src/data/solutions/qualcomm-iq9'

export default function IQ9SolutionNew() {
  return <SolutionLayout {...qualcommIq9Data} />
}
