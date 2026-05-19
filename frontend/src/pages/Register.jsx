import React, { useState, useContext } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const submit = async e => {
    e.preventDefault()
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
      alert(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn w-full" type="submit">Register</button>
      </form>
    </div>
  )
}
