import React, { useState, useContext } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      setUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role || 'user'
      })
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="auth-grid">
      <div className="auth-panel card p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="text-gray-600 mt-2">Join Aura Grand and save your favorite hotels for easy booking.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          {error && <div className="alert error">{error}</div>}
          <button className="btn w-full" type="submit">Register</button>
        </form>
      </div>
      <div className="auth-aside">
        <div>
          <h3 className="text-2xl font-semibold text-white">Your next stay starts here.</h3>
          <p className="mt-4 text-slate-100">Register and instantly access hotel search, wishlist, booking, and a modern dashboard experience.</p>
        </div>
      </div>
    </div>
  )
}
