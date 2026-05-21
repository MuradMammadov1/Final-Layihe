import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function tabClass(isActive) {
  return `admin-nav-link ${isActive ? 'is-active' : ''}`.trim()
}

export default function AdminLayout(){
  return (
    <div className="space-y-6">
      <div className="panel">
        <h2 className="section-heading text-xl mb-1">İdarə paneli</h2>
        <p className="text-gray-600 text-sm">Otellər, otaqlar və bronlar — admin üçün qısa menyü.</p>
      </div>
      <nav className="admin-nav panel py-3" aria-label="Admin naviqasiya">
        <NavLink to="/admin" end className={({ isActive }) => tabClass(isActive)}>
          İcmal
        </NavLink>
        <NavLink to="/admin/hotels" className={({ isActive }) => tabClass(isActive)}>
          Otellər
        </NavLink>
        <NavLink to="/admin/rooms" className={({ isActive }) => tabClass(isActive)}>
          Otaqlar
        </NavLink>
        <NavLink to="/admin/reservations" className={({ isActive }) => tabClass(isActive)}>
          Bronlar
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
