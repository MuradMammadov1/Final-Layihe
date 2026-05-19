import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout(){
  return (
    <div className="space-y-6">
      <div className="panel flex flex-wrap gap-3">
        <NavLink to="/admin" end className={({ isActive }) => `nav-link-pill ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-gray-700'}`}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/hotels" className={({ isActive }) => `nav-link-pill ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-gray-700'}`}>
          Hotels
        </NavLink>
        <NavLink to="/admin/reservations" className={({ isActive }) => `nav-link-pill ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-gray-700'}`}>
          Reservations
        </NavLink>
      </div>
      <Outlet />
    </div>
  )
}
