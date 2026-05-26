import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function FAQManager() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ question: '', answer: '', order: 0 })

  useEffect(() => {
    loadFAQs()
  }, [])

  const loadFAQs = async () => {
    try {
      const res = await api.get('/faq')
      setFaqs(res.data.data || [])
    } catch {
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/faq/${editing}`, form)
      } else {
        await api.post('/faq', form)
      }
      setForm({ question: '', answer: '', order: 0 })
      setEditing(null)
      loadFAQs()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const handleEdit = faq => {
    setEditing(faq._id)
    setForm({ question: faq.question, answer: faq.answer, order: faq.order })
  }

  const handleDelete = async id => {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/faq/${id}`)
      loadFAQs()
    } catch {
      alert('Silinmədi')
    }
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">FAQ İdarəetməsi</h2>

      <div className="panel mb-6">
        <h3 className="font-bold mb-4">{editing ? 'Düzəlt' : 'Yeni FAQ'}</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sual</label>
            <input className="input" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cavab</label>
            <textarea className="input" value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} rows="3" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sıra</label>
            <input type="number" className="input" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) }))} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-gold">{editing ? 'Yenilə' : 'Əlavə et'}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ question: '', answer: '', order: 0 }) }} className="btn btn-outline">Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h3 className="font-bold mb-4">Sual-Cavab ({faqs.length})</h3>
        {faqs.length === 0 ? (
          <p className="text-gray-500">FAQ yoxdur.</p>
        ) : (
          <div className="grid gap-3">
            {faqs.map(f => (
              <div key={f._id} className="p-3 border rounded">
                <div className="font-bold">{f.question}</div>
                <div className="text-sm text-gray-600">{f.answer}</div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(f)} className="btn btn-sm btn-outline">Düzəlt</button>
                  <button onClick={() => handleDelete(f._id)} className="btn btn-sm btn-outline-gold">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
