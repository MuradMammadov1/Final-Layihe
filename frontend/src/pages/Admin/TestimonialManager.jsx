import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', position: '', content: '', rating: 5, image: '', order: 0, active: true })

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const res = await api.get('/testimonials')
      setTestimonials(res.data.data || [])
    } catch {
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/testimonials/${editing}`, form)
      } else {
        await api.post('/testimonials', form)
      }
      setForm({ name: '', position: '', content: '', rating: 5, image: '', order: 0, active: true })
      setEditing(null)
      loadTestimonials()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const handleEdit = testimonial => {
    setEditing(testimonial._id)
    setForm({ name: testimonial.name, position: testimonial.position, content: testimonial.content, rating: testimonial.rating, image: testimonial.image, order: testimonial.order, active: testimonial.active })
  }

  const handleDelete = async id => {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/testimonials/${id}`)
      loadTestimonials()
    } catch {
      alert('Silinmədi')
    }
  }

  const handleToggleActive = async id => {
    try {
      const testimonial = testimonials.find(t => t._id === id)
      await api.put(`/testimonials/${id}`, { active: !testimonial.active })
      loadTestimonials()
    } catch {
      alert('Dəyişdirilmədi')
    }
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">Testimonials İdarəetməsi</h2>

      <div className="panel mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Düzəlt' : 'Yeni testimonial'}</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ad</label>
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vəzifə</label>
            <input className="input" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Məzmun</label>
            <textarea className="input" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows="4" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Reytinq (1-5)</label>
              <input type="number" className="input" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) }))} min="1" max="5" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sıra</label>
              <input type="number" className="input" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şəkil URL</label>
            <input className="input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
              <span>Aktiv</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-gold">{editing ? 'Yenilə' : 'Əlavə et'}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', position: '', content: '', rating: 5, image: '', order: 0, active: true }) }} className="btn btn-outline">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="font-bold mb-4">Testimonials ({testimonials.length})</h3>
        {testimonials.length === 0 ? (
          <p className="text-gray-500">Testimonial yoxdur.</p>
        ) : (
          <div className="grid gap-3">
            {testimonials.map(t => (
              <div key={t._id} className="p-3 border rounded">
                <div className="flex items-start gap-4">
                  {t.image && <img src={t.image} alt={t.name} className="w-16 h-16 object-cover rounded" />}
                  <div className="flex-1">
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.position}</div>
                    <div className="text-sm mt-2">{t.content}</div>
                    <div className="text-sm mt-1">⭐ {t.rating}/5</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleToggleActive(t._id)} className={`btn btn-sm ${t.active ? 'btn-gold' : 'btn-outline'}`}>
                    {t.active ? 'Aktiv' : 'Deaktiv'}
                  </button>
                  <button onClick={() => handleEdit(t)} className="btn btn-sm btn-outline">Düzəlt</button>
                  <button onClick={() => handleDelete(t._id)} className="btn btn-sm btn-outline-gold">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
