import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import Footer from './components/Footer'
import Home from './pages/Home'
import Hotels from './pages/Hotels'
import HotelDetails from './pages/HotelDetails'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import HotelManager from './pages/Admin/HotelManager'
import RoomManager from './pages/Admin/RoomManager'
import ReservationManager from './pages/Admin/ReservationManager'
import AdminGuard from './components/AdminGuard'

function MainShell({ children }) {
  const { pathname } = useLocation()
  const fullBleed =
    pathname === '/' ||
    pathname === '/contact' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/profile' ||
    pathname === '/gallery' ||
    pathname === '/about' ||
    pathname === '/rooms' ||
    pathname === '/blog'
  return (
    <main className={fullBleed ? 'main-full' : 'main-contained container mx-auto px-4 py-6'}>
      {children}
    </main>
  )
}

export default function App() {
  return (
    <div className="min-h-screen app-shell">
      <SiteHeader />
      <MainShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route index element={<Dashboard />} />
            <Route path="hotels" element={<HotelManager />} />
            <Route path="rooms" element={<RoomManager />} />
            <Route path="reservations" element={<ReservationManager />} />
          </Route>
        </Routes>
      </MainShell>
      <Footer />
    </div>
  )
}
