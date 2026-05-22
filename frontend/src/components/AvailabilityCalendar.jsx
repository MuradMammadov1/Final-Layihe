import React, { useState } from 'react'

export default function AvailabilityCalendar({ hotelId, onDateSelect }) {
  const [selectedDates, setSelectedDates] = useState({ start: '', end: '' })

  const handleDateChange = (field, value) => {
    setSelectedDates(prev => ({ ...prev, [field]: value }))
    if (onDateSelect) {
      onDateSelect({ ...selectedDates, [field]: value })
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="availability-calendar panel">
      <h3 className="section-heading text-lg mb-4">Müddəti seçin</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">Giriş tarixi</label>
          <input
            type="date"
            value={selectedDates.start}
            onChange={e => handleDateChange('start', e.target.value)}
            min={today}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Çıxış tarixi</label>
          <input
            type="date"
            value={selectedDates.end}
            onChange={e => handleDateChange('end', e.target.value)}
            min={selectedDates.start || today}
            className="input"
          />
        </div>
      </div>
      {selectedDates.start && selectedDates.end && (
        <div className="mt-4 p-3 bg-slate-50 rounded">
          <p className="text-sm text-gray-700">
            Seçilmiş tarixlər: <strong>{selectedDates.start}</strong> - <strong>{selectedDates.end}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
