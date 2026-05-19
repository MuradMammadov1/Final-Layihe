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
      <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </div>

      {message && <div className="max-w-xl mx-auto p-4 rounded bg-slate-100">{message}</div>}

      <section className="bg-white p-6 rounded shadow max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">My Reservations</h3>
        {reservations.length === 0 ? (
          <p className="text-gray-600">No reservations yet.</p>
        ) : (
          <div className="space-y-4">
            {reservations.map(res => (
              <div key={res._id} className="border rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{res.hotel?.name || 'Hotel'}</h4>
                    <p className="text-sm text-gray-600">{res.hotel?.city}</p>
                  </div>
                  <span className="text-indigo-600 font-semibold">{res.status}</span>
                </div>
                <p className="mt-2 text-gray-700">Room: {res.room?.title || 'Any'}</p>
                <p className="text-sm text-gray-600">{new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}</p>
                <p className="mt-2">Total: ${res.totalPrice}</p>
                <button className="btn mt-3" onClick={() => cancelReservation(res._id)}>Cancel</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white p-6 rounded shadow max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">My Wishlist</h3>
        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {wishlist.map(hotel => (
              <div key={hotel._id} className="border rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{hotel.name}</h4>
                    <p className="text-sm text-gray-600">{hotel.city}</p>
                  </div>
                  <button className="btn" onClick={() => removeWishlist(hotel._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
