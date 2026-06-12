import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function tabClass(isActive) {
  return `admin-nav-link ${isActive ? 'is-active' : ''}`.trim()
}

export default function AdminLayout(){
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/admin-login')
  }

  return (
    <div className="space-y-6">
      <div className="panel flex justify-between items-center">
        <div>
          <h2 className="section-heading text-xl mb-1">İdarə paneli</h2>
          <p className="text-gray-600 text-sm">Otellər, otaqlar və bronlar — admin üçün qısa menyü.</p>
        </div>
        <button onClick={handleLogout} className="btn secondary btn-sm">Çıxış</button>
      </div>
      <nav className="admin-nav panel py-3" aria-label="Admin naviqasiya">
        <NavLink to="/admin-panel" end className={({ isActive }) => tabClass(isActive)}>
          İcmal
        </NavLink>
        <NavLink to="/admin-panel/hotels" className={({ isActive }) => tabClass(isActive)}>
          Otellər
        </NavLink>
        <NavLink to="/admin-panel/rooms" className={({ isActive }) => tabClass(isActive)}>
          Otaqlar
        </NavLink>
        <NavLink to="/admin-panel/reservations" className={({ isActive }) => tabClass(isActive)}>
          Bronlar
        </NavLink>
        <NavLink to="/admin-panel/users" className={({ isActive }) => tabClass(isActive)}>
          İstifadəçilər
        </NavLink>
        <NavLink to="/admin-panel/reviews" className={({ isActive }) => tabClass(isActive)}>
          Rəylər
        </NavLink>
        <NavLink to="/admin-panel/services" className={({ isActive }) => tabClass(isActive)}>
          Xidmətlər
        </NavLink>
        <NavLink to="/admin-panel/faq" className={({ isActive }) => tabClass(isActive)}>
          FAQ
        </NavLink>
        <NavLink to="/admin-panel/special-offers" className={({ isActive }) => tabClass(isActive)}>
          Təkliflər
        </NavLink>
        <NavLink to="/admin-panel/blog" className={({ isActive }) => tabClass(isActive)}>
          Bloq
        </NavLink>
        <NavLink to="/admin-panel/about" className={({ isActive }) => tabClass(isActive)}>
          Haqqımızda
        </NavLink>
        <NavLink to="/admin-panel/testimonials" className={({ isActive }) => tabClass(isActive)}>
          Testimonials
        </NavLink>
        <NavLink to="/admin-panel/gallery" className={({ isActive }) => tabClass(isActive)}>
          Qalereya
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
