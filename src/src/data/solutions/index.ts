export { advantechIcam540Data } from './advantech/icam-540'
export { nvidiaJetsonAgxOrinData } from './nvidia/jetson-agx-orin'
export { nvidiaJetsonOrinNanoData } from './nvidia/jetson-orin-nano'
export { nvidiaJetsonOrinNxData } from './nvidia/jetson-orin-nx'
export { nxpFrdm93Data } from './nxp/frdm-93'
export { nxpImx8mpData } from './nxp/imx8mp'
export { onlogicFr201Data } from './onlogic/fr201'
export { qualcommIq9Data } from './qualcomm/iq9'
export { qualcommRubikPiData } from './qualcomm/rubik-pi'
export { raspberryPi4ModelBData } from './raspberry-pi/raspberry-pi-4-model-b'
export { raspberryPi5Data } from './raspberry-pi/raspberry-pi-5'
export { seeedReterminalData } from './seeed/reterminal'
export { stm32mp257fDkData } from './stmicroelectronics/stm32mp257f-dk'
export type { SolutionData } from './types'

// Solution data registry for easy access
export const solutionRegistry = {
  'jetson-orin-nano': () =>
    import('./nvidia/jetson-orin-nano').then((m) => m.nvidiaJetsonOrinNanoData),
  'jetson-orin-nx': () => import('./nvidia/jetson-orin-nx').then((m) => m.nvidiaJetsonOrinNxData),
  'jetson-agx-orin': () =>
    import('./nvidia/jetson-agx-orin').then((m) => m.nvidiaJetsonAgxOrinData),
  'frdm-93': () => import('./nxp/frdm-93').then((m) => m.frdm93Data),
  'icam-540': () => import('./advantech/icam-540').then((m) => m.icam540Data),
  imx8mp: () => import('./nxp/imx8mp').then((m) => m.imx8mpData),
  onlogi: () => import('./onlogic/fr201').then((m) => m.onlogicData),
  'qualcomm-iq9': () => import('./qualcomm/iq9').then((m) => m.qualcommIq9Data),
  'rubik-pi': () => import('./qualcomm/rubik-pi').then((m) => m.rubikPiData),
  'seeed-reterminal': () => import('./seeed/reterminal').then((m) => m.seeedReterminalData),
  'stm32mp257f-dk': () =>
    import('./stmicroelectronics/stm32mp257f-dk').then((m) => m.stm32mp257fDkData),
  'raspberry-pi-4-model-b': () =>
    import('./raspberry-pi/raspberry-pi-4-model-b').then((m) => m.raspberryPi4ModelBData),
  'raspberry-pi-5': () => import('./raspberry-pi/raspberry-pi-5').then((m) => m.raspberryPi5Data),
}

export const solutionIds = Object.keys(solutionRegistry)
