import React, { useState } from 'react'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryItems = [
    { _id: '1', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', title: 'Lüks Otaq', category: 'rooms', description: 'Müasir və zərif otaq dizaynı' },
    { _id: '2', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', title: 'Restoran', category: 'dining', description: 'Azərbaycan və beynəlxalq mətbəx' },
    { _id: '3', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', title: 'Hovuz', category: 'pool', description: 'Açıq və qapalı hovuz kompleksi' },
    { _id: '4', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', title: 'SPA Mərkəzi', category: 'spa', description: 'Relaksasiya və sağlamlıq mərkəzi' },
    { _id: '5', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', title: 'Konfrans Zalı', category: 'events', description: 'İclas və tədbirlər üçün zal' },
    { _id: '6', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', title: 'Prezident Suit', category: 'rooms', description: 'Lüks prezident suit otağı' },
    { _id: '7', image: 'https://images.unsplash.com/photo-15593393524-11d035aa65de?w=800', title: 'Lobi Bar', category: 'dining', description: 'Zərif lobi barı və istirahət zonası' },
    { _id: '8', image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', title: 'Fitness Zalı', category: 'spa', description: 'Müasir fitness avadanlıqları' }
  ]

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

        {filteredItems.length === 0 ? (
          <div className="panel text-center">Şəkil tapılmadı.</div>
        ) : (
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item._id} className="gallery-item" onClick={() => setSelectedImage(item)}>
                <img src={item.image} alt={item.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <p className="gallery-caption">{item.title}</p>
                  {item.description && <p className="gallery-caption text-xs">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
              <img src={selectedImage.image} alt={selectedImage.title} className="modal-image" />
              <div className="modal-info">
                <h3 className="modal-title">{selectedImage.title}</h3>
                {selectedImage.description && <p className="modal-description">{selectedImage.description}</p>}
                {selectedImage.category && <span className="modal-category">{selectedImage.category}</span>}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
