import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', category: 'other', image: '', description: '', order: 0, active: true })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      const res = await api.get('/gallery')
      setGalleryItems(res.data.data || [])
    } catch {
      setGalleryItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/gallery/${editing}`, form)
      } else {
        await api.post('/gallery', form)
      }
      setForm({ title: '', category: 'other', image: '', description: '', order: 0, active: true })
      setEditing(null)
      loadGallery()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const handleEdit = item => {
    setEditing(item._id)
    setForm({ title: item.title, category: item.category, image: item.image, description: item.description, order: item.order, active: item.active })
  }

  const handleDelete = async id => {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/gallery/${id}`)
      loadGallery()
    } catch {
      alert('Silinmədi')
    }
  }

  const handleToggleActive = async id => {
    try {
      const item = galleryItems.find(i => i._id === id)
      await api.put(`/gallery/${id}`, { active: !item.active })
      loadGallery()
    } catch {
      alert('Dəyişdirilmədi')
    }
  }

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await api.post('/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setForm(prev => ({ ...prev, image: res.data.url || res.data.secure_url }))
    } catch (err) {
      alert('Şəkil yüklənmədi')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">Qalereya İdarəetməsi</h2>

      <div className="panel mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Düzəlt' : 'Yeni şəkil'}</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlıq</label>
            <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kateqoriya</label>
            <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              <option value="rooms">Otaqlar</option>
              <option value="dining">Restoran</option>
              <option value="pool">Hovuz</option>
              <option value="spa">SPA</option>
              <option value="events">Tədbirlər</option>
              <option value="other">Digər</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şəkil URL</label>
            <div className="flex gap-2">
              <input className="input flex-1" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
              <label className="btn btn-outline-gold">
                Yüklə
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            {uploading && <p className="text-sm text-gray-500 mt-1">Yüklənir...</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Təsvir</label>
            <textarea className="input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows="3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sıra</label>
              <input type="number" className="input" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) }))} />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                <span>Aktiv</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-gold">{editing ? 'Yenilə' : 'Əlavə et'}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: '', category: 'other', image: '', description: '', order: 0, active: true }) }} className="btn btn-outline">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="font-bold mb-4">Qalereya ({galleryItems.length})</h3>
        {galleryItems.length === 0 ? (
          <p className="text-gray-500">Qalereya boşdur.</p>
        ) : (
          <div className="grid gap-3">
            {galleryItems.map(item => (
              <div key={item._id} className="p-3 border rounded">
                <div className="flex items-start gap-4">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.category}</div>
                    {item.description && <div className="text-sm mt-1">{item.description}</div>}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleToggleActive(item._id)} className={`btn btn-sm ${item.active ? 'btn-gold' : 'btn-outline'}`}>
                    {item.active ? 'Aktiv' : 'Deaktiv'}
                  </button>
                  <button onClick={() => handleEdit(item)} className="btn btn-sm btn-outline">Düzəlt</button>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-outline-gold">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
