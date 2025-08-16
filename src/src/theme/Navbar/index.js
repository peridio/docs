import React from 'react'
import MegaMenuNavbar from '../../components/MegaMenuNavbar'

export default function Navbar(props) {
  // Always use MegaMenuNavbar for consistent navigation across the entire site
  return <MegaMenuNavbar {...props} />
}
