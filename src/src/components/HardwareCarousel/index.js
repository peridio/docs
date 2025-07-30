import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const slides = [
    {
        vendor: 'NVIDIA',
        target: 'Jetson Xavier / Orin',
        image: '/img/raspberry-pi.jpg', // TODO: replace with real Jetson image
        link: '/solutions/nvidia/jetson-orin-nano-overview',
    },
    {
        vendor: 'Raspberry Pi',
        target: 'Raspberry Pi 4 / 5',
        image: '/img/raspberry-pi.jpg',
    },
    {
        vendor: 'NXP',
        target: 'i.MX8MP EVK',
        image: '/img/raspberry-pi.jpg', // TODO: replace with real i.MX8 image
        link: '/solutions/nxp/imx8mp-solution-overview',
    },
];

export default function HardwareCarousel() {
    return (
        <section className={styles.carouselSection}>
            <Heading as="h2" className={styles.sectionTitle}>Avocado Linux – Supported Hardware</Heading>
            <div className={styles.carousel}>
                {slides.map((slide, idx) => (
                    <div className={styles.slide} key={idx}>
                        <img src={slide.image} alt={`${slide.vendor} ${slide.target}`} className={styles.slideImg} />
                        <div className={styles.slideContent}>
                            <Heading as="h3" className={styles.vendor}>{slide.vendor}</Heading>
                            <p className={styles.target}>{slide.target}</p>
                            <div className={styles.links}>
                                <Link to={slide.link} className={styles.link}>Solution Overview</Link>
                                <Link to="#" className={styles.link}>Data Sheet</Link>
                                <Link to="#" className={styles.link}>Try It</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
} 