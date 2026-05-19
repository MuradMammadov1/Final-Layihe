import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCard({ hotel, saved, onToggleWishlist }){
  return (
    <div className="hotel-card p-4">
      <div className="card-media">
        <img src={hotel.images?.[0] || '/placeholder.png'} alt={hotel.name} className="w-full h-full object-cover" />
        <span className="badge" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>{hotel.city || 'Hotel'}</span>
      </div>
      <div className="mt-4">
        <h3 className="hotel-title">{hotel.name}</h3>
        <p className="hotel-description">{hotel.description ? hotel.description.slice(0, 90) + '...' : 'Modern, comfortable rooms with fast booking and flexible cancellation.'}</p>
        <div className="hotel-badges">
          {hotel.rating && <span className="pill">{hotel.rating.toFixed(1)} ★</span>}
          {hotel.availability && <span className="pill">{hotel.availability.available ? 'Available' : 'Sold out'}</span>}
        </div>
      </div>
      <div className="card-meta">
        <div className="hotel-price">${hotel.price}</div>
        <Link to={`/hotels/${hotel._id}`} className="text-sm text-indigo-500">Details</Link>
      </div>
      {typeof onToggleWishlist === 'function' && (
        <button
          type="button"
          onClick={onToggleWishlist}
          className="mt-4 btn w-full"
        >
          {saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        </button>
      )}
    </div>
  )
}
