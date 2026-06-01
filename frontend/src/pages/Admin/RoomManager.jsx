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
    const priceValue = Number(form.price)
    if (priceValue < 0) {
      setMessage('Qiymət mənfi ola bilməz')
      return
    }
    try {
      const payload = {
        hotel: form.hotel,
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
      setForm({ hotel: form.hotel, title: '', price: '', capacity: '', count: '', type: '', description: '', amenities: '' })
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
    setForm({ hotel: form.hotel, title: '', price: '', capacity: '', count: '', type: '', description: '', amenities: '' })
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
    <div className="space-y-6">
      <div className="panel">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Room Management</h2>
          <p className="text-gray-600">Create, manage, and delete rooms for your hotels from here.</p>
        </div>
        {message && <div className="alert mt-4">{message}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 mt-6">
          <div>
            <label className="block text-sm font-medium">Otel</label>
            <select name="hotel" value={form.hotel} onChange={handleChange} className="input" required>
              <option value="">Otel seçin</option>
              {hotels.map(hotel => (
                <option key={hotel._id} value={hotel._id}>{hotel.name} — {hotel.city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Otaq adı</label>
            <input name="title" value={form.title} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Qiymət</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Nəfər sayı</label>
            <input name="capacity" type="number" value={form.capacity} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Say</label>
            <input name="count" type="number" value={form.count} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Növ</label>
            <input name="type" value={form.type} onChange={handleChange} className="input" placeholder="standard / deluxe" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Xidmətlər</label>
            <input name="amenities" value={form.amenities} onChange={handleChange} className="input" placeholder="vergüllə ayrılmış" />
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
        <h3 className="text-xl font-semibold mb-4">Existing Rooms</h3>
        {rooms.length === 0 ? (
          <p className="text-gray-600">Otel seçin ki, otaqları görəsiniz.</p>
        ) : (
          <div className="space-y-4">
            {rooms.map(room => (
              <div key={room._id} className="border rounded p-4 bg-slate-50 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h4 className="font-semibold">{room.title}</h4>
                  <p className="text-sm text-gray-600">{room.type} • {room.capacity} nəfər • {room.count} otaq</p>
                  <p className="text-indigo-600 font-semibold mt-2">${room.price}</p>
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
