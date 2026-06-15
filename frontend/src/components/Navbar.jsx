import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { darkMode, toggleDarkMode } = useTheme()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const onHome = pathname === '/'

  return (
    <nav className={`navbar ${onHome ? 'navbar--overlay' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="navbar-brand">Aura Grand</Link>

        <button
          type="button"
          className="nav-toggle btn secondary"
          aria-label="Menyu"
          onClick={() => setMenuOpen(o => !o)}
        >
          ☰
        </button>

        <div className={`nav-links-wrap ${menuOpen ? 'is-open' : ''}`}>
          <Link to="/" className="nav-link-pill">Ana səhifə</Link>
          <Link to="/rooms" className="nav-link-pill">Otaqlar</Link>
          <Link to="/special-offers" className="nav-link-pill">Xüsusi Təkliflər</Link>
          <Link to="/about" className="nav-link-pill">Haqqımızda</Link>
          <Link to="/services" className="nav-link-pill">Xidmətlər</Link>
          <Link to="/gallery" className="nav-link-pill">Qalereya</Link>
          <Link to="/faq" className="nav-link-pill">FAQ</Link>
          <Link to="/blog" className="nav-link-pill">Bloq</Link>
          <Link to="/contact" className="nav-link-pill">Əlaqə</Link>
          
          {user ? (
            <Link to="/profile" className="btn btn-gold btn-sm">
              {user.name} (Profil)
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-link-pill">Daxil ol</Link>
              <Link to="/register" className="btn btn-gold btn-sm">Qeydiyyat</Link>
            </>
          )}

          <button onClick={toggleDarkMode} className="btn secondary btn-sm">
            {darkMode ? '☀️ Işıqlı' : '🌙 Qaranlıq'}
          </button>
        </div>
      </div>
    </nav>
  )
}
