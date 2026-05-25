import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function UserManager(){
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  const loadUsers = async () => {
    try {
      const res = await api.get('/auth/users')
      setUsers(res.data.data || [])
    } catch {
      setUsers([])
    }
  }

  useEffect(() => { loadUsers() }, [])

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    try {
      await api.put(`/auth/users/${userId}`, { role: newRole })
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u))
      setMessage('Rol yeniləndi.')
    } catch {
      setMessage('Rol yenilənmədi.')
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/auth/users/${id}`)
      setUsers(prev => prev.filter(u => u._id !== id))
      setMessage('İstifadəçi silindi.')
    } catch {
      setMessage('Silinmədi.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">İstifadəçi İdarəetməsi</h2>
          <p className="text-gray-600">İstifadəçiləri idarə edin, rolları dəyişdirin.</p>
        </div>
        {message && <div className="alert mt-4">{message}</div>}

        {users.length === 0 ? (
          <div className="p-4 rounded bg-slate-100 text-gray-700 mt-4">İstifadəçi tapılmadı.</div>
        ) : (
          <div className="space-y-4 mt-4">
            {users.map(user => (
              <div key={user._id} className="p-4 rounded border bg-slate-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span className={`badge mt-2 ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role === 'admin' ? 'Admin' : 'İstifadəçi'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="btn secondary" 
                      onClick={() => toggleRole(user._id, user.role)}
                    >
                      {user.role === 'admin' ? 'İstifadəçi et' : 'Admin et'}
                    </button>
                    <button className="btn secondary" onClick={() => handleDelete(user._id)}>Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
