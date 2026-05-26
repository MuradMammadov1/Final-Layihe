import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Gallery() {
  const [hotels, setHotels] = useState([])
  const [rooms, setRooms] = useState([])
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [hotelsRes, roomsRes] = await Promise.all([
          api.get('/hotels'),
          api.get('/rooms')
        ])
        setHotels(hotelsRes.data.data || [])
        setRooms(roomsRes.data.data || [])
      } catch {
        setHotels([])
        setRooms([])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const allImages = [
    ...hotels.flatMap(hotel => 
      (hotel.images || []).map(img => ({
        url: img,
        hotelName: hotel.name,
        hotelId: hotel._id,
        type: 'hotel'
      }))
    ),
    ...rooms.flatMap(room => 
      (room.hotel?.images || []).map(img => ({
        url: img,
        hotelName: room.hotel?.name || 'Otel',
        hotelId: room.hotel?._id,
        roomId: room._id,
        type: 'room'
      }))
    )
  ]

  return (
    <div className="page-gallery">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span>Ana səhifə</span>
            <span>/</span>
            <span>Qalereya</span>
          </nav>
          <h1 className="page-hero-title">Qalereya</h1>
          <p className="page-hero-sub">Otellərimizin gözəl məkanlarını kəşf edin.</p>
        </div>
      </section>

      <section className="container section-pad">
        {loading ? (
          <div className="panel text-center">Yüklənir...</div>
        ) : allImages.length === 0 ? (
          <div className="panel">Şəkil tapılmadı.</div>
        ) : (
          <div className="gallery-grid">
            {allImages.map((img, idx) => (
              <Link 
                key={`${img.hotelId}-${idx}`} 
                className="gallery-item"
                to={img.type === 'room' ? `/rooms/${img.roomId}` : `/rooms`}
              >
                <img 
                  src={img.url} 
                  alt={`${img.hotelName} - ${idx + 1}`}
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <p className="gallery-caption">{img.hotelName}</p>
                  <p className="gallery-caption text-xs">{img.type === 'room' ? 'Otaq' : 'Otel'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
