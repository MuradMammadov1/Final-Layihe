import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import { AuthContext } from '../context/AuthContext'

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
      setMessage('Reservation submitted successfully.')
      setStartDate('')
      setEndDate('')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reservation failed.')
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

  if (!hotel) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <div className="detail-grid">
        <div className="detail-card">
          <div className="flex flex-col gap-4">
            <div>
              <span className="badge">{hotel.city}</span>
              <h2 className="text-3xl font-semibold mt-4">{hotel.name}</h2>
              <p className="text-gray-600 mt-3">{hotel.description || 'Explore premium hotel rooms, modern amenities, and convenient booking options for your next stay.'}</p>
            </div>

            <div className="hotel-details-meta">
              <span className="stat-pill">${hotel.price} / night</span>
              {hotel.rating && <span className="stat-pill">Rating {hotel.rating.toFixed(1)}</span>}
              {hotel.availability && <span className="stat-pill">{hotel.availability.available ? `${hotel.availability.availableRooms || 'Available'} rooms` : 'Sold out'}</span>}
            </div>

            {hotel.amenities?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-3">Top amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map(amenity => (
                    <span key={amenity} className="amenity-pill">{amenity}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-3">Room options</h4>
              {loadingRooms ? (
                <p className="text-gray-600">Loading rooms...</p>
              ) : rooms.length === 0 ? (
                <p className="text-gray-600">No room types available yet for this hotel.</p>
              ) : (
                <div className="space-y-3">
                  {rooms.map(room => (
                    <label
                      key={room._id}
                      className={`room-card ${selectedRoom === room._id ? 'border-indigo-500 bg-indigo-50' : ''}`}
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
                            <span className="pill">{room.type || 'Room'}</span>
                            <span className="pill">{room.capacity} guests</span>
                          </div>
                          <p className="text-sm text-gray-600">{room.description || 'Smartly designed room for a comfortable stay.'}</p>
                          <p className="mt-2 font-semibold text-indigo-600">${room.price} / night</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="image-grid mt-4">
              {hotel.images?.slice(0, 3).map((src, i) => (
                <img key={i} src={src} alt={`Hotel image ${i + 1}`} className="w-full h-44 object-cover rounded" />
              ))}
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h3 className="text-xl font-semibold mb-4">Guest Reviews</h3>
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
                <label className="block text-sm font-medium">Your rating</label>
                <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} className="input">
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very good</option>
                  <option value={3}>3 - Good</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Comment</label>
                <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} className="input" rows="4" placeholder="Write your experience..."></textarea>
              </div>
              {reviewError && <div className="alert error">{reviewError}</div>}
              <button className="btn w-full" type="submit">Submit Review</button>
            </form>
          ) : (
            <p className="mt-6 text-gray-600">Rəy yazmaq üçün daxil olun.</p>
          )}
        </div>

        <div className="detail-card detail-summary">
          <div>
            <h3 className="text-xl font-semibold">Reservation details</h3>
            <p className="mt-2 text-gray-600">Choose your dates and confirm instantly. Logged-in users can save hotels to wishlist and manage bookings.</p>
          </div>

          {message && <div className="alert success">{message}</div>}

          <form onSubmit={handleReserve} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Check-in</label>
              <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Check-out</label>
              <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="input" required />
            </div>
            <div className="booking-summary">
              <div>
                <p className="text-sm text-gray-600">Rate</p>
                <p className="font-semibold">${roomPrice} / night</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated total</p>
                <p className="font-semibold">{estimatedTotal > 0 ? `$${estimatedTotal}` : 'Select dates'}</p>
              </div>
            </div>
            <button className="btn w-full" type="submit">Reserve now</button>
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
                    setMessage('Wishlist update failed.')
                  }
                }}
              >
                {saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
