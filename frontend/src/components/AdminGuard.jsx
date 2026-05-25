import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function AdminGuard({ children }){
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="bg-white p-6 rounded shadow">Loading admin access...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
