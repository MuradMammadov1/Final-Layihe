import React, { useEffect, useState, useContext } from 'react'
import HotelCard from '../components/HotelCard'
import api from '../api'
import { AuthContext } from '../context/AuthContext'

export default function Hotels(){
  const [hotels, setHotels] = useState([])
  const [city, setCity] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [wishlistIds, setWishlistIds] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)

  const loadHotels = async (params = {}) => {
    setLoading(true)
    try {
      const res = await api.get('/hotels', { params })
      setHotels(res.data.data || [])
    } catch (err) {
      setHotels([])
    } finally {
      setLoading(false)
    }
  }

  const loadWishlist = async () => {
    if (!user) {
      setWishlistIds([])
      return
    }
    try {
      const res = await api.get('/wishlist')
      setWishlistIds(res.data.data.map(item => item._id))
    } catch {
      setWishlistIds([])
    }
  }

  useEffect(() => {
    loadHotels()
  }, [])

  useEffect(() => {
    loadWishlist()
  }, [user])

  const handleSearch = e => {
    e.preventDefault()
    loadHotels({ city, minPrice, maxPrice, startDate, endDate })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow max-w-full">
        <h2 className="text-2xl font-semibold mb-4">Search Hotels</h2>
        <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-5">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input value={city} onChange={e => setCity(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Baku" />
          </div>
          <div>
            <label className="block text-sm font-medium">Min Price</label>
            <input value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full border px-3 py-2 rounded" type="number" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Price</label>
            <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full border px-3 py-2 rounded" type="number" placeholder="500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border px-3 py-2 rounded" type="date" />
          </div>
          <div className="flex items-end">
            <button className="btn w-full" type="submit">Search</button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Hotels</h2>
        {loading ? (
          <div className="bg-white p-6 rounded shadow text-center">Loading hotels...</div>
        ) : hotels.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">No hotels found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotels.map(h => (
              <HotelCard
                key={h._id}
                hotel={h}
                saved={wishlistIds.includes(h._id)}
                onToggleWishlist={user ? async () => {
                  try {
                    if (wishlistIds.includes(h._id)) {
                      await api.delete(`/wishlist/${h._id}`)
                      setWishlistIds(prev => prev.filter(id => id !== h._id))
                    } else {
                      await api.post(`/wishlist/${h._id}`)
                      setWishlistIds(prev => [...prev, h._id])
                    }
                  } catch (err) {
                    console.warn('Wishlist update failed', err)
                  }
                } : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
