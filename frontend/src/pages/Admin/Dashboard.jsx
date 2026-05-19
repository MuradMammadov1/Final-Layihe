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
        setError('Unable to load dashboard data.')
      }
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="panel">
        <div>
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <p className="mt-2 text-gray-600">Manage hotels and reservations, review dashboard metrics, and keep the platform running smoothly.</p>
        </div>
      </div>

      {error && <div className="alert">{error}</div>}

      {!stats ? (
        <div className="panel text-slate-600">Loading statistics...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="feature-card">
            <p className="text-sm text-gray-500">Total Hotels</p>
            <p className="text-3xl font-semibold mt-2">{stats.totalHotels}</p>
          </div>
          <div className="feature-card">
            <p className="text-sm text-gray-500">Total Reservations</p>
            <p className="text-3xl font-semibold mt-2">{stats.totalReservations}</p>
          </div>
          <div className="feature-card">
            <p className="text-sm text-gray-500">Confirmed Reservations</p>
            <p className="text-3xl font-semibold mt-2">{stats.confirmedReservations}</p>
          </div>
        </div>
      )}

      {stats?.popularHotels?.length > 0 && (
        <div className="panel">
          <h3 className="text-lg font-semibold mb-3">Popular Hotels</h3>
          <div className="space-y-3">
            {stats.popularHotels.map(hotel => (
              <div key={hotel._id} className="flex items-center justify-between gap-4">
                <span>{hotel.name}</span>
                <span className="text-sm text-gray-500">{hotel.city || 'Location unknown'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
