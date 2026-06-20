import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function ContactManager() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      const res = await api.get('/contact')
      if (res.data.data) {
        setContacts(res.data.data)
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}/status`, { status })
      loadContacts()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const deleteContact = async id => {
    if (!confirm('Bu əlaqəni silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/contact/${id}`)
      loadContacts()
    } catch (err) {
      alert('Xəta: ' + (err.response?.data?.message || 'Əməliyyat uğursuz oldu'))
    }
  }

  const getStatusColor = status => {
    switch (status) {
      case 'new': return 'text-indigo-600'
      case 'read': return 'text-gray-600'
      case 'replied': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusLabel = status => {
    switch (status) {
      case 'new': return 'Yeni'
      case 'read': return 'Oxunub'
      case 'replied': return 'Cavab verilib'
      default: return status
    }
  }

  if (loading) return <div className="panel text-center">Yüklənir...</div>

  return (
    <div className="admin-manager">
      <h2 className="section-heading">Əlaqə Mesajları</h2>

      <div className="panel">
        {contacts.length === 0 ? (
          <div className="text-center text-gray-600 py-8">Hələ mesaj yoxdur</div>
        ) : (
          <div className="grid gap-4">
            {contacts.map(contact => (
              <div key={contact._id} className="border rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={contact.status}
                      onChange={e => updateStatus(contact._id, e.target.value)}
                      className={`text-sm px-2 py-1 rounded border ${getStatusColor(contact.status)}`}
                    >
                      <option value="new">Yeni</option>
                      <option value="read">Oxunub</option>
                      <option value="replied">Cavab verilib</option>
                    </select>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium">Mövzu:</span>
                  <span className="text-sm ml-2">{contact.subject}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium">Mesaj:</span>
                  <p className="text-sm mt-1 text-gray-700">{contact.message}</p>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(contact.createdAt).toLocaleString('az-AZ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
