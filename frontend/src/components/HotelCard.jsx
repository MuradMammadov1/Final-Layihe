import React from 'react'
import { Link } from 'react-router-dom'
import { hotelImage } from '../data/images'

export default function HotelCard({ hotel, saved, onToggleWishlist, demo }) {
  const detailPath = demo ? '/hotels' : `/hotels/${hotel._id}`

  return (
    <article className="hotel-card room-showcase">
      <Link to={detailPath} className="card-media room-showcase-media">
        <img src={hotelImage(hotel)} alt={hotel.name} className="w-full h-full object-cover" loading="lazy" />
        <span className="room-price-tag">${hotel.price} / gecə</span>
      </Link>
      <div className="hotel-card-body">
        <span className="badge">{hotel.city || 'Otel'}</span>
        <h3 className="hotel-title mt-3">{hotel.name}</h3>
        <p className="hotel-description">
          {hotel.description
            ? hotel.description.slice(0, 90) + (hotel.description.length > 90 ? '...' : '')
            : 'Müasir, rahat otaqlar və sürətli bron.'}
        </p>
        <div className="hotel-badges">
          {hotel.rating != null && <span className="pill">{Number(hotel.rating).toFixed(1)} ★</span>}
          {hotel.availability && (
            <span className="pill">{hotel.availability.available ? 'Mövcuddur' : 'Dolu'}</span>
          )}
        </div>
        <div className="card-meta">
          <Link to={detailPath} className="btn btn-outline-gold btn-sm">
            Ətraflı
          </Link>
        </div>
        {typeof onToggleWishlist === 'function' && (
          <button type="button" onClick={onToggleWishlist} className="mt-3 btn w-full btn-gold">
            {saved ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'}
          </button>
        )}
      </div>
    </article>
  )
}
