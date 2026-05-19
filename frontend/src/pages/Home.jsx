import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-10">
      <section className="hero-banner grid gap-8 lg:grid-cols-[1.7fr_1.3fr] items-center">
        <div>
          <span className="badge">Hotel reservation</span>
          <h1 className="hero-title mt-6">Stay in comfort, book with confidence.</h1>
          <p className="hero-copy mt-5">Aura Grand delivers a professional hotel booking experience with curated stays, clear pricing, and an easy reservation workflow for travelers and managers alike.</p>
          <div className="hero-actions">
            <Link to="/hotels" className="btn">Browse hotels</Link>
            <Link to="/register" className="btn secondary">Get started</Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="feature-card">
            <h2 className="text-xl font-semibold">Trusted destinations</h2>
            <p className="mt-3 text-gray-600">Professional hotel listings with real details, customer-ready descriptions, and modern amenities.</p>
          </div>
          <div className="feature-card">
            <h2 className="text-xl font-semibold">Fast booking</h2>
            <p className="mt-3 text-gray-600">Reserve rooms quickly with payment-ready backend logic and secure session handling.</p>
          </div>
          <div className="feature-card">
            <h2 className="text-xl font-semibold">Guest dashboard</h2>
            <p className="mt-3 text-gray-600">Manage reservations, wishlist favorites, and account details from one polished dashboard.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="feature-card">
          <h2 className="text-xl font-semibold">Detailed hotel data</h2>
          <p className="mt-2 text-gray-600">Hotel pages include price, location, availability and room booking support.</p>
        </div>
        <div className="feature-card">
          <h2 className="text-xl font-semibold">Admin controls</h2>
          <p className="mt-2 text-gray-600">Admin panel supports hotel and reservation management in an easy-to-use layout.</p>
        </div>
        <div className="feature-card">
          <h2 className="text-xl font-semibold">Responsive design</h2>
          <p className="mt-2 text-gray-600">The application adapts cleanly to desktop and tablet views for a professional presentation.</p>
        </div>
      </section>
    </div>
  )
}
