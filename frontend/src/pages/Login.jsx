import React, { useState, useContext } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      setUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role
      })
      navigate(res.data.role === 'admin' ? '/admin' : '/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-grid">
      <div className="auth-panel card p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to manage your bookings and access your wishlist.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          {error && <div className="alert error">{error}</div>}
          <button className="btn w-full" type="submit">Sign In</button>
        </form>
      </div>
      <div className="auth-aside">
        <div>
          <h3 className="text-2xl font-semibold text-white">Fast reservations, premium stays.</h3>
          <p className="mt-4 text-slate-100">Login to continue with secure access to hotel search, booking, wishlist, and personal dashboard.</p>
        </div>
      </div>
    </div>
  )
}
