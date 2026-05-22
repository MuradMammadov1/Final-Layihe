import React, { useState } from 'react'
import api from '../api'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await api.post('/contact', { 
        name: 'Newsletter Subscriber', 
        email, 
        subject: 'Newsletter Subscription', 
        message: 'I would like to subscribe to the newsletter.' 
      })
      setMessage('Abunəlik uğurla tamamlandı!')
      setEmail('')
    } catch (err) {
      setMessage('Abunəlik alınmadı. Zəhmət olmasa yenidən cəhd edin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter-section panel">
      <div className="newsletter-content">
        <h3 className="section-heading">Bülletenə abunə olun</h3>
        <p className="text-gray-600 mt-2">
          Xüsusi təkliflər və yeni otellər haqqında məlumat alın.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form mt-4">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-poçt ünvanınız"
              className="input"
              required
              disabled={loading}
            />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Göndərilir...' : 'Abunə ol'}
            </button>
          </div>
          {message && (
            <p className={`mt-2 text-sm ${message.includes('uğurla') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
