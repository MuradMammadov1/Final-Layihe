import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/profile')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input className="w-full border px-2 py-1" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Password</label>
          <input type="password" className="w-full border px-2 py-1" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn" type="submit">Sign In</button>
      </form>
    </div>
  )
}
