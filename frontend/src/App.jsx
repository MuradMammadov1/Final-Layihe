import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import Footer from './components/Footer'
import Home from './pages/Home'
import RoomDetails from './pages/RoomDetails'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import FAQ from './pages/FAQ'
import SpecialOffers from './pages/SpecialOffers'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import HotelManager from './pages/Admin/HotelManager'
import RoomManager from './pages/Admin/RoomManager'
import ReservationManager from './pages/Admin/ReservationManager'
import UserManager from './pages/Admin/UserManager'
import ReviewManager from './pages/Admin/ReviewManager'
import ServiceManager from './pages/Admin/ServiceManager'
import FAQManager from './pages/Admin/FAQManager'
import SpecialOfferManager from './pages/Admin/SpecialOfferManager'
import BlogManager from './pages/Admin/BlogManager'
import AboutManager from './pages/Admin/AboutManager'
import TestimonialManager from './pages/Admin/TestimonialManager'
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
    pathname === '/rooms/:id' ||
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
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/special-offers" element={<SpecialOffers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route index element={<Dashboard />} />
            <Route path="hotels" element={<HotelManager />} />
            <Route path="rooms" element={<RoomManager />} />
            <Route path="reservations" element={<ReservationManager />} />
            <Route path="users" element={<UserManager />} />
            <Route path="reviews" element={<ReviewManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="faq" element={<FAQManager />} />
            <Route path="special-offers" element={<SpecialOfferManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="testimonials" element={<TestimonialManager />} />
          </Route>
        </Routes>
      </MainShell>
      <Footer />
    </div>
  )
}
