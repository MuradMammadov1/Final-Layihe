import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import HotelCard from '../components/HotelCard'
import api from '../api'
import { AuthContext } from '../context/AuthContext'

export default function Hotels(){
  const [searchParams] = useSearchParams()
  const [hotels, setHotels] = useState([])
  const [city, setCity] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [rating, setRating] = useState('')
  const [startDate, setStartDate] = useState(() => searchParams.get('startDate') || '')
  const [endDate, setEndDate] = useState(() => searchParams.get('endDate') || '')
  const [wishlistIds, setWishlistIds] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useContext(AuthContext)

  const loadHotels = async (params = {}) => {
    setLoading(true)
    try {
      const res = await api.get('/hotels', { params: { ...params, page, limit: 9 } })
      setHotels(res.data.data || [])
      setTotalPages(res.data.pagination?.pages || 1)
    } catch (err) {
      // Demo otel məlumatları
      const demoHotels = [
        { _id: 'demo-1', name: 'Aura Grand Hotel', city: 'Bakı', price: 150, rating: 4.5, images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'], description: 'Lüks və rahat qonaqlıq təcrübəsi.' },
        { _id: 'demo-2', name: 'Royal Palace Hotel', city: 'Bakı', price: 200, rating: 4.8, images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'], description: 'Şəhər mərkəzində lüks otel.' },
        { _id: 'demo-3', name: 'Caspian Resort', city: 'Quba', price: 120, rating: 4.3, images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'], description: 'Təbiət mərkəzində istirahət.' },
        { _id: 'demo-4', name: 'Mountain View Hotel', city: 'Qəbələ', price: 180, rating: 4.6, images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'], description: 'Dağ mənzərəsi ilə otel.' },
        { _id: 'demo-5', name: 'Seaside Resort', city: 'Lənkəran', price: 160, rating: 4.4, images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'], description: 'Dəniz kənarında istirahət.' },
        { _id: 'demo-6', name: 'City Center Inn', city: 'Bakı', price: 100, rating: 4.2, images: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'], description: 'Şəhər mərkəzində rahat otaqlar.' }
      ]
      setHotels(demoHotels)
      setTotalPages(1)
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
  }, [page])

  useEffect(() => {
    loadWishlist()
  }, [user])

  const handleSearch = e => {
    e.preventDefault()
    setPage(1)
    loadHotels({ city, minPrice, maxPrice, rating, startDate, endDate })
  }

  const handleReset = () => {
    setCity('')
    setMinPrice('')
    setMaxPrice('')
    setRating('')
    setStartDate('')
    setEndDate('')
    setPage(1)
    loadHotels()
  }

  return (
    <div className="space-y-8">
      <header className="page-banner">
        <h1 className="page-hero-title">Otellər</h1>
        <p className="page-hero-sub">Bakı və Azərbaycan üzrə seçilmiş otellər.</p>
      </header>
      <div className="panel max-w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
          <div>
            <h2 className="section-heading">Otel axtar</h2>
            <p className="text-gray-600 mt-2">Növbəti səyahətiniz üçün ən yaxşı oteli tapın.</p>
          </div>
          <div className="text-right text-sm text-gray-500">{hotels.length} otel tapıldı</div>
        </div>

        <form onSubmit={handleSearch} className="grid gap-4 hotel-filter-grid mt-6">
          <div>
            <label className="block text-sm font-medium">Şəhər</label>
            <input value={city} onChange={e => setCity(e.target.value)} className="input" placeholder="Bakı" />
          </div>
          <div>
            <label className="block text-sm font-medium">Min qiymət</label>
            <input value={minPrice} onChange={e => setMinPrice(e.target.value)} className="input" type="number" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium">Maks qiymət</label>
            <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="input" type="number" placeholder="500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Min reytinq</label>
            <select value={rating} onChange={e => setRating(e.target.value)} className="input">
              <option value="">Fərqi yoxdur</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Giriş</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium">Çıxış</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate || undefined} className="input" />
          </div>
          <div className="flex items-end">
            <button className="btn w-full" type="submit">Axtar</button>
          </div>
          <div className="flex items-end">
            <button className="btn btn-outline-gold w-full" type="button" onClick={handleReset}>Təmizlə</button>
          </div>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Mövcud otellər</h2>
          <span className="badge">{hotels.length} nəticə</span>
        </div>

        {loading ? (
          <div className="panel text-center">Otellər yüklənir...</div>
        ) : hotels.length === 0 ? (
          <div className="panel">Filtrə uyğun otel tapılmadı.</div>
        ) : (
          <>
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

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  className="btn secondary"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Əvvəlki
                </button>
                <span className="text-gray-600">
                  Səhifə {page} / {totalPages}
                </span>
                <button
                  className="btn secondary"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Növbəti
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
