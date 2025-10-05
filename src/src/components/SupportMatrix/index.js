import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import './support-matrix.css'

// Import JSON data files
import productionReadyData from '../../data/hardware/production-ready.json'
import siliconData from '../../data/hardware/silicon.json'
import virtualEnvironmentData from '../../data/hardware/virtual-environment.json'

const statusConfig = {
  full: {
    className: 'status-full',
    title: 'Fully Supported',
    symbol: '●',
  },
  partial: {
    className: 'status-partial',
    title: 'In Development',
    symbol: '●',
  },
  none: {
    className: 'status-none',
    title: 'Not Supported',
    symbol: '●',
  },
}

const featureColumns = [
  { key: 'provisioning', label: 'Provisioning' },
  { key: 'hitl', label: 'HITL' },
  { key: 'sideLoading', label: 'Sideloading' },
  { key: 'ota', label: 'OTA' },
  { key: 'remoteAccessTunnels', label: 'Remote Access Tunnels' },
]

function getCombinedOtaStatus(features) {
  const extensionOta = features.extensionOta || 'none'
  const osOta = features.osOta || 'none'

  // If either is full, return full
  if (extensionOta === 'full' || osOta === 'full') {
    return 'full'
  }

  // If either is partial, return partial
  if (extensionOta === 'partial' || osOta === 'partial') {
    return 'partial'
  }

  // Otherwise return none
  return 'none'
}

function StatusIndicator({ status }) {
  const config = statusConfig[status] || statusConfig.none
  return (
    <span className={config.className} title={config.title}>
      {config.symbol}
    </span>
  )
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

function SupportMatrixTable({ data, showCategoryHeaders = true }) {
  return (
    <div className="support-matrix-container">
      <table className="support-matrix">
        <thead>
          <tr>
            <th>Hardware</th>
            {featureColumns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((categoryData, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              {showCategoryHeaders && (
                <tr className="category-header">
                  <td colSpan={featureColumns.length + 1}>
                    <strong>{categoryData.category}</strong>
                  </td>
                </tr>
              )}
              {categoryData.devices.map((device, deviceIndex) => (
                <tr key={`${categoryIndex}-${deviceIndex}`}>
                  <td>
                    <DeviceLink device={device} />
                  </td>
                  {featureColumns.map((column) => (
                    <td key={column.key}>
                      <StatusIndicator
                        status={
                          column.key === 'ota'
                            ? getCombinedOtaStatus(device.features)
                            : device.features[column.key]
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SupportLegend() {
  return (
    <div className="support-legend">
      <Heading as="h3">Legend</Heading>
      <ul>
        {Object.entries(statusConfig).map(([status, config]) => (
          <li key={status}>
            <span className={config.className}>{config.symbol}</span> {config.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SupportMatrix() {
  const mainSupportData = [productionReadyData, siliconData, virtualEnvironmentData]

  return (
    <div>
      <SupportMatrixTable data={mainSupportData} />
      <SupportLegend />
    </div>
  )
}
