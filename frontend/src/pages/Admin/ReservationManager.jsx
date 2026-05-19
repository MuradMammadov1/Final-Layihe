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
      <div className="panel">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Reservation Management</h2>
          <p className="text-gray-600">Review and update reservation statuses to keep guest stays on track.</p>
        </div>
        {message && <div className="alert mt-4">{message}</div>}

        {reservations.length === 0 ? (
          <div className="p-4 rounded bg-slate-100 text-gray-700">No reservations found.</div>
        ) : (
          <div className="space-y-4 mt-4">
            {reservations.map(res => (
              <div key={res._id} className="p-4 rounded border bg-slate-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{res.hotel?.name || 'Hotel'}</h3>
                    <p className="text-sm text-gray-600">{res.user?.name} • {res.user?.email}</p>
                    <p className="mt-1 text-gray-700">{new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="badge">{res.status}</span>
                    <button className="btn secondary" onClick={() => updateStatus(res._id, 'confirmed')}>Confirm</button>
                    <button className="btn secondary" onClick={() => updateStatus(res._id, 'cancelled')}>Cancel</button>
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
