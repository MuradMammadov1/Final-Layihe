import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Wishlist() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const res = await api.get('/wishlist')
        setHotels(res.data.data || [])
      } catch {
        setHotels([])
      } finally {
        setLoading(false)
      }
    }
    loadWishlist()
  }, [])

  const handleRemove = async hotelId => {
    if (!confirm('Otel wishlist-dən silinsin?')) return
    try {
      await api.delete(`/wishlist/${hotelId}`)
      setHotels(prev => prev.filter(h => h._id !== hotelId))
      alert('Otel wishlist-dən silindi')
    } catch (err) {
      alert('Xəta baş verdi')
    }
  }

  if (loading) {
    return <div className="container section-pad panel text-center">Yüklənir...</div>
  }

  return (
    <div className="page-wishlist">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Favoritlər</span>
          </nav>
          <h1 className="page-hero-title">Favorit Otellərim</h1>
          <p className="page-hero-sub">Seçdiyiniz otellər burada görünür.</p>
        </div>
      </section>

      <section className="container section-pad">
        {hotels.length === 0 ? (
          <div className="panel text-center py-12">
            <p className="text-gray-600 mb-4">Favoritlərinizdə otel yoxdur.</p>
            <Link to="/rooms" className="btn btn-gold">Otaqlara bax</Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map(hotel => (
              <div key={hotel._id} className="panel overflow-hidden">
                {hotel.images?.[0] && (
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 mb-2">{hotel.city}</p>
                  <p className="text-gray-600 mb-4">{hotel.description?.substring(0, 100)}...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{hotel.price} ₼/gecə</span>
                    <button
                      onClick={() => handleRemove(hotel._id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                  <Link to={`/rooms/${hotel._id}`} className="btn btn-gold w-full text-center block mt-4">
                    Detallar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
