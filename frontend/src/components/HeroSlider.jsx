import React, { useEffect, useState } from 'react'
import { HERO_SLIDES } from '../data/images'

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-slider" aria-label="Otel hero">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`hero-slide ${i === index ? 'is-active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className="hero-slider-overlay" />
      <div className="hero-slider-content container">
        <p className="hero-eyebrow">{HERO_SLIDES[index].subtitle}</p>
        <h1 className="hero-slider-title">{HERO_SLIDES[index].title}</h1>
        <div className="hero-dots" role="tablist">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Slayd ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
