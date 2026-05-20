import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-12">
      <section className="hero-banner">
        <div className="hero-banner-inner">
          <span className="badge">Premium hotel booking</span>
          <h1 className="hero-title mt-6">Discover unforgettable stays, book instantly.</h1>
          <p className="hero-copy mt-5">Aura Grand brings curated hotels, fast reservations, and modern guest experiences into one polished platform.</p>

          <div className="hero-actions">
            <Link to="/hotels" className="btn">Browse hotels</Link>
            <Link to="/register" className="btn secondary">Create account</Link>
          </div>

          <div className="hero-search-panel">
            <div className="hero-search-heading">Start your journey</div>
            <div className="hero-search-grid">
              <div>
                <label className="block text-sm font-medium text-slate-100">Destination</label>
                <input className="input" placeholder="Baku" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-100">Check-in</label>
                <input type="date" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-100">Check-out</label>
                <input type="date" className="input" />
              </div>
              <button className="btn hero-search-button">Search hotels</button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="feature-card">
          <h2 className="text-xl font-semibold">Exclusive stays</h2>
          <p className="mt-3 text-gray-600">Curated hotels with modern amenities, trusted reviews, and transparent pricing.</p>
        </div>
        <div className="feature-card">
          <h2 className="text-xl font-semibold">Flexible booking</h2>
          <p className="mt-3 text-gray-600">Choose your dates, room type, and manage reservations from a single dashboard.</p>
        </div>
        <div className="feature-card">
          <h2 className="text-xl font-semibold">Smart admin tools</h2>
          <p className="mt-3 text-gray-600">Admin panel supports hotel inventory, rooms, and reservation workflows in one place.</p>
        </div>
      </section>

      <section className="panel hero-highlight">
        <div>
          <h2 className="text-2xl font-semibold">Book premium hotels with confidence</h2>
          <p className="mt-3 text-gray-600">Aura Grand is designed to deliver a modern hotel booking experience with strong visuals, seamless user flow, and easy management for guests and admins.</p>
        </div>
        <div className="highlight-list">
          <div>
            <span className="badge">24/7 Support</span>
            <p className="mt-2 text-gray-600">Always available to help guests and manage reservations.</p>
          </div>
          <div>
            <span className="badge">Secure login</span>
            <p className="mt-2 text-gray-600">JWT-based authentication and protected routes keep accounts safe.</p>
          </div>
          <div>
            <span className="badge">Modern UI</span>
            <p className="mt-2 text-gray-600">A polished booking interface with cards, forms, and responsive layouts.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
