import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      const res = await api.get('/gallery')
      setGalleryItems(res.data.data || [])
    } catch {
      setGalleryItems([])
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

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
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-gold' : 'btn-outline'}`}
          >
            Hamısı
          </button>
          <button 
            onClick={() => setSelectedCategory('rooms')}
            className={`btn btn-sm ${selectedCategory === 'rooms' ? 'btn-gold' : 'btn-outline'}`}
          >
            Otaqlar
          </button>
          <button 
            onClick={() => setSelectedCategory('dining')}
            className={`btn btn-sm ${selectedCategory === 'dining' ? 'btn-gold' : 'btn-outline'}`}
          >
            Restoran
          </button>
          <button 
            onClick={() => setSelectedCategory('pool')}
            className={`btn btn-sm ${selectedCategory === 'pool' ? 'btn-gold' : 'btn-outline'}`}
          >
            Hovuz
          </button>
          <button 
            onClick={() => setSelectedCategory('spa')}
            className={`btn btn-sm ${selectedCategory === 'spa' ? 'btn-gold' : 'btn-outline'}`}
          >
            SPA
          </button>
          <button 
            onClick={() => setSelectedCategory('events')}
            className={`btn btn-sm ${selectedCategory === 'events' ? 'btn-gold' : 'btn-outline'}`}
          >
            Tədbirlər
          </button>
        </div>

        {loading ? (
          <div className="panel text-center">Yüklənir...</div>
        ) : filteredItems.length === 0 ? (
          <div className="panel text-center">Şəkil tapılmadı.</div>
        ) : (
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item._id} className="gallery-item">
                <img src={item.image} alt={item.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <p className="gallery-caption">{item.title}</p>
                  {item.description && <p className="gallery-caption text-xs">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
