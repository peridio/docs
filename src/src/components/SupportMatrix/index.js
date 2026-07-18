import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import DataTable from '../DataTable'
import { StatusIndicator } from '../DataTable/StatusIndicator'
import { Legend } from '../DataTable/Legend'
import styles from '../DataTable/styles.module.css'
import supportedData from '../../data/hardware/supported.json'
import virtualEnvironmentData from '../../data/hardware/virtual-environment.json'

function DeviceLink({ device }) {
  if (!device.url) {
    return <strong>{device.name}</strong>
  }
  if (device.external) {
    return (
      <strong>
        <Link href={device.url} target="_blank" rel="noopener noreferrer">
          {device.name}
        </Link>
      </strong>
    )
  }
  return (
    <strong>
      <Link to={device.url}>{device.name}</Link>
    </strong>
  )
}

const columns = [
  {
    key: 'name',
    header: 'Hardware',
    width: '34%',
    align: 'left',
    render: (device) => <DeviceLink device={device} />,
  },
  {
    key: 'target',
    header: 'Target',
    width: '19%',
    align: 'left',
    render: (device) => (device.target ? <code>{device.target}</code> : '—'),
  },
  {
    key: 'board',
    header: 'Board',
    width: '19%',
    align: 'left',
    render: (device) => (device.board ? <code>{device.board}</code> : '—'),
  },
  {
    key: 'lts2024',
    header: '2024 (scarthgap)',
    render: (d) => (
      <StatusIndicator status={(d.lts && d.lts['2024']) || 'none'} showLabel={false} />
    ),
  },
  {
    key: 'lts2026',
    header: '2026 (wrynose)',
    render: (d) => (
      <StatusIndicator status={(d.lts && d.lts['2026']) || 'none'} showLabel={false} />
    ),
  },
]

export default function SupportMatrix() {
  const data = [
    { category: supportedData.category, rows: supportedData.devices },
    {
      category: virtualEnvironmentData.category,
      rows: virtualEnvironmentData.devices,
    },
  ]

  return (
    <div>
      <div className={styles.sectionHeader}>
        <Heading as="h2" id="supported">
          Supported
        </Heading>
        <Legend />
      </div>
      <DataTable columns={columns} data={data} ariaLabel="Hardware support matrix" />
    </div>
  )
}
