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

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`)
        setRoom(res.data.data || res.data)
        if (res.data.data?.hotel || res.data?.hotel) {
          const hotelId = res.data.data?.hotel?._id || res.data?.hotel
          const hotelRes = await api.get(`/hotels/${hotelId}`)
          setHotel(hotelRes.data.data || hotelRes.data)
        }
      } catch (err) {
        console.error('Otaq yüklənmədi:', err)
        // Demo otaq məlumatları
        const demoRooms = [
          { _id: 'demo-0', title: 'Klassik İkiqat', type: 'Standard', price: 120, capacity: 2, description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.', amenities: ['WiFi', 'TV', 'Kondisioner', 'Mini bar'] },
          { _id: 'demo-1', title: 'Deluxe Suite', type: 'Suite', price: 150, capacity: 2, description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.', amenities: ['WiFi', 'TV', 'Kondisioner', 'Mini bar'] },
          { _id: 'demo-2', title: 'Executive Otaq', type: 'Deluxe', price: 180, capacity: 2, description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.', amenities: ['WiFi', 'TV', 'Kondisioner', 'Mini bar'] },
          { _id: 'demo-3', title: 'Ailə Otağı', type: 'Family', price: 200, capacity: 4, description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.', amenities: ['WiFi', 'TV', 'Kondisioner', 'Mini bar'] },
          { _id: 'demo-4', title: 'Premium King', type: 'Premium', price: 220, capacity: 2, description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.', amenities: ['WiFi', 'TV', 'Kondisioner', 'Mini bar'] },
          { _id: 'demo-5', title: 'Studio Otaq', type: 'Studio', price: 160, capacity: 2, description: 'Geniş və işıqlı otaq, peşəkar xidmət və rahat yataq.', amenities: ['WiFi', 'TV', 'Kondisioner', 'Mini bar'] }
        ]
        const demoRoom = demoRooms.find(r => r._id === id)
        if (demoRoom) {
          setRoom(demoRoom)
          setHotel({ _id: 'demo-hotel', name: 'Aura Grand Hotel', city: 'Bakı', description: 'Lüks və rahat qonaqlıq təcrübəsi.' })
        }
      } finally {
        setLoading(false)
      }
    }
    loadRoom()
  }, [id])

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
      // Demo hotel üçün rezervasiya etmirik
      if (hotel._id === 'demo-hotel') {
        alert('Demo rejimdir. Zəhmət olmasa real otel seçin.')
        navigate('/hotels')
        return
      }
      await api.post('/reservation', {
        hotel: hotel._id,
        room: room._id,
        startDate,
        endDate
      })
      alert('Rezervasiya uğurla tamamlandı!')
      navigate('/hotels')
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
                  <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {startDate} - {endDate}
                    </p>
                  </div>
                )}
                <button 
                  type="submit" 
                  className="btn btn-gold w-full"
                  disabled={reserving || !startDate || !endDate}
                >
                  {reserving ? 'Rezerv edilir...' : 'Rezerv et'}
                </button>
              </form>
              {!user && (
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Rezervasiya etmək üçün <Link to="/login" className="text-indigo-600">daxil olun</Link>
                </p>
              )}
            </div>

            {hotel && hotel._id !== 'demo-hotel' && (
              <div className="panel mt-6">
                <h3 className="text-lg font-semibold mb-3">Otel haqqında</h3>
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <Link to={`/hotels/${hotel._id}`} className="btn secondary w-full text-center">
                  Otelə bax
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
