import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ABOUT_IMAGE } from '../data/images'
import { HOME_STATS } from '../data/siteContent'
import api from '../api'

export default function About() {
  const [dbAbout, setDbAbout] = useState(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about')
        // about route returns an array of abouts or a single about object? Let's assume single object or first item
        const data = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data
        if (data) setDbAbout(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAbout()
  }, [])

  const defaultAbout = {
    title: 'Haqqımızda',
    subtitle: 'Aura Grand Hotel — lüks və rahat qonaqlıq təcrübəsi.',
    description: 'Aura Grand Hotel 1998-ci ildən bəri Azərbaycanın otel sənayesində lider kimi fəaliyyət göstərir.',
    history: 'Aura Grand Hotel 1998-ci ildən bəri Azərbaycanın otel sənayesində lider kimi fəaliyyət göstərir. Bizim missiyamız qonaqlarımıza unudulmaz təcrübə təqdim etməkdir.',
    mission: 'Qonaqlarımıza unudulmaz təcrübə təqdim etmək.',
    vision: 'Azərbaycanın ən yaxşı oteli olmaq.',
    image: ABOUT_IMAGE,
    stats: HOME_STATS
  }

  const about = dbAbout || defaultAbout

  return (
    <div className="page-about">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Haqqımızda</span>
          </nav>
          <h1 className="page-hero-title">{about.title}</h1>
          <p className="page-hero-sub">{about.subtitle}</p>
        </div>
      </section>

      <section className="section-pad container">
        <div className="split-feature">
          <img src={about.image} alt="Haqqımızda" className="split-feature-img" />
          <div className="split-feature-content">
            <span className="section-label">Tariximiz</span>
            <h2 className="section-heading">25+ illik təcrübə</h2>
            <p className="text-gray-600 mt-4">{about.history}</p>
            <p className="text-gray-600 mt-4">{about.description}</p>
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
            {about.stats.map((stat, idx) => (
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
          <p className="text-gray-600">{about.mission}</p>
          <p className="text-gray-600 mt-4">{about.vision}</p>
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
