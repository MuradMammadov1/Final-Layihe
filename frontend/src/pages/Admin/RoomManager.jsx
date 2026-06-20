import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function RoomManager(){
  const [hotels, setHotels] = useState([])
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState({ hotel: '', title: '', price: '', capacity: '', count: '', type: '', description: '', amenities: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  const loadHotels = async () => {
    try {
      const res = await api.get('/hotels')
      const fetchedHotels = res.data.data || []
      setHotels(fetchedHotels)
      if (fetchedHotels.length > 0) {
        setForm(prev => ({ ...prev, hotel: fetchedHotels[0]._id }))
      }
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
    const priceValue = Number(form.price)
    if (priceValue < 0) {
      setMessage('Qiymət mənfi ola bilməz')
      return
    }
    try {
      const payload = {
        hotel: form.hotel || hotels[0]?._id,
        title: form.title,
        price: priceValue,
        capacity: Number(form.capacity),
        count: Number(form.count),
        type: form.type,
        description: form.description,
        amenities: form.amenities.split(',').map(item => item.trim()).filter(Boolean)
      }
      if (editingId) {
        await api.put(`/rooms/${editingId}`, payload)
        setMessage('Otaq yeniləndi.')
      } else {
        await api.post('/rooms', payload)
        setMessage('Otaq yaradıldı.')
      }
      setForm({ hotel: form.hotel || hotels[0]?._id, title: '', price: '', capacity: '', count: '', type: '', description: '', amenities: '' })
      setEditingId(null)
      loadRooms()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Otaq saxlanılmadı.')
    }
  }

  const handleEdit = room => {
    setForm({
      hotel: room.hotel,
      title: room.title,
      price: room.price,
      capacity: room.capacity,
      count: room.count,
      type: room.type,
      description: room.description,
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities
    })
    setEditingId(room._id)
  }

  const handleCancelEdit = () => {
    setForm({ hotel: form.hotel || hotels[0]?._id, title: '', price: '', capacity: '', count: '', type: '', description: '', amenities: '' })
    setEditingId(null)
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
    <div className="admin-manager">
      <h2 className="section-heading">Otaq İdarəetməsi</h2>

      <div className="panel">
        <h3 className="section-heading text-lg mb-4">Otaq Əlavə Et</h3>
        {message && <div className="alert mt-4">{message}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Otel</label>
            <select name="hotel" value={form.hotel} onChange={handleChange} className="input" required>
              {hotels.map(hotel => (
                <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Otaq adı</label>
            <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="Standard Otaq" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Qiymət ($/gecə)</label>
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} className="input" placeholder="100" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nəfər sayı</label>
            <input name="capacity" type="number" min="0" value={form.capacity} onChange={handleChange} className="input" placeholder="2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Otaq sayı</label>
            <input name="count" type="number" min="0" value={form.count} onChange={handleChange} className="input" placeholder="5" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Növ</label>
            <input name="type" value={form.type} onChange={handleChange} className="input" placeholder="Standard / Deluxe / Suite" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Xidmətlər (vergüllə ayrılmış)</label>
            <input name="amenities" value={form.amenities} onChange={handleChange} className="input" placeholder="WiFi, TV, AC" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Təsvir</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="input" placeholder="Otaq haqqında məlumat" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-gold">{editingId ? 'Yenilə' : 'Əlavə et'}</button>
            {editingId && <button type="button" onClick={handleCancelEdit} className="btn secondary">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="section-heading text-lg mb-4">Mövcud Otaqlar</h3>
        {rooms.length === 0 ? (
          <p className="text-gray-600">Hələ otaq yoxdur.</p>
        ) : (
          <div className="space-y-4">
            {rooms.map(room => (
              <div key={room._id} className="border rounded p-4 bg-slate-50 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h4 className="font-semibold">{room.title}</h4>
                  <p className="text-sm text-gray-600">{room.type} • {room.capacity} nəfər • {room.count} otaq</p>
                  <p className="text-indigo-600 font-semibold mt-2">${room.price}/gecə</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn secondary" onClick={() => handleEdit(room)}>Düzəlt</button>
                  <button className="btn secondary" onClick={() => handleDelete(room._id)}>Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
