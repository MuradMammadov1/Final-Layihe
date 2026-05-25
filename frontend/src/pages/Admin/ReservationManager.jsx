import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function ReservationManager(){
  const [reservations, setReservations] = useState([])
  const [filter, setFilter] = useState('all')
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
      setMessage('Status yeniləndi.')
    } catch {
      setMessage('Status yenilənmədi.')
    }
  }

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(r => r.status === filter)

  return (
    <div className="space-y-6">
      <div className="panel">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Rezervasiya İdarəetməsi</h2>
          <p className="text-gray-600">Rezervasiya statuslarını yoxlayın və yeniləyin.</p>
        </div>
        {message && <div className="alert mt-4">{message}</div>}

        <div className="flex gap-2 mt-4 flex-wrap">
          <button className={`btn btn-sm ${filter === 'all' ? 'btn-gold' : 'secondary'}`} onClick={() => setFilter('all')}>Hamısı</button>
          <button className={`btn btn-sm ${filter === 'pending' ? 'btn-gold' : 'secondary'}`} onClick={() => setFilter('pending')}>Gözləyən</button>
          <button className={`btn btn-sm ${filter === 'confirmed' ? 'btn-gold' : 'secondary'}`} onClick={() => setFilter('confirmed')}>Təsdiqlənmiş</button>
          <button className={`btn btn-sm ${filter === 'cancelled' ? 'btn-gold' : 'secondary'}`} onClick={() => setFilter('cancelled')}>Ləğv edilmiş</button>
        </div>

        {filteredReservations.length === 0 ? (
          <div className="p-4 rounded bg-slate-100 text-gray-700 mt-4">Rezervasiya tapılmadı.</div>
        ) : (
          <div className="space-y-4 mt-4">
            {filteredReservations.map(res => (
              <div key={res._id} className="p-4 rounded border bg-slate-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{res.hotel?.name || 'Otel'}</h3>
                    <p className="text-sm text-gray-600">{res.user?.name} • {res.user?.email}</p>
                    <p className="mt-1 text-gray-700">{new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}</p>
                    {res.totalPrice && <p className="mt-1 text-indigo-600 font-semibold">${res.totalPrice}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="badge">{res.status}</span>
                    {res.status === 'pending' && (
                      <>
                        <button className="btn secondary" onClick={() => updateStatus(res._id, 'confirmed')}>Təsdiqlə</button>
                        <button className="btn secondary" onClick={() => updateStatus(res._id, 'cancelled')}>Ləğv et</button>
                      </>
                    )}
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
