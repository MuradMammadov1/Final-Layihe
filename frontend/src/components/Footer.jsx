import React from 'react'
import { Link } from 'react-router-dom'

function FooterCol({ title, children }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      {children}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="footer-brand">Aura Grand</Link>
          <p className="footer-text">
            Peşəkar otel rezervasiya platforması — rahat otaqlar, sürətli bron və müasir qonaq təcrübəsi.
          </p>
        </div>
        <FooterCol title="Keçidlər">
          <Link to="/">Ana səhifə</Link>
          <Link to="/hotels">Otellər</Link>
          <Link to="/contact">Əlaqə</Link>
        </FooterCol>
        <FooterCol title="Əlaqə">
          <p>Bakı, Azərbaycan</p>
          <p>Nizami küç. 45</p>
          <p>+994 12 555 12 34</p>
          <p>info@auragrand.az</p>
        </FooterCol>
        <FooterCol title="İş saatları">
          <p>B.e – Cümə: 09:00 – 18:00</p>
          <p>Şənbə: 10:00 – 16:00</p>
        </FooterCol>
      </div>
      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} Aura Grand. Final layihə — otel rezervasiya sistemi.</p>
      </div>
    </footer>
  )
}
