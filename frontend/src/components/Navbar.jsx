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
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">Aura Grand</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/hotels" className="text-gray-700">Hotels</Link>
          {!loading && user ? (
            <>
              <Link to="/profile" className="text-gray-700">{user.name}</Link>
              <button onClick={doLogout} className="ml-2 px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700">Login</Link>
              <Link to="/register" className="text-gray-700">Register</Link>
            </>
          )}
          <Link to="/admin" className="text-gray-700">Admin</Link>
          <button onClick={() => setDark(d => !d)} className="ml-3 px-3 py-1 border rounded">{dark ? 'Light' : 'Dark'}</button>
        </div>
      </div>
    </nav>
  )
}
