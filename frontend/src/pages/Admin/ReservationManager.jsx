import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function ReservationManager(){
  const [reservations, setReservations] = useState([])
  const [message, setMessage] = useState('')

  const loadReservations = async () => {
    try {
      const res = await api.get('/reservation/all')
      setReservations(res.data.data || [])
    } catch {
      setReservations([])
    }
  }

  useEffect(() => { loadReservations() }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/reservation/${id}/status`, { status })
      setReservations(prev => prev.map(r => r._id === id ? { ...r, status } : r))
      setMessage('Status updated.')
    } catch {
      setMessage('Update failed.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Reservation Management</h2>
        {message && <div className="mb-4 p-3 rounded bg-slate-100 text-gray-700">{message}</div>}
        {reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <div className="space-y-4">
            {reservations.map(res => (
              <div key={res._id} className="border rounded p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div>
                    <h3 className="font-semibold">{res.hotel?.name || 'Hotel'}</h3>
                    <p className="text-sm text-gray-600">{res.user?.name} - {res.user?.email}</p>
                    <p className="mt-1 text-gray-700">{new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-3 py-1 rounded bg-slate-100 text-gray-700">{res.status}</span>
                    <button className="btn" onClick={() => updateStatus(res._id, 'confirmed')}>Confirm</button>
                    <button className="btn" onClick={() => updateStatus(res._id, 'cancelled')}>Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
