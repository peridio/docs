# Guidelines

This document provides guidelines for contributing to and maintaining the Peridio documentation.

## Content Standards

- Use clear, concise language
- Include code examples where appropriate
- Follow the established documentation structure
- Keep documentation up-to-date with code changes

## File Organization

- Place documentation in appropriate subdirectories
- Use descriptive filenames
- Maintain consistent formatting across all files

## Contributing

- Follow the project's coding standards
- Test documentation changes locally
- Submit pull requests for review
- Update this file when adding new guidelines

## Questions?

For questions about these guidelines, please open an issue or contact the maintainers.

---

# Development Guidelines

## 1. Component Architecture

### 1.1 Component Structure

- **MUST** use functional components with React hooks
- **MUST** follow the existing component hierarchy: `src/components/[ComponentName]/index.js + styles.module.css`
- **MUST** use CSS modules for component-specific styling
- **SHOULD** create reusable components in `src/components/` before duplicating patterns
- **MUST NOT** introduce class-based components

### 1.2 Component Naming

- **MUST** use PascalCase for component names (e.g., `HardwareCarousel`, `MegaMenuNavbar`)
- **MUST** use kebab-case for CSS module files (`styles.module.css`)
- **MUST** use camelCase for CSS class names within modules

### 1.3 Component Dependencies

- **MUST** use existing Docusaurus components (`@docusaurus/Link`, `@theme/Heading`, `@theme/Layout`)
- **MUST** use existing icon libraries (`@heroicons/react/24/outline`)
- **MUST NOT** introduce new external UI libraries without explicit approval
- **SHOULD** reuse existing utility libraries (`clsx` for conditional classes)

## 2. CSS Conventions

### 2.1 CSS Architecture

- **MUST** use CSS modules for component-specific styles
- **MUST** place global styles in `src/css/custom.css`
- **MUST** use CSS custom properties (variables) from Docusaurus theme
- **MUST NOT** use inline styles except for dynamic values

### 2.2 CSS Naming

- **MUST** use semantic class names that describe purpose, not appearance
- **MUST** use camelCase for CSS class names
- **SHOULD** follow BEM-like naming for complex components (e.g., `carouselSection`, `slideContent`)

### 2.3 CSS Organization

- **MUST** group related styles with comments
- **MUST** place media queries at the end of component styles
- **SHOULD** order properties: layout → typography → visual → interactive

## 3. Design Tokens

### 3.1 Color System

- **MUST** use existing Docusaurus color variables:
  - `--ifm-color-primary: #3424ee`
  - `--ifm-color-content-secondary: #525860`
  - `--ifm-color-emphasis-*` scale
- **MUST NOT** introduce new color values without approval
- **SHOULD** use semantic color names from existing palette

### 3.2 Typography

- **MUST** use existing font families:
  - Primary: "Avenir" (custom font)
  - Secondary: "Space Grotesk" (Google Fonts)
  - Accent: "Montserrat" (Google Fonts)
- **MUST** use existing font size scale from Docusaurus
- **MUST NOT** introduce new font families without approval

### 3.3 Spacing

- **MUST** use existing spacing scale: `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2rem`
- **SHOULD** use consistent spacing multiples (4px base unit)
- **MUST NOT** introduce arbitrary spacing values

## 4. Theming

### 4.1 Theme Support

- **MUST** support both light and dark themes using `html[data-theme='dark']` selectors
- **MUST** use CSS custom properties for theme-aware values
- **SHOULD** test both themes before submitting changes

### 4.2 Theme Variables

- **MUST** use existing Docusaurus theme variables
- **MUST NOT** override theme variables without approval
- **SHOULD** extend theme variables rather than replacing them

## 5. Layout Patterns

### 5.1 Grid System

- **MUST** use existing layout patterns:
  - Flexbox for component layouts
  - CSS Grid for complex page layouts
  - Container with `max-width: 1200px` for content
- **SHOULD** reuse existing layout classes (`.container`, `.fullWidth`)

### 5.2 Responsive Design

- **MUST** use existing breakpoints:
  - Mobile: `max-width: 768px`
  - Tablet: `max-width: 996px`
  - Desktop: `min-width: 997px`
- **MUST** maintain mobile-first approach
- **SHOULD** test all breakpoints before submitting

### 5.3 Layout Components

- **MUST** reuse existing layout patterns:
  - `.stack` for content cards
  - `.resourceCardsContainer` for feature grids
  - `.carousel` for horizontal scrolling

## 6. Forms and Interactions

### 6.1 Form Elements

- **MUST** use existing Docusaurus form components
- **MUST** maintain consistent styling with existing forms
- **SHOULD** follow existing form patterns from search and navigation

### 6.2 Interactive Elements

- **MUST** use existing button styles:
  - `.ctaButton` for primary actions
  - `.ctaButtonMinimal` for secondary actions
  - `.link` for navigation links
- **MUST** maintain consistent hover and focus states

## 7. Accessibility (A11Y)

### 7.1 Semantic HTML

- **MUST** use proper HTML semantics (`<nav>`, `<main>`, `<section>`, `<article>`)
- **MUST** use appropriate heading hierarchy (h1 → h2 → h3)
- **MUST** provide alt text for images

### 7.2 Keyboard Navigation

- **MUST** ensure all interactive elements are keyboard accessible
- **MUST** provide visible focus indicators
- **MUST** support tab navigation order

### 7.3 Screen Reader Support

- **MUST** use `aria-label` for interactive elements without visible text
- **MUST** provide `aria-expanded` for collapsible content
- **SHOULD** test with screen readers before submitting

### 7.4 Color and Contrast

- **MUST** maintain WCAG AA contrast ratios
- **MUST** not rely solely on color to convey information
- **SHOULD** test with high contrast mode

## 8. Content and Internationalization

### 8.1 Content Structure

- **MUST** follow existing content hierarchy patterns
- **MUST** use consistent heading patterns from existing pages
- **SHOULD** maintain similar content density across similar page types

### 8.2 Internationalization

- **MUST** support existing i18n structure (currently English-only)
- **MUST** use text content that can be easily translated
- **SHOULD** avoid hardcoded text in components

## 9. Documentation and Visual Tests

### 9.1 Code Documentation

- **MUST** add JSDoc comments for complex components
- **MUST** document component props and usage
- **SHOULD** include usage examples in component files

### 9.2 Visual Testing

- **MUST** test changes across all supported browsers
- **MUST** verify responsive behavior on multiple devices
- **SHOULD** create visual regression tests for complex components

## 10. High-Risk Surfaces

### 10.1 Critical Components (DO NOT MODIFY WITHOUT APPROVAL)

- **MegaMenuNavbar** - Core navigation component
- **HardwareCarousel** - Featured hardware showcase
- **Homepage layout** - Main landing page structure
- **Global CSS variables** - Theme foundation
- **Font loading** - Typography system

### 10.2 Safe Extension Patterns

- **SHOULD** extend existing components with new variants
- **SHOULD** add new sections to existing layouts
- **SHOULD** create new components following established patterns
- **MAY** add new utility classes to existing CSS modules

## 11. CI Gates and Quality Checks

### 11.1 Required Checks (HARD BLOCKERS)

- **MUST** pass OpenAPI linting (`redocly.yaml` compliance)
- **MUST** pass ESLint rules (React, accessibility, Docusaurus)
- **MUST** pass Docusaurus build process
- **MUST** pass all existing tests

### 11.2 Code Review Requirements

- **MUST** receive approval from designated UI/UX reviewers
- **MUST** demonstrate responsive behavior across breakpoints
- **MUST** verify accessibility compliance
- **SHOULD** include before/after screenshots for visual changes

## 12. Implementation Guidelines

### 12.1 Before Making Changes

- **MUST** identify existing patterns for similar functionality
- **MUST** check for existing components that could be reused
- **SHOULD** consult existing component library for patterns

### 12.2 During Implementation

- **MUST** follow existing file structure and naming conventions
- **MUST** maintain consistent code style with existing codebase
- **SHOULD** add comments explaining complex logic

### 12.3 After Implementation

- **MUST** test across all supported devices and browsers
- **MUST** verify accessibility compliance
- **SHOULD** document any new patterns created

## 13. Emergency Procedures

### 13.1 Breaking Changes

- **MUST** create rollback plan before implementing
- **MUST** coordinate with team before deployment
- **MUST** have immediate rollback capability

### 13.2 Hotfixes

- **MUST** follow emergency change procedures
- **MUST** create follow-up ticket for proper implementation
- **SHOULD** limit scope to critical fixes only

## 14. Package Management and Development Environment

### 14.1 Project Structure

- **MUST** maintain only one `package-lock.json` file in the `src/` directory
- **MUST NOT** have `package-lock.json` files in the root directory
- **MUST** keep all npm dependencies and configuration in the `src/` directory

### 14.2 NPM Commands

- **MUST** run all npm commands from the `src/` directory:
  - `npm install` - Install dependencies
  - `npm run build` - Build the project
  - `npm run start` - Start development server
  - `npm run lint` - Run linting
  - Any other `npm run ...` commands
- **MUST NOT** run npm commands from the root directory
- **MUST** ensure working directory is `src/` before executing npm commands

### 14.3 Dependency Management

- **MUST** add new dependencies using `npm install` from `src/` directory
- **MUST** update dependencies using `npm update` from `src/` directory
- **MUST** commit the `package-lock.json` file in `src/` directory to version control
- **SHOULD** use exact versions for critical dependencies

### 14.4 Development Workflow

- **MUST** `cd src/` before starting development work
- **MUST** verify current directory is `src/` before running npm commands
- **SHOULD** use `pwd` or similar to confirm working directory
- **MUST** ensure all team members understand this directory structure requirement
