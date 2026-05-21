import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookingBar() {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [rooms, setRooms] = useState('1')

  const handleBook = e => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (checkIn) params.set('startDate', checkIn)
    if (checkOut) params.set('endDate', checkOut)
    navigate(`/hotels?${params.toString()}`)
  }

  const Field = ({ label, children }) => (
    <div className="booking-bar-field">
      <label>{label}</label>
      {children}
    </div>
  )

  return (
    <form className="booking-bar" onSubmit={handleBook}>
      <Field label="Giriş tarixi">
        <input type="date" className="input" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
      </Field>
      <Field label="Çıxış tarixi">
        <input type="date" className="input" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || undefined} />
      </Field>
      <Field label="Böyük">
        <select className="input" value={adults} onChange={e => setAdults(e.target.value)}>
          {[1, 2, 3, 4].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </Field>
      <Field label="Uşaq">
        <select className="input" value={children} onChange={e => setChildren(e.target.value)}>
          {[0, 1, 2, 3, 4].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </Field>
      <Field label="Otaq">
        <select className="input" value={rooms} onChange={e => setRooms(e.target.value)}>
          {[1, 2, 3, 4].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </Field>
      <div className="booking-bar-action">
        <button type="submit" className="btn btn-gold w-full">İndi rezerv et</button>
      </div>
    </form>
  )
}
