import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCard({hotel}){
  return (
    <div className="bg-white rounded shadow p-4">
      <img src={hotel.images?.[0] || '/placeholder.png'} alt={hotel.name} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-3 font-semibold">{hotel.name}</h3>
      <p className="text-sm text-gray-500">{hotel.city}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-indigo-600 font-bold">${hotel.price}</div>
        <Link to={`/hotels/${hotel._id}`} className="text-sm text-indigo-500">View</Link>
      </div>
    </div>
  )
}
