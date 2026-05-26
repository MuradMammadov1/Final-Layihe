import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ABOUT_IMAGE } from '../data/images'
import { HOME_STATS, HOME_SERVICES } from '../data/siteContent'
import api from '../api'

export default function About() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await api.get('/about')
        setAbout(res.data.data)
      } catch {
        setAbout(null)
      } finally {
        setLoading(false)
      }
    }
    loadAbout()
  }, [])

  const displayAbout = about || {
    title: 'Haqqımızda',
    subtitle: 'Aura Grand Hotel — lüks və rahat qonaqlıq təcrübəsi.',
    description: 'Aura Grand Hotel 1998-ci ildən bəri Azərbaycanın otel sənayesində lider kimi fəaliyyət göstərir.',
    history: 'Aura Grand Hotel 1998-ci ildən bəri Azərbaycanın otel sənayesində lider kimi fəaliyyət göstərir. Bizim missiyamız qonaqlarımıza unudulmaz təcrübə təqdim etməkdir.',
    mission: 'Qonaqlarımıza unudulmaz təcrübə təqdim etmək.',
    vision: 'Azərbaycanın ən yaxşı oteli olmaq.',
    image: ABOUT_IMAGE,
    stats: HOME_STATS
  }

  if (loading) return <div className="panel text-center py-12">Yüklənir...</div>

  return (
    <div className="page-about">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Haqqımızda</span>
          </nav>
          <h1 className="page-hero-title">{displayAbout.title}</h1>
          <p className="page-hero-sub">{displayAbout.subtitle}</p>
        </div>
      </section>

      <section className="section-pad container">
        <div className="split-feature">
          <img src={displayAbout.image} alt="Haqqımızda" className="split-feature-img" />
          <div className="split-feature-content">
            <span className="section-label">Tariximiz</span>
            <h2 className="section-heading">25+ illik təcrübə</h2>
            <p className="text-gray-600 mt-4">{displayAbout.history}</p>
            <p className="text-gray-600 mt-4">{displayAbout.description}</p>
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
            {(displayAbout.stats?.length ? displayAbout.stats : HOME_STATS).map((stat, idx) => (
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
          <span className="section-label">Missiyamız</span>
          <h2 className="section-heading">Nə təklif edirik</h2>
        </div>
        <div className="panel text-center max-w-3xl mx-auto">
          <p className="text-gray-600">{displayAbout.mission}</p>
          <p className="text-gray-600 mt-4">{displayAbout.vision}</p>
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
