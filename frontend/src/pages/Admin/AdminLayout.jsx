import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout(){
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow flex flex-wrap gap-3">
        <NavLink to="/admin" end className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-gray-700'}`}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/hotels" className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-gray-700'}`}>
          Hotels
        </NavLink>
        <NavLink to="/admin/reservations" className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-gray-700'}`}>
          Reservations
        </NavLink>
      </div>
      <Outlet />
    </div>
  )
}
