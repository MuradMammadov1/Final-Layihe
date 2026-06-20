import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const { pathname } = useLocation()
  const { darkMode, toggleDarkMode } = useTheme()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
    setAboutDropdownOpen(false)
  }, [pathname])

  const onHome = pathname === '/'

  return (
    <nav className={`navbar ${onHome ? 'navbar--overlay' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <Link to="/" className="navbar-brand">Aura Grand</Link>
          <button
            type="button"
            className="nav-toggle btn secondary btn-sm mt-1"
            aria-label="Menyu"
            onClick={() => setMenuOpen(o => !o)}
          >
            ☰ Menyu
          </button>
        </div>

        <div className={`nav-links-wrap ${menuOpen ? 'is-open' : ''}`}>
          <Link to="/" className="nav-link-pill">Ana səhifə</Link>
          
          <div className="nav-dropdown">
            <button
              className="nav-link-pill nav-dropdown-toggle"
              onClick={() => setDropdownOpen(o => !o)}
            >
              Otaqlar ▼
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/rooms" className="nav-dropdown-item">Otaqlar</Link>
                <Link to="/special-offers" className="nav-dropdown-item">Xüsusi Təkliflər</Link>
              </div>
            )}
          </div>

          <div className="nav-dropdown">
            <button
              className="nav-link-pill nav-dropdown-toggle"
              onClick={() => setAboutDropdownOpen(o => !o)}
            >
              Haqqımızda ▼
            </button>
            {aboutDropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/about" className="nav-dropdown-item">Haqqımızda</Link>
                <Link to="/faq" className="nav-dropdown-item">FAQ</Link>
                <Link to="/blog" className="nav-dropdown-item">Bloq</Link>
                <Link to="/gallery" className="nav-dropdown-item">Qalereya</Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="nav-link-pill">Əlaqə</Link>
          
          <div className="flex items-center gap-2">
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
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
