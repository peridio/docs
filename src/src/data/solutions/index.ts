export { jetsonOrinNanoData } from './jetson-orin-nano'
export { jetsonOrinNxData } from './jetson-orin-nx'
export { frdm93Data } from './frdm-93'
export { icam540Data } from './icam-540'
export { imx8mpData } from './imx8mp'
export { onlogicData } from './onlogic'
export { qualcommIq9Data } from './qualcomm-iq9'
export { rubikPiData } from './rubik-pi'
export { seeedReterminalData } from './seeed-reterminal'
export { stm32mp257fDkData } from './stm32mp257f-dk'
export { raspberryPiData } from './raspberry-pi'
export type { SolutionData } from './types'

// Solution data registry for easy access
export const solutionRegistry = {
  'jetson-orin-nano': () => import('./jetson-orin-nano').then((m) => m.jetsonOrinNanoData),
  'jetson-orin-nx': () => import('./jetson-orin-nx').then((m) => m.jetsonOrinNxData),
  'frdm-93': () => import('./frdm-93').then((m) => m.frdm93Data),
  'icam-540': () => import('./icam-540').then((m) => m.icam540Data),
  imx8mp: () => import('./imx8mp').then((m) => m.imx8mpData),
  onlogi: () => import('./onlogic').then((m) => m.onlogicData),
  'qualcomm-iq9': () => import('./qualcomm-iq9').then((m) => m.qualcommIq9Data),
  'rubik-pi': () => import('./rubik-pi').then((m) => m.rubikPiData),
  'seeed-reterminal': () => import('./seeed-reterminal').then((m) => m.seeedReterminalData),
  'stm32mp257f-dk': () => import('./stm32mp257f-dk').then((m) => m.stm32mp257fDkData),
  'raspberry-pi': () => import('./raspberry-pi').then((m) => m.raspberryPiData),
}

export const solutionIds = Object.keys(solutionRegistry)
