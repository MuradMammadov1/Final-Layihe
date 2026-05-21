import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function Dashboard(){
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get('/hotels/stats')
        setStats(res.data.data)
      } catch (err) {
        setError('Məlumat yüklənmədi. Admin kimi daxil olduğunuzu və backend-in işlədiyini yoxlayın.')
      }
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="panel">
        <div>
          <h2 className="section-heading text-2xl">İdarə yığcamı</h2>
          <p className="mt-2 text-gray-600">
            Otel sayısı və bron statistikaları — API: <code className="text-sm">GET /api/hotels/stats</code>
          </p>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      {!stats && !error ? (
        <div className="panel text-slate-600">Statistika yüklənir...</div>
      ) : null}

      {stats ? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="feature-card">
            <p className="text-sm text-gray-500">Ümumi otel</p>
            <p className="text-3xl font-semibold mt-2">{stats.totalHotels}</p>
          </div>
          <div className="feature-card">
            <p className="text-sm text-gray-500">Ümumi bron</p>
            <p className="text-3xl font-semibold mt-2">{stats.totalReservations}</p>
          </div>
          <div className="feature-card">
            <p className="text-sm text-gray-500">Təsdiqlənmiş bron</p>
            <p className="text-3xl font-semibold mt-2">{stats.confirmedReservations}</p>
          </div>
        </div>
      ) : null}

      {stats?.popularHotels?.length > 0 ? (
        <div className="panel">
          <h3 className="section-heading text-lg mb-3">Populyar otellər (reytinqə görə)</h3>
          <div className="space-y-3">
            {stats.popularHotels.map(hotel => (
              <div key={hotel._id} className="flex items-center justify-between gap-4">
                <span className="font-medium">{hotel.name}</span>
                <span className="text-sm text-gray-500">{hotel.city || '—'}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
