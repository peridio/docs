import React from 'react'
import Heading from '@theme/Heading'
import { HiOutlineXMark as XMarkIcon, HiOutlineCheck as CheckIcon } from 'react-icons/hi2'
import styles from './solution.module.css'

interface ProblemSolutionProps {
  challenges?: string[]
  solutions?: string[]
  challengeTitle?: string
  solutionTitle?: string
  sectionTitle?: string
  sectionSubtitle?: string
}

export default function ProblemSolution({
  challenges,
  solutions,
  challengeTitle = "The Challenge",
  solutionTitle = "The Solution",
  sectionTitle = "From Challenge to Solution",
  sectionSubtitle = "Transform your deployment with production-ready infrastructure"
}: ProblemSolutionProps) {
  if (!challenges && !solutions) return null

  return (
    <section className={styles.problemSolution}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <Heading as="h2">{sectionTitle}</Heading>
          <p>{sectionSubtitle}</p>
        </div>

        <div className={styles.comparisonContainer}>
          {challenges && (
            <div className={styles.challengeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.challengeIcon}>
                  <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <Heading as="h3">{challengeTitle}</Heading>
              </div>
              <div className={styles.cardContent}>
                {challenges.map((challenge, index) => (
                  <div key={index} className={styles.challengeItem}>
                    <span className={styles.challengeText}>{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {solutions && (
            <div className={styles.solutionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.solutionIcon}>
                  <CheckIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <Heading as="h3">{solutionTitle}</Heading>
              </div>
              <div className={styles.cardContent}>
                {solutions.map((solution, index) => (
                  <div key={index} className={styles.solutionItem}>
                    <span className={styles.solutionText}>{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}