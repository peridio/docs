import React, { useState } from 'react'
import Link from '@docusaurus/Link'
import PropTypes from 'prop-types'

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const menuSections = [
    {
      title: 'Featured Hardware',
      items: [
        { label: 'NXP IMX8MP', to: '/solutions/nxp/imx8mp' },
        { label: 'NXP FRDM 93', to: '/solutions/nxp/frdm-93' },
        { label: 'Raspberry Pi', to: '/solutions/raspberry-pi/raspberry-pi' },
        { label: 'NVIDIA Jetson', to: '/solutions/nvidia/jetson-orin-nano' },
        { label: 'Advantech ICAM 540', to: '/solutions/advantech/icam-540' },
        { label: 'OnLogic FR201', to: '/solutions/onlogic' },
        { label: 'Seeed reTerminal', to: '/solutions/seeed' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { label: 'CLI', to: '/cli' },
        { label: 'Device API', to: '/device-api' },
        { label: 'Admin API', to: '/admin-api' },
        { label: 'Peridio Agent', to: '/dev-center/agents/peridio-agent' },
      ],
    },
  ]

  if (!isOpen) return null

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu">
        <div className="mobile-menu-header">
          <button className="mobile-menu-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <Link
              to="/"
              className="mobile-menu-section-title"
              onClick={onClose}
            >
              Developer Center
            </Link>
          </div>
          {menuSections.map((section, index) => (
            <div key={index} className="mobile-menu-section">
              <button className="mobile-menu-section-title" onClick={() => toggleSection(index)}>
                {section.title}
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  className={`mobile-menu-arrow ${expandedSection === index ? 'expanded' : ''}`}
                  aria-hidden="true"
                >
                  <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
              {expandedSection === index && (
                <div className="mobile-menu-items">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.to}
                      className="mobile-menu-link"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-menu-section">
            <Link
              to="https://console.peridio.com"
              className="mobile-menu-section-title"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              Web Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default MobileMenu
