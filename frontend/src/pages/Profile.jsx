import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { AuthContext } from '../context/AuthContext'

export default function Profile(){
  const { user, loading, logout, reload } = useContext(AuthContext)
  const [reservations, setReservations] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [message, setMessage] = useState('')
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', email: '' })
  const [updateLoading, setUpdateLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
      return
    }

    if (user) {
      api.get('/reservation/user')
        .then(res => setReservations(res.data.data || []))
        .catch(() => setReservations([]))

      api.get('/wishlist')
        .then(res => setWishlist(res.data.data || []))
        .catch(() => setWishlist([]))
    }
  }, [user, loading, navigate])

  const cancelReservation = async id => {
    try {
      await api.delete(`/reservation/${id}`)
      setReservations(prev => prev.filter(r => r._id !== id))
      setMessage('Rezervasiya ləğv edildi.')
    } catch (err) {
      setMessage('Rezervasiya ləğv olunmadı.')
    }
  }

  const removeWishlist = async hotelId => {
    try {
      await api.delete(`/wishlist/${hotelId}`)
      setWishlist(prev => prev.filter(h => h._id !== hotelId))
      setMessage('Seçilmişlərdən silindi.')
      await reload()
    } catch (err) {
      setMessage('Seçilmişlərdən silinmədi.')
    }
  }

  const handleEditStart = () => {
    setEditForm({ name: user.name, email: user.email })
    setEditing(true)
    setMessage('')
  }

  const handleUpdateProfile = async e => {
    e.preventDefault()
    setUpdateLoading(true)
    try {
      await api.put('/auth/me', editForm)
      await reload()
      setEditing(false)
      setMessage('Profil yeniləndi.')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Profil yenilənmədi.')
    } finally {
      setUpdateLoading(false)
    }
  }

  if (loading || !user) return <div className="container py-12 text-center text-gray-600">Yüklənir...</div>

  return (
    <div className="page-auth">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Profil</span>
          </nav>
          <h1 className="page-hero-title">Qonaq kabineti</h1>
          <p className="page-hero-sub">Bronlarınız və seçilmiş otelləriniz bir yerdə.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="panel max-w-xl mx-auto">
          {editing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h2 className="section-heading">Profil redaktə</h2>
              <div>
                <label className="block text-sm font-medium">Ad</label>
                <input
                  value={editForm.name}
                  onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                  required
                  disabled={updateLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">E-poçt</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="input"
                  required
                  disabled={updateLoading}
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn" disabled={updateLoading}>
                  {updateLoading ? 'Yenilənir...' : 'Yadda saxla'}
                </button>
                <button type="button" className="btn btn-outline-gold" onClick={() => setEditing(false)} disabled={updateLoading}>
                  Ləğv et
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="section-heading">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-2 text-sm section-label" style={{ marginBottom: 0 }}>Şəxsi kabinet</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline-gold" type="button" onClick={handleEditStart}>Redaktə et</button>
                <button className="btn btn-outline-gold" type="button" onClick={logout}>Çıxış</button>
              </div>
            </div>
          )}
        </div>

        {message && <div className="alert max-w-xl mx-auto">{message}</div>}

        <section className="panel max-w-xl mx-auto mt-6">
          <h3 className="section-heading text-xl mb-4">Bronlarım</h3>
          {reservations.length === 0 ? (
            <p className="text-gray-600">Hələ bron yoxdur. <Link to="/hotels" className="text-indigo-600 font-medium">Otellərə keç</Link></p>
          ) : (
            <div className="space-y-4">
              {reservations.map(res => (
                <div key={res._id} className="border rounded p-4 bg-slate-50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div>
                      <h4 className="font-semibold">{res.hotel?.name || 'Otel'}</h4>
                      <p className="text-sm text-gray-600">{res.hotel?.city}</p>
                      <p className="mt-1 text-gray-700">Otaq: {res.room?.title || 'İstənilən'}</p>
                      <p className="text-sm text-gray-600">{new Date(res.startDate).toLocaleDateString('az-AZ')} – {new Date(res.endDate).toLocaleDateString('az-AZ')}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-start md:items-end">
                      <span className="badge">{res.status}</span>
                      <p className="text-indigo-600 font-semibold">Cəmi: ${res.totalPrice}</p>
                      <button type="button" className="btn btn-outline-gold btn-sm" onClick={() => cancelReservation(res._id)}>Ləğv et</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="panel max-w-xl mx-auto mt-6">
          <h3 className="section-heading text-xl mb-4">Seçilmişlər</h3>
          {wishlist.length === 0 ? (
            <p className="text-gray-600">Seçilmiş siyahınız boşdur.</p>
          ) : (
            <div className="space-y-4">
              {wishlist.map(hotel => (
                <div key={hotel._id} className="border rounded p-4 bg-slate-50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div>
                      <h4 className="font-semibold">{hotel.name}</h4>
                      <p className="text-sm text-gray-600">{hotel.city}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Link to={`/hotels/${hotel._id}`} className="btn btn-gold btn-sm">Ətraflı</Link>
                      <button type="button" className="btn secondary btn-sm" onClick={() => removeWishlist(hotel._id)}>Sil</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  )
}
