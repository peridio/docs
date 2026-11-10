import React from 'react'

import Head from '@docusaurus/Head'
import { PageMetadata } from '@docusaurus/theme-common'
import { useLocation } from '@docusaurus/router'
import Layout from '@theme/Layout'
import { cardPathFor } from '@site/scripts/og/routes.mjs'
import { OG_CANVAS } from '@site/scripts/og/tokens.mjs'
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
    videoUrl?: string
  }
  children?: React.ReactNode
}

export default function SolutionLayout(props: SolutionLayoutProps) {
  const {
    title,
    description,
    keywords,
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
    children,
  } = props

  // Data titles mostly end in "| Peridio" already; add it once.
  const pageTitle = /\|\s*Peridio\s*$/.test(title) ? title : `${title} | Peridio`
  // og-cards-plugin renders a Hardware card for every SolutionLayout page, at
  // the path cardPathFor() derives from the permalink. Its headline is the
  // first part of the title, so that is the alt text too.
  const card = cardPathFor(useLocation().pathname)
  const cardAlt = title.split(' | ')[0].trim()

  return (
    <Layout title={pageTitle} description={description}>
      <Head>
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="product" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Head>
      {/* PageMetadata makes the image URL absolute (scrapers ignore relative
          og:image URLs) and sets twitter:image to the same picture. */}
      <PageMetadata image={card}>
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content={String(OG_CANVAS.width)} />
        <meta property="og:image:height" content={String(OG_CANVAS.height)} />
        <meta property="og:image:alt" content={cardAlt} />
        <meta name="twitter:image:alt" content={cardAlt} />
      </PageMetadata>

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
