import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const slides = [
    {
        vendor: 'NVIDIA',
        target: 'Jetson Xavier / Orin',
        image: '/img/raspberry-pi.jpg', // TODO: replace with real Jetson image
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
    },
];

export default function HardwareCarousel() {
    return (
        <section className={styles.carouselSection}>
            <h2 className={styles.sectionTitle}>Avocado Linux – Supported Hardware</h2>
            <div className={styles.carousel}>
                {slides.map((slide, idx) => (
                    <div className={styles.slide} key={idx}>
                        <img src={slide.image} alt={`${slide.vendor} ${slide.target}`} className={styles.slideImg} />
                        <div className={styles.slideContent}>
                            <h3 className={styles.vendor}>{slide.vendor}</h3>
                            <p className={styles.target}>{slide.target}</p>
                            <div className={styles.links}>
                                <Link to="#" className={styles.link}>Solution Overview</Link>
                                <Link to="#" className={styles.link}>Avocado Integration Guide</Link>
                                <Link to="#" className={styles.link}>Download Datasheet</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
} 