import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'

export default function SpecialOfferDetail() {
  const { id } = useParams()
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOffer = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/special-offers/${id}`)
        setOffer(res.data.data)
      } catch {
        // Backend-də tapılmadısa, fallback data istifadə edirik
        const demoOffers = [
          { _id: '1', title: 'Erkən Rezervasiya Endirimi', description: '30 gün əvvəldən rezervasiya edənlərə 20% endirim!', discount: '20%', validUntil: '31 Dekabr 2026', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', content: '30 gün əvvəldən rezervasiya edənlərə 20% endirim! Bu təklifdən yararlanmaq üçün erkən rezervasiya edin və lüks qonaqlıq təcrübəsini ən yaxşı qiymətlə əldə edin.' },
          { _id: '2', title: 'Ailə Paketi', description: '2 böyük + 2 uşaq üçün xüsusi paket. Uşaq yeməyi pulsuz!', discount: '15%', validUntil: '31 Yanvar 2027', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', content: '2 böyük + 2 uşaq üçün xüsusi paket. Uşaq yeməyi pulsuz! Ailənizlə birlikdə unudulmaz təcrübə yaşayın.' },
          { _id: '3', title: 'Bal Ayı Paketi', description: 'Romantik otaq, şam yeməyi və spa xidməti daxildir.', discount: '25%', validUntil: '28 Fevral 2027', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', content: 'Romantik otaq, şam yeməyi və spa xidməti daxildir. Bal ayınızı xüsusi edin.' },
          { _id: '4', title: 'Biznes Səyahətçilər üçün', description: '3 gecə və daha çox qalan biznes səyahətçilərə 10% endirim.', discount: '10%', validUntil: '31 Mart 2027', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', content: '3 gecə və daha çox qalan biznes səyahətçilərə 10% endirim. Biznes səyahətinizi rahat edin.' },
          { _id: '5', title: 'Həftəsonu Təklifi', description: 'Cümə axşamı-dən Bazar gününə qədər 2 gecə qalana 1 gecə pulsuz!', discount: '33%', validUntil: 'Hər həftə', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', content: 'Cümə axşamı-dən Bazar gününə qədər 2 gecə qalana 1 gecə pulsuz! Həftəsonunu xüsusi edin.' },
          { _id: '6', title: 'Qış Təklifi', description: 'Noyabr-Mart ayları üçün xüsusi qiymətlər.', discount: '30%', validUntil: '31 Mart 2027', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', content: 'Noyabr-Mart ayları üçün xüsusi qiymətlər. Qış fəslində lüks qonaqlıq təcrübəsi.' }
        ]
        const demoOffer = demoOffers.find(o => o._id === id)
        if (demoOffer) {
          setOffer(demoOffer)
        } else {
          setOffer(null)
        }
      } finally {
        setLoading(false)
      }
    }
    loadOffer()
  }, [id])

  if (loading) {
    return (
      <div className="page-special-offers">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <h1 className="page-hero-title">Xüsusi Təkliflər</h1>
          </div>
        </section>
        <section className="container section-pad">
          <div className="panel text-center">Yüklənir...</div>
        </section>
      </div>
    )
  }

  if (!offer) {
    return (
      <div className="page-special-offers">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Ana səhifə</Link>
              <span>/</span>
              <Link to="/special-offers">Xüsusi Təkliflər</Link>
              <span>/</span>
              <span>Təklif tapılmadı</span>
            </nav>
            <h1 className="page-hero-title">Təklif tapılmadı</h1>
          </div>
        </section>
        <section className="container section-pad">
          <div className="panel text-center">
            <p className="text-gray-600 mb-4">Axtardığınız təklif tapılmadı.</p>
            <Link to="/special-offers" className="btn btn-gold">Bütün təkliflərə qayıt</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-special-offers">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <Link to="/special-offers">Xüsusi Təkliflər</Link>
            <span>/</span>
            <span>{offer.title}</span>
          </nav>
          <h1 className="page-hero-title">{offer.title}</h1>
          <p className="page-hero-sub">{offer.description}</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel max-w-4xl mx-auto">
          {offer.image && (
            <img 
              src={offer.image} 
              alt={offer.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="badge">{offer.discount} ENDİRİM</span>
            <span>Bitiş tarixi: {offer.validUntil}</span>
          </div>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: offer.content || offer.description }} />
          </div>

          <div className="mt-8 pt-6 border-t flex gap-4">
            <Link to="/rooms" className="btn btn-gold">İndi rezerv et</Link>
            <Link to="/special-offers" className="btn secondary">
              ← Bütün təkliflərə qayıt
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
