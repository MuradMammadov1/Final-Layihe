import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function Dashboard(){
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

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
      }
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="panel">
        <div>
          <h2 className="section-heading text-2xl">İdarə Paneli</h2>
          <p className="mt-2 text-gray-600">
            Sistem statistikası və məlumatları
          </p>
        </div>
      </div>

      {stats ? (
        <>
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
        </>
      ) : (
        <div className="panel text-slate-600">Statistika yüklənir...</div>
      )}
    </div>
  )
}
