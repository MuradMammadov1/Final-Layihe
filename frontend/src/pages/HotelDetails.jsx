import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function HotelDetails(){
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)

  useEffect(()=>{
    api.get(`/hotels/${id}`)
      .then(r=>setHotel(r.data.data))
      .catch(()=>setHotel(null))
  },[id])

  if (!hotel) return <div>Loading...</div>

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold">{hotel.name}</h2>
      <p className="text-sm text-gray-600">{hotel.city}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {hotel.images?.map((src,i)=> (
          <img key={i} src={src} alt="img" className="w-full h-48 object-cover rounded" />
        ))}
      </div>
      <p className="mt-4">{hotel.description}</p>
    </div>
  )
}
