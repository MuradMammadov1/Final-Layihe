import React, { useEffect, useState, useContext } from 'react'
import HotelCard from '../components/HotelCard'
import api from '../api'
import { AuthContext } from '../context/AuthContext'

export default function Hotels(){
  const [hotels, setHotels] = useState([])
  const [city, setCity] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [rating, setRating] = useState('')
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
    loadHotels({ city, minPrice, maxPrice, rating, startDate, endDate })
  }

  return (
    <div className="space-y-8">
      <div className="panel max-w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Search Hotels</h2>
            <p className="text-gray-600 mt-2">Find the best hotel for your next trip with flexible filters and real-time search.</p>
          </div>
          <div className="text-right text-sm text-gray-500">{hotels.length} hotels available</div>
        </div>

        <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-5 mt-6">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input value={city} onChange={e => setCity(e.target.value)} className="input" placeholder="Baku" />
          </div>
          <div>
            <label className="block text-sm font-medium">Min Price</label>
            <input value={minPrice} onChange={e => setMinPrice(e.target.value)} className="input" type="number" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Price</label>
            <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="input" type="number" placeholder="500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Min Rating</label>
            <select value={rating} onChange={e => setRating(e.target.value)} className="input">
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn w-full" type="submit">Search</button>
          </div>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Available hotels</h2>
          <span className="badge">{hotels.length} results</span>
        </div>

        {loading ? (
          <div className="panel text-center">Loading hotels...</div>
        ) : hotels.length === 0 ? (
          <div className="panel">No hotels found.</div>
        ) : (
          <div className="grid gap-4 hotel-grid mt-4">
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
