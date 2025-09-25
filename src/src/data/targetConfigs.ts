export type RunType = 'qemu' | 'sd-card' | 'usb-power-cycle'

export interface TargetConfig {
  /** Target identifier used in avocado init command */
  target: string
  /** Suggested project directory name */
  projectName: string
  /** Display name for the target */
  displayName: string

  /** Whether this target supports macOS development */
  supportsMac?: boolean
  /** Provision profile to use (e.g., "sd") */
  provisionProfile?: string
  /** Required disk space for provisioning in GB (e.g., 8, 16) */
  diskSpace?: number
  /** Additional prerequisites or notes */
  additionalNotes?: string
  /** Custom description for the target */
  description?: string
  /** Type of run instructions to show */
  runType?: RunType
}

export const targetConfigs: Record<string, TargetConfig> = {
  raspberrypi4: {
    target: 'raspberrypi4',
    projectName: 'raspberrypi4',
    displayName: 'Raspberry Pi 4 Model B',
    supportsMac: false,
    provisionProfile: 'sd',
    diskSpace: 8,
    runType: 'sd-card',
  },
  raspberrypi5: {
    target: 'raspberrypi5',
    projectName: 'raspberrypi5',
    displayName: 'Raspberry Pi 5',
    supportsMac: false,
    provisionProfile: 'sd',
    runType: 'sd-card',
    diskSpace: 8,
  },
  'qemux86-64': {
    target: 'qemux86-64',
    projectName: 'qemux86-64',
    displayName: 'QEMU x86-64',
    supportsMac: true,
    runType: 'qemu',
    diskSpace: 8,
  },
  'qemu-arm': {
    target: 'qemuarm64',
    projectName: 'qemuarm64',
    displayName: 'QEMU ARM',
    supportsMac: true,
    runType: 'qemu',
    diskSpace: 8,
  },
  'jetson-orin-nano': {
    target: 'jetson-orin-nano-devkit',
    projectName: 'jetson-orin-nano-devkit',
    displayName: 'NVIDIA Jetson Orin Nano',
    supportsMac: false,
    diskSpace: 16,
    runType: 'usb-power-cycle',
  },
  'frdm-imx-93': {
    target: 'imx93-frdm',
    projectName: 'imx93-frdm',
    displayName: 'NXP FRDM-IMX-93',
    supportsMac: false,
    provisionProfile: 'sd',
    runType: 'sd-card',
    diskSpace: 8,
  },
  imx8mp: {
    target: 'imx8mp-evk',
    projectName: 'imx8mp-evk',
    displayName: 'NXP i.MX8M Plus',
    supportsMac: false,
    provisionProfile: 'sd',
    runType: 'sd-card',
    diskSpace: 8,
  },
  fr201: {
    target: 'fr201',
    projectName: 'fr201',
    displayName: 'OnLogic FR201',
    supportsMac: false,
    provisionProfile: 'usb',
    runType: 'sd-card',
    diskSpace: 8,
  },
  'icam-540': {
    target: 'icam-540',
    projectName: 'icam-540',
    displayName: 'Advantech ICAM-540',
    supportsMac: false,
    runType: 'usb-power-cycle',
    diskSpace: 8,
  },
  reterminal: {
    target: 'reterminal',
    projectName: 'reterminal',
    displayName: 'Seeed reTerminal',
    supportsMac: false,
    provisionProfile: 'sd',
    runType: 'sd-card',
    diskSpace: 8,
  },
  'stm32mp257f-dk': {
    target: 'stm32mp257f-dk',
    projectName: 'stm32mp257f-dk',
    displayName: 'STMicroelectronics STM32MP257F-DK',
    supportsMac: false,
    provisionProfile: 'sd',
    runType: 'sd-card',
    diskSpace: 8,
  },
}

/**
 * Get target configuration by target identifier
 */
export function getTargetConfig(targetId: string): TargetConfig | undefined {
  return targetConfigs[targetId]
}

/**
 * Get all available target configurations
 */
export function getAllTargetConfigs(): TargetConfig[] {
  return Object.values(targetConfigs)
}
