import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { ROOM_IMAGES } from '../data/images'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ city: '', minPrice: '', maxPrice: '', type: '' })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true)
      try {
        const res = await api.get('/rooms')
        setRooms(res.data.data || [])
        setTotalPages(Math.ceil((res.data.data?.length || 0) / itemsPerPage))
      } catch {
        setRooms([])
      } finally {
        setLoading(false)
      }
    }
    loadRooms()
  }, [])

  const filteredRooms = rooms.filter(room => {
    const cityMatch = !filter.city || room.hotel?.city?.toLowerCase().includes(filter.city.toLowerCase())
    const minPriceMatch = !filter.minPrice || room.price >= Number(filter.minPrice)
    const maxPriceMatch = !filter.maxPrice || room.price <= Number(filter.maxPrice)
    const typeMatch = !filter.type || room.type?.toLowerCase().includes(filter.type.toLowerCase())
    return cityMatch && minPriceMatch && maxPriceMatch && typeMatch
  })

  const paginatedRooms = filteredRooms.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const demoRooms = paginatedRooms.length ? paginatedRooms : ROOM_IMAGES.map((img, i) => ({
    _id: `demo-${i}`,
    title: ['Klassik İkiqat', 'Deluxe Suite', 'Executive Otaq', 'Ailə Otağı', 'Premium King', 'Studio Otaq'][i],
    type: ['Standard', 'Suite', 'Deluxe', 'Family', 'Premium', 'Studio'][i],
    price: [120, 150, 180, 200, 220, 160][i],
    capacity: [2, 2, 2, 4, 2, 2][i],
    description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.',
    amenities: ['WiFi', 'TV', 'Kondisioner', 'Mini bar'],
    hotel: {
      _id: 'demo-hotel',
      name: 'Aura Grand Hotel',
      city: 'Bakı',
      description: 'Lüks və rahat qonaqlıq təcrübəsi.',
      images: [img]
    }
  }))

  return (
    <div className="page-rooms">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Otaqlar</span>
          </nav>
          <h1 className="page-hero-title">Otaqlarımız</h1>
          <p className="page-hero-sub">Hər zövqə uyğun otaq növləri.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel mb-6">
          <h3 className="section-heading text-lg mb-4">Filter</h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm font-medium">Şəhər</label>
              <input
                className="input mt-1"
                placeholder="Bakı, Quba..."
                value={filter.city}
                onChange={e => setFilter(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Min Qiymət</label>
              <input
                type="number"
                className="input mt-1"
                placeholder="0"
                value={filter.minPrice}
                onChange={e => setFilter(prev => ({ ...prev, minPrice: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Max Qiymət</label>
              <input
                type="number"
                className="input mt-1"
                placeholder="1000"
                value={filter.maxPrice}
                onChange={e => setFilter(prev => ({ ...prev, maxPrice: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Növ</label>
              <input
                className="input mt-1"
                placeholder="Standard, Deluxe..."
                value={filter.type}
                onChange={e => setFilter(prev => ({ ...prev, type: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="btn btn-sm" onClick={() => setFilter({ city: '', minPrice: '', maxPrice: '', type: '' })}>
              Təmizlə
            </button>
            <span className="text-sm text-gray-600 self-center">
              {filteredRooms.length} nəticə
            </span>
          </div>
        </div>

        {loading ? (
          <div className="panel text-center">Yüklənir...</div>
        ) : (
          <>
            <div className="rooms-grid">
              {demoRooms.map((room, idx) => (
                <Link key={room._id} to={`/rooms/${room._id}`} className="room-card panel">
                  <div className="room-card-image">
                    <img
                      src={rooms.length ? (room.hotel?.images?.[0] || ROOM_IMAGES[0]) : ROOM_IMAGES[idx % ROOM_IMAGES.length]}
                      alt={room.title}
                    />
                  </div>
                  <div className="room-card-content">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{room.title}</h3>
                      <span className="pill">{room.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>👥 {room.capacity} nəfər</span>
                      <span>💰 ${room.price}/gecə</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities?.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="amenity-pill text-xs">{amenity}</span>
                      ))}
                    </div>
                    <button className="btn btn-gold w-full">Detallara bax</button>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  className="btn btn-sm secondary"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Əvvəl
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`btn btn-sm ${page === p ? 'btn-gold' : 'secondary'}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="btn btn-sm secondary"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Növbəti
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
