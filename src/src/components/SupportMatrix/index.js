import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import DataTable from '../DataTable'
import { StatusIndicator } from '../DataTable/StatusIndicator'
import { Legend } from '../DataTable/Legend'
import styles from '../DataTable/styles.module.css'
import supportedData from '../../data/hardware/supported.json'
import virtualEnvironmentData from '../../data/hardware/virtual-environment.json'

function getCombinedOtaStatus(features) {
  const extensionOta = features.extensionOta || 'none'
  const osOta = features.osOta || 'none'
  if (extensionOta === 'full' || osOta === 'full') return 'full'
  if (extensionOta === 'partial' || osOta === 'partial') return 'partial'
  return 'none'
}

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
    width: '38%',
    align: 'left',
    render: (device) => <DeviceLink device={device} />,
  },
  {
    key: 'target',
    header: 'Target',
    width: '28%',
    align: 'left',
    render: (device) => (device.target ? <code>{device.target}</code> : '—'),
  },
  {
    key: 'provisioning',
    header: 'Provisioning',
    render: (d) => <StatusIndicator status={d.features.provisioning} />,
  },
  {
    key: 'hitl',
    header: 'HITL',
    render: (d) => <StatusIndicator status={d.features.hitl} />,
  },
  {
    key: 'sideLoading',
    header: 'Sideloading',
    render: (d) => <StatusIndicator status={d.features.sideLoading} />,
  },
  {
    key: 'ota',
    header: 'OTA',
    render: (d) => <StatusIndicator status={getCombinedOtaStatus(d.features)} />,
  },
  {
    key: 'remoteAccessTunnels',
    header: 'Remote Access Tunnels',
    render: (d) => <StatusIndicator status={d.features.remoteAccessTunnels} />,
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
