import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function SpecialOfferManager() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', discount: '', validUntil: '', image: '', order: 0, active: true })

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    try {
      const res = await api.get('/special-offers')
      setOffers(res.data.data || [])
    } catch {
      setOffers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/special-offers/${editing}`, form)
      } else {
        await api.post('/special-offers', form)
      }
      setForm({ title: '', description: '', discount: '', validUntil: '', image: '', order: 0, active: true })
      setEditing(null)
      loadOffers()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const handleEdit = offer => {
    setEditing(offer._id)
    setForm({ title: offer.title, description: offer.description, discount: offer.discount, validUntil: offer.validUntil, image: offer.image, order: offer.order, active: offer.active })
  }

  const handleDelete = async id => {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/special-offers/${id}`)
      loadOffers()
    } catch {
      alert('Silinmədi')
    }
  }

  const handleToggleActive = async id => {
    try {
      const offer = offers.find(o => o._id === id)
      await api.put(`/special-offers/${id}`, { active: !offer.active })
      loadOffers()
    } catch {
      alert('Dəyişdirilmədi')
    }
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">Xüsusi Təkliflər İdarəetməsi</h2>

      <div className="panel mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Düzəlt' : 'Yeni təklif'}</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlıq</label>
            <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Təsvir</label>
            <textarea className="input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows="3" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Endirim</label>
              <input className="input" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} placeholder="20%" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bitiş tarixi</label>
              <input className="input" value={form.validUntil} onChange={e => setForm(f => ({ ...f, validUntil: e.target.value }))} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şəkil URL</label>
            <input className="input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} required />
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
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', discount: '', validUntil: '', image: '', order: 0, active: true }) }} className="btn btn-outline">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="font-bold mb-4">Təkliflər ({offers.length})</h3>
        {offers.length === 0 ? (
          <p className="text-gray-500">Təklif yoxdur.</p>
        ) : (
          <div className="grid gap-3">
            {offers.map(o => (
              <div key={o._id} className="flex items-center gap-4 p-3 border rounded">
                <img src={o.image} alt={o.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-bold">{o.title}</div>
                  <div className="text-sm text-gray-600">{o.description}</div>
                  <div className="text-sm">
                    <span className="font-bold">{o.discount}</span> - {o.validUntil}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleToggleActive(o._id)} className={`btn btn-sm ${o.active ? 'btn-gold' : 'btn-outline'}`}>
                    {o.active ? 'Aktiv' : 'Deaktiv'}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(o)} className="btn btn-sm btn-outline">Düzəlt</button>
                    <button onClick={() => handleDelete(o._id)} className="btn btn-sm btn-outline-gold">Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
