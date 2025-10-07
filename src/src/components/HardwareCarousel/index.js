import React, { useState, useEffect } from 'react'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

const slides = [
  {
    vendor: 'NVIDIA',
    target: 'Jetson Orin Nano',
    image: '/img/nvidia-jetson-orin.jpg', // TODO: replace with real Jetson image
    overviewLink: '/solutions/nvidia/jetson-orin-nano',
    getStartedLink: '/avocado-linux/guides/getting-started',
  },
  {
    vendor: 'Raspberry Pi',
    target: 'Raspberry Pi 5',
    image: '/img/raspberrypi-5.jpg',
    overviewLink: '/solutions/raspberry-pi/raspberry-pi-5',
    getStartedLink: '/avocado-linux/guides/getting-started',
  },
  {
    vendor: 'NXP',
    target: 'i.MX8MP EVK',
    image: '/img/nxp-imx8p.jpg', // TODO: replace with real i.MX8 image
    overviewLink: '/solutions/nxp/imx8mp',
    getStartedLink: '/avocado-linux/guides/getting-started',
  },
]

export default function HardwareCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setProgress(0)
    }, 7500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1.33 // Increment by 1.33% every 100ms (7.5 seconds total)
      })
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  return (
    <section className={styles.carouselSection}>
      <Heading as="h2" className={styles.sectionTitle}>
        Avocado Linux - Featured Hardware
      </Heading>

      <div className={styles.carousel}>
        {/* Navigation Dots - Top Right */}
        <div className={styles.navigationDots}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentSlide ? styles.activeDot : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {idx === currentSlide && (
                <div className={styles.progressRing}>
                  <svg className={styles.progressSvg} viewBox="0 0 36 36">
                    <path
                      className={styles.progressPath}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray={`${progress}, 100`}
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`${styles.slide} ${idx === currentSlide ? styles.activeSlide : styles.hiddenSlide}`}
          >
            <img
              src={slide.image}
              alt={`${slide.vendor} ${slide.target}`}
              className={styles.slideImg}
            />
            <div className={styles.slideContent}>
              <Heading as="h3" className={styles.vendor}>
                {slide.vendor}
              </Heading>
              <p className={styles.target}>{slide.target}</p>
              <div className={styles.links}>
                <Link to={slide.overviewLink} className={styles.link}>
                  Overview →
                </Link>
                <Link to={slide.getStartedLink} className={styles.linkClear}>
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
