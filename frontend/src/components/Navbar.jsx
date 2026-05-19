import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar(){
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark', dark ? '1' : '0')
  }, [dark])

  const { user, loading, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const doLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="text-xl font-bold text-indigo-600">Aura Grand</Link>
        <div className="flex flex-wrap items-center gap-3 nav-links">
          <Link to="/hotels" className="nav-link-pill">Hotels</Link>
          {!loading && user ? (
            <>
              <Link to="/profile" className="nav-link-pill">{user.name}</Link>
              {user.role === 'admin' && <Link to="/admin" className="nav-link-pill">Admin</Link>}
              <button onClick={doLogout} className="btn secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link-pill">Login</Link>
              <Link to="/register" className="nav-link-pill">Register</Link>
            </>
          )}
          <button onClick={() => setDark(d => !d)} className="btn secondary">{dark ? 'Light' : 'Dark'}</button>
        </div>
      </div>
    </nav>
  )
}
