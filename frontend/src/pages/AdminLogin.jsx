import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    setError('')

    // Sadə admin yoxlaması
    console.log('Username:', username.trim())
    console.log('Password:', password.trim())
    console.log('Checking:', username.trim() === 'admin', password.trim() === 'admin123')
    
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin-panel')
    } else {
      setError('Ad və ya şifrə yanlışdır')
    }
  }

  return (
    <div className="page-auth">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <h1 className="page-hero-title">Admin Panel</h1>
          <p className="page-hero-sub">Admin panelə daxil olun</p>
        </div>
      </section>

      <section className="container section-pad section-pad--auth">
        <div className="auth-card panel max-w-md mx-auto">
          <h2 className="section-heading text-center">Admin Giriş</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="alert error" role="alert">{error}</div>}
            <div>
              <label className="block text-sm font-medium">Ad</label>
              <input 
                className="input mt-1" 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Şifrə</label>
              <input 
                type="password" 
                className="input mt-1" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                autoComplete="current-password"
              />
            </div>
            <button className="btn btn-gold w-full" type="submit">Daxil ol</button>
          </form>
        </div>
      </section>
    </div>
  )
}
