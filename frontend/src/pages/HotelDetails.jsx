import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import { AuthContext } from '../context/AuthContext'
import { hotelImage } from '../data/images'
import AvailabilityCalendar from '../components/AvailabilityCalendar'

export default function HotelDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState('')
  const [saved, setSaved] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [loadingRooms, setLoadingRooms] = useState(false)
  const [availableDates, setAvailableDates] = useState([])
  const [calendarMonth, setCalendarMonth] = useState(new Date())

  useEffect(()=>{
    const loadHotel = async () => {
      try {
        const res = await api.get(`/hotels/${id}`)
        setHotel(res.data.data)
      } catch {
        setHotel(null)
      }
    }
    loadHotel()
  },[id])

  useEffect(() => {
    if (!hotel) return
    const loadRooms = async () => {
      setLoadingRooms(true)
      try {
        const res = await api.get(`/rooms/hotel/${hotel._id}`)
        setRooms(res.data.data || [])
      } catch {
        setRooms([])
      } finally {
        setLoadingRooms(false)
      }
    }
    loadRooms()
  }, [hotel])

  useEffect(() => {
    if (rooms.length && !selectedRoom) {
      setSelectedRoom(rooms[0]._id)
    }
  }, [rooms, selectedRoom])

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await api.get(`/review/${id}`)
        setReviews(res.data.data)
      } catch {
        setReviews([])
      }
    }
    loadReviews()
  }, [id])

  useEffect(() => {
    if (!user || !hotel) return
    const loadWishlistStatus = async () => {
      try {
        const res = await api.get('/wishlist')
        setSaved(res.data.data.some(item => item._id === hotel._id))
      } catch {
        setSaved(false)
      }
    }
    loadWishlistStatus()
  }, [user, hotel])

  // Availability calendar hesablaması
  useEffect(() => {
    if (!hotel) return
    const today = new Date()
    const dates = []
    const nextMonth = new Date(today)
    nextMonth.setMonth(nextMonth.getMonth() + 2)
    
    for (let d = new Date(today); d <= nextMonth; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      const isWeekend = d.getDay() === 0 || d.getDay() === 6
      dates.push({
        date: dateStr,
        available: true,
        price: isWeekend ? Math.round(hotel.price * 1.2) : hotel.price
      })
    }
    setAvailableDates(dates)
  }, [hotel])

  const roomPrice = selectedRoom
    ? rooms.find(room => room._id === selectedRoom)?.price || hotel.price
    : hotel.price

  const nights = startDate && endDate
    ? Math.max(0, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)))
    : 0

  const estimatedTotal = nights > 0 ? roomPrice * nights : 0

  const handleReserve = async e => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    try {
      await api.post('/reservation', {
        hotel: id,
        room: selectedRoom || undefined,
        startDate,
        endDate
      })
      setMessage('Bron uğurla göndərildi.')
      setStartDate('')
      setEndDate('')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Bron alınmadı.')
    }
  }

  const handleSubmitReview = async e => {
    e.preventDefault()
    if (!user) {
      setReviewError('Təkrar daxil olun və rəy yazın.')
      return
    }

    if (!reviewComment.trim()) {
      setReviewError('Zəhmət olmasa, rəy yazın.')
      return
    }

    try {
      await api.post('/review', {
        hotel: id,
        rating: reviewRating,
        comment: reviewComment.trim()
      })
      setReviewComment('')
      setReviewError('')
      const res = await api.get(`/review/${id}`)
      setReviews(res.data.data)
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Rəy göndərərkən xəta baş verdi.')
    }
  }

  if (!hotel) return <div className="container py-12 text-center text-gray-600">Yüklənir...</div>

  return (
    <div className="space-y-8">
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${hotelImage(hotel)})` }}
        role="img"
        aria-label={hotel.name}
      />
      <div className="detail-grid">
        <div className="detail-card">
          <div className="flex flex-col gap-4">
            <div>
              <span className="badge">{hotel.city}</span>
              <h2 className="text-3xl font-semibold mt-4">{hotel.name}</h2>
              <p className="text-gray-600 mt-3">{hotel.description || 'Premium otaqlar, müasir imkanlar və növbəti qonaqlığınız üçün rahat bron.'}</p>
            </div>

            <div className="hotel-details-meta">
              <span className="stat-pill">${hotel.price} / gecə</span>
              {hotel.rating && <span className="stat-pill">Reytinq {hotel.rating.toFixed(1)}</span>}
              {hotel.availability && <span className="stat-pill">{hotel.availability.available ? `${hotel.availability.availableRooms || 'Mövcud'} otaq` : 'Dolu'}</span>}
            </div>

            {hotel.amenities?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-3">Əsas imkanlar</h4>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map(amenity => (
                    <span key={amenity} className="amenity-pill">{amenity}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-3">Otaq növləri</h4>
              {loadingRooms ? (
                <p className="text-gray-600">Otaqlar yüklənir...</p>
              ) : rooms.length === 0 ? (
                <p className="text-gray-600">Bu otel üçün hələ otaq tipi əlavə edilməyib.</p>
              ) : (
                <div className="space-y-3">
                  {rooms.map(room => (
                    <label
                      key={room._id}
                      className={`room-card ${selectedRoom === room._id ? 'room-card-selected' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="selectedRoom"
                          value={room._id}
                          checked={selectedRoom === room._id}
                          onChange={() => setSelectedRoom(room._id)}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-semibold">{room.title}</span>
                            <span className="pill">{room.type || 'Otaq'}</span>
                            <span className="pill">{room.capacity} nəfər</span>
                          </div>
                          <p className="text-sm text-gray-600">{room.description || 'Rahat qonaqlıq üçün düşünülmüş otaq.'}</p>
                          <p className="mt-2 font-semibold text-indigo-600">${room.price} / gecə</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-3">Mövcudluq Təqvimi</h4>
              <div className="panel">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    type="button" 
                    className="btn secondary btn-sm"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.setMonth(calendarMonth.getMonth() - 1)))}
                  >
                    ←
                  </button>
                  <span className="font-semibold">
                    {calendarMonth.toLocaleDateString('az-AZ', { month: 'long', year: 'numeric' })}
                  </span>
                  <button 
                    type="button" 
                    className="btn secondary btn-sm"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.setMonth(calendarMonth.getMonth() + 1)))}
                  >
                    →
                  </button>
                </div>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                  {['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600">{day}</div>
                  ))}
                  {availableDates.slice(0, 35).map((dateInfo, idx) => {
                    const date = new Date(dateInfo.date)
                    const isCurrentMonth = date.getMonth() === calendarMonth.getMonth()
                    const isSelected = startDate === dateInfo.date || endDate === dateInfo.date
                    const isInRange = startDate && endDate && dateInfo.date >= startDate && dateInfo.date <= endDate
                    
                    return (
                      <button
                        key={dateInfo.date}
                        type="button"
                        disabled={!dateInfo.available || !isCurrentMonth}
                        onClick={() => {
                          if (!startDate || (startDate && endDate)) {
                            setStartDate(dateInfo.date)
                            setEndDate('')
                          } else if (startDate && !endDate) {
                            if (new Date(dateInfo.date) < new Date(startDate)) {
                              setStartDate(dateInfo.date)
                            } else {
                              setEndDate(dateInfo.date)
                            }
                          }
                        }}
                        className={`p-2 text-sm rounded transition-all ${
                          !dateInfo.available || !isCurrentMonth
                            ? 'text-gray-300 cursor-not-allowed'
                            : isSelected || isInRange
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-indigo-100 cursor-pointer'
                        }`}
                      >
                        <div>{date.getDate()}</div>
                        {dateInfo.available && isCurrentMonth && (
                          <div className="text-xs mt-1">${dateInfo.price}</div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="image-grid mt-4">
              {hotel.images?.slice(0, 3).map((src, i) => (
                <img key={i} src={src} alt={`Otel şəkli ${i + 1}`} className="w-full h-44 object-cover rounded" />
              ))}
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h3 className="text-xl font-semibold mb-4">Qonaq rəyləri</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-600">Hələ bir rəy yazılmayıb.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review._id} className="border rounded p-4 bg-slate-50">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{review.user?.name || 'Qonaq'}</p>
                      <p className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="badge">{review.rating}⭐</span>
                  </div>
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {user ? (
            <form onSubmit={handleSubmitReview} className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium">Reytinqiniz</label>
                <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} className="input">
                  <option value={5}>5 — Əla</option>
                  <option value={4}>4 — Çox yaxşı</option>
                  <option value={3}>3 — Yaxşı</option>
                  <option value={2}>2 — Orta</option>
                  <option value={1}>1 — Zəif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Rəy</label>
                <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} className="input" rows="4" placeholder="Təcrübənizi yazın..."></textarea>
              </div>
              {reviewError && <div className="alert error">{reviewError}</div>}
              <button className="btn btn-gold w-full" type="submit">Rəy göndər</button>
            </form>
          ) : (
            <p className="mt-6 text-gray-600">Rəy yazmaq üçün daxil olun.</p>
          )}
        </div>

        <div className="detail-card detail-summary">
          <div>
            <h3 className="text-xl font-semibold">Bron məlumatları</h3>
            <p className="mt-2 text-gray-600">Tarixləri seçin və təsdiqləyin. Daxil olmuş istifadəçilər oteli seçilmişlərə əlavə edə bilər.</p>
          </div>

          {message && <div className="alert success">{message}</div>}

          <form onSubmit={handleReserve} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Giriş</label>
              <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Çıxış</label>
              <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="input" required />
            </div>
            <div className="booking-summary">
              <div>
                <p className="text-sm text-gray-600">Gecəlik</p>
                <p className="font-semibold">${roomPrice} / gecə</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Təxmini cəmi</p>
                <p className="font-semibold">{estimatedTotal > 0 ? `$${estimatedTotal}` : 'Tarix seçin'}</p>
              </div>
            </div>
            <button className="btn btn-gold w-full" type="submit">İndi bron et</button>
            {user && (
              <button
                type="button"
                className="btn secondary w-full"
                onClick={async () => {
                  try {
                    if (saved) {
                      await api.delete(`/wishlist/${hotel._id}`)
                      setSaved(false)
                    } else {
                      await api.post(`/wishlist/${hotel._id}`)
                      setSaved(true)
                    }
                  } catch {
                    setMessage('Seçilmişlər yenilənmədi.')
                  }
                }}
              >
                {saved ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
