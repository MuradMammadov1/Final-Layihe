import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function RoomManager(){
  const [hotels, setHotels] = useState([])
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState({ hotel: '', title: '', price: '', capacity: '', count: '', type: '', description: '', amenities: '' })
  const [message, setMessage] = useState('')

  const loadHotels = async () => {
    try {
      const res = await api.get('/hotels')
      setHotels(res.data.data || [])
    } catch {
      setHotels([])
    }
  }

  const loadRooms = async () => {
    try {
      const res = await api.get('/rooms/hotel/' + (form.hotel || hotels[0]?._id || ''))
      setRooms(res.data.data || [])
    } catch {
      setRooms([])
    }
  }

  useEffect(() => {
    loadHotels()
  }, [])

  useEffect(() => {
    if (form.hotel) loadRooms()
  }, [form.hotel])

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {
        hotel: form.hotel,
        title: form.title,
        price: Number(form.price),
        capacity: Number(form.capacity),
        count: Number(form.count),
        type: form.type,
        description: form.description,
        amenities: form.amenities.split(',').map(item => item.trim()).filter(Boolean)
      }
      await api.post('/rooms', payload)
      setMessage('Room created successfully.')
      setForm({ hotel: form.hotel, title: '', price: '', capacity: '', count: '', type: '', description: '', amenities: '' })
      loadRooms()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create room.')
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this room?')) return
    try {
      await api.delete(`/rooms/${id}`)
      setRooms(prev => prev.filter(room => room._id !== id))
      setMessage('Room deleted.')
    } catch {
      setMessage('Delete failed.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Room Management</h2>
          <p className="text-gray-600">Create, manage, and delete rooms for your hotels from here.</p>
        </div>
        {message && <div className="alert mt-4">{message}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 mt-6">
          <div>
            <label className="block text-sm font-medium">Hotel</label>
            <select name="hotel" value={form.hotel} onChange={handleChange} className="input" required>
              <option value="">Select hotel</option>
              {hotels.map(hotel => (
                <option key={hotel._id} value={hotel._id}>{hotel.name} — {hotel.city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Room Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Capacity</label>
            <input name="capacity" type="number" value={form.capacity} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Count</label>
            <input name="count" type="number" value={form.count} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <input name="type" value={form.type} onChange={handleChange} className="input" placeholder="standard / deluxe" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Amenities</label>
            <input name="amenities" value={form.amenities} onChange={handleChange} className="input" placeholder="Comma separated" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="input" />
          </div>
          <div className="md:col-span-2">
            <button className="btn">Create Room</button>
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="text-xl font-semibold mb-4">Existing Rooms</h3>
        {rooms.length === 0 ? (
          <p className="text-gray-600">Select a hotel to view its rooms.</p>
        ) : (
          <div className="space-y-4">
            {rooms.map(room => (
              <div key={room._id} className="border rounded p-4 bg-slate-50 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h4 className="font-semibold">{room.title}</h4>
                  <p className="text-sm text-gray-600">{room.type} • Capacity {room.capacity} • {room.count} units</p>
                  <p className="text-indigo-600 font-semibold mt-2">${room.price}</p>
                </div>
                <button className="btn secondary" onClick={() => handleDelete(room._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
