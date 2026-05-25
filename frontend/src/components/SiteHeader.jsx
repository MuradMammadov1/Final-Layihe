import React from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Navbar from './Navbar'

export default function SiteHeader() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  const onHero = pathname === '/'
  const isAuth = pathname === '/login' || pathname === '/register'

  if (isAuth) return null

  return (
    <header className={`site-header ${onHero ? 'site-header--on-hero' : ''}`}>
      {!isAdmin && <TopBar />}
      <Navbar />
    </header>
  )
}
