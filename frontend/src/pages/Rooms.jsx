import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { ROOM_IMAGES } from '../data/images'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const res = await api.get('/rooms')
        setRooms(res.data.data || [])
      } catch {
        setRooms([])
      } finally {
        setLoading(false)
      }
    }
    loadRooms()
  }, [])

  const demoRooms = rooms.length ? rooms : ROOM_IMAGES.map((img, i) => ({
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
        {loading ? (
          <div className="panel text-center">Yüklənir...</div>
        ) : (
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
        )}
      </section>
    </div>
  )
}
