import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';
import MobileMenu from './MobileMenu';
import './styles.css';

const MegaMenuNavbar = () => {
    const { siteConfig } = useDocusaurusContext();
    const { navbar } = useThemeConfig();
    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = (menuKey) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveMenu(menuKey);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const megaMenuItems = {
        quickstart: {
            label: 'Quickstart',
            sections: [
                {
                    title: 'Get Started',
                    items: [
                        { label: 'EVK Demo', to: '/evk' },
                        { label: 'Platform Getting Started', to: '/platform/getting-started' },
                    ]
                }
            ]
        },
        platform: {
            label: 'Platform',
            sections: [
                {
                    title: 'Guides',
                    items: [
                        { label: 'Creating Releases', to: '/platform/guides/creating-releases' },
                        { label: 'Cloud-Delegated Updates', to: '/platform/guides/cloud-delegated-updates' },
                        { label: 'Remote Access & Tunnels', to: '/platform/guides/introduction-to-remote-access' },
                        { label: 'Binary Management', to: '/platform/guides/introduction-to-binary-management' },
                        { label: 'Bundle Management', to: '/platform/guides/introduction-to-bundle-management' },
                    ]
                },
                {
                    title: 'Reference',
                    items: [
                        { label: 'Overview', to: '/platform/reference/overview' },
                        { label: 'Devices', to: '/platform/reference/devices' },
                        { label: 'Artifacts', to: '/platform/reference/artifacts' },
                        { label: 'Bundles', to: '/platform/reference/bundles' },
                        { label: 'Cohorts', to: '/platform/reference/cohorts' },
                        { label: 'Fleet View', to: '/platform/reference/fleet-view' },
                    ]
                },
                {
                    title: 'Tools',
                    items: [
                        { label: 'CLI', to: '/cli' },
                        { label: 'Admin API', to: '/admin-api' },
                        { label: 'Device API', to: '/device-api' },
                    ]
                }
            ]
        },
        integration: {
            label: 'Integration',
            sections: [
                {
                    title: 'Linux',
                    items: [
                        { label: 'Overview', to: '/integration/linux/overview' },
                        { label: 'Buildroot', to: '/integration/linux/build-tools/buildroot' },
                        { label: 'Yocto', to: '/integration/linux/build-tools/yocto' },
                        { label: 'peridiod Config', to: '/integration/linux/peridiod/configuration' },
                        { label: 'peridiod Updates', to: '/integration/linux/peridiod/updates' },
                    ]
                },
                {
                    title: 'Reference Designs',
                    items: [
                        { label: 'i.MX6ULL EVK', to: '/integration/linux/reference-designs/imx6ullevk/overview' },
                        { label: 'Khadas VIM3', to: '/integration/linux/reference-designs/khadas-vim3/overview' },
                        { label: 'Raspberry Pi 4', to: '/integration/linux/reference-designs/raspberrypi4/overview' },
                        { label: 'Raspberry Pi 5', to: '/integration/linux/reference-designs/raspberrypi5/overview' },
                        { label: 'QEMU ARM64', to: '/integration/linux/reference-designs/qemu-arm64/overview' },
                    ]
                },
                {
                    title: 'Android',
                    items: [
                        { label: 'Overview', to: '/integration/android/overview' },
                        { label: 'Direct API Integration', to: '/integration/android/reference-designs/direct-api-integration' },
                    ]
                }
            ]
        },
        build: {
            label: 'Build & Ship',
            sections: [
                {
                    title: 'Artifacts & Binaries',
                    items: [
                        { label: 'Creating Artifacts', to: '/platform/guides/creating-artifacts' },
                        { label: 'Creating Artifact Versions', to: '/platform/guides/creating-artifact-versions' },
                        { label: 'Creating Binaries', to: '/platform/guides/creating-binaries' },
                        { label: 'Creating Binary Parts', to: '/platform/guides/creating-binary-parts' },
                        { label: 'Multipart Uploads', to: '/platform/guides/multipart-uploads-with-binary-parts' },
                    ]
                },
                {
                    title: 'Signing & Security',
                    items: [
                        { label: 'CA Certificates', to: '/platform/guides/creating-ca-certificates' },
                        { label: 'X.509 via OpenSSL', to: '/platform/guides/creating-x509-certificates-with-openssl' },
                        { label: 'X.509 via Peridio', to: '/platform/guides/creating-x509-certificates-with-peridio' },
                        { label: 'Signing Keys', to: '/platform/guides/creating-signing-keys' },
                    ]
                },
                {
                    title: 'Advanced',
                    items: [
                        { label: 'Custom Binary Backends', to: '/platform/guides/custom-binary-backends' },
                        { label: 'Creating Bundles', to: '/platform/guides/creating-bundles' },
                    ]
                }
            ]
        },
        operate: {
            label: 'Operate',
            sections: [
                {
                    title: 'Device Management',
                    items: [
                        { label: 'Creating Devices', to: '/platform/guides/creating-devices' },
                        { label: 'Creating Deployments', to: '/platform/guides/creating-deployments' },
                        { label: 'Fleet View', to: '/platform/reference/fleet-view' },
                        { label: 'Device Certificates', to: '/platform/reference/device-certificates' },
                    ]
                },
                {
                    title: 'Release Management',
                    items: [
                        { label: 'Release Channels', to: '/platform/reference/release-channels' },
                        { label: 'Cohorts', to: '/platform/reference/cohorts' },
                        { label: 'Bundle Overrides', to: '/platform/reference/bundle-overrides' },
                    ]
                },
                {
                    title: 'Remote Access',
                    items: [
                        { label: 'Creating Tunnels', to: '/platform/guides/creating-tunnels' },
                        { label: 'Tunnels Reference', to: '/platform/reference/tunnels' },
                    ]
                }
            ]
        }
    };

    return (
        <nav className="navbar navbar--fixed-top">
            <div className="navbar__inner">
                <div className="navbar__items">
                    <Link to="/" className="navbar__brand">
                        <img
                            src={`/${navbar.logo.src}`}
                            alt={navbar.logo.alt}
                            className="navbar__logo"
                        />
                    </Link>
                    <div className="mega-menu-container">
                        {Object.entries(megaMenuItems).map(([key, menu]) => (
                            <div
                                key={key}
                                className="mega-menu-item"
                                onMouseEnter={() => handleMouseEnter(key)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="mega-menu-trigger">
                                    {menu.label}
                                    <svg width="12" height="8" viewBox="0 0 12 8" className="mega-menu-arrow">
                                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                    </svg>
                                </span>

                                {activeMenu === key && (
                                    <div className="mega-menu-dropdown">
                                        <div className="mega-menu-content">
                                            {menu.sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="mega-menu-section">
                                                    <h4 className="mega-menu-section-title">{section.title}</h4>
                                                    <ul className="mega-menu-links">
                                                        {section.items.map((item, itemIndex) => (
                                                            <li key={itemIndex}>
                                                                <Link to={item.to} className="mega-menu-link">
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
                        ))}
                    </div>
                </div>

                <div className="navbar__items navbar__items--right">
                    <Link
                        to="https://console.peridio.com"
                        className="navbar__item navbar__link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Web Console
                    </Link>

                    <button
                        className="navbar__toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar__toggle-icon"></span>
                    </button>
                </div>
            </div>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </nav>
    );
};

export default MegaMenuNavbar; 