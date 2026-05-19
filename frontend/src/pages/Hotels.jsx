import React, { useEffect, useState } from 'react'
import HotelCard from '../components/HotelCard'
import axios from 'axios'

export default function Hotels(){
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    // Replace base URL as needed: e.g. VITE_API_URL
    axios.get('/api/hotels')
      .then(r => setHotels(r.data.data || []))
      .catch(() => setHotels([]))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels.map(h => <HotelCard key={h._id} hotel={h} />)}
      </div>
    </div>
  )
}
