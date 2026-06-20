import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default function Dashboard(){
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get('/stats/dashboard')
        setStats(res.data.data)
      } catch (err) {
        // Error halında demo statistika göstər
        setStats({
          totalHotels: 0,
          totalRooms: 0,
          totalUsers: 0,
          totalRevenue: 0,
          totalReservations: 0,
          pendingReservations: 0,
          confirmedReservations: 0,
          popularHotels: []
        })
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="panel">
          <h2 className="section-heading text-2xl">İdarə Paneli</h2>
        </div>
        <div className="panel text-slate-600">Yüklənir...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <div>
          <h2 className="section-heading text-2xl">İdarə Paneli</h2>
          <p className="mt-2 text-gray-600">
            Aura Grand Hotel - Sistem statistikası və məlumatları
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="feature-card">
          <p className="text-sm text-gray-500">Ümumi otel</p>
          <p className="text-3xl font-semibold mt-2">{stats.totalHotels}</p>
        </div>
        <div className="feature-card">
          <p className="text-sm text-gray-500">Ümumi otaq</p>
          <p className="text-3xl font-semibold mt-2">{stats.totalRooms}</p>
        </div>
        <div className="feature-card">
          <p className="text-sm text-gray-500">Ümumi istifadəçi</p>
          <p className="text-3xl font-semibold mt-2">{stats.totalUsers}</p>
        </div>
        <div className="feature-card">
          <p className="text-sm text-gray-500">Ümumi gəlir</p>
          <p className="text-3xl font-semibold mt-2">{stats.totalRevenue} ₼</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="feature-card">
          <p className="text-sm text-gray-500">Ümumi rezervasiya</p>
          <p className="text-3xl font-semibold mt-2">{stats.totalReservations}</p>
        </div>
        <div className="feature-card">
          <p className="text-sm text-gray-500">Gözləmədə</p>
          <p className="text-3xl font-semibold mt-2">{stats.pendingReservations}</p>
        </div>
        <div className="feature-card">
          <p className="text-sm text-gray-500">Təsdiqlənmiş</p>
          <p className="text-3xl font-semibold mt-2">{stats.confirmedReservations}</p>
        </div>
      </div>

      <div className="panel">
        <h3 className="section-heading text-lg mb-4">Sürətli idarəetmə</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/admin-panel/about" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">Haqqımızda</p>
            <p className="text-sm text-gray-500 mt-1">Haqqımızda məzmununu idarə et</p>
          </Link>
          <Link to="/admin-panel/services" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">Xidmətlər</p>
            <p className="text-sm text-gray-500 mt-1">Xidmətləri idarə et</p>
          </Link>
          <Link to="/admin-panel/gallery" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">Qalereya</p>
            <p className="text-sm text-gray-500 mt-1">Şəkilləri idarə et</p>
          </Link>
          <Link to="/admin-panel/faq" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">FAQ</p>
            <p className="text-sm text-gray-500 mt-1">Sual-cavabı idarə et</p>
          </Link>
          <Link to="/admin-panel/blog" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">Bloq</p>
            <p className="text-sm text-gray-500 mt-1">Bloq yazılarını idarə et</p>
          </Link>
          <Link to="/admin-panel/hotels" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">Otellər</p>
            <p className="text-sm text-gray-500 mt-1">Otelləri idarə et</p>
          </Link>
          <Link to="/admin-panel/rooms" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">Otaqlar</p>
            <p className="text-sm text-gray-500 mt-1">Otaqları idarə et</p>
          </Link>
          <Link to="/admin-panel/reservations" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">Rezervasiyalar</p>
            <p className="text-sm text-gray-500 mt-1">Rezervasiyaları idarə et</p>
          </Link>
          <Link to="/admin-panel/users" className="feature-card hover:shadow-lg transition-shadow">
            <p className="font-semibold">İstifadəçilər</p>
            <p className="text-sm text-gray-500 mt-1">İstifadəçiləri idarə et</p>
          </Link>
        </div>
      </div>

      {stats?.popularHotels?.length > 0 ? (
        <div className="panel">
          <h3 className="section-heading text-lg mb-3">Populyar otellər</h3>
          <div className="space-y-3">
            {stats.popularHotels.map(item => (
              <div key={item.hotel._id} className="flex items-center justify-between gap-4">
                <span className="font-medium">{item.hotel.name}</span>
                <span className="text-sm text-gray-500">{item.count} rezervasiya</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
