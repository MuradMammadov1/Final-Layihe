import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function tabClass(isActive) {
  return `admin-nav-link ${isActive ? 'is-active' : ''}`.trim()
}

export default function AdminLayout(){
  const { logout } = React.useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
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
        <NavLink to="/admin/users" className={({ isActive }) => tabClass(isActive)}>
          İstifadəçilər
        </NavLink>
        <NavLink to="/admin/reviews" className={({ isActive }) => tabClass(isActive)}>
          Rəylər
        </NavLink>
        <NavLink to="/admin/services" className={({ isActive }) => tabClass(isActive)}>
          Xidmətlər
        </NavLink>
        <NavLink to="/admin/faq" className={({ isActive }) => tabClass(isActive)}>
          FAQ
        </NavLink>
        <NavLink to="/admin/special-offers" className={({ isActive }) => tabClass(isActive)}>
          Təkliflər
        </NavLink>
        <NavLink to="/admin/blog" className={({ isActive }) => tabClass(isActive)}>
          Bloq
        </NavLink>
        <NavLink to="/admin/about" className={({ isActive }) => tabClass(isActive)}>
          Haqqımızda
        </NavLink>
        <NavLink to="/admin/testimonials" className={({ isActive }) => tabClass(isActive)}>
          Testimonials
        </NavLink>
        <NavLink to="/admin/gallery" className={({ isActive }) => tabClass(isActive)}>
          Qalereya
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
