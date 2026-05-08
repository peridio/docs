/**
 * Best-effort target → CPU-arch repo mapping.
 *
 * The Avocado package feed at https://repo.avocadolinux.org/{release}/{channel}/target/
 * splits packages across two relevant prefixes per target:
 *
 *   - target/{target}/        avocado-specific RPMs (e.g. avocado-bsp-..., avocado-hitl)
 *   - target/{cpuArch}/       general Linux packages (e.g. openssh, curl, python3)
 *
 * The CPU-arch dir name is determined by the SDK image's BSP at build time, not by
 * the CLI source — so we mirror it here. If a value is wrong, packages from the
 * general feed simply won't show up; flip the mapping and search works again.
 */
export const TARGET_ARCH: Record<string, string | null> = {
  // Raspberry Pi
  raspberrypi5: 'cortexa76',
  raspberrypi4: 'cortexa72',
  'raspberrypi0-2w': 'cortexa53',

  // NXP i.MX
  'imx8mp-evk': 'cortexa53_crypto_mx8mp',
  'imx91-frdm': 'cortexa55_mx91',
  'imx93-evk': 'cortexa55_mx93',
  'imx93-frdm': 'cortexa55_mx93',

  // NVIDIA Jetson (Tegra234 platform)
  'jetson-orin-nano-devkit': 'armv8a_tegra234',
  'jetson-agx-orin-devkit': 'armv8a_tegra234',

  // Advantech ICAM-540 (Jetson Orin NX → Tegra234)
  'icam-540': 'armv8a_tegra234',

  // Intel x86-64 + OnLogic FR201 (Intel)
  'intel-x86-64-v2': 'core2_64',
  'intel-x86-64-v3': 'core2_64',
  fr201: 'core2_64',

  // Seeed reTerminal (CM4 → A72) and reTerminal DM (RK3588S, A76 + A55)
  reterminal: 'cortexa72',
  'reterminal-dm': 'cortexa76',

  // STMicroelectronics STM32MP25 (Cortex-A35 — generic ARMv8-A bucket)
  'stm32mp257f-dk': 'armv8a',

  // Grinn AstraSOM-1680 (Synaptics Astra SL1680, quad A73)
  'grinn-astra-1680-sbc': 'cortexa73',

  // SolidRun HummingBoard RZ/V2N AIOT (Renesas RZ/V2N, quad A55 → ARMv8.2-A)
  'rzv2n-sr-som': 'armv8_2a',

  // QEMU
  qemuarm64: 'armv8a',
  'qemux86-64': 'core2_64',
}

export function archForTarget(target: string): string | null {
  return TARGET_ARCH[target] ?? null
}
