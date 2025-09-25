import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'
import { stm32mp257fDkData } from '@site/src/data/solutions/stm32mp257f-dk'

export default function STM32MP157DDKSolutionNew() {
  return <SolutionLayout {...stm32mp257fDkData} />
}
