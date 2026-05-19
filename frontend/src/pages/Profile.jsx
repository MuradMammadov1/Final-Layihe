import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { AuthContext } from '../context/AuthContext'

export default function Profile(){
  const { user, loading, logout, reload } = useContext(AuthContext)
  const [reservations, setReservations] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
      return
    }

    if (user) {
      api.get('/reservation/user')
        .then(res => setReservations(res.data.data || []))
        .catch(() => setReservations([]))

      api.get('/wishlist')
        .then(res => setWishlist(res.data.data || []))
        .catch(() => setWishlist([]))
    }
  }, [user, loading, navigate])

  const cancelReservation = async id => {
    try {
      await api.delete(`/reservation/${id}`)
      setReservations(prev => prev.filter(r => r._id !== id))
      setMessage('Reservation cancelled.')
    } catch (err) {
      setMessage('Failed to cancel reservation.')
    }
  }

  const removeWishlist = async hotelId => {
    try {
      await api.delete(`/wishlist/${hotelId}`)
      setWishlist(prev => prev.filter(h => h._id !== hotelId))
      setMessage('Removed from wishlist.')
      await reload()
    } catch (err) {
      setMessage('Failed to remove from wishlist.')
    }
  }

  if (loading || !user) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="panel max-w-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="mt-1 text-sm text-indigo-600">Member dashboard</p>
          </div>
          <button className="btn secondary" onClick={logout}>Logout</button>
        </div>
      </div>

      {message && <div className="alert max-w-xl mx-auto">{message}</div>}

      <section className="panel max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">My Reservations</h3>
        {reservations.length === 0 ? (
          <p className="text-gray-600">No reservations yet.</p>
        ) : (
          <div className="space-y-4">
            {reservations.map(res => (
              <div key={res._id} className="border rounded p-4 bg-slate-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div>
                    <h4 className="font-semibold">{res.hotel?.name || 'Hotel'}</h4>
                    <p className="text-sm text-gray-600">{res.hotel?.city}</p>
                    <p className="mt-1 text-gray-700">Room: {res.room?.title || 'Any'}</p>
                    <p className="text-sm text-gray-600">{new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-start md:items-end">
                    <span className="badge">{res.status}</span>
                    <p className="text-indigo-600 font-semibold">Total: ${res.totalPrice}</p>
                    <button className="btn secondary" onClick={() => cancelReservation(res._id)}>Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="panel max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">My Wishlist</h3>
        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {wishlist.map(hotel => (
              <div key={hotel._id} className="border rounded p-4 bg-slate-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div>
                    <h4 className="font-semibold">{hotel.name}</h4>
                    <p className="text-sm text-gray-600">{hotel.city}</p>
                  </div>
                  <button className="btn secondary" onClick={() => removeWishlist(hotel._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
