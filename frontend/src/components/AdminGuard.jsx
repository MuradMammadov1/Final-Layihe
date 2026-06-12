import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminGuard({ children }){
  // Her render-da localStorage yoxla
  const isAdminLoggedIn = typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') === 'true'
  
  console.log('AdminGuard check:', isAdminLoggedIn)

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />
  }

  return children
}
