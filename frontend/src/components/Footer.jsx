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
        <div className="footer-col">
          <Link to="/" className="footer-brand">Aura Grand</Link>
          <p className="footer-text">
            Peşəkar otel rezervasiya platforması — rahat otaqlar, sürətli bron və müasir qonaq təcrübəsi.
          </p>
          <div className="footer-social mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Keçidlər</h4>
          <Link to="/">Ana səhifə</Link>
          <Link to="/rooms">Otaqlar</Link>
          <Link to="/about">Haqqımızda</Link>
          <Link to="/blog">Bloq</Link>
          <Link to="/contact">Əlaqə</Link>
        </div>
        <div className="footer-col">
          <h4>Hüquqi</h4>
          <Link to="/privacy">Məxfilik Siyasəti</Link>
          <Link to="/terms">İstifadə Şərtləri</Link>
        </div>
        <div className="footer-col">
          <h4>Əlaqə</h4>
          <p>Bakı, Azərbaycan</p>
          <p>Nizami küç. 45</p>
          <p>+994 12 555 12 34</p>
          <p>info@auragrand.az</p>
        </div>
        <div className="footer-col">
          <h4>İş saatları</h4>
          <p>B.e – Cümə: 09:00 – 18:00</p>
          <p>Şənbə: 10:00 – 16:00</p>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} Aura Grand. Final layihə — otel rezervasiya sistemi.</p>
      </div>
    </footer>
  )
}
