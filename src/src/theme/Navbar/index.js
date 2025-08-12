import React from 'react'
import { useLocation } from '@docusaurus/router'
import MegaMenuNavbar from '../../components/MegaMenuNavbar'
import SimpleNavbar from '../../components/SimpleNavbar'

export default function Navbar(props) {
  const location = useLocation()

  // Use MegaMenuNavbar only for dev-center pages
  const isDevCenter = location.pathname.startsWith('/dev-center')

  if (isDevCenter) {
    return <MegaMenuNavbar {...props} />
  }

  // Use SimpleNavbar for all other pages
  return <SimpleNavbar {...props} />
}
