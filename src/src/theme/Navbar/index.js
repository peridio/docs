import React from 'react'
import { useLocation } from '@docusaurus/router'
import MegaMenuNavbar from '../../components/MegaMenuNavbar'
import SimpleNavbar from '../../components/SimpleNavbar'

export default function Navbar(props) {
  const location = useLocation()

  // In development mode, always use MegaMenuNavbar for unified navigation
  if (process.env.NODE_ENV === 'development') {
    return <MegaMenuNavbar {...props} />
  }

  // Production: Use MegaMenuNavbar for dev-center and solutions pages
  const isDevCenter = location.pathname.startsWith('/dev-center')
  const isSolutions = location.pathname.startsWith('/solutions')

  if (isDevCenter || isSolutions) {
    return <MegaMenuNavbar {...props} />
  }

  // Production: Use SimpleNavbar for all other pages
  return <SimpleNavbar {...props} />
}
