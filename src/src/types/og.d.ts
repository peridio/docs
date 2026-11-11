// Types for the plain-JS Open Graph helpers that TSX components import.

declare module '@site/scripts/og/routes.mjs' {
  /** `/hardware/nxp/imx8mp` -> `/og/hardware/nxp/imx8mp.png` */
  export function cardPathFor(permalink: string): string
}

declare module '@site/scripts/og/tokens.mjs' {
  export const OG_CANVAS: { width: number; height: number }
}
