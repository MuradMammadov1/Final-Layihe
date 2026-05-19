import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import { AuthContext } from '../context/AuthContext'

export default function HotelDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [hotel, setHotel] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState('')

  useEffect(()=>{
    api.get(`/hotels/${id}`)
      .then(r=>setHotel(r.data.data))
      .catch(()=>setHotel(null))
  },[id])

  const handleReserve = async e => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    try {
      await api.post('/reservation', { hotel: id, startDate, endDate })
      setMessage('Reservation submitted successfully.')
      setStartDate('')
      setEndDate('')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reservation failed.')
    }
  }

  if (!hotel) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold">{hotel.name}</h2>
        <p className="text-sm text-gray-600">{hotel.city}</p>
        <p className="mt-2 font-bold text-indigo-600">${hotel.price} per night</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {hotel.images?.map((src,i)=> (
            <img key={i} src={src} alt="img" className="w-full h-48 object-cover rounded" />
          ))}
        </div>
        <p className="mt-4 text-gray-700">{hotel.description}</p>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <h3 className="text-xl font-semibold mb-4">Book this hotel</h3>
        {message && <div className="mb-4 p-3 rounded bg-slate-100">{message}</div>}
        <form onSubmit={handleReserve} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Check-in</label>
            <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Check-out</label>
            <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          </div>
          <button className="btn w-full" type="submit">Reserve now</button>
        </form>
      </div>
    </div>
  )
}
