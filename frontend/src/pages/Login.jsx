import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { getApiErrorMessage } from '../utils/apiError'

export default function Login(){
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email: email.trim(), password })
      localStorage.setItem('token', res.data.token)
      navigate(res.data.role === 'admin' ? '/admin' : '/profile')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Daxil olmaq mümkün olmadı.'))
    }
  }

  return (
    <div className="page-auth">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Daxil ol</span>
          </nav>
          <h1 className="page-hero-title">Xoş gəlmisiniz</h1>
          <p className="page-hero-sub">Hesabınıza daxil olun — bronlarınızı və seçilmişləri idarə edin.</p>
        </div>
      </section>

      <section className="container section-pad section-pad--auth">
        <div className="auth-card panel max-w-md mx-auto">
          <h2 className="section-heading text-center">Daxil ol</h2>
          <p className="text-gray-600 text-center mt-2 mb-6">
            Radisson tipli otel saytı ilə eyni axında təqdimat üçün qonaq hesabı.
          </p>
          <form onSubmit={submit} className="space-y-4">
            {error && <div className="alert error" role="alert">{error}</div>}
            <div>
              <label className="block text-sm font-medium">E-poçt</label>
              <input className="input mt-1" type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label className="block text-sm font-medium">Şifrə</label>
              <input type="password" className="input mt-1" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <button className="btn btn-gold w-full" type="submit">Daxil ol</button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Hesabınız yoxdur? <Link to="/register" className="text-indigo-600 font-medium">Qeydiyyat</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
