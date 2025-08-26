import React, { useState } from 'react'
import Link from '@docusaurus/Link'
import PropTypes from 'prop-types'

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const isDevelopment = process.env.NODE_ENV === 'development'

  const menuSections = [
    {
      title: 'Documentation',
      items: [
        { label: 'Introduction', to: '/dev-center', category: 'Getting Started' },
        {
          label: 'Provision Device',
          to: '/dev-center/getting-started/provision-device',
          category: 'Getting Started',
        },
        {
          label: 'Hardware in the Loop',
          to: '/dev-center/getting-started/hardware-in-the-loop',
          category: 'Getting Started',
        },
        {
          label: 'Desktop Deploy',
          to: '/dev-center/getting-started/desktop-deploy',
          category: 'Getting Started',
        },
        {
          label: 'Avocado OS',
          to: '/dev-center/avocado-linux/introduction',
          category: 'Core Platforms',
        },
        {
          label: 'Peridio Core',
          to: '/dev-center/peridio-core/introduction',
          category: 'Core Platforms',
        },
        {
          label: 'Supported Hardware',
          to: '/dev-center/hardware/supported-hardware',
          category: 'Core Platforms',
        },
        { label: 'Integration Guides', to: '/dev-center/integration', category: 'Core Platforms' },
        { label: 'Tools', to: '/dev-center/tools', category: 'Resources' },
        {
          label: 'Tunnels (Remote Access)',
          to: '/dev-center/tunnels/overview',
          category: 'Resources',
        },
        {
          label: 'Webhooks',
          to: '/dev-center/integration/webhooks/overview',
          category: 'Resources',
        },
        {
          label: 'Certificates',
          to: '/dev-center/integration/certificates/overview',
          category: 'Resources',
        },
      ],
    },
    {
      title: 'Featured Hardware',
      items: [
        { label: 'NXP IMX8MP', to: '/solutions/nxp/imx8mp', category: 'Silicon' },
        { label: 'NXP FRDM 93', to: '/solutions/nxp/frdm-93', category: 'Silicon' },
        { label: 'Raspberry Pi', to: '/solutions/raspberry-pi/raspberry-pi', category: 'Silicon' },
        { label: 'NVIDIA Jetson', to: '/solutions/nvidia/jetson-orin-nano', category: 'Silicon' },
        {
          label: 'Advantech ICAM 540',
          to: '/solutions/advantech/icam-540',
          category: 'Production Ready',
        },
        { label: 'OnLogic FR201', to: '/solutions/onlogic', category: 'Production Ready' },
        { label: 'Seeed reTerminal', to: '/solutions/seeed', category: 'Production Ready' },
        ...(isDevelopment
          ? [
              { label: 'Qualcomm IQ-9', to: '/solutions/qualcomm/iq-9', category: 'Pre-review' },
              {
                label: 'Qualcomm Rubik Pi',
                to: '/solutions/qualcomm/rubik-pi',
                category: 'Pre-review',
              },
              {
                label: 'STMicro STM32MP257F',
                to: '/solutions/stmicro/stm32mp157d-dk',
                category: 'Pre-review',
              },
            ]
          : []),
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

  // Group items by category for better organization
  const groupItemsByCategory = (items) => {
    const grouped = {}
    items.forEach((item) => {
      if (item.category) {
        if (!grouped[item.category]) {
          grouped[item.category] = []
        }
        grouped[item.category].push(item)
      } else {
        if (!grouped['General']) {
          grouped['General'] = []
        }
        grouped['General'].push(item)
      }
    })
    return grouped
  }

  if (!isOpen) return null

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <img src="/img/peridio-docs-logo.svg" alt="Peridio" className="mobile-menu-logo" />
          </div>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-menu-section mobile-menu-section--primary">
            <Link
              to="/"
              className="mobile-menu-section-title mobile-menu-section-title--primary"
              onClick={onClose}
            >
              Home
            </Link>
          </div>

          {menuSections.map((section, index) => {
            const groupedItems = groupItemsByCategory(section.items)
            const hasCategories = Object.keys(groupedItems).length > 1

            return (
              <div key={index} className="mobile-menu-section">
                <button
                  className="mobile-menu-section-title"
                  onClick={() => toggleSection(index)}
                  aria-expanded={expandedSection === index}
                  aria-controls={`mobile-menu-items-${index}`}
                >
                  <span className="mobile-menu-section-header">{section.title}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className={`mobile-menu-arrow ${expandedSection === index ? 'expanded' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </button>
                <div
                  id={`mobile-menu-items-${index}`}
                  className={`mobile-menu-items ${expandedSection === index ? 'expanded' : ''}`}
                >
                  {hasCategories
                    ? Object.entries(groupedItems).map(([category, items]) => (
                        <div key={category} className="mobile-menu-category">
                          <h5 className="mobile-menu-category-title">{category}</h5>
                          {items.map((item, itemIndex) => (
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
                      ))
                    : section.items.map((item, itemIndex) => (
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
              </div>
            )
          })}

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
