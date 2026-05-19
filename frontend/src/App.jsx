import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Hotels from './pages/Hotels'
import HotelDetails from './pages/HotelDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import HotelManager from './pages/Admin/HotelManager'
import ReservationManager from './pages/Admin/ReservationManager'
import AdminGuard from './components/AdminGuard'

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route index element={<Dashboard />} />
            <Route path="hotels" element={<HotelManager />} />
            <Route path="reservations" element={<ReservationManager />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}
