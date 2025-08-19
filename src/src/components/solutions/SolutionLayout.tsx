import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import SolutionHero from './SolutionHero'
import ValueProposition from './ValueProposition'
import TechSpecs from './TechSpecs'
import UseCases from './UseCases'
import ProblemSolution from './ProblemSolution'
import FeatureGrid from './FeatureGrid'
import CTASection from './CTASection'
import ResourceCards from './ResourceCards'

interface SolutionLayoutProps {
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
  specs?: Array<{
    label: string
    value: string
    note?: string
  }>
  useCases?: Array<{
    title: string
    description: string
    image?: string
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
  resources?: Array<{
    title: string
    description: string
    link: string
  }>
  valueProposition?: {
    title?: string
    content?: string
  }
  children?: React.ReactNode
}

export default function SolutionLayout(props: SolutionLayoutProps) {
  const {
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    hero,
    valueProposition,
    specs,
    useCases,
    challenges,
    solutions,
    features,
    cta,
    resources,
    children
  } = props

  return (
    <Layout>
      <Head>
        <title>{title} | Peridio</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={`${title} | Peridio`} />
        <meta property="og:description" content={description} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:type" content="product" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Head>

      <SolutionHero {...hero} />
      
      {valueProposition && <ValueProposition {...valueProposition} />}
      
      {specs && <TechSpecs specs={specs} />}
      
      {useCases && <UseCases useCases={useCases} />}
      
      {children}
      
      {(challenges || solutions) && (
        <ProblemSolution challenges={challenges} solutions={solutions} />
      )}
      
      {features && <FeatureGrid features={features} />}
      
      {cta && <CTASection {...cta} />}
      
      {resources && <ResourceCards resources={resources} />}
    </Layout>
  )
}