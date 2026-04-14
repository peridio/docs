import React from 'react'
import DataTable from '../DataTable'
import advantechData from '../../data/hardware/under-evaluation-advantech.json'
import nvidiaData from '../../data/hardware/under-evaluation-nvidia.json'
import qualcommData from '../../data/hardware/under-evaluation-qualcomm.json'
import nxpData from '../../data/hardware/under-evaluation-nxp.json'
import renesasData from '../../data/hardware/under-evaluation-renesas.json'

const columns = [
  {
    key: 'name',
    header: 'Product name',
    align: 'left',
    render: (d) => <strong>{d.name}</strong>,
  },
  {
    key: 'vendor',
    header: 'Vendor',
    align: 'left',
  },
  {
    key: 'chipset',
    header: 'Chipset',
    align: 'left',
  },
]

export default function UnderEvaluationMatrix() {
  const data = [advantechData, nvidiaData, qualcommData, nxpData, renesasData].map((d) => ({
    category: d.category,
    rows: d.devices,
  }))

  return <DataTable columns={columns} data={data} ariaLabel="Under evaluation hardware matrix" />
}
