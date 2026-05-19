import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCard({ hotel, saved, onToggleWishlist }){
  return (
    <div className="card p-4">
      <div className="card-media">
        <img src={hotel.images?.[0] || '/placeholder.png'} alt={hotel.name} className="w-full h-44 object-cover" />
        <span className="badge" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>{hotel.city || 'Hotel'}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{hotel.name}</h3>
        <p className="mt-2 text-gray-600 text-sm">{hotel.description ? hotel.description.slice(0, 90) + '...' : 'Modern stay with great service and comfortable rooms.'}</p>
      </div>
      <div className="card-meta">
        <div className="text-indigo-600 font-bold">${hotel.price}</div>
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
