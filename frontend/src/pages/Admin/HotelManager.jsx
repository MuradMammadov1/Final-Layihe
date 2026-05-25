import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function HotelManager(){
  const [hotels, setHotels] = useState([])
  const [form, setForm] = useState({ name: '', city: '', price: '', description: '', images: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

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

  const handleImageUpload = async e => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    try {
      const res = await api.post('/hotels/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const imageUrls = res.data.urls || []
      setForm(prev => ({ ...prev, images: [...prev.images.split(',').filter(Boolean), ...imageUrls].join(',') }))
      setMessage('Şəkillər yükləndi.')
    } catch (err) {
      setMessage('Şəkil yüklənmədi.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        images: form.images.split(',').map(url => url.trim()).filter(Boolean)
      }
      if (editingId) {
        await api.put(`/hotels/${editingId}`, payload)
        setMessage('Hotel updated successfully.')
      } else {
        await api.post('/hotels', payload)
        setMessage('Hotel created successfully.')
      }
      setForm({ name: '', city: '', price: '', description: '', images: '' })
      setEditingId(null)
      loadHotels()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save hotel.')
    }
  }

  const handleEdit = hotel => {
    setForm({
      name: hotel.name,
      city: hotel.city,
      price: hotel.price,
      description: hotel.description,
      images: Array.isArray(hotel.images) ? hotel.images.join(', ') : hotel.images
    })
    setEditingId(hotel._id)
  }

  const handleCancelEdit = () => {
    setForm({ name: '', city: '', price: '', description: '', images: '' })
    setEditingId(null)
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
            <label className="block text-sm font-medium">Ad</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Şəhər</label>
            <input name="city" value={form.city} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Qiymət</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Şəkil yüklə</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="input" disabled={uploading} />
            {uploading && <p className="text-sm text-gray-600 mt-1">Yüklənir...</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Və ya Image URLs</label>
            <input name="images" value={form.images} onChange={handleChange} className="input" placeholder="vergüllə ayrılmış URL-lar" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Təsvir</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="input" />
          </div>
          <div className="md:col-span-2 flex gap-2">
            <button className="btn">{editingId ? 'Yenilə' : 'Yarat'}</button>
            {editingId && <button type="button" onClick={handleCancelEdit} className="btn secondary">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="text-xl font-semibold mb-4">Existing Hotels</h3>
        <div className="space-y-3">
          {hotels.length === 0 ? (
            <p className="text-gray-600">Hələ otel yoxdur.</p>
          ) : hotels.map(hotel => (
            <div key={hotel._id} className="p-4 rounded border flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <h4 className="font-semibold">{hotel.name}</h4>
                <p className="text-sm text-gray-600">{hotel.city}</p>
                <p className="mt-1 text-indigo-600 font-semibold">${hotel.price}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn secondary" onClick={() => handleEdit(hotel)}>Düzəlt</button>
                <button className="btn secondary" onClick={() => handleDelete(hotel._id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
