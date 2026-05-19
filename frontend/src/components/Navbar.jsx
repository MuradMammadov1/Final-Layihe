import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark', dark ? '1' : '0')
  }, [dark])

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">Aura Grand</Link>
        <div className="space-x-4">
          <Link to="/hotels" className="text-gray-700 dark:text-gray-200">Hotels</Link>
          <Link to="/profile" className="text-gray-700 dark:text-gray-200">Profile</Link>
          <Link to="/admin" className="text-gray-700 dark:text-gray-200">Admin</Link>
          <button onClick={() => setDark(d => !d)} className="ml-3 px-3 py-1 border rounded">{dark ? 'Light' : 'Dark'}</button>
        </div>
      </div>
    </nav>
  )
}
