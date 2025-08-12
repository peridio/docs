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
      title: 'Quickstart',
      items: [
        { label: 'EVK Demo', to: '/evk' },
        { label: 'Platform Getting Started', to: '/platform/getting-started' },
      ],
    },
    {
      title: 'Platform',
      items: [
        { label: 'Overview', to: '/platform/reference/overview' },
        { label: 'Creating Releases', to: '/platform/guides/creating-releases' },
        { label: 'Cloud-Delegated Updates', to: '/platform/guides/cloud-delegated-updates' },
        { label: 'Fleet View', to: '/platform/reference/fleet-view' },
        { label: 'CLI', to: '/cli' },
        { label: 'Admin API', to: '/admin-api' },
        { label: 'Device API', to: '/device-api' },
      ],
    },
    {
      title: 'Integration',
      items: [
        { label: 'Linux Overview', to: '/integration/linux/overview' },
        { label: 'Android Overview', to: '/integration/android/overview' },
        { label: 'Buildroot', to: '/integration/linux/build-tools/buildroot' },
        { label: 'Yocto', to: '/integration/linux/build-tools/yocto' },
      ],
    },
    {
      title: 'Build & Ship',
      items: [
        { label: 'Creating Artifacts', to: '/platform/guides/creating-artifacts' },
        { label: 'Creating Binaries', to: '/platform/guides/creating-binaries' },
        { label: 'Creating Bundles', to: '/platform/guides/creating-bundles' },
        { label: 'CA Certificates', to: '/platform/guides/creating-ca-certificates' },
      ],
    },
    {
      title: 'Operate',
      items: [
        { label: 'Creating Devices', to: '/platform/guides/creating-devices' },
        { label: 'Creating Deployments', to: '/platform/guides/creating-deployments' },
        { label: 'Creating Tunnels', to: '/platform/guides/creating-tunnels' },
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
              Log in to Web Console
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
