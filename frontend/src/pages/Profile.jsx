import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Profile(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    api.get('/auth/me')
      .then(r=>setUser(r.data.data))
      .catch(()=>setUser(null))
  },[])

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Wishlist</h3>
        <ul>
          {user.wishlist?.map(h => <li key={h}>{h}</li>)}
        </ul>
      </div>
    </div>
  )
}
