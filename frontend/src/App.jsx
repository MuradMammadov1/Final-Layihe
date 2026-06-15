import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import Footer from './components/Footer'
import Home from './pages/Home'
import RoomDetails from './pages/RoomDetails'
import HotelDetails from './pages/HotelDetails'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Hotels from './pages/Hotels'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import FAQ from './pages/FAQ'
import SpecialOffers from './pages/SpecialOffers'
import SpecialOfferDetail from './pages/SpecialOfferDetail'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminLogin from './pages/AdminLogin'
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
import GalleryManager from './pages/Admin/GalleryManager'
import AdminGuard from './components/AdminGuard'
import { ThemeProvider } from './context/ThemeContext'

function MainShell({ children }) {
  const { pathname } = useLocation()
  const fullBleed =
    pathname === '/' ||
    pathname === '/contact' ||
    pathname === '/gallery' ||
    pathname === '/about' ||
    pathname === '/rooms' ||
    pathname === '/rooms/:id' ||
    pathname === '/blog' ||
    pathname === '/blog/:id' ||
    pathname === '/special-offers' ||
    pathname === '/special-offers/:id' ||
    pathname === '/profile' ||
    pathname === '/login' ||
    pathname === '/register'
  return (
    <main className={fullBleed ? 'main-full' : 'main-contained container mx-auto px-4 py-6'}>
      {children}
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen app-shell">
        <SiteHeader />
        <MainShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/special-offers" element={<SpecialOffers />} />
            <Route path="/special-offers/:id" element={<SpecialOfferDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-panel" element={<AdminGuard><AdminLayout /></AdminGuard>}>
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
              <Route path="gallery" element={<GalleryManager />} />
            </Route>
          </Routes>
        </MainShell>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
