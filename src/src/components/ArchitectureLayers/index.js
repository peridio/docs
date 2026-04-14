import React from 'react'
import DataTable from '../DataTable'

const columns = [
  { key: 'layer', header: 'Layer', width: '30%', align: 'left' },
  { key: 'description', header: 'Description', align: 'left' },
]

const data = [
  {
    rows: [
      { layer: 'Boot Files', description: 'Bootloader and boot configuration per slot (A/B)' },
      {
        layer: 'Board Support Package',
        description: 'Hardware-specific kernel, initramfs, and drivers',
      },
      { layer: 'Avocado Linux', description: 'Immutable base OS (SquashFS, read-only)' },
      {
        layer: 'Avocado Extensions',
        description: 'Applications, configs, kernel modules (SquashFS, read-only)',
      },
      {
        layer: 'System Storage',
        description: 'Services, config, and app data (/var, BTRFS, read-write)',
      },
    ],
  },
]

export default function ArchitectureLayers() {
  return (
    <DataTable
      columns={columns}
      data={data}
      ariaLabel="Immutable system architecture layers"
      showCategoryHeaders={false}
    />
  )
}
