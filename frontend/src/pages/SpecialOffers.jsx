import React from 'react'
import { Link } from 'react-router-dom'

export default function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: 'Erkən Rezervasiya Endirimi',
      description: '30 gün əvvəldən rezervasiya edənlərə 20% endirim!',
      discount: '20%',
      validUntil: '31 Dekabr 2026',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      id: 2,
      title: 'Ailə Paketi',
      description: '2 böyük + 2 uşaq üçün xüsusi paket. Uşaq yeməyi pulsuz!',
      discount: '15%',
      validUntil: '31 Yanvar 2027',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    },
    {
      id: 3,
      title: 'Bal Ayı Paketi',
      description: 'Romantik otaq, şam yeməyi və spa xidməti daxildir.',
      discount: '25%',
      validUntil: '28 Fevral 2027',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
    },
    {
      id: 4,
      title: 'Biznes Səyahətçilər üçün',
      description: '3 gecə və daha çox qalan biznes səyahətçilərə 10% endirim.',
      discount: '10%',
      validUntil: '31 Mart 2027',
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800'
    },
    {
      id: 5,
      title: 'Həftəsonu Təklifi',
      description: 'Cümə axşamı-dən Bazar gününə qədər 2 gecə qalana 1 gecə pulsuz!',
      discount: '33%',
      validUntil: 'Hər həftə',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    },
    {
      id: 6,
      title: 'Qış Təklifi',
      description: 'Noyabr-Mart ayları üçün xüsusi qiymətlər.',
      discount: '30%',
      validUntil: '31 Mart 2027',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    }
  ]

  return (
    <div className="page-special-offers">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Xüsusi Təkliflər</span>
          </nav>
          <h1 className="page-hero-title">Xüsusi Təkliflər</h1>
          <p className="page-hero-sub">Ən yaxşı qiymətlərlə lüks qonaqlıq təcrübəsi.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card panel">
              <div className="offer-image">
                <img src={offer.image} alt={offer.title} />
                <span className="offer-badge">{offer.discount} ENDİRİM</span>
              </div>
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-meta">
                  <span className="offer-valid">Bitiş tarixi: {offer.validUntil}</span>
                </div>
                <Link to="/rooms" className="btn btn-gold w-full mt-4">İndi rezerv et</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="panel text-center mt-8">
          <h2 className="section-heading">Daha çox endirim əldə edin</h2>
          <p className="text-gray-600 mt-4 mb-6">
            Bülletenə abunə olun və xüsusi təkliflərdən ilk xəbər tutun.
          </p>
          <div className="flex gap-2 justify-center">
            <input type="email" placeholder="E-poçt ünvanınız" className="input" style={{ maxWidth: '300px' }} />
            <button className="btn btn-gold">Abunə ol</button>
          </div>
        </div>
      </section>
    </div>
  )
}
