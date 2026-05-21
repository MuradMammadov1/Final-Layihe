import React from 'react'
import { Link } from 'react-router-dom'
import { SITE_PHONE, SITE_EMAIL } from '../data/siteContent'

export default function TopBar() {
  return (
    <div className="top-bar" aria-label="Əlaqə zolağı">
      <div className="container top-bar-inner">
        <span className="top-bar-item">
          <span aria-hidden>📞</span>
          <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}>{SITE_PHONE}</a>
        </span>
        <span className="top-bar-item top-bar-item--hide-sm">
          <span aria-hidden>✉️</span>
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
        </span>
        <span className="top-bar-item top-bar-spacer">
          <Link to="/contact">Bizə yazın</Link>
        </span>
      </div>
    </div>
  )
}
