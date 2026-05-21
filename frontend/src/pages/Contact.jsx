import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="page-contact">
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana səhifə</Link>
            <span>/</span>
            <span>Əlaqə</span>
          </nav>
          <h1 className="page-hero-title">Bizimlə əlaqə</h1>
          <p className="page-hero-sub">Sualınızı istənilən vaxt göndərin — komandamız tezliklə cavab verəcək.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="contact-info-grid">
          <article className="contact-info-card">
            <span className="contact-icon" aria-hidden>📍</span>
            <h3>Bakı, Azərbaycan</h3>
            <p>Nizami küçəsi 45, AZ1000</p>
          </article>
          <article className="contact-info-card">
            <span className="contact-icon" aria-hidden>📞</span>
            <h3>+994 12 555 12 34</h3>
            <p>B.e – Cümə, 09:00 – 18:00</p>
          </article>
          <article className="contact-info-card">
            <span className="contact-icon" aria-hidden>✉️</span>
            <h3>info@auragrand.az</h3>
            <p>24 saat ərzində cavab</p>
          </article>
        </div>

        <div className="contact-layout">
          <form className="contact-form panel" onSubmit={handleSubmit}>
            <h2 className="section-heading">Mesaj göndərin</h2>
            <p className="text-gray-600 mb-4">Sorğunuzu istənilən vaxt göndərin.</p>
            {sent && (
              <div className="alert success">Mesajınız qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.</div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Ad</label>
                <input name="name" value={form.name} onChange={handleChange} className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium">E-poçt</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input" required />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Mövzu</label>
              <input name="subject" value={form.subject} onChange={handleChange} className="input" required />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Mesaj</label>
              <textarea name="message" value={form.message} onChange={handleChange} className="input" rows="6" required />
            </div>
            <button type="submit" className="btn btn-gold mt-4 w-full">Göndər</button>
          </form>

          <aside className="contact-map panel">
            <h2 className="section-heading">Xəritə</h2>
            <iframe
              title="Aura Grand Bakı"
              className="contact-map-frame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.428!2d49.8671!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzMzLjUiTiA0OcKwNTInMDEuNiJF!5e0!3m2!1sen!2s!4v1"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </aside>
        </div>
      </section>
    </div>
  )
}
