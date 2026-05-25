import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import BookingBar from '../components/BookingBar'
import HotelCard from '../components/HotelCard'
import Newsletter from '../components/Newsletter'
import api from '../api'
import { ABOUT_IMAGE, DINING_IMAGE, POOL_IMAGE, ROOM_IMAGES } from '../data/images'
import { HOME_NEWS, HOME_SERVICES, HOME_STATS } from '../data/siteContent'

export default function Home() {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    api.get('/hotels', { params: { limit: 6 } })
      .then(res => setHotels((res.data.data || []).slice(0, 6)))
      .catch(() => setHotels([]))
  }, [])

  const demoRooms = hotels.length
    ? hotels
    : ROOM_IMAGES.map((img, i) => ({
        _id: `demo-${i}`,
        name: ['Klassik İkiqat', 'Deluxe Suite', 'Executive Otaq', 'Ailə Otağı', 'Premium King', 'Studio Otaq'][i],
        city: 'Bakı',
        price: [120, 150, 180, 200, 220, 160][i],
        rating: 4.5 + (i % 3) * 0.1,
        images: [img],
        description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.',
      }))

  return (
  <>
    <div className="home-hero-wrap">
      <HeroSlider />
      <div className="container booking-bar-wrap">
        <BookingBar />
      </div>
    </div>

    <section className="section-pad container about-section">
      <div className="about-grid">
        <img src={ABOUT_IMAGE} alt="Aura Grand otel" className="about-image" />
        <div>
          <span className="section-label">Şirkətimiz haqqında</span>
          <h2 className="section-heading">25 illik xidmət təcrübəsi</h2>
          <p className="text-gray-600 mt-4">
            Aura Grand qonaqlarını şəhərin mərkəzində lüks, rahatlıq və peşəkar xidmətlə qarşılayır.
            Müasir otaqlar, restoran, hovuz və sürətli onlayn rezervasiya ilə səyahətinizi asanlaşdırırıq.
          </p>
          <p className="text-gray-600 mt-3">
            Dizayn ideyaları Marian (otel hero, otaqlar, blog) və Radisson (əlaqə, peşəkar başlıq)
            nümunələrinə uyğunlaşdırılıb — final layihə üçün təqdimat formatı.
          </p>
          <Link to="/rooms" className="btn btn-gold mt-5">Ətraflı</Link>
        </div>
      </div>
    </section>

    <section className="stats-strip" aria-label="Rəqəmlər">
      <div className="stats-strip-grid">
        {HOME_STATS.map(s => (
          <div key={s.label}>
            <div className="stats-strip-value">{s.value}</div>
            <div className="stats-strip-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="section-pad section-muted">
      <div className="container">
        <div className="text-center mb-8">
          <span className="section-label">Otaqlarımız</span>
          <h2 className="section-heading">Seçilmiş otaqlar</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Marian saytındakı kimi şəbəkə düzülüşü, qiymət etiketi və “ətraflı” keçidi.
          </p>
        </div>
        <div className="grid gap-4 hotel-grid">
          {demoRooms.map(h => (
            <HotelCard key={h._id} hotel={h} demo={String(h._id).startsWith('demo-')} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/rooms" className="btn btn-gold">Hamısına bax</Link>
        </div>
      </div>
    </section>

    <section className="section-pad container">
      <div className="text-center mb-8">
        <span className="section-label">Xidmətlər</span>
        <h2 className="section-heading">Qonaq təcrübəsi</h2>
      </div>
      <div className="services-grid">
        {HOME_SERVICES.map(s => (
          <article key={s.title} className="service-card">
            <h3>{s.title}</h3>
            <p className="text-gray-600 mb-0">{s.text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="split-feature">
      <img src={DINING_IMAGE} alt="Restoran" className="split-feature-img" />
      <div className="split-feature-content">
        <span className="section-label">Restoranımız</span>
        <h2 className="section-heading">Yemək və içkilər</h2>
        <p className="text-gray-600 mt-4">
          Beynəlxalq və yerli mətbəxdən dadlı yeməklər, səhər yeməyi bufeti və axşam kokteylləri ilə unudulmaz axşamlar.
        </p>
        <Link to="/contact" className="btn btn-outline-gold mt-5">Ətraflı</Link>
      </div>
    </section>

    <section className="split-feature split-feature--reverse">
      <img src={POOL_IMAGE} alt="Hovuz" className="split-feature-img" />
      <div className="split-feature-content">
        <span className="section-label">Hovuzumuz</span>
        <h2 className="section-heading">Üzmə hovuzu</h2>
        <p className="text-gray-600 mt-4">
          İstirahət zonası, günəş lençərləri və sakit atmosfer — şəhər səs-küyündən uzaq bir fasilə.
        </p>
        <Link to="/hotels" className="btn btn-outline-gold mt-5">Rezerv et</Link>
      </div>
    </section>

    <section className="section-pad container">
      <div className="testimonial-card">
        <p className="testimonial-quote">
          «Aura Grand-da qaldığım hər dəfə təmiz otaq, mehriban personal və problemsiz bron təcrübəsi ilə qarşılaşdım. Tövsiyə edirəm.»
        </p>
        <p className="testimonial-author">— Leyla Həsənova, daimi qonaq</p>
      </div>
    </section>

    <section className="section-pad section-muted">
      <div className="container">
        <div className="text-center mb-8">
          <span className="section-label">Bloq & xəbərlər</span>
          <h2 className="section-heading">Son yazılar</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Marian “Recent News” bölməsinə uyğun statik kartlar — keçidlər otel və əlaqə səhifəsinə aparır.
          </p>
        </div>
        <div className="news-grid">
          {HOME_NEWS.map(item => (
            <article key={item.title} className="news-card">
              <div className="news-card-body">
                <span className="news-card-tag">{item.tag}</span>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.excerpt}</p>
                <div className="news-card-meta">{item.date}</div>
                <Link to={item.link} className="news-card-link">Oxu →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad container">
      <Newsletter />
    </section>
  </>
  )
}
