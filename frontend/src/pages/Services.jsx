import React from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
  const services = [
    {
      icon: '🏨',
      title: 'Lüks Otaqlar',
      description: 'Geniş və rahat otaqlar, müasir avadanlıqlar və gözəl mənzərə ilə təchiz olunub.'
    },
    {
      icon: '🍽️',
      title: 'Restoran',
      description: 'Azərbaycan və beynəlxalq mətbəxi ilə zəngin menyu, peşəkar aşpazlar.'
    },
    {
      icon: '🏊',
      title: 'Üzmə Hovuzu',
      description: 'İsti və soyuq hovuzlar, spa və wellness mərkəzi.'
    },
    {
      icon: '💆',
      title: 'SPA & Wellness',
      description: 'Masaj, müalicəvi prosedurlar və rahatlanma üçün spa mərkəzi.'
    },
    {
      icon: '🚗',
      title: 'Nəqliyyat',
      description: 'Hava limanına transfer, avtomobil icarəsi və parkinq xidmətləri.'
    },
    {
      icon: '🎉',
      title: 'Tədbirlər',
      description: 'Toy, konfrans və digər tədbirlər üçün zallar və təşkilat xidmətləri.'
    },
    {
      icon: '📶',
      title: 'WiFi',
      description: 'Bütün oteldə pulsuz yüksək sürətli WiFi.'
    },
    {
      icon: '🛎️',
      title: '24/7 Xidmət',
      description: 'Gün ərzində otaq xidməti, qəbul və konsyerj xidmətləri.'
    }
  ]

  return (
    <div className="page-services">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Xidmətlər</span>
          </nav>
          <h1 className="page-hero-title">Xidmətlərimiz</h1>
          <p className="page-hero-sub">Lüks və rahat qonaqlıq təcrübəsi üçün hər şey düşünülmüşdür.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card panel">
              <span className="service-icon" aria-hidden>{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-muted section-pad">
        <div className="container">
          <div className="panel text-center">
            <h2 className="section-heading">Xidmətlərimizdən yararlanın</h2>
            <p className="text-gray-600 mt-4 mb-6">
              Rezervasiya edin və lüks qonaqlıq təcrübəsi yaşayın.
            </p>
            <Link to="/rooms" className="btn btn-gold">Otaqlara bax</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
