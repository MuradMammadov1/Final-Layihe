import React from 'react'
import { Link } from 'react-router-dom'
import { ABOUT_IMAGE } from '../data/images'
import { HOME_STATS, HOME_SERVICES } from '../data/siteContent'

export default function About() {
  return (
    <div className="page-about">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Haqqımızda</span>
          </nav>
          <h1 className="page-hero-title">Haqqımızda</h1>
          <p className="page-hero-sub">Aura Grand Hotel — lüks və rahat qonaqlıq təcrübəsi.</p>
        </div>
      </section>

      <section className="section-pad container">
        <div className="split-feature">
          <img src={ABOUT_IMAGE} alt="Haqqımızda" className="split-feature-img" />
          <div className="split-feature-content">
            <span className="section-label">Tariximiz</span>
            <h2 className="section-heading">25+ illik təcrübə</h2>
            <p className="text-gray-600 mt-4">
              Aura Grand Hotel 1998-ci ildən bəri Azərbaycanın otel sənayesində lider kimi fəaliyyət göstərir. 
              Bizim missiyamız qonaqlarımıza unudulmaz təcrübə təqdim etməkdir.
            </p>
            <p className="text-gray-600 mt-4">
              Peşəkar komandamız, müasir otaqlarımız və yüksək səviyyəli xidmətimizlə hər ziyarətinizi xüsusi edirik.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad section-muted">
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-label">Nəticələrimiz</span>
            <h2 className="section-heading">Rəqəmlərlə</h2>
          </div>
          <div className="stats-grid">
            {HOME_STATS.map((stat, idx) => (
              <div key={idx} className="stat-card panel">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad container">
        <div className="text-center mb-8">
          <span className="section-label">Xidmətlərimiz</span>
          <h2 className="section-heading">Nə təklif edirik</h2>
        </div>
        <div className="services-grid">
          {HOME_SERVICES.map((service, idx) => (
            <article key={idx} className="service-card">
              <h3>{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad section-muted">
        <div className="container text-center">
          <h2 className="section-heading mb-4">Bizimlə əlaqə saxlayın</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Sualınız var? Bizim komandamız sizə kömək etməyə hazırdır.
          </p>
          <Link to="/contact" className="btn btn-gold">Əlaqə</Link>
        </div>
      </section>
    </div>
  )
}
