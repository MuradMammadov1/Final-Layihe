import React, { createContext, useState, useEffect } from 'react'
import api from '../api'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) { setUser(null); setLoading(false); return }
    try {
      const res = await api.get('/auth/me')
      setUser(res.data.data)
    } catch (err) {
      setUser(null)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ loadUser() }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, reload: loadUser }}>
      {children}
    </AuthContext.Provider>
  )
}
