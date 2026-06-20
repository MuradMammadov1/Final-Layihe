import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function tabClass(isActive) {
  return `admin-nav-link ${isActive ? 'is-active' : ''}`.trim()
}

export default function AdminLayout(){
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('adminLoggedIn')
    navigate('/login')
  }

  return (
    <div className="admin-layout">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <NavLink to="/">Ana səhifə</NavLink>
            <span>/</span>
            <span>İdarə Paneli</span>
          </nav>
          <h1 className="page-hero-title">İdarə Paneli</h1>
          <p className="page-hero-sub">Aura Grand Hotel - Sistem idarəetməsi</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel mb-6 flex justify-between items-center">
          <div>
            <span className="section-label">Admin naviqasiya</span>
            <p className="text-gray-600 text-sm mt-1">Otellər, otaqlar, rezervasiyalar və kontent idarəetməsi</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-gold btn-sm">Çıxış</button>
        </div>

        <nav className="admin-nav panel py-3" aria-label="Admin naviqasiya">
          <NavLink to="/admin-panel" end className={({ isActive }) => tabClass(isActive)}>
            İcmal
          </NavLink>
          <NavLink to="/admin-panel/hotels" className={({ isActive }) => tabClass(isActive)}>
            Otel Məlumatları
          </NavLink>
          <NavLink to="/admin-panel/rooms" className={({ isActive }) => tabClass(isActive)}>
            Otaqlar
          </NavLink>
          <NavLink to="/admin-panel/reservations" className={({ isActive }) => tabClass(isActive)}>
            Rezervasiyalar
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
          <NavLink to="/admin-panel/contact" className={({ isActive }) => tabClass(isActive)}>
            Əlaqə
          </NavLink>
        </nav>

        <div className="mt-6">
          <Outlet />
        </div>
      </section>
    </div>
  )
}
