import React, { useState, useEffect } from 'react'
import api from '../api'

export default function Gallery() {
  const [hotels, setHotels] = useState([])
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const res = await api.get('/hotels')
        setHotels(res.data.data || [])
      } catch {
        setHotels([])
      } finally {
        setLoading(false)
      }
    }
    loadHotels()
  }, [])

  const allImages = hotels.flatMap(hotel => 
    (hotel.images || []).map(img => ({
      url: img,
      hotelName: hotel.name,
      hotelId: hotel._id
    }))
  )

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
              <div 
                key={`${img.hotelId}-${idx}`} 
                className="gallery-item"
                onClick={() => setSelectedHotel(img)}
              >
                <img 
                  src={img.url} 
                  alt={`${img.hotelName} - ${idx + 1}`}
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <p className="gallery-caption">{img.hotelName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedHotel && (
        <div className="modal" onClick={() => setSelectedHotel(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedHotel(null)}
            >
              ×
            </button>
            <img 
              src={selectedHotel.url} 
              alt={selectedHotel.hotelName}
              className="modal-image"
            />
            <p className="modal-caption">{selectedHotel.hotelName}</p>
          </div>
        </div>
      )}
    </div>
  )
}
