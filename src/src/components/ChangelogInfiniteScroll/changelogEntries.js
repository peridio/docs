// Static imports of all changelog entries, ordered newest-first to match sidebars-changelog.js

// -- July 2026 --
import HW_2026_29 from '../../../docs-changelog/july-2026/hardware-feeds-2026.29.md'
import DESKTOP_1_1_0 from '../../../docs-changelog/july-2026/desktop-1.1.0.md'
import MCP_0_3_0 from '../../../docs-changelog/july-2026/mcp-0.3.0.md'
import CONNECT_25_7_2 from '../../../docs-changelog/july-2026/connect-25.7.2.md'
import CLI_1_0_0_RC_2 from '../../../docs-changelog/july-2026/cli-1.0.0-rc.2.md'
import DESKTOP_1_0_1 from '../../../docs-changelog/july-2026/desktop-1.0.1.md'
import V1_0_0_RC_1 from '../../../docs-changelog/july-2026/1.0.0-rc.1.mdx'
// -- June 2026 --
import MCP_0_2_0 from '../../../docs-changelog/june-2026/mcp-0.2.0.md'
import HW_2026_24 from '../../../docs-changelog/june-2026/hardware-feeds-2026.24.md'
import V0_41_1 from '../../../docs-changelog/june-2026/0.41.1.md'
import DESKTOP_0_9_0 from '../../../docs-changelog/june-2026/desktop-0.9.0.md'
import V0_41_0 from '../../../docs-changelog/june-2026/0.41.0.md'
import CONNECT_25_6_1 from '../../../docs-changelog/june-2026/connect-25.6.1.md'
// -- May 2026 --
import DESKTOP_0_8_0 from '../../../docs-changelog/may-2026/desktop-0.8.0.md'
import V0_40_2 from '../../../docs-changelog/may-2026/0.40.2.md'
import MCP_0_1_0 from '../../../docs-changelog/may-2026/mcp-0.1.0.md'
import V0_39_0 from '../../../docs-changelog/may-2026/0.39.0.md'
import V0_38_0 from '../../../docs-changelog/may-2026/0.38.0.md'
import V0_37_1 from '../../../docs-changelog/may-2026/0.37.1.md'
// -- April 2026 --
import V0_36_2 from '../../../docs-changelog/april-2026/0.36.2.md'
import V0_35_0 from '../../../docs-changelog/april-2026/0.35.0.md'
import V0_34_0 from '../../../docs-changelog/april-2026/0.34.0.md'
// -- March 2026 --
import V0_33_0 from '../../../docs-changelog/march-2026/0.33.0.md'
import V0_32_1 from '../../../docs-changelog/march-2026/0.32.1.md'
import V0_31_0 from '../../../docs-changelog/march-2026/0.31.0.md'
import V0_30_0 from '../../../docs-changelog/march-2026/0.30.0.md'
import V0_29_0 from '../../../docs-changelog/march-2026/0.29.0.md'
import V0_28_1 from '../../../docs-changelog/march-2026/0.28.1.md'
import V0_27_0 from '../../../docs-changelog/march-2026/0.27.0.md'
import V0_26_0 from '../../../docs-changelog/march-2026/0.26.0.md'
// -- February 2026 --
import V0_25_1 from '../../../docs-changelog/february-2026/0.25.1.md'
import V0_24_0 from '../../../docs-changelog/february-2026/0.24.0.md'
// -- January 2026 --
import V0_23_1 from '../../../docs-changelog/january-2026/0.23.1.md'
import V0_22_1 from '../../../docs-changelog/january-2026/0.22.1.md'
import V0_21_0 from '../../../docs-changelog/january-2026/0.21.0.md'
// -- December 2025 --
import V0_20_0 from '../../../docs-changelog/december-2025/0.20.0.md'
import V0_19_1 from '../../../docs-changelog/december-2025/0.19.1.md'
import V0_18_0 from '../../../docs-changelog/december-2025/0.18.0.md'
import V0_17_2 from '../../../docs-changelog/december-2025/0.17.2.md'
import V0_16_0 from '../../../docs-changelog/december-2025/0.16.0.md'
// -- November 2025 --
import V0_15_0 from '../../../docs-changelog/november-2025/0.15.0.md'
import V0_14_0 from '../../../docs-changelog/november-2025/0.14.0.md'
import V0_13_0 from '../../../docs-changelog/november-2025/0.13.0.md'
// -- October 2025 --
import V0_12_1 from '../../../docs-changelog/october-2025/0.12.1.md'
// -- September 2025 --
import V0_11_0 from '../../../docs-changelog/september-2025/0.11.0.md'
import V0_10_2 from '../../../docs-changelog/september-2025/0.10.2.md'
import V0_9_0 from '../../../docs-changelog/september-2025/0.9.0.md'
import V0_8_0 from '../../../docs-changelog/september-2025/0.8.0.md'

/** Product tabs shown above the feed. 'all' renders the master changelog. */
export const PRODUCTS = [
  { id: 'all', label: 'All' },
  { id: 'cli', label: 'CLI' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mcp', label: 'MCP' },
  { id: 'connect', label: 'Connect' },
  { id: 'hardware', label: 'Hardware Feeds' },
]

/**
 * Flat ordered array of all changelog entries, newest first.
 * Order matches sidebars-changelog.js exactly.
 * Entries without an explicit `product` are CLI releases.
 */
const rawEntries = [
  {
    product: 'hardware',
    version: 'Hardware Feeds 2026.29',
    monthSlug: 'july-2026',
    monthLabel: 'July 2026',
    permalink: '/changelog/july-2026/hardware-feeds-2026.29',
    Component: HW_2026_29,
  },
  {
    product: 'desktop',
    version: 'Desktop 1.1.0',
    monthSlug: 'july-2026',
    monthLabel: 'July 2026',
    permalink: '/changelog/july-2026/desktop-1.1.0',
    Component: DESKTOP_1_1_0,
  },
  {
    product: 'mcp',
    version: 'MCP 0.3.0',
    monthSlug: 'july-2026',
    monthLabel: 'July 2026',
    permalink: '/changelog/july-2026/mcp-0.3.0',
    Component: MCP_0_3_0,
  },
  {
    product: 'connect',
    version: 'Connect 25.7.2',
    monthSlug: 'july-2026',
    monthLabel: 'July 2026',
    permalink: '/changelog/july-2026/connect-25.7.2',
    Component: CONNECT_25_7_2,
  },
  {
    product: 'cli',
    version: 'CLI 1.0.0-rc.2',
    monthSlug: 'july-2026',
    monthLabel: 'July 2026',
    permalink: '/changelog/july-2026/cli-1.0.0-rc.2',
    Component: CLI_1_0_0_RC_2,
  },
  {
    product: 'desktop',
    version: 'Desktop 1.0.1',
    monthSlug: 'july-2026',
    monthLabel: 'July 2026',
    permalink: '/changelog/july-2026/desktop-1.0.1',
    Component: DESKTOP_1_0_1,
  },
  {
    version: '1.0.0-rc.1',
    monthSlug: 'july-2026',
    monthLabel: 'July 2026',
    permalink: '/changelog/july-2026/1.0.0-rc.1',
    Component: V1_0_0_RC_1,
  },
  {
    product: 'mcp',
    version: 'MCP 0.2.0',
    monthSlug: 'june-2026',
    monthLabel: 'June 2026',
    permalink: '/changelog/june-2026/mcp-0.2.0',
    Component: MCP_0_2_0,
  },
  {
    product: 'hardware',
    version: 'Hardware Feeds 2026.24',
    monthSlug: 'june-2026',
    monthLabel: 'June 2026',
    permalink: '/changelog/june-2026/hardware-feeds-2026.24',
    Component: HW_2026_24,
  },
  {
    version: '0.41.1',
    monthSlug: 'june-2026',
    monthLabel: 'June 2026',
    permalink: '/changelog/june-2026/0.41.1',
    Component: V0_41_1,
  },
  {
    product: 'desktop',
    version: 'Desktop 0.9.0',
    monthSlug: 'june-2026',
    monthLabel: 'June 2026',
    permalink: '/changelog/june-2026/desktop-0.9.0',
    Component: DESKTOP_0_9_0,
  },
  {
    version: '0.41.0',
    monthSlug: 'june-2026',
    monthLabel: 'June 2026',
    permalink: '/changelog/june-2026/0.41.0',
    Component: V0_41_0,
  },
  {
    product: 'connect',
    version: 'Connect 25.6.1',
    monthSlug: 'june-2026',
    monthLabel: 'June 2026',
    permalink: '/changelog/june-2026/connect-25.6.1',
    Component: CONNECT_25_6_1,
  },

  {
    product: 'desktop',
    version: 'Desktop 0.8.0',
    monthSlug: 'may-2026',
    monthLabel: 'May 2026',
    permalink: '/changelog/may-2026/desktop-0.8.0',
    Component: DESKTOP_0_8_0,
  },
  {
    version: '0.40.2',
    monthSlug: 'may-2026',
    monthLabel: 'May 2026',
    permalink: '/changelog/may-2026/0.40.2',
    Component: V0_40_2,
  },
  {
    product: 'mcp',
    version: 'MCP 0.1.0',
    monthSlug: 'may-2026',
    monthLabel: 'May 2026',
    permalink: '/changelog/may-2026/mcp-0.1.0',
    Component: MCP_0_1_0,
  },
  {
    version: '0.39.0',
    monthSlug: 'may-2026',
    monthLabel: 'May 2026',
    permalink: '/changelog/may-2026/0.39.0',
    Component: V0_39_0,
  },
  {
    version: '0.38.0',
    monthSlug: 'may-2026',
    monthLabel: 'May 2026',
    permalink: '/changelog/may-2026/0.38.0',
    Component: V0_38_0,
  },
  {
    version: '0.37.1',
    monthSlug: 'may-2026',
    monthLabel: 'May 2026',
    permalink: '/changelog/may-2026/0.37.1',
    Component: V0_37_1,
  },

  {
    version: '0.36.2',
    monthSlug: 'april-2026',
    monthLabel: 'April 2026',
    permalink: '/changelog/april-2026/0.36.2',
    Component: V0_36_2,
  },

  {
    version: '0.35.0',
    monthSlug: 'april-2026',
    monthLabel: 'April 2026',
    permalink: '/changelog/april-2026/0.35.0',
    Component: V0_35_0,
  },

  {
    version: '0.34.0',
    monthSlug: 'april-2026',
    monthLabel: 'April 2026',
    permalink: '/changelog/april-2026/0.34.0',
    Component: V0_34_0,
  },

  {
    version: '0.33.0',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.33.0',
    Component: V0_33_0,
  },
  {
    version: '0.32.1',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.32.1',
    Component: V0_32_1,
  },
  {
    version: '0.31.0',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.31.0',
    Component: V0_31_0,
  },
  {
    version: '0.30.0',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.30.0',
    Component: V0_30_0,
  },
  {
    version: '0.29.0',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.29.0',
    Component: V0_29_0,
  },
  {
    version: '0.28.1',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.28.1',
    Component: V0_28_1,
  },
  {
    version: '0.27.0',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.27.0',
    Component: V0_27_0,
  },
  {
    version: '0.26.0',
    monthSlug: 'march-2026',
    monthLabel: 'March 2026',
    permalink: '/changelog/march-2026/0.26.0',
    Component: V0_26_0,
  },

  {
    version: '0.25.1',
    monthSlug: 'february-2026',
    monthLabel: 'February 2026',
    permalink: '/changelog/february-2026/0.25.1',
    Component: V0_25_1,
  },
  {
    version: '0.24.0',
    monthSlug: 'february-2026',
    monthLabel: 'February 2026',
    permalink: '/changelog/february-2026/0.24.0',
    Component: V0_24_0,
  },

  {
    version: '0.23.1',
    monthSlug: 'january-2026',
    monthLabel: 'January 2026',
    permalink: '/changelog/january-2026/0.23.1',
    Component: V0_23_1,
  },
  {
    version: '0.22.1',
    monthSlug: 'january-2026',
    monthLabel: 'January 2026',
    permalink: '/changelog/january-2026/0.22.1',
    Component: V0_22_1,
  },
  {
    version: '0.21.0',
    monthSlug: 'january-2026',
    monthLabel: 'January 2026',
    permalink: '/changelog/january-2026/0.21.0',
    Component: V0_21_0,
  },

  {
    version: '0.20.0',
    monthSlug: 'december-2025',
    monthLabel: 'December 2025',
    permalink: '/changelog/december-2025/0.20.0',
    Component: V0_20_0,
  },
  {
    version: '0.19.1',
    monthSlug: 'december-2025',
    monthLabel: 'December 2025',
    permalink: '/changelog/december-2025/0.19.1',
    Component: V0_19_1,
  },
  {
    version: '0.18.0',
    monthSlug: 'december-2025',
    monthLabel: 'December 2025',
    permalink: '/changelog/december-2025/0.18.0',
    Component: V0_18_0,
  },
  {
    version: '0.17.2',
    monthSlug: 'december-2025',
    monthLabel: 'December 2025',
    permalink: '/changelog/december-2025/0.17.2',
    Component: V0_17_2,
  },
  {
    version: '0.16.0',
    monthSlug: 'december-2025',
    monthLabel: 'December 2025',
    permalink: '/changelog/december-2025/0.16.0',
    Component: V0_16_0,
  },

  {
    version: '0.15.0',
    monthSlug: 'november-2025',
    monthLabel: 'November 2025',
    permalink: '/changelog/november-2025/0.15.0',
    Component: V0_15_0,
  },
  {
    version: '0.14.0',
    monthSlug: 'november-2025',
    monthLabel: 'November 2025',
    permalink: '/changelog/november-2025/0.14.0',
    Component: V0_14_0,
  },
  {
    version: '0.13.0',
    monthSlug: 'november-2025',
    monthLabel: 'November 2025',
    permalink: '/changelog/november-2025/0.13.0',
    Component: V0_13_0,
  },

  {
    version: '0.12.1',
    monthSlug: 'october-2025',
    monthLabel: 'October 2025',
    permalink: '/changelog/october-2025/0.12.1',
    Component: V0_12_1,
  },

  {
    version: '0.11.0',
    monthSlug: 'september-2025',
    monthLabel: 'September 2025',
    permalink: '/changelog/september-2025/0.11.0',
    Component: V0_11_0,
  },
  {
    version: '0.10.2',
    monthSlug: 'september-2025',
    monthLabel: 'September 2025',
    permalink: '/changelog/september-2025/0.10.2',
    Component: V0_10_2,
  },
  {
    version: '0.9.0',
    monthSlug: 'september-2025',
    monthLabel: 'September 2025',
    permalink: '/changelog/september-2025/0.9.0',
    Component: V0_9_0,
  },
  {
    version: '0.8.0',
    monthSlug: 'september-2025',
    monthLabel: 'September 2025',
    permalink: '/changelog/september-2025/0.8.0',
    Component: V0_8_0,
  },
]

export const entries = rawEntries.map((e) => ({ product: 'cli', ...e }))
