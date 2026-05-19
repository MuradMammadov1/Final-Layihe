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
      <div className="panel">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Hotel Management</h2>
          <p className="text-gray-600">Create and manage hotel listings from a central admin interface.</p>
        </div>
        {message && <div className="alert mt-4">{message}</div>}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 mt-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URLs</label>
            <input name="images" value={form.images} onChange={handleChange} className="input" placeholder="comma separated URLs" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="input" />
          </div>
          <div className="md:col-span-2">
            <button className="btn">Create Hotel</button>
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="text-xl font-semibold mb-4">Existing Hotels</h3>
        <div className="space-y-3">
          {hotels.length === 0 ? (
            <p className="text-gray-600">No hotels loaded yet.</p>
          ) : hotels.map(hotel => (
            <div key={hotel._id} className="p-4 rounded border flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <h4 className="font-semibold">{hotel.name}</h4>
                <p className="text-sm text-gray-600">{hotel.city}</p>
                <p className="mt-1 text-indigo-600 font-semibold">${hotel.price}</p>
              </div>
              <button className="btn secondary" onClick={() => handleDelete(hotel._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
