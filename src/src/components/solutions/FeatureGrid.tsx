import React from 'react'
import Heading from '@theme/Heading'
import {
  HiOutlineServerStack as ServerStackIcon,
  HiOutlineFire as FireIcon,
  HiOutlineShieldCheck as ShieldCheckIcon,
  HiOutlineGlobeAlt as GlobeAltIcon,
  HiOutlineWrenchScrewdriver as WrenchScrewdriverIcon,
  HiOutlineBolt as BoltIcon,
  HiOutlineCommandLine as CommandLineIcon,
  HiOutlineCpuChip as CpuChipIcon,
  HiOutlineDeviceTablet as DeviceTabletIcon,
} from 'react-icons/hi2'
import styles from './solution.module.css'

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

const iconMap: Record<string, IconType> = {
  ServerStack: ServerStackIcon,
  Fire: FireIcon,
  ShieldCheck: ShieldCheckIcon,
  GlobeAlt: GlobeAltIcon,
  WrenchScrewdriver: WrenchScrewdriverIcon,
  Bolt: BoltIcon,
  CommandLine: CommandLineIcon,
  CpuChip: CpuChipIcon,
  DeviceTablet: DeviceTabletIcon,
}

interface FeatureGridProps {
  features: Array<{
    icon: keyof typeof iconMap
    title: string
    description: string
  }>
  title?: string
}

export default function FeatureGrid({ features, title = 'Why Choose Peridio' }: FeatureGridProps) {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || ShieldCheckIcon
            return (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>
                  <IconComponent style={{ width: '100%', height: '100%' }} />
                </div>
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
