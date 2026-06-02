import React from 'react'

export default function AvailabilityCalendar({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="availability-calendar">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">Giriş tarixi</label>
          <input
            type="date"
            value={startDate}
            onChange={e => onStartDateChange(e.target.value)}
            min={today}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Çıxış tarixi</label>
          <input
            type="date"
            value={endDate}
            onChange={e => onEndDateChange(e.target.value)}
            min={startDate || today}
            className="input"
          />
        </div>
      </div>
    </div>
  )
}
