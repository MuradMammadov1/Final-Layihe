import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1')
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark', dark ? '1' : '0')
  }, [dark])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const { user, loading, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const onHome = pathname === '/'

  const doLogout = () => {
    logout()
    navigate('/')
  }

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
          {!loading && user ? (
            <>
              <Link to="/profile" className="nav-link-pill">{user.name}</Link>
              {user.role === 'admin' && <Link to="/admin" className="nav-link-pill">Admin Panel</Link>}
              <button onClick={doLogout} className="btn btn-outline-gold btn-sm">Çıxış</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link-pill">Daxil ol</Link>
              <Link to="/register" className="btn btn-gold btn-sm">Qeydiyyat</Link>
            </>
          )}
          <button onClick={() => setDark(d => !d)} className="btn secondary btn-sm">
            {dark ? 'İşıqlı' : 'Qaranlıq'}
          </button>
        </div>
      </div>
    </nav>
  )
}
