import React from 'react'
import './under-evaluation-matrix.css'

// Import JSON data files
import nvidiaData from '../../data/hardware/under-evaluation-nvidia.json'
import qualcommData from '../../data/hardware/under-evaluation-qualcomm.json'
import nxpData from '../../data/hardware/under-evaluation-nxp.json'
import renesasData from '../../data/hardware/under-evaluation-renesas.json'

function UnderEvaluationMatrixTable({ data }) {
  return (
    <div className="support-matrix-container">
      <table className="support-matrix">
        <thead>
          <tr>
            <th>Product name</th>
            <th>Vendor</th>
            <th>Chipset</th>
          </tr>
        </thead>
        <tbody>
          {data.map((categoryData, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <tr className="category-header">
                <td colSpan={3}>{categoryData.category}</td>
              </tr>
              {categoryData.devices.map((device, deviceIndex) => (
                <tr key={`${categoryIndex}-${deviceIndex}`}>
                  <td>
                    <strong>{device.name}</strong>
                  </td>
                  <td>{device.vendor}</td>
                  <td>{device.chipset}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function UnderEvaluationMatrix() {
  const underEvaluationData = [nvidiaData, qualcommData, nxpData, renesasData]

  return (
    <div>
      <UnderEvaluationMatrixTable data={underEvaluationData} />
    </div>
  )
}
