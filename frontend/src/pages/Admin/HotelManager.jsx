import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function HotelManager(){
  const [hotels, setHotels] = useState([])
  const [form, setForm] = useState({ name: '', city: '', price: '', description: '', images: '' })
  const [message, setMessage] = useState('')

  const loadHotels = async () => {
    try {
      const res = await api.get('/hotels')
      setHotels(res.data.data || [])
    } catch {
      setHotels([])
    }
  }

  useEffect(() => { loadHotels() }, [])

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        images: form.images.split(',').map(url => url.trim()).filter(Boolean)
      }
      await api.post('/hotels', payload)
      setMessage('Hotel created successfully.')
      setForm({ name: '', city: '', price: '', description: '', images: '' })
      loadHotels()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create hotel.')
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this hotel?')) return
    try {
      await api.delete(`/hotels/${id}`)
      setHotels(prev => prev.filter(h => h._id !== id))
      setMessage('Hotel deleted.')
    } catch {
      setMessage('Delete failed.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Hotel Management</h2>
        {message && <div className="mb-4 p-3 rounded bg-slate-100 text-gray-700">{message}</div>}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URLs</label>
            <input name="images" value={form.images} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="comma separated URLs" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="md:col-span-2">
            <button className="btn">Create Hotel</button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Existing Hotels</h3>
        <div className="space-y-3">
          {hotels.length === 0 ? (
            <p>No hotels loaded.</p>
          ) : hotels.map(hotel => (
            <div key={hotel._id} className="border rounded p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <h4 className="font-semibold">{hotel.name}</h4>
                <p className="text-sm text-gray-600">{hotel.city}</p>
                <p className="mt-1">${hotel.price}</p>
              </div>
              <button className="btn" onClick={() => handleDelete(hotel._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
