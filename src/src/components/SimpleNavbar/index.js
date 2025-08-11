import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';
import './styles.css';

const SimpleNavbar = () => {
    const { siteConfig } = useDocusaurusContext();
    const { navbar } = useThemeConfig();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Platform', to: '/platform/reference/overview' },
        { label: 'Integration', to: '/integration/introduction' },
        { label: 'Admin API', to: '/admin-api' },
        { label: 'Device API', to: '/device-api' },
        { label: 'CLI', to: '/cli' },
        { label: 'EVK', to: '/evk' },
    ];

    return (
        <nav className="navbar navbar--fixed-top simple-navbar">
            <div className="navbar__inner">
                <div className="navbar__items">
                    <Link to="/" className="navbar__brand">
                        <img
                            src={`/${navbar.logo.src}`}
                            alt={navbar.logo.alt}
                            className="navbar__logo"
                        />
                    </Link>
                    <div className="simple-navbar-items">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                className="simple-navbar-link"
                            >
                                {item.label}
                            </Link>
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
                        <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            className="navbar__toggle-icon"
                            aria-hidden="true"
                        >
                            <path 
                                d="M3 6h18M3 12h18M3 18h18" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="navbar-sidebar">
                    <div className="navbar-sidebar__backdrop" onClick={() => setMobileMenuOpen(false)} />
                    <div className="navbar-sidebar__primary">
                        <div className="navbar__items">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.to}
                                    className="navbar__item navbar__link"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                to="https://console.peridio.com"
                                className="navbar__item navbar__link"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Web Console
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default SimpleNavbar;