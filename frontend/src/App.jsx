import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Hotels from './pages/Hotels'
import HotelDetails from './pages/HotelDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Admin/Dashboard'

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
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}
