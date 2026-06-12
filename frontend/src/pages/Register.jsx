import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { getApiErrorMessage } from '../utils/apiError'

export default function Register(){
  const [name, setName] = useState('Demo User')
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password
      })
      localStorage.setItem('token', res.data.token)
      navigate('/profile')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Qeydiyyat alınmadı.'))
    }
  }

  return (
    <div className="page-auth">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Qeydiyyat</span>
          </nav>
          <h1 className="page-hero-title">Qonaq hesabı</h1>
          <p className="page-hero-sub">Bir neçə addımda qeydiyyat — sonra otel seçin və rezerv edin.</p>
        </div>
      </section>

      <section className="container section-pad section-pad--auth">
        <div className="auth-card panel max-w-md mx-auto">
          <h2 className="section-heading text-center">Qeydiyyat</h2>
          <p className="text-gray-600 text-center mt-2 mb-6">
            Marian üslublu saytda olduğu kimi sadə form — ad, e-poçt və şifrə.
          </p>
          <form onSubmit={submit} className="space-y-4">
            {error && <div className="alert error" role="alert">{error}</div>}
            <div>
              <label className="block text-sm font-medium">Ad, soyad</label>
              <input className="input mt-1" value={name} onChange={e=>setName(e.target.value)} required autoComplete="name" />
            </div>
            <div>
              <label className="block text-sm font-medium">E-poçt</label>
              <input className="input mt-1" type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label className="block text-sm font-medium">Şifrə</label>
              <input type="password" className="input mt-1" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="new-password" minLength={6} />
            </div>
            <button className="btn btn-gold w-full" type="submit">Hesab yarat</button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Artıq hesabınız var? <Link to="/login" className="text-indigo-600 font-medium">Daxil ol</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
