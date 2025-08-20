import React, { useState, useRef, useEffect } from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useThemeConfig } from '@docusaurus/theme-common'
import MobileMenu from './MobileMenu'
import Heading from '@theme/Heading'
import './styles.css'

const MegaMenuNavbar = () => {
  const { navbar } = useThemeConfig()
  const [activeMenu, setActiveMenu] = useState(null)
  const [toggledMenu, setToggledMenu] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMegaMenuHidden, setIsMegaMenuHidden] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveMenu(menuKey)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  const handleMenuClick = (menuKey) => {
    if (toggledMenu === menuKey) {
      // Add fade-out animation before hiding
      const dropdown = document.querySelector(`[data-menu="${menuKey}"] .mega-menu-dropdown`);
      if (dropdown) {
        dropdown.classList.add('fade-out');
        setTimeout(() => {
          setToggledMenu(null);
        }, 200); // Match the CSS transition duration
      } else {
        setToggledMenu(null);
      }
    } else {
      setToggledMenu(menuKey)
    }
  }

  const handleLinkClick = () => {
    if (toggledMenu) {
      // Add fade-out animation before hiding
      const dropdown = document.querySelector(`[data-menu="${toggledMenu}"] .mega-menu-dropdown`);
      if (dropdown) {
        dropdown.classList.add('fade-out');
        setTimeout(() => {
          setToggledMenu(null);
        }, 200); // Match the CSS transition duration
      } else {
        setToggledMenu(null);
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mega-menu-item') && toggledMenu) {
        // Add fade-out animation before hiding
        const dropdown = document.querySelector(`[data-menu="${toggledMenu}"] .mega-menu-dropdown`);
        if (dropdown) {
          dropdown.classList.add('fade-out');
          setTimeout(() => {
            setToggledMenu(null);
          }, 200); // Match the CSS transition duration
        } else {
          setToggledMenu(null);
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [toggledMenu])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMegaMenuHidden(window.innerWidth <= 996)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const isDevelopment = process.env.NODE_ENV === 'development'
  
  const megaMenuItems = {
    documentation: {
      label: 'Documentation',
      linkTo: '/dev-center',
      sections: [
        {
          title: 'Getting Started',
          items: [
            { label: 'Introduction', to: '/dev-center' },
            { label: 'Provision Device', to: '/dev-center/getting-started/provision-device' },
            { label: 'Hardware in the Loop', to: '/dev-center/getting-started/hardware-in-the-loop' },
            { label: 'Desktop Deploy', to: '/dev-center/getting-started/desktop-deploy' },
          ],
        },
        {
          title: 'Core Platforms',
          items: [
            { label: 'Avocado OS', to: '/dev-center/avocado-linux/introduction' },
            { label: 'Peridio Core', to: '/dev-center/peridio-core/introduction' },
            { label: 'Supported Hardware', to: '/dev-center/hardware/supported-hardware' },
            { label: 'Integration Guides', to: '/dev-center/integration' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Tools', to: '/dev-center/tools' },
            { label: 'Tunnels (Remote Access)', to: '/dev-center/tunnels/overview' },
            { label: 'Webhooks', to: '/dev-center/integration/webhooks/overview' },
            { label: 'Certificates', to: '/dev-center/integration/certificates/overview' },
          ],
        },
      ],
      twoColumn: true,
    },
    hardware: {
      label: 'Featured Hardware',
      sections: [
        {
          title: 'Silicon',
          items: [
            { label: 'NXP IMX8MP', to: '/solutions/nxp/imx8mp' },
            { label: 'NXP FRDM 93', to: '/solutions/nxp/frdm-93' },
            { label: 'Raspberry Pi', to: '/solutions/raspberry-pi/raspberry-pi' },
            { label: 'NVIDIA Jetson', to: '/solutions/nvidia/jetson-orin-nano' },
          ],
        },
        {
          title: 'Production Ready',
          items: [
            { label: 'Advantech ICAM 540', to: '/solutions/advantech/icam-540' },
            { label: 'OnLogic FR201', to: '/solutions/onlogic' },
            { label: 'Seeed reTerminal', to: '/solutions/seeed' },
          ],
        },
        ...(isDevelopment ? [
          {
            title: 'Pre-review',
            items: [
              { label: 'Qualcomm IQ-9', to: '/solutions/qualcomm/iq-9' },
              { label: 'Qualcomm Rubik Pi', to: '/solutions/qualcomm/rubik-pi' },
              { label: 'STMicro STM32MP257F', to: '/solutions/stmicro/stm32mp157d-dk' },
            ],
          },
        ] : []),
      ],
      twoColumn: isDevelopment ? false : true,
      threeColumn: isDevelopment ? true : false,
    },
  }

  const toolsMenu = {
    label: 'Tools',
    sections: [
      {
        title: '',
        items: [
          { label: 'CLI', to: '/cli' },
          { label: 'Device API', to: '/device-api' },
          { label: 'Admin API', to: '/admin-api' },
          { label: 'Peridio Agent', to: '/dev-center/agents/peridio-agent' },
        ],
      },
    ],
  }

  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <div className="navbar__items">
          <Link to="/" className="navbar__brand" onClick={handleLinkClick}>
            <img 
              src={isMegaMenuHidden ? "/img/peridio-docs-logo-mobile.svg" : `/${navbar.logo.src}`} 
              alt={navbar.logo.alt} 
              className="navbar__logo" 
            />
          </Link>
          <div className="mega-menu-container">
            <Link to="https://peridio.com" className="navbar__item navbar__link" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              Home
            </Link>
            {Object.entries(megaMenuItems).map(([key, menu]) => (
              <div
                key={key}
                className={`mega-menu-item ${toggledMenu === key ? 'active' : ''}`}
                onClick={() => handleMenuClick(key)}
                data-menu={key}
              >
                {menu.linkTo ? (
                  <Link to={menu.linkTo} className="mega-menu-trigger" onClick={handleLinkClick}>
                    {menu.label}
                    <svg width="12" height="8" viewBox="0 0 12 8" className="mega-menu-arrow">
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </Link>
                ) : (
                    <span className="mega-menu-trigger">
                      {menu.label}
                      <svg width="12" height="8" viewBox="0 0 12 8" className="mega-menu-arrow">
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </span>
                )}

                {toggledMenu === key && (
                  <div className="mega-menu-dropdown">
                    <div className={`mega-menu-content ${menu.threeColumn ? 'three-column' : menu.twoColumn ? 'two-column' : ''}`}>
                      {menu.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mega-menu-section">
                          <Heading as="h4" className="mega-menu-section-title">
                            {section.title}
                          </Heading>
                          <ul className="mega-menu-links">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                {item.disabled ? (
                                  <span
                                    className="mega-menu-link disabled"
                                    style={{ cursor: 'not-allowed', opacity: 0.6 }}
                                  >
                                    {item.label}
                                  </span>
                                ) : (
                                  <Link to={item.to} className="mega-menu-link" onClick={handleLinkClick}>
                                    {item.label}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isDevelopment && (
              <span className="dev-mode-indicator" style={{
                padding: '4px 8px',
                marginLeft: '10px',
                background: '#ff6b6b',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                DEV MODE
              </span>
            )}
          </div>
        </div>

        <div className="navbar__items navbar__items--right">
          <div
            className={`mega-menu-item ${toggledMenu === 'tools' ? 'active' : ''}`}
            onClick={() => handleMenuClick('tools')}
            data-menu="tools"
          >
            <span className="mega-menu-trigger">
              {toolsMenu.label}
              <svg width="12" height="8" viewBox="0 0 12 8" className="mega-menu-arrow">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </span>

            {toggledMenu === 'tools' && (
              <div className="mega-menu-dropdown">
                <div className="mega-menu-content">
                  {toolsMenu.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mega-menu-section">
                      {section.title && (
                        <Heading as="h4" className="mega-menu-section-title">
                          {section.title}
                        </Heading>
                      )}
                      <ul className="mega-menu-links">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link to={item.to} className="mega-menu-link" onClick={handleLinkClick}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="https://console.peridio.com"
            className="navbar__item navbar__link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            Web Console
          </Link>

          <button
            className="navbar__toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="navbar__toggle-icon"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </nav>
  )
}

export default MegaMenuNavbar
