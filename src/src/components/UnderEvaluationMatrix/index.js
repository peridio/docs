import React from 'react'
import Link from '@docusaurus/Link'
import DataTable from '../DataTable'
import advantechData from '../../data/hardware/under-evaluation-advantech.json'
import nvidiaData from '../../data/hardware/under-evaluation-nvidia.json'
import qualcommData from '../../data/hardware/under-evaluation-qualcomm.json'
import nxpData from '../../data/hardware/under-evaluation-nxp.json'
import renesasData from '../../data/hardware/under-evaluation-renesas.json'
import lannerData from '../../data/hardware/under-evaluation-lanner.json'
import grinnData from '../../data/hardware/under-evaluation-grinn.json'
import asusData from '../../data/hardware/under-evaluation-asus.json'
import compulabData from '../../data/hardware/under-evaluation-compulab.json'
import connectTechData from '../../data/hardware/under-evaluation-connecttech.json'
import technexionData from '../../data/hardware/under-evaluation-technexion.json'
import quectelData from '../../data/hardware/under-evaluation-quectel.json'
import innodiskData from '../../data/hardware/under-evaluation-innodisk.json'

const PAGE_SLUGS = {
  'Advantech MIC-715-OX': 'mic-715-ox',
  'Advantech TPC-115W': 'tpc-115w',
  'Advantech ICAM 300': 'icam-300',
  'ASUS IoT Rugged Edge (PE1100N, PE100N)': 'asus-pe1100n',
  'CompuLab EdgeAI-ORN': 'compulab-edgeai-orn',
  'Connect Tech Rogue Carrier': 'connect-tech-rogue',
  'Connect Tech Rudi Embedded System': 'connect-tech-rudi',
  'Jetson AGX Thor': 'jetson-agx-thor',
  'PI-SG565D Smart MOB Development Board': 'pi-sg565d',
  'IQ-9075': 'iq-9075',
  'Rubik Pi 3': 'rubik-pi-3',
  'AXON-IMX8M-PLUS': 'axon-imx8m-plus',
  'FRDM-i.MX 95': 'frdm-imx-95',
  'Ara240 16GB M.2 Module': 'ara240',
  'RZ/V2H Robot RDK': 'rz-v2h',
  'Lanner EAI-I132': 'eai-i132',
  'Synaptics Coral Dev Board': 'coral-dev-board',
  'Innodisk EXEC-Q911': 'exec-q911',
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
  const data = [
    advantechData,
    nvidiaData,
    qualcommData,
    nxpData,
    renesasData,
    lannerData,
    grinnData,
    asusData,
    compulabData,
    connectTechData,
    technexionData,
    quectelData,
    innodiskData,
  ]
    .map((d) => ({
      category: d.category,
      rows: d.devices,
    }))
    .sort((a, b) => a.category.localeCompare(b.category))

  return <DataTable columns={columns} data={data} ariaLabel="Under evaluation hardware matrix" />
}
