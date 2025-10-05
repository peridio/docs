export interface SolutionData {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  hero: {
    title: string
    subtitle: string
    highlight?: string
    stats: Array<{
      value: string
      label: string
    }>
    primaryCTA?: {
      text: string
      link: string
    }
    secondaryCTA?: {
      text: string
      link: string
    }
    image?: string
    imageAlt?: string
  }
  valueProposition?: {
    title?: string
    content?: string
    videoUrl?: string
  }
  specs?: Array<{
    label: string
    value: string
    note?: string
  }>
  useCases?: Array<{
    title: string
    description: string
    image?: string
    imageAlt?: string
  }>
  challenges?: string[]
  solutions?: string[]
  features?: Array<{
    icon: string
    title: string
    description: string
  }>
  cta?: {
    title: string
    subtitle?: string
    primaryCTA?: {
      text: string
      link: string
      target?: string
    }
    secondaryCTA?: {
      text: string
      link: string
      target?: string
    }
  }
  workInProgress?: {
    title: string
    message: string
    type: string
  }
  resources?: Array<{
    title: string
    description: string
    link: string
  }>
}
