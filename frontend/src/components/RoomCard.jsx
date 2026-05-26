import React from 'react'
import { Link } from 'react-router-dom'
import { ROOM_IMAGES } from '../data/images'

export default function RoomCard({ room }) {
  const roomImage = room.hotel?.images?.[0] || ROOM_IMAGES[0]
  const detailPath = `/rooms/${room._id}`

  return (
    <article className="hotel-card room-showcase">
      <Link to={detailPath} className="card-media room-showcase-media">
        <img src={roomImage} alt={room.title} className="w-full h-full object-cover" loading="lazy" />
        <span className="room-price-tag">${room.price} / gecə</span>
      </Link>
      <div className="hotel-card-body">
        <span className="badge">{room.hotel?.city || 'Otel'}</span>
        <h3 className="hotel-title mt-3">{room.title}</h3>
        <p className="hotel-description">
          {room.description
            ? room.description.slice(0, 90) + (room.description.length > 90 ? '...' : '')
            : 'Müasir, rahat otaq və sürətli bron.'}
        </p>
        <div className="hotel-badges">
          <span className="pill">{room.type || 'Standard'}</span>
          <span className="pill">👥 {room.capacity || 2} nəfər</span>
        </div>
        <div className="card-meta">
          <Link to={detailPath} className="btn btn-outline-gold btn-sm">
            Ətraflı
          </Link>
        </div>
      </div>
    </article>
  )
}
