import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function ServiceManager() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ icon: '', title: '', description: '', order: 0 })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const res = await api.get('/services')
      setServices(res.data.data || [])
    } catch {
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/services/${editing}`, form)
      } else {
        await api.post('/services', form)
      }
      setForm({ icon: '', title: '', description: '', order: 0 })
      setEditing(null)
      loadServices()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const handleEdit = service => {
    setEditing(service._id)
    setForm({ icon: service.icon, title: service.title, description: service.description, order: service.order })
  }

  const handleDelete = async id => {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/services/${id}`)
      loadServices()
    } catch {
      alert('Silinmədi')
    }
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">Xidmətlər İdarəetməsi</h2>

      <div className="panel mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Düzəlt' : 'Yeni xidmət'}</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">İkon (emoji)</label>
            <input className="input" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="🏨" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Başlıq</label>
            <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Təsvir</label>
            <textarea className="input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows="3" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sıra</label>
            <input type="number" className="input" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) }))} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-gold">{editing ? 'Yenilə' : 'Əlavə et'}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ icon: '', title: '', description: '', order: 0 }) }} className="btn btn-outline">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="font-bold mb-4">Xidmətlər ({services.length})</h3>
        {services.length === 0 ? (
          <p className="text-gray-500">Xidmət yoxdur.</p>
        ) : (
          <div className="grid gap-3">
            {services.map(s => (
              <div key={s._id} className="flex items-center gap-4 p-3 border rounded">
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1">
                  <div className="font-bold">{s.title}</div>
                  <div className="text-sm text-gray-600">{s.description}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(s)} className="btn btn-sm btn-outline">Düzəlt</button>
                  <button onClick={() => handleDelete(s._id)} className="btn btn-sm btn-outline-gold">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
