import React from 'react'
import Link from '@docusaurus/Link'
import DataTable from '../DataTable'
import advantechData from '../../data/hardware/under-evaluation-advantech.json'
import nvidiaData from '../../data/hardware/under-evaluation-nvidia.json'
import qualcommData from '../../data/hardware/under-evaluation-qualcomm.json'
import nxpData from '../../data/hardware/under-evaluation-nxp.json'
import renesasData from '../../data/hardware/under-evaluation-renesas.json'

const PAGE_SLUGS = {
  'Advantech MIC-715-OX': 'mic-715-ox',
  'Advantech TPC-115W': 'tpc-115w',
  'Advantech ICAM 300': 'icam-300',
  'Advantech MIC-733-AO': 'mic-733-ao',
  'ASUS IoT Rugged Edge (PE1100N, PE100N)': 'asus-pe1100n',
  'CompuLab EdgeAI-ORN': 'compulab-edgeai-orn',
  'Connect Tech Rudi Embedded System': 'connect-tech-rudi',
  'Jetson AGX Thor': 'jetson-agx-thor',
  'PI-SG565D Smart MOB Development Board': 'pi-sg565d',
  'IQ-9075': 'iq-9075',
  'Rubik Pi 3': 'rubik-pi-3',
  'AXON-IMX8M-PLUS': 'axon-imx8m-plus',
  'FRDM-i.MX 95': 'frdm-imx-95',
  'Ara240 16GB M.2 Module': 'ara240',
  'SolidRun IIoT-200 RZ/G2L Gateway': 'iiot-200',
  'RZ/V2H': 'rz-v2h',
}

const columns = [
  {
    key: 'name',
    header: 'Product name',
    align: 'left',
    render: (d) => {
      const slug = PAGE_SLUGS[d.name]
      if (slug) {
        return (
          <strong>
            <Link to={`/hardware/under-evaluation/${slug}`}>{d.name}</Link>
          </strong>
        )
      }
      return <strong>{d.name}</strong>
    },
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
