import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api'
import { AuthContext } from '../context/AuthContext'
import AvailabilityCalendar from '../components/AvailabilityCalendar'

export default function RoomDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [room, setRoom] = useState(null)
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reserving, setReserving] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [reviewLoading, setReviewLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [nights, setNights] = useState(0)

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`)
        setRoom(res.data.data || res.data)
        if (res.data.data?.hotel || res.data?.hotel) {
          const hotelId = res.data.data?.hotel?._id || res.data?.hotel
          const hotelRes = await api.get(`/hotels/${hotelId}`)
          setHotel(hotelRes.data.data || hotelRes.data)

          // Rəyləri yüklə
          try {
            const reviewRes = await api.get(`/review/${hotelId}`)
            setReviews(reviewRes.data.data || [])
          } catch {
            setReviews([])
          }
        }
      } catch (err) {
        console.error('Otaq yüklənmədi:', err)
        setRoom(null)
      } finally {
        setLoading(false)
      }
    }
    loadRoom()
  }, [id])

  // Qiymət hesablaması
  useEffect(() => {
    if (startDate && endDate && room) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays > 0) {
        setNights(diffDays)
        setTotalPrice(diffDays * room.price)
      } else {
        setNights(0)
        setTotalPrice(0)
      }
    } else {
      setNights(0)
      setTotalPrice(0)
    }
  }, [startDate, endDate, room])

  const handleSubmitReview = async e => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setReviewLoading(true)
    try {
      await api.post('/review', {
        hotel: hotel._id,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment
      })
      setReviewForm({ rating: 5, comment: '' })
      // Rəyləri yenidən yüklə
      const reviewRes = await api.get(`/review/${hotel._id}`)
      setReviews(reviewRes.data.data || [])
      alert('Rəyiniz göndərildi!')
    } catch (err) {
      alert('Rəy göndərilmədi: ' + (err.response?.data?.message || err.message))
    } finally {
      setReviewLoading(false)
    }
  }

  const handleReserve = async e => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    if (!startDate || !endDate) {
      alert('Zəhmət olmasa tarixləri seçin')
      return
    }
    setReserving(true)
    try {
      await api.post('/reservation', {
        hotel: hotel._id,
        room: room._id,
        startDate,
        endDate
      })
      alert('Rezervasiya uğurla tamamlandı!')
      navigate('/profile')
    } catch (err) {
      alert('Rezervasiya alınmadı: ' + (err.response?.data?.message || err.message))
    } finally {
      setReserving(false)
    }
  }

  if (loading) {
    return <div className="container section-pad panel text-center">Yüklənir...</div>
  }

  if (!room) {
    return <div className="container section-pad panel text-center">Otaq tapılmadı.</div>
  }

  return (
    <div className="page-room-details">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <Link to="/rooms">Otaqlar</Link>
            <span>/</span>
            <span>{room.title}</span>
          </nav>
          <h1 className="page-hero-title">{room.title}</h1>
          <p className="page-hero-sub">{hotel?.name || 'Otel'} - {room.type}</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="panel">
              <h2 className="text-2xl font-semibold mb-4">Otaq detalları</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Otaq növü:</span>
                  <span className="font-semibold">{room.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Nəfər sayı:</span>
                  <span className="font-semibold">{room.capacity} nəfər</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Qiymət:</span>
                  <span className="font-semibold text-indigo-600">${room.price} / gecə</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Otel:</span>
                  <span className="font-semibold">{hotel?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Şəhər:</span>
                  <span className="font-semibold">{hotel?.city}</span>
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Təsvir</h3>
                  <p className="text-gray-600">{room.description || 'Rahat qonaqlıq üçün düşünülmüş otaq.'}</p>
                </div>
                {room.amenities && room.amenities.length > 0 && (
                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">Xidmətlər</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, i) => (
                        <span key={i} className="amenity-pill">{amenity}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="panel">
              <h2 className="text-2xl font-semibold mb-4">Rezervasiya et</h2>
              <form onSubmit={handleReserve}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Tarixləri seçin</label>
                  <AvailabilityCalendar
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                  />
                </div>
                {startDate && endDate && (
                  <div className="mb-4 p-4 bg-indigo-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tarixlər:</span>
                      <span className="text-sm font-semibold">{startDate} - {endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gecə sayı:</span>
                      <span className="text-sm font-semibold">{nights} gecə</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Otaq qiyməti:</span>
                      <span className="text-sm font-semibold">${room?.price} / gecə</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-sm font-semibold">Cəmi:</span>
                      <span className="text-lg font-bold text-indigo-600">${totalPrice}</span>
                    </div>
                  </div>
                )}
                <button 
                  type="submit" 
                  className="btn btn-gold w-full"
                  disabled={reserving || !startDate || !endDate || nights === 0}
                >
                  {reserving ? 'Rezerv edilir...' : `Rezerv et - $${totalPrice}`}
                </button>
              </form>
              {!user && (
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Rezervasiya etmək üçün <Link to="/login" className="text-indigo-600">daxil olun</Link>
                </p>
              )}
            </div>

            {hotel && (
              <div className="panel mt-6">
                <h3 className="text-lg font-semibold mb-3">Otel haqqında</h3>
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <Link to={`/hotels/${hotel._id}`} className="btn secondary w-full text-center">
                  Otelə bax
                </Link>
              </div>
            )}

            <div className="panel mt-6">
              <h3 className="text-lg font-semibold mb-4">Rəylər</h3>
              {user && (
                <form onSubmit={handleSubmitReview} className="mb-6 pb-6 border-b">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Reytinq</label>
                    <select
                      value={reviewForm.rating}
                      onChange={e => setReviewForm(prev => ({ ...prev, rating: e.target.value }))}
                      className="input"
                    >
                      <option value="5">5 - Əla</option>
                      <option value="4">4 - Yaxşı</option>
                      <option value="3">3 - Orta</option>
                      <option value="2">2 - Zəif</option>
                      <option value="1">1 - Çox zəif</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Şərh</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={e => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      className="input"
                      rows="3"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-gold w-full" disabled={reviewLoading}>
                    {reviewLoading ? 'Göndərilir...' : 'Rəy yaz'}
                  </button>
                </form>
              )}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-600">Hələ rəy yoxdur.</p>
                ) : (
                  reviews.map(review => (
                    <div key={review._id} className="p-4 rounded bg-slate-50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{review.user?.name || 'Anonim'}</span>
                        <span className="badge">{review.rating} ★</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
