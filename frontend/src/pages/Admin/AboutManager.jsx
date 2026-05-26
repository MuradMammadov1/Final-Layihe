import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function AboutManager() {
  const [about, setAbout] = useState({
    title: '',
    subtitle: '',
    description: '',
    history: '',
    mission: '',
    vision: '',
    image: '',
    stats: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAbout()
  }, [])

  const loadAbout = async () => {
    try {
      const res = await api.get('/about')
      if (res.data.data) {
        setAbout(res.data.data)
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.put('/about', about)
      alert('Yeniləndi!')
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const addStat = () => {
    setAbout(prev => ({ ...prev, stats: [...prev.stats, { label: '', value: '' }] }))
  }

  const updateStat = (idx, field, value) => {
    setAbout(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => i === idx ? { ...stat, [field]: value } : stat)
    }))
  }

  const removeStat = idx => {
    setAbout(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== idx) }))
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">Haqqımızda İdarəetməsi</h2>

      <div className="panel">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlıq</label>
            <input className="input" value={about.title} onChange={e => setAbout(f => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt başlıq</label>
            <input className="input" value={about.subtitle} onChange={e => setAbout(f => ({ ...f, subtitle: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Təsvir</label>
            <textarea className="input" value={about.description} onChange={e => setAbout(f => ({ ...f, description: e.target.value }))} rows="3" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tarix</label>
            <textarea className="input" value={about.history} onChange={e => setAbout(f => ({ ...f, history: e.target.value }))} rows="4" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Missiya</label>
            <textarea className="input" value={about.mission} onChange={e => setAbout(f => ({ ...f, mission: e.target.value }))} rows="3" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vizyon</label>
            <textarea className="input" value={about.vision} onChange={e => setAbout(f => ({ ...f, vision: e.target.value }))} rows="3" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şəkil URL</label>
            <input className="input" value={about.image} onChange={e => setAbout(f => ({ ...f, image: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Statistikalar</label>
            {about.stats.map((stat, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input className="input flex-1" placeholder="Etiket" value={stat.label} onChange={e => updateStat(idx, 'label', e.target.value)} />
                <input className="input flex-1" placeholder="Dəyər" value={stat.value} onChange={e => updateStat(idx, 'value', e.target.value)} />
                <button type="button" onClick={() => removeStat(idx)} className="btn btn-sm btn-outline-gold">Sil</button>
              </div>
            ))}
            <button type="button" onClick={addStat} className="btn btn-sm secondary">Statistika əlavə et</button>
          </div>
          <button type="submit" className="btn btn-gold">Yenilə</button>
        </form>
      </div>
    </div>
  )
}
