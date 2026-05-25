import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function ReviewManager(){
  const [reviews, setReviews] = useState([])
  const [message, setMessage] = useState('')

  const loadReviews = async () => {
    try {
      const res = await api.get('/review/all')
      setReviews(res.data.data || [])
    } catch {
      setReviews([])
    }
  }

  useEffect(() => { loadReviews() }, [])

  const handleDelete = async id => {
    if (!window.confirm('Bu rəyi silmək istədiyinizə əminsiniz?')) return
    try {
      await api.delete(`/review/${id}`)
      setReviews(prev => prev.filter(r => r._id !== id))
      setMessage('Rəy silindi.')
    } catch {
      setMessage('Silinmədi.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Rəy İdarəetməsi</h2>
          <p className="text-gray-600">Otellərə yazılan rəyləri idarə edin.</p>
        </div>
        {message && <div className="alert mt-4">{message}</div>}

        {reviews.length === 0 ? (
          <div className="p-4 rounded bg-slate-100 text-gray-700 mt-4">Rəy tapılmadı.</div>
        ) : (
          <div className="space-y-4 mt-4">
            {reviews.map(review => (
              <div key={review._id} className="p-4 rounded border bg-slate-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.user?.name || 'Anonim'}</span>
                      <span className="badge">{review.rating} ★</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Otel: {review.hotel?.name || 'Bilinmir'}</p>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button className="btn secondary" onClick={() => handleDelete(review._id)}>Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
