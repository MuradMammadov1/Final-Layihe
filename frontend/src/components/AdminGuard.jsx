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
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold">Access denied</h2>
        <p className="mt-3 text-gray-600">You need admin privileges to access this section.</p>
      </div>
    )
  }

  return children
}
